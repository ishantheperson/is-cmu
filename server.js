const PORT = process.env.PORT || 2000;

const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const fs = require("fs");
const childProcess = require("child_process");
const textParser = require("./text-parser/text-parser");
const reverseImgSearch = require("./reverse-image-search/reverse-search");
const dictionaryGetter = require("./text-parser/DirectoryGetter");
const stt = require("./speech-to-text/speech-to-text.js");

console.info("Server listening on port", PORT);
server.listen(PORT);

app.use(express.static("static"));

io.on("connection", function (socket) {
  console.log("Got a connection");

  socket.on("textData", (data) => {
    socket.emit("status", "Server received text");

    const parserResult = textParser.ParseKeywords(data);
    console.log(parserResult);

    if (parserResult) {
      socket.emit("textResult", {
        success: true,
        type: "parser",
        data: { match: parserResult.join(' ') }
      })

      return; // We don't need to do a dictionary lookup if the parser succeeded
    }

    dictionaryGetter.andrewidLookup(data, (result, data) => {
      console.log(result, data);

      socket.emit("textResult", {
        success: result,
        type: "dictLookup",
        data: data
      });
    }, (status) => {
      socket.emit("status", status);
    });
  });

  socket.on("imageData", (data) => {
    socket.emit("status", "Server received image");

    reverseImgSearch.ReverseSearch(data, (result) => {
      console.log(`Reverse search yielded "${result}"`);
      socket.emit("status", `Server received result from Google: <b>${result}</b>`);
      const isCMU = textParser.ParseKeywords(result);

      socket.emit("imageResult", {
        success: isCMU,
        data: { result } // the result from the reverse image search
      })

    }, (status) => {
      socket.emit("status", status);
    });
  });

  socket.on("audioData", (data) => {
    console.log("Received audio data", data);
    socket.emit("status", "Server received audio data");

    fs.unlink("./temp.webm", (error) => {
      fs.writeFile("./temp.webm", data, (error) => {
        socket.emit("status", "Converting...");

        fs.unlink("./temp.wav", (error) => {
          const proc = childProcess.execSync("ffmpeg -i temp.webm -acodec pcm_s16le -ar 16000 temp.wav")

          socket.emit("status", "Requesting speech-to-text from Microsoft...");
          stt.SpeechToText("temp.wav", (text) => {
            console.log(`Received text "${text}"`);

            if (!text) {
              socket.emit("textResult", {
                success: false,
              });
              return; // failure?
            }
            socket.emit("status", "Parsing...");
            const parserResult = textParser.ParseKeywords(text);

            const msg = {
              success: !!parserResult,
              data: { speech: text }
            };
            if (parserResult) msg.data.match = parserResult.join(' ');

            socket.emit("speechResult", msg);

            // Clean up
            fs.unlinkSync("temp.wav");
            fs.unlinkSync("temp.webm");
          })
        });
      });
    });
  });
});

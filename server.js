const PORT = process.env.PORT || 2000;

const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const textParser = require("./text-parser/text-parser");
const reverseImgSearch = require("./reverse-image-search/reverse-search");
const dictionaryGetter = require("./text-parser/DirectoryGetter");

console.info("Server listening on port", PORT);
server.listen(PORT);

app.use(express.static("static"));

io.on("connection", function (socket) {
  console.log("Got a connection");

  socket.on("textData", (data) => {
    socket.emit("status", "Server received text");
    // This is called when the user sends a text input
    // console.log(textParser.ParseKeywords(data));

    const parserResult = textParser.ParseKeywords(data);
    console.log(parserResult);
    if (parserResult) {
      console.log(parserResult)
      socket.emit("textResult", {
        success: true,
        type: "parser",
        phrase: parserResult.join(' ')
      })

      return; // We don't need to do a dictionary lookup here
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
      console.log("Yeet got this: ", result);
      // TODO: process result
      socket.emit("status", `Server received result from Google: <b>${result}</b>`);
      const isCMU = textParser.ParseKeywords(result);

      socket.emit("imageResult", {
        success: isCMU, 
        data: result // the result from the reverse image search
      })

    }, (status) => {
      socket.emit("status", status);
    });
  });
});

const PORT = process.env.PORT || 2000;

const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const textParser = require("./text-parser/text-parser");
const reverseImgSearch = require("./reverse-image-search/reverse-search");

console.info("Server listening on port", PORT);
server.listen(PORT);

app.use(express.static("static"));

io.on("connection", function (socket) {
  console.log("Got a connection");

  socket.on("textData", (data) => {
    // This is called when the user sends a text input
    console.log(textParser.ParseKeywords(data));
  });

  socket.on("imageData", (data) => {
    reverseImgSearch.ReverseSearch(data, (result) => {
      console.log("Yeet got this: ", result);
    });
  });
});

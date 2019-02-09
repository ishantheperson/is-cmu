const PORT = process.env.PORT || 2000;

const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

server.listen(PORT);

app.use(express.static("static"));

io.on("connection", function (socket) {
  console.log("Got a connection");

  socket.on("textData", function (data) {
    // This is called when the user sends a text input
    console.log(data);
  });
});

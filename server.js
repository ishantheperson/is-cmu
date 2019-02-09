const PORT = process.env.PORT || 2000;
//
const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

server.listen(PORT);
// WARNING: app.listen(80) will NOT work here!

app.use(express.static("static"));

io.on('connection', function (socket) {
  console.log("Got a connection")

  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

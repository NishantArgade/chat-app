const express = require("express");
const app = express();
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");

app.use(cors());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] },
});

io.on("connection", (socket) => {
  // console.log(socket.id); // x8WIv7-mJelg7on_ALbx

  socket.on("joinRoom", (room) => socket.join(room));

  socket.on("newMessage", ({ newMsg, room }) => {
    // console.log(newMsg, room);

    io.in(room).emit("getLatestMessage", newMsg);
  });
});

app.get("/", (req, res) => {
  res.send("Socket chat BE started");
});

httpServer.listen(8000, () => console.log("app stated at port 8000"));

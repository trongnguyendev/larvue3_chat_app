const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:8082"
  }
});

const list_room = ['5_3_room', '4_3_room', '3_2_room'];


const Redis = require('ioredis');
const { parse } = require('path');
const { SocketAddress } = require('net');
const redis = new Redis();
var users = [];

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Broadcast redis
redis.subscribe('private-channel', function() {
  console.log("redis listen");
});

redis.on('message', function(channel, data) {
  if(channel == 'private-channel') {
    let room = JSON.parse(data).data.data.room;
    let message = JSON.parse(data).data.data.message;
    io.sockets.emit('chat message', { message: message, room: room });
  }
  
})
let roomno = 1;
io.on('connection', (socket) => {
  // inital join room
  socket.on('initial_join_room', (rooms) => {    
    rooms.forEach((room, index) => {
      socket.join(room);
    })
  
  })

  // initial socket
  let room_chat = null;

  socket.on('initial_socket', async (room_chat) => {
    socket.in(room_chat).emit('connectToRoom', room_chat);   
  })

  // disconnect socket
  socket.on('disconnect', () => {
  })

  // event chat message
  socket.on('chat message', (msg) => {
    socket.emit('chat message', msg);
  })

  socket.on('typing', (data) => {
    socket.to(data.room).emit('typing', data);
  })

  socket.on('topTyping', (data) => {
  })

});

server.listen(6002, () => {
  console.log('listening on *:6002');
});
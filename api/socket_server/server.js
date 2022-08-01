// var io = require('socket.io')(6001)

// console.log("connected to port 6001")

// io.on('error', function() {
//     console.log("error")
// })

// io.on('connection', function(socket) {
//     console.log("User connect " + socket.id)
// })

// var Redis = require('ioredis')
// var redis = new Redis(6379)
// redis.psubscribe("*", function(error, count) {

// })



// var app = require('express')();

// var http = require('http').Server(app);

// var io = require('socket.io')(http);

// var Redis = require('ioredis');

// var redis = new Redis();

// io.on('connection', function(socket) {
//     console.log("User connect " + socket.id)
// })


// redis.subscribe('test-channel', function(err, count) {
// });

// redis.on('message', function(channel, message) {
//     console.log('Message Recieved: ' + message);
//     message = JSON.parse(message);
//     io.emit(channel + ':' + message.event, message.data);
// });

// http.listen(3000, function(){
//     console.log('Listening on Port 3000');
// });

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


io.on('connection', (socket) => {
    console.log('a user connected');
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});
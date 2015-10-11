'use strict';

var http = require('http');
var fs = require('fs');
var io = require('socket.io')();

var server = http.createServer(function (req, res) {
    fs.createReadStream(__dirname + '/../static/index.html').pipe(res);
}).listen(8888);

io.attach(server);

var peers = [];

io.on('connection', function (socket) {
  console.log('a user connected');
  socket.on('disconnect', function () {
    console.log('user disconnected');

    for (var i = 0; i < peers.length; i++) {
        if (socket.id == peers[i].id) {
            peers.splice(i, 1);
            break;
        }
    }
  });

  peers.push(socket);

  socket.on('offer', function (data) {
    (socket.id == peers[0].id ? peers[1] : peers[0]).emit('offer', data);
    console.log(data);
  });

  socket.on('answer', function (data) {
    (socket.id == peers[0].id ? peers[1] : peers[0]).emit('answer', data);
    console.log(data);
  });
});

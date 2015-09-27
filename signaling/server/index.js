'use strict';

var http = require('http');
var fs = require('fs');
var io = require('socket.io')();
var rooms = {};
var uid = (function (i) { return function () { return i++; }; }(0));

function createRoom() {
    var room = {
        id: uid(),
        isFull: false,
        participants: 0
    }

    rooms[room.id] = room;

    // create ws channel

    return room;
}

function joinRoom(room) {
    room.participants++;
    if (room.participants === 2) {
        room.isFull = true;
    }
}

var server = http.createServer(function (req, res) {
    var roomId = req.url.substring(1);

    if (typeof rooms[roomId] === 'undefined' || rooms[roomId].isFull) {
        var room = createRoom();
        res.writeHead(302, { 'Location': room.id });
        return res.end();
    }

    joinRoom(rooms[roomId]);
    fs.createReadStream(__dirname + '/../static/index.html').pipe(res);
}).listen(8080);

io.attach(server);

io.on('connection', function (socket) {
  console.log('a user connected');
  socket.on('disconnect', function () {
    console.log('user disconnected');
  });
});

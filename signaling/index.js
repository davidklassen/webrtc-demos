var http = require('http');
var fs = require('fs');
var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({ port: 8888 });

http.createServer(function (req, res) {
    console.log(req);

    fs.createReadStream('index.html').pipe(res);
}).listen(8080);

wss.on('connection', function (ws) {
  ws.on('message', function (message) {
    console.log('received: %s', message);
  });

  ws.send('connection established');
});

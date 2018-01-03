const express = require('express'),
    socketio = require('socket.io'),
    https = require('https'),
    fs = require('fs'),
    routers = require('./routers/routers.js'),
    sockets = require('./sockets/sockets.js'),
    config = require('config');
  
    options = {
        cert: fs.readFileSync('config/sert/server.crt'),
        key: fs.readFileSync('config/sert/server.key')
    };

var app = express();
//var server = app.listen(5000);
var server = https.createServer(options, app).listen(config.get('port'));
var io = socketio(server);

//setup express to use middleware
app.use('/', routers);

var admin = io.of('/admin');
admin.on('connection', sockets.adminNamespace);

io.on('connection', (socket) => {
    console.log("new connection on");
    socket.on("disconnect", () => console.log("closed connection"))
});
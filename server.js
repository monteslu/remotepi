var express = require('express');
var app = express();
var http = require('http').Server(app);
var server = require('socket.io')(http);
var path = require('path');

var socketIoClient = require('socket.io-client');

var VirtualSerialPort = require('socket.io-serial').SerialPort;
var socketIoClient = require('socket.io-client');
var raspi = require('raspi-io');
var RemoteIO = require('remote-io');


app.use(express.static(path.join(__dirname, 'build')));

var PORT = process.env.PORT || 3000;

server.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('chat', msg);
    server.emit('chat message', msg);
  });

  socket.on('serial', function(msg){
    if(typeof msg.device === 'string'){
      server.emit(msg.device, msg);
    }
  });

  socket.on('joinchannel', function(channel, callback){
    try{
      socket.join(channel);
      if(callback){
        callback('joined ' + channel);
      }
      console.log('joined', channel);
    }catch(exp){
      console.log('error joining', channel, exp);
    }
  });

});

http.listen(PORT, function(){
  console.log('listening on *:' + PORT);
});



var io = new raspi();
var client = socketIoClient('ws://localhost:' + PORT);


var sp = new VirtualSerialPort({
  client: client,
  transmitTopic: 'serial',
  receiveTopic: 'physicalDevice',
  metaData: {device: 'serialClient'}
});

//make sure to get messages directed at me
client.emit('joinchannel', 'physicalDevice', console.log);


io.on('ready', function(data){

  console.log('io ready', data, io.pins);

  var remoteio = new RemoteIO({
    serial: sp,
    io: io
  });

});


const express = require("express");
const app = express();


exports = module.exports = function(io) {  
    // Set socket.io listeners.
    io.on('connection', (socket) => {
      console.log('connected')

      socket.on('race created', function(data){
        socket.broadcast.emit('get races', data)     
      })

      socket.on('testSend', function(data){
        socket.broadcast.emit('test', data) 
        socket.emit('test', data)    
      })
  
  });
}


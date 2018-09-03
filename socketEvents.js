
const express = require("express");
const app = express();


exports = module.exports = function(io) {  
    // Set socket.io listeners.
    io.on('connection', (socket) => {

      socket.on('race created', function(data){
        socket.broadcast.emit('get races', data)     
      })

      socket.on('sendChat', function(data){
        socket.broadcast.emit('updateChat', data) 
        socket.emit('updateChat', data)    
      })
      
      socket.on('userData', function(data, id){
        socket.broadcast.emit(id, data) 
        socket.emit(id, data)    
      })

      socket.on('leaderboard', function(data, id){
        socket.broadcast.emit(id, data)   
      })
  });
}


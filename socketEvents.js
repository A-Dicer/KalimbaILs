const express = require("express");
const app = express();
const moment = require("moment");
        

exports = module.exports = function(io) {  
    // Set socket.io listeners.
    io.on('connection', (socket) => {

      socket.on('raceLogic', function(data, id){
        
       
        const  hb = "Hoebear";
        const  msg = [
                  `Hello Humans. Lets get the race started.`,
                  `First I'm going to select the levels.`,
                  `All these levels to choose from. Lets see...`,
                  `The levels selected: 
                  ${data.levels[0].name}, 
                  ${data.levels[1].name}, 
                  and ${data.levels[2].name}`,
                  `I think I'll give ya... ${(data.time / 1000) / 60} minutes for this race.`,
                  `Prepare yourself Humans.`,
                  `The race starts in...`,
                  `HoeDown!!!`
                ]

        //Level Select Function ------------------------------------------------
        levelSelect = (lvl,randomTime) => {
          let time = 0;

          console.log(randomTime)
          for(let i = 0; i <= randomTime; i++){
          setTimeout(function(){
              let randomLevel = Math.floor((Math.random() * 53)) + 1
              i === randomTime 
              ? data.disLev[lvl] = data.levels[lvl]
              : data.disLev[lvl].levelid = randomLevel
              
              io.in(`room${id}`).emit(id, data)  
          }, time);
        
          time += 150
          }
        }
        
        //Tick Interval --------------------------------------------------------
        tick = () => {
            data.time == 0
              ? (clearInterval(interval), finish())
              : (
                  data.time -= 100,
                  socket.broadcast.emit(id, data),
                  socket.emit(id, data)
              )       
        }
        
        //Race Is Finished -----------------------------------------------------
        finish = () => {io.in(`room${id}`).emit(`chat${id}`, {player: hb, message: "its over"})
        }

        //Race Starts ----------------------------------------------------------
        race = () => {
          console.log("race started")
          let timeTest = 0

          setTimeout(function(){io.in(`room${id}`).emit(`chat${id}`, {player: hb, message: msg[0]})}, timeTest)

          timeTest += 2000
          setTimeout(function(){io.in(`room${id}`).emit(`chat${id}`, {player: hb, message: msg[1]})}, timeTest)

          timeTest += 1000
          setTimeout(function(){
            data.styles.lvStyle = {height: "105px"}
            io.in(`room${id}`).emit(id, data)  
          }, timeTest)

          timeTest += 2000
          let randomTime = Math.floor((Math.random() * 50)) + 20
          setTimeout(function(){levelSelect(0, randomTime)}, timeTest)

          timeTest += 500
          let randomTime2 = Math.floor((Math.random() * 50)) + 20
          setTimeout(function(){levelSelect(1, randomTime2)}, timeTest)

          timeTest += 500
          let randomTime3 = Math.floor((Math.random() * 50)) + 20
          setTimeout(function(){levelSelect(2, randomTime3)}, timeTest)

          timeTest += 2000 
          setTimeout(function(){io.in(`room${id}`).emit(`chat${id}`, {player: hb, message: msg[2]})}, timeTest)

          let newRandomTime = 0
          if(randomTime > randomTime2 && randomTime > randomTime3) newRandomTime = randomTime * 150
          else if(randomTime2 > randomTime && randomTime2 > randomTime3) newRandomTime = randomTime2 * 150
          else newRandomTime = randomTime3 * 150

          timeTest += newRandomTime - 2000
          setTimeout(function(){io.in(`room${id}`).emit(`chat${id}`, {player: hb, message: msg[3]})}, timeTest)
          
          //two seconds for breath
          timeTest += 2000
          setTimeout(function(){     
            data.styles.tStyle = {height: "100px", opacity: 1}
            io.in(`room${id}`).emit(`chat${id}`, {player: hb, message: msg[4]})
            io.in(`room${id}`).emit(id, data)    
          }, timeTest)

          timeTest += 2000
          setTimeout(function(){io.in(`room${id}`).emit(`chat${id}`, {player: hb, message: msg[5]})}, timeTest)

          timeTest += 5000
          setTimeout(function(){io.in(`room${id}`).emit(`chat${id}`, {player: hb, message: msg[6]})}, timeTest)

          timeTest += 2000
          setTimeout(function(){io.in(`room${id}`).emit(`chat${id}`, {player: hb, message: "3"})}, timeTest)

          timeTest +=1000
          setTimeout(function(){io.in(`room${id}`).emit(`chat${id}`, {player: hb, message: "2"})}, timeTest)

          timeTest += 1000
          setTimeout(function(){io.in(`room${id}`).emit(`chat${id}`, {player: hb, message: "1"})}, timeTest)

          timeTest += 1000
          setTimeout(function(){
            io.in(`room${id}`).emit(`chat${id}`, {player: hb, message: msg[7]})           
            interval = setInterval(() => tick(), 97)
          }, timeTest)
        }

        //Ready Check ----------------------------------------------------------
        let ready = data.leaderboard.filter(player => player.ready === true)
        if(data.leaderboard.length > 1) {
          if(ready.length === data.leaderboard.length){
              data.started = new moment()
              race()
          } 
        }

        socket.broadcast.emit(id, data)
        socket.emit(id, data)
      })

      socket.on('race created', function(data){socket.broadcast.emit('get races', data)})
      socket.on('sendChat', function(data, id){io.in(`room${id}`).emit(`chat${id}`, data)})
      socket.on('joinRoom', function(id){socket.join(`room${id}`)})
      socket.on('leaveRoom', function(id){socket.leave(`room${id}`)})

      socket.on('leaderboard', function(data, id){
        socket.broadcast.emit(id, data)   
      })
  });
}


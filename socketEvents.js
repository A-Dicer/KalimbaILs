const express = require("express");
const app = express();
const moment = require("moment");
const axios = require("axios");

function updateRace(id, info){ return axios.put("https://kalimbril.herokuapp.com/api/races/" + id, info) }
function getRaces(){return axios.get("https://kalimbril.herokuapp.com/api/races")}

exports = module.exports = function(io) {  
    // Set socket.io listeners.
    io.on('connection', (socket) => {

      socket.on('raceLogic', function(info, id){

        let data = JSON.parse(JSON.stringify(info))
        
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

        //Race Done -----------------------------------------------------------
        raceDone = (raceId) => {
          let done = new moment()
          updateRace(raceId, {done: done}).catch(err => console.log(err)) 
          io.in(`room${raceId}`).emit(`chat${raceId}`, {player: hb, message: "Done"})   
          io.in(`room${raceId}`).emit("done", done) 
          sendRaceUpdate() 
        }

        //Race Starts ----------------------------------------------------------
        race = () => {
          let raceTime = 0

          setTimeout(function(){io.in(`room${id}`).emit(`chat${id}`, {player: hb, message: msg[0]})}, raceTime)

          raceTime += 2000
          setTimeout(function(){io.in(`room${id}`).emit(`chat${id}`, {player: hb, message: msg[1]})}, raceTime)

          raceTime += 1000
          setTimeout(function(){
            data.styles.lvStyle = {height: "110px"}
            io.in(`room${id}`).emit(id, data)  
          }, raceTime)

          raceTime += 2000
          let randomTime = Math.floor((Math.random() * 50)) + 20
          setTimeout(function(){levelSelect(0, randomTime)}, raceTime)

          raceTime += 500
          let randomTime2 = Math.floor((Math.random() * 50)) + 20
          setTimeout(function(){levelSelect(1, randomTime2)}, raceTime)

          raceTime += 500
          let randomTime3 = Math.floor((Math.random() * 50)) + 20
          setTimeout(function(){levelSelect(2, randomTime3)}, raceTime)

          raceTime += 2000 
          setTimeout(function(){io.in(`room${id}`).emit(`chat${id}`, {player: hb, message: msg[2]})}, raceTime)

          let newRandomTime = 0
          if(randomTime > randomTime2 && randomTime > randomTime3) newRandomTime = randomTime * 150
          else if(randomTime2 > randomTime && randomTime2 > randomTime3) newRandomTime = randomTime2 * 150
          else newRandomTime = randomTime3 * 150

          raceTime += newRandomTime - 2000
          setTimeout(function(){
            data.styles.iStyle = {height: "438px", opacity: 1}
            io.in(`room${id}`).emit(`chat${id}`, {player: hb, message: msg[3]})
            io.in(`room${id}`).emit(id, data)
          }, raceTime)
          
          //two seconds for breath
          raceTime += 2000
          setTimeout(function(){     
            data.styles.tStyle = {height: "60px", opacity: 1}
            io.in(`room${id}`).emit(`chat${id}`, {player: hb, message: msg[4]})
            io.in(`room${id}`).emit(id, data)   
          }, raceTime)

          raceTime += 2000
          setTimeout(function(){io.in(`room${id}`).emit(`chat${id}`, {player: hb, message: msg[5]})}, raceTime)

          raceTime += 5000
          setTimeout(function(){io.in(`room${id}`).emit(`chat${id}`, {player: hb, message: msg[6]})}, raceTime)

          raceTime += 2000
          setTimeout(function(){io.in(`room${id}`).emit(`chat${id}`, {player: hb, message: "3"})}, raceTime)

          raceTime +=1000
          setTimeout(function(){io.in(`room${id}`).emit(`chat${id}`, {player: hb, message: "2"})}, raceTime)

          raceTime += 1000
          setTimeout(function(){io.in(`room${id}`).emit(`chat${id}`, {player: hb, message: "1"})}, raceTime)

          raceTime += 1000
          setTimeout(function(){
            data.started = new moment()
            updateRace(id, {started: data.started}).catch(err => console.log(err))
            io.in(`room${id}`).emit(`chat${id}`, {player: hb, message: msg[7]}) 
            sendRaceUpdate()  
            io.in(`room${id}`).emit(id, data)      
          }, raceTime)
            
          raceTime += data.time
          setTimeout(function(){raceDone(id)}, raceTime)

        }

        //Ready Check ----------------------------------------------------------
        let ready = data.leaderboard.filter(player => player.ready === true)
        if(data.leaderboard.length > 1) {
          if(ready.length === data.leaderboard.length){
            data.ready = true
            io.in(`room${id}`).emit(id, data) 
            race()
          } 
        }
        socket.broadcast.emit(id, data)
        socket.emit(id, data)
      })

      sendRaceUpdate =()=>{
        getRaces().then(res => { 
          socket.broadcast.emit('getRaces', res.data.results.reverse())
          socket.emit('getRaces', res.data.results.reverse())  
        }
        ).catch(err => console.log(err));      
      }
      socket.on('raceCreated', sendRaceUpdate)
      socket.on('sendChat', function(data, id){io.in(`room${id}`).emit(`chat${id}`, data)})
      socket.on('joinRoom', function(id){socket.join(`room${id}`)})
      socket.on('leaveRoom', function(id){socket.leave(`room${id}`)})  
      socket.on('leaderboard', function(data, id){
        updateRace(id, {leaderboard: data.leaderboard}).catch(err => console.log(err))
        io.in(`room${id}`).emit(id, data)
        sendRaceUpdate()
      })

      socket.on('overlay', function(data, id){socket.broadcast.emit(id, data)})
  });
}


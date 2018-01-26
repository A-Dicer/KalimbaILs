import axios from "axios";

export default {
  // Gets all users
  getUsers: function() {
    return axios.get("/api/users");
  },
  
  // Gets the user with the given id
  getUser: function(id) {
    return axios.get("/api/users/" + id);
  },

  // Gets all Races
  getRaces: function() {
    return axios.get("/api/races");
  },

  // Saves a race to the database
  saveRace: function(RaceData) {
    return axios.post("/api/races", RaceData);
  },
  
  // Gets all Races
  getLevels: function() {
    return axios.get("api/levels");
  },

  twitchAuth: function(){
    console.log("running auth")
    return axios.get("/api/auth/twitch");
  },

  twitchCallback: function(){
    return axios.get("/api/auth/twitch/callback")
  }

};

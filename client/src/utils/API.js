import axios from "axios";

export default {

  //--------------------- Users -----------------------
  getUsers: function() { return axios.get("/api/users") }, // Gets all users
  getUser: function(id) { return axios.get("/api/users/" + id) }, // Gets the user with the given id
  updateUser: function(id, info){ return axios.put("/api/users/" + id, info) }, // Updates specific user

  //--------------------- Races -----------------------
  getRaces: function() { return axios.get("/api/races") }, // Gets all races
  getRaceID: function(id){ return axios.get("/api/races/" + id) }, // Gets the race with the given id
  saveRace: function(RaceData) { return axios.post("/api/races", RaceData) }, // Saves new race
  updateRace: function(id, info){ return axios.put("/api/races/" + id, info) }, // Updates specific race

  //--------------------- Levels ----------------------
  getLevels: function() { return axios.get("api/levels") }, // Gets all Levels

  // getMsgs: function() { return axios.get("api/msg") },
  // getMsg: function(name) { return axios.get("/api/msg/name/" + name) },
  // saveMsg: function(msgData) { return axios.post("/api/msg", msgData) },

  //------------------ Twitch Auth --------------------
  twitchAuth: function(){ return axios.get("/api/auth/twitch") }, // Login with Twitch
  twitchCallback: function(){ return axios.get("/api/auth/twitch/callback") }, // Twitch callback Route
  logout: function() { return axios.get("/api/auth/logout") }, // Logout 
};

import axios from "axios";

export default {

  getUsers: function() { return axios.get("/api/users") },
  getUser: function(id) { return axios.get("/api/users/" + id) },

  getRaces: function() { return axios.get("/api/races") },
  getRaceID: function(id){ return axios.get("/api/races/" + id) },
  saveRace: function(RaceData) { return axios.post("/api/races", RaceData) },

  getLevels: function() { return axios.get("api/levels") },

  getMsgs: function() { return axios.get("api/msg") },
  getMsg: function(name) { return axios.get("/api/msg/name/" + name) },
  saveMsg: function(msgData) { return axios.post("/api/msg", msgData) },

  twitchAuth: function(){ return axios.get("/api/auth/twitch") },
  twitchCallback: function(){ return axios.get("/api/auth/twitch/callback") },
  logout: function() { return axios.get("/api/auth/logout") },
};

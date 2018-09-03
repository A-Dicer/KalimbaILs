import React, { Component } from "react";
import API from "../../utils/API";
import moment from "moment";
import { TimeSelect, Radio, Checkbox } from "../../components/Form";
import Icon from "../../components/Icon";
import "./RaceCreate.css";
const io = require('socket.io-client')  
const socket = io() 

//set state and load component -------------------------------------------------------
class RaceCreate extends Component {
  constructor(props) {
  super(props);
  this.state = {
    levels: [],
    filter: [],
    time: '',
    difficulty: '',
    location: [],
    boss: '',
    locArr: []
  }}

//component did mount ----------------------------------------------------------------
  componentDidMount() {
    this.loadLevels();
  };

//load levels from api ---------------------------------------------------------------
  loadLevels = () => {
    API.getLevels()
      .then(res => {
          this.setState({levels: res.data.results, filter: res.data.results})
        }
      ).catch(err => console.log(err));
  };

//filter out levels ------------------------------------------------------------------
  levelFilter = () => {
    let items = [{option: 'difficulty', selection: this.state.difficulty}, {option: 'location', selection: this.state.location}, {option: 'type', selection: this.state.boss}];
    let diff = []
    let filtered = this.state.levels;
    
    items.forEach(items => {

      //difficulty ------------------------------
      if(items.option === "difficulty"){
        if(items.selection){
            if(items.selection === "Easy")  items.selection = 1
            if(items.selection === "Medium")  items.selection = 2
            if(items.selection === "Hard")  items.selection = 4
            if(items.selection === "Very Hard")  items.selection = 8
            filtered =  filtered.filter(param => param['rank'] <= items.selection)    
        } 
      }

      //location ---------------------------------   
      if(items.option === "location"){
        if(items.selection.length){
         // eslint-disable-next-line
          items.selection.forEach(loc =>{   
            filtered.forEach(level =>{
              if(loc === level.location) diff.push(level)
            })
          })
          filtered = diff
        }     
      }

      // boss ------------------------------------
      if(items.option === "type"){
        if(items.selection){
          filtered = filtered.filter(
            param => param[items.option] !== items.selection
          )
        }
      }  
    })

    this.setState({filter: filtered})
    // eslint-disable-next-line
    filtered.length
    ? this.validCheck("levelAmount", "green")
    : this.validCheck("levelAmount", "red")

    };


//handle clock selection change ------------------------------------------------------
  handleClockChange = event => {

    let time = {
      hour: document.getElementById('hour').value, 
      minute: document.getElementById('minute').value, 
      part: document.getElementById('part').value,
      day: moment().format("D")
    };
    // eslint-disable-next-line
    if (time.part === "PM" && time.hour < 12) time.hour = parseInt(time.hour) + 12;
    if (time.part === "AM" && time.hour === "12") time.hour = "0"
    
    let raceTime = moment(time);

    if(time.hour === '0'){
      if(moment().subtract(1, 'hour').format('H') !== "23"){
        raceTime = moment(time).add(1, 'day');
      }
    }; 
    // eslint-disable-next-line
    moment().isBefore(moment(raceTime))
    ? (
      this.setState({time: raceTime.valueOf()}),
      this.validCheck("time", "green")
    )
    :( 
      this.setState({time: ''}),
      this.validCheck("time", "red")
    )
    
  };

  //handle radio selection change ------------------------------------------------------
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    this.validCheck("location", "green");
    this.validCheck("difficulty", "green");
    setTimeout(this.levelFilter, 50);
    ;
  };

//handle checkbox selection change ---------------------------------------------------
  handleCheckChange = event => {
    const { name, value } = event.target;
    let check = document.getElementById(value).checked;
    
    if(name === "location"){
      check
      ? this.state.locArr.push(value)
      // eslint-disable-next-line
      : this.state.locArr = this.state.locArr.filter(loc => loc !== value)
      this.setState({location: this.state.locArr})
      // eslint-disable-next-line
      this.state.difficulty || this.state.locArr.length
      ? (
        this.validCheck("location", "green"),
        this.validCheck("difficulty", "green")
      )
      : (
        this.validCheck("location", "red"),
        this.validCheck("difficulty", "red")
      )
      console.log(this.state.location)
    }

    if(name === "boss"){
      check
      ? this.setState({boss: 'Boss'})
      : this.setState({boss: ''})
        
    }
    setTimeout(this.levelFilter, 50);
  };

//racesUdpate ------------------------------------------------------------------------
racesUpdate = () => {
socket.emit('race created', this.props.races)
}

//handle form submit -----------------------------------------------------------------
  handleFormSubmit = event => {
    event.preventDefault();
    let filtered = this.state.filter;
    let time = true;
    let random
    let levels = [];

    //select 3 random levels for the race...
    //we need 3 levels
    for(let i = 0; i < 3; i++){
      //if more than three levels are available get random number
      // eslint-disable-next-line
      filtered.length 
      ? (  
        random = Math.floor((Math.random() * filtered.length)),
        //push level id into array
        levels.push(filtered[random]._id),
        //filter out the level just picked
        // eslint-disable-next-line
        filtered = filtered.filter(param => param['_id'] !== filtered[random]._id)
      )  
        : console.log('not enough levels to pick from')  
    }
    //make sure to much time hassn't passed since time select
    // eslint-disable-next-line
    moment().isBefore(moment(this.state.time))
    ? console.log("the time is still good")
    : (
      time = false, 
      this.setState({time: ''}),
      this.validCheck("time", "red")
    )

    //update server
    if ((levels.length === 3) && time) {
      //create the new race data to submit
      const raceData = {
                category: {
                difficulty: this.state.difficulty,
                location: this.state.location,
                boss: this.state.boss,
                startTime: this.state.time
              },
              levels: levels,
              messages: [],
              raceInfo: []
            }
      //send the data to the server
      API.saveRace(raceData)
        .then(
          //reload the races inforamation sent from server
          (res => this.props.loadRaces()),
          console.log('created race'),
          //send new races data to everyone else connected with socket.io
          setTimeout(this.racesUpdate , 100), 
          setTimeout(this.props.raceBtn, 500)          
        ) 
        .catch(err => console.log(err));
    } else console.log("did not create race")
  };


// validCheck ---------------------------------------------------------------------------------
  validCheck = (id, color) => {
   return document.getElementById(id).style.color = color
  }
   
// render -------------------------------------------------------------------------------------
render() {
  return (
      <div className="col-12" style={{margin: 5}}>
        <form>
          <div className="form-group" value={this.state.difficulty} onChange={this.handleClockChange} name="time" >
            <label id="time"><Icon id="fa fa-clock-o"/> Select Start Time</label>
            <TimeSelect />    
          </div>

          <hr />
          <div className="form-group " htmlFor="difficulty" value={this.state.difficulty} onChange={this.handleInputChange} name="difficulty" >
            <label id="difficulty"><Icon id="fa fa-flask"/> Select By Difficulty</label>
            <br />

            {/* Place in difficulty selection */}
            <Radio id="Easy"/>
            <Radio id="Medium"/>
            <Radio id="Hard"/>
            <Radio id="Very Hard"/>
          </div>

          <hr />
          <div className="form-group" value={this.state.difficulty} onChange={this.handleCheckChange} name="location">
            <label id="location">
                <Icon id="fa fa-globe"/> Select By Location 
            </label>
            <br />
            {/* Place in location selection */}
            <Checkbox id="UnderWorld"/><Checkbox id="MiddleWorld"/>
            <Checkbox id="UpperWorld"/><Checkbox id="DarkVoid"/>
            <Checkbox id="InnerWorld"/><Checkbox id="InnerVoid"/>
            
          </div>
          <hr />
          <div className="form-group" value={this.state.difficulty} onChange={this.handleCheckChange} name="boss">
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="checkbox" id="boss" name="boss"  value="boss"/>
              <label className="form-check-label">No Boss Levels</label>
            </div>
          </div>
          <div>
          <button type="submit" className="btn test btn-secondary btn-sm float-right"  disabled={!((this.state.difficulty || this.state.locArr.length) && this.state.time && this.state.filter.length)}
                  onClick={this.handleFormSubmit}>Create Race</button>
          <p id="levelAmount"><Icon id="fa fa-cogs" /> Selecting from {this.state.filter.length} Levels</p>
          </div>       
        </form>   
      </div>                                                        
  )}
};
            
              
export default RaceCreate;
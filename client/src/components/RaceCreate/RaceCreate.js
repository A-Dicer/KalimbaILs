import React, { Component } from "react";
import API from "../../utils/API";
import moment from "moment";
import { TimeSelect, Radio, Checkbox } from "../../components/Form";
import Icon from "../../components/Icon";
import hoebear from "./hoebearHead.png";
import "./RaceCreate.css";

//set state and load component -------------------------------------------------------
class RaceCreate extends Component {
  state = {
    levels: [],
    filter: [],
    time: '',
    difficulty: '',
    location: '',
    boss: '',
    locArr: []
  };

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
        } else console.log("No difficulty filter")
      }

      //location ---------------------------------   
      if(items.option === "location"){
        items.selection.length
          ? ( 
            items.selection.forEach(loc =>{   
              filtered.forEach(level =>{
                if(loc === level.location) diff.push(level)
              })
            }),
            filtered = diff
          ) : console.log("no location filter")     
      }

      // boss ------------------------------------
      if(items.option === "type"){
        items.selection
        ? filtered= filtered.filter(param => param[items.option] !== items.selection)
        : console.log("no boss filter")
      }  
    })

    this.setState({filter: filtered})
  };


//handle clock selection change ------------------------------------------------------
  handleClockChange = event => {

    let time = {
      hour: document.getElementById('hour').value, 
      minute: document.getElementById('minute').value, 
      part: document.getElementById('part').value,
      day: moment().format("D")
    };

    if (time.part === "PM" && time.hour < 12) time.hour = parseInt(time.hour) + 12;
    if (time.part === "AM" && time.hour === "12") time.hour = "0"
    
    let raceTime = moment(time);

    if(time.hour === '0'){
      if(moment().subtract(1, 'hour').format('H') !== "23"){
        raceTime = moment(time).add(1, 'day');
      }
    }; 

    moment().isBefore(moment(raceTime))
    ? this.setState({time: raceTime.valueOf()})
    : this.setState({time: ''})   
  };

  //handle radio selection change ------------------------------------------------------
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
   
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
      : this.state.locArr = this.state.locArr.filter(loc => loc !== value)
      this.setState({location: this.state.locArr})
    }

    if(name === "boss"){
      check
      ? this.setState({boss: 'Boss'})
      : this.setState({boss: ''})
      
      
    }
    setTimeout(this.levelFilter, 50);
  };

//handle form submit -----------------------------------------------------------------
  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title && this.state.author) {
      API.saveBook({
        title: this.state.title,
        author: this.state.author,
        synopsis: this.state.synopsis
      })
        .then(res => this.loadBooks())
        .catch(err => console.log(err));
    }
  };

render() {
  return (
    <div className="row" id="rightRow">
      <div className="col-12 " id="topCol">
          <div className="row">
              <div className="col-3">
                  <img className="mx-auto d-block" src={hoebear} alt="Hoebear" style={{height: 48}} />
              </div>
              <div className="col-1" style={{padding: 0, margin: 0}}>
                  <i className="fa fa-caret-left fa-4x" id="icon1" aria-hidden="true"></i>
              </div>
              <div className="col-8 text-center align-self-center" id="icon2" >
                  Hoebear hates you 
              </div> 
          </div>   
      </div> 
      
      <div className="col-12" style={{margin: 5}}>
        <form>
          <h4>Race Form</h4>
          <hr />
          <div className="form-group" value={this.state.difficulty} onChange={this.handleClockChange} name="time">
            <label><Icon id="fa fa-clock-o"/> Select Start Time</label>
            <TimeSelect />    
          </div>

          <hr />
          <div className="form-group " htmlFor="difficulty" value={this.state.difficulty} onChange={this.handleInputChange} name="difficulty">
            <label><Icon id="fa fa-flask"/> Select By Difficulty</label>
            <br />

            {/* Place in difficulty selection */}
            <Radio id="Easy"/>
            <Radio id="Medium"/>
            <Radio id="Hard"/>
            <Radio id="Very Hard"/>
          </div>

          <hr />
          <div className="form-group" value={this.state.difficulty} onChange={this.handleCheckChange} name="location">
            <label>
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
          <hr />
          <div id="levelAmount">
          <button type="submit" className="btn btn-secondary btn-sm float-right"  disabled={!(this.state.author && this.state.title)}
                  onClick={this.handleFormSubmit}>Create Race</button>
          <Icon id="fa fa-cogs" /> Selecting from {this.state.filter.length} Levels
          </div>        
        </form>   
      </div>                                                        
  </div>  
  )}
};
            
              
export default RaceCreate;
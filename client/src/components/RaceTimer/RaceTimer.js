import React, { Component } from "react";
import moment from "moment";

class RaceTimer extends Component {
    constructor(props) {
      super(props);
      this.state = { 
        raceTime: '', 
        start: false, 
    }}

  componentDidMount() {
    this.setState({raceTime: this.props.time})
    // this.interval = setInterval(() => this.tick(), 100)   
  }

  componentWillUnmount() {clearInterval(this.interval)}
  

  tick() {
    this.props.start
    ? (
      this.state.raceTime == 0
        ? clearInterval(this.interval)
        : this.setState({ raceTime: this.state.raceTime - 100})
    ):null
  }
  
  timeConvert(time){

  let minutes = moment.duration(time).minutes()
  let seconds = moment.duration(time).seconds()
  let mills = moment.duration(time).milliseconds()
  

  if (seconds < 10) seconds = "0" + seconds;
  if (minutes < 10) minutes = "0" + minutes;
  
  if(moment.duration(time).minutes() <= 0) return(`${seconds}.${mills / 100}`);
  else return(`${minutes}:${seconds}`);
  
}


  

  render() {
    return ( 
      <div>
        {this.props.time}
      </div>
    );
  }
}

export default RaceTimer;
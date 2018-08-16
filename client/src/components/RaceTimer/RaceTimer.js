import React, { Component } from "react";
import moment from "moment";

class RaceTimer extends Component {
    constructor(props) {
      super(props);
      this.state = { 
        raceTime: '', 
        startTime: '', 
    }}
  
     timeConvert(time){
      let hours = moment.duration(time).hours()
      let minutes = moment.duration(time).minutes()
      let seconds = moment.duration(time).seconds()
      
      if (seconds < 10) seconds = "0" + seconds;
      if (minutes < 10) minutes = "0" + minutes;

    
      if(hours === 0) {
        return(minutes + ":" + seconds);
      } else {
          if(hours > 1) return (hours + " Hrs"); 
          else return(hours +  " hour");
        }
    }

    tick() {
      //check to see if race start time has passed
      moment().isSameOrAfter(this.state.raceTime)
      //true: clear interval 
      ? clearInterval(this.interval)
      //false: update current time  
      : this.setState({ startTime: Math.abs(moment().diff(this.state.raceTime).valueOf()) })
    }
    
    componentDidMount() {
      this.setState({raceTime: new moment(this.props.time)})
      // this.tick()
      this.interval = setInterval(() => this.tick(), 1000);
    }
  
    componentWillUnmount() {
      clearInterval(this.interval);
    }
  
    render() {
      return ( 
        <div>
          Race starts in { this.timeConvert(this.state.startTime)}
        </div>
      );
    }
  }
 
  export default RaceTimer;
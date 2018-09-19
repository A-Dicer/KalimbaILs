import React, { Component } from "react";
import Leaderboard from "../../components/Leaderboard";
import "./overlay.css";
import moment from "moment";
const io = require('socket.io-client')  
const socket = io() 

class Overlay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            kaliTitle: {opacit: 1},
            lobby: "",
            player: this.props.match.params.id,
            data: {}
        }
        socket.on(this.props.match.params.id, (data) => { 
            if(this.data)this.setState({kaliTitle: {opacity: 0}, data: data})
            else this.setState({kaliTitle: {opacity: 1}, data: data})
            if(this.state.data.race){
                console.log(this.state.data)
                if(this.state.data.race.started && !this.state.goTime){
                    console.log("timer")
                    this.setState({goTime: true})
                    this.interval = setInterval(() => this.tick(), 100)
                }  
            }
        })   
    }

    // when component mounts get user info
    componentDidMount() {}
    componentWillUnmount() {clearInterval(this.interval)}

//Time Convert -------------------------------------------------------------------------------------- 
    timeConvert(time, type){

        let minutes = moment.duration(time).minutes()
        let seconds = moment.duration(time).seconds()
        let mills
        type === 'clock' 
        ? mills = Math.floor(moment.duration(time).milliseconds()/100)
        : mills = Math.floor(moment.duration(time).milliseconds()/10)

        
        if (seconds < 10) seconds = `0${seconds}`
        
        if(type === 'clock'){
            if (mills === 0) mills = 0
            if (minutes < 10) minutes = `0${minutes}`
            if(minutes <= 0) return(`${seconds}.${mills}`);
            else return(`${minutes}:${seconds}`);
        } else {
            if (mills === 0) mills = ''
            else mills = `.${mills}`
            if (minutes < 10) minutes = `${minutes}`
            if(minutes <= 0) return(`${seconds}${mills}`);
            else return(`${minutes}:${seconds}${mills}`);
        }  
    }

//Tick Interval -------------------------------------------------------------------------------------
    tick = () => {
        let newTime = new moment()
        let startTime = moment(this.state.data.race.started)
        let time = this.state.data.race.time - newTime.diff(startTime, 'milliseconds')
        
        if(time <= 0){clearInterval(this.interval); this.setState({time: 0})}
        else this.setState({time: time})  
    }


    render() {
    return (
        
        <div className="container clb">
            
            { this.state.data.race
                ? <Leaderboard 
                    info={this.state.data.race.category} 
                    leaderboard={this.state.data.race.leaderboard}
                    level1={this.state.data.race.disLev[0]}
                    level2={this.state.data.race.disLev[1]}
                    level3={this.state.data.race.disLev[2]}
                    player={this.state.data.currentUser.username}
                    styles={this.state.data.race.styles}
                    started={this.state.data.race.started}
                    ready={this.state.data.race.ready}
                    time={this.timeConvert(this.state.time, "clock")}
                    playerInfo={this.state.data.playerInfo}
                    show={this.showUser}
                    hide={this.hideUser}
                    lStyle={this.state.data.race.started ? this.state.data.lStyle ? {height: "110px"} : {height: 0}: false}
                    levelVision={this.levelVision}
                    uStyle={this.state.data.race.leaderboard[this.state.data.playerInfo] ?this.state.data.uStyle :{height: 0, opacity: 0}}
                />
                : <img src={require("./kaliTitle.png")} style={this.state.kaliTitle} alt="Kalimba" />
            }
        </div>
        
       
                
    );
  }
}

export default Overlay;

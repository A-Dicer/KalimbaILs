import React, { Component } from "react";
import API from "../../utils/API";
import Nav from "../../components/Nav";
import moment from "moment";
import Chatbox from "../../components/Chatbox"
import { Container, Row, Col } from "../../components/Grid";
import Leaderboard from "../../components/Leaderboard";
import LevelInputs from "../../components/LevelInputs";
import "./Races.css";
import { isNullOrUndefined } from "util";

const io = require('socket.io-client')  
const socket = io() 

//set state and load component -------------------------------------------------------
class Races extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uStyle: {},
            playerInfo: 0,
            time: null,
            levelTimes:{ total: '', l1: '', l2: '', l3: ''},
            raceCheck: false,
            forfeitCheck: false, //not sure I need this 
            currentUser: [],
            chatBox: {msg: [], chat: [],chatInput: ""},
            lobby: this.props.match.params.id,    
        }

        socket.on(this.state.lobby, (data) => this.setState({race: data}))   
        socket.on(`chat${this.state.lobby}`, (data) => {
            let chatBox = Object.assign({}, this.state.chatBox);      
                chatBox.chat.push(data)
            this.setState({chatBox: chatBox})
        })
    }

    // when component mounts get race info
    componentDidMount() { this.loadRace(this.props.match.params.id), socket.emit('joinRoom', this.state.lobby)}
    componentWillUnmount() {clearInterval(this.interval), socket.emit('leaveRoom', this.state.lobby) }

//load races from api -------------------------------------------------------------------------------
    loadRace = (raceId) => {
        API.getRaceID(raceId)
            .then(res => { 
                const disLev = {
                    "_id": "", "levelid": "0", "name": "???", 
                    "location": "", "difficulty": "", "rank": "", 
                    "time": "", "type": ""
                }
               
                let inRace = this.inRace(res.data.results.leaderboard, res.data.sess.user.username)
                
                let race = Object.assign({}, this.state.race)
                    
                    race.started = res.data.results.started,
                    
                    
                    race.raceID = this.state.lobby
                    race.leaderboard = res.data.results.leaderboard
                    race.levels = res.data.results.levels
                    race.disLev = [disLev, disLev, disLev]
                  
                    race.category = res.data.results.category
                    // eslint-disable-next-line
                    race.styles = { 
                        lvStyle: race.started ? {height: "110px", opacity: 1} : null, 
                        lbStyle: {}, 
                        tStyle: race.started ? {height: "100px", opacity: 1} : null, 
                        iStyle: inRace && race.started ? {height: "438px", opacity: 1} : null, 
                    }
                    
                    race.time = 0

                    race.started ? race.levels.forEach((level, i) => race.disLev[i] = level) : isNullOrUndefined
                    race.levels.forEach((level)=> race.time += level.time) 
                    race.ready = (res.data.results.started ? true : false)

                    const player = race.leaderboard.filter(player => player.name === res.data.sess.user.username)
                    let levelTimes
                    
                    player.length
                    ?   levelTimes = player[0].times
                    :   levelTimes = { 
                        total: this.timeConvert(race.time), 
                        l1: this.timeConvert(race.levels[0].time), 
                        l2: this.timeConvert(race.levels[1].time), 
                        l3: this.timeConvert(race.levels[2].time)
                        }   
                    
                this.setState({raceCheck: inRace})
                this.setState({currentUser: res.data.sess.user, race: race, time: race.time, levelTimes: levelTimes}) 
            }
        ).catch(err => console.log(err));
    }

//ChatBox -------------------------------------------------------------------------------------------
    updateChatInput = (event) => {  
        const { value } = event.target;
        
        let chatBox = Object.assign({}, this.state.chatBox)
            chatBox.chatInput = value     
        this.setState({chatBox: chatBox})
        // eslint-disable-next-line
        event.key === "Enter" ? this.sendChat() : null
    }

    sendChat = () => {
        let data = { player: this.state.currentUser.username, message:this.state.chatBox.chatInput}
        socket.emit('sendChat', data, this.state.lobby )
        let chatBox = Object.assign({}, this.state.chatBox)
            chatBox.chatInput = ''    
        this.setState({chatBox: chatBox})         
    }


//Join Race -----------------------------------------------------------------------------------------
    joinRace = (event) => {
        event.preventDefault()

        let newInfo = Object.assign({}, this.state.race)
        const info = {
            name: this.state.currentUser.username,
            img: this.state.currentUser.imgLink,    
            times: { 
                total: this.timeConvert(this.state.race.time), 
                l1: this.timeConvert(this.state.race.levels[0].time), 
                l2: this.timeConvert(this.state.race.levels[1].time), 
                l3: this.timeConvert(this.state.race.levels[2].time)},
            direction: '',
            movement: '',
            ready: false,
        }

        newInfo.leaderboard.push(info)
       
        //send new leaderboard info to socket and DB
        this.setState({raceCheck: true})
        socket.emit('raceLogic', newInfo, this.state.lobby)
        socket.emit('sendChat', {player: "Hoebear", message: this.state.currentUser.username + " has joined"}, this.state.lobby)
        API.updateRace(this.state.lobby, {leaderboard: newInfo.leaderboard}).catch(err => console.log(err))
    }

//Leave Race ----------------------------------------------------------------------------------------
    leaveRace = () => {
        let newInfo = Object.assign({}, this.state.race)
        const data = this.state.race.leaderboard.filter(player => player.name !== this.state.currentUser.username)
        newInfo.leaderboard = data

        this.setState({raceCheck: false})
        socket.emit('leaveRoom', this.state.lobby)
        socket.emit('raceLogic', newInfo, this.state.lobby)
        socket.emit('sendChat', {player: "Hoebear", message: this.state.currentUser.username + " has left"}, this.state.lobby)
        API.updateRace(this.state.lobby, {leaderboard: newInfo.leaderboard}).catch(err => console.log(err))
    }

//Forfeit Race --------------------------------------------------------------------------------------
    forfeitRace = () => {
        let data = Object.assign({}, this.state.race.leaderboard)
        this.timeInputSubmit("forfeit")
        this.setState({raceCheck: false, forfeitCheck: true})
        
        socket.emit('sendChat', {player: "Hoebear", message: this.state.currentUser.username + " forfeited!"}, this.state.lobby)
        this.leaveRace()
    }

//In Race -------------------------------------------------------------------------------------------
    inRace = (lb, name) => {  
        let player = lb.filter(p => p.name === name)
        if(player.length) return true
        else return false
    }

//Handle Check Change -------------------------------------------------------------------------------
    handleCheckChange = event => {
        const {value} = event.target;

        let newInfo = Object.assign({}, this.state.race)
        let number
        newInfo.leaderboard.forEach((player, i) => player.name === this.state.currentUser.username ?number = i :null)
        newInfo.leaderboard[number].ready = document.getElementById(value).checked;

        socket.emit('raceLogic', newInfo, this.state.lobby)
   }

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
            if (mills == "0") mills = 0
            if (minutes < 10) minutes = `0${minutes}`
            if(minutes <= 0) return(`${seconds}.${mills}`);
            else return(`${minutes}:${seconds}`);
        } else {
            if (mills == "0") mills = ''
            else mills = `.${mills}`
            if (minutes < 10) minutes = `${minutes}`
            if(minutes <= 0) return(`${seconds}${mills}`);
            else return(`${minutes}:${seconds}${mills}`);
        }  
    }

//Time Invert ---------------------------------------------------------------------------------------  
    timeInvert = (time) =>{
        
        if(!time)time = "0"
        let newTime = time.split(":")
    
        if(newTime.length === 1) return parseFloat(newTime[0]) * 1000
        if(newTime.length === 2) return (parseInt(newTime[0] * 60, 10) + parseFloat(newTime[1])) * 1000  
    }

//Time Input Change ---------------------------------------------------------------------------------  
    timeInputChange = event => {
        const {value, name, id} = event.target;
       
        let newTimes = Object.assign({}, this.state.levelTimes); 
            newTimes[name]= value.replace(/[^0-9, :, .]/g, '')
            newTimes.total = this.timeInvert(newTimes.l1) + this.timeInvert(newTimes.l2) + this.timeInvert(newTimes.l3)
            newTimes.total = this.timeConvert(newTimes.total)
        this.setState({levelTimes: newTimes})
        
        event.key === "Enter" ? this.timeInputSubmit() : null
    };

//Time Input Submit --------------------------------------------------------------------------------- 
    timeInputSubmit = (forfeit) => {
 
        // let test = Object.assign({}, this.state.race)
        let data = JSON.parse(JSON.stringify(this.state.race))

        let userId; 
        data.leaderboard.forEach((user, i) => user.name === this.state.currentUser.username ? userId = i : null)
        
        forfeit
        ? data.leaderboard[userId].times.total = forfeit
        : data.leaderboard[userId].times = this.state.levelTimes
        
        data.leaderboard.sort(function compareNumbers(a, b){ 
            if(a.times.total === "forfeit")  return 1
            else return this.timeInvert(a.times.total) - this.timeInvert(b.times.total)
        }.bind(this))

        this.state.race.leaderboard.forEach((player, i)=>{
            data.leaderboard.forEach((p,a) =>{
                if(p.name === player.name){
                    if(i === a){ p.movement = ''; p.direction = ''}
                    else if(i < a){ p.movement = Math.abs(i - a); p.direction = 'fas fa-arrow-down'}
                    else { p.movement = Math.abs(i - a); p.direction = 'fas fa-arrow-up'}
                }
            })
        })

        socket.emit('leaderboard', data, this.state.lobby)
    }

//Show User ----------------------------------------------------------------------------------------- 
    showUser = (event) => {
        const {id} = event.target;
        console.log(`id: ${id}`)
        this.setState({playerInfo: id, uStyle:{height: "250px", opacity: 1} })
    }

//Hide User ----------------------------------------------------------------------------------------- 
    hideUser = () => {this.setState({uStyle:{height: 0, opacity: 0} })}

//Tick Interval -------------------------------------------------------------------------------------
    tick = () => {
        let newTime = new moment()
        let startTime = moment(this.state.race.started)
        let time = this.state.race.time - newTime.diff(startTime, 'milliseconds')
        
        time <= 0
        ? (clearInterval(this.interval), console.log(`done`), this.setState({time: 0}))
        : this.setState({time: time})  
    }

    test = () =>{
        this.state.race.started && !this.state.goTime
        ? (this.setState({goTime: true}), this.interval = setInterval(() => this.tick(), 100) )
        : null
    }
//Frontend Code ------------------------------------------------------------------------------------- 
    render() {
        return (
            <div>
                <Nav userInfo={this.state.currentUser}/>
                <div id="behindNav"></div>
              {this.state.race?this.test():null}
                <Container fluid>
                    <Row input="left">
                        <Col size="12 md-6">
                            <Chatbox 
                                chatBox={this.state.chatBox}
                                sendChat={this.sendChat}
                                updateChatInput={this.updateChatInput}
                                check={!this.state.raceCheck}
                                started={this.state.race ?this.state.race.started:null}
                                join={this.joinRace}
                                leave={this.leaveRace}
                                forfeit={this.forfeitRace} 
                                forfeitCheck={this.state.forfeitCheck}
                                ready={this.state.race?this.state.race.ready:null}
                            />

                            { this.state.race && this.state.raceCheck
                                ? <LevelInputs 
                                    levels={this.state.race.levels}
                                    levelTimes={this.state.levelTimes} 
                                    style={this.state.race.styles.iStyle}
                                    started={!this.state.race.started} 
                                    timeConvert={this.timeConvert} 
                                    change={this.timeInputChange}
                                    submit={this.timeInputSubmit}
                                /> 
                                : null
                            }

                            <div className="form-group" value='' onChange={this.handleCheckChange} name="ready" >
                                <div className="form-check form-check-inline"> 
                                    {   this.state.race
                                        ? 
                                        this.state.raceCheck && !this.state.race.ready
                                            ? <input 
                                                className="form-check-input"  
                                                type="checkbox" 
                                                name="ready" 
                                                id="readyCheck" 
                                                disabled={!this.state.raceCheck} 
                                                value="readyCheck" 
                                            /> 
                                            : null
                                        :null
                                    } 
                                    
                                    <label className="form-check-label"> 
                                        {   this.state.race
                                            ?
                                                this.state.raceCheck && !this.state.race.ready
                                                ?  `click to be ready`
                                                :null
                                            :null
                                        }
                                    </label>
                                </div>
                            </div>     
                        </Col>
                        <Col size="12 md-6" >        
                            <Row>
                                
                                <div className="col-12 clb">
                                    { this.state.race
                                    ?<Leaderboard 
                                        info={this.state.race.category} 
                                        leaderboard={this.state.race.leaderboard}
                                        level1={this.state.race.disLev[0]}
                                        level2={this.state.race.disLev[1]}
                                        level3={this.state.race.disLev[2]}
                                        player={this.state.currentUser.username}
                                        styles={this.state.race.styles}
                                        started={this.state.race.started}
                                        time={this.timeConvert(this.state.time, "clock")}
                                        playerInfo={this.state.playerInfo}
                                        show={this.showUser}
                                        hide={this.hideUser}
                                        uStyle={this.state.race.leaderboard[this.state.playerInfo] ?this.state.uStyle :{height: 0, opacity: 0}}
                                    />
                                    : null
                                    }
                                </div> 
                            </Row>          
                        </Col>
                    </Row>
                </Container>
            </div>            
        );
    }
}

export default Races;
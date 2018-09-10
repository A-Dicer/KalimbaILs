import React, { Component } from "react";
import API from "../../utils/API";
import Nav from "../../components/Nav";
import moment from "moment";
import Chatbox from "../../components/Chatbox"
import { Container, Row, Col } from "../../components/Grid";
import Leaderboard from "../../components/Leaderboard";
import "./Races.css";

const io = require('socket.io-client')  
const socket = io() 

//set state and load component -------------------------------------------------------
class Races extends Component {
    constructor(props) {
        super(props);
        this.state = {
            race: {},
            raceCheck: false,
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
    componentDidMount() { this.loadRace(this.props.match.params.id) }
    componentWillUnmount() {clearInterval(this.interval)}

//load races from api -------------------------------------------------------------------------------
    loadRace = (raceId) => {
        API.getRaceID(raceId)
            .then(res => {    
                let race = Object.assign({}, this.state.race)
                    race.category = res.data.results.category
                    race.raceID = this.state.lobby
                    race.leaderboard = res.data.results.leaderboard
                    race.levels = res.data.results.levels
                    race.disLev = [
                        {"_id": "", "levelid": "2", "name": " ", "location": "", "difficulty": "", "rank": "", "time": "","type": ""},
                        {"_id": "", "levelid": "1", "name": " ", "location": "", "difficulty": "", "rank": "", "time": "","type": ""},
                        {"_id": "", "levelid": "1", "name": " ", "location": "", "difficulty": "", "rank": "", "time": "","type": ""}
                    ]
                    // eslint-disable-next-line
                    race.ready = false,
                    race.styles = { 
                        lvStyle: {},
                        lbStyle: {},
                        tStyle: {},
                        btnStyle: []
                    }, 
                    race.started = res.data.results.started 
                    race.time = 0

                    race.levels.forEach((level)=> race.time += level.time)        

                this.setState({raceCheck: this.inRace(race.leaderboard, res.data.sess.user.username)})
                this.setState({currentUser: res.data.sess.user, race: race}) 
                console.log(race)
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
            times: { total: 0, l1: 0, l2: 0, l3: 0},
            direction: '',
            movement: 0,
            ready: false,
        }

        newInfo.leaderboard.push(info)
       
        //send new leaderboard info to socket and DB
        this.setState({raceCheck: true})
        socket.emit('joinRoom', this.state.lobby)
        socket.emit('raceLogic', newInfo, this.state.lobby)
        socket.emit('sendChat', {player: "Hoebear", message: this.state.currentUser.username + " has joined"}, this.state.lobby)
        API.updateRace(this.state.lobby, {leaderboard: newInfo.leaderboard}).catch(err => console.log(err))
        // API.updateUser(this.state.currentUser._id, {inRace: this.state.lobby}).catch(err => console.log(err))
    }

//Leave Race ----------------------------------------------------------------------------------------
    leaveRace = (event) => {
        event.preventDefault()

        let newInfo = Object.assign({}, this.state.race)
        const data = this.state.race.leaderboard.filter(player => player.name !== this.state.currentUser.username)
        newInfo.leaderboard = data

        this.setState({raceCheck: false})
        socket.emit('leaveRoom', this.state.lobby)
        socket.emit('raceLogic', newInfo, this.state.lobby)
        socket.emit('sendChat', {player: "Hoebear", message: this.state.currentUser.username + " has left"}, this.state.lobby)
        API.updateRace(this.state.lobby, {leaderboard: newInfo.leaderboard}).catch(err => console.log(err))
        // API.updateUser(this.state.currentUser._id, {inRace: null}).catch(err => console.log(err))
    }

//In Race -------------------------------------------------------------------------------------------
    inRace = (lb, name) => {      
        if(lb.filter(p => p.name === name).length) {
            socket.emit('joinRoom', this.state.lobby)
            return true
        } else return false
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
                <Nav userInfo={this.state.currentUser}/>
                <div id="behindNav"></div>

                <Container fluid>
                    <Row input="left">
                        <Col size="12 md-6">
                            <Chatbox 
                                chatBox={this.state.chatBox}
                                sendChat={this.sendChat}
                                updateChatInput={this.updateChatInput}
                                check={!this.state.raceCheck}
                            />
              
                            {this.state.raceCheck
                                ? <button className="btn btn-sm btn-info" onClick={this.leaveRace}> leave </button>
                                : <button className="btn btn-sm btn-info" onClick={this.joinRace}> join </button>
                            }
                            
                            <div className="form-group" value='' onChange={this.handleCheckChange} name="ready" >
                                <div className="form-check form-check-inline">
                                    {this.state.raceCheck
                                        ? <input 
                                        className="form-check-input"  
                                        type="checkbox" 
                                        name="ready" 
                                        id="readyCheck" 
                                        disabled={!this.state.raceCheck} 
                                        value="readyCheck" 
                                    />
                                        : null
                                    }
                                    <label className="form-check-label"></label>
                                </div>
                            </div>     
                        </Col>
                        <Col size="12 md-6" >        
                            <Row>
                                <div className="col-12 clb">
                                    { this.state.race.category
                                    ?<Leaderboard 
                                        info={this.state.race.category} 
                                        leaderboard={this.state.race.leaderboard}
                                        level1={this.state.race.disLev[0]}
                                        level2={this.state.race.disLev[1]}
                                        level3={this.state.race.disLev[2]}
                                        player={this.state.currentUser.username}
                                        styles={this.state.race.styles}
                                        started={this.state.race.started}
                                        time={this.timeConvert(this.state.race.time)}
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

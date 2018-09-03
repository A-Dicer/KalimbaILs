import React, { Component } from "react";
import API from "../../utils/API";
import Nav from "../../components/Nav";
import { MainContainer } from "../../components/Containers";
import moment from "moment";
import Chatbox from "../../components/Chatbox"
import { Container, Row, Col } from "../../components/Grid";
// import { Fade } from "../../components/Animation";
// import RaceTimer from "../../components/RaceTimer";
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
        
        socket.on('updateChat', (data) => {
            let chatBox = Object.assign({}, this.state.chatBox)       
                chatBox.chat.push(data)
            this.setState({chatBox: chatBox})
        })

        socket.on(this.state.lobby, (data) => { 
            let race = Object.assign({}, this.state.race)
                race.leaderboard = data
            this.setState({race: race})  
            socket.emit('userData', race , this.state.race.player) 
            this.checkReady()          
        })
    }

    // when component mounts get race info
    componentDidMount() { this.loadRace(this.props.match.params.id) }

//ChatBox ----------------------------------------------------------------------------
    updateChatInput = (event) => {  
        const { value } = event.target;
        
        let chatBox = Object.assign({}, this.state.chatBox)
            chatBox.chatInput = value     
        this.setState({chatBox: chatBox})

        event.key === "Enter" ? this.sendChat() : console.log("nope")
    }
    
    sendChat = () => {

        let data = { player: this.state.currentUser.username, message:this.state.chatBox.chatInput}
        console.log(data)
        socket.emit('sendChat', data )
        let chatBox = Object.assign({}, this.state.chatBox)
            chatBox.chatInput = ''    
        this.setState({chatBox: chatBox})   
        
    }

//load races from api ----------------------------------------------------------------
    loadRace = (raceId) => {
        API.getRaceID(raceId)
            .then(res => {    
                let race = Object.assign({}, this.state.race)
                    race.category = res.data.results.category
                    race.raceID = this.state.lobby
                    race.leaderboard = res.data.results.leaderboard
                    race.levels = res.data.results.levels
                    race.player = res.data.sess.user.username
                    race.ready = false,
                    race.styles = { 
                        lvStyle: {},
                        lbStyle: {},
                        btnStyle: []
                    }, 
                    race.started = res.data.results.started 
                    race.time = 0
                    race.levels.forEach((level)=> race.time += level.time )        

                this.setState({raceCheck: this.inRace(race.leaderboard, race.player)})
                this.setState({currentUser: res.data.sess.user, race: race}) 
                socket.emit('userData', race, race.player)  
                race.started ? this.timeDiff() : null 
            }
        ).catch(err => console.log(err));
    }

    update = (newInfo) => {
        
        socket.emit('userData', newInfo, this.state.race.player) //send data to users overlay 
        socket.emit('leaderboard', newInfo.leaderboard, this.state.lobby)
        API.updateRace(this.state.lobby, {leaderboard: newInfo.leaderboard}).catch(err => console.log(err))
        // API.updateUser(this.state.currentUser._id, {inRace: data}).catch(err => console.log(err))
    }



//Join Race --------------------------------------------------------------------------
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
        this.setState({raceCheck: true, race: newInfo})
        this.update(newInfo)
        // API.updateUser(this.state.currentUser._id, {inRace: this.state.lobby}).catch(err => console.log(err))
    }

    leaveRace = (event) => {
        event.preventDefault()

        let newInfo = Object.assign({}, this.state.race)
        const data = this.state.race.leaderboard.filter(player => player.name !== this.state.currentUser.username)
        newInfo.leaderboard = data

        this.setState({raceCheck: false, race: newInfo})
        this.update(newInfo)
        // API.updateUser(this.state.currentUser._id, {inRace: null}).catch(err => console.log(err))
    }
    
    timeDiff = () => {
        console.log(this.state.race.started)
        const time = new moment(this.state.race.started)
        const time2 = new moment() 
        console.log("time: " + time)
        console.log("time2: " + time2)
        let diff = time2.diff(time)
        console.log(diff)
        console.log("-----------------")
        console.log((this.state.race.time / 1000) / 60)
        console.log(((this.state.race.time - diff) / 1000)/60)
    }

    
    
    inRace = (lb, name) => {      
        if(lb.filter(p => p.name === name).length) 
        return true
        else return false
    }

    handleCheckChange = event => {
        const { name, value } = event.target;
        // let newInfo = Object.assign({}, this.state.race)
        // let number
        
        // newInfo.leaderboard.forEach((player, i) => player.name === this.state.race.player ?number = i:null)
        // newInfo.leaderboard[number].ready = document.getElementById(value).checked;

        // this.setState({race: newInfo})
        // this.update(newInfo) 
        
        // let ready = this.state.race.leaderboard.filter(player => player.ready === true)
        // if(this.state.race.leaderboard.length > 1) 
        // ready.length === this.state.race.leaderboard.length 
        // ?   (
        //     newInfo.started = new moment(),
        //     API.updateRace(this.state.lobby, {started: newInfo.started}).catch(err => console.log(err)),
        //     // socket.emit('leaderboard', newInfo.leaderboard, this.state.lobby),
        //     this.startRace() 
        //     )
        // : console.log("not ready")

        this.raceLogic()
    }

    checkReady = () => {
        let ready = this.state.race.leaderboard.filter(player => player.ready === true)
        if(this.state.race.leaderboard.length > 1) 
        ready.length === this.state.race.leaderboard.length ? this.raceLogic() : console.log("not ready")
    }

//Race Logic -------------------------------------------------------------------------
    raceLogic= () => {
       
        const time = new Date()
        console.log(time)

        //replace game info with hoebear chat section
        //hoebear talks(?)
        //reapace leave button with forfeit
        //show lelves section
        //"randomly" select the three levels
        //hoebear talks(?)
        //add levels input
        //replace hoebear chat with TIMER
        //start countdown
        //start timer
    }

    render() {
    return (
        <div>
        
        <Nav userInfo={this.state.currentUser}/>

        {/* This goes behind the Navbar to hide scroll */}
        <div id="behindNav"></div>

        {/* Main container for site */}
        <Container fluid>
            <Row input="left">
                <Col size="6">
                    <Chatbox 
                        chatBox={this.state.chatBox}
                        sendChat={this.sendChat}
                        updateChatInput={this.updateChatInput}
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
                <Col size="6" >        
                    <Row>
                        <div className="col-12 clb">
                            { this.state.race.category
                            ?<Leaderboard 
                                info={this.state.race.category} 
                                leaderboard={this.state.race.leaderboard}
                                levels={this.state.race.levels}
                                player={this.state.race.player}
                                styles={this.state.race.styles}
                                started={this.state.race.started}
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

import React, { Component } from "react";
import API from "../../utils/API";
import Nav from "../../components/Nav";
import { MainContainer, LeftSide, RightSide } from "../../components/Containers";
import { Fade } from "../../components/Animation";
import RaceTimer from "../../components/RaceTimer";
import moment from "moment";
import "./Races.css";

const io = require('socket.io-client')  
const socket = io() 

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            race:{ category: {difficulty: '', location: '', boss: ''}, players: []},
            currentUser: [],
            leftside: "races",
            rightside: "lobby",
            msg: [],
            run: false,
            lobby: this.props.match.params.id,
            chat: [],
            chatInput: "",
            
        }
        
        socket.on('test', (data) => { 
            // console.log(data)  
            this.updateCodeFromSockets(data)
        })
    
    }

    updateCodeFromSockets(payload) {
        // console.log(payload)
        let chat = this.state.chat
        
        chat.push(payload)
       this.setState({chat: chat})
    //    console.log(chat)
      }

    updateChatInput = (event) => {
        
        const { value } = event.target;

        this.setState({chatInput: value})
    }

    // when component mounts get race info
    componentDidMount() { this.loadRace(this.props.match.params.id) }

    loadRace = (raceId) => {
      
        API.getRaceID(raceId)
            .then(res => {    
                console.log(res.data.results)
                this.setState({currentUser: res.data.sess.passport.user, race: res.data.results})
                console.log(this.state.race)
            }
        ).catch(err => console.log(err));

    }

    sendChat = () => {
        // console.log(this.state.chatInput)
        socket.emit('testSend', this.state.chatInput)
    }

    render() {
    return (
        <div>
        {/* Navbar component */}
        <Nav 
            userInfo={this.state.currentUser} 
            button={this.logOut}  
        />

        {/* This goes behind the Navbar to hide scroll */}
        <div id="behindNav"></div>

        {/* Main container for site */}
        <MainContainer>
        <LeftSide />
        
        <div className="col-md-6" id="rightRow"> 
        <div className="col-12" >
       
        <div className="row">
            <div className="col-12">
                Start Time: {moment(this.state.race.category.startTime).format("MMMM Do, h:mm a")}
                
                { this.state.race.category.startTime
                    ? <RaceTimer time={this.state.race.category.startTime}/>
                : null
                }   
            </div>
            <div className="col-12">
                { this.state.race.category.difficulty
                    ? 'Difficulty: ' + this.state.race.category.difficulty
                    : null
                }
                 
            </div>
            <div className="col-12">
                { this.state.race.category.location
                    ? 'Locations: ' + this.state.race.category.location
                    : null
                }
                
            </div>
            <div className="col-12">
                { this.state.race.category.boss
                    ? 'Bosses Included'
                    : 'No Bosses'
                }
                
            </div>
            <div className="col-12">
                Players: {this.state.race.players.length}
            </div>
        </div>
        <hr /> 
        <div className="row" id="chatSection">
            <div className="col-12" id="chatBox">
                { this.state.chat.map((chat)=>(
                    <div>
                        {chat}
                    </div>
                ))}
            </div>
            <div className="col-12">
                <div className="row">
                    <div className="col-10" id="chatArea">
                        <input className="form-control" id="chatInput" type="text" placeholder="" onChange={this.updateChatInput} />
                    </div>
                    <div className="col-2" id="chatBtn" >
                        <button className="btn btn-info btn-sm chatBtn" onClick={this.sendChat} >Enter</button>
                    </div>
                </div> 
            </div> 
        </div>
        <br />
        <hr />           
    </div>
         
              
    </div>
        </MainContainer>
      </div>            
    );
  }
}

export default Main;

import React, { Component } from "react";
import API from "../../utils/API";
import Nav from "../../components/Nav";
import { MainContainer, LeftSide, RightSide } from "../../components/Containers";
import { Fade } from "../../components/Animation";
import "./Main.css";

const io = require('socket.io-client')  
const socket = io() 

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            races: [],
            currentUser: [],
            leftside: "races",
            rightside: "welcome",
            msg: [],
            run: false,
            lobby: "",
            
        }
        
        socket.on('get races', (payload) => {   
            this.updateCodeFromSockets(payload)
        })
    
    }

    updateCodeFromSockets(payload) {
        this.setState({races: payload})
      }

    // when component mounts get created races
    componentDidMount() {
        this.loadRaces();
        
    }

    loadRaces = () => {
        console.log("loading races")
        API.getRaces()
            .then(res => { 
                console.log(res.data.results)
                // eslint-disable-next-line         
                res.data.sess.user
                ? this.setState({currentUser: res.data.sess.user, races: res.data.results}) 
                : this.props.history.push("/")
            }
        ).catch(err => console.log(err));
    };

    raceBtn = () => {
        
        Fade("rightRow", 0)
        setTimeout(function(){
            this.setState({rightside: ""})
            Fade("rightRow", 1)
        }.bind(this), 600) 
    }

    updateTest = event => {
        event.preventDefault()
        if(this.state.rightside !== "createRace"){
            Fade("rightRow", 0)
            setTimeout(function(){
                this.setState({rightside: "createRace"})
                Fade("rightRow", 1)
            }.bind(this), 600) 
        }

    }

    test = event => {
        event.preventDefault()
        const { value } = event.target;
        window.location = "/races/" + value ; 
    }
    
    logOut = event => {
        event.preventDefault();
        this.props.history.push("/logout")
    };

    toggleEnterState = () => {
        let test = !(this.state.in)
        this.setState({ in: test });
      }

    render() {
    return (
        <div>
        {/* Navbar component */}
        <Nav userInfo={this.state.currentUser} button={this.logOut} />

        {/* This goes behind the Navbar to hide scroll */}
        <div id="behindNav"></div>

        {/* Main container for site */}
        <MainContainer>

            {/* Container for leftside components */}
            <LeftSide 
                type = {this.state.leftside}
                userInfo = {this.state.currentUser} 
                races = {this.state.races} 
                create = {this.updateTest}
                test = {this.test}
            />
            
            {/* Container for Rightside components */}
            <RightSide 
                type = {this.state.rightside}
                run = {this.state.run}
                raceBtn = {this.raceBtn} 
                loadRaces = {this.loadRaces}
                races = {this.state.races}
                lobby = {this.state.lobby}
            />  
         {/* <div>
            <button onClick={this.toggleEnterState}>Click to Enter</button>
        </div> */}
        </MainContainer>
      </div>            
    );
  }
}

export default Main;

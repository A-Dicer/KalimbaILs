import React, { Component } from "react";
import API from "../../utils/API";
import Nav from "../../components/Nav";
import { Container, Row, Col } from "../../components/Grid";
import RaceContainer from "../../components/RaceContainer";
import RaceCreate from "../../components/RaceCreate";
import Welcome from "../../components/Welcome";
import "./Main.css";

const io = require('socket.io-client')  
const socket = io() 

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            races: [],
            currentUser: [],
            msg: [],
            run: false,
            lobby: "", 
            type: 'races'    
        }  
        socket.on('getRaces', (payload) => {this.setState({races: payload})}) 
    }

    componentDidMount() {this.loadRaces()}

    loadRaces = () => {
        API.getRaces()
            .then(res => { 
                socket.emit("test")
                if(res.data.sess && res.data.sess.user){
                    this.setState({currentUser: res.data.sess.user, races: res.data.results})
                    socket.emit('overlay', {}, this.state.currentUser.username) 
                } else this.props.history.push("/")    
            }
        ).catch(err => console.log(err));
    };
  
    location = event => {
        event.preventDefault()
        const id = event.target.getAttribute('value')
        window.location = `/races/${id}` ; 
    }
    
    logOut = () => {this.props.history.push("/logout")}
    raceCreate = () => {this.setState({type: ""})}
    cancel = () => {this.setState({type: "races"})}
    
    render() {
    return (
        <div>
            {/* Navbar component */}
            <Nav userInfo={this.state.currentUser} button={this.logOut} />

            {/* This goes behind the Navbar to hide scroll */}
            <div id="behindNav"></div>

            {/* Main container for site */}
            
            <Container fluid>
                <Row input="left">
                    <Col size="12 md-6">
                        <div className="row clb" id="leftRow">
                            {this.state.type === "races" 
                            ?   <RaceContainer 
                                    userInfo = {this.state.currentUser} 
                                    races = {this.state.races} 
                                    raceCreate = {this.raceCreate}
                                    location = {this.location}
                                />
                            :   <RaceCreate cancel={this.cancel}/>
                            }
                        </div>
                    </Col>
                    <div className="col-md-6" id="rightRow">      
                        <Welcome />      
                    </div>     
                </Row>
            </Container>
        </div>            
    );
  }
}

export default Main;

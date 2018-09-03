import React, { Component } from "react";
import { Row, Col } from "../../components/Grid";
import Leaderboard from "../../components/Leaderboard";
import "./overlay.css";
const io = require('socket.io-client')  
const socket = io() 

class Overlay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            race: "",
            kaliTitle: {opacit: 1},
            lobby: "",
            player: this.props.match.params.id
        
        }

        socket.on(this.props.match.params.id, (data) => { 
            if(data) this.setState({kaliTitle: {opacity: 0}, race: data})
            else this.setState({kaliTitle: {opacity: 1}, race: data})  
            console.log(this.state)           
        })   
    }

    // when component mounts get user info
    componentDidMount() { 
        // socket.emit('userData', "Hello, darkness my ol' friend", "SonicScrewdrivr") 
    }

    render() {
    return (
        <div>
        <div className="container clb">
            
            { this.state.race
                ? <Leaderboard 
                    info={this.state.race.category} 
                    leaderboard={this.state.race.leaderboard} 
                    levels={this.state.race.levels}
                    player={this.state.race.player}
                    styles={this.state.race.styles}
                    started={this.state.race.started}
                />
                : <img src={require("./kaliTitle.png")} style={this.state.kaliTitle} alt="Kalimba" />
            }
            <Row>
                <Col size="12">
                    
                </Col>
            </Row>
        </div>
        
        </div>
                
    );
  }
}

export default Overlay;

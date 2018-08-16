import React, { Component } from "react";
import API from "../../utils/API";
import { Container, Row, Col } from "../../components/Grid";
import Hoebear from "../../components/HoeBear";
import Icon from "../../components/Icon";
import "./leaderBoard.css";

// const io = require('socket.io-client')  
// const socket = io() 

class LeaderBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: [], 
            pos1: "1vw",
            pos2: "11vw",
            pos3: "21vw",  
        }
        
        // socket.on('test', (data) => { 
        //     // console.log(data)  
        //     this.updateCodeFromSockets(data)
        // })
    
    }

    // updateCodeFromSockets(payload) {
    //     // console.log(payload)
    // }


    // when component mounts get race info
    componentDidMount() { 
        // this.loadRace(this.props.match.params.id) 
    }

    changePos = (event) => {
        event.preventDefault()
        const first = "1vw";
        const second = "11vw";
        const third = "21vw";

        this.setState({pos1: second, pos2: first, pos3: third})
        
        setTimeout( function(){
            this.setState({pos1: third, pos2: second, pos3: first})
        }.bind(this), 5000)
        
        setTimeout( function(){
            this.setState({pos1: first, pos2: second, pos3: third})
        }.bind(this), 10000)
        
    }


    render() {
    return (
        <Container>
            <Row input="lb">
                <Col  size="12">     
                <img 
                                                className="" 
                                                src='https://static-cdn.jtvnw.net/jtv_user_pictures/peabsnbeebs-profile_image-d8cab07252654119-300x300.png' 
                                                alt="twitch img" 
                                                id="hoebear" 
                                            />    
                </Col>
                <Col size="12">
                    <Row>
                        <Col size="4">
                            <Container>
                                <Row>
                                    <Col size="12">
                                       <div>  DecafDogChild </div>
                                      <hr />
                                    
                                     <div>image </div>
                                        
                                        <Icon id="fas fa-star" />
                                        <Icon id="fas fa-star" />
                                        <Icon id="fas fa-star" />
                                        <Icon id="fas fa-star" />
                                        <Icon id="fas fa-star" />
                                        <Icon id="fas fa-star-half-alt" />
                                        <Icon id="far fa-star" />
                                        <Icon id="far fa-star" />
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                        <Col size="4">
                        <Container>
                                <Row>
                                    <Col size="12">
                                       <div>MoonLightBandit</div>
                                      <hr />
                                    
                                     <div>image </div>
                                        
                                        <Icon id="fas fa-star" />
                                        <Icon id="fas fa-star" />
                                        <Icon id="fas fa-star" />
                                        <Icon id="fas fa-star" />
                                        <Icon id="fas fa-star" />
                                        <Icon id="fas fa-star-half-alt" />
                                        <Icon id="far fa-star" />
                                        <Icon id="far fa-star" />
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                        <Col size="4">
                        <Container>
                                <Row>
                                    <Col size="12">
                                       <div>  SpiritualOoze </div>
                                      <hr />
                                    
                                     <div>image </div>
                                        
                                        <Icon id="fas fa-star" />
                                        <Icon id="fas fa-star" />
                                        <Icon id="fas fa-star" />
                                        <Icon id="fas fa-star" />
                                        <Icon id="fas fa-star" />
                                        <Icon id="fas fa-star-half-alt" />
                                        <Icon id="far fa-star" />
                                        <Icon id="far fa-star" />
                                    </Col>
                                </Row>
                            </Container>
                        </Col>  
                    </Row>     
                </Col>
                <Col size="12">
                    20:35.23
                </Col>
                <Col size="12">
                    <Container>
                        <Row input="lbTest">
                            
                            <Col size="12">
                                1:
                            </Col>
                            <Col size="12">
                                2:
                            </Col>
                            <Col size="12">
                                3:
                            </Col>

                                <button 
                                    className='btn btn-info' 
                                    style={{top: this.state.pos1}} 
                                    onClick={this.changePos}
                                >  
                                    <Row>
                                        <Col size="2">
                                            
                                            <img 
                                                className="" 
                                                src='https://static-cdn.jtvnw.net/jtv_user_pictures/peabsnbeebs-profile_image-d8cab07252654119-300x300.png' 
                                                alt="twitch img" 
                                                id="" 
                                            /> 
                                        </Col> 
                                        <Col size="5">
                                            SonicScrewdrivr
                                        </Col>
                                        <Col size="3">
                                            20:00
                                        </Col>
                                        <Col size="2">
                                            <Icon id="fas fa-arrow-down" /> 1
                                        </Col>
                                    </Row>
                                </button> 
                                <button 
                                    className='btn btn-secondary' 
                                    style={{top: this.state.pos2}} 
                                    onClick={this.changePos}
                                >  
                                    <Row>
                                        <Col size="2">
                                            
                                            <img 
                                                className="" 
                                                src='https://static-cdn.jtvnw.net/jtv_user_pictures/peabsnbeebs-profile_image-d8cab07252654119-300x300.png' 
                                                alt="twitch img" 
                                                id="" 
                                            /> 
                                        </Col> 
                                        <Col size="5">
                                            Mark
                                        </Col>
                                        <Col size="3">
                                            8:00
                                        </Col>
                                        <Col size="2">
                                            <Icon id="fas fa-arrow-up" /> 10
                                        </Col>
                                    </Row>
                                </button>  
                                <button 
                                    className='btn btn-secondary' 
                                    style={{top: this.state.pos3}} 
                                    onClick={this.changePos}
                                >  
                                    <Row>
                                        <Col size="2">
                                            
                                            <img 
                                                className="" 
                                                src='https://static-cdn.jtvnw.net/jtv_user_pictures/peabsnbeebs-profile_image-d8cab07252654119-300x300.png' 
                                                alt="twitch img" 
                                                id="" 
                                            /> 
                                        </Col> 
                                        <Col size="5">
                                            steve
                                        </Col>
                                        <Col size="3">
                                            14:39
                                        </Col>
                                        <Col size="2">
                                            -
                                        </Col>
                                    </Row>
                                </button>         
                            
                            
                        </Row>
                    </Container>
                </Col>
            </Row>
        </Container>            
    );
  }
}

export default LeaderBoard;

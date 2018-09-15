import React, { Component } from "react";
import { Container, Row, Col } from "../../components/Grid";
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import Hoebear from "../../components/HoeBear";
import Icon from "../../components/Icon";
import Level from "../../components/Levels";
import "./leaderBoard.css"; 

const Fade = ({ children, ...props }) => (
    <CSSTransition appear={true} {...props} timeout={2000} classNames="fade">
      {children}
    </CSSTransition>
);

class LeaderBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
            pos: ["2px", "40px", "78px","116px", "154px"],
        }
    }

    componentDidMount() {
        setTimeout(function() {
            this.setState({containerStyle: {opacity: 1}, hbStyle: {height: "110px", opacity: 1}})
        }.bind(this), 500);     
    }

    render() {
        return ( 
            <div className="row lb" style={this.state.containerStyle}>
                <div className="col-12" style={this.state.hbStyle}>  
                    <Row> 
                        <Col size="5">  
                            <Hoebear />
                        </Col>
                        <Col size="7">
                            <Row>
                                <Col size="12">
                                { this.props.info.difficulty
                                    ? "Difficulty: " + this.props.info.difficulty
                                    : null
                                }
                                </Col>
                                <Col size="12">
                                { this.props.info.boss
                                    ? "Boss Levels: No"
                                    : "Boss Levels: Yes"
                                }
                                </Col>
                                <Col size="12">
                                Locations:
                                { this.props.info.location.length
                                    ? (
                                        this.props.info.location.map((loc, i) => (
                                            <img src={require("../../img/Backgrounds/" + loc + "2.png" )} key={loc + i} alt="" />
                                        )) 
                                    )    
                                    : " None"
                                }
                                </Col>
                            </Row>
                        </Col>
                    </Row>  
                </div>
                <div className="col-12" style={this.props.styles.lvStyle}>           
                    <Row>
                        <Level level={this.props.level1}/>
                        <Level level={this.props.level2}/>
                        <Level level={this.props.level3}/>
                    </Row>               
                </div>
                <div className="col-12" style={this.props.styles.tStyle}>
                    <Row>
                        <Col size="12">
                            {this.props.time} 
                        </Col>
                    </Row>         
                </div>
                <div className="col-12" style={{height: (38 * this.props.leaderboard.length)}}>
                    <Container>
                        <TransitionGroup className="row leaderboard">
                            <Col size="12" > 1:</Col>
                            <Col size="12" > 2:</Col>
                            <Col size="12" > 3:</Col>
                            <Col size="12" > 4:</Col>
                            <Col size="12" > 5:</Col>       
                        {
                            this.props.leaderboard.map((item, i) => (
                            
                                <Fade key={i+item.name}>
                                <button 
                                    className={`btn ${this.props.player === item.name ? "player" :"otp"}`}
                                    style={{top: this.state.pos[i]}}
                                    value={item.name}
                                    
                                >     
                                <Row>
                                    <Col size="2">  
                                        <img src={item.img} alt="" /> 
                                    </Col> 
                                    <Col size="5">
                                        {item.name}
                                    </Col>
                                    <Col size="3">
                                        {item.ready && !this.props.started ? 'Ready' : null}
                                        {this.props.started ? item.times.total : null}

                                        
                                    </Col>
                                    <Col size="2">
                                        {item.ready && !this.props.started ?<Icon id="fas fa-check-square" /> : null }
                                        {this.props.started ? <i className={item.direction} > {item.movement} </i> 
                                        
                                            : null
                                        }
                                    </Col>
                                </Row>
                                    <div className="clickable" id={i} onClick={this.props.started ?this.props.show :null} ></div>
                            </button>                                 
                            </Fade>
                            ))
                            }     
                        </TransitionGroup>
                    </Container>
                </div>
                <div className="col-12" style={this.props.uStyle}>
    
                {this.props.leaderboard[this.props.playerInfo]
                  ?  <Row input="playerInfo">
                        <Col size="12">                  
                            <img className="userBgImg" src={this.props.leaderboard[this.props.playerInfo].img} alt="Card cap" />   
                            <i className="fas fa-times-circle" onClick={this.props.hide}/>                        
                        </Col>
                        <div className="card-body text-center">
                            <img className="userImg" src={this.props.leaderboard[this.props.playerInfo].img} alt="Card cap" />
                            <h4>{this.props.leaderboard[this.props.playerInfo].name}</h4>
                            
                            <p> {this.props.level1.name}: {this.props.leaderboard[this.props.playerInfo].times.l1}</p>
                            <p> {this.props.level2.name}: {this.props.leaderboard[this.props.playerInfo].times.l2}</p>
                            <p> {this.props.level3.name}: {this.props.leaderboard[this.props.playerInfo].times.l3}</p>
                        </div>
                    </Row>
                    : null
                }
                </div>
            </div>      
        );
    }
}

export default LeaderBoard;

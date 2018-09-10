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
            containerStyle: {}, 
            hbStyle: {},
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
                        
                        <TransitionGroup className="col-7">
                            { this.props.started
                            ?(null)
                            :(
                            <Fade>
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
                            </Fade>
                            )}
                        </TransitionGroup>
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
                                   
                                    { this.props.leaderboard.map((item, i) => (
                                        <Fade key={item.name + i}>
                                            <Col size="12" key={item.name + i}> {i+1}: </Col>
                                        </Fade>
                                    ))
                                }{
                                    this.props.leaderboard.map((item, i) => (
                                    
                                        <Fade key={i+item.name}>
                                        <button 
                                            className={`btn ${this.props.player === item.name ? "player" :"otp"}`}
                                            style={{top: this.state.pos[i]}}
                                            onClick={this.changePos}
                                            key={i+item.name}
                                        >     
                                        <Row>
                                            <Col size="2">  
                                               <img src={item.img} alt="" /> 
                                            </Col> 
                                            <Col size="5">
                                                {item.name}
                                            </Col>
                                            <Col size="3">
                                                {this.props.leaderboard[i].ready ? 'Ready' : null}
                                                
                                            </Col>
                                            <Col size="2">
                                               {item.ready ?<Icon id="fas fa-check-square" /> : null }
                                            </Col>
                                        </Row>

                                    </button>                                 
                                    </Fade>
                                    ))
                                    }     
                                </TransitionGroup>
           
                        
                    </Container>
                </div>
            </div>
                
    );
  }
}

export default LeaderBoard;

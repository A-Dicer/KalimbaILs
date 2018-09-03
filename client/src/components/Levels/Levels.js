import React, { Component } from "react";
import { Container, Row, Col } from "../../components/Grid";
import Stars from "../../components/Stars"

let i = 0;
let message = "";
let newMsg = [];

class Levels extends Component {
    constructor(props) {
        super(props);
        this.state = {
            level: props.level,
        }
    }

    talking = () => {  
        let random = Math.floor((Math.random() * 3))
        random === this.state.face
        ? this.setState({face: 0})
        : this.setState({face: random})   
    }

    words = () => {
        message += newMsg[i]; 

        this.setState({msg: message })
        // eslint-disable-next-line
        i === newMsg.length - 1
        ? (
            clearInterval(this.interval),
            clearInterval(this.interval2),
            i = 0,
            this.setState({face: 0}),
            message = "",

            setTimeout(function(){
                this.setState({msg: ""})
            }.bind(this), 6000)     
        )
        : i++
    }

    test = (msg) => {
            newMsg = msg
            this.interval = setInterval(() => this.words(), 35);
            this.interval2 = setInterval(() => this.talking(), 150);
    }

    render() {
    return (
        
        <Col size="4">
            <Container>
                <Row>
                    <Col size="12">
                        <div>  {this.state.level.name} </div>
                        
                        <img src={require("../../img/Totems/" + (this.state.level.levelid -1) + ".png" )} alt="" />
                        
                        <Stars rank={this.state.level.rank}/>
                    </Col>
                </Row>
            </Container>
        </Col>    
        )
    }
}
                                                        
export default Levels;
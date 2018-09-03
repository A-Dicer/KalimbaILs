import React, { Component } from "react";
import Head from "./imgs";
import "./css/hoeBear.css";

let i = 0;
let message = "";
let newMsg = [];

class HoeBear extends Component {
    constructor(props) {
        super(props);
        this.state = {
            face: 0,
            msg: "",
            testMsg: "",
            run: false,  
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
        
        <div>
           
            <img className=""  id="hoebear" src={Head[this.state.face]} alt="Hoebear" />
        </div> 
          
        )
    }
}
                                                        
export default HoeBear;
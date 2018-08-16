import React, { Component } from "react";
import moment from "moment";
import "./Form.css";

export class TimeSelect extends Component {
    constructor(props) {
      super(props);
      this.state = { 
        part: moment().format('A').toString()  
    }}

    selection(info){
        let amount = 13; let i = 1; let format = 'h';
        if(info === "minute") { amount = 60; i = 0; format = 'mm' }
        for( i; i < amount; i++){
            let div = document.getElementById(info);
            // eslint-disable-next-line
            if(i == moment().format(format)) div.innerHTML += '<option selected>' + this.timeConvert(i, info) + '</option>'
            else div.innerHTML += '<option>' + this.timeConvert(i, info) + '</option>';
        }
        
    }
  
    timeConvert(time, info){
        if(info === 'minute'){
            if (time < 10) time = "0" + time;
        }
      return time;
    }
    
    componentDidMount() {
        this.selection('hour');
        this.selection('minute');
    }
  
    render() {
      return ( 
        <div className="row">
            <div className="col-12">
                <select className="form-control  float-left form-control-sm" name="hour" id="hour">
                    
                </select>
                
                <select className="form-control float-left form-control-sm" name="minute" id="minute"> 
                </select>
            
                <select className="form-control float-left form-control-sm" name="part" id="part" defaultValue={this.state.part} >
                    <option>AM</option>
                    <option>PM</option>
                </select>
            </div>
        </div>
      );
    }
  }
 
  
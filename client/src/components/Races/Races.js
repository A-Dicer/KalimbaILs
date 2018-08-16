import React from "react";
import moment from "moment";
import Icon from "../../components/Icon"

const Races = props => 
    
    <div className="col-12 raceBtn" >
        {/* button for race */}
        <button 
            type="button" 
            className="btn btn-info btn-sm btn-block btn-xs" 
            value = {props.value}
            onClick={props.test}
        > 
            {/* place info on page from props sent down */}
            {props.difficulty} / <Icon id="fa fa-user-circle"/> {props.players} / <Icon id="fa fa-clock-o"/> { moment(props.time).format("h:mm a") } 
        </button>                                
    </div>;

export default Races;
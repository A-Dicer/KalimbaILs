import React from "react";
import moment from "moment";
import Icon from "../../components/Icon"
import "./Races.css";

const Races = props => 
    
    <div className="col-12 raceBtn" >
        {/* button for race */}
        <button type="button" className="btn btn-info btn-sm btn-block" value={props._id}> 
            {/* place info on page from props sent down */}
            {props.difficulty} / <Icon id="fa fa-user-circle"/> {props.players} / <Icon id="fa fa-clock-o"/> { moment(props.time).format("h:mm a") } 
        </button>                                
    </div>;

export default Races;
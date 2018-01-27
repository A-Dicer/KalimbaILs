import React, { Component } from "react";
import API from "../../utils/API";
import "./Races.css";
import Races from "../Races";
import Icon from "../../components/Icon";

const RaceContainer = (props) =>

  <div className="row float-right" id="racesRow">
    <div className="col-12" id="racesCol">
    {
      props.races.length 
      ? 'Races Available'
      : 'No Races Available'
    }
        <div className="float-right">Create <Icon id="fa fa-plus-square" /></div>
        <hr />     
    </div>  
    
    {
      props.races.length 
      ? (
      props.races.map(race => (
        <Races 
          key={race._id} 
          difficulty={race.category.difficulty} 
          players={race.players.length} 
          time={race.category.startTime} 
          />
        ))     
      ) : console.log("")
    }
  </div>;
            
              
export default RaceContainer;
import React, { Component } from "react";
import API from "../../utils/API";
import "./Races.css";
import Races from "../Races";

class RaceContainer extends Component {
  state = {
    races: [],
  };

  componentDidMount() {
    this.loadRaces();
  }

  loadRaces = () => {
    API.getRaces()
      .then(res => {
          this.setState({ races: res.data.results})
        }
      ).catch(err => console.log(err));
  };

render() {
  return (
  <div className="row float-right" id="racesRow">
    <div className="col-12" id="racesCol">
       Races Available
        <div className="float-right">Create <i className="fa fa-plus-square" aria-hidden="true"></i></div>
        <hr />     
    </div>  
    
    {this.state.races.length ? (
      this.state.races.map(race => (<Races key={race._id} difficulty={race.category.difficulty} players={race.players.length} time={race.category.startTime} />))     
    ) : (
      <h6>No Races Available</h6>
    )}
  </div>
  )}
};
            
              
export default RaceContainer;
import React, { Component } from "react";
import API from "../../utils/API";
import Nav from "../../components/Nav";
import RaceContainer from "../../components/RaceContainer";
import RaceCreate from "../../components/RaceCreate";

import "./Main.css";

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            races: [],
            currentUser: [],
        }}

  componentDidMount() {
    this.loadRaces();
  }

  loadRaces = () => {
    API.getRaces()
        .then(res => {
            res.data.sess.passport.user
            ? this.setState({currentUser: res.data.sess.passport.user, races: res.data.results})
            : (console.log("not logged in"), this.props.history.push("/"))
        }
      ).catch(err => console.log(err));
  };

  logOut = event => {
    event.preventDefault();
    this.props.history.push("/logout")
  };

  render() {
    return (
      <div>
        <Nav userInfo={this.state.currentUser} button={this.logOut}  />
        <div id="behindNav"></div>

        <div className="container">
            <div className="row" id="mainRow">
                <div className="col align-self-center">
                    <div className="row" >         
                        <div className="col-md-6">
                            <RaceContainer userInfo={this.state.currentUser} races={this.state.races}/>
                        </div>
                        <div className="col-md-6">
                            <RaceCreate raceBtn={this.raceBtn} test={this.loadRaces}/>
                        </div>
                    </div>
                </div> 
            </div>
          </div>
      </div>            
    );
  }
}

export default Main;

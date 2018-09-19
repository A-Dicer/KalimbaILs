import React, { Component } from "react";
import API from "../../utils/API";
import "./Login.css";
import twitchLogo from "./twitchLogo.png";
import kaliLogo from "./kaliLogo.jpg";

class Login extends Component {
  state = {
    username: "",
    password: "",
    currentUser: ""
  };

  componentWillMount() {API.logout().catch(err => console.log(err))}

  handleFormSubmit = event => {
    event.preventDefault();
      window.location = "http://kalimbril.herokuapp.com/api/auth/twitch/callback"; 
   
  };

  render() {
    return (
      <div className="container">
        <div className="row" id="outer">
          <div className="col-sm-12 align-self-center">
            <div className="row justify-content-center rounded" id="inner">         
              <div className="col-12 text-center">
                <h4>Welcome to Kalimba IL's, please login below.</h4>                          
              </div>
              <div className="col-12 text-center">
                <img src={kaliLogo} className="img-thumbnail" alt="kalimba"/>                        
              </div>
              <div className="col-12 text-center">
                <button type="button" className="btn btn-info btn-lg" id="button" onClick={this.handleFormSubmit}> 
                  <img src={twitchLogo} className="img" alt="twitch logo" id="tLogo" />
                  Log in using Twitch
                </button>                     
              </div>
            </div>
          </div>
        </div>     
      </div>
    );
  }
}

export default Login;

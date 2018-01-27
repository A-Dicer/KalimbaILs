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

  componentWillMount() {
    API.logout()
      .catch(err => console.log(err))
  }
  // handleInputChange = event => {
  //   const { name, value } = event.target;
  //   this.setState({
  //     [name]: value
  //   });
  // };

  handleFormSubmit = event => {
    event.preventDefault();
    
      console.log("twitchAuth started")
      window.location = "http://localhost:3001/api/auth/twitch"; 
      
      // API.twitchAuth().then(console.log("start"))
      
          // if (res.request.responseURL) {
          //   window.location = res.request.responseURL;    
          // }
          // else {
          //   console.log("didn't work");
   
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

import React from "react";
import "./Nav.css";
import brandLogo from "./kaliNavLogo.png";
import RaceTimer from "../../components/RaceTimer";
import Icon from "../../components/Icon";

const Nav = (props) =>
    
  <nav className="navbar navbar-light bg-light fixed-top">
    <a className="navbar-brand" href=""> 
        <img src={ brandLogo } alt="brandLogo" id="brandLogo" />
    </a>
    <div className="row" id="userRow">
        <div className="col-8">
            <div className="row">
                <div className="col-12 text-right"  id="userName">
                  { props.userInfo.userName }
                </div>
                <div className="col-12 text-right" id="raceStatus">
                  { props.userInfo.inRace ? <RaceTimer/> : 'Not in a Race' }
                </div>
            </div>
        </div>
        <div className="col-4" style={{padding: 0}}>
            <img className="" src={ props.userInfo.imgLink } alt="twitch img" id="userImg" />  
            <button type="submit" className="btn btn-secondary btn-sm" id="logOut" onClick={props.button}><Icon id="fa fa-sign-out fa-lg"/></button>
        </div>
        
    </div>  
  </nav>;

export default Nav;

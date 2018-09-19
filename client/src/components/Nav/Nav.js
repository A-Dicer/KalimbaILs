import React from "react";
import "./Nav.css";
import Icon from "../../components/Icon";

const logOut = event => {event.preventDefault(); window.location = "/logout"};

const Nav = (props) =>
    
    <nav className="navbar navbar-expand-sm navbar-light bg-light fixed-top">
        <a className="navbar-brand" href="/main"> 
            <img src={require("../../img/kaliTitle.png")} alt="" id="brandLogo" />
        </a>
        {   props.userInfo.username
            ?<div className="row" id="userRow">
                <div className="col-8">
                    <div className="row collapse navbar-collapse">
                    <div className="col-12 text-right"  id="userName">
                            { props.userInfo.username }
                        </div> 
                        <div className="col-12 text-right" id="raceStatus">
                            Signed in
                        </div>            
                    </div>
                </div>
                <div className="col-4" style={{padding: 0}}>
                    <img className="" src={ props.userInfo.imgLink } alt="twitch img" id="userImg" />  
                    <button type="submit" className="btn btn-secondary btn-sm" id="logOut" onClick={logOut}><Icon id="fas fa-sign-out-alt "/></button>
                </div>  
            </div> 
            : null
        }
    </nav>

export default Nav;

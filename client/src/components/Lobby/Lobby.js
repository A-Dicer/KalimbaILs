
import React from "react";
import "./lobby.css";

const Lobby = props => 
    
    <div className="col-12" >
       {console.log(props)}
        <div className="row">
            <div className="col-12">
               Start Time: 
            </div>
            <div className="col-12">
                Difficulty: Hard
            </div>
            <div className="col-12">
                Locations: MiddleWorld, DarkVoid
            </div>
            <div className="col-12">
                No Bosses
            </div>
            <div className="col-12">
                Players: 
            </div>
        </div>
        <hr /> 
        <div className="row" id="chatSection">
            <div className="col-12" id="chatBox">
            </div>
            <div className="col-12">
                <div className="row">
                    <div className="col-10" id="chatArea">
                        <input className="form-control" id="chatInput" type="text" placeholder="" />
                    </div>
                    <div className="col-2" id="chatBtn" >
                        <button className="btn btn-info btn-sm chatBtn" >Enter</button>
                    </div>
                </div> 
            </div> 
        </div>
        <br />
        <hr />           
    </div>;

export default Lobby;
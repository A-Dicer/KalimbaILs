import React from "react";
// import HoeBear from "../../components/HoeBear";
import RaceCreate from "../../components/RaceCreate";
import Welcome from "../../components/Welcome";
import Lobby from "../../components/Lobby";
// import Game from "../../components/Game";
// import { Fade } from "../../components/Animation";

function Switch({...props}) {
    switch(props.type){
        case "createRace": return <RaceCreate {...props} />
        case "lobby": return <Lobby {...props} />
        // case "game": return <Game {...props} />
        default: return <Welcome />
    }
}

export const RightSide = (props) =>
    <div className="col-md-6" id="rightRow">      
        <Switch {...props} />        
    </div>
    
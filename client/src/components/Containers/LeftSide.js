import React from "react";
import RaceContainer from "../../components/RaceContainer";

export const LeftSide = (props) =>
    <div className="col-md-6">
        <div className="row" id="leftRow">
            {props.type === "races" ? (
                <RaceContainer 
                    userInfo = {props.currentUser} 
                    races = {props.races} 
                    create = {props.create}
                    test = {props.test}
                />
            ) : (
                console.log("no races")
            )}
        </div>
    </div>




                        
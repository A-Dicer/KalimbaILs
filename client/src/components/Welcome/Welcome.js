import React from "react";

const Welcome = props => 
    
    <div className="col-12" >
       <h4> Welcome to Kalimba RIL Races </h4>
       <hr />
       <p> 
           If you have never been here before it is very simple.  On the left is a list of races 
           you can join.  Each race will randomly select three levels based on what parameters
           have been selected (Difficulty, Location, Etc).  When the race starts you have a 
           designated amount of time to complete the levels as fast as possible.  The person with
           the fastest overall time wins.  If it seems confusing now it won't after you play.
        </p>
        <p>
            Once the race starts the levels will be revealed.  When you complete a level you will
            update the time using the form to the left of the leader board.  When you submit your time
            it will update the leader board for everyone to see. 
        </p>                           
        <p>
            Good luck and have fun!
        </p>
        <hr />
        <p>
           - SonicScrewdrivr
        </p>
        

    </div>;

export default Welcome;
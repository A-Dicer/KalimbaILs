import React from "react";

export const MainContainer = ({ children }) =>
<div className="container">
    <div className="row" id="mainRow">
        <div className="col align-self-center">
            <div className="row"> 
                {children}
            </div>
        </div> 
    </div>
</div>;
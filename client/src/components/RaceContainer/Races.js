import React from "react";
import "./Races.css";

export const Races = ({ children }) => {
    return (
    <div className="col-12 raceBtn">
    <button type="button" className="btn btn-info btn-sm btn-block">Hard / <i className="fa fa-user-circle" aria-hidden="true"></i> 4 / <i className="fa fa-clock-o" aria-hidden="true"></i> 5:01 </button>                                
    </div>
    );
};
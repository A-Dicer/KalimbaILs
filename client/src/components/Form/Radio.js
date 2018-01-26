import React from "react";

export const Radio = props =>
<div className="form-check form-check-inline">
    <input className="form-check-input" type="radio" name="difficulty" id={props.id} value={props.id}/>
    <label className="form-check-label" htmlFor={props.id}>{props.id}</label>
</div>;
  
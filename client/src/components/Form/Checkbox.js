import React from "react";

export const Checkbox = props =>
<div className="form-check form-check-inline">
    <input className="form-check-input"  type="checkbox" name="location" id={props.id} value={props.id} />
    <label className="form-check-label">{props.id}</label>
</div>;
  
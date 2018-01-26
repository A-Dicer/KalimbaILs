import React from "react";

const Leftside = ({ children }) =>
  <div style={{ height: 300 }} className="jumbotron">
    {children}
  </div>;

<div className="col-md-6" style="color: #000">
<div className="row float-right" style="margin: 5px 6px 5px; background: #fff; width: 360px; padding: 10px; border: solid #ccc 1px; border-radius: 5px; box-shadow: 1px 1px 1px 0px #737373">
    <div className="col-12" style="padding: 0" >
        Races Available
        <div className="float-right">Create <i class="fa fa-plus-square" aria-hidden="true"></i></div>
        <hr style="margin: 2px 0 10px" />     
    </div>   
    <button type="button" className="btn btn-info btn-sm btn-block">Hard / <i className="fa fa-user-circle" aria-hidden="true"></i> 4 / <i className="fa fa-clock-o" aria-hidden="true"></i> 5:01 </button>                                
    <button type="button" className="btn btn-info btn-sm btn-block">Easy / <i className="fa fa-user-circle" aria-hidden="true"></i> 2 / <i className="fa fa-clock-o" aria-hidden="true"></i> 3:26 </button>
    <button type="button" className="btn btn-secondary btn-sm btn-block">Very Hard / <i className="fa fa-user-circle" aria-hidden="true"></i> 10 / <i className="fa fa-clock-o" aria-hidden="true"></i> Started </button>                                                                
</div>           
</div>

export default Leftside;

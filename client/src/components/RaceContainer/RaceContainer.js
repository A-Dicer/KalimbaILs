import React from "react";
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import Icon from "../../components/Icon";
import "./raceContainer.css";
import { isNullOrUndefined } from "util";

const Fade = ({ children, ...props }) => (
  <CSSTransition appear={true} {...props} timeout={2000} classNames="fade">
    {children}
  </CSSTransition>
);

const RaceContainer = (props) =>

  <div className="col-12">
  <div className="row" id="racesRow">
    <div className="col-12" id="racesCol">
      <h3> <Icon id="fas fa-stopwatch" /> { props.races.length ? 'Available Races' : 'No Races' } </h3>
        <div className="" id="createBtn" onClick={props.raceCreate}>
          Create <Icon id="fa fa-plus-square" />      
        </div>   
    </div>  
    <div className="col-12">
      <TransitionGroup className="row raceBtns">
      { props.races.map((item, i) => (
        <Fade key={item._id} >
    
          <div className="col-12 raceBtn" >
            <button 
                type="button" 
                className={`btn btn-block ${item.started ? "started" : isNullOrUndefined}`}
                value = {item._id}
                onClick={props.location}
                disabled={item.done ? true : false}
               
            > 

                {/* place info on page from props sent down */}
                {item.category.difficulty ? `${item.category.difficulty} ` : null}
                 <i className="fa fa-user-circle" value={item._id}/> {item.leaderboard.length} 
                 {!item.category.boss ? ` Boss: Yes ` : ` Boss: No `}
                 {item.category.location.length ? item.category.location.map((loc, i)=> <img src={require("../../img/Backgrounds/" + loc + "2.png" )} key={loc + i} className="locBtn"  value={item._id} alt="" />) : null}
            </button>                                
          </div>
        </Fade>
        ))}
        </TransitionGroup>  
      </div>
      </div>   
  </div>;
            
              
export default RaceContainer;
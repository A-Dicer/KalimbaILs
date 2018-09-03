import React from "react";
import Races from "../Races";
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import Icon from "../../components/Icon";
import "./raceContainer.css";

const Fade = ({ children, ...props }) => (
  <CSSTransition appear={true} {...props} timeout={1000} classNames="fade">
    {children}
  </CSSTransition>
);

const RaceContainer = (props) =>

  <div className="row" id="racesRow">
    <div className="col-12" id="racesCol">
      { props.races.length ? 'Races Available' : 'No Races Available' }
      <div className="float-right" id="createBtn" onClick={props.create}>
        Create Race <Icon id="fa fa-plus-square" />      
      </div>
      <hr />     
    </div>  
    
    {
      props.races.length 
      ? (
      <TransitionGroup className="col-12 raceBtns">
      { props.races.map((item, i) => (
        <Fade key={item._id} >
          <Races 
            key = {item._id}
            value= {item._id} 
            difficulty = {item.category.difficulty} 
            players = {item.players.length} 
            time = {item.category.startTime} 
            test = {props.test}
          />
        </Fade>
        ))}
        </TransitionGroup>     
      ) : null
    }
  </div>;
            
              
export default RaceContainer;
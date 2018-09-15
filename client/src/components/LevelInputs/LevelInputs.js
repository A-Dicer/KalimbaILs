import React from "react";
import Icon from "../../components/Icon";
import Stars from "../../components/Stars";
import { Container, Row, Col } from "../../components/Grid";

import "./LevelInputs.css"

const LevelInputs = ({levels, style, started, change, submit, levelTimes}) =>     
      
    <div className="row inputContainer" style={style}>
        <Col size="12">
            <h2> <Icon id="fas fa-tasks" /> Level Input</h2>
        </Col>
         <Col size="12">
            {levels.map((level, i) => 
                <div className="row levelsInput" key={level._id}>
                    <Col size="6">
                        <h4> {level.name}</h4>
                        {level.location} / {level.rank}<br />

                         -  Your Time - 
                         <input 
                            className="form-control" 
                            type="text" 
                            value={levelTimes[`l${i+1}`]} 
                            name={`l${i+1}`}
                            onChange={change}
                            maxLength="8"
                            onKeyPress={change}
                            disabled={started}
                        />
                       
                    </Col>
                    <Col size="6">
                        <img src={require(`../../img/TotemHeads/${level.levelid}.png`)} id="totemHead" alt="" />
                        <img src={require(`../../img/Backgrounds/${level.location}.png`)} id="totemBackground" alt="" />
                    </Col>     
                </div>
            )}
        </Col>
        <Col size="12">
            <Row>
                <Col size="10">
                    <h4> 
                        <Icon id="far fa-clock" /> Total Time: {levelTimes.total}  
                    </h4> 
                </Col>
                <Col size="2">
                    <button className="btn btn-sm btn-info" onClick={submit}>update</button>
                </Col>
            </Row>         
        </Col>
    </div>
         
export default LevelInputs;
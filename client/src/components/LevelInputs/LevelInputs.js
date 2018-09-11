import React from "react";
import Stars from "../../components/Stars";
import { Container, Row, Col } from "../../components/Grid";

import "./LevelInputs.css"

const LevelInputs = ({levels}) =>     
      
    <Row input="inputContainer">
         <Col size="12">
            {levels.map((level, i) => 
                <div className="row levelsInput" key={level._id}>
                    <Col size="6">
                        
                           <h4> {level.name}</h4>
                           {level.location} / {level.rank} <br />

                         -  Your Time - 
                         <input 
                                className="form-control" 
                                type="text" 
                                placeholder={level.time} 
                                // onChange={updateChatInput} 
                                // value={chatBox.chatInput}
                                // onKeyPress={updateChatInput}
                                // disabled={check}
                            />
                       
                    </Col>
                    <Col size="6">
                        <img src={require(`../../img/TotemHeads/${level.levelid}.png`)} id="totemHead" alt="" />
                        <img src={require(`../../img/Backgrounds/${level.location}.png`)} id="totemBackground" alt="" />
                    </Col>     
                </div>
            )}
        </Col>
    </Row>
         
export default LevelInputs;
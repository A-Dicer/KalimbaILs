import React from "react";
import { Container, Row, Col } from "../../components/Grid";
import Stars from "../../components/Stars";

const Levels = ({level}) =>     
        <Col size="4">
            <Container>
                <Row>
                    <Col size="12">
                        <div>  {level.name} </div>
                        <img src={require(`../../img/TotemHeads/${level.levelid}.png`)} className="totemHead" alt="" />
                        {
                            level.location 
                            ? <img src={require(`../../img/Backgrounds/${level.location}.png`)} className="totemBg" alt="" /> 
                            : <img src={require("../../img/Backgrounds/UnderWorld.png" )} className="totemBg" alt="" /> 
                        }
                        <Stars rank={level.rank}/>
                    </Col>
                </Row>
            </Container>
        </Col>    

export default Levels;
import React from "react";
import { Container, Row, Col } from "../../components/Grid";
import Stars from "../../components/Stars"

const Levels = ({level}) =>     
        <Col size="4">
            <Container>
                <Row>
                    <Col size="12">
                        <div>  {level.name} </div>
                        <img src={require("../../img/Totems/" + (level.levelid -1) + ".png" )} alt="" />
                        <Stars rank={level.rank}/>
                    </Col>
                </Row>
            </Container>
        </Col>    

export default Levels;
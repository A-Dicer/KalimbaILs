import React from "react";
import { Row, Col } from "../../components/Grid";
import "./chatbox.css"

const Chatbox = ({chatBox, sendChat, updateChatInput, check, started, join, leave, forfeit, ready, done}) => (
    <Row input="chatSection">
                
        <Col size="12">
            {   started && !check && !done
                ? <button className="btn btn-sm btn-info" onClick={forfeit}> Forfeit </button>
                :   ready 
                    ? null
                    :   !check
                        ? <button className="btn btn-sm btn-info" onClick={leave}> leave </button>
                        : <button className="btn btn-sm btn-info" onClick={join}> join </button>     
            }  
            <Row input="chatBox">    
                {chatBox.chat.map((chat, i)=>(
                    <div className="col-12" key={`chat${i}`}>
                        <div className={"chatPlayer " + chat.player}>{`${chat.player}: `}</div>
                        {chat.message}
                    </div>     
                ))} 
            </Row>
        </Col>
        <Col size="12">
            <Row input="chatInput">
                <Col size="10">
                    <input 
                        className="form-control" 
                        type="text" 
                        placeholder="" 
                        onChange={updateChatInput} 
                        value={chatBox.chatInput}
                        onKeyPress={updateChatInput}
                        disabled={check}
                    />
                </Col>
                
                <Col size="2">
                    <button 
                        className="btn btn-info btn-sm" 
                        onClick={chatBox.chatInput ?sendChat:null} 
                        disabled={check}
                    >Send</button>
                </Col>
            </Row>  
        </Col> 
    </Row>
    );

    export default Chatbox;
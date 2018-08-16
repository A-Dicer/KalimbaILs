import React, { Component } from "react";
import API from "../../utils/API";

class TestPage extends Component {

    send = event => {
        
        event.preventDefault()

        let input = document.getElementById('message').value
        let test =  input.split("");
        
        let message = {
           name: document.getElementById('name').value,  
           type: document.getElementById('type').value, 
           msg: test 
        }
        
      API.saveMsg(message)
      .then(
        console.log(message)           
      ) 
      .catch(err => console.log(err));
    }

  render() {
    return (

        <div className="container">

            {/* <Test /> */}

            <div className="row" id="mainRow">
                <div className="col align-self-center">
                    <div className="row" >         
                        <div className="col-md-12">
                            <form>
                                <h4>Message Form</h4>
                                <hr />           
                                <input className="form-control form-control-sm" type="text" id="name" placeholder="Name"  style={{width: 300}}/>
                                <input className="form-control form-control-sm" type="text" id="type" placeholder="Type"  style={{width: 300}}/>
                                <textarea className="form-control form-control-sm" id="message" rows="10" style={{width: 300}}></textarea>
                                <button type="submit" className="btn btn-secondary btn-sm"
                                onClick={this.send}>Send</button>                              
                            </form> 
                        </div>
                    </div> 
                </div>
            </div>
        </div>
           
    );
  }
}

export default TestPage;

import React, { Component } from "react";
import API from "../../utils/API";
import Nav from "../../components/Nav";
import RaceContainer from "../../components/RaceContainer";
import RaceCreate from "../../components/RaceCreate";

import "./Main.css";

class Main extends Component {
  state = {
    users: [],
    currentUser: [],
  };

  componentDidMount() {
    this.loadUsers();
  }

  loadUsers = () => {
    API.getUsers()
      .then(res => {
          this.setState({currentUser: res.data.sess.passport.user, users: res.data.results})
          console.log();
        }
      ).catch(err => console.log(err));
  };

  // handleInputChange = event => {
  //   const { name, value } = event.target;
  //   this.setState({
  //     [name]: value
  //   });
  // };

  // handleFormSubmit = event => {
  //   event.preventDefault();
  //   if (this.state.title && this.state.author) {
  //     API.saveBook({
  //       title: this.state.title,
  //       author: this.state.author,
  //       synopsis: this.state.synopsis
  //     })
  //       .then(res => this.loadBooks())
  //       .catch(err => console.log(err));
  //   }
  // };

  render() {
    return (
      <div>
  
        <Nav userInfo={this.state.currentUser} />
        <div id="behindNav"></div>

        <div className="container">
            <div className="row" id="mainRow">
                <div className="col align-self-center">
                    <div className="row" >         
                        <div className="col-md-6">
                            <RaceContainer />
                        </div>
                        <div className="col-md-6">
                            <RaceCreate />
                            {/* <div className="row" style="margin: 5px; background: #fff; border: solid rgb(113, 113, 113) 1px; border-radius: 5px; box-shadow: 1px 1px 1px 0px #737373">
                                <div className="col-12 " style="height: 50px; background: #a370d0; border-bottom: solid #000 1px; border-radius: 5px 5px 0 0; background-image: url('pixelBackground.jpg');" >
                                    <div className="row">
                                        <div className="col-3">
                                            <img className="mx-auto d-block" src="hoebearHead.png" style="height: 48px;" />
                                        </div>
                                        
                                        <div className="col-1" style="padding: 0; margin: 0">
                                            <i className="fa fa-caret-left fa-4x" aria-hidden="true" style="position: absolute; right: -3px; top: -8px; color: #fff"></i>
                                        </div>
                                        <div className="col-8 text-center align-self-center" style="background: #fff; padding: 0; margin: 6px 0; height: 37px; z-index: 1; font-size: 13px">
                                            Hoebear hates you a;lskdjf a;lksdj fsd
                                        </div> 
                                    </div>   
                                </div> 
                                <div className="col-12" style="margin: 5px">
                                        <form>
                                                <div className="form-group">
                                                  <label for="exampleFormControlInput1">Email address</label>
                                                  <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                                                </div>
                                                <div className="form-group">
                                                  <label for="exampleFormControlSelect1">Example select</label>
                                                  <select className="form-control" id="exampleFormControlSelect1">
                                                    <option>1</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4</option>
                                                    <option>5</option>
                                                  </select>
                                                </div>
                                                
                        
                                              </form>   
                                </div>                                                        
                            </div>                         */}
                        </div>
                    </div>
                </div> 
            </div>
          </div>
      </div>            
    );
  }
}

export default Main;

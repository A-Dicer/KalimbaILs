import React, { Component } from "react";
import API from "../../utils/API";
import Jumbotron from "../../components/Jumbotron";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import Nav from "../../components/Nav";

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
        console.log("getUsers");
        console.log("why does it not work after this")
        // console.log(res.data.sess.passport.user)
        if(!res.data.sess.passport){
          console.log("not logged in");
          this.props.history.push("/");
        } else {
          console.log("logged in");
          // console.log("user:", res.data.sess.passport.user);
          this.setState({currentUser: res.data.sess.passport.user, users: res.data.results})
        }
      })
      .catch(err => console.log(err));
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
   
  }
}

export default Twitch;

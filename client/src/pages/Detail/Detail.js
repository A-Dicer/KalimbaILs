import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import Nav from "../../components/Nav";

class Detail extends Component {
  state = {
    book: {},
    currentUser: ""
  };

  componentDidMount() {
    API.getBook(this.props.match.params.id)
      .then(res => {
        if (res.data.statusCode == 401) {
          this.props.history.push("/login");
        }
        else {
          console.log("user:", res.data.sess);
          this.setState({ currentUser: res.data.sess.passport.user, book: res.data.results })
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <Nav userInfo={this.state.currentUser} />
        <Container fluid>
          <Row>
            <Col size="md-12">
              <Jumbotron>
                <h1>
                  {this.state.book.title} by {this.state.book.author}
                </h1>
              </Jumbotron>
            </Col>
          </Row>
          <Row>
            <Col size="md-10 md-offset-1">
              <article>
                <h1>Synopsis</h1>
                <p>
                  {this.state.book.synopsis}
                </p>
              </article>
            </Col>
          </Row>
          <Row>
            <Col size="md-2">
              <Link to="/">← Back to Authors</Link>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Detail;

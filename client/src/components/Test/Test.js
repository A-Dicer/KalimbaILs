
import React, { Component } from "react";
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import API from "../../utils/API";
import "./test.css";

const Fade = ({ children, ...props }) => (
    <CSSTransition {...props} timeout={1000} classNames="fade" >
      {children}
    </CSSTransition>
  );

const Show = ({ children, ...props }) => (
    <CSSTransition {...props} timeout={1000} classNames="show" >
      {children}
    </CSSTransition>
  );

class Test extends Component {
    constructor(props) {
      super(props)
      this.state = { 
          items: [] 
        }
    }

    componentDidMount() {
        this.loadRaces();
      }
    
      loadRaces = () => {
        API.getRaces()
            .then(res => {            
                this.setState({items: res.data.results})
            }
          ).catch(err => console.log(err));
      };

    handleAdd() {
      this.setState({
        items: [
          ...this.state.items,
          prompt('Enter some text')
        ]
      });
    }

    handleRemove(i) {
      let newItems = this.state.items.slice();
      newItems.splice(i, 1);
      this.setState({ items: newItems });
    }

    change(div) {
      console.log("blip")
      document.getElementById('testBox').style.height = '100px'
    }

render() {
    return (
      <div>
      {console.log(this.state.items)}
      <TransitionGroup className='race'>
        {this.state.items.map((item, i) => (
          <Show key={item._id}>
            <div className="show">
              {`${item.category.difficulty} `}
              <button onClick={() => this.handleRemove(i)}>
                &times;
              </button>
            </div>
          </Show>
        ))}
      </TransitionGroup>
      <button onClick={() => this.handleAdd()}>Add Item</button>
      </div>
     
    );
  };
}

export default Test;



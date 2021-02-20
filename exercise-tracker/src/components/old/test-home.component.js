import React, { Component } from 'react';
import Components from "./components.js";



const data = {
    content: {
      body: [
        {
          _uid: "BUY6Drn9e1",
          component: "candle",
          title: "Foo",
          body: "This is body 1",
          value1: 10,
          value2: 20,
        },
        {
          _uid: "gJZoSLkfZV",
          component: "candle",
          title: "Bar",
          body: "This is body 2",
          value1: 30,
          value2: 40,
        },
        {
          _uid: "X1JAfdsZxy",
          component: "candle",
          title: "Another headline",
          body: "This is body 3",
          value1: 50,
          value2: 60,
        }
      ]
    }
  };
  
 

export default class TestHome extends Component {
    render() {
        return (
            < div className="container">
            {data.content.body.map(block => Components(block))}
                <p>You are viewing the test home </p>
            </div >
        )
    }
}
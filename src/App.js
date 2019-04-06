import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import socket from './config/socket';
import Home from "./pages/home";
import Room from "./pages/room";

class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/" exact component={Home} />
        <Route path="/room/:roomId" exact component={Room} />
      </Router>
    );
  }
}

export default App;

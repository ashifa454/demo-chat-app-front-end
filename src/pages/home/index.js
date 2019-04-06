import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./style.scss";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [1, 2, 3, 4, 5]
    };
  }
  handleJoinRoom = roomId => {
    this.props.history.push(`/room/${roomId}`);
  };
  render() {
    const { rooms } = this.state;
    return (
      <div className="container">
        <div className="header">Chat Application</div>
        <div className="room-list">
          <button className="new-room">Create a Room</button>
          {rooms.map(item => {
            return (
              <div onClick={() => this.handleJoinRoom(item)} className="item">
                {item}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
export default withRouter(Home);

import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { socket } from "../../config/socket";
import "./style.scss";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      isFormActive: false,
      formInput: ""
    };
  }
  componentDidMount() {
    socket.emit("getAllRooms");
    socket.on("newRoomList", data => {
      this.setState({ rooms: data });
    });
  }
  componentWillUnmount() {
    socket.off("newRoomList");
  }
  handleJoinRoom = roomId => {
    this.props.history.push(`/room/${roomId}`);
  };
  handleOpenCreateRoomForm = () => {
    this.setState({ isFormActive: true });
  };
  handleOnChange = e => {
    const { target } = e;
    let { formInput } = this.state;
    formInput = target.value;
    this.setState({ formInput });
  };
  handleCreateRoom = () => {
    this.props.history.push(`/room/${this.state.formInput}`);
  };
  render() {
    const { rooms } = this.state;
    return (
      <div className="container">
        <div className="header">Chat Application</div>
        <div className="room-list">
          <button onClick={this.handleOpenCreateRoomForm} className="new-room">
            Create a Room
          </button>
          {this.state.isFormActive ? (
            <div className="create-chat-room">
              <input
                onChange={this.handleOnChange}
                placeholder="type room name here "
              />
              <button onClick={this.handleCreateRoom}>Create Room</button>
            </div>
          ) : null}

          {rooms.map(item => {
            return (
              <div onClick={() => this.handleJoinRoom(item.roomName)} className="item">
                {item.roomName}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
export default withRouter(Home);

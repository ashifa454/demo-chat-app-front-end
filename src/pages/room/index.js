import React from "react";
import { withRouter } from "react-router-dom";
import { socket } from "../../config/socket";
import MouseTrap from "mousetrap";
import "./style.scss";
class Room extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      messages: []
    };
    console.log("here is props", this.props);
  }
  handleSendMessage = () => {
    let { inputValue } = this.state;
    const { messages } = this.state;
    if (inputValue.length > 0) {
      socket.emit("message", {
        roomId: this.props.match.params.roomId,
        uid: localStorage.getItem("userId"),
        message: inputValue
      });
      inputValue = "";
      this.setState({ messages, inputValue });
    }
  };
  componentDidMount() {
    const { match } = this.props;

    socket.emit("joinRoom", {
      roomName: match.params.roomId
    });
    socket.emit("getAllMessages", {
      roomName: this.props.match.params.roomId,
      uid: localStorage.getItem("userId")
    });
    socket.once("allMessages", messages => {
      console.log("here are messages", messages);
      this.setState({ messages: messages });
    });
    socket.on("messageReceived", data => {
      const { messages } = this.state;
      messages.push(data);
      this.setState({ data });
    });
    /**
     * Bind Enter on Enter
     */
    MouseTrap.bind("enter", this.handleSendMessage);
  }
  componentWillUnmount() {
    socket.off("messageReceived");
    MouseTrap.unbind("enter");
    socket.off("joinRoom");
  }
  handleOnChange = e => {
    const { target } = e;
    if (target.value.length >= 0) {
      let { inputValue } = this.state;
      inputValue = target.value;
      this.setState({ inputValue });
    }
  };
  render() {
    const { inputValue, messages } = this.state;
    return (
      <div className="room">
        <div className="content">
          <div className="header">
            You are connected to {this.props.match.params.roomId}
          </div>
          <div className="message-container">
            <div className="messages">
              {messages.map(item => {
                return (
                  <div
                    className={`item ${
                      item.uid === localStorage.getItem("userId")
                        ? "my-message"
                        : ""
                    }`}
                  >
                    <div>{item.text}</div>
                  </div>
                );
              })}
              {/* <div className="item">
                <div>HERE IS MY MESSAGE</div>
              </div>
              <div className="item">
                <div>HERE IS MY MESSAGE</div>
              </div>
              <div className="item my-message">
                <div>HERE IS MY MESSAGE</div>
              </div> */}
            </div>
            <div className="input-holder">
              <input
                className="mousetrap"
                value={inputValue}
                placeholder="Type your message here"
                onChange={this.handleOnChange}
              />
              <button onClick={this.handleSendMessage}>Send Message</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(Room);

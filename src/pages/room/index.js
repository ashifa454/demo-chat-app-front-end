import React from "react";
import { withRouter } from "react-router-dom";
import MouseTrap from "mousetrap";
import "./style.scss";
class Room extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      messages: []
    };
  }
  handleSendMessage = () => {
    let { inputValue } = this.state;
    const { messages } = this.state;
    messages.push({
      uid: "ashif",
      text: inputValue
    });
    inputValue = "";
    this.setState({ messages, inputValue });
  };
  componentDidMount() {
    MouseTrap.bind("enter", this.handleSendMessage);
  }
  componentWillUnmount() {
    MouseTrap.unbind("enter");
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
                      item.uid === "ashif" ? "my-message" : ""
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

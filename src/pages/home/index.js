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
        this.registerListener();
    }
    registerListener = () => {
        socket.on("newRoomList", data => {
            console.log("here is data", data);
            this.setState({ rooms: data });
        });
    };
    componentWillUnmount() {
        socket.off("newRoomList");
    }
    handleJoinRoom = (roomName, roomId) => {
        this.props.history.push({
            pathname: `/room/${roomName}`,
            state: {
                roomId,
            }
        });
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
        const { rooms, formInput } = this.state;
        if (rooms.findIndex(item => item.name === formInput) < 0) {
            this.props.history.push(`/room/${this.state.formInput}`);
        }
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
                            <div
                                onClick={() => this.handleJoinRoom(item.name, item._id)}
                                className="item"
                            >
                                {item.name}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}
export default withRouter(Home);

import React, { Component } from "react";
import { rooms } from './data.js';
import { Link } from "react-router-dom"


class RoomBookings extends Component {
    render() {
        return (
            <>
                <span className="small text-secondary"> booking 1</span>
                <span className="small text-secondary"> booking 2</span>
            </>
        );
    }
}

class Room extends Component {

    render() {
        console.log("Room", this.props.name);
        return (
            <div className="p-3 border m-1">
                <div>
                    <h4>{this.props.name}</h4>
                    <Link to={{ pathname: "/book", search:`?name=${this.props.name}` }}><button>Book</button></ Link>
                </div>

            <RoomBookings room={this.props.name} />
            </div >
        )
    }
}

class Dashboard extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container p-3">
                {rooms.map(function (room, index) {
                    { console.log("Dashboard", room.name, index) }
                    return <Room key={index} name={room.name} />
                })}
            </div>
        )
    }
}

export { Dashboard };
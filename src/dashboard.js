import React, { Component } from "react";
import { rooms } from './data.js';
import { Link } from "react-router-dom"


class RoomBookings extends Component {
    render() {
        console.log(this.props);
        
        return (
            <div  className="p-2">
                <span className="small text-secondary border p-1 m-2">{this.props.room} booking 1</span>
                <span className="small text-secondary border p-1 m-2">{this.props.room} booking 2</span>
            </div>
        );
    }
}

class Room extends Component {
    constructor(props) {
        super(props);
        this.state = {booked: new Date()};
      }
    
    render() {
        // console.log("Room", this.props.name);
        return (
            <div className="border m-1">
                <div className="border-bottom p-3 d-flex justify-content-between">
                    <h4>{this.props.name}</h4>
                    <Link to={{ pathname: "/book", search:`?name=${this.props.name}` }}><button >Book</button></ Link>
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
                    // { console.log("Dashboard", room.name, index) }
                    return <Room key={index} name={room.name} />
                })}
            </div>
        )
    }
}

export { Dashboard };
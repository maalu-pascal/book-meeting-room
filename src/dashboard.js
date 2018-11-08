import React, { Component } from "react";
import { roomDetails } from './data.js';
import { Link } from "react-router-dom"


class RoomBookings extends Component {
    render() {
        let room = roomDetails.find((room) => {
            if (room.name === this.props.room) { return room; }
        });
        console.log(room.booked);

        return (
            <div className="p-2">
                {(room.booked.length == 0) ?
                    (<span className="small text-secondary  p-1 m-2"> No bookings to show.</span>)
                    :
                    (
                        <div className="d-flex">
                            <div className="small text-secondary font-weight-bold p-1 col-1">Bookings:</div>
                            <div className=" d-flex flex-wrap align-content-center col-11">
                            {room.booked.map((booking, index) => {
                            return <div key={index} className="small text-secondary border p-1 mr-2 mb-2">{booking}</div>
                            })}
                            </div>
                        </div>
                    )
                }
            </div>
        );
    }
}

class Room extends Component {

    render() {
        return (
            <div className="border m-1">
                <div className="border-bottom p-3 d-flex justify-content-between">
                    <h4>{this.props.name}</h4>
                    <Link to={{ pathname: "/book", search: `?name=${this.props.name}` }}><button >Book</button></ Link>
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
                {roomDetails.map((room, index) => {
                    return <Room key={index} name={room.name} />
                })}
            </div>
        )
    }
}

export { Dashboard };
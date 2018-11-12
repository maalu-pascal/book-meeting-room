import React, { Component } from "react";
import { roomDetails } from './data.js';
import { Link } from "react-router-dom"


class RoomBookings extends Component {
    render() {
        let room = roomDetails.find((room) => {
            if (room.name === this.props.room) { return room; }
        });

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
                                    return <div key={index} className="small text-secondary border p-1 mr-2 mb-1">{booking.from} - {booking.to}</div>
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
            <div className="border m-2">
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

    render() {
        return (
            <div className="container p-3">
                <div className="d-flex">
                <span>Daylight Saving: </span>
                    <select className= "m-2 ml-auto">
                        <option defaultValue value="+00:00">OFF</option>
                        <option value="+01:00">Eastern Standard Time</option>
                        <option  value="-01:00">Japan Standard Time</option>
                    </select>
                </div>
                {roomDetails.map((room, index) => {
                    return <Room key={index} name={room.name} />
                })}
            </div>
        )
    }
}

export { Dashboard };
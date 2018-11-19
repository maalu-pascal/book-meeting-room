import React, { Component } from "react";
import { roomDetails } from './data.js';
import { Link } from "react-router-dom"


class RoomBookings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rooms: this.props.rooms,
            bookings: this.props.bookings
        }
    }

    render() {

        let bookingData= this.props.bookings;

        return (
            <div className="p-2">
                {(bookingData.length == 0) ?
                    (<span className="small text-secondary  p-1 m-2"> No bookings to show.</span>)
                    :
                    (
                        <div className="d-flex">
                            <div className="small text-secondary font-weight-bold p-1 col-1">Bookings:</div>
                            <div className=" d-flex flex-wrap align-content-center col-11">
                                {bookingData.map((booking, index) => {
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
                <RoomBookings room={this.props.name} rooms={this.props.room} bookings={this.props.bookings}/>
            </div >
        )
    }
}

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms: [],
            bookings: []
        }
    }

    componentDidMount() {
        this.getRoomList();
    }

    // Retrieves the datas from the server.
    getRoomList() {
        fetch('/getRoomDetails', {
            method: 'get',
            headers: { 'Content-Type': 'application/json' },
        })
            .then(res => res.json())
            .then(datas => {
                this.setState({ rooms: datas[0] });
                this.setState({ bookings: datas[1] });
            })            
    }

    render() {
        return (
            <div className="container p-3">
                <div className="d-flex">
                    <span>Daylight Saving: </span>
                    <select className="m-2 ml-auto">
                        <option defaultValue value="+00:00">OFF</option>
                        <option value="+01:00">Eastern Standard Time</option>
                        <option value="-01:00">Japan Standard Time</option>
                    </select>
                </div>
                {this.state.rooms.map((room, index) => {
                    let bookings = this.state.bookings.filter((roomBooking)=> {
                        let found = this.state.rooms[index].booked.find((booking)=>{
                            return (booking === roomBooking.id)
                        });
                        
                        if(found) { return roomBooking};
                    });

                    return <Room key={index} name={room.name} room={this.state.rooms[index]} bookings={bookings}/>
                })}
            </div>
        )
    }
}

export { Dashboard };
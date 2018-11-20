import React, { Component } from "react";
import { roomDetails } from './data.js';
import { Link, Redirect } from "react-router-dom"


class RoomBookings extends Component {

    deleteBooking(booking) {
        fetch(`booking`, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'id': booking.id
            })
        })
            .then(res => {
                if (res.ok) return res.json();
            }).
            then(data => {
                console.log(data.status);
                window.location.reload();
            });
    }

    viewBooking(booking) {
        console.log(this.props.bookings, booking);

        if (booking) {
            let bookingDetailDiv;
            bookingDetailDiv = `<div class="p-3">
            <span>Booking Details</span><br>
            <span><b>From: </b>${booking.from}</span><br>
            <span><b>To: </b>${booking.to}</span><br>
            <button id="delete" >Delete Booking</button>
            <button onClick='(()=>{})' >Update Booking</button>
            </div>`;
            document.getElementById(`${this.props.room}bookingDetails`).innerHTML = bookingDetailDiv;

            let deleteButton=document.getElementById("delete");
            deleteButton.addEventListener('click', ()=>{this.deleteBooking(booking)});
        }
    }

    render() {

        let bookingData = this.props.bookings;

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
                                    // return <div key={index} className="small text-secondary border p-1 mr-2 mb-1">{booking.from} - {booking.to}</div>
                                    return <button key={index} className="small text-secondary border-secondary p-1 mr-2 mb-1" onClick={() => { this.viewBooking(booking) }}>{booking.from} - {booking.to}</button>
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
        let bookingDetailsId = this.props.name + "bookingDetails";
        return (
            <div id="room" className="border m-2">
                <div className="border-bottom p-3 d-flex justify-content-between">
                    <h4>{this.props.name}</h4>
                    <Link to={{ pathname: "/book", search: `?name=${this.props.name}` }}><button >Book</button></ Link>
                </div>
                <RoomBookings room={this.props.name} rooms={this.props.room} bookings={this.props.bookings} className="border-bottom" />
                <div id={bookingDetailsId} className="border-top"></div>
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
        this.getRoomData();
    }

    // Retrieves the datas from the server.
    getRoomData() {
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
        console.log("Datas : ", this.state.rooms);

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
                    let bookings = this.state.bookings.filter((roomBooking) => {
                        let found = this.state.rooms[index].booked.find((booking) => {
                            return (booking === roomBooking.id)
                        });

                        if (found) { return roomBooking };
                    });

                    return <Room key={index} name={room.name} room={this.state.rooms[index]} bookings={bookings} />
                })}
            </div>
        )
    }
}

export { Dashboard };
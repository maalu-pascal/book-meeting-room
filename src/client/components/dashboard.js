import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom"
import { store, mapStateToProps, mapDispatchToProps } from './../../../redux/store.js';
import { connect } from 'react-redux'

class BookingDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        };
    }

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
                // window.location.reload();
                this.setState({ redirect: true });
                console.log("deleted");

            });
    }

    render() {
        let booking = this.props.booking;

        return <div className="p-3 border-top" id={booking.id} >
            <button className="ml-auto d-flex text-small border-rounded" onClick={() => { this.props.close() }}>Close</button>
            <span><b><i><u>Booking Details</u></i></b></span><br />
            <span><b>From: </b>{booking.from}</span><br />
            <span><b>To: </b>{booking.to}</span><br />
            <span><b>Title: </b>{booking.title}</span><br />
            {(booking.userId === store.getState().auth.userId) ?
                <><button id="delete" onClick={() => { this.deleteBooking(booking) }} className=" btn-secondary" >Delete Booking</button>
                    {/* <button id='update'  >Update Booking</button> */}
                </> : ''
            }
            {(this.state.redirect) ? <Redirect to="/refresh" /> : null}
        </div>
    }
}

class RoomBookings extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showDetail: false,
            booking: ''
        }
        this.viewBooking = this.viewBooking.bind(this);
    }

    viewBooking(booking) {
        if (booking) {
            this.setState({ showDetail: true, booking: booking });
        }
    }

    render() {
        let bookingData = this.props.bookings;

        return (<>
            <div className="p-2 bg-light">
                {(bookingData.length == 0) ?
                    (<span className="small text-secondary  p-1 m-2"> No bookings to show.</span>)
                    :
                    (
                        <div className="d-flex">
                            <div className="small text-secondary font-weight-bold p-1 col-1">Bookings:</div>
                            <div className=" d-flex flex-wrap align-content-center col-11">
                                {bookingData.map((booking, index) => {
                                    return <div key={index} className="showBooking small text-secondary border  p-1 mr-2 mb-1" onClick={() => { this.viewBooking(booking) }}>{booking.from} - {booking.to}</div>
                                })}
                            </div>
                        </div>
                    )
                }
            </div>
            {this.state.showDetail ? <BookingDetail booking={this.state.booking} close={() => { this.setState({ showDetail: false, booking: '' }) }} /> : null}
        </>
        );
    }
}

class Room extends Component {

    render() {

        return (
            <div id="room" className="border m-2">
                <div className="border-bottom p-3 d-flex justify-content-between">
                    <h4>{this.props.name}</h4>
                    <Link to={{ pathname: "/book", search: `?name=${this.props.name}` }}><button >Book</button></ Link>
                </div>
                <RoomBookings room={this.props.name} rooms={this.props.room} bookings={this.props.bookings} className="border-bottom" />
            </div >
        )
    }
}

class AuthenticateUser extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let authorized= store.getState().auth.authenticated;
        return <div className="ml-auto">
            <button className="m-2" onClick={() => {
                this.props.toggleAuth('0101');
                this.props.user(authorized);
            }}>{
                    (authorized) ? 'Sign Out' : 'Sign In'}</button>
        </div>
    }
}

//Connect the state and dispatch functions to the 'AuthenticateUser' component
const AuthContainer = connect(mapStateToProps, mapDispatchToProps)(AuthenticateUser);

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms: [],
            bookings: [],
            Authorized: ''
        }
    }

    // Retrieves the datas from the server.
    componentDidMount() {
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
                <div className="d-flex flex-column">
                    <AuthContainer user={(auth) => { this.setState({ Authorized: auth }) }} />
                    <div className="float-right ml-auto">
                        <span>Daylight Saving: </span>
                        <select className="m-2 ml-auto" disabled>
                            <option defaultValue value="+00:00">OFF</option>
                            <option value="+01:00">Eastern Standard Time</option>
                            <option value="-01:00">Japan Standard Time</option>
                        </select>
                    </div>
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
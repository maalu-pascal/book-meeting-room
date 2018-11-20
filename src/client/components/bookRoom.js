import React, { Component } from "react";
import { roomDetails, userDetails } from './data.js';

class Book extends Component {
    constructor(props) {
        super(props);

        let params = new URLSearchParams(location.search);
        let roomName = params.get("name");

        this.state = {
            date: new Date(),
            room: roomName,
            from: '09:00',
            to: '09:30',
            userName: 'maalu',
            roomDetail: [],
            userDetails: [],
            customers: []
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.validateTime = this.validateTime.bind(this);
        // this.getCustomers();

    }

    // Fetch the customers on first mount
    // componentDidMount() {
    //     this.getCustomers();
    // }

    // Retrieves the customers from the Express app
    // getCustomers() {
    //     console.log("in");
        
    //     fetch('http://localhost:5030/success')
    //         .then(res => res.json())
    //         .then(customers => {
    //             this.setState({ customers })
    //             console.log(customers)
    //         })
    //         .catch(() => console.log("Can’t access \'/success\' response. Blocked by browser?"))
    // }

    handleInputChange(event) {

        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    validateTime() {
        let errorMessage = "The room is already booked during this time interval! Please choose another time interval."
        let error = [];
        if (this.state.from > this.state.to) {
            error[0] = "From time should be greater than to time.";
            return error;
        }

        let room = roomDetails.find((room) => {
            if (room.name === this.state.room) { return room; }
        });
        error = room.booked.map((booking) => {

            if (booking.from === this.state.from || booking.to === this.state.to) {
                return errorMessage;
            };

            if (booking.from < this.state.from && this.state.from < booking.to) {
                return errorMessage;
            };

            if (booking.from < this.state.to && this.state.to < booking.to) {
                return errorMessage;
            };

        });

        let errorIndex = error.findIndex((msg) => { return (msg != undefined) });

        return errorIndex >= 0 ? (error[errorIndex]) : false;
    }

    handleSubmit(event) {
        console.log("handling submit!");
        
        event.preventDefault();
        this.setState({
            date: new Date()
        });

        let validation = this.validateTime();

        if (validation) {
            document.getElementById("formError").innerHTML = "*" + validation;
            return false;
        }

        /* Room details is updated. */
        roomDetails.map((roomDetail) => {

            if (roomDetail.name === this.state.room) {

                let newBooking = {
                    from: this.state.from,
                    to: this.state.to
                };

                /*The postition where the new booking has to be inserted according to the time line,
                 is calculated as 'index' */

                let index = -1;
                if (roomDetail.booked.length > 0) {
                    index = roomDetail.booked.findIndex((previousBooked) => {
                        return this.state.from < previousBooked.from;
                    })
                }
                if (index < 0) { index = roomDetail.booked.length; }
                roomDetail.booked.splice(index, 0, newBooking);
            }
        });


        /* The user data is updated.*/

        let existingUser = userDetails.findIndex((user) => {
            if (user.userName === this.state.userName) { return user; }
        });

        if (existingUser < 0) {
            let newUser = {
                'userName': this.state.userName,
                'bookings': [{
                    'room': this.state.room,
                    'from': this.state.from,
                    'to': this.state.to
                }]
            };
            userDetails.push(newUser);
        } else {
            let newBooking = {
                'room': this.state.room,
                'from': this.state.from,
                'to': this.state.to
            };

            userDetails[existingUser].bookings.push(newBooking)
        }
        // this.props.history.push('/');
        document.getElementById("bookingForm").submit();
    }

    render() {
        return (
            <div className="container p-3">
                {this.state.room ? (
                    <>
                        <h3>The room to be booked is <b>{this.state.room}</b></h3>
                        {/* <form id="bookingForm" className="border p-3" method="post" > */}
                            {/* <form onSubmit={this.handleSubmit.bind(this)} className="border p-3" ></form> */}
                            <form  id="bookingForm" className="border p-3" method="post" action="/new-booking-test" >
                            {/* <form  id="bookingForm" className="border p-3" method="post" > */}
                            <div className="form-group">
                                <label> Username : </label>
                                <input name="userName" type='input' value={this.state.userName} onChange={this.handleInputChange} placeholder="Enter user name" className="ml-3" />
                            </div>
                            <label><b> Duration of booking: </b></label>
                            <div>
                                <label>From:</label>
                                <input name="from" type="time" value={this.state.from} step="1800" min="09:00" max="17:30" onChange={this.handleInputChange} className="ml-3" />
                            </div>
                            <div>
                                <label>To:</label>
                                <input name="to" type="time" value={this.state.to} step="1800" min={this.state.from} max="17:30" onChange={this.handleInputChange} className="ml-3" />
                            </div>
                            <input type="hidden" name="room" value={this.state.room} ></input>
                            <input type="button" onClick={this.handleSubmit.bind(this)} value="Submit" />
                            {/* <input type="submit" value="Submit" /> */}
                        </form>
                        <span id="formError" className="text-danger"> </span>
                    </>
                ) : (
                        <h3>There is no room selected</h3>
                    )}
            </div>
        );
    }
}

export { Book };
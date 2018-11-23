import React, { Component } from "react";
import { Link } from "react-router-dom"

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
            title: 'Meeting',
            userName: 'maalu',
            roomDetails: [],
            bookingDetails: [],
            userDetails: [],
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.validateTime = this.validateTime.bind(this);

    }

    // Retrieves the datas from the server.
    componentDidMount() {
        fetch('/getRoomDetails', {
            method: 'get',
            headers: { 'Content-Type': 'application/json' },
        })
            .then(res => res.json())
            .then(datas => {
                this.setState({ roomDetails: datas[0], bookingDetails: datas[1] });
            })
    }

    handleInputChange(event) {
        
        event.preventDefault();

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

        let room = this.state.roomDetails.find((room) => {
            if (room.name === this.state.room) { return room; }
        });

        error = room.booked.map((bookingId) => {

            let findBooking = this.state.bookingDetails.find((booking) => {
                return (booking.id === bookingId);
            });

            if (findBooking) {
                if (findBooking.from === this.state.from || findBooking.to === this.state.to) {
                    return errorMessage;
                };

                if (findBooking.from < this.state.from && this.state.from < findBooking.to) {
                    return errorMessage;
                };

                if (findBooking.from < this.state.to && this.state.to < findBooking.to) {
                    return errorMessage;
                };
            }
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
        } else {
            document.getElementById("formError").innerHTML = "";
        }

        document.getElementById("bookingForm").submit();
    }

    render() {
        return (
            <div className="container p-3">
                {this.state.room ? (
                    <>
                        <h3>The room to be booked is <b>{this.state.room}</b></h3>
                        <Link to={{ pathname: "/" }}><button >Back</button></ Link>
                        <form id="bookingForm" className="border p-3" method="post" action="/new-booking" >
                            <div className="form-group">
                                <label> Username : </label>
                                <input name="userName" type='input' value={this.state.userName} onChange={this.handleInputChange} placeholder="Enter user name" className="ml-3" />
                            </div>
                            <div className="form-group">
                                <label> Title : </label>
                                <input name='title' type='input' value={this.state.title} onChange={this.handleInputChange} placeholder="Enter title" className="ml-3" />
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
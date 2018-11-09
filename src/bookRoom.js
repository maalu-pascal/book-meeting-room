import React, { Component } from "react";
import { roomDetails, userDetails } from './data.js';
import { Redirect } from "react-router-dom"


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
            userName: 'maalu'
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        // this.handle = this.handle.bind(this);
    }

    handleInputChange(event) {
        // console.log(event.target, event.target.type, event.target.name);

        const target = event.target;
        const value = target.type === 'text' ? target.value : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({
            date: new Date()
        });

        validateTime();

        // alert(`User ${this.state.userName} has booked ${this.state.room} from ${this.state.from} to ${this.state.to} on ${this.state.date}`);

        roomDetails.map((roomDetail) => {

            if (roomDetail.name === this.state.room) {
                let newBooking = `${this.state.from} - ${this.state.to}`;
                roomDetail.booked.push(newBooking)
            }
        });

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

        this.props.history.push('/');


    }

    render() {
        return (
            <div className="container p-3">
                {this.state.room ? (
                    <>
                        <h3>The room to be booked is <b>{this.state.room}</b></h3>
                        <form onSubmit={this.handleSubmit.bind(this)} className="border p-3" >
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
                                <label>From:</label>
                                <input name="to" type="time" value={this.state.to} step="1800" min={this.state.from} max="17:30" onChange={this.handleInputChange} className="ml-3" />
                            </div>
                            {/* <button onClick={() => this.handle()} >Submit</button> */}
                            <input type="submit" value="Submit" />
                        </form>
                    </>
                ) : (
                        <h3>There is no room selected</h3>
                    )}
            </div>
        );
    }
}

function validateTime() {
    // console.log("roomDetails.booked:", roomDetails[0].booked);

    // if (roomDetails[0].booked.length > 0) {
    //     roomDetails[0].booked.map((booking) => {
    //         console.log(booking);
    //         let t = booking.split('-');
    //         console.log(t[0], t[1], t[0] > t[1]);
    //         console.log(t[0] < t[1]);

    //     });

    //     console.log(roomDetails.booked);

    // }
    // console.log(roomDetails.booked);
    // return false;
}


export { Book };
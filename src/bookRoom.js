import React, { Component } from "react";

class Book extends Component {
    constructor(props) {
        super(props);

        let params = new URLSearchParams(location.search);
        let roomName = params.get("name");

        this.state = {
            date: '',
            room: roomName,
            from: '',
            to: '',
            userName: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        this.setState({
            date: new Date()
        });
        alert(`User ${this.state.userName} has booked ${this.state.room} at ${this.state.date} from ${this.state.from} to ${this.state.to} on ${this.state.date}`);
        event.preventDefault();
    }

    render() {
        return (
            <div className="container p-3">
                {this.state.room ? (
                    <>
                        <h3>The room to be booked is <b>{this.state.room}</b></h3>
                        <form onSubmit={this.handleSubmit} className="border p-3" >
                            <div className="form-group">
                                <label> Username : </label>
                                <input name="userName" type='input' value={this.state.userName} onChange={this.handleInputChange} placeholder="Enter user name" className="ml-3" />
                            </div>
                            <label><b> Duration of booking: </b></label>
                            <div>
                                <label>From:</label>
                                <input name="from" type="time" value={this.state.from} step="1800" onChange={this.handleInputChange} className="ml-3" />
                            </div>
                            <div>
                                <label>From:</label>
                                <input name="to" type="time" value={this.state.to} step="1800" onChange={this.handleInputChange} className="ml-3" />
                            </div>

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

export { Book };
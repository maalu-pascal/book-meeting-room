import React , {Component} from "react";
import "./../App.css";
import { BrowserRouter, Route, NavLink, Switch, Redirect } from "react-router-dom"
import { Dashboard ,ConnectDashboard} from './dashboard.js';
import { Book } from './bookRoom.js';
import {Container, store} from './../../../redux/store.js';


class Bookings extends Component {
  render() {
    return (
      <div className="container">
        <h2> Bookings</h2>
        <Redirect to={{ pathname: "/book", search: "?name=" }} />
      </div>
    );
  }
}

const Refresh =() => {
  return <Redirect to="/"/>
}

const Header = () => {
  return (
    <header className="bg-dark text-light p-2" >
      <div className="container d-flex">
        <span className="h2 text-light mr-5"><b><i>Book Your Room</i></b></span>
        <div>
          <NavLink to="/" exact activeStyle={{ color: "white" }} className="navbar-brand">Home</NavLink>
          <NavLink className="navbar-brand " to="/bookings" activeStyle={{ color: "white" }}>Bookings</NavLink>
        </div>
      </div>
    </header>
  );
}


class AppRouter extends Component {
  constructor(props) {
    super(props);
    this.state={
      userAuthentication: this.props.authentication
    }
  }
  render() {
    
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Switch>
            <Route path="/bookings" component={Bookings} />
            <Route path="/book" component={Book} />
            <Route path="/refresh" component={Refresh}/>
            <Route path="/" component={Dashboard} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default AppRouter;
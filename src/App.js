import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, HashRouter, Route, Link, NavLink, Switch, Redirect, params } from "react-router-dom"

const Dashboard = () => { return (<h2 className="container">Dashboard</h2>) };

class Bookings extends Component {
  render() {
    return (
      <div className="container">
        <h2> Bookings</h2>
        <Redirect to={{ pathname: "/book", search: "?name=Turing" }} />

      </div>
    );
  }
}

class Book extends Component {
  render() {
    let params = new URLSearchParams(location.search);
    let name = params.get("name"); 

    return (
      <>
        {name ? (
        <h3>
          The room to be booked is "{name}"
        </h3>
      ) : (
          <h3>There is no room selected</h3>
        )}
      </>
    );
  }
}

const Header = () => {
  return (
    <header className="bg-dark text-light p-2" >
      <div className="container d-flex">
        <span className="h2 text-light mr-5"><b><i>Book Your Room</i></b></span>
        <div>
          <NavLink to="/" exact activeStyle={{color: "white"}} className="navbar-brand">Home</NavLink>
          <NavLink className="navbar-brand " to="/bookings" activeStyle={{color: "white"}}>Bookings</NavLink>

        </div>
      </div>
    </header>
  );
}


class AppRouter extends Component {
  render() {

    return (
      // <HashRouter>
      <BrowserRouter>
        <div>
          <Header />
          <Switch>
            <Route path="/bookings" component={Bookings} />
            <Route path="/book" component={Book} />
            <Route path="/" component={Dashboard} />
          </Switch>
        </div>
        </BrowserRouter>
      // </HashRouter>
    );
  }
}

export default AppRouter;
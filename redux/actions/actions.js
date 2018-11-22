// const ADD = 'ADD';

const NEW_BOOKING = 'NEW_BOOKING';
const DELETE_BOOKING = 'DELETE_BOOKING';

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const AUTH_TOGGLE = 'AUTH_TOGGLE';


// action creators
const authLogin = () => {
    return {
        type: LOGIN
    }
}

const authLogout = () => {
    return {
        type: LOGOUT
    }
}

const authToggle = () => {
    return {
        type: AUTH_TOGGLE
    }
}

const newBooking = (bookings) => {
    return {
        type: NEW_BOOKING,
        bookings: bookings
    }
}

const deleteBooking = (bookings) => {
    return {
        type: DELETE_BOOKING,
        bookings: bookings
    };
}

export { LOGIN, LOGOUT, NEW_BOOKING, DELETE_BOOKING, authLogin, authLogout, newBooking, deleteBooking, authToggle, AUTH_TOGGLE}
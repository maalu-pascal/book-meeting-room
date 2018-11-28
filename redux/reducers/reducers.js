import {combineReducers} from 'redux';
import { LOGIN, LOGOUT, AUTH_TOGGLE } from './../actions/actions.js'
import { NEW_BOOKING, DELETE_BOOKING } from './../actions/actions.js'

const bookingReduser = (state = { bookings: [] }, action) => {
  switch (action.type) {
    case NEW_BOOKING:
      return [...state, action.bookings];
    case DELETE_BOOKING:
      return [...state.slice(0, index), ...state.slice(index + 1, state.length())];
    default:
      return state;
  }
}

const authReducer = (state = { authenticated: false, userId: '' }, action) => {
  
  switch (action.type) {
    case AUTH_TOGGLE:
    let id = (state.authenticated)? '':action.userId;
    
      return {
        authenticated: !state.authenticated,
        userId: id
      };
    // case LOGIN:
    //   return {
    //     userId: action.userId,
    //     authenticated: true
    //   }
    // case LOGOUT:
    //   return {
    //     userId: '',
    //     authenticated: false
    //   }
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  auth: authReducer,
  book: bookingReduser
});


export { rootReducer, reducer };
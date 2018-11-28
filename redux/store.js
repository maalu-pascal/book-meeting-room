import { createStore } from 'redux';
import { rootReducer } from './reducers/reducers.js'

import { authToggle, AUTH_TOGGLE } from './actions/actions.js';

const store = createStore(rootReducer);

// global count variable:
let count = 0;

/*To subscribe to listen to the new actions dispatched.
  Calls the INCREMENT function each time an action is dispatched. */
const COUNT = () => {
  return count++;
};
store.subscribe(COUNT);


// React-Redux:
const mapStateToProps = (state) => {
  return { authentication: state }
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleAuth: (userId) => {
      dispatch({
        type: AUTH_TOGGLE,
        userId
      })
    }
  }
};

// const Container =connect(mapStateToProps, mapDispatchToProps)(Dashboard);

export { store, mapStateToProps, mapDispatchToProps };
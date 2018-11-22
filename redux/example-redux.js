// import React from 'react'
// import ReactDOM from 'react-dom'
// import { Provider, connect } from 'react-redux'
// import { createStore, combineReducers, applyMiddleware } from 'redux'
// import thunk from 'redux-thunk'

// import rootReducer from './redux/reducers'
// import App from './components/App'

// const store = createStore(
//   rootReducer,
//   applyMiddleware(thunk)
// );




// Redux:
//actions
const ADD = 'ADD';

//action creators
const addMessage = (message) => {
  return {
    type: ADD,
    message: message
  }
};

const messageReducer = (state = [], action) => {
  switch (action.type) {
    case ADD:
      return [
        ...state,
        action.message
      ];
    default:
      return state;
  }
};

//Redux store
const store = Redux.createStore(messageReducer);



// React:
class Presentational extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      messages: []  //
    }
    this.handleChange = this.handleChange.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
  }
  handleChange(event) {
    this.setState({
      input: event.target.value
    });
  }
  submitMessage() {
    const currentMessage = this.state.input;
    this.setState({
      input: '',
      messages: this.state.messages.concat(currentMessage)  //
    });
    // this.props.submitNewMessage(this.state.input);
  }
  render() {
    return (
      <div>
        <h2>Type in a new Message:</h2>
        <input
          value={this.state.input}
          onChange={this.handleChange} /><br />
        <button onClick={this.submitMessage}>Submit</button>
        <ul>
          {/* {this.props.messages.map((message, idx) => { */}
          {this.state.messages.map((message, idx) => {
            return (
              <li key={idx}>{message}</li>
            )
          })
          }
        </ul>
      </div>
    );
  }
};

// React-Redux:
const mapStateToProps = (state) => {
  return { messages: state }
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitNewMessage: (newMessage) => {
      dispatch(addMessage(newMessage))
    }
  }
};

const Provider = ReactRedux.Provider;
const connect = ReactRedux.connect;

const Container =connect(mapStateToProps, mapDispatchToProps)(Presentational);

class AppWrapper extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <Provider store={store} >
      <Container />
    </Provider>
      ;
  }
};

// ReactDOM.render(
//   <Provider store={store}>
//     <App/>
//   </Provider>,
//   document.getElementById('root')
// );

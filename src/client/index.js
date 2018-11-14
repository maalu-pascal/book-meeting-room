import React from "react";
import ReactDOM from "react-dom";
import AppRouter from "./components/App.js";
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(<AppRouter />, document.getElementById("root"));

// class Custom extends React.Component {

//     constructor() {
//         super();
//         this.state = {
//             customers: {}
//         }
//     }
//     componentDidMount() {
//         fetch('http://localhost:5030/api')
//           .then(res => res.json())
//           .then(customers => this.setState({customers}, () => console.log(customers)));
//       }
//     render() {
//         return (
//             <div> <h2>Test</h2> </div>
//         )
//     }
// }


// ReactDOM.render(<Custom />, document.getElementById("root"));
import React from "react";
import ReactDOM from "react-dom";
import AppRouter from "./components/App.js";
import 'bootstrap/dist/css/bootstrap.min.css';

import {Container, store} from './../../redux/store.js';
import { Provider } from 'react-redux'


// ReactDOM.render(<AppRouter />, document.getElementById("root"));

ReactDOM.render(
    <Provider store={store}>
        <AppRouter />
    </Provider>,
    document.getElementById('root')
);

// ReactDOM.render(
//     <Provider store={store}>
//         <Container />
//     </Provider>,
//     document.getElementById('root')
// );
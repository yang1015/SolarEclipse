import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import Extra from './components/Extra.jsx';


ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={Extra}/>
    </Router>
    , document.getElementById('root'));
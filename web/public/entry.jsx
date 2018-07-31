import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import PlayList from './pages/PlayList.jsx';


ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={PlayList}/>
    </Router>
    , document.getElementById('root'));
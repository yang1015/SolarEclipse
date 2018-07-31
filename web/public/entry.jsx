import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import PlayList from './pages/PlayList.jsx';

const PlayingPage = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./pages/PlayingPage').default)
    },'PlayingPage')
}

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={PlayList}/>
        <Route path="/PlayList" component={PlayList}/>
        <Route path = "/PlayingPage/:songIndex" getComponent={PlayingPage} />
    </Router>
    , document.getElementById('root'));
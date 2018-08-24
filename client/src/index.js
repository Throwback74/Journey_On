import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';


import registerServiceWorker from './registerServiceWorker';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import axios from "axios";

// Our Components
import Login from './components/Landing/Login';
import Profile from './components/Hub/Profile';
import Signup from './components/Signup/Signup';
import Goal from './components/NewGoal/newGoal';
import Home from './components/Hub/Home';
import Kanban from './components/Hub/Kanban/Kanban';
import Logout from './components/Auth/Logout';
import Calendar from './components/Hub/Calendar/Cal';

if(localStorage.getItem("id_token")) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('id_token')}`;
}
ReactDOM.render(
    <Router>
        <div>
            <Route exact path="/" component={App} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route path="/profile/:id" component={Profile} />
            <Route exact path="/buildjourney" component={Goal} />
            <Route exact path="/board" component={Kanban} />
            <Route exact path="/logout" component={Logout} />
            <Route exact path="/calendar" component={Calendar} />
        </div>
    </Router>
    , document.getElementById('root')
);
registerServiceWorker();

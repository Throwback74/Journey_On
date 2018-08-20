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
<<<<<<< HEAD
import Goal from "./components/NewGoal/newGoal.js"
=======
import Goal from "./components/NewGoal/newGoal.js";
>>>>>>> 0b29b44c9cb3d241df3e829271a563330abc3dd7
import Home from './components/Hub/Home';

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
            <Route exact path="/profile/:id" component={Profile} />
            <Route exact path="/buildjourney" component={Goal} />
        </div>
    </Router>
    , document.getElementById('root')
);
registerServiceWorker();

import React from "react";
import './style.css';
import {Link} from "react-router-dom";


const Landing = props => (

<div>
<header>
  <div className="container">
  <Link to="/signup">
    <button type="button" className="btn btn-primary">Signup</button>
  </Link>
  <Link to="/login">
    <button type="button" className="btn btn-danger">Login</button>
  </Link>
 
    <h1>JOURNEY ON</h1> 
    <div className="row">
      <div className="col s8">
        <p className="paragraph">Wirize is a ready-made checkout payment built on Stripe. <p>Collect one-time payments and sell your digital services
  in minutes</p> <p>(no code or website required)</p></p>
      </div>
      <div className="col s4">
        <div>
          <img className="picture" src="https://via.placeholder.com/414x396" alt="image"/>
        </div>
      </div>
    </div>
    </div>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
    <polygon fill="white" points="0,100 100,0 100,100"/>
    </svg>  
    
</header>

<section>
  <div className="container">
  <h2>Section Content</h2>
  <div className="row">
      <div className="col s6">
      <a href="https://placeholder.com"><img src="https://via.placeholder.com/414x396"/></a>
      </div>
      <div className="col s6">
      <h1>Get Started</h1>
      Link your journey account by connecting an existing or new social media account.
      <ul>
        <li>One-time setup (no code)</li>
        <li>2-minute flow into your calendar</li>
      </ul>
      </div>
    </div>
  <div className="row">
      <div className="col s6">
      <h1>Fresh Start</h1>
      Whether you collect client payments, or sell digital services online,Wirize has you covered.
      <ul>
        <li>No hidden or monthly fees</li>
        <li>Pay only for what you use</li>
      </ul>
      </div>
      <div className="col s6">
      <a href="https://placeholder.com"><img src="https://via.placeholder.com/414x396"/></a>
      </div>
    </div>
  <div className="row">
      <div className="col s6">
      <a href="https://placeholder.com"><img src="https://via.placeholder.com/414x396"/></a>
      </div>
      <div className="col s6">
      <h1>Completed Goal</h1>
      Whether you collect client payments, or sell digital services online,Wirize has you covered.
      <ul>
        <li>Accept 130+ currencies</li>
        <li>Transactions states in real time</li>
      </ul>
      </div>
    </div>
</div>
  <footer>
    <div className="foot">
    <h3>Footer</h3>
    </div>
  </footer>
</section>
</div>

);

export default Landing;
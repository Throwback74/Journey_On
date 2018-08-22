import React from "react";
import './style.css';
import { Link } from "react-router-dom";


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
            <p className="paragraph">"Believe in yourself. You are braver than you think, more talented than you know, and capable of more than you imagine"</p>
            - Roy T. Bennett -
      </div>
          <div className="col s4">
            <div>
              <img className="picture" src="https://via.placeholder.com/414x396" alt="image" />
            </div>
          </div>
        </div>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
        <polygon fill="white" points="0,100 100,0 100,100" />
      </svg>

    </header>

    <section>
      <div className="container">
        {/* <h2>Section Content</h2> */}
        <div className="row">
          <div className="col s6">
            <a href="https://placeholder.com"><img src="https://via.placeholder.com/414x396" /></a>
          </div>
          <div className="col s6 get started">
            <h1>Get Started</h1>
            Creating your goals and building your journey.
      <ul>
              <li>Brainstorming</li>
              <li>Mapping out your Goal</li>
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col s6 fresh start">
            <h1>Fresh Start</h1>
            The hub for tracking your journey and process until completed.
      <ul>
              <li>Tracking your Progress Bar</li>
              <li>Weekly Calendar for tracking success</li>
            </ul>
          </div>
          <div className="col s6">
            <a href="https://placeholder.com"><img src="https://via.placeholder.com/414x396" /></a>
          </div>
        </div>
        <div className="row">
          <div className="col s6">
            <a href="https://placeholder.com"><img src="https://via.placeholder.com/414x396" /></a>
          </div>
          <div className="col s6 progress">
            <h1>Breakdown</h1>
            Greater picture for tracking your journey.
      <ul>
              <li>Daily Motivational Quotes</li>
              <li>Progress Bar</li>
              <li>Go Getter Club</li>
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
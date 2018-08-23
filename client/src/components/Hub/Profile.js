import React, { Component } from 'react';
import withAuth from '../Auth/withAuth';
import API from '../../utils/API';
import { Link } from 'react-router-dom';
import "./Home.css";
import Buttons from "./Buttons/Buttons";
import Resources from "./Resources/Resources";

class Profile extends Component {

  state = {
    username: "",
    email: "",
    component: "Button"
  };

  componentDidMount() {
    API.getUser(this.props.user.id).then(res => {
      console.log(res);
      this.setState({
        username: res.data.username,
        email: res.data.email
      })
    });
  };

  getResources = () => {
    console.log("sup");
    this.setState({ resoruces: true });
  };

  renderButton = (newComponent) => {
    this.setState({
      component: newComponent
    })
  };

  render() {
    return (
      <div className="body">
        <div className="nav">
          <div className="col-md-10">
          </div>
          <div className="col-md-2">
            <h1 className="journeyOn">Journey On!</h1>
            <Link to="/">Go home</Link> ||
            <Link to="/buildjourney"> Add a Journey</Link>
          </div>
        </div>
        <div className="Profile">
          <div className="welcome container">
            <h1>Welcome... {this.props.user.email}</h1>
            <p>Time to get shit done!</p>
            <button type="button" class="btn-primary add" onClick={() => this.renderButton("Button")}>Hub</button>
          </div>
          <div className="container">
            {(() => {
              switch (this.state.component) {
                case "Button": return <Buttons renderButton={this.renderButton} />;
                case "Calendar": return "#00FF00";
                case "Board": return "#0000FF";
                case "Resources": return <Resources renderButton={this.renderButton} />;
                default: return <Buttons renderButton={this.renderButton} />;
              }
            })()}


          </div>
          <div className="container progress">
            <p className="container bar">Progress Bar</p>
          </div>
        </div>

        <footer>
          <div className="foot2">
            <div className="container">
              <div className="row">
                <div className="col l6 s12 about">
                  <p className="grey-text">Press</p>
                  <p className="grey-text">Contact</p>
                  <p className="grey-text">Folow us</p>
                </div>
                <div className="col l4 offset-l2 s12">
                  <h5 className="white-text">Newsletter</h5>
                  <p className="signupEmail">Sign up to our newsletter and stay up to date.</p>
                  <ul className="dotts">
                    <li><a className="grey-text text-lighten-3" href="https://www.facebook.com">Facebook</a></li>
                    <li><a className="grey-text text-lighten-3" href="https://www.twitter.com">Twitter</a></li>
                    <li><a className="grey-text text-lighten-3" href="https://www.instagram.com">Instagram</a></li>
                    <li><a className="grey-text text-lighten-3" href="https://www.snapchat.com">Snapchat</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="footer-copyright">
              <div class="container">
                © 2018 Copyright Journey
            </div>
            </div>
          </div>
        </footer>
      </div>
    )
  }
}


export default withAuth(Profile);
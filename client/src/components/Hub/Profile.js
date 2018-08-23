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
    API.getUserName(this.props.user.id).then(res => {
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
          </div>
          <div className="container">
            {(() => {
              switch (this.state.component) {
                case "Button": return <Buttons renderButton={this.renderButton}/>;
                case "Calendar": return "#00FF00";
                case "Board": return "#0000FF";
                case "Resources": return <Resources renderButton={this.renderButton}/>;
                default: return <Buttons renderButton={this.renderButton}/>;
              }
            })()}


          </div>
          <div className="container progress">
            <h1 className="container bar">Progress Bar</h1>
          </div>
        </div>
      </div>
    )
  }
}

export default withAuth(Profile);
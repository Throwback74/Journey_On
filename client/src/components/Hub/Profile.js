import React, { Component } from 'react';
import withAuth from '../Auth/withAuth';
import API from '../../utils/API';
import { Link } from 'react-router-dom';
import "./Home.css";

class Profile extends Component {

  state = {
    username: "",
    email: ""
  };

  componentDidMount() {
    API.getUser(this.props.user.id).then(res => {
      this.setState({
        username: res.data.username,
        email: res.data.email
      })
    });
  }

  render() {
    return (
      <div className="body">
        <div className="nav">
          <div className="col-md-10">
          </div>
          <div className="col-md-2">
            <h1 className="journeyOn">Journey On!</h1>
            <Link to="/home">Go home</Link>
          </div>
        </div>
        <div className="Profile">
          <div className="welcome container">
            <h1>Welcome... {this.state.username}</h1>
            <p>Time to get shit done!</p>
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
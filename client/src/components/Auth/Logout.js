import React, { Component } from 'react';
import AuthService from '../Auth/AuthService';
import withAuth from '../Auth/withAuth';

const Auth = new AuthService();


class Logout extends Component {


  componentDidMount() {
    Auth.logout();
    this.props.history.replace('/');
  }

  handleLogout = () => {
    Auth.logout();
    this.props.history.replace('/signup');
  };

  render() {
    return (
      <div className="App">
        <p className="App-intro">
          <span>If logout failed click button below</span>
          <button type="button" className="btn btn-danger" onClick={this.handleLogout}>Logout</button>
        </p>
      </div>
    );
  }
}

export default withAuth(Logout);
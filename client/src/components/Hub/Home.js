import React, { Component } from 'react';
// import logo from './logo.svg';
import './Home.css';
import AuthService from '../Auth/AuthService';
import withAuth from '../Auth/withAuth';
// import Footer from '../Footer/Footer';
const Auth = new AuthService();

class Home extends Component {

  state = {
    userId: this.props.user.id,
    profileLink: ""
  };

  componentDidMount() {
    const profileLinkURL = `/profile/${this.state.userId}`;
    this.setState({
      profileLink: profileLinkURL
    });
  }

  handleLogout = () => {
    Auth.logout();
    this.props.history.replace('/signup');
  };

  goToEditProfile = () => {
    this.props.history.replace(this.state.profileLink);
  };

  render() {
    console.log(process.env.REACT_APP_SECRET_CODE);
    console.log(this.state.history);
    return (
      <div className="App">
        <div className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <h2>Welcome {this.props.user.email}</h2>
        </div>
        <p className="App-intro">
          <button type="button" className="btn btn-primary" onClick={this.goToEditProfile}>Go to Profile</button>
          <button type="button" className="btn btn-danger" onClick={this.handleLogout}>Logout</button>
        </p>
        {/* <Footer /> */}
      </div>
    );
  }
}

export default withAuth(Home);

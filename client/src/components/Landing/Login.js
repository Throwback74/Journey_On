import React, {Component} from 'react';
import AuthService from '../Auth/AuthService';
import {Link} from 'react-router-dom';
import "./Login.css";

class Login extends Component {
  constructor() {
    super();
    this.Auth = new AuthService();
  }

  componentWillMount() {
    if (this.Auth.loggedIn()) {
      this.props.history.replace('/');
    }
  }

  handleFormSubmit = event => {
    event.preventDefault();

    this.Auth.login(this.state.email, this.state.password)
      .then(res => {
        // once user is logged in
        // take them to their profile page
        this.props.history.replace(`/profile/${res.data.user._id}`);
      })
      .catch(err => {
        console.log(err.response);
        alert(err.response.data.message)
      });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
        [name]: value
    });
  };

  render() {
    return (
      <div className="loginContainer">
        <div className="form-group row justify-content-center">
          <div className="col-md-6">
        <h1>Login</h1>
        <form onSubmit={this.handleFormSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email address:</label>
            <input className="form-control"
                    placeholder="Email goes here..."
                    name="email"
                    type="email"
                    id="email"
                    onChange={this.handleChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="pwd">Password:</label>
            <input className="form-control"
                    placeholder="Password goes here..."
                    name="password"
                    type="password"
                    id="pwd"
                    onChange={this.handleChange}/>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        <p><Link to="/signup">Go to Signup</Link></p>
        </div>
      </div>
    </div>
    );
  }
}

export default Login;
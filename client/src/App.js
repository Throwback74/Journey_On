import React, { Component } from 'react';

import Landing from './components/Landing/Landing';


class App extends Component {
  
  state = {
    tokenID: ""
  }


  componentDidMount() {
    // Retrieves the user token from localStorage
    var tokenID = localStorage.getItem('id_token');
    this.setState({
      tokenID: tokenID
    })
  }


  render() {
    return (
      <Landing tokenID={this.state.tokenID} />
    );
  }
}

export default App;

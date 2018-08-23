import React, { Component } from 'react';
import './react-cal.css';
import './Cal.css';
import AuthService from '../../Auth/AuthService';
import withAuth from '../../Auth/withAuth';
import InfiniteCalendar, {
  Calendar,
  withRange,
  withMultipleDates,
  defaultMultipleDateInterpolation
} from 'react-infinite-calendar';
// import 'react-infinite-calendar/styles.css';


const CalendarWithRange = withRange(Calendar);
const Auth = new AuthService();

var today = new Date();
var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);

class Cal extends Component {

  state = {
    userId: this.props.user.id,
    profileLink: "",
    date: new Date(),
  };

  handleLogout = () => {
    Auth.logout();
    this.props.history.replace('/signup');
  };


  onChange = date => this.setState({ date });


  render() {
    return (
      <div className="Cal">
        <div className="Cal-header">
          
          <h2>Welcome {this.props.user.email}</h2>
          <p className="App-intro">
          <button type="button" className="btn btn-danger" onClick={this.handleLogout}>Logout</button>
        </p>
        </div>
        <div className="container-fluid cal-container">
        {/* <InfiniteCalendar
            width={400}
            height={600}
            selected={today}
            disabledDays={[0,6]}
            minDate={lastWeek}
          /> */}

        <InfiniteCalendar
            className="chain"
            displayOptions={{
              layout: 'landscape',
              showOverlay: false,
              shouldHeaderAnimate: true
            }}
            width={1200}
            height={600}
            minDate={lastWeek}
            Component={withMultipleDates(Calendar)}
            selected={[
              new Date(2018, 8, 16),
              new Date(),
              new Date(2018, 9, 2)
            ]}
            locale={{
              headerFormat: 'MMM Do',
            }}
            interpolateSelection={defaultMultipleDateInterpolation}
          />
        </div>
      </div>
    );
  }
}

export default withAuth(Cal);

import React, { Component } from "react";
import { Calendar, withDragAndDrop } from "react-big-calendar";
import moment from "moment";
// import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import "./Cal.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

// Calendar.momentLocalizer(moment);
// Calendar.setLocalizer(Calendar.momentLocalizer(moment));

const DnDCalendar = withDragAndDrop(Calendar);

export default class Cal extends Component {
  state = {
    events: [
      {
        start: new Date(),
        end: new Date(moment().add(1, "days")),
        title: "Some title"
      }
    ]
  };

  onEventResize = (type, { event, start, end, allDay }) => {
    this.setState(state => {
      state.events[0].start = start;
      state.events[0].end = end;
      return { events: state.events };
    });
  };

  onEventDrop = ({ event, start, end, allDay }) => {
    console.log(start);
  };

  render() {
    return (
      <div className="Cal">
        <header className="Cal-header">
          
          <h1 className="Cal-title">Welcome to React</h1>
        </header>
        <p className="Cal-intro">
          To get started, edit <code>src/Cal.js</code> and save to reload.
        </p>
        <DnDCalendar
          defaultDate={new Date()}
          defaultView="month"
          events={this.state.events}
          onEventDrop={this.onEventDrop}
          onEventResize={this.onEventResize}
          resizable
          style={{ height: "100vh" }}
        />
      </div>
    );
  }
}

// export default Cal;

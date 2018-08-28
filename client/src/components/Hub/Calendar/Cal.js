import React, { Component } from "react";
import Calendar from "react-big-calendar";
import moment from "moment";
// import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import API from '../../../utils/API';
// import AuthService from '../../Auth/AuthService';
import withAuth from '../../Auth/withAuth';
import "./Cal.css";
// import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
// const Auth = new AuthService();
const idArr = []; 
const newArr = [];
var journeyID;
var eventsArr = [];
const eventsObj = {};
var tasksRes;

const eventsData = {events: [
                {
                  start: new Date(),
                  end: new Date(moment().add(1, "days")),
                  title: "Some title"
                }
              ]};

Calendar.setLocalizer(Calendar.momentLocalizer(moment));

// const DnDCalendar = withDragAndDrop(Calendar);
class Cal extends Component {
  state = {
    events: [
      {
        start: new Date(),
        end: new Date(moment().add(1, "days")),
        title: "Some title"
      }
    ],
    tasksArr: [],
    journeyArray: [],
    journeyIds: []
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

  componentWillMount = () => {
    API.populateAll(this.props.user.id).then(res => {
        console.log(res.data.journeys[0].tasks);
        tasksRes = res.data.journeys[0].tasks;
        console.log(tasksRes)
        this.updateEvents(tasksRes);
        for(let i = 0; i < tasksRes.length; i++){
        var endDate = new Date(tasksRes[i].taskDate + 869272388)
        eventsObj.start = tasksRes[i].taskDate;
        eventsObj.end = endDate;
        eventsObj.title = tasksRes[i].taskTitle;
        eventsArr = [...this.state.eventsArr, eventsObj];
        eventsData.events.push({ start: tasksRes[i].taskDate, end: endDate, title: tasksRes[i].taskTitle})
        
        }
        console.log(eventsData);
      console.log(eventsArr);
      this.setState({
        events: eventsArr,
        tasksArr: tasksRes
      })
      return tasksRes;
    }).catch(err => {
        console.log(err.response);
        console.log("Populate Error Cal.js ", err);
    });
  }

  componentDidMount() {
    API.getUser(this.props.user.id).then(res => {
        console.log(res)
        
        for (let i = 0; i < res.data.journeys.length; i++) {
            newArr.push(res.data.journeys[i].journeyName)
            idArr.push(res.data.journeys[i]._id)
        }
        journeyID = res.data.journeys[0]._id;
        console.log(res.data.journeys[0]._id);
        console.log(idArr)
        this.setState({ 
          journeyArray: newArr,
          journeyIds: idArr
        })
        return journeyID
    }).then(data => {
    console.log(data);
    console.log(this.state.eventsArr);
    console.log(tasksRes);
      // this.loadTask(data);
  }).catch(err => {
    console.log(err.response);
    console.log("Get user and find Journey err, Cal.js", err);
});
  console.log(this.state.eventsArr);
  console.log(tasksRes);
  // this.updateEvents(tasksRes);
  }
  // data.completeBy

  
  
    

  updateEvents(tasksRes) {
    if(tasksRes){
      this.setState({
        tasksArr: tasksRes
      })
    }else {
      console.log(tasksRes);
    }
  }
  


  render() {
    return (
      <div className="App">
        <header className="App-header">
          
          <h1 className="App-title">{this.props.journeyArray[0]}</h1>
        </header>
        {/* <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p> */}
        <Calendar
          // toolbar={false}
          defaultDate={new Date()}
          defaultView="month"
          events={this.state.tasksArr}
          startAccessor={(event) => { return moment(event.taskDate.date) }}
          endAccessor={(event) => { return moment(event.taskDate.date) }}
          onEventDrop={this.onEventDrop}
          onEventResize={this.onEventResize}
          resizable
          style={{ height: "600px" }}
        />
      </div>
    );
  }
}

export default withAuth(Cal);

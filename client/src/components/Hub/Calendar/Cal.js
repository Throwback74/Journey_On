import React, { Component } from "react";
import Calendar from "react-big-calendar";
import moment from "moment";
import API from '../../../utils/API';
// import AuthService from '../../Auth/AuthService';
import withAuth from '../../Auth/withAuth';
import "./Cal.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
// const Auth = new AuthService();
const idArr = []; 
const newArr = [];
var journeyID;
var eventsArr = [];
const eventsObj = {};


Calendar.setLocalizer(Calendar.momentLocalizer(moment));

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
      // this.loadTask(data);
  })
  console.log(this.state.eventsArr);
  }
  // data.completeBy

  // loadTask (data) {
  //   if(Auth.loggedIn()){
  //     // var journeyID = this.props.journeyIds[0];
  //     console.log(journeyID)
  //     API.loadTasks(journeyID).then(res => {
  //             console.log("loadtasksRes", res);
  //             const eventsArr =[];
  //                   for (let i = 0; i < res.data.tasks.length; i++) {
  //                 eventsArr.push(res.data.tasks[i])
                  
  //             }

  //             this.setState({ 
  //               eventsArr: eventsArr,
  //               events: [
  //                 {
  //                   start: new Date(),
  //                   end: new Date(eventsArr[0].data.completeBy),
  //                   title: "Some title"
  //                 }
  //               ]
  //             })
  //           }).catch(err => {
  //             console.log(err);
  //           })
  //       }
  //   }
  
    componentWillMount = () => {
      API.populateAll(this.props.user.id).then(res => {
          console.log(res.data.journeys[0].tasks);
          var tasksRes = res.data.journeys[0].tasks;
          console.log(tasksRes)
          for(let i = 0; i < tasksRes.length; i++){
          var endDate = new Date(tasksRes[i].taskDate + 869272388)
          eventsObj.start = tasksRes[i].taskDate;
          eventsObj.end = endDate;
          eventsObj.title = tasksRes[i].taskTitle;
          eventsArr = [...this.state.eventsArr, eventsObj];
          // eventsArr.push({ start: tasksRes[i].taskDate, end: endDate, title: tasksRes[i].taskTitle})
          }
          
        console.log(eventsArr);
        this.setState({
          events: eventsArr,
          tasksArr: tasksRes
        })
      }).catch(err => {
          console.log(err.response);
          alert(err)
      });
  }
  
//   componentDidMount() {
//     console.log(this.props.journeyIds);
//     var journeyID = this.props.journeyIds[0];
//     API.loadTasks(journeyID).then(res => {
//       console.log("loadtasksRes", res);
//       const eventsArr =[];
//             for (let i = 0; i < res.data.tasks.length; i++) {
//           eventsArr.push(res.data.tasks[i])
//       }
//       this.setState({ eventsArr: eventsArr })
//     }).catch(err => {
//       console.log(err);
//     })
// }

  // componentDidMount() {
  //   console.log("journeyID", this.state.journeyIds[0])
  //   API.loadTasks(this.state.journeyIds[0]).then(res => {
  //     console.log("loadtasksRes", res);
  //     const eventsArr =[];
  //           for (let i = 0; i < res.data.tasks.length; i++) {
  //         eventsArr.push(res.data.tasks[i])
  //     }
  //     this.setState({ eventsArr: eventsArr })
  //   }).catch(err => {
  //     console.log(err);
  //   })};

// DO THIS EXCEPT FOR SEARCHING JOURNEY MODEL FOR TASKS
//   componentWillMount() {
//     API.getUser(this.props.user.id).then(res => {
//         console.log(res)
//         const newArr = []
//         for (let i = 0; i < res.data.journeys.length; i++) {
//             newArr.push(res.data.journeys[i].journeyName)
//         }
//         this.setState({ journeyArray: newArr })
//     })
// }


  // componentDidMount() {
  //   API.loadTasks(this.props.user.id).then(res => {
  //     this.setState({
  //       username: res.data.username,
  //       email: res.data.email
  //     })
  //   });
  // }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          
          <h1 className="App-title">{this.props.journeyArray[0]}{this.props.journeyIds[0]}</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Calendar
          defaultDate={new Date()}
          defaultView="month"
          events={this.state.events}
          style={{ height: "100vh" }}
        />
      </div>
    );
  }
}

export default withAuth(Cal);

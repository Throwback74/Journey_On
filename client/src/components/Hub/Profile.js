import React, { Component } from 'react';
import withAuth from '../Auth/withAuth';
import API from '../../utils/API';
import { Link, Route } from 'react-router-dom';
import "./Home.css";
import Buttons from "./Buttons/Buttons";
import Resources from "./Resources/Resources";
import Progress from "./Progress/Progress";
import Kanban from "./Kanban/Kanban";
import List from "./List/List";

const idArr = []; 
const newArr = [];
const taskArr = [];
const taskIds = [];
var journeyID;
class Profile extends Component {

  state = {
    username: "",
    email: "",
    component: "Button",
    progress: "show",
    videoUrl: "",
    currentJourney: {
      id: '5b804dbbbeb1cc871c3c0ed8'
    },
    journeyArray: [],
    journeyIds: [],
    taskIds: [],
    taskArray: []
  };

  componentWillMount() {
    console.log(this.props.user)
    console.log(this.state.journeyArray)
    API.getUserName(this.props.user.id).then(res => {
      this.setState({
        username: res.data.username,
        email: res.data.email
      })
    });
    API.updateLogin(this.props.user.id);
  };


  //Todo Pass in Task ID instead of User ID for populate videos
  componentDidMount(){
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
      console.log(journeyID)
      return journeyID
  }).then(data => {
  console.log(data);

  this.loadTasks();
  this.populateAll();
  })
  }

  loadTasks = (journeyID) => {
    API.loadTasks(journeyID).then(res => {
      console.log("loadtasksRes", res);
      for (let i = 0; i < res.data.tasks.length; i++) {
        taskArr.push(res.data.tasks[i]);
        taskIds.push(res.data.tasks[i]._id);
      }
        this.setState({
          taskArray: taskArr,
          taskIds: taskIds
        })
        return taskIds
      }).then(data => {
        console.log('task data, ', data)
        API.populateAll(this.props.user.id).then(res => {
          console.log('populated All', res);
        })
      })
  }

  populateAll = () => {
    API.populateAll(this.props.user.id).then(res => {
      console.log('populated All', res);
    })
  }


  // API.addTask(card.title, card.description, journeyID)
  // .then(res => {
  //     console.log("Whats the journeyID?", this.props.journeyArray[0].id);
  //     console.log(res.data); // delete this later?
  //     alert("Task Added!"); // delete alert later?

  // }).catch(err => {
  //     console.log(err.response);
  //     alert(err.response.data.message)
  // });


  addVideo = () => {
    API.addVideo(this.state.videoUrl, journeyID).then(function(res){
      console.log(res);
      alert("Video Added!");
    }).catch(err => {
          console.log(err.response);
          alert(err.response.data.message)
      });
  }

  mouseEvent = () => {
    console.log("Hello!")
  }

  getResources = () => {
    console.log("sup");
    this.setState({ resoruces: true });
  };

  handleChange = event => {
    let {name, value} = event.target;
    this.setState({
      [name]: value
    });
  };

  renderButton = (newComponent) => {
    this.setState({
      component: newComponent,
      progress: "show"
    })
  };

  render() {
    console.log(window.location.pathname)
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
          <div className="listdiv">
              <List/>
          </div>
        </div>
        <div className="Profile">
          <div className="welcome container">
            <h1>Welcome... {this.state.username}</h1>
            <p>Time to get shit done!</p>
            <Link to={`/profile/${this.props.user.id}`}><button type="button" className="btn-primary add">Hub</button></Link>
          </div>
          <div className="container">
            {/* {(() => {
              switch (this.state.component) {
                case "Button": return <Buttons renderButton={this.renderButton} userId={this.props.user.id} />;
                case "Calendar": return "#00FF00";
                case "Board": return "#0000FF";
                case "Resources": return <Resources renderButton={this.renderButton}  />;
                default: return <Buttons renderButton={this.renderButton} userId={this.props.user.id} />;
              }
            })()} */}
            { 
              (!window.location.pathname.includes("item")) ?
              <Buttons renderButton={this.renderButton} userId={this.props.user.id} handleChange={this.handleChange} videoUrl={this.state.videoUrl} addVideo={this.addVideo} />
              :
              ""
            }
            <Route exact path={`/profile/${this.props.user.id}/item/resources`} render={(props) => ( <Resources handleChange={this.handleChange} videoUrl={this.state.videoUrl} addVideo={this.addVideo} userId={this.props.user.id} /> )} />
            {/* <Route exact  component={Resources} handleChange={this.handleChange} newVideoUrl={this.state.videoUrl}/> */}
            {/* <Route exact path={`/profile/${this.props.user.id}/item/calendar`} component={Calendar} /> */}
            <Route exact path={`/profile/${this.props.user.id}/item/board`} component={Kanban} />
          
          </div>
          <div className="container">
            {(() => {
              switch (this.state.progress) {
                case "show": return <Progress renderButton={this.renderButton}/>
                case "hide": return ""
                default: return <Progress/>
              }
            })}
          </div>
        </div>
        <div className="filler">

        </div>

        <footer>
          <div className="foot2">
            <div className="container">
              <div className="row">
                <div className="col l6 s12 about">
                  <p className="grey-text">Press</p>
                  <p className="grey-text">Contact</p>
                  <p className="grey-text">Folow us</p>
                </div>
                <div className="col l4 offset-l2 s12">
                  <h5 className="white-text">Newsletter</h5>
                  <p className="signupEmail">Sign up to our newsletter and stay up to date.</p>
                  <ul className="dotts">
                    <li><a className="grey-text text-lighten-3" href="https://www.facebook.com">Facebook</a></li>
                    <li><a className="grey-text text-lighten-3" href="https://www.twitter.com">Twitter</a></li>
                    <li><a className="grey-text text-lighten-3" href="https://www.instagram.com">Instagram</a></li>
                    <li><a className="grey-text text-lighten-3" href="https://www.snapchat.com">Snapchat</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="footer-copyright">
              <div className="container">
                © 2018 Copyright Journey
            </div>
            </div>
          </div>
        </footer>
      </div>
    )
  }
}


export default withAuth(Profile);

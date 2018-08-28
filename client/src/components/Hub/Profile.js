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
import Calendar from "./Calendar/Cal";
import Footer from "../Footer/Footer";

const idArr = [];
const newArr = [];
// const taskArr = [];
// const taskIds = [];
var journeyID;
// const location = this.props.history.location;

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
    taskArray: [],
    videoArr: [],
    locationTrigger: ""
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

    // TODO: make API request to get the video data
    // TODO: add the res.data to the videoArr's state
  };


  //Todo Pass in Task ID instead of User ID for populate videos
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
      console.log(journeyID)
      return journeyID
    }).then(data => {
      console.log(data);

  // this.loadTasks();
  this.populateAll();
  this.loadVideos(journeyID);
  this.checkLocation(this.props.history.location.pathname);
  })
  }

  populateAll = () => {
    API.populateAll(this.props.user.id).then(res => {
      console.log('populated All', res);
      this.setState({
        videoArr: res.data.journeys[0].videos
      })
      this.listVideos(this.state.videoArr)
    })
  }

  listVideos = () => {
    this.state.videoArr.map((video) =>
      <li>{video}</li>
    )
  }


  loadVideos = (journeyID) => {
    API.loadVideos(journeyID).then(function(res){
      console.log(res);
      console.log(res.data.videos);
    }).catch(err => {
      console.log(err.response);
      alert(err.response.data.message)
  }).catch(err => {
    alert(err)
  });
  }

  addVideo = () => {
    API.addVideo(this.state.videoUrl, journeyID).then(res => {
      console.log(res);
      alert("Video Added!");
      this.populateAll()
        })
      }

  getResources = () => {
    console.log("sup");
    this.setState({ resoruces: true });
  };

  handleChange = event => {
    let { name, value } = event.target;
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

  checkLocation = (location) => {
    console.log(location);
    if(location === `/profile/${this.props.user.id}/item/calendar`) {
      this.setState({
        locationTrigger: "Calendar"
      })
    }else {
      this.setState({
        locationTrigger: ""
      })
    }
  }

  render() {
    return (
      <div className="body">
        <div className="nav">
        <div className="col-md-2">
          <Link to="/logout">
            <button type="button" className="btn btn-danger landingLogoutBtn">Logout</button>
          </Link>
          </div>
          <div className="col-md-8">
          </div>
          <div className="col-md-2">
            <h1 className="journeyOn">Journey On!</h1>
            <Link to="/">Go home</Link> ||
            <Link to="/buildjourney"> Add a Journey</Link>
          </div>
          <div className="listdiv">
            <List />
          </div>
        </div>
        <div className="Profile">
          <div className="welcome container">
            <h1 className="welcomeHeader">Welcome... {this.state.username}</h1>
            <p className="timeP">Time to get work done!</p>
            <Link to={`/profile/${this.props.user.id}`}><button type="button" className="add">Hub</button></Link>
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
            <Route exact path={`/profile/${this.props.user.id}/item/resources`} render={(props) => (<Resources handleChange={this.handleChange} videoUrl={this.state.videoUrl} addVideo={this.addVideo} videoArr={this.state.videoArr} />)} />
            {/* <Route exact  component={Resources} handleChange={this.handleChange} newVideoUrl={this.state.videoUrl}/> */}
            <Route exact path={`/profile/${this.props.user.id}/item/calendar`} component={Calendar} />
            <Route exact path={`/profile/${this.props.user.id}/item/board`} component={Kanban} />

          </div>
          <div className="container">
            {(() => {
              switch (this.state.progress) {
                case "show": return <Progress renderButton={this.renderButton} />
                case "hide": return ""
                default: return <Progress />
              }
            })}
          </div>
        </div>
        <Footer locationTrigger={this.state.locationTrigger}/>
        
      </div>
    )
  }
}


export default withAuth(Profile);

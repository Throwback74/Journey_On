import axios from 'axios';

export default {
  // Gets a single user by id
  getUser: (id) => {
    return axios.get(`/api/test/${id}`);
  },
  // Gets a single user by id
  getUserName: (id) => {
    return axios.get(`/api/username/${id}`);
  },
  // sign up a user to our service
  signUpUser: (username, email, password) => {
    return axios.post('api/signup', {username: username, email: email, password: password});
  },
  addGoal: (journeyName, journeySummary, completeBy, email) => {
    return axios.post('api/addgoal', {journeyName: journeyName, journeySummary: journeySummary, completeBy: completeBy, email: email});
  },
  loginUser: (email, password) => {
    return axios.post('api/login', {email: email, password: password});
  },

  deleteGoal: (email) => {
    return axios.post('api/deletejourney', {email: email})
  },
addTask: (taskTitle, taskDescription, taskLabel, userId) => {
    return axios.post('api/addtask', {taskTitle: taskTitle, taskDescription: taskDescription, taskLabel: taskLabel, userId: userId});
  }
  

};

//

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

  loadTasks: (journeyId) => {
    return axios.get(`/api/gettasks/${journeyId}`)
  },

  loadVideos: (journeyId) => {
    return axios.get(`/api/getvideos/${journeyId}`)
  },

  // populateTasks: (journeyId) => {
  //   return axios.get(`/api/populateTasks/${journeyId}`)
  // },

  // getVideos: (Videoid) => {
  //   return axios.get(`/api/videos/${Videoid}`)
  // },

  populateAll: (id) => {
    return axios.get(`/api/populate/${id}`)
  },
  populateVideos: (taskId) => {
    return axios.get(`/api/video/${taskId}`)
  },

  // sign up a user to our service
  signUpUser: (username, email, password) => {
    return axios.post('/api/signup', {username: username, email: email, password: password});
  },
  updateReminder: (id, bool) => {
    return axios.post(`/api/reminder`, { _id: id, reminder: bool });
  },
  updateLogin: (id) => {
    return axios.post(`/api/update`, {_id: id, updatedAt: Date.now()});
  },

  addJourney: (journeyName, journeySummary, completeBy, email, userID) => {
    return axios.post('/api/addJourney', { journeyName: journeyName, journeySummary: journeySummary, completeBy: completeBy, email: email, userId: userID });
  },

  loginUser: (email, password) => {
    return axios.post('/api/login', {email: email, password: password});
  },

  deleteGoal: (email) => {
    return axios.post('/api/deletejourney', {email: email})
  },

  addTask: (taskTitle, taskDescription, taskLabel, cardID, journeyId) => {
    return axios.post('/api/addtask/', {taskTitle: taskTitle, taskDescription: taskDescription, taskLabel: taskLabel, cardId: cardID, taskDate: Date.now(), journeyId: journeyId});
  },

  addVideo: (videoUrl, journeyId) => {
    return axios.post('/api/videos', {videoUrl: videoUrl, journeyId: journeyId});
  }
};

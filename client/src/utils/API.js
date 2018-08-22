import axios from 'axios';

export default {
  // Gets a single user by id
  getUser: (id) => {
    return axios.get(`/api/user/${id}`);
  },
  // sign up a user to our service
  signUpUser: (username, email, password) => {
    return axios.post('api/signup', {username: username, email: email, password: password});
  },
<<<<<<< HEAD
  addGoal: (goal, firstStep, secondStep, thirdStep, fourthStep, fifthStep, completeBy, email) => {
    return axios.post('api/addgoal', {goal: goal, firstStep: firstStep, secondStep: secondStep, thirdStep: thirdStep, fourthStep: fourthStep, fifthStep: fifthStep, completeBy: completeBy, email: email});
=======
  // For adding a goal to our goal database
  addGoal: (goal, firstStep, secondStep, thirdStep, fourthStep, fifthStep, completeBy) => {
    return axios.post('api/addgoal', {goal: goal, firstStep: firstStep, secondStep: secondStep, thirdStep: thirdStep, fourthStep: fourthStep, fifthStep: fifthStep, completeBy: completeBy});
>>>>>>> 9f9781adc97e99699eb5c274f22119e206949d39
  }
};

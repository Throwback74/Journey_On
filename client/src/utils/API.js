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
  addGoal: (goal, firstStep, secondStep, thirdStep, fourthStep, fifthStep, completeBy) => {
    return axios.post('api/addgoal', {goal: goal, firstStep: firstStep, secondStep: secondStep, thirdStep: thirdStep, fourthStep: fourthStep, fifthStep: fifthStep, completeBy: completeBy});
  }
};

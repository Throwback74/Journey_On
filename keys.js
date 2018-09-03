require("dotenv").config();
console.log('this is loaded');

let creds = {
  USER: process.env.USER,
  PASS: process.env.PASS
};

const secret = {
  SECRET: process.env.SECRET
}

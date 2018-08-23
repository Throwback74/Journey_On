import React from 'react';
import {Link} from "react-router-dom";
import './Landing.css';


const LandingBtns = (props) => {
  if(props.tokenID){
    return(
    <div className = "btnContainer" >
      <Link to="/signup">
        <button type="button" className="btn btn-primary signUpBtn">Signup</button>
      </Link>
      <Link to="/login">
        <button type="button" className="btn btn-danger loginBtn">Login</button>
      </Link>
    </div>
  )
}else {
  return(
    <div className = "btnContainer" >
      <Link to="/signup">
        <button type="button" className="btn btn-primary signUpBtn">Signup</button>
      </Link>
      <Link to="/login">
        <button type="button" className="btn btn-danger loginBtn">Login</button>
      </Link>
  </div>
  )
}
}

export default LandingBtns;
import React from "react";
import {Link} from "react-router-dom";


const Landing = props => (
  <section className="hero is-info is-medium is-bold">
        <Link to="/signup">
          <button type="button" className="btn btn-primary">Signup</button>
        </Link>
        <Link to="/login">
          <button type="button" className="btn btn-danger" >Login</button>
        </Link>
    </section>
);

export default Landing;
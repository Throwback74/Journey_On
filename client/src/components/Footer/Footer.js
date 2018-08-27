import React from "react";
import "./Footer.css";

const Footer = (props) => (
    <footer>
        <div className="ffoot">
            <div className="fcontainer">
                <div className="row">
                    <div className="col l4 offset-l2 s12">
                        <p className="fsignupEmail">Sign up to our newsletter and stay up to date.</p>
                        <ul className="fdotts">
                            <li><a className="fgrey-text text-lighten-3" href="https://www.facebook.com">Facebook</a></li>
                            <li><a className="fgrey-text text-lighten-3" href="https://www.twitter.com">Twitter</a></li>
                            <li><a className="fgrey-text text-lighten-3" href="https://www.instagram.com">Instagram</a></li>
                            <li><a className="fgrey-text text-lighten-3" href="https://www.snapchat.com">Snapchat</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="ffooter-copyright">
                <div className="container">
                    <p className="fcopywrite">© 2018 Copyright Journey On</p>
                </div>
            </div>
        </div>
    </footer>
);

export default Footer;
import React from "react";
import "./Footer.css";

const Footer = (props) => (
    <footer>
        <div className="foot">
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
                <h1 className="footerTitle">Journey</h1>
            </div>
            <div class="footer-copyright">
                <div class="container">
                    <p className="copywrite">© 2018 Copyright Journey On</p>
                </div>
            </div>
        </div>
    </footer>
);

export default Footer;
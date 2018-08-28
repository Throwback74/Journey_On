import React from "react";
import "./Footer.css";


const Footer = (props) => (
    <div className='wrapper'>
    <div className={`${props.locationTrigger ? 'filler2' : 'filler'}`}>

    </div>
    <footer>
        <div className={`${props.locationTrigger ? 'ffoot2' : 'ffoot'}`}>
            <div className="container">
                <div className="row">
                    <div className="col l6 s12 fabout">
                        <p className="fgrey-text">Press</p>
                        <p className="fgrey-text">Contact</p>
                        <p className="fgrey-text">Folow us</p>
                    </div>
                    <div className="col l4 offset-l2 s12">
                        <h5 className="fwhite-text">Newsletter</h5>
                        <p className="fsignupEmail">Sign up to our newsletter and stay up to date.</p>
                        <ul className="fdotts">
                            <li><a className="fgrey-text text-lighten-3" href="https://www.facebook.com">Facebook</a></li>
                            <li><a className="fgrey-text text-lighten-3" href="https://www.twitter.com">Twitter</a></li>
                            <li><a className="fgrey-text text-lighten-3" href="https://www.instagram.com">Instagram</a></li>
                            <li><a className="fgrey-text text-lighten-3" href="https://www.snapchat.com">Snapchat</a></li>
                        </ul>
                    </div>
                </div>
                <h1 className="ffooterTitle">Journey</h1>
            </div>
            <div className="ffooter-copyright">
                <div className="container">
                    <p className="fcopywrite">© 2018 Copyright Journey On</p>
                </div>
            </div>
        </div>
    </footer>
    </div>
);

export default Footer;
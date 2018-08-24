import React from 'react';
// import withAuth from '../../Auth/withAuth';
import "../Resources/Resources.css";
import {Link} from "react-router-dom";
const resourceBtn = "Resources";

const Buttons = (props) => {
    return (
        <div className="middle row">
            <Link className="icon1 col-md-4" to={`/profile/${props.userId}/item/calendar`}>
                <button className="button button1"></button>
            </Link>
            <Link className="icon2 col-md-4" to={`/profile/${props.userId}/item/board`}>
                <button className="button button2"></button>
            </Link>
            <Link className="icon3 col-md-4" to={`/profile/${props.userId}/item/resources`}>
                <button className="button button3"></button>
            </Link>

        </div>
    )
}

export default Buttons;
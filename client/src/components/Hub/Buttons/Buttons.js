import React from 'react';
import withAuth from '../../Auth/withAuth';
import "../Resources/Resources.css";

const resourceBtn = "Resources";

const Buttons = (props) => {
    console.log(props)
    return (
        <div className="middle row">
            <div className="icon1 col-md-4">
                <button className="button button1"></button>
                
            </div>
            <div className="icon2 col-md-4">
                <button className="button button2"></button>
            </div>
            <div className="icon3 col-md-4">
                <button className="button button3"  onClick ={() => props.renderButton(resourceBtn)}></button>
            </div>
        </div>
    )
}

export default Buttons;
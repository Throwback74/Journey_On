import React from 'react';
// import withAuth from '../../Auth/withAuth';
// import { Link } from 'react-router-dom';
import "../Resources/Resources.css";

const Resources = props => {
    // const { addVideo, handleChange, videoUrl } = props.location.myCustomProps.props;
    console.log(props);
    return (
        <div className="middle row">
            <div className="Articles col-md-4">
                <input type="text" 
                    name="videoUrl" 
                    onChange={props.handleChange} 
                    value={props.videoUrl} 
                    className="form-control"
                />
                <button type="button" className="btn-primary add" onClick={() => props.addVideo()}>Submit</button>
                <div className="Vlinks">
                    My Vidoes
                </div>
            </div>
            <div className="Videos col-md-4">
                <input type="text" className="form-control"></input>
                <button type="button" className="btn-primary add">Submit</button>
                <div className="Alinks">
                    My Articles
                </div>
            </div>
            <div className="Notes col-md-4">
                <input type="text" className="form-control"></input>
                <button type="button" className="btn-primary add">Submit</button>
                <div className="Olinks">
                    Other Shit
                </div>
            </div>
        </div>
    )
};

export default Resources;
import React from 'react';
// import withAuth from '../../Auth/withAuth';
// import { Link } from 'react-router-dom';
import "../Resources/Resources.css";

const Resources = props => {
    return (
        <div className="middle row">
            <div className="Articles col-md-4">
                <input type="text" class="form-control"></input>
                <button type="button" class="btn-primary add">Submit</button>
                <div className="Vlinks">
                    My Vidoes
                </div>
            </div>
            <div className="Videos col-md-4">
                <input type="text" class="form-control"></input>
                <button type="button" class="btn-primary add">Submit</button>
                <div className="Alinks">
                    My Articles
                </div>
            </div>
            <div className="Notes col-md-4">
                <input type="text" class="form-control"></input>
                <button type="button" class="btn-primary add">Submit</button>
                <div className="Olinks">
                    Other Shit
                </div>
            </div>
        </div>
    )
};

export default Resources;
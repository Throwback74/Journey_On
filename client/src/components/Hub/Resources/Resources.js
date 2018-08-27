import React, { Component } from 'react';
// import withAuth from '../../Auth/withAuth';
// import { Link } from 'react-router-dom';
import "../Resources/Resources.css";


class Resources extends Component {
    render() {
        return (
            <div className="middle row">
                <div className="Articles container">
                    <input type="text"
                        name="videoUrl"
                        onChange={this.props.handleChange}
                        value={this.props.videoUrl}
                        className="form-control"
                    />
                    <button className="col-md-2 add" onClick={() => this.props.addVideo()}>Submit</button>
                </div>
                <div className="Vlinks">
                    <ul>
                        {this.props.videoArr.map(video => <li><a href={video.videoUrl}>{video.videoUrl}</a></li>)}
                        <br/>
                    </ul>
                </div>
            </div>
        )
    }
};

export default Resources;
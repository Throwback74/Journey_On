import React, { Component } from 'react';
import AuthService from '../Auth/AuthService';
import API from '../../utils/API';


class Goal extends Component {


    constructor() {
        super();
        this.Auth = new AuthService();
    };

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    

    handleFormSubmit = event => {
        event.preventDefault();
        API.addGoal(this.state.goal, this.state.firstStep, this.state.secondStep, this.state.thirdStep, this.state.fourthStep, this.state.fifthStep, this.state.completeBy)
            .then(res => {
                console.log(res.data);
                // once the user has signed up
                // send them to the login page
                alert("Goal Added!");
                this.props.history.replace('/buildjourney');
            })
            .catch(err => alert(err));
    };


    render() {
        return (
            <div className="container">
                <h1>Add a Goal!</h1>
                <form onSubmit={this.handleFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="Goal">Goal:</label>
                        <input className="form-control"
                            placeholder="Goal"
                            name="goal"
                            type="text"
                            id="goal"
                            onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="firstStep">First step (required):</label>
                        <input className="form-control"
                            placeholder="First step toward achieving your goal..."
                            name="firstStep"
                            type="text"
                            id="firstStep"
                            onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="secondStep">Second Step (optional):</label>
                        <input className="form-control"
                            placeholder="Second step toward achieving your goal..."
                            name="secondStep"
                            type="text"
                            id="secondStep"
                            onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="thirdStep">Third step (optional):</label>
                        <input className="form-control"
                            placeholder="First step toward achieving your goal..."
                            name="thirdStep"
                            type="text"
                            id="thirdStep"
                            onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="fourthStep">Fourth step (optional):</label>
                        <input className="form-control"
                            placeholder="Fourth step toward achieving your goal..."
                            name="fourthStep"
                            type="text"
                            id="fourthStep"
                            onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="fifthStep">Fifth step (optional):</label>
                        <input className="form-control"
                            placeholder="Fifth step toward achieving your goal..."
                            name="fifthStep"
                            type="text"
                            id="fifthStep"
                            onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="completeBy">Complete By (Required):</label>
                        <input className="form-control"
                            placeholder="When would you like to achieve this by?"
                            name="completeBy"
                            type="date"
                            id="completeBy"
                            onChange={this.handleChange} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}

export default Goal;
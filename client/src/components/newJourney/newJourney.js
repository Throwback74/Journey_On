import React, { Component } from 'react';
import AuthService from '../Auth/AuthService';
import API from '../../utils/API';
import withAuth from '../Auth/withAuth';
// import Footer from '../Footer/Footer';
import "./newJourney.css";



class Journey extends Component {


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

    state = {
        id: ""
    };

    componentDidMount() {
        console.log(this.props)
        this.setState({
            id: this.props.user.id
        })
    }

    setGender = event => {
        console.log(event.target.value);
        var bool = event.target.value;
        console.log(bool);
        if(bool === 'True') {
        API.updateReminder(this.state.id, bool)
        .then(res => {
            console.log(res.data);
        })
        .catch(err => alert(err));
    }else {
        console.log(false);
    }
    };

    handleGoToProfile = event => {
        event.preventDefault()
        this.props.history.replace(`/profile/${this.props.user.id}`);
    }

    handleFormSubmit = event => {
        event.preventDefault();
        console.log(this.state.id);
        API.addJourney(this.state.journeyName, this.state.journeySummary, this.state.completeBy, this.props.user.email, this.state.id)
            .then(res => {
                console.log(res.data);
                // once the user has signed up
                // send them to the login page
                alert("Journey Added!");
                this.refs.form.reset();
            })
            .catch(err => alert(err));
    };


    render() {
        return (
            <div className="bodyContainer">
            <div className="form-group row justify-content-center">
                <div className="col-md-6">
                <h1>Add a Journey!</h1>
                <form onSubmit={this.handleFormSubmit} ref='form'>
                    <div className="form-group">
                        <label htmlFor="firstStep">Journey Name:</label>
                        <input className="form-control"
                            placeholder="Journey Name"
                            name="journeyName"
                            type="text"
                            id="journeyName"
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
                    <div className="form-group">
                        <label htmlFor="journeySummary">Journey Summary:</label>
                        <textarea className="form-control"
                            placeholder="Journey Summary"
                            name="journeySummary"
                            type="text"
                            id="journeySummary"
                            onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="reminder">Would You Like to Receive Email Reminders?:</label>
                        {/* <input className="form-control" type="radio" name="gender" value="male" /> Male<br></br>
                        <input className="form-control" type="radio" name="gender" value="female" checked /> Female<br/> */}
                        <div onChange={this.setGender.bind(this)}>
                            <input className="trueRadio" type="radio" value="True" name="reminder"/> Yes
                            <input className="falseRadio" type="radio" value="False" name="reminder"/> No
                        </div>
                        {/* <input className="form-control"
                            
                            name="completeBy"
                            type="date"
                            id="completeBy"
                            onChange={this.handleChange} /> */}
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                <button className="btn btn-primary" onClick={this.handleGoToProfile}>Go to profile</button>
                {/* <Footer /> */}
                </div>
                </div>
            </div>
        )
    }
}

export default withAuth(Journey);
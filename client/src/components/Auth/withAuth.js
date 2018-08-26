import React, { Component } from 'react';
import AuthService from '../Auth/AuthService';
import API from '../../utils/API';

export default function withAuth(AuthComponent) {
    const Auth = new AuthService();
    return class AuthWrapped extends Component {
        constructor() {
            super();
            this.state = {
                user: null,
                journeyArray: [],
                journeyIds: []
            };
        }
        componentWillMount() {
            if (!Auth.loggedIn()) {
                this.props.history.replace('/signup');
            }
            else {
                try {
                    const profile = Auth.getProfile();
                    this.setState({
                        user: profile
                    });
                }
                catch(err){
                    Auth.logout();
                    this.props.history.replace('/signup');
                }
            }
}

componentDidMount() {
    if (Auth.loggedIn()) {
        API.getUser(this.state.user.id).then(res => {
            console.log(res)
            const newArr = [];
            const idArr = [];
            for (let i = 0; i < res.data.journeys.length; i++) {
                newArr.push(res.data.journeys[i].journeyName)
                idArr.push(res.data.journeys[i]._id)
            }
            this.setState({ 
                journeyArray: newArr,
                journeyIds: idArr
            })
        })
}
}



        render() {
            if (this.state.user) {
                return (
                    <AuthComponent history={this.props.history} user={this.state.user} journeyArray={this.state.journeyArray} journeyIds={this.state.journeyIds}/>
                );
            }
            else {
                return null;
            }
        }
    };
}


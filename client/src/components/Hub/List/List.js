import React, { Component } from 'react';
import API from '../../../utils/API';
// eslint-disable-next-line
import AuthService from '../../Auth/AuthService';
import withAuth from '../../Auth/withAuth';


class List extends Component {
    state = {
        journeyArray: []
    }
    componentWillMount() {
        API.getUser(this.props.user.id).then(res => {
            console.log(res)
            const newArr = []
            for (let i = 0; i < res.data.journeys.length; i++) {
                newArr.push(res.data.journeys[i].journeyName)
            }
            this.setState({ journeyArray: newArr })
        })
    }
    listJourneys = () => {
        this.journeyArray.map((journey) =>
            <li>{journey}</li>
        )
    }
    render() {
        return (
            <div className="container list">
                <div className="container listItems">
                    <ul>
                        {this.state.journeyArray.map(journey => <li>{journey}</li>)}
                    </ul>
                </div>
            </div>
        )
    }
}
export default withAuth(List); 


import React, { Component } from 'react';
import API from '../../../utils/API';
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
           for (let i = 0; i < res.data.goals.length; i++) {
               newArr.push(res.data.goals[i].journeyName)
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
               <div classname="container listItems">
                   <ul>
                       {this.state.journeyArray.map(journey => <li>{journey}</li>)}
                   </ul>
               </div>
            </div>
       )
    }
}
export default withAuth(List); 


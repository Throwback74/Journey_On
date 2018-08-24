import React, { Component } from 'react';

class List extends Component {


    render() {
        console.log(this.props.journeys)
        return (
            <div className="container list">
                <div classname="container listItems">
                    <ul>
                        {!this.props.journeys ? <div>Loading...</div> : this.props.journeys.map(journey => <li value={journey.id} onClick={this.props.getJourneyInfo}>{journey.journeyName}</li>)}
                    </ul>
                </div>
            </div>

        )
    }
}
export default List;
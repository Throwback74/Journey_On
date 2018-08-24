import React, { Component } from 'react';
import './Kanban.css';
import './PromptModal'
import { Board } from 'react-trello';
import PromptModal from './PromptModal';
import API from '../../../utils/API';
import AuthService from '../../Auth/AuthService';
import withAuth from '../../Auth/withAuth';

const data = require('./kanban_demo.json') // require DB collection instead

const handleDragStart = (cardId, laneId) => {
    console.log('drag started')
    console.log(`cardId: ${cardId}`)
    console.log(`laneId: ${laneId}`)
}

const handleDragEnd = (card, cardId, sourceLaneId, targetLaneId) => {
    console.log('drag ended');
    console.log(`cardId: ${cardId}`);
    console.log(`sourceLaneId: ${sourceLaneId}`);
    console.log(`targetLaneId: ${targetLaneId}`);
    // set card.id to targetLaneId
    // update in database
};

class Kanban extends Component {

    constructor() {
        super();
        this.state = { 
            boardData: { lanes: [] },
            id: "",
            journeyName: ""
         }
        this.Auth = new AuthService();
    };

    setEventBus = eventBus => {
        this.setState({ eventBus })
    };

    async componentWillMount() {
        const response = await this.getBoard();
        this.setState(
            { boardData: response }
        )
        console.log(this.props);
        API.getUser(this.props.user.id).then(res => {
            console.log(res)
            this.setState({
                id: this.props.user.id,
                journeyName: res.data.goals[0].journeyName
            })
        })


        // API.getCards().then(function (res) {
        //     res.data.map(card => {
        //         return lanes[0].cards.push(card)
        //     })
        //     this.setState({ boardData: lanes })
        // })

    };

    getBoard() {
        return new Promise(resolve => {
            resolve(data);
        });
    };

    // completeCard = () => {
    //     this.state.eventBus.publish({
    //         type: 'ADD_CARD',
    //         laneId: 'COMPLETED',
    //         card: { id: 'Milk', title: 'Buy Milk', label: '15 mins', description: 'Use Headspace app' }
    //     })
    //     this.state.eventBus.publish({ type: 'REMOVE_CARD', laneId: 'PLANNED', cardId: 'Milk' })
    // }

    // addCard = () => {
    //     this.state.eventBus.publish({
    //         type: 'ADD_CARD',
    //         laneId: 'BLOCKED',
    //         card: { id: 'Ec2Error', title: 'EC2 Instance Down', label: '30 mins', description: 'Main EC2 instance down' }
    //     })
    // }

    shouldReceiveNewData = nextData => {
        console.log('New card has been added');
        console.log(nextData);
    };

    handleCardAdd = (card, laneId) => {
        console.log(`New card added to lane ${laneId}`);
        card.id = laneId;
        console.dir(card);
        // When new card is added on trello board, add card to database
        API.addTask(card.title, card.description, card.id, this.props.user.email)
            .then(res => {
                console.log(res.data); // delete this later?
                alert("Task Added!"); // delete alert later?
            })
            .catch(err => alert(err));
    };

    render() {
        return (
            <div className="full-container">
                <div id="modal-root"><PromptModal /></div>
                <div className="whole-board">
                    <div className="Kanban-header text-center">
                        <h1><b>{this.state.journeyName}</b></h1>
                        <h3>Organization Board</h3>
                    </div>
                    <div className="Kanban-intro">
                        <Board className="Kanban-taskboard"
                            editable
                            onCardAdd={this.handleCardAdd}
                            data={this.state.boardData}
                            draggable
                            onDataChange={this.shouldReceiveNewData}
                            eventBusHandle={this.setEventBus}
                            handleDragStart={handleDragStart}
                            handleDragEnd={handleDragEnd}
                        />
                    </div>
                </div>
            </div>
        );
    };
};

export default Kanban;

// Create query to obtain data
// Update db when cards are moved

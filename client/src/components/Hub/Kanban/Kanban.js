import React, { Component } from 'react';
import './Kanban.css';
import './PromptModal'
import { Board } from 'react-trello';
import PromptModal from './PromptModal';
import API from '../../../utils/API';
import AuthService from '../../Auth/AuthService';
import withAuth from '../../Auth/withAuth';

const data = require('./kanban_demo2.json') // require DB collection instead
const newArr = []
const idArr = []
var journeyID;
// const data = require(db.userTasks.), then populate using userTasks data?

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
            journeyArray: [],
            journeyIds: []
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
            console.log("res data", res.data.tasks);
            
            for (let i = 0; i < res.data.journeys.length; i++) {
                newArr.push(res.data.journeys[i].journeyName)
                idArr.push(res.data.journeys[i]._id)
            }
            journeyID = res.data.journeys[0]._id;
            this.setState({ 
                journeyArray: newArr,
                journeyIds: idArr
            })
            return journeyID
        }).then(data => {
            console.log("data", data);
            this.populateTasks(data);
        })

                

        // API.getJourneyName(this.props.user.id).then(res => {
        //     console.log("getJourneyName", res);
        // });


        // API.getCards().then(function (res) {
        //     res.data.map(card => {
        //         return lanes[0].cards.push(card)
        //     })
        //     this.setState({ boardData: lanes })
        // })

    };

    populateTasks (journeyArray) {
        API.getTasks(journeyArray).then(res => {
            console.log("getTasksres", res);
        })
    }


    // componentDidMount () {
    //     API.getTasks(this.props.journeyArray[0]._id).then(res => {
    //         console.log("getTasksres", res);
    //     })
    //     // this.populateTasks(this.state.journeyArray[0].id);
    // }

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



    shouldReceiveNewData = (card) => {
        console.log('New card has been added');
        console.log(card); //nextData
        
    };

    handleCardAdd = (card, laneId) => {
        console.log(`New card added to lane ${laneId}`);
        card.id = laneId;
        console.dir(card);
        console.log(this.props.journey.id);
        // When new card is added on trello board, add card to database
        
        API.addTask(card.title, card.description, card.id, this.props.journey.id)
            .then(res => {
                console.log("Whats the journeyID?", this.props.journeyArray[0].id);
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
                        <h1><b>{this.props.journeyArray[0]}</b></h1>
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

export default withAuth(Kanban);
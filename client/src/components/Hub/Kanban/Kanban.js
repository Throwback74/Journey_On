import React, { Component } from 'react';
import './Kanban.css';
import './PromptModal'
import { Board } from 'react-trello';
import PromptModal from './PromptModal';
import API from '../../../utils/API';
import AuthService from '../../Auth/AuthService';
import withAuth from '../../Auth/withAuth';
//const db = require('../../../../../models');
// const data = require('./kanban_demo2.json') // require DB collection instead
const newArr = []
const idArr = []
var journeyID;
const cardsArr = [];
var tasksRes;
//const data = require(db.Task) //, then populate using userTasks data?
const data = {lanes: [
    {
        id: '1',
        title: "Todo - Later",
        label: "0/0",
        cards: []
    },
    {
        id: '2',
        title: "Todo - Next",
        label: "0/0",
        cards: []
    },
    {
        id: '3',
        title: "Todo - Soon",
        label: "0/0",
        cards: []
    },
    {
        id: '4',
        title: "In Progress",
        label: "0/0",
        cards: []
    },
    {
        id: '5',
        title: "Done",
        label: "0/0",
        cards: []
    }
] }


const handleDragStart = (cardId, laneId) => {
    console.log('drag started');
    console.log(`cardId: ${cardId}`);
    console.log(`laneId: ${laneId}`);
};

const handleDragEnd = (cardId, sourceLaneId, targetLaneId) => {
    console.log('drag ended');
    console.log(`cardId: ${cardId}`);
    console.log(`sourceLaneId: ${sourceLaneId}`);
    console.log(`targetLaneId: ${targetLaneId}`);
    // set card.id to targetLaneId
    // update in database
};

class Kanban extends Component {


    //TODO IF TIME CHOOSE LANE TO ADD TASK TO WITH DROP DOWN IN MODAL
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
        // console.log(this.props.journey.id);
        const response = await this.getBoard();
        this.setState({ boardData: response });

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
            // this.populateTasks(data);
        })
    };

        getBoard() {
            return new Promise(resolve => {
                resolve(data);
            });
        };
                
        updateBoard(updatedData) {
            return new Promise(resolve => {
                resolve(updatedData);
            });
        };
        // API.getJourneyName(this.props.user.id).then(res => {
        //     console.log("getJourneyName", res);
        // });


        // API.getCards().then(function (res) {
        //     res.data.map(card => {
        //         return lanes[0].cards.push(card)
        //     })
        //     this.setState({ boardData: lanes })
        // })

    

    componentDidMount() {
        API.populateAll(this.props.user.id).then(res => {
            console.log(res.data.journeys[0].tasks);
            tasksRes = res.data.journeys[0].tasks;
            cardsArr.push({
                id: toString(tasksRes.cardId), title: tasksRes.taskTitle, label: tasksRes.taskLabel, description: tasksRes.taskDescription
            })
            console.log(cardsArr);
            this.setState({
                boardData: this.state.boardData.lanes[0].cards.push(cardsArr)
            })
            
        }).catch(err => {
            console.log(err.response);
            alert(err)
        });
    }
//         card: { id: 'Milk', title: 'Buy Milk', label: '15 mins', description: 'Use Headspace app' }

    // populateTasks (journeyArray) {
    //     API.populateTasks(journeyID).then(res => {
    //         console.log("getTasksres", res);
    //     })
    // }


    // componentDidMount () {
    //     API.getTasks(this.props.journeyArray[0]._id).then(res => {
    //         console.log("getTasksres", res);
    //     })
    //     // this.populateTasks(this.state.journeyArray[0].id);
    // }



    // completeCard = () => {
    //     this.state.eventBus.publish({
    //         type: 'ADD_CARD',
    //         laneId: 'COMPLETED',
    //         card: { id: 'Milk', title: 'Buy Milk', label: '15 mins', description: 'Use Headspace app' }
    //     })
    //     this.state.eventBus.publish({ type: 'REMOVE_CARD', laneId: 'PLANNED', cardId: 'Milk' })
    // }

    addCard = () => {
        this.state.eventBus.publish({
            type: 'ADD_CARD',
            laneId: '1',
            card: cardsArr[0]
        })
        
    }



    shouldReceiveNewData = (card) => {
        console.log('New card has been added');
        console.log(card); //nextData
        console.log(card.id)
    };

    // handleCardAdd = (card, laneId) => {
    //     console.log(`New card added to lane ${laneId}`);
    //     card.id = laneId;
    //     console.dir(card);
    //     console.log(this.props.journey.id);
    //     // When new card is added on trello board, add card to database
    //     console.log("addtask card info ", card, card.title, card.description);
        
    //     // API.addTask(card.title, card.description, journeyID)
    //     //     .then(res => {
    //     //         console.log("Whats the journeyID?", this.props.journeyArray[0].id);
    //     //         console.log(res.data); // delete this later?
    //     //         alert("Task Added!"); // delete alert later?

    //     //     }).catch(err => {
    //     //         console.log(err.response);
    //     //         alert(err.response.data.message)
    //     //     });
    // };

	handleCardAdd = (card, laneId) => {
        console.log(`New card added to lane ${laneId}`)
        console.log(card);
        console.dir(card);
        console.log(this.state.boardData);
        API.addTask(card.title, card.description, card.label, card.id, journeyID).then(res => {
            console.log(res.data);
            data.lanes[0].cards.push(card);
            this.setState({
                boardData: data
            });
            this.updateBoard(this.state.boardData);
            alert("Task Added!");
        }).catch(err => {
            console.log(err, err.response);
            alert(err, err.response.data.message);
        });
	};
//{title: "zxcv", description: "vzcx", label: "vcx", id: "708bfde0-aa6d-11e8-a0c0-2b8d5aaba783"}
    render() {
        return (
            <div className="full-container">
                <div id="modal-root"><PromptModal journeyID={this.journeyID}/></div>
                <div className="whole-board">
                    <div className="Kanban-header text-center">
                        <h1><b>{this.props.journeyArray[0]}</b></h1>
                        <h3>Organization Board</h3>
                    </div>
                    <div className="Kanban-intro">
                        <Board className="Kanban-taskboard"
                            editable
                            onCardAdd={this.handleCardAdd}
                            data={data}
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

// Create query to obtain data
// Update db when cards are moved -- done
// How to display data on board
// task collection deleted but field still in user
// 

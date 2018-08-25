import React from 'react';
import Modal from 'react-modal';
import AuthService from '../../../Auth/AuthService';
import API from '../../../../utils/API';
import withAuth from '../../../Auth/withAuth';
import './PromptModal.css'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
// Modal.setAppElement(document.getElementById('#root'));

class PromptModal extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      taskTitle: "",
      taskDescription: "",
      taskLabel: "TODO"
    };

    this.Auth = new AuthService();
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };


  openModal = () => {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  }

  handleFormSubmit = event => {
    event.preventDefault();
    console.log("Helloo");
    API.addTask(this.state.taskTitle, this.state.taskDescription, this.state.taskLabel, this.props.user.email)
      .then(res => {
        console.log(res.data);
        // once the user has signed up
        // send them to the login page
        alert("Task Added!");
        // this.refs.form.reset();
      })
      .catch(err => alert(err));
  };

  render() {
    return (
      <div>
        <button onClick={this.openModal}>Open Modal</button>
        <Modal
          ariaHideApp={false}
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="text-center">
            <h2 ref={subtitle => this.subtitle = subtitle}>Get Started</h2>
            <b>Create a new task!</b><br></br>
            <form onSubmit={this.handleFormSubmit} id="task-form">
              {/* <input />
            <button>tab navigation</button>
            <button>stays</button>
            <button>inside</button>
            <button>the modal</button> */}
              Title:<br></br>
              <input
                type="text"
                name="taskTitle"
                id="taskTitle"
                value={this.state.taskTitle}
                onChange={this.handleChange}></input><br></br>
              Description:<br></br>
              <textarea
                rows="4"
                cols="20"
                name="taskDescription"
                id="taskDescription"
                form="task-form"
                value={this.state.taskDescription}
                onChange={this.handleChange}>
              </textarea><br></br>
              <input type="submit" value="Submit" id="submit-task-btn"></input>
            </form>
            <button onClick={this.closeModal}>close</button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default withAuth(PromptModal);
import React from 'react';
import Modal from 'react-modal';
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
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

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
            <form id="task-form">
              {/* <input />
            <button>tab navigation</button>
            <button>stays</button>
            <button>inside</button>
            <button>the modal</button> */}
              Title:<br></br>
              <input type="text" name="task-title" id="task-title"></input><br></br>
              Description:<br></br>
              <textarea rows="4" cols="20" name="task-description" id="task-descriptions" form="task-form"></textarea><br></br>
              <input type="submit" value="Submit" id="submit-task-btn"></input>
            </form>
            <button onClick={this.closeModal}>close</button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default PromptModal;
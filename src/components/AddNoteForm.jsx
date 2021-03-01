import { Component } from 'react';

export default class AddNoteForm extends Component {
  defaultState = {
    id: '0',
    content: ''
  }

  state = this.defaultState;

  inputChangeHandler(event) {
    this.setState({ ...this.state, [event.target.name]: event.target.value });
  }

  async formSubmitHandler(event) {
    event.preventDefault();

    const response = await fetch(process.env.REACT_APP_BACKEND_NOTES, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state)
    });
    if (response.status === 204) {
      this.props.updateNotes();
    }

    this.setState(this.defaultState);
  }

  render() {
    return (
      <form className="note-form" onSubmit={this.formSubmitHandler.bind(this)}>
        <div>
          <label className="note-form-label" htmlFor="noteContent">New note</label>
          <textarea
            className="note-form-input"
            name="content"
            id="noteContent"
            cols="30"
            rows="5"
            placeholder="Note content"
            onChange={this.inputChangeHandler.bind(this)}
            value={this.state.content}
          />
        </div>
        <button className="note-form-btn">Add note</button>
      </form>
    )
  }
}

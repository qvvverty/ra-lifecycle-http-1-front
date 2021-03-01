import { Component } from 'react';
import AddNoteForm from './AddNoteForm';
import Note from './Note';

export default class Notes extends Component {
  state = {
    notes: []
  }

  async updateNotes() {
    const response = await fetch(process.env.REACT_APP_BACKEND_NOTES);
    if (response.ok) {
      try {
        this.setState({ notes: await response.json() });
      } catch {
        console.error('Error parsing server response as JSON');
      }
    } else {
      console.error(`Request failed: ${response.status}`);
    }
  }

  async deleteNote(id) {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_NOTES}/${id}`, {
      method: 'DELETE',
    });
    if (response.status === 204) {
      const foundIndex = this.state.notes.findIndex(note => note.id === id);
      if (foundIndex > -1) {
        const newState = { ...this.state };
        newState.notes.splice(foundIndex, 1);
        this.setState(newState);
      }
    }
  }

  componentDidMount() {
    this.updateNotes();
  }

  render() {
    return (
      <div className="notes-wrapper">
        <div className="notes-header-container">
          <h3>Notes</h3>
          <div className="notes-refresh" onClick={this.updateNotes.bind(this)}>⟳</div>
        </div>
        <div className="notes-container">
          {this.state.notes.map(note =>
            <Note
              {...note}
              deleteNote={this.deleteNote.bind(this)}
              key={note.id}
            />
          )}
        </div>
        <AddNoteForm updateNotes={this.updateNotes.bind(this)} />
      </div>
    )
  }
}

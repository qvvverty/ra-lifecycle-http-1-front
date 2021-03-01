import { Component } from 'react'

export default class Note extends Component {
  deleteClickHandler() {
    this.props.deleteNote(this.props.id);
  }

  render() {
    return (
      <div className="note-container">
        <p>{this.props.content}</p>
        <div className="note-delete" onClick={this.deleteClickHandler.bind(this)}>✗</div>
      </div>
    )
  }
}

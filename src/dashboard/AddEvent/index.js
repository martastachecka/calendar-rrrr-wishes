import React, { Component } from 'react';
import moment from 'moment-timezone';
moment.tz.setDefault('Europe/Warsaw');

const defaultState = {
  event: {
    title: '',
    description: '',
    type: 'birthday',
  } 
};

class EventDetails extends Component {
  constructor(props) {
    super();
    this.state = defaultState;
  }

  handleChange = (field, value) => {
    this.setState({
      event: {
        ...this.state.event,
        [field]: value,
      },
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onAdd(this.state.event);
    this.setState(defaultState);
  }

  render() {
    return (
      <form
        className="event-details"
        onSubmit={this.handleSubmit}
      >
        <div className="form-row">
          <label htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={this.state.event.title}
            onChange={(e) => this.handleChange('title', e.target.value)}
          />
        </div>
        <div className="form-row">
          <label htmlFor="description">
            Description
          </label>
          <input
            type="text"
            id="description"
            value={this.state.event.description}
            onChange={(e) => this.handleChange('description', e.target.value)}
          />
        </div>
        <div className="form-row">
          <label htmlFor="type">
            Type
          </label>
          <select
            id="type"
            value={this.state.event.type}
            onChange={(e) => this.handleChange('type', e.target.value)}
          >
            <option value="birthday">Birthday</option>
            <option value="meeting">Meeting</option>
          </select>
        </div>
        <div className="form-row">
          <button type="submit">Add event</button>
        </div>
      </form>
    );
  }
}

export default EventDetails;

import React, { Component } from 'react';
import List from '../List';

class TodoApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
    };
  }

  render() {
    const { tasks } = this.state;
    return (
      <div>
        <List data={tasks} />
      </div>
    );
  }
}

export default TodoApp;

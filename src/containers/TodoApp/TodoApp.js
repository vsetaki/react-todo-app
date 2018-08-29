import React, { Component } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';
import TodoList from '../../components/TodoList';
import { read } from '../../api';

const styles = {
  wrapper: {
    width: 500,
    margin: '0 auto',
  },
};

class TodoApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      fetching: false,
    };
  }

  componentDidMount() {
    this.setState({ fetching: true });

    read().then(data => this.setState({
      data,
      fetching: false,
    }));
  }

  render() {
    const { data, fetching } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.wrapper}>
        { fetching && <LinearProgress /> }
        { Array.isArray(data) && <TodoList data={data} /> }
      </div>
    );
  }
}

export default withStyles(styles)(TodoApp);

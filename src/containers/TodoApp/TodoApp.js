import React, { Component } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TodoList from '../../components/TodoList';
import { read, deleteTask, update } from '../../api';
import TaskEditor from '../TaskEditor';

const styles = theme => ({
  wrapper: {
    width: 500,
    margin: '0 auto',
    padding: theme.spacing.unit * 2,
    boxShadow: theme.shadows[10],
    height: `calc(100vh - ${theme.spacing.unit * 5}px)`,
  },
});

class TodoApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      fetching: false,
    };

    this.loadTasks = this.loadTasks.bind(this);
    this.removeTask = this.removeTask.bind(this);
    this.checkTask = this.checkTask.bind(this);
  }

  componentDidMount() {
    this.loadTasks();
  }

  process(promise) {
    this.setState({ fetching: true });

    promise.then(data => this.setState({
      data,
      fetching: false,
    }));
  }

  loadTasks() {
    this.process(read());
  }

  removeTask(id) {
    this.process(deleteTask(id));
  }

  checkTask(id, checked) {
    const { data } = this.state;
    const checkedTask = data.find(item => item.id === id);
    this.process(update(id, { ...checkedTask, checked }));
  }

  render() {
    const { data, fetching } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.wrapper}>
        <Typography variant="headline">
          TODO app
        </Typography>
        { fetching && <LinearProgress /> }
        {
          Array.isArray(data) && (
            <TodoList data={data} onRemove={this.removeTask} onCheck={this.checkTask} />
          )
        }
        <TaskEditor onSubmit={this.loadTasks} />
      </div>
    );
  }
}

export default withStyles(styles)(TodoApp);

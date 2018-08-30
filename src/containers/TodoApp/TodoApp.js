import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import TodoList from '../../components/TodoList';
import { read, deleteTask, update } from '../../api';
import TaskEditor from '../TaskEditor';
import Progress from '../../ui/Progress/Progress';

const styles = theme => ({
  wrapper: {
    width: 500,
    margin: '0 auto',
    padding: theme.spacing.unit * 2,
  },
  divider: {
    margin: '20px 0',
  },
});

class TodoApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      fetching: false,
      editing: null,
    };

    this.loadTasks = this.loadTasks.bind(this);
    this.removeTask = this.removeTask.bind(this);
    this.checkTask = this.checkTask.bind(this);
    this.startEdit = this.startEdit.bind(this);
  }

  componentDidMount() {
    this.loadTasks();
  }

  get data() {
    const { data } = this.state;

    return data ? data.slice(0).reverse() : null;
  }

  process(promise) {
    this.setState({ fetching: true });

    promise.then(data => this.setState({
      data,
      fetching: false,
      editing: null,
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

  startEdit(id) {
    const { data } = this.state;
    const checkedTask = data.find(item => item.id === id);
    this.setState({ editing: checkedTask });
  }

  render() {
    const { fetching, editing } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.wrapper}>
        <Typography variant="headline">
          TODO app
        </Typography>
        <Progress spin={fetching} />
        <TaskEditor
          onSubmit={this.loadTasks}
          id={editing && editing.id}
          text={editing && editing.text}
          title={editing && editing.title}
        />
        <Divider className={classes.divider} />
        {
          Array.isArray(this.data) && (
            <React.Fragment>
              <Typography variant="title">
                Task list
              </Typography>
              <TodoList
                data={this.data}
                onRemove={this.removeTask}
                onCheck={this.checkTask}
                onEdit={this.startEdit}
              />
            </React.Fragment>
          )
        }
      </div>
    );
  }
}

TodoApp.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(TodoApp);

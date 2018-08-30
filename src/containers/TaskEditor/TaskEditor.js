import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { update, create } from '../../api';

class TaskEditor extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      fetching: false,
      error: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  get isAdd() {
    const { id } = this.props;
    return !id;
  }

  get isValid() {
    const { title } = this.state;
    return !!title;
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.id !== prevState.id) {
      return {
        id: nextProps.id,
        title: nextProps.title || '',
        text: nextProps.text || '',
      };
    }

    return null;
  }

  submit() {
    const { onSubmit } = this.props;

    this.validate()
      .then(() => {
        this.setState({ fetching: true });

        this.process()
          .then((data) => {
            this.setState({
              fetching: false,
              title: '',
              text: '',
              error: null,
            });
            onSubmit(data);
          });
      })
      .catch(error => this.setState({ error }));
  }

  /**
   * @returns {Promise}
   */
  process() {
    const { id } = this.props;
    const { title, text } = this.state;

    if (id) {
      return update(id, { title, text });
    }

    return create({ title, text });
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  validate() {
    const error = this.isValid ? null : 'Поле обязательно для заполения';

    return new Promise((resolve, reject) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  }

  render() {
    const {
      title, text, fetching, error,
    } = this.state;
    const buttonText = this.isAdd ? 'Add task' : 'Save';
    const buttonColor = this.isAdd ? 'primary' : 'default';

    return (
      <form noValidate autoComplete="off">
        <TextField
          id="title"
          label="Title"
          value={title}
          onChange={this.handleChange}
          margin="none"
          required
          error={!!error}
          helperText={error}
          fullWidth
        />
        <TextField
          id="text"
          label="Description"
          value={text}
          onChange={this.handleChange}
          margin="dense"
          fullWidth
        />
        <Button onClick={this.submit} variant="raised" disabled={fetching} color={buttonColor}>
          {buttonText}
        </Button>
      </form>
    );
  }
}

TaskEditor.defaultProps = {
  id: null,
  title: '',
  text: '',
};

TaskEditor.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string, //eslint-disable-line
  text: PropTypes.string, //eslint-disable-line
  onSubmit: PropTypes.func.isRequired,
};

export default TaskEditor;

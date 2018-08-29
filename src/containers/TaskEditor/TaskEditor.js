import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
// import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
// import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import { update, create } from '../../api';

const style = {
  textField: {

  },
};

class TaskEditor extends React.Component {
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
    const { text } = this.state;
    return !text;
  }

  // handleClick() {
  //   if (this.isValid()) {
  //     this.submit();
  //   } else {
  //     this.setState({ error: })
  //   }
  // }

  submit() {
    const { onSubmit } = this.props;

    this.validate().then(() => {
      this.setState({ fetching: true });

      this.process()
        .then((data) => {
          this.setState({
            fetching: false,
            text: '',
          });
          onSubmit(data);
        });
    });
  }

  /**
   * @returns {Promise}
   */
  process() {
    const { id } = this.props;
    const { text } = this.state;

    if (id) {
      return update(id, { text });
    }

    return create({ text });
  }

  handleChange(event) {
    this.setState({
      text: event.target.value,
    });
  }

  validate() {
    const error = this.isValid ? null : 'Поле обязательно для заполения';

    return new Promise((resolve) => {
      this.setState({ error }, resolve);
    });
  }

  render() {
    const { text, fetching, error } = this.state;
    const { classes } = this.props;
    const buttonText = this.isAdd ? 'Добавить' : 'Сохранить';

    return (
      <form noValidate autoComplete="off">
        <TextField
          id="text"
          label="Текст"
          className={classes.textField}
          value={text}
          onChange={this.handleChange}
          margin="normal"
          required
          error={error && this.isValid}
        />
        <Button onClick={this.submit} variant="raised" disabled={fetching} color="primary">
          {buttonText}
        </Button>
      </form>
    );
  }
}

TaskEditor.defaultProps = {
  id: null,
};

TaskEditor.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  id: PropTypes.string,
  onSubmit: PropTypes.func,
};

export default withStyles(style)(TaskEditor);

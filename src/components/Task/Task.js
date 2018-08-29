import React from 'react';
import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

const Task = ({ checked, text, onCheckChange }) => (
  <ListItem key={text} dense button>
    <ListItemText primary={text} />
    <ListItemSecondaryAction>
      <Checkbox
        onChange={onCheckChange}
        checked={checked}
      />
    </ListItemSecondaryAction>
  </ListItem>
);

Task.defaultProps = {
  checked: false,
  text: '',
};

Task.propTypes = {
  checked: PropTypes.bool,
  text: PropTypes.string,
  onCheckChange: PropTypes.func.isRequired,
};

export default Task;

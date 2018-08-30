import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

const Task = ({
  id, checked, title, text, onCheckChange, onItemClick, onClickRemove,
}) => (
  <ListItem key={text} dense button onClick={() => onItemClick(id)}>
    <ListItemText primary={title} secondary={text} />
    <ListItemSecondaryAction>
      <Button
        onClick={() => onClickRemove(id)}
        checked={checked}
      >
        <DeleteIcon />
      </Button>
      <Checkbox
        onChange={(event, isChecked) => onCheckChange(id, isChecked)}
        checked={checked}
      />
    </ListItemSecondaryAction>
  </ListItem>
);

Task.defaultProps = {
  checked: false,
  text: '',
  title: '',
};

Task.propTypes = {
  checked: PropTypes.bool,
  id: PropTypes.number.isRequired,
  title: PropTypes.string,
  text: PropTypes.string,
  onCheckChange: PropTypes.func.isRequired,
  onItemClick: PropTypes.func.isRequired,
  onClickRemove: PropTypes.func.isRequired,
};

export default Task;

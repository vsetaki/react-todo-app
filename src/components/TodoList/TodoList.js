import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Task from '../Task';

const TodoList = ({ data }) => (
  <React.Fragment>
    {
      data.length ? (
        <List>
          { data.map(({ id, text, checked }) => <Task key={id} text={text} checked={checked} />) }
        </List>
      ) : (
        <Typography>
          Список пуст
        </Typography>
      )
    }
  </React.Fragment>
);

TodoList.defaultProps = {
  data: [],
};

TodoList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    text: PropTypes.string,
    checked: PropTypes.bool,
  })),
};

export default TodoList;

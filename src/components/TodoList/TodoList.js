import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Task from '../Task';

const TodoList = ({
  data, onRemove, onCheck, onEdit,
}) => (
  <React.Fragment>
    {
      data.length ? (
        <List>
          { data.map(({ id, text, checked }) => (
            <Task
              key={id}
              id={id}
              text={text}
              checked={checked}
              onClickRemove={onRemove}
              onCheckChange={onCheck}
              onItemClick={onEdit}
            />
          )) }
        </List>
      ) : (
        <Typography variant="subheading">
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
  onRemove: PropTypes.func.isRequired,
  onCheck: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default TodoList;

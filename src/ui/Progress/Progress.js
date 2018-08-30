import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = {
  progress: {
    height: 5,
  },
};

const Progress = ({ spin, classes }) => (
  spin
    ? <LinearProgress />
    : <div className={classes.progress} />
);

Progress.defaultProps = {
  spin: false,
};

Progress.propTypes = {
  spin: PropTypes.bool,
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(Progress);

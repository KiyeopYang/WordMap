import React from 'react';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

const styles = {
  paper: {
    padding: '15px',
    marginBottom: '10px',
  },
};
class Wrapper extends React.Component {
  render() {
    const {
      classes,
      title,
      children,
    } = this.props;
    return (
      <Paper className={classes.paper}>
        <Typography type="title" align="left">
          { title }
        </Typography>
        <div>
          { children }
        </div>
      </Paper>
    );
  }
}
export default withStyles(styles)(Wrapper);

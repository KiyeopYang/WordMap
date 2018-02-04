import React from 'react';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import prefixer from '../../../../../../modules/prefixer';

const styles = prefixer({
  wrapper: {
    width: '100%',
    paddingTop: '5vh',
  },
  body: {
    background: 'white',
    margin: 'auto',
    width: 'cal(100% - 6vw)',
    maxWidth: '600px',
    padding: '30px 3vw',
  },
});
class Body extends React.Component {
  render() {
    const { classes, children } = this.props;
    return (
      <div className={classes.wrapper}>
        <Paper className={classes.body}>
          { children }
        </Paper>
      </div>
    )
  }
}
export default withStyles(styles)(Body);

import React from 'react';
import { withStyles } from 'material-ui/styles';
const styles = {
  background: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
};
class Background extends React.Component {
  render() {
    const {
      classes,
      children,
    } = this.props;
    return (
      <div className={classes.background}>
        {children}
      </div>
    )
  }
}
export default withStyles(styles)(Background);

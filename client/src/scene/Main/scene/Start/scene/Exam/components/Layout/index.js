import React from 'react';
import { withStyles } from 'material-ui/styles';

const styles = {
  layout: {
    width: '100%',
    maxWidth: '450px',
  },
};
class Layout extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.layout}>
        { this.props.children }
      </div>
    );
  }
}
export default withStyles(styles)(Layout);

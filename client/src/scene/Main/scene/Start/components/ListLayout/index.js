import React from 'react';
import { withStyles } from 'material-ui/styles';

const styles = {
  layout: {
    width: '100%',
    maxWidth: '500px',
    textAlign: 'center',
  },
};
function ListLayout(props) {
  const { classes, children } = props;
  return (
    <div className={classes.layout}>
      {children}
    </div>
  );
}
export default withStyles(styles)(ListLayout);

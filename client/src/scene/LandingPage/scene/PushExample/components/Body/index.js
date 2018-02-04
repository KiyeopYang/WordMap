import React from 'react';
import { withStyles } from 'material-ui/styles';
import prefixer from '../../../../../../modules/prefixer';

const styles = theme => prefixer({
  body: {
    width: '100%',
    margin: 'auto',
    textAlign: 'center',
  },
});
class Body extends React.Component {
  render() {
    const { classes, children } = this.props;
    return (
      <div className={classes.body}>
        { children }
      </div>
    )
  }
}
export default withStyles(styles, { withTheme: true })(Body);

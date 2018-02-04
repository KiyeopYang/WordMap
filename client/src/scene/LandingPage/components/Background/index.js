import React from 'react';
import { withStyles } from 'material-ui/styles';
import prefixer from '../../../../modules/prefixer';

const styles = theme => prefixer({
  background: {
    background: theme.palette.primary.main,
    height: 'auto',
    minHeight: 'calc(100vh - (64px + 20px + 52px))',
    padding: '64px 0px 0px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
class Body extends React.Component{
  render() {
    const { classes, children, style } = this.props;
    return (
      <div
        className={classes.background}
        style={style}
      >
        {children}
      </div>
    );
  }
}
export default withStyles(styles, { withTheme: true })(Body);

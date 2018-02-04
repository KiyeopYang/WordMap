import React from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import prefixer from '../../../../modules/prefixer';

const styles = theme => prefixer({
  background: {
    background: 'midnightblue',
    width: '100%',
    padding: '10px 0px 10px',
  },
});
class Body extends React.Component{
  render() {
    const { classes }  = this.props;
    return (
      <div className={classes.background}>
        <Typography
          type="headline"
          align="center"
          style={{ color: 'white' }}
        >
          WEBPUSH
        </Typography>
        <Typography
          align="center"
          style={{ color: 'white' }}
        >
          webpushkr@gmail.com
        </Typography>
      </div>
    );
  }
}
export default withStyles(styles, { withTheme: true })(Body);

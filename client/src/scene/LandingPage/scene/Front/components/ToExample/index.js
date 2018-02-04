import React from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import prefixer from '../../../../../../modules/prefixer';

const styles = prefixer({
  container: {
    textAlign: 'center',
    margin: '24px',
  },
  button: {
    borderRadius: 0,
  },
});

class ToExample extends React.Component{
  render() {
    const { classes, } = this.props;
    return (
      <div className={classes.container}>
        <Button
          raised
          color="secondary"
          className={classes.webPushOpen}
          onClick={this.props.openWebPush}
        >
          웹 푸시 체험하기
        </Button>
      </div>
    );
  }
}
export default withStyles(styles)(ToExample);

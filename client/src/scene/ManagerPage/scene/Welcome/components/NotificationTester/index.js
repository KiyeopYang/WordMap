import React from 'react';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

const styles = {
  buttonWrapper: {
    textAlign: 'center',
    marginTop: '20px',
  },
  button: {
    margin: 'auto',
  },
  tester: {
    marginTop: 5,
  },
};
class NotificationTester extends React.Component {
  render() {
    const {
      classes,
      handleTest,
    } = this.props;
    return (
      <div className={classes.buttonWrapper}>
        <Button
          className={classes.button}
          raised
          color="primary"
          onClick={handleTest}
        >
          전송 테스트
        </Button>
        <Typography
          className={classes.tester}
          type="caption"
        >
          최대 약 10초 정도 소요됩니다.
        </Typography>
      </div>
    );
  }
}
export default withStyles(styles)(NotificationTester);

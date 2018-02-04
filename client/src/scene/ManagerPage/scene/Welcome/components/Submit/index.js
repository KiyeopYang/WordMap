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
class Submit extends React.Component {
  render() {
    const {
      classes,
      onClick,
    } = this.props;
    return (
      <div className={classes.buttonWrapper}>
        <Button
          raised
          color="primary"
          onClick={onClick}
        >
          적용하기
        </Button>
      </div>
    );
  }
}
export default withStyles(styles)(Submit);

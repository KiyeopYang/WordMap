import React from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

const styles = {
  wrapper: {
    width: '100%',
  },
  button: {
    borderRadius: 0,
  },
};
class Buttons extends React.Component {
  render() {
    const {
      classes,
      handleClick,
    } = this.props;
    return (
      <div className={classes.wrapper}>
        <Button
          className={classes.button}
          color="primary"
          onClick={() => handleClick('cancel')}
          fullWidth
        >
          뒤로가기
        </Button>
      </div>
    );
  }
}
export default withStyles(styles)(Buttons);

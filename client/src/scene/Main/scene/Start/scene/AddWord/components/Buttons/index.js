import React from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

const styles = {
  wrapper: {
    width: '100%',
  },
  button: {
    borderRadius: 0,
    width: '50%',
  },
};
class Buttons extends React.Component {
  render() {
    const {
      classes,
      handleClick,
      disableAdd,
    } = this.props;
    return (
      <div className={classes.wrapper}>
        <Button
          className={classes.button}
          color="primary"
          onClick={() => handleClick('cancel')}
        >
          취소
        </Button>
        <Button
          className={classes.button}
          color="primary"
          raised
          onClick={() => handleClick('add')}
          disabled={disableAdd}
        >
          추가
        </Button>
      </div>
    );
  }
}
export default withStyles(styles)(Buttons);

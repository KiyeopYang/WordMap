import React from 'react';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import {
  FormControlLabel,
  FormHelperText,
  FormGroup,
} from 'material-ui/Form';
import Switch from 'material-ui/Switch';

const styles = {
  center: {
    textAlign: 'center',
  },
};
class Setting extends React.Component {
  render() {
    const {
      classes,
      onChangeWelcome,
      isUsingWelcome,
    } = this.props;
    return (
      <div className={classes.center}>
        <FormControlLabel
          control={
            <Switch
              checked={isUsingWelcome}
              onChange={onChangeWelcome}
            />
          }
          label="웰컴 알림 사용하기"
        />
        <Typography type="caption" align="center">
          웰컴 알림은 구독 직후에 전송되는 알림입니다.
        </Typography>
      </div>
    )
  }
}
export default withStyles(styles)(Setting);

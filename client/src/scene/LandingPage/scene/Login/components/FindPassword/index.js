import React from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import prefixer from '../../../../../../modules/prefixer';

const styles = theme => prefixer({
  forms: {
    width: '100%',
  },
  findPwd: {
    marginBottom: '1em',
  },
});
class FindPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
  }
  handleInputChange = (prop) => {
    return (e) => {
      this.setState({
        [prop]: e.target.value,
      })
    }
  };
  render() {
    const {
      classes,
      handleFindPassword,
      goBack
    } = this.props;
    return (
      <React.Fragment>
        <Typography type="headline">
          비밀번호 찾기
        </Typography>
        <form>
          <TextField
            className={classes.forms}
            id="emailForm"
            label="이메일"
            type="email"
            margin="normal"
            value={this.state.email}
            onChange={this.handleInputChange('email')}
          />
          <Typography
            className={classes.findPwd}
            align="right"
          >
            이메일을 입력하여 주십시요.
          </Typography>
          <Button
            type="submit"
            className={classes.forms}
            color="primary"
            raised
            onClick={(e) => {
              e.preventDefault();
              handleFindPassword(this.state.email);
            }}
            disabled={!this.state.email.length}
          >
            확인
          </Button>
          <Button
            className={classes.forms}
            color="primary"
            onClick={(e) => {
              e.preventDefault();
              goBack();
            }}
          >
            뒤로가기
          </Button>
        </form>
      </React.Fragment>
    )
  }
}
export default withStyles(styles, { withTheme: true })(FindPassword);

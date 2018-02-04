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
});
class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
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
      onSelectFindPassword,
    } = this.props;
    return (
      <React.Fragment>
        <Typography type="headline">
          로그인
        </Typography>
        <form>
          <TextField
            className={classes.forms}
            id="email"
            label="이메일"
            type="email"
            margin="normal"
            value={this.state.email}
            onChange={this.handleInputChange('email')}
          />
          <TextField
            className={classes.forms}
            id="password"
            label="비밀번호"
            margin="normal"
            type="password"
            value={this.state.password}
            onChange={this.handleInputChange('password')}
          />
          <Typography
            className={classes.findPwd}
            align="right"
          >
            <Button
              onClick={onSelectFindPassword}
            >
              비밀번호 찾기
            </Button>
          </Typography>
          <Button
            type="submit"
            className={classes.forms}
            color="primary"
            raised
            onClick={(e) => {
              e.preventDefault();
              console.log('submit')
            }}
            disabled={!this.state.email.length || !this.state.password.length}
          >
            확인
          </Button>
        </form>
      </React.Fragment>
    )
  }
}
export default withStyles(styles, { withTheme: true })(LoginForm);

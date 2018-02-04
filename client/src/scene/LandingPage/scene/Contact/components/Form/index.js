import React from 'react';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import { CircularProgress } from 'material-ui/Progress';
import green from 'material-ui/colors/green';
import red from 'material-ui/colors/red';
import prefixer from '../../../../../../modules/prefixer';

const styles = theme => prefixer({
  forms: {
    width: '100%',
  },
  buttonWrapper: {
    position: 'relative',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  buttonFailure: {
    backgroundColor: red[500],
    '&:hover': {
      backgroundColor: red[700],
    },
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
});
class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      phone: '',
      text: '',
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
      classes, loading, handleSubmit, status,
    } = this.props;
    const buttonClassname = classNames({
      [classes.buttonSuccess]: status === 'success',
      [classes.buttonFailure]: status === 'failure',
    });
    return (
      <React.Fragment>
        <Typography
          type="headline"
        >
          문의하기
        </Typography>
        <form>
          <TextField
            className={classes.forms}
            id="email"
            label="이메일"
            type="email"
            value={this.state.email}
            onChange={this.handleInputChange('email')}
            margin="dense"
          />
          <TextField
            className={classes.forms}
            id="phone"
            label="전화번호"
            type="text"
            value={this.state.phone}
            onChange={this.handleInputChange('phone')}
            margin="dense"
          />
          <TextField
            id="text"
            label="내용"
            multiline
            fullWidth
            value={this.state.text}
            onChange={this.handleInputChange('text')}
            margin="dense"
          />
          <Typography gutterBottom>
            문의 : webpushkr@gmail.com
          </Typography>
          <div
            className={classes.buttonWrapper}
          >
            <Button
              type="submit"
              className={buttonClassname}
              color="primary"
              fullWidth
              raised
              onClick={(e) => {
                e.preventDefault();
                handleSubmit(this.state);
              }}
              disabled={
                loading ||
                !this.state.text.length || (
                  !this.state.email.length && !this.state.phone.length
                )
              }
            >
              {
                status === 'success' ? '전송 성공, 다시 보내기' :
                  status === 'failure' ? '전송 실패, 다시 보내기' : '보내기'
              }
            </Button>
            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
          </div>
        </form>
      </React.Fragment>
    )
  }
}
export default withStyles(styles, { withTheme: true })(LoginForm);

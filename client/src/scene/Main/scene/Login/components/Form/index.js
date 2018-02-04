import React from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

const styles = {
  form: {
    width: '100%',
    maxWidth: 400,
  },
};
class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
    };
  }
  handlePhone = (e) => {
    this.setState({
      phone: e.target.value,
    })
  };
  render() {
    const {
      classes,
      handleFormSubmit,
    } = this.props;
    const {
      phone,
    } = this.state;
    return (
      <div className={classes.form}>
        <Typography
          type="headline"
          align="center"
          gutterBottom
        >
          전화번호 입력
        </Typography>
        <TextField
          value={phone}
          onChange={this.handlePhone}
          fullWidth
          margin="normal"
        />
        <Button
          fullWidth
          color="primary"
          raised
          onClick={() => handleFormSubmit(phone)}
          disabled={phone.length < 1}
        >
          확인
        </Button>
      </div>
    )
  }
}
export default withStyles(styles)(Form);

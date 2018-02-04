import React from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});
class OptionMaker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      addMode: false,
    };
    this.handleInsert = this.handleInsert.bind(this);
  }
  handleInsert() {
    this.props.handleInsert(this.state.input);
    this.setState({
      input: '',
      addMode: false,
    });
  }
  render() {
    const { classes } = this.props;
    const { input, addMode } = this.state;
    if (addMode) {
      return (
        <div>
          <TextField
            error={input === ''}
            label="옵션 이름"
            value={input}
            onChange={e => this.setState({
              input: e.target.value,
            })}
          />
          <Button
            color="primary"
            onClick={this.handleInsert}
          >
            확인
          </Button>
          <Button
            color="primary"
            onClick={() => this.setState({ addMode: false })}
          >
            취소
          </Button>
        </div>
      );
    }
    return (
      <div>
        <Button
          color="primary"
          raised
          onClick={() => this.setState({ addMode: true })}
          className={classes.button}
        >
          옵션 추가
        </Button>
      </div>
    );
  }
}
export default withStyles(styles)(OptionMaker);

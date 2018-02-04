import React from 'react';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});

class Adder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      price: 0,
    };
    this.handleInput = this.handleInput.bind(this);
  }
  handleInput(name) {
    return e => this.setState({ [name]: e.target.value });
  }
  render() {
    const { classes, handleAdd } = this.props;
    return (
      <div>
        <TextField
          label="이름"
          className={classes.textField}
          helperText="옵션 이름"
          margin="normal"
          value={this.state.name}
          onChange={this.handleInput('name')}
        />
        <TextField
          label="가격"
          defaultValue="0"
          type="number"
          className={classes.textField}
          helperText="옵션 가격"
          margin="normal"
          value={this.state.price}
          onChange={this.handleInput('price')}
        />
        <Button
          color="primary"
          className={classes.button}
          onClick={() => handleAdd(this.state)}
        >
          추가
        </Button>
      </div>
    );
  }
}
export default withStyles(styles)(Adder);

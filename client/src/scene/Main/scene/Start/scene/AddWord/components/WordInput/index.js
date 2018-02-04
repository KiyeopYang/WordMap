import React from 'react';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import keyCode from 'keycode';

const styles = {
  input: {
    maxWidth: '400px',
    width: '100%',
  },
};
const WORD_INPUT_LABEL = '단어를 입력하여 주십시요.';
const MEANING_INPUT_LABEL = '뜻을 입력하여 주십시요.';
class WordInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddingMeaning: false,
    };
  }
  componentDidMount() {
    this.addingKeyCode();
  }
  componentWillUnmount() {
    this.input.removeEventListener('keydown', this.addingKeyCodeEvent);
  }
  addingKeyCodeEvent = (e) => {
    if (keyCode(e) === 'enter' && !this.props.inputError) {
      const {
        isAddingMeaning,
      } = this.state;
      const {
        inputWord,
        inputMeaning,
      } = this.props;
      if (isAddingMeaning && inputMeaning.length > 0) {
        this.props.add();//
        this.setState({
          isAddingMeaning: false,
        });
      } else if (inputWord.length > 0) {
        this.setState({
          isAddingMeaning: true,
        });
      }
    }
  };
  addingKeyCode = () => {
    this.input.addEventListener('keydown', this.addingKeyCodeEvent);
  };
  render() {
    const {
      classes,
      inputWord,
      inputMeaning,
      onInputChange,
      inputError,
    } = this.props;
    const {
      isAddingMeaning,
    } = this.state;
    return (
      <TextField
        className={classes.input}
        inputRef={ref => this.input = ref}
        label={inputError ? '같은 단어가 있습니다.' : isAddingMeaning ?
          MEANING_INPUT_LABEL:WORD_INPUT_LABEL}
        value={isAddingMeaning ?
          inputMeaning:inputWord
        }
        helperText={isAddingMeaning ?
          inputWord:'입력 후 엔터를 클릭해주세요.'
        }
        onChange={(e) => {
          onInputChange(e, isAddingMeaning ? 'meaning':'word');
        }}
        error={inputError}
        margin="normal"
      />
    )
  }
}
export default withStyles(styles)(WordInput);

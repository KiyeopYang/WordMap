import React from 'react';
import Button from 'material-ui/Button';

class Game extends React.Component {
  render() {
    const { handleClick, disabled } = this.props;
    return (
      <div>
        <Button
          disabled={disabled}
          color="primary"
          raised
          fullWidth
          size="large"
          onClick={() => handleClick('exam')}
        >
          단어 시험 시작하기
        </Button>
      </div>
    )
  }
}
export default Game;

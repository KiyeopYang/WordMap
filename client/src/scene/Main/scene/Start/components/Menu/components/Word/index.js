import React from 'react';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

class Word extends React.Component {
  render() {
    const {
      length,
      handleClick,
    } = this.props;
    return (
      <div>
        <Typography align="center">
        { `${length}개의 단어` }
        </Typography>
        <Button
          color="primary"
          onClick={() => handleClick('wordList')}
        >
          단어 보기
        </Button>
        <Button
          color="primary"
          onClick={() => handleClick('addWord')}
        >
          단어 추가
        </Button>
      </div>
    )
  }
}
export default Word;

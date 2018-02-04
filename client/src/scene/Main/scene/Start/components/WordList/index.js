import React from 'react';
import { withStyles } from 'material-ui/styles';
import List from 'material-ui/List';
import Word from './components/Word';

const styles = {
  list: {
    width: '100%',
    height: '325px',
    overflowY: 'scroll',
  },
};
class WordList extends React.Component {
  componentDidUpdate() {
    const list = document.getElementById('list');
    list.scrollTop = list.scrollHeight;
  }
  render() {
    const {
      classes,
      wordList,
      removeWord,
    } = this.props;
    return (
      <List
        id="list"
        className={classes.list}
      >
        {
          wordList.map((word, i) => (
            <Word
              key={`${word.word}${i}`}
              word={word.word}
              meaning={word.meaning}
              remove={
                removeWord ?
                  () => removeWord(word.word) : null}
            />
          ))
        }
      </List>
    )
  }
}
export default withStyles(styles)(WordList);

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  withRouter,
} from 'react-router-dom';
import { push } from 'react-router-redux';
import loader from '../../../../../../data/loader/actions';
import * as noticeDialogActions from '../../../../../../data/noticeDialog/actions';
import * as addWordActions from './data/addWord/actions';
import * as wordLengthActions from '../../data/wordLength/actions';
import WordList from '../../components/WordList';
import WordInput from './components/WordInput';
import Layout from '../../components/ListLayout';
import Buttons from './components/Buttons';

class AddWord extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wordList: [],
      inputWord: '',
      inputMeaning: '',
      inputError: false,
    };
  }
  onInputChange = (e, prop) => {
    const { value } = e.target;
    if (prop === 'word') {
      let foundI = this.state.wordList.findIndex(o => o.word === value);
      if (foundI > 0) {
        this.setState({
          inputWord: value,
          inputError: true,
        });
      } else {
        this.setState({
          inputWord: value,
          inputError: false,
        });
      }
    } else {
      this.setState({
        inputMeaning: value,
      });
    }
  };
  addToWordList = () => {
    const {
      wordList,
      inputWord,
      inputMeaning,
    } = this.state;
    this.setState({
      wordList: wordList.concat({
        word: inputWord,
        meaning: inputMeaning,
      }),
      inputWord: '',
      inputMeaning: '',
      inputError: false,
    });
  };
  handleUploadWordList = (wordList) => {
    this.props.loader(true);
    this.props.addWordRequest(wordList)
      .then(() => {
        this.props.loader(false);
        const { addWord } = this.props;
        if (addWord.status === 'SUCCESS') {
          this.props.notice('추가되었습니다.');
          this.props.wordLengthRequest();
          this.props.history.goBack();
        } else {
          throw addWord.error;
        }
      })
      .catch((error) => {
        this.props.loader(false);
        this.props.notice(error);
      });
  };
  removeWord = (word) => {
    const { wordList } = this.state;
    this.setState({
      wordList: wordList.filter(o => o.word !== word),
    });
  };
  handleButtonsClick = (clicked) => {
    switch (clicked) {
      case 'cancel':
        this.props.history.goBack();
        break;
      case 'add':
        this.handleUploadWordList(this.state.wordList);
        break;
    }
  };
  render() {
    const {
      wordList,
      inputWord,
      inputMeaning,
      inputError,
    } = this.state;
    return (
      <Layout>
        <WordList
          uploadList={this.handleUploadWordList}
          wordList={wordList}
          removeWord={this.removeWord}
        />
        <WordInput
          add={this.addToWordList}
          inputWord={inputWord}
          inputMeaning={inputMeaning}
          onInputChange={this.onInputChange}
          inputError={inputError}
        />
        <Buttons
          handleClick={this.handleButtonsClick}
          disableAdd={wordList.length < 1}
        />
      </Layout>
    );
  }
}
const mapStateToProps = state => ({
  addWord: state.main.start.addWord.data.addWord,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: path => push(path),
  notice: noticeDialogActions.on,
  loader,
  addWordRequest: addWordActions.request,
  wordLengthRequest: wordLengthActions.request,
}, dispatch);
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddWord));

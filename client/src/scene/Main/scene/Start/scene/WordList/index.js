import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  withRouter,
} from 'react-router-dom';
import { push } from 'react-router-redux';
import loader from '../../../../../../data/loader/actions';
import * as noticeDialogActions from '../../../../../../data/noticeDialog/actions';
import * as wordListActions from './data/wordList/actions';
import Words from '../../components/WordList';
import Layout from '../../components/ListLayout';
import Buttons from './components/Buttons';
import WordLen from './components/WordLen';

class WordList extends React.Component {
  constructor(props) {
    super(props);
    this.wordListRequest();
  }
  wordListRequest = () => {
    this.props.wordListRequest()
      .then(() => {
        this.props.loader(false);
        const { wordList } = this.props;
        if (wordList.status === 'SUCCESS') {
        } else {
          throw wordList.error;
        }
      })
      .catch((error) => {
        this.props.loader(false);
        this.props.notice(error);
      });
  };
  handleButtonsClick = (clicked) => {
    switch (clicked) {
      case 'cancel':
        this.props.history.goBack();
        break;
      default:
        break;
    }
  };
  render() {
    const {
      list,
    } = this.props.wordList;
    return (
      <Layout>
        <WordLen length={list.length}/>
        <Words wordList={list}/>
        <Buttons
          handleClick={this.handleButtonsClick}
        />
      </Layout>
    );
  }
}
const mapStateToProps = state => ({
  wordList: state.main.start.wordList.data.wordList,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: path => push(path),
  notice: noticeDialogActions.on,
  loader,
  wordListRequest: wordListActions.request,
}, dispatch);
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(WordList));

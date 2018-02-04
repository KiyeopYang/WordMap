import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  withRouter,
  Route,
  Switch,
} from 'react-router-dom';
import { push } from 'react-router-redux';
import loader from '../../../../data/loader/actions';
import * as noticeDialogActions from '../../../../data/noticeDialog/actions';
import * as wordLengthActions from  './data/wordLength/actions';
import Background from '../../components/Background';
import Menu from './components/Menu';
import AddWord from './scene/AddWord';
import WordList from './scene/WordList';
import Exam from './scene/Exam';

class Start extends React.Component {
  constructor(props) {
    super(props);
    this.props.wordLengthRequest();
  }
  handleMenu = (clicked) => {
    switch(clicked) {
      case 'addWord':
        this.props.changePage('/addWord');
        break;
      case 'wordList':
        this.props.changePage('/wordList');
        break;
      case 'exam':
        this.props.changePage('/exam');
        break;
      default:
        break;
    }
  };
  render() {
    const {
      auth,
      wordLength,
    } = this.props;
    return (
      <Background>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <Menu
                {...props}
                user={auth.person}
                wordLength={wordLength.length}
                handleMenu={this.handleMenu}
              />
            )}
          />
          <Route
            path="/addWord"
            component={AddWord}
          />
          <Route
            path="/wordList"
            component={WordList}
          />
          <Route
            path="/exam"
            component={Exam}
          />
        </Switch>
      </Background>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.main.data.auth,
  wordLength: state.main.start.data.wordLength,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: path => push(path),
  notice: noticeDialogActions.on,
  loader,
  wordLengthRequest: wordLengthActions.request,
}, dispatch);
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Start));

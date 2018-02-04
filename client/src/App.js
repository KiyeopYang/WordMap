import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Route,
  withRouter,
  Switch,
} from 'react-router-dom';
import * as noticeDialogActions from './data/noticeDialog/actions';
import loader from './data/loader/actions';
import LandingPage from './scene/LandingPage';
import ManagerPage from './scene/ManagerPage';
import NoticeDialog from './components/NoticeDialog';
import loaderDOM from './modules/loader';

class App extends React.Component {
  constructor(props) {
    super(props);
    loaderDOM(this.props.loaderState);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.loaderState !== nextProps.loaderState) {
      loaderDOM(nextProps.loaderState);
    }
  }
  render() {
    const { noticeDialog } = this.props;
    return (
      <React.Fragment>
        <Switch>
          <Route
            path="/manager"
            component={ManagerPage}
          />
          <Route
            path="/"
            component={LandingPage}
          />
        </Switch>
        <NoticeDialog
          open={noticeDialog.open}
          onClose={this.props.noticeDialogOff}
          title={noticeDialog.title}
          text={noticeDialog.text}
          onConfirm={noticeDialog.onConfirm}
        />
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  noticeDialog: state.data.noticeDialog,
  loaderState: state.data.loader,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  noticeDialogOn: noticeDialogActions.on,
  noticeDialogOff: noticeDialogActions.off,
  loader,
}, dispatch);
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(App));

import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  withRouter,
  Switch,
} from 'react-router-dom';
import { push } from 'react-router-redux';
import loader from '../../data/loader/actions';
import * as noticeDialogActions from '../../data/noticeDialog/actions';
import * as authActions from './data/auth/actions';
import Login from './scene/Login';
import Start from './scene/Start';
import AuthRoute from './modules/AuthRoute';

class Main extends React.Component {
  constructor(props){
    super(props);
    this.props.authRequest();
  }
  render() {
    const {
      person,
    } = this.props.auth;
    const isAuth = person !== null;
    console.log(this.props.state);
    return (
      <Fragment>
        <Switch>
          <AuthRoute
            mode="auth"
            path="/login"
            isAuth={isAuth}
            redirectPath="/"
            component={Login}
          />
          <AuthRoute
            mode="private"
            path="/"
            isAuth={isAuth}
            redirectPath="/login"
            component={Start}
          />
        </Switch>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  state, // for check
  auth: state.main.data.auth,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: path => push(path),
  notice: noticeDialogActions.on,
  loader,
  authRequest: authActions.request,
}, dispatch);
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main));

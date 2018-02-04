import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  withRouter,
  Route,
  Redirect,
} from 'react-router-dom';
import { push } from 'react-router-redux';
import loader from '../../../../data/loader/actions';
import * as noticeDialogActions from '../../../../data/noticeDialog/actions';
import * as authActions from '../../data/auth/actions';
import * as loginActions from './data/login/actions';
import Form from './components/Form';

class Login extends React.Component {
  handleFormSubmit = (phone) => {
    const {
      login,
      loginRequest,
      authRequest,
    } = this.props;
    loginRequest(phone)
      .then(() => {
        if (login.status === 'SUCCESS') {
          authRequest();
        } else {
          const { error } = login;
          throw error;
        }
      })
      .catch((error) => {
        this.props.loader(false);
        this.props.notice(error);
      });
  };
  render() {
    return (
      <div>
        <Form
          handleFormSubmit={this.handleFormSubmit}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  login: state.main.login.data.login,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: path => push(path),
  notice: noticeDialogActions.on,
  loader,
  loginRequest: loginActions.request,
  authRequest: authActions.request,
}, dispatch);
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login));

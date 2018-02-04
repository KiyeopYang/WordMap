import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  withRouter,
} from 'react-router-dom';
import { push } from 'react-router-redux';
import loader from '../../../../data/loader/actions';
import * as noticeDialogActions from '../../../../data/noticeDialog/actions';
import * as authActions from '../../data/auth/actions';
import * as loginActions from './data/login/actions';
import Background from '../../components/Background';
import Form from './components/Form';

class Login extends React.Component {
  handleFormSubmit = (phone) => {
    const {
      loginRequest,
      authRequest,
    } = this.props;
    this.props.loader(true);
    loginRequest(phone)
      .then(() => {
        const { login } = this.props;
        if (login.status === 'SUCCESS') {
          localStorage.person = JSON.stringify(login.person);
          this.props.loader(false);
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
      <Background>
        <Form
          handleFormSubmit={this.handleFormSubmit}
        />
      </Background>
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

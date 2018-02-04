import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Route,
  withRouter,
} from 'react-router-dom';
import { push } from 'react-router-redux';
import Background from '../../components/Background';
import Body from './components/Body';
import FindPassword from './components/FindPassword';
import LoginForm from './components/LoginForm';

class Login extends React.Component {
  onSelectFindPassword = () => {
    this.props.changePage(`${this.props.match.path}/find`);
  };
  handleFindPassword = (email) => {
    if (email && email.length) {
      // 이메일 찾기 성공
      this.props.changePage(`${this.props.match.path}/`);
    } else {
      // 이메일 찾기 실패
    }
  };
  render() {
    const { match } = this.props;
    return (
      <Background>
        <Body>
          <Route
            exact
            path={`${match.path}/`}
            render={props =>
              <LoginForm
                {...props}
                onSelectFindPassword={this.onSelectFindPassword}
              />
            }
          />
          <Route
            path={`${match.path}/find`}
            render={props =>
              <FindPassword
                {...props}
                handleFindPassword={this.handleFindPassword}
                goBack={() => this.props.changePage('/login')}
              />
            }
          />
        </Body>
      </Background>
    );
  }
}
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: path => push(path),
}, dispatch);
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login));

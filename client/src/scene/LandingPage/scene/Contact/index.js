import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  withRouter,
} from 'react-router-dom';
import { push } from 'react-router-redux';
import config from '../../../../config';
import Background from '../../components/Background';
import Body from './components/Body';
import Form from './components/Form';

const EMAIL_URL = `${config.HOST}/api/email/contact`;
class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      status: 'initial',
    };
  }
  handleSubmit = ({ email, phone, text }) => {
    this.setState({ loading: true });
    fetch(EMAIL_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        phone,
        text,
      }),
    })
      .then(res => res.json())
      .then((data) => {
        if (data.success) {
          this.setState({
            loading: false,
            status: 'success',
          });
        } else {
          this.setState({
            loading: false,
            status: 'failure',
          });
        }
      })
      .catch((error) => {
        console.error(error);
        this.setState({
          loading: false,
          status: 'failure',
        });
      });
  };
  render() {
    return (
      <Background>
        <Body>
          <Form
            loading={this.state.loading}
            status={this.state.status}
            handleSubmit={this.handleSubmit}
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
)(Contact));

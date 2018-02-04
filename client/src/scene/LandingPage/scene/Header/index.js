import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  withRouter,
} from 'react-router-dom';
import Body from './components/Body';

class Header extends React.Component {
  render() {
    return (
      <Body onSelect={this.props.onSelect} />
    );
  }
}
const mapStateToProps = state => ({
});
const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch);
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header));

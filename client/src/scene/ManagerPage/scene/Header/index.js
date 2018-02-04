import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  withRouter,
} from 'react-router-dom';
import { push } from 'react-router-redux';
import Body from './components/Body';


class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
    };
    // route를 통해 Header title 초기화를 위함.
    const { map, match, prevMatch, handleSelect } = this.props;
    let found = map.find(o => `${prevMatch.url}${o.route}` === match.url);
    if (found) {
      handleSelect(found.name, false);
    }
  }
  render() {
    const {
      email,
      website,
    } = {
      email: 'kiyeopyang@gmail.com',
      website: 'https://noooob.xyz',
    };
    return (
      <Body
        email={email}
        website={website}
        open={this.state.open}
        handleToggle={open => this.setState({ open })}
        handleSelect={this.props.handleSelect}
        title={this.props.selected}
      >
      {this.props.children}
      </Body>
    );
  }
}
const mapStateToProps = state => ({
});
const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: path => push(path),
}, dispatch);
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header));

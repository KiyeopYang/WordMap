import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Route,
  withRouter,
} from 'react-router-dom';
import { push } from 'react-router-redux';
import Header from './scene/Header';
import Front from './scene/Front';
import Login from './scene/Login';
import Contact from './scene/Contact';
import PushExample from './scene/PushExample';
import Footer from './components/Footer';
import Event from './components/Event';

class LandingPage extends React.Component {
  onSelectHeaderMenu = (menu) => {
    const { changePage } = this.props;
    switch(menu) {
      case 'title' :
        changePage('/');
        break;
      case 'login' :
        changePage(`/login`);
        break;
      case 'contact' :
        changePage(`/contact`);
        break;
      default:
        break;
    }
  };
  render() {
    return (
      <React.Fragment>
        <Header onSelect={this.onSelectHeaderMenu}/>
        <Route
          exact
          path={`/`}
          component={Front}
        />
        <Route
          path={`/login`}
          component={Login}
        />
        <Route
          path={`/contact`}
          component={Contact}
        />
        <Route
          path={`/example`}
          component={PushExample}
        />
        <Route
          path={`/event`}
          component={Event}
        />
        <Footer />
      </React.Fragment>
    )
  }
}
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: path => push(path),
}, dispatch);
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(LandingPage));


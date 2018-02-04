import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  withRouter,
} from 'react-router-dom';
import { push } from 'react-router-redux';
import Subscribers from './components/Subscribers';
import FirstContents from './components/FirstContents';
import SecondContents from './components/SecondContents';

const DATA1 = [];
const randomDate = 100;
for(let i = 0; i < randomDate; i += 1) {
  const date = new Date();
  date.setDate(date.getDate() - i);
  const total = Math.floor(Math.random() * 300);
  const ok_of_total = Math.floor(Math.random() * total);
  const no_of_total = total - ok_of_total;
  const desktop_of_ok_of_total = Math.floor(Math.random() * ok_of_total);
  const desktop_of_no_of_total = Math.floor(Math.random() * no_of_total);
  const mobile_of_ok_of_total = ok_of_total - desktop_of_ok_of_total;
  const mobile_of_no_of_total = no_of_total - desktop_of_no_of_total;

  DATA1.push({
    date,
    subscribed: {
      desktop: desktop_of_ok_of_total,
      mobile: mobile_of_ok_of_total,
    },
    unsubscribed: {
      desktop: desktop_of_no_of_total,
      mobile: mobile_of_no_of_total,
    },
  });
}
DATA1.reverse();
class Dashboard extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Subscribers data={DATA1}/>
        <FirstContents data={DATA1}/>
        <SecondContents data={DATA1}/>
      </React.Fragment>
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
)(Dashboard));

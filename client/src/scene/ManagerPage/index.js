import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Route,
  withRouter,
} from 'react-router-dom';
import { push } from 'react-router-redux';
import Header from './scene/Header';
import Setting from './scene/Setting';
import Dashboard from './scene/Dashboard';
import Send from './scene/Send';
import Reserved from './scene/Reserved';
import Result from './scene/Result';
import Welcome from './scene/Welcome';

const map = [
  {
    name: '대시보드',
    route: '',
  },
  {
    name: '알림 전송',
    route: '/send',
  },
  {
    name: '예약된 전송',
    route: '/reserved',
  },
  {
    name: '전송 결과',
    route: '/result',
  },
  {
    name: '고객 그룹 관리',
    route: '/customer',
  },
  {
    name: '웰컴 알림 관리',
    route: '/welcome',
  },
  {
    name: '연동 관리',
    route: '/integration',
  },
  {
    name: '세팅',
    route: '/setting',
  },
  {
    name: '결제 정보',
    route: '/billing',
  },
  {
    name: 'FAQ',
    route: '/faq',
  },
];
class ManagerPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: '',
    }
  }
  handleMenuSelect = (menu, changePage = true) => {
    this.setState({
      selected: menu,
    });
    let found;
    if (changePage && (found = map.find(o => o.name === menu))) {
      this.props.changePage(`${this.props.match.url}${found.route}`);
    }
  };
  render() {
    const { match } = this.props;
    const adapter = Ele => props => (
      <Header
        map={map}
        selected={this.state.selected}
        handleSelect={this.handleMenuSelect}
        prevMatch={match}
        {...props}
      >
        <Ele />
      </Header>
    );
    return (
      <React.Fragment>
        <Route
          exact
          path={`${match.url}`}
          render={adapter(Dashboard)}
        />
        <Route
          path={`${match.url}/send`}
          render={adapter(Send)}
        />
        <Route
          path={`${match.url}/reserved`}
          render={adapter(Reserved)}
        />
        <Route
          path={`${match.url}/result`}
          render={adapter(Result)}
        />
        <Route
          path={`${match.url}/customer`}
          render={adapter(Dashboard)}
        />
        <Route
          path={`${match.url}/welcome`}
          render={adapter(Welcome)}
        />
        <Route
          path={`${match.url}/integration`}
          render={adapter(Dashboard)}
        />
        <Route
          path={`${match.url}/setting`}
          render={adapter(Setting)}
        />
        <Route
          path={`${match.url}/billing`}
          render={adapter(Dashboard)}
        />
        <Route
          path={`${match.url}/faq`}
          render={adapter(Dashboard)}
        />
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
)(ManagerPage));


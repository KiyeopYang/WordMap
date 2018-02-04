import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Route,
  withRouter,
  Switch,
} from 'react-router-dom';
import { push } from 'react-router-redux';
import dateFormat from 'dateformat';
import * as reservedActions from '../../data/reserved/actions';
import loader from '../../../../data/loader/actions';
import DataTable from '../../components/DataTable';
import DataView from './components/DataView';
import * as noticeDialogActions from '../../../../data/noticeDialog/actions';

const TABLE_MAP = new Map();
const MAP = [
  {
    key: 'title',
    label: '타이틀',
  },
  {
    key: 'coverageAll',
    label: '타겟 수',
  },
  {
    key: 'datetime',
    label: '실행 시각',
    tableFunc: d => dateFormat(
      d,
      'yyyy년 m월 d일 HH:MM',
    ),
  },
];
MAP.forEach(m => TABLE_MAP.set(m.key, m));
class Reserved extends React.Component {
  constructor(props) {
    super(props);
    this.reservedRetrieveMany();
  }
  reservedRetrieveOne = (id) => {
    this.props.loader(true);
    // return을 통해 DataView에서도 Promise 사용할 수 있도록.
    return this.props.reservedRetrieveOne(id)
      .then(() => {
        this.props.loader(false);
        const { retrieveOne } = this.props.reserved;
        if (retrieveOne.status === 'FAILURE') {
          throw retrieveOne.error;
        }
      })
      .catch((error) => {
        this.props.loader(false);
        console.error(error);
        this.props.notice(error);
      })
  };
  reservedRetrieveMany = () => {
    this.props.loader(true);
    this.props.reservedRetrieveMany()
      .then(() => {
        this.props.loader(false);
        const { retrieveMany } = this.props.reserved;
        if (retrieveMany.status === 'FAILURE') {
          throw retrieveMany.error;
        }
      })
      .catch((error) => {
        this.props.loader(false);
        console.error(error);
        this.props.notice(error);
      })
  };
  reservedRemoveOne = (id) => {
    this.props.loader(true);
    // Plotly 이벤트 설계가 잘못되어 삭제 후 changePage하면 에러가 난다.
    this.props.changePage(this.props.match.url);
    this.props.reservedRemoveOne(id)
      .then(() => {
        const { removeOne } = this.props.reserved;
        this.reservedRetrieveMany();
        if (removeOne.status === 'FAILURE') {
          throw removeOne.error;
        }
      })
      .catch((error) => {
        this.props.loader(false);
        console.error(error);
        this.props.notice(error);
      })
  };
  handleClickItem = (item) => {
    if (this.props.match.url[this.props.match.url.length - 1] === '/') {
      this.props.changePage(`${this.props.match.url}${item._id}`);
    } else {
      this.props.changePage(`${this.props.match.url}/${item._id}`);
    }
  };
  handleClickControls = (control, data) => {
    switch (control) {
      case 'removeOne':
        const { id } = data;
        this.reservedRemoveOne(id);
        break;
      case 'goBack':
        this.props.history.goBack();
        break;
      default:
        break;
    }
  };
  render() {
    const {
      reserved,
      match,
    } = this.props;
    return (
      <Switch>
        <Route
          path={`${match.url}`}
          exact
          render={() => (
            <DataTable
              title="전송 예약 리스트"
              data={reserved.retrieveMany.reserveds}
              dataMap={TABLE_MAP}
              handleClickItem={this.handleClickItem}
              handleClickControls={this.handleClickControls}
            />
          )}
        />
        <Route
          path={`${match.url}/:id`}
          render={({ match }) => (
            <DataView
              title="예약된 알림"
              requestItem={this.reservedRetrieveOne}
              item={reserved.retrieveOne.reserved}
              match={match}
              handleClickControls={this.handleClickControls}
            />
          )}
        />
      </Switch>
    );
  }
}
const mapStateToProps = state => ({
  reserved: state.managerPage.data.reserved,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: path => push(path),
  notice: noticeDialogActions.on,
  loader,
  reservedRetrieveOne: reservedActions.retrieveOneRequest,
  reservedRetrieveMany: reservedActions.retrieveManyRequest,
  reservedRemoveOne: reservedActions.removeOneRequest,
}, dispatch);
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Reserved));

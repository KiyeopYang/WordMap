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
import * as resultActions from '../../data/result/actions';
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
    key: 'resultInProcess',
    label: '전송 중',
  },
  {
    key: 'resultSuccess',
    label: '성공 수',
  },
  {
    key: 'resultFailure',
    label: '실패 수',
  },
  {
    key: 'resultClicked',
    label: '클릭 수',
  },
  {
    key: 'resultSuccessRatio',
    label: '성공률',
    tableFunc: d => `${d}%`,
  },
  {
    key: 'resultClickedRatio',
    label: '클릭률',
    tableFunc: d => `${d}%`,
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
class Result extends React.Component {
  constructor(props) {
    super(props);
    this.resultRetrieveMany();
  }
  resultRetrieveOne = (id) => {
    this.props.loader(true);
    // return을 통해 DataView에서도 Promise 사용할 수 있도록.
    return this.props.resultRetrieveOne(id)
      .then(() => {
        this.props.loader(false);
        const { retrieveOne } = this.props.result;
        if (retrieveOne.status === 'FAILURE') {
          throw retrieveOne.error;
        }
      })
      .catch((error) => {
        this.props.loader(false);
        this.props.notice(error);
      })
  };
  resultRetrieveMany = () => {
    this.props.loader(true);
    this.props.resultRetrieveMany()
      .then(() => {
        this.props.loader(false);
        const { retrieveMany } = this.props.result;
        if (retrieveMany.status === 'FAILURE') {
          throw retrieveMany.error;
        }
      })
      .catch((error) => {
        this.props.loader(false);
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
  handleClickControls = (control) => {
    switch (control) {
      case 'goBack':
        this.props.history.goBack();
        break;
      default:
        break;
    }
  };
  render() {
    const {
      result,
      match,
    } = this.props;
    return (
      <Switch>
        <Route
          path={`${match.url}`}
          exact
          render={() => (
            <DataTable
              title="최근 전송 내역"
              data={result.retrieveMany.results}
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
              title="전송된 알림"
              requestItem={this.resultRetrieveOne}
              item={result.retrieveOne.result}
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
  result: state.managerPage.data.result,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: path => push(path),
  notice: noticeDialogActions.on,
  loader,
  resultRetrieveOne: resultActions.retrieveOneRequest,
  resultRetrieveMany: resultActions.retrieveManyRequest,
}, dispatch);
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Result));

import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  withRouter,
} from 'react-router-dom';
import { push } from 'react-router-redux';
import loader from '../../../../../../data/loader/actions';
import * as noticeDialogActions from '../../../../../../data/noticeDialog/actions';
import * as examActions from './data/exam/actions';
import * as faultActions from './data/fault/actions';
import Layout from './components/Layout';
import Header from './components/Header';
import Problem from './components/Problem';
import Result from './components/Result';

function get(list, meanings) {
  let data = null;
  while(data === null) {
    const rdata = list[Math.floor(Math.random() * list.length)];
    if (meanings.findIndex(o => o.meaning === rdata.meaning) < 0)
      data = rdata.meaning;
  }
  return data;
}
class Exam extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nowIndex: -1,
      isEnd: false,
      problems: [],
      results: [],
    };
    this.examRequest();
  }
  examRequest = () => {
    this.props.loader(true);
    this.props.examRequest()
      .then(() => {
        this.props.loader(false);
        const { exam } = this.props;
        if (exam.status === 'SUCCESS') {
          this.props.notice('시작');
          const submits = [];
          exam.list.forEach((item) => {
            const arr = [];
            arr.push(item.meaning);
            arr.push(get(exam.list, arr));
            arr.push(get(exam.list, arr));
            const arrForPush = [];
            while(arr.length > 0) {
              if (arr.length > 1) {
                const r = Math.floor(Math.random() * arr.length);
                arrForPush.push(arr[r]);
                arr.splice(r, 1);
              } else {
                arrForPush.push(arr[0]);
                arr.splice(0,1);
              }
            }
            submits.push(arrForPush);
          });
          this.setState({
            nowIndex: 0,
            problems: exam.list,
            submits,
          });
        } else {
          throw exam.error;
        }
      })
      .catch((error) => {
        this.props.loader(false);
        this.props.notice(error);
      });
  };
  handleSubmit = (submittedMeaning) => {
    const { nowIndex, problems, results } = this.state;
    const now = problems[nowIndex];
    const result = { ...now };
    if (now.meaning === submittedMeaning) {
      if (now.hasOwnProperty('weight')) {
        result.weight -= 1;
      }
      result.correct = true;
    } else {
      if (now.hasOwnProperty('weight')) {
        result.weight += 1;
      } else {
        result.weight = 3;
      }
      result.correct = false;
    }
    if (nowIndex < 19) {
      this.setState({
        nowIndex: nowIndex + 1,
        results : results.concat(result),
      });
    } else {
      this.setState({
        results : results.concat(result),
        isEnd: true,
      });
    }
  };
  handleUpload = () => {
    this.props.loader(true);
    const faults = this.state.results.filter(o => !o.correct);
    this.props.faultRequest(faults)
      .then(() => {
        this.props.loader(false);
        const { fault, history } = this.props;
        if (fault.status === 'SUCCESS') {
          this.props.notice('제출 완료');
          history.goBack();
        } else {
          throw fault.error;
        }
      })
      .catch((error) => {
        this.props.loader(false);
        this.props.notice(error);
      });
  };
  render() {
    const {
      isEnd,
      nowIndex,
      submits,
      results,
    } = this.state;
    const {
      exam,
    } = this.props;
    if (nowIndex < 0)
      return null;
    return (
      <Layout>
        {
          !isEnd ?
            <Fragment>
              <Header
                text={`${nowIndex + 1}/${exam.list.length}`}
              />
              <Problem
                problem={exam.list[nowIndex]}
                submits={submits[nowIndex]}
                handleSubmit={this.handleSubmit}
              />
            </Fragment>
            :
            <Result
              results={results}
              handleSubmit={this.handleUpload}
            />
        }
      </Layout>
    )
  }
}
const mapStateToProps = state => ({
  exam: state.main.start.exam.data.exam,
  fault: state.main.start.exam.data.fault,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: path => push(path),
  notice: noticeDialogActions.on,
  loader,
  examRequest: examActions.request,
  faultRequest: faultActions.request,
}, dispatch);
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Exam));

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  withRouter,
} from 'react-router-dom';
import { push } from 'react-router-redux';
import Typist from 'react-typist';
import Typography from 'material-ui/Typography';

class S1 extends React.Component {
  render() {
    return (
      <div>
        <Typist cursor={{ show: false }}>
          <h1>
            웹 푸시 예제를 실행합니다.
          </h1>
        </Typist>
        <Typography align="center">
          * 본 예제는 크롬, 파이어폭스, 삼성 브라우저, 오페라에서 작동합니다.
        </Typography>
      </div>
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
)(S1));

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  withRouter,
} from 'react-router-dom';
import { push } from 'react-router-redux';
import Typist from 'react-typist';
import Typgraphy from 'material-ui/Typography';
import Button from 'material-ui/Button';

class S3 extends React.Component {
  render() {
    const { name, next } = this.props;
    return (
      <div>
        <Typist cursor={{ show: false }}>
          <h1>
            {`안녕하세요. ${name}님`}
          </h1>
        </Typist>
        <Typgraphy
          align="center"
          gutterBottom
        >
          * 웰컴 푸시
        </Typgraphy>
        <Typgraphy
          align="center"
          gutterBottom
        >
          고객께서 알림을 허용하였을 순간에 받는 푸시 알림입니다.
          현 예제에선, 이미 알림이 허용 된 상태입니다.
        </Typgraphy>
        <Button
          color="primary"
          raised
          onClick={next}
        >
          다음
        </Button>
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
)(S3));

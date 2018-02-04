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

class S4 extends React.Component {
  render() {
    const { next } = this.props;
    return (
      <div>
        <Typist cursor={{ show: false }}>
          <h1>
            {`온라인 쇼핑몰 신상품 알림`}
          </h1>
        </Typist>
        <Typgraphy
          align="center"
          gutterBottom
        >
          * 전체 푸시
        </Typgraphy>
        <Typgraphy
          align="center"
          gutterBottom
        >
          전체 구독자에게 보내는 홍보용 푸시입니다.
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
)(S4));

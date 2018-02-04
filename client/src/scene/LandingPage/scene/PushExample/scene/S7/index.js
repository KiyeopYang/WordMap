import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  withRouter,
} from 'react-router-dom';
import { push } from 'react-router-redux';
import Typist from 'react-typist';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

class S7 extends React.Component {
  render() {
    return (
      <div>
        <Typist cursor={{ show: false }}>
          <h1>
            배송이 완료되었습니다.
          </h1>
          <h1>
            알림을 클릭하여 후기를 작성하세요.
          </h1>
        </Typist>
        <Typography
          align="center"
        >
          * 알림에 클릭 이벤트를 추가할 수 있습니다.
        </Typography>
        <Button
          color="primary"
          raised
          onClick={this.props.next}
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
)(S7));

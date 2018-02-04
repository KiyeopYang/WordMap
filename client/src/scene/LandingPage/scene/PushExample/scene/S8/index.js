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

class S8 extends React.Component {
  render() {
    return (
      <div>
        <Typist cursor={{ show: false }}>
          <h1>
            기존 데이터를 이용하여 맞춤 홍보를 진행하세요.
          </h1>
        </Typist>
        <Typography
          align="center"
        >
          * 마지막 예제 페이지입니다.
        </Typography>
        <Button
          color="primary"
          raised
          onClick={this.props.next}
        >
          종료
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
)(S8));

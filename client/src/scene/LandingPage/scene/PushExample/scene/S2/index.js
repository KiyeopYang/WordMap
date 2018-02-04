import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  withRouter,
} from 'react-router-dom';
import { push } from 'react-router-redux';
import Typist from 'react-typist';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

const NAMES = [
  '청주사람',
  '강아지',
  '고양이',
  '오렌지쥬스',
  '포테이토피자',
  '삼겹살',
  '서울사람',
  '혜화연극인',
];
class S2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
  }
  handleInputChange = (prop) => {
    return (e) => {
      this.setState({
        [prop]: e.target.value,
      })
    }
  };
  getRandomName = () => {
    this.setState({
      name: NAMES[Math.floor(Math.random() * NAMES.length)],
    });
  };
  render() {
    return (
      <div>
        <Typist cursor={{ show: false }}>
          <h2>
            이름을 입력하여 주십시요.
          </h2>
        </Typist>
        <div>
          <TextField
            autoFocus
            value={this.state.name}
            onChange={this.handleInputChange('name')}
          />
        </div>
        <div style={{ padding: 20}}>
          <Button
            color="primary"
            raised={this.state.name.length > 0}
            onClick={() => this.props.onSubmit(this.state.name)}
          >
            확인
          </Button>
        </div>
        <div>
          <Button
            onClick={this.getRandomName}
          >
            랜덤 이름 사용하기
          </Button>
        </div>
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
)(S2));

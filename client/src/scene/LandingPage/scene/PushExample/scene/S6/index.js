import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  withRouter,
} from 'react-router-dom';
import { push } from 'react-router-redux';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormLabel, FormControl, FormControlLabel } from 'material-ui/Form';

class S6 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messageOption: this.props.messageOption,
    }
  }
  onChangeMessageOption = (e, v) => {
    this.setState({
      messageOption: v,
    });
    this.props.onChangeMessageOption(v);
  };
  render() {
    return (
      <div>
        <Typography
          type="headline"
          align="center"
        >
          고객센터의 메시지
        </Typography>
        <Typography
          align="center"
          gutterBottom
        >
          * 5초마다 자동으로 생성됩니다. 여러 알림 옵션을 확인해보세요.
          * 브라우저에 따라 차이가 있을 수 있습니다.
        </Typography>
        <Typography
          type="title"
          align="center"
          style={{
            padding: '10px 0px 10px',
          }}
        >
          {this.props.message}
        </Typography>
        <div>
          <FormControl component="fieldset" required>
            <FormLabel component="legend">알림 옵션</FormLabel>
            <RadioGroup
              aria-label="messageOption"
              name="messageOption"
              value={this.state.messageOption}
              onChange={this.onChangeMessageOption}
            >
              <FormControlLabel value="stack" control={<Radio />} label="쌓기" />
              <FormControlLabel value="change" control={<Radio />} label="기존 알림 대체" />
              <FormControlLabel value="merge" control={<Radio />} label="기존 알림에 중첩" />
            </RadioGroup>
          </FormControl>
        </div>
        <Typography
          align="center"
          gutterBottom
        >
          * 다음 메시지부터 반영됩니다.
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
)(S6));

import React from 'react';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Plot from 'react-plotly.js';
import { FormControlLabel } from 'material-ui/Form';
import Switch from 'material-ui/Switch';
import moment from 'moment';
import { DateTimePicker } from 'material-ui-pickers';
import IconLeft from 'material-ui-icons/ChevronLeft';
import IconRight from 'material-ui-icons/ChevronRight';
import IconKeyboard from 'material-ui-icons/Keyboard';
import IconDate from 'material-ui-icons/DateRange';
import IconTime from 'material-ui-icons/AvTimer';

moment.updateLocale('en', {
  months : [
    '1월', '2월', '3월', '4월', '5월', '6월', '7월',
    '8월', '9월', '10월', '11월', '12월',
  ],
  ordinal : function (number) {
    // 1st -> 1일
    return `${number}일`;
  }
});
const styles = theme => ({
  center: {
    textAlign: 'center',
  },
  dataText: {
    width: '150px',
  },
  dataTextWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
  picker: {
    marginBottom: theme.spacing.unit * 3,
  }
});
class Sender extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalSubscribersChart: null,
      datePickerOn: false,
      reservedDate: moment(),
    };
  }
  componentDidMount() {
    this.chartInit();
  }
  chartInit = () => {
    const totalSubscribersChart_view = {
      data: [{
        labels: ['데스크탑', '모바일'],
        values: [],
        marker: {
          colors: ['lightskyblue', 'lightsalmon'],
        },
        type: 'pie',
        insidetextfont: {
          size: 22,
        },
      }],
      layout: {
        height: 350,
        width: 450,
        title: '전달 가능 대상 수',
      },
      config: {
        displayModeBar: false,
      },
    };
    const { data } = this.props;
    let NUM_OF_DESKTOP = data.desktop;
    let NUM_OF_MOBILE = data.mobile;
    totalSubscribersChart_view.data[0].values = [NUM_OF_DESKTOP, NUM_OF_MOBILE];
    this.setState({
      totalSubscribersChart: totalSubscribersChart_view,
    });
  };
  handleDateChange = (date) => {
    this.setState({ reservedDate: date });
  };
  render() {
    const {
      classes,
      data,
      handleSend,
    } = this.props;
    const {
      totalSubscribersChart,
      datePickerOn,
      reservedDate,
    } = this.state;
    return (
      <div>
        <div className={classes.center}>
          <Plot
            { ...totalSubscribersChart }
          />
        </div>
        <div className={classes.dataTextWrapper}>
          <div className={classes.dataText}>
            <Typography align="center">
              전달 가능 수
            </Typography>
            <Typography align="center" type="title" gutterBottom>
              { data.desktop + data.mobile }
            </Typography>
          </div>
          <div className={classes.dataText}>
            <Typography align="center">
              데스크탑
            </Typography>
            <Typography align="center" type="title" gutterBottom>
              { data.desktop }
            </Typography>
          </div>
          <div className={classes.dataText}>
            <Typography align="center">
              모바일
            </Typography>
            <Typography align="center" type="title" gutterBottom>
              { data.mobile }
            </Typography>
          </div>
        </div>
        <div className={classes.center}>
          <FormControlLabel
            control={
              <Switch
                checked={datePickerOn}
                onChange={(e, v) => this.setState({
                  datePickerOn: v,
                })}
              />
            }
            label="예약 전송"
          />
          <div
            className={classes.picker}
            style={{
              visibility: datePickerOn ? 'visible' : 'hidden',
            }}
          >
            <DateTimePicker
              disablePast
              value={reservedDate}
              onChange={this.handleDateChange}
              leftArrowIcon={<IconLeft />}
              rightArrowIcon={<IconRight />}
              dateRangeIcon={<IconDate />}
              timeIcon={<IconTime />}
              keyboardIcon={<IconKeyboard />}
            />
          </div>
        </div>
        <div className={classes.center}>
          <Button
            raised
            color="primary"
            onClick={handleSend}
          >
            전송하기
          </Button>
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(Sender);

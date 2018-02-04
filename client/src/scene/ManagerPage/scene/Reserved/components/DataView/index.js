import React from 'react';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import dateFormat from 'dateformat';
import Plot from 'react-plotly.js';
import ControlPanel from '../../../../components/ControlPanel';
import Notification from '../../../../components/Notification';
import Wrapper from '../../../../components/Wrapper';
import './styles.css';

const styles = theme => ({
  form: {
    margin: theme.spacing.unit * 3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  layout: {
    margin: theme.spacing.unit,
    maxWidth: 360, // Notification Width
    width: '100%',
  },
  chartWrapper: {
    textAlign: 'center',
  },
  dataText: {
    width: '150px',
  },
  dataTextWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
});
class DataView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalSubscribersChart: null,
    };
    this.props.requestItem(this.props.match.params.id)
      .then(() => this.chartInit());
  }
  chartInit = () => {
    const { item } = this.props;
    const totalSubscribersChart = {
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
        title: '전달 대상 수',
      },
      config: {
        displayModeBar: false,
      },
    };
    totalSubscribersChart.data[0].values = [
      item.coverageDesktop,
      item.coverageMobile,
    ];
    this.setState({
      totalSubscribersChart,
    });
  };
  handleClickControls = (clicked) => {
    const { item } = this.props;
    switch (clicked) {
      case 'removeOne':
        this.props.handleClickControls(clicked, { id: item._id });
        break;
      default:
        this.props.handleClickControls(clicked);
        break;
    }
  };
  render() {
    const {
      classes,
      title,
      item,
    } = this.props;
    const {
      totalSubscribersChart,
    } = this.state;
    if (!item) return null;
    return (
      <div>
        <ControlPanel
          handleClickControls={this.handleClickControls}
          remove
        />
        <Wrapper title={title}>
          <div className={classes.form}>
            <Plot
              { ...totalSubscribersChart }
            />
            <div className={classes.layout}>
              <Notification
                title={item.title}
                body={item.body}
                icon={item.icon}
                domainUrl={item.domainUrl}
              />
            </div>
            <div className={classes.layout}>
              <Typography type="title">
                타이틀
              </Typography>
              <Typography>
                {item.title}
              </Typography>
            </div>
            <div className={classes.layout}>
              <Typography type="title">
                내용
              </Typography>
              <Typography>
                {item.body}
              </Typography>
            </div>
            <div className={classes.layout}>
              <Typography type="title">
                이벤트 URL
              </Typography>
              <Typography>
                {item.redirectUrl}
              </Typography>
            </div>
            <div className={classes.layout}>
              <Typography type="title">
                전송 시각
              </Typography>
              <Typography>
                {
                  dateFormat(
                    item.datetime,
                    'yyyy년 m월 d일 HH:MM',
                  )
                }
              </Typography>
            </div>
          </div>
        </Wrapper>
      </div>
    );
  }
}
export default withStyles(styles)(DataView);

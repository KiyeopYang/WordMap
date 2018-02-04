import React from 'react';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Plot from 'react-plotly.js';

const styles = {
  root: {
    width: '100%',
    height: 'auto',
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    minWidth: 1050,
  },
  paper: {
    width: 1050,
    margin: 4,
    display: 'flex',
    justifyContent: 'center',
  },
};
class SecondContents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalSubscribersChart: null,
      totalSubscribers: null,
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
        title: '구독 기기 비율',
      },
      config: {
        displayModeBar: false,
      },
    };
    const { data } = this.props;
    let NUM_OF_DESKTOP = 0;
    let NUM_OF_MOBILE = 0;
    data.forEach((d) => {
      const { subscribed } = d;
      NUM_OF_DESKTOP += subscribed.desktop;
      NUM_OF_MOBILE += subscribed.mobile;
    });
    totalSubscribersChart_view.data[0].values = [NUM_OF_DESKTOP, NUM_OF_MOBILE];
    this.setState({
      totalSubscribersChart: totalSubscribersChart_view,
    });
  };
  render() {
    const { classes } = this.props;
    const {
      totalSubscribersChart,
    } = this.state;
    return (
      <div className={classes.root}>
        <Paper
          className={classes.paper}
        >
          <Plot {...totalSubscribersChart}/>
        </Paper>
      </div>
    )
  }
}
export default withStyles(styles)(SecondContents);

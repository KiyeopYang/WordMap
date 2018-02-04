import React from 'react';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import update from 'react-addons-update';
import MainChart from './components/MainChart';

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
  },
};
class FirstContents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: null,
      chart: null,
      mainChart_date: 'all',
      isCumulative: true,
      showData: {
        all: true,
        desktop: false,
        mobile: false,
      },
      graph: 'line',
    };
  }
  componentDidMount() {
    this.chartInit();
  }
  switchCumulative = (isCumulative) => {
    /*
    상태에 저장하는 이유는 차트의 다른 속성 변경이 일어날 때, 변화된 상태를 적용하기 위해.
    렌더 차트를 따로 호출하는 이유는 상태 변경과 동기화가 안이루어지기 때문.
     */
    this.setState({
      isCumulative: isCumulative,
    });
    this.renderChart({
      isCumulative,
    });
  };
  handleMainChartDateSelectionChange = (value) => {
    /*
    기간 변경은 서버로부터 데이터를 fetch 하여야 하기 때문에 무조건 차트 데이터를 새로 생성한다.
     */
    this.setState({
      mainChart_date: value,
    });
    let chartData;
    switch(value) {
      case 'all':
        chartData = this.makeChartData();
        break;
      case '7':
        chartData = this.makeChartData({ recentPeriod: 7 });
        break;
      case '30':
        chartData = this.makeChartData({ recentPeriod: 30 });
        break;
      case '90':
        chartData = this.makeChartData({ recentPeriod: 90 });
        break;
      case '180':
        chartData = this.makeChartData({ recentPeriod: 180 });
        break;
      case '365':
        chartData = this.makeChartData({ recentPeriod: 365 });
        break;
      default:
        break;
    }
    this.renderChart({
      chartData,
    });
  };
  handleShowDataChange = prop => (e, checked) => {
    const updatedState = update(this.state, {
      showData: {
        [prop]: { $set: checked },
      },
    });
    this.setState(updatedState);
    this.renderChart({
      showData: updatedState.showData,
    });
  };
  handleGraphChange = (e) => {
    const graph = e.target.value;
    this.setState({
      graph,
    });
    this.renderChart({
      graph,
    });
  };
  handleMainChartDateChange = () => {

  };
  makeChartData = (config) => {
    const chartData = {
      nonCumulative: {
        all: {
          x: [],
          y: [],
          name: '전체',
        },
        desktop: {
          x: [],
          y: [],
          name: '데스크탑',
        },
        mobile: {
          x: [],
          y: [],
          name: '모바일',
        },
      },
      cumulative: {
        all: {
          x: [],
          y: [],
          name: '전체',
        },
        desktop: {
          x: [],
          y: [],
          name: '데스크탑',
        },
        mobile: {
          x: [],
          y: [],
          name: '모바일',
        },
      },
    };
    const propData = this.props.data;
    let data = [];
    if (config && config.recentPeriod) {
      data = propData.slice(propData.length - config.recentPeriod, propData.length);
    } else {
      data = propData;
    }
    data.forEach((d) => {
      const { date, subscribed } = d;
      const dateText = `${date.getMonth()+1}/${date.getDate()}`;
      // 변화 계산 전체
      chartData.nonCumulative.all.x.push(dateText);
      chartData.nonCumulative.all.y.push(
        subscribed.desktop + subscribed.mobile,
      );
      // 변화 계산 데스크탑
      chartData.nonCumulative.desktop.x.push(dateText);
      chartData.nonCumulative.desktop.y.push(
        subscribed.desktop,
      );
      // 변화 계산 모바일
      chartData.nonCumulative.mobile.x.push(dateText);
      chartData.nonCumulative.mobile.y.push(
        subscribed.mobile,
      );
      // 누적 계산 전체
      chartData.cumulative.all.x.push(dateText);
      let len = chartData.cumulative.all.y.length;
      let prevData = len > 0 ?
        chartData.cumulative.all.y[len-1] : 0;
      chartData.cumulative.all.y.push(
        prevData + subscribed.desktop + subscribed.mobile,
      );
      // 누적 계산 데스크탑
      chartData.cumulative.desktop.x.push(dateText);
      len = chartData.cumulative.desktop.y.length;
      prevData = len > 0 ?
        chartData.cumulative.desktop.y[len-1] : 0;
      chartData.cumulative.desktop.y.push(
        prevData + subscribed.desktop,
      );
      // 누적 계산 모바일
      chartData.cumulative.mobile.x.push(dateText);
      len = chartData.cumulative.mobile.y.length;
      prevData = len > 0 ?
        chartData.cumulative.mobile.y[len-1] : 0;
      chartData.cumulative.mobile.y.push(
        prevData + subscribed.mobile,
      );
    });
    this.setState({
      chartData,
    });
    return chartData;
  };
  renderChart = (props) => {
    // props를 우선하되 없으면 state를 기준으로 초기화
    let chartData,
        isCumulative,
        showData,
        graph;
    if (props) {
      chartData = props.chartData;
      isCumulative = props.isCumulative;
      showData = props.showData;
      graph = props.graph;
    }
    if (!Object.hasOwnProperty.call(props, 'chartData')) chartData = this.state.chartData;
    if (!Object.hasOwnProperty.call(props, 'isCumulative')) isCumulative = this.state.isCumulative;
    if (!Object.hasOwnProperty.call(props, 'showData')) showData = this.state.showData;
    if (!Object.hasOwnProperty.call(props, 'graph')) graph = this.state.graph;
    const chart = {
      data: [],
      layout: {
        width: 1050,
        height: 450,
        title: `구독 기기 변화${isCumulative ? ' (누적)' : ''}`,
      },
      config: {
        displayModeBar: false,
      },
    };
    let baseData = isCumulative ? chartData.cumulative : chartData.nonCumulative;
    const options = ['all', 'desktop', 'mobile'];
    options.forEach((o) => {
      if (showData[o]) {
        switch (graph) {
          case 'line':
            baseData[o].type = 'scatter';
            break;
          case 'bar':
            baseData[o].type = 'bar';
            break;
          default:
            break;
        }
        chart.data.push(baseData[o]);
      }
    });
    this.setState({
      chart,
    });
  };
  chartInit = () => {
    this.renderChart({
      chartData: this.makeChartData(),
    });
  };
  render() {
    const { classes } = this.props;
    const {
      chart,
      mainChart_date,
      isCumulative,
      showData,
      graph,
    } = this.state;
    return (
      <div className={classes.root}>
        <Paper
          className={classes.paper}
        >
          <MainChart
            view={chart}
            isCumulative={isCumulative}
            switchCumulative={this.switchCumulative}
            date={mainChart_date}
            handleDateSelectionChange={this.handleMainChartDateSelectionChange}
            showData={showData}
            handleShowDataChange={this.handleShowDataChange}
            graph={graph}
            handleGraphChange={this.handleGraphChange}
          />
        </Paper>
      </div>
    )
  }
}
export default withStyles(styles)(FirstContents);

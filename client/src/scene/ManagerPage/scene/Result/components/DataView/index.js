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
      resultChart: null,
      clickedChart: null,
      sankeyChart: null,
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

    const resultChart = {
      data: [{
        labels: ['성공', '실패', '진행 중'],
        values: [],
        marker: {
          colors: ['#36a2eb', 'lightcoral', 'moccasin'],
        },
        type: 'pie',
        insidetextfont: {
          size: 22,
        },
      }],
      layout: {
        height: 350,
        width: 450,
        title: '전송 결과',
      },
      config: {
        displayModeBar: false,
      },
    };
    resultChart.data[0].values = [
      item.resultSuccess,
      item.resultFailure,
      item.resultInProcess,
    ];

    const clickedChart = {
      data: [{
        labels: ['클릭 함', '클릭 안함'],
        values: [],
        marker: {
          colors: ['#36a2eb', 'lightcoral'],
        },
        type: 'pie',
        insidetextfont: {
          size: 22,
        },
      }],
      layout: {
        height: 350,
        width: 450,
        title: '전송된 알림의 클릭률',
      },
      config: {
        displayModeBar: false,
      },
    };
    clickedChart.data[0].values = [
      item.resultClicked,
      item.resultSuccess - item.resultClicked,
    ];

    const sankeyChart = {
      data: [{
        type: 'sankey',
        domain: {
          x: [ 0, 1 ],
          y: [ 0, 1 ],
        },
        orientation: 'h',
        valueformat: '.0f',
        valuesuffix: '개',
        node: {
          pad: 15,
          thickness: 15,
          line: {
            color: 'black',
            width: 0.5
          },
          label: [
            '총 전송 대상',
            '데스크탑',
            '모바일',
            '전송 중',
            '전송 완료',
            '실패',
            '클릭 함',
            '클릭 안함',
            '성공',
          ],
          color: [
            'rgba(31, 119, 180, 0.8)',
            '#87cefa',
            '#ffa07a',
            '#ffe4b5',
            '#36a2eb',
            '#f06060',
            '#2471ec',
            '#f08080',
            '#36a2eb',
          ]
        },
        link: {
          source: [
            0,
            0,
            1,
            1,
            1,
            2,
            2,
            2,
            4,
            4,
            4,
            4,
            6,
            7,
          ],
          target: [
            1,
            2,
            3,
            4,
            5,
            3,
            4,
            5,
            6,
            6,
            7,
            7,
            8,
            8,
          ],
          value: [
            item.coverageDesktop,
            item.coverageMobile,
            item.coverageDesktop - (item.resultDesktopSuccess + item.resultDesktopFailure),
            item.resultDesktopSuccess,
            item.resultDesktopFailure,
            item.coverageMobile - (item.resultMobileSuccess + item.resultMobileFailure),
            item.resultMobileSuccess,
            item.resultMobileFailure,
            item.resultDesktopClicked,
            item.resultMobileClicked,
            item.resultDesktopSuccess - item.resultDesktopClicked,
            item.resultMobileSuccess - item.resultMobileClicked,
            item.resultDesktopClicked + item.resultMobileClicked,
            (item.resultDesktopSuccess - item.resultDesktopClicked) +
              (item.resultMobileSuccess - item.resultMobileClicked),
          ],
          color: [
            'rgba(0,0,96,0.2)',
            'rgba(0,0,96,0.2)',
            'rgba(0,0,96,0.2)',
            'rgba(0,0,96,0.2)',
            'rgba(0,0,96,0.2)',
            'rgba(0,0,96,0.2)',
            'rgba(0,0,96,0.2)',
            'rgba(0,0,96,0.2)',
            'rgba(0,0,96,0.2)',
            'rgba(0,0,96,0.2)',
            'rgba(0,0,96,0.2)',
            'rgba(0,0,96,0.2)',
            'rgba(0,0,96,0.2)',
            'rgba(0,0,96,0.2)',
          ],
          label: [
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
          ]
        }
      }],
      layout: {
        width: 600,
        height: 600,
        font: {
          size: 10
        },
        title: '전송 현황',
      },
      config: {
        displayModeBar: false,
      },
    };
    this.setState({
      totalSubscribersChart,
      resultChart,
      clickedChart,
      sankeyChart,
    });
  };
  handleClickControls = (clicked) => {
    switch (clicked) {
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
      resultChart,
      clickedChart,
      sankeyChart,
    } = this.state;
    if (!item) return null;
    return (
      <div>
        <ControlPanel handleClickControls={this.handleClickControls}/>
        <Wrapper title={title}>
          <div className={classes.form}>
            <Plot
              { ...resultChart }
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
        <Wrapper title="결과 상세">
          <div>
            <div className={classes.chartWrapper}>
              <Plot
                {...totalSubscribersChart}
              />
            </div>
            <div className={classes.dataTextWrapper}>
              <div className={classes.dataText}>
                <Typography align="center">
                  전달 대상 수
                </Typography>
                <Typography align="center" type="title" gutterBottom>
                  { item.coverageAll }
                </Typography>
              </div>
              <div className={classes.dataText}>
                <Typography align="center">
                  데스크탑
                </Typography>
                <Typography align="center" type="title" gutterBottom>
                  { item.coverageDesktop }
                </Typography>
              </div>
              <div className={classes.dataText}>
                <Typography align="center">
                  모바일
                </Typography>
                <Typography align="center" type="title" gutterBottom>
                  { item.coverageMobile }
                </Typography>
              </div>
            </div>
            <div className={classes.chartWrapper}>
              <Plot
                {...clickedChart}
              />
            </div>
            <div className={classes.dataTextWrapper}>
              <div className={classes.dataText}>
                <Typography align="center">
                  전송 완료
                </Typography>
                <Typography align="center" type="title" gutterBottom>
                  { item.resultSuccess }
                </Typography>
              </div>
              <div className={classes.dataText}>
                <Typography align="center">
                  클릭함
                </Typography>
                <Typography align="center" type="title" gutterBottom>
                  { item.resultClicked }
                </Typography>
              </div>
              <div className={classes.dataText}>
                <Typography align="center">
                  클릭안함
                </Typography>
                <Typography align="center" type="title" gutterBottom>
                  { item.resultSuccess - item.resultClicked }
                </Typography>
              </div>
            </div>
            <div className={classes.chartWrapper}>
              <Plot {...sankeyChart} />
            </div>
          </div>
        </Wrapper>
      </div>
    );
  }
}
export default withStyles(styles)(DataView);

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  withRouter,
} from 'react-router-dom';
import { push } from 'react-router-redux';
import Chart from 'chart.js';
import * as noticeDialogActions from '../../../../data/noticeDialog/actions';
import * as webPushSubscriptionActions from '../../../../data/webPushSubscription/actions';
import loader from '../../../../data/loader/actions';
import Background from '../../components/Background';
import FrontShow from './components/FrontShow';
import ToExample from './components/ToExample';
import ContainerA from './components/ContainerA';
import ContainerB from './components/ContainerB';
import ContainerC from './components/ContainerC';

class Front extends React.Component {
  componentDidMount() {
    const ctxChartPie = this.chartPie.getContext('2d');
    const ctxChartBar = this.chartBar.getContext('2d');
    new Chart(ctxChartPie, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [10, 85, 5],
          backgroundColor: [
            '#ffcd56',
            '#36a2eb',
            '#ff6384',
          ],
        }],
        labels: [
          '전달 중',
          '성공',
          '실패'
        ],
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: '현재 85%의 알림 성공',
        },
        maintainAspectRatio: false,
      },
    });
    let date = new Date();
    const dateLen = 5;
    date.setDate(date.getDate() - dateLen);
    const labels = [];
    for (let i = 0; i <dateLen; i += 1) {
      labels.push(`${date.getMonth()+1}월 ${date.getDate()}일`);
      const temp = new Date(date);
      temp.setDate(temp.getDate() + 1);
      date = temp;
    }
    new Chart(ctxChartBar, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: '구독 수',
          data: [
            1000,2000,4000,8000,14000,
          ],
          borderColor: '#191970',
          backgroundColor: '#36a2eb',
          fill:false,
        }],
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: '현재 구독된 수는 29,000개 입니다.',
        },
        tooltips: {
          mode: 'index',
          intersect: false,
        },
        maintainAspectRatio: false,
      },
    });
  }
  openWebPush = () => {
    // ManagerPage Send에 중복 코드
    this.props.loader(true);
    this.props.subscribeWebPush()
      .then(() => {
        this.props.loader(false);
        this.props.changePage(`/example`);
      })
      .catch(() => {
        this.props.loader(false);
        const { error } = this.props.webPushSubscription;
        this.props.notice(error);
      });
  };
  render() {
    return (
      <Background>
        <FrontShow/>
        <ToExample
          openWebPush={this.openWebPush}
        />
        <ContainerA
          title="어플리케이션이 없이 푸시 알림을 보낼 수 있습니다."
          text="더 이상 많은 비용으로 어플리케이션을 제작할 필요가 없습니다."
        />
        <ContainerA
          title="사업주님의 고객분들에 대한 도달율이 향상됩니다."
          text="고객님께서 어플리케이션을 다운 받을 필요가 없어 쉽게 고객분들께 쉽게 다가갈 수 있습니다."
        />
        <ContainerA
          title="아주 쉽고 간편하게 적용 가능합니다."
          text="웹 페이지에 스크립트를 추가하는 것만으로 적용할 수 있습니다. 고객님께서 개발 인력이 없으시다면 저희가 직접 세팅 해 드립니다."
        />
        <ContainerB
          title="알림 도달 현황을 즉각적으로 확인 가능합니다."
        >
          <canvas
            ref={ref => {this.chartPie = ref;}}
          />
        </ContainerB>
        <ContainerB
          title="알림 구독 현황을 매일 확인할 수 있습니다."
        >
          <canvas
            ref={ref => {this.chartBar = ref;}}
          />
        </ContainerB>
        <ContainerC
          title="알림에 이벤트를 추가하여 고객을 이끌 수 있습니다."
          img="/event.png"
        />
        <ContainerC
          title="고객 데이터를 기반으로 맞춤형 메세지를 보낼 수 있습니다."
          img="/seperate.png"
        />
      </Background>
    )
  }
}
const mapStateToProps = state => ({
  webPush: state.data.webPush,
  webPushSubscription: state.data.webPushSubscription,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: path => push(path),
  notice: noticeDialogActions.on,
  subscribeWebPush: webPushSubscriptionActions.subscribeWebPush,
  loader,
}, dispatch);
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Front));

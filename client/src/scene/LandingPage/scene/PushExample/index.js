import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  withRouter,
} from 'react-router-dom';
import { push } from 'react-router-redux';
import S1 from './scene/S1';
import S2 from './scene/S2';
import S3 from './scene/S3';
import S4 from './scene/S4';
import S5 from './scene/S5';
import S6 from './scene/S6';
import S7 from './scene/S7';
import S8 from './scene/S8';
import Background from '../../components/Background';
import Body from './components/Body';
import * as webPushActions from '../../../../data/webPush/actions';
import * as webPushSubscriptionActions from '../../../../data/webPushSubscription/actions';
import * as noticeDialogActions from '../../../../data/noticeDialog/actions';

const SHIRTS = [
  {
    alt: '초록 셔츠',
    src: '/shirt_green.png',
  },
  {
    alt: '파란 셔츠',
    src: '/shirt_blue.png',
  },
  {
    alt: '노란 셔츠',
    src: '/shirt_yellow.png',
  },
];
const MESSAGES = [
  '고객님 현재 배송 중입니다.',
  '이 메시지는 랜덤 생성 메시지입니다.',
  '오늘의 날씨는 맑음입니다.',
  '내일은 비가 내릴 예정입니다.',
  '배송 소요 시간은 약 2일이 소요될 예정입니다.',
  '고객님 꼭 후기를 부탁드립니다.',
  '다시 한번 방문 주시면 정말 감사드리겠습니다.',
  '오늘도 좋은 하루 되세요.',
];
let messageInterval;
class PushExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sceneNow: <S1 />,
      name: '',
      shirt: null,
      messageOption: 'stack',
    };
  }
  componentWillUnmount() {
    clearInterval(messageInterval);
  }
  componentDidMount() {
    this.props.subscribeWebPush()
      .then(() => {
        this.startScenes();
      })
      .catch(() => {
        const { error } = this.props.webPushSubscription;
        this.props.notice(error);
      });
  }
  requestPush = push => {
    this.props.webPushTestWithoutFile({ push })
  };
  changeScene = (scene) => {
    return () => this.setState({
      sceneNow: scene,
    });
  };
  startScenes = () => {
    setTimeout(this.changeScene(<S2
      onSubmit={this.S2toS3}
    />), 4000);
  };
  S2toS3 = (name) => {
    this.setState({
      name,
      sceneNow: <S3
        name={name}
        next={this.S3toS4}
      />,
    });
    this.requestPush({
      title: '회원가입을 환영합니다.',
      body: `${name}님 안녕하세요.`,
      icon: 'example_icon.png',
    });
  };
  S3toS4 = () => {
    this.setState({
      sceneNow: <S4 next={this.S4toS5} />,
    });
    this.requestPush({
      title: '신상 알림',
      body: `3종 티셔츠가 새로 입고되었습니다.`,
      icon: 'shirt.png',
    });
  };
  S4toS5 = () => {
    this.setState({
      sceneNow: <S5
        shirts={SHIRTS}
        onSubmit={this.S5toS6}
      />,
    });
  };
  S5toS6 = (shirt) => {
    let message = MESSAGES[0];
    this.setState({
      shirt,
      sceneNow: <S6
        message={message}
        next={this.S6toS7}
        messageOption={this.state.messageOption}
        onChangeMessageOption={v => this.setState({ messageOption: v, })}
      />,
    });
    const push = {
      title: '고객 센터',
      body: message,
      icon: 'support.png',
    };
    if (this.state.messageOption === 'change') { push.tag = 1; }
    if (this.state.messageOption === 'merge') { push.merge = 1; }
    this.requestPush(push);
    messageInterval = setInterval(() => {
      message = MESSAGES[Math.floor(Math.random()*MESSAGES.length)];
      this.setState({
        sceneNow: <S6
          message={message}
          next={this.S6toS7}
          messageOption={this.state.messageOption}
          onChangeMessageOption={v => this.setState({ messageOption: v, })}
        />,
      });
      const push = {
        title: '고객 센터',
        body: message,
        icon: 'support.png',
      };
      if (this.state.messageOption === 'change') { push.tag = 1; }
      if (this.state.messageOption === 'merge') { push.merge = 1; }
      this.requestPush(push);
    }, 5000);
  };
  S6toS7 = () => {
    clearInterval(messageInterval);
    const { name, shirt } = this.state;
    const shirtName = SHIRTS.find(o => o.src === shirt).alt;
    this.requestPush({
      title: '배송 알림',
      body: `${name}님 ${shirtName}의 배송이 완료되었습니다.`,
      icon: shirt,
      redirectUrl: `${window.location.origin}/event`
    });
    this.setState({
      sceneNow: <S7 next={this.S7toS8} />,
    });
  };
  S7toS8 = () => {
    const { name, shirt } = this.state;
    const shirtIndex = SHIRTS.findIndex(o => o.src === shirt);
    const shirtNow = SHIRTS[shirtIndex];
    const shirtNext = SHIRTS[(shirtIndex + 1) % SHIRTS.length];
    this.requestPush({
      title: '배송 알림',
      body: `${shirtNow.alt}를 구매하셨던 ${name}님\n${shirtNext.alt}도 구매하시면 10% 할인됩니다.`,
      icon: shirtNext.src,
    });
    this.setState({
      sceneNow: <S8
        next={() => this.props.changePage('/')}
      />,
    });
  };
  render() {
    return (
      <Background style={{ background: 'white' }}>
        <Body>
        {this.state.sceneNow}
        </Body>
      </Background>
    );
  }
}
const mapStateToProps = state => ({
  webPush: state.data.webPush,
  webPushSubscription: state.data.webPushSubscription,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: path => push(path),
  notice: noticeDialogActions.on,
  webPushTestWithoutFile: webPushActions.testWithoutFileRequest,
  subscribeWebPush: webPushSubscriptionActions.subscribeWebPush,
}, dispatch);
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(PushExample));


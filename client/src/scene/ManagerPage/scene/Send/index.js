import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  withRouter,
} from 'react-router-dom';
import { push } from 'react-router-redux';
import Wrapper from '../../components/Wrapper';
import Notification  from './../../components/Notification';
import NotificationTester from './components/NotificationTester';
import Maker from './components/Maker';
import Sender from './components/Sender';
import * as webPushSubscriptionActions from '../../../../data/webPushSubscription/actions';
import * as webPushActions from '../../../../data/webPush/actions';
import loader from '../../../../data/loader/actions';
import * as noticeDialogActions from '../../../../data/noticeDialog/actions';
import config from '../../../../config';

// Welcome과 합칠 필요 있다.
const PUSH_URL = `${config.HOST}/api/webpush/example`;
class Send extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
      redirectUrl: '',
      uploadedIconName: null,
      uploadedIconCanvas: null,
      uploadedIconCanvasUrl: null, // 속도를 위해
      croppedIconCanvas: null,
      isCropOpen: false,
    };
  }
  handleInputChange = prop => e => this.setState({
    [prop]: e.target.value,
  });
  resizeImage = (canvas) => {
    return new Promise((resolve, reject) => {
      try {
        const canvasToResize = document.createElement('canvas');
        const ctx = canvasToResize.getContext('2d');
        canvasToResize.width = 200;
        canvasToResize.height = 200;
        ctx.drawImage(
          canvas, 0, 0, 200, 200
        );
        canvasToResize.toBlob((data) => {
          resolve(data);
        });
      } catch (error) {
        reject(error);
      }
    });
  };
  handleNotificationTest = () => {
    // Front로부터의 중복 코드
    this.props.loader(true);
    this.props.subscribeWebPush()
      .then(() => {
        const {
          title,
          body,
          redirectUrl,
          icon,
          uploadedIconCanvas,
          uploadedIconName,
          isCropOpen,
          croppedIconCanvas,
        } = this.state;
        const push = {
          title,
          body,
          redirectUrl,
          icon,
        };
        new Promise((resolve, reject) => {
          if (uploadedIconCanvas) {
            // 아이콘 이미지 포함 -> 압축 -> 전송
            this.resizeImage(isCropOpen ?
              croppedIconCanvas : uploadedIconCanvas
            )
              .then((fileBlob) => {
                this.props.webPushTestWithFile(
                  { push },
                  {
                    fileBlob,
                    fileName: uploadedIconName,
                  },
                )
                  .then(() => {
                    if (this.props.webPush.testWithFile.status === 'SUCCESS') {
                      resolve();
                    } else {
                      reject();
                    }
                  })
                  .catch(() => {
                    const { error } = this.props.webPush.testWithFile;
                    reject(error);
                  });
              })
              .catch((error) => {
                reject(error);
              });
          } else {
            // 미포함
            this.props.webPushTestWithoutFile({ push })
              .then(() => {
                if (this.props.webPush.testWithoutFile.status === 'SUCCESS') {
                  resolve();
                } else {
                  reject();
                }
              })
              .catch(() => {
                const { error } = this.props.webPush.testWithoutFile;
                reject(error);
              });
          }
        })
          .then(() => {
            this.props.loader(false);
            this.props.notice({
              text: '전송 요청이 되었습니다. 잠시만 기다려주십시요.',
            });
          })
          .catch((error) => {
            this.props.loader(false);
            this.props.notice(error);
          });
      })
      .catch(() => {
        this.props.loader(false);
        const { error } = this.props.webPushSubscription;
        this.props.notice(error);
      });
  };
  handleImgUpload = e => {
    const input = e.target;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = re => {
        const img = new Image();
        img.onload = () => {
          let isCropOpen =
            img.width !== img.height;
          let data = input.files[0];
          const uploadedIconCanvas = document.createElement('canvas');
          const ctx = uploadedIconCanvas.getContext('2d');
          uploadedIconCanvas.width = img.width;
          uploadedIconCanvas.height = img.height;
          ctx.drawImage(img, 0, 0, img.width, img.height);
          this.setState({
            uploadedIconName: data.name,
            uploadedIconCanvas,
            isCropOpen,
            uploadedIconCanvasUrl: uploadedIconCanvas.toDataURL(),
          });

        };
        img.src = re.target.result;
      };
      reader.readAsDataURL(input.files[0]);
    }
  };
  handleCroppedImg = (canvas) => {
    this.setState({
      croppedIconCanvas: canvas,
    });
  };
  handleSend = () => {
    console.log('send');
  };
  render() {
    const {
      title,
      body,
      redirectUrl,
      uploadedIconCanvas,
      croppedIconCanvas,
      isCropOpen,
      uploadedIconCanvasUrl,
    } = this.state;
    const data = {
      desktop: 1000,
      mobile: 2000,
    };
    let iconUrl = '/example_icon.png';
    if (isCropOpen && croppedIconCanvas) {
      iconUrl = croppedIconCanvas.toDataURL();
    } else if (!isCropOpen && uploadedIconCanvas) {
      iconUrl = uploadedIconCanvas.toDataURL();
    }
    return (
      <div>
        <Wrapper title="알림 만들기">
          <Maker
            title={title}
            body={body}
            redirectUrl={redirectUrl}
            isCropOpen={isCropOpen}
            iconUrlNotForSend={uploadedIconCanvasUrl}
            handleInputChange={this.handleInputChange}
            handleImgUpload={this.handleImgUpload}
            handleCroppedImg={this.handleCroppedImg}
          />
        </Wrapper>
        <Wrapper title="미리보기">
          <Notification
            title={title}
            body={body}
            icon={iconUrl}
            domainUrl="https://webpush.kr (도메인)"
          />
          <NotificationTester
            handleTest={this.handleNotificationTest}
          />
        </Wrapper>
        <Wrapper title="전송">
          <Sender
            data={data}
            handleSend={this.handleSend}
          />
        </Wrapper>
      </div>
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
  webPushTestWithFile: webPushActions.testWithFileRequest,
  subscribeWebPush: webPushSubscriptionActions.subscribeWebPush,
  loader,
}, dispatch);
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Send));

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
import Setting from './components/Setting';
import Submit from './components/Submit';
import * as webPushSubscriptionActions from '../../../../data/webPushSubscription/actions';
import loader from '../../../../data/loader/actions';
import * as noticeDialogActions from '../../../../data/noticeDialog/actions';
import * as welcomeActions from '../../data/welcome/actions';
import config from '../../../../config';

// send와 합칠 필요 있다.
const WEBSITE_ID_FOR_TEST = '5888861c660a2f2dc0c0f764';
const PUSH_URL = `${config.HOST}/api/webpush/example`;
class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isUsingWelcome: false,
      title: '',
      body: '',
      redirectUrl: '',
      icon: null,
      uploadedIconName: null,
      uploadedIconCanvas: null,
      uploadedIconCanvasUrl: null, // 속도를 위해
      croppedIconCanvas: null,
      isCropOpen: false,
    };
    this.welcomeRetrieveOne();
  }
  welcomeRetrieveOne = () => {
    this.props.loader(true);
    this.props.welcomeRetrieveOne(WEBSITE_ID_FOR_TEST)
      .then(() => {
        this.props.loader(false);
        const { retrieveOne } = this.props.welcome;
        if (retrieveOne.status === 'SUCCESS') {
          const { welcome } = retrieveOne;
          this.setState({
            isUsingWelcome: true,
            title: welcome.title,
            body: welcome.body,
            redirectUrl: welcome.redirectUrl,
            icon: welcome.icon,
          });
        } else if (retrieveOne.status === 'FAILURE') {
          this.setState({ isUsingWelcome: false });
        }
      })
      .catch((error) => {
        this.props.loader(false);
        this.props.notice(error);
      })
  };
  resizeImage = (canvas) => {
    return new Promise((resolve) => {
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
    });
  };
  welcomeSaveOne = () => {
    this.props.loader(true);
    const {
      title,
      body,
      redirectUrl,
      icon,
      uploadedIconName,
      isCropOpen,
      uploadedIconCanvas,
      croppedIconCanvas,
    } = this.state;

    new Promise((resolve) => {
      if (uploadedIconCanvas) {
        this.resizeImage(isCropOpen ?
          croppedIconCanvas : uploadedIconCanvas
        )
          .then(resolve);
      } else {
        resolve(null);
      }
    })
      .then((data) => {
        this.props.welcomeSaveOne(
          WEBSITE_ID_FOR_TEST,
          {
            title,
            body,
            redirectUrl,
            icon,
          },
          data ? {
            iconBlob: data,
            name: uploadedIconName,
          } : undefined
        )
          .then(() => {
            this.props.loader(false);
            const { saveOne } = this.props.welcome;
            if (saveOne.status === 'SUCCESS') {
              this.props.notice({
                text: '설정이 완료되었습니다.',
              });
              this.welcomeRetrieveOne(WEBSITE_ID_FOR_TEST);
            } else if (saveOne.status === 'FAILURE') {
              throw saveOne.error;
            }
          })
          .catch((error) => {
            this.props.loader(false);
            this.props.notice(error);
          })
      });

  };
  welcomeRemoveOne = () => {
    this.props.loader(true);
    this.props.welcomeRemoveOne(WEBSITE_ID_FOR_TEST)
      .then(() => {
        this.props.loader(false);
        const { removeOne } = this.props.welcome;
        if (removeOne.status === 'SUCCESS') {
          this.setState({ isUsingWelcome: false });
        } else if (removeOne.status === 'FAILURE') {
          throw removeOne.error;
        }
      })
      .catch((error) => {
        this.props.loader(false);
        this.props.notice(error);
      })
  };
  handleInputChange = prop => e => this.setState({
    [prop]: e.target.value,
  });
  handleNotificationTest = () => {
    // Front로부터의 중복 코드
    this.props.loader(true);
    this.props.subscribeWebPush()
      .then(() => {
        this.props.loader(false);
        const { endpoint, keys } = this.props.webPushSubscription;
        const {
          icon,
          uploadedIconCanvas,
          uploadedIconName,
          isCropOpen,
          croppedIconCanvas,
        } = this.state;
        const dataForPush = {
          push: {
            title: this.state.title,
            body : this.state.body,
            redirectUrl: this.state.redirectUrl,
          },
          endpoint,
          keys,
        };
        if (!uploadedIconCanvas && icon) {
          dataForPush.push.icon = icon;
        }
        const config = {
          method: 'POST',
        };
        new Promise((resolve) => {
          if (uploadedIconCanvas) {
            this.resizeImage(isCropOpen ?
              croppedIconCanvas : uploadedIconCanvas
            )
              .then(resolve);
          } else {
            resolve(null);
          }
        })
          .then((blob) => {
            let data;
            if (blob) {
              data = new FormData();
              data.append(
                'icon',
                blob,
                uploadedIconName,
              );
              data.append('dataForPush', JSON.stringify(dataForPush));
            } else {
              data = JSON.stringify(dataForPush);
              config.headers = { 'Content-Type': 'application/json' };
            }

            this.props.loader(true);
            fetch(PUSH_URL, {
              ...config,
              body: data,
            })
              .then((res) => res.json())
              .then(() => {
                this.props.loader(false);
                this.props.notice({
                  text: '전송 요청이 되었습니다. 잠시만 기다려주십시요.',
                });
              })
              .catch((error) => {
                this.props.loader(false);
                console.error(error);
              });
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
      isUsingWelcome,
      title,
      body,
      redirectUrl,
      icon,
      uploadedIconCanvas,
      croppedIconCanvas,
      isCropOpen,
      uploadedIconCanvasUrl,
    } = this.state;

    let iconUrl = '/example_icon.png';
    if (isCropOpen && croppedIconCanvas) {
      iconUrl = croppedIconCanvas.toDataURL();
    } else if (!isCropOpen && uploadedIconCanvas) {
      iconUrl = uploadedIconCanvas.toDataURL();
    } else if (icon) {
      iconUrl = icon;
    }
    return (
      <div>
        <Wrapper title="설정">
          <Setting
            isUsingWelcome={isUsingWelcome}
            onChangeWelcome={(e, v) => {
              this.state.isUsingWelcome ?
                this.welcomeRemoveOne() : this.setState({
                  isUsingWelcome: v,
                })
            }}
          />
        </Wrapper>
        {
          isUsingWelcome ?
            <div>
              <Wrapper title="웰컴 알림">
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
                <Submit
                  onClick={this.welcomeSaveOne}
                />
              </Wrapper>
            </div> : null
        }
      </div>
    );
  }
}
const mapStateToProps = state => ({
  webPush: state.data.webPush,
  webPushSubscription: state.data.webPushSubscription,
  welcome: state.managerPage.data.welcome,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: path => push(path),
  notice: noticeDialogActions.on,
  subscribeWebPush: webPushSubscriptionActions.subscribeWebPush,
  welcomeRetrieveOne: welcomeActions.retrieveOneRequest,
  welcomeSaveOne: welcomeActions.saveOneRequest,
  welcomeRemoveOne: welcomeActions.removeOneRequest,
  loader,
}, dispatch);
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Welcome));

import React from 'react';
import { withStyles } from 'material-ui/styles';
import { Motion, spring } from 'react-motion';
import classNames from 'classnames';
import Typography from 'material-ui/Typography';
import prefixer from '../../../../../../modules/prefixer';

const styles = prefixer({
  frontTitle: {
    fontSize : '5vw',
    color: 'black',
  },
  frontTitleWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    margin: 'auto',
    height: '500px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  frontSubtitle: {
    fontSize : '3.5vw',
  },
  frontShow: {
    background: 'white',
    padding: '15px',
    width: 'calc(100% - 30px)',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  frontImg: {
    maxWidth: '500px',
    width: '100%',
    height: 'auto',
  },
  frontDummy: {
    width: '100%',
    visibility: 'hidden',
  },
  frontOverlay: {
    width: 'calc(100% - 30px);',
    position: 'absolute',
    left: 0,
    right: 0,
    margin: 'auto',
  },
});
const FrontImages = [{
  src: 'front1.png',
  subtitle: 'PC, 모바일 지원',
}, {
  src: 'front2.png',
  subtitle: 'PC 알림 화면',
}, {
  src: 'front3.png',
  subtitle: '모바일 알림 화면',
}, {
  src: 'front4.png',
  subtitle: '백그라운드 알림 가능',
}];

let AUTO_FRONT_IMAGE_CHANGER;
const springSettings = { stiffness: 60, damping: 13 };
class FrontShow extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      currFront: 0 ,
    };
    AUTO_FRONT_IMAGE_CHANGER = setInterval(this.changeFrontImages, 4000);

    const { classes } = this.props;

    this.fronts = [
      <div className={classNames(classes.frontTitleWrapper)}>
        <Typography
          className={classes.frontTitle}
        >
          웹 푸시 알림을 시작해보세요.
        </Typography>
      </div>,
    ];
    FrontImages.forEach((image) => {
      this.fronts.push(
        <div
          className={classNames(classes.frontOverlay)}
        >
          <img
            alt={image.src}
            className={classNames(classes.frontImg)}
            src={image.src}
          />
          <Typography
            className={classes.frontSubtitle}
          >
            {image.subtitle}
          </Typography>
        </div>
      )
    })
  };
  componentWillUnmount() {
    if (AUTO_FRONT_IMAGE_CHANGER) {
      clearInterval(AUTO_FRONT_IMAGE_CHANGER);
    }
  }
  changeFrontImages = () => {
    const len = this.fronts.length;
    let next = this.state.currFront + 1;
    if (next >= len) {
      next = 0;
    }
    this.setState({ currFront: next });
  };
  render() {
    const { classes, } = this.props;
    // default dummy image
    return (
      <div className={classes.frontShow}>
        {
          this.fronts.map((front, i) => (
            <Motion
              key={i}
              style={{
                x: spring(i === this.state.currFront ? 1 : 0, springSettings),
                y: spring(i === this.state.currFront ? 1 : 0.5, springSettings),
              }}
            >
              {({ x, y }) => (
                <front.type
                  {...front.props}
                  style={{
                    opacity: x,
                    transform: `scale(${y},${y})`
                  }}
                />
              )}
            </Motion>
          ))
        }
        <div
          className={classNames(classes.frontDummy)}
        >
          <img
            alt="웹 푸시 애니매이션"
            className={classNames(classes.frontImg)}
            src={FrontImages[0].src}
          />
          <Typography
            className={classes.frontSubtitle}
          >
            DUMMY
          </Typography>
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(FrontShow);

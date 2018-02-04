import React from 'react';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  container: {
    fontFamily: 'sans-serif',
    width: '360px',
    boxSizing: 'border-box',
    border: '1px solid #eee',
    boxShadow: '-1px 0px 8px rgba(0,0,0,0.09)',
    fontSize: '14px',
    margin: 'auto',
  },
  icon: {
    width: '77px',
    height: '77px',
    float: 'left',
    boxSizing: 'border-box',
  },
  textContainer: {
    minHeight: '77px',
    paddingBottom: '0px !important',
    padding: '6px',
    fontSize: '13px',
    boxSizing: 'border-box',
    lineHeight: '1.42857143',
    paddingLeft: '80px',
  },
  title: {
    fontWeight: 500,
    wordBreak: 'break-all',
    textOverflow: 'ellipsis',
    wordWrap: 'break-word',
    overflow: 'hidden',
    whiteSpace: 'pre',
    paddingTop: '0px',
    boxSizing: 'border-box',
  },
  body: {
    whiteSpace: 'pre-line',
    wordBreak: 'break-all',
    overflow: 'hidden',
    height: '33px',
    textOverflow: 'ellipsis',
    fontSize: '12px',
    wordWrap: 'break-word',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical',
    display: '-webkit-box !important',
    paddingTop: 2,
    boxSizing: 'border-box',
  },
  domainUrl: {
    width: '190px',
    fontSize: '11px',
    color: '#a0a0a0',
    marginTop: 2,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    boxSizing: 'border-box',
  },
});
class Notification extends React.Component {
  render() {
    const {
      classes,
      title,
      body,
      icon,
      domainUrl,
    } = this.props;
    return (
      <div>
        <div className={classes.container}>
          <div className={classes.icon}>
            <img
              alt="icon"
              src={icon ? icon : '/example_icon.png'}
              width={77}
            />
          </div>
          <div className={classes.textContainer}>
            <div className={classes.title}>
              {title ? title : '타이틀'}
            </div>
            <div className={classes.body}>
              {body ? body : '알림 메시지'}
            </div>
            <div className={classes.domainUrl}>
              {domainUrl}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(Notification);

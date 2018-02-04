import React from 'react';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

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
    flexDirection: 'column',
  },
  title: {
    paddingTop: '10px',
  },
  row: {
    display: 'flex',
    textAlign: 'center',
    padding: 10,
  },
  typo: {
    width: '33.333333%',
  },
};
class Subscribers extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Paper
          className={classes.paper}
        >
          <Typography
            className={classes.title}
            align="center"
          >
            구독 기기 현황
          </Typography>
          <div className={classes.row}>
            <Typography
              className={classes.typo}
              type="headline"
            >
              전체
            </Typography>
            <Typography
              className={classes.typo}
              type="headline"
            >
              데스크탑
            </Typography>
            <Typography
              className={classes.typo}
              type="headline"
            >
              모바일
            </Typography>
          </div>
          <div className={classes.row}>
            <Typography
              className={classes.typo}
              type="headline"
            >
              10000
            </Typography>
            <Typography
              className={classes.typo}
              type="headline"
            >
              20000
            </Typography>
            <Typography
              className={classes.typo}
              type="headline"
            >
              30000
            </Typography>
          </div>
        </Paper>
      </div>
    )
  }
}
export default withStyles(styles)(Subscribers);

import React from 'react';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import Typography from 'material-ui/Typography';
import Divider  from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import prefixer from '../../../../../../modules/prefixer';

const styles = theme => prefixer({
  container: {
    background: 'white',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
    width: '80%',
  },
  margin : {
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      margin: '0px auto',
    },
    margin: '0px auto 20px',
  },
  marginEnd: {
    margin: '0px auto',
  },
  align: {
    textAlign: 'center',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'left',
    },
  },
  title: {
    background: 'cornflowerblue',
    padding: '10px 20px 10px',
    color: 'white',
    fontSize: '1.5rem',
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.2rem',
    },
  },
  content: {
    margin: 'auto',
    maxWidth: '400px',
    padding: '30px',
    textAlign: 'center',
  },
  img: {
    width: '100%',
  },
});

class ContainerB extends React.Component{
  render() {
    const { classes, title, end, img } = this.props;
    return (
      <Paper
        className={
            classNames(classes.container, end ? classes.marginEnd : classes.margin)
        }
      >
        <Typography
          className={
            classNames(classes.title, classes.align)
          }
        >
          {title}
        </Typography>
        <Divider />
        <div className={classes.content}>
          <img
            className={classes.img}
            alt={title}
            src={img}
          />
        </div>
      </Paper>
    );
  }
}
export default withStyles(styles, { withTheme: true })(ContainerB);

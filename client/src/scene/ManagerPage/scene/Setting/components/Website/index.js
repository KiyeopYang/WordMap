import React from 'react';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import ListSubheader from 'material-ui/List/ListSubheader';
import List, { ListItem, ListItemText } from 'material-ui/List';

const styles = theme => ({
  paper: {
    padding: '15px',
  },
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 300,
  },
  listSection: {
    backgroundColor: 'inherit',
  },
});
class Website extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.paper}>
        <Typography type="title" align="left">
          웹사이트 관리
        </Typography>
        <List className={classes.root} subheader={<div />}>
            <div className={classes.listSection}>
              <ListSubheader>등록된 도메인</ListSubheader>
                <ListItem button>
                  <ListItemText
                    primary={'https://noooob.xyz'}
                    secondary={'활성화 됨'}
                  />
                </ListItem>
                <ListItem button>
                  <ListItemText
                    primary={'* 도메인을 1개만 사용 가능한 상태입니다.'}
                  />
                </ListItem>
            </div>
        </List>
      </Paper>
    );
  }
}
export default withStyles(styles)(Website);

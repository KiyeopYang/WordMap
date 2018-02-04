import React from 'react';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Drawer from 'material-ui/Drawer';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import IconTry from 'material-ui-icons/Send';
import IconPrice from 'material-ui-icons/MonetizationOn';
import IconLogin from 'material-ui-icons/AccountBox';
import IconHelp from 'material-ui-icons/Help';

const styles = theme => ({
  header: {
    zIndex: 1000,
    position: 'fixed',
    top: 0,
    width: '100%',
    height: '64px',
  },
  root: {

  },
  title: {
    flex: 1,
    cursor: 'pointer',
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  buttons: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  responsiveMenu: {
    display: 'none',
    [theme.breakpoints.down('xs')]: {
      display: 'block',
    },
  },
  list: {
    width: 250,
  },
  toolbar: {
    minHeight: 64,
    padding: '0px 24px',
  },
});
class Body extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      isDrawerOn: false,
    };
  };
  render() {
    const { classes, onSelect } = this.props;
    return (
      <div className={classes.header}>
        <AppBar
          style={{ height: '100%' }}
          position="static"
          color="primary"
          elevation={0}
        >
          <Toolbar className={classes.toolbar}>
            <Typography
              type="title"
              color="inherit"
              className={classes.title}
              onClick={() => onSelect('title')}
            >
              WEBPUSH
            </Typography>
            <Button
              className={classes.buttons}
              raised
              color="secondary"
            >
              시작해보기
            </Button>
            <Button
              className={classes.buttons}
              color="inherit"
            >
              가격
            </Button>
            <Button
              className={classes.buttons}
              color="inherit"
              onClick={() => onSelect('contact')}
            >
              문의하기
            </Button>
            <Button
              className={classes.buttons}
              color="inherit"
              onClick={() => onSelect('login')}
            >
              로그인
            </Button>
            <IconButton
              className={classes.responsiveMenu}
              color="inherit"
              onClick={() => this.setState({ isDrawerOn: true })}
            >
              <MenuIcon/>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          anchor="right"
          open={this.state.isDrawerOn}
          onClose={() => this.setState({ isDrawerOn: false })}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={() => this.setState({ isDrawerOn: false })}
            onKeyDown={() => this.setState({ isDrawerOn: false })}
          >
            <div className={classes.list}>
              <List>
                <ListItem button>
                  <ListItemIcon>
                    <IconTry/>
                  </ListItemIcon>
                  <ListItemText primary="시작해보기"/>
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <IconPrice/>
                  </ListItemIcon>
                  <ListItemText primary="가격"/>
                </ListItem>
                <ListItem
                  button
                  onClick={() => onSelect('contact')}
                >
                  <ListItemIcon>
                    <IconHelp/>
                  </ListItemIcon>
                  <ListItemText primary="문의하기"/>
                </ListItem>
              </List>
              <Divider />
              <List>
                <ListItem
                  button
                  onClick={() => onSelect('login')}
                >
                  <ListItemIcon>
                    <IconLogin/>
                  </ListItemIcon>
                  <ListItemText primary="로그인"/>
                </ListItem>
              </List>
            </div>
          </div>
        </Drawer>
      </div>
    );
  }
}
export default withStyles(styles, { withTheme: true })(Body);

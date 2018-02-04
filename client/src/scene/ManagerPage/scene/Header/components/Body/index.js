import React from 'react';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import classNames from 'classnames';
import Drawer from 'material-ui/Drawer';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import IconDashboard from 'material-ui-icons/ViewQuilt';
import IconAlarm from 'material-ui-icons/Alarm';
import IconResult from 'material-ui-icons/AssignmentTurnedIn';
import IconCustomerGroup from 'material-ui-icons/AssignmentInd';
import IconWelcome from 'material-ui-icons/Favorite';
import IconIntegration from 'material-ui-icons/DeviceHub';
import IconTry from 'material-ui-icons/Send';
import IconPrice from 'material-ui-icons/MonetizationOn';
import IconHelp from 'material-ui-icons/Help';
import IconLeft from 'material-ui-icons/ChevronLeft';

const drawerWidth = 240;
const styles = theme => ({
  root: {
    width: '100%',
    height: 430,
    marginTop: theme.spacing.unit * 3,
    zIndex: 1,
    overflow: 'hidden',
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  headerFrame: {
    position: 'fixed',
    zIndex: 1000,
    left: '0px',
    transition: theme.transitions.create(['left'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  headerFrameShift: {
    left: `${-drawerWidth}px`,
    transition: theme.transitions.create(['left'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    position: 'fixed',
    marginLeft: drawerWidth,
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
    background: '#1e232e',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    width: '100%',
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64,
    },
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: drawerWidth,
  },
  formControl: {
    marginRight: 12,
  },
  text: {
    color: 'white',
  },
  icon: {
    fill: '#E5C845',
  },
  itemHover: {
    '&:hover': {
      background: 'lightslategray',
    },
  },
});
class Body extends React.Component{
  render() {
    const {
      classes,
      title,
      open,
      email,
      website,
      handleToggle,
      handleSelect,
      children,
    } = this.props;
    return (
      <div className={classes.appFrame}>
        <div
          className={classNames(classes.headerFrame, {
            [classes.headerFrameShift]: !open,
          })}
        >
          <AppBar
            className={classNames(classes.appBar, {
              [classes.appBarShift]: open,
            })}
          >
            <Toolbar disableGutters={!open}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={() => handleToggle(true)}
                className={classNames(classes.menuButton, open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                type="title"
                color="inherit"
                noWrap
                style={{ flex: 1 }}
              >
                {title}
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            type="persistent"
            classes={{
              paper: classes.drawerPaper,
            }}
            anchor="left"
            open={open}
          >
            <div>
              <div className={classes.drawerHeader}>
                <Typography
                  type="subheading"
                  style={{
                    color: 'white',
                  }}
                >
                  Webpush Manager
                </Typography>
                <IconButton
                  color="secondary"
                  onClick={() => handleToggle(false)}
                >
                  <IconLeft />
                </IconButton>
              </div>
              <Divider />
              <List className={classes.list}>
                <ListItem
                  button
                  dense
                  onClick={() => handleSelect('세팅')}
                  className={classes.itemHover}
                >
                  <ListItemText
                    classes={{
                      primary: classes.text,
                      secondary: classes.text,
                    }}
                    primary={website}
                    secondary={email}
                    style={{ textAlign: 'center' }}
                  />
                </ListItem>
                <ListItem
                  button
                  onClick={() => handleSelect('대시보드')}
                  className={classes.itemHover}
                >
                  <ListItemIcon>
                    <IconDashboard
                      classes={{root: classes.icon }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    classes={{
                      primary: classes.text,
                    }}
                    primary="대시보드"
                  />
                </ListItem>
                <ListItem
                  button
                  onClick={() => handleSelect('알림 전송')}
                  className={classes.itemHover}
                >
                  <ListItemIcon>
                    <IconTry
                      classes={{root: classes.icon }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    classes={{
                      primary: classes.text,
                    }}
                    primary="알림 전송"
                  />
                </ListItem>
                <ListItem
                  button
                  onClick={() => handleSelect('예약된 전송')}
                  className={classes.itemHover}
                >
                  <ListItemIcon>
                    <IconAlarm
                      classes={{root: classes.icon }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    classes={{
                      primary: classes.text,
                    }}
                    primary="예약된 전송"
                  />
                </ListItem>
                <ListItem
                  button
                  onClick={() => handleSelect('전송 결과')}
                  className={classes.itemHover}
                >
                  <ListItemIcon>
                    <IconResult
                      classes={{root: classes.icon }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    classes={{
                      primary: classes.text,
                    }} primary="전송 결과"
                  />
                </ListItem>
                <ListItem
                  button
                  onClick={() => handleSelect('고객 그룹 관리')}
                  className={classes.itemHover}
                >
                  <ListItemIcon>
                    <IconCustomerGroup
                      classes={{root: classes.icon }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    classes={{
                      primary: classes.text,
                    }}
                    primary="고객 그룹 관리"
                  />
                </ListItem>
                <ListItem
                  button
                  onClick={() => handleSelect('웰컴 알림 관리')}
                  className={classes.itemHover}
                >
                  <ListItemIcon>
                    <IconWelcome
                      classes={{root: classes.icon }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    classes={{
                      primary: classes.text,
                    }}
                    primary="웰컴 알림 관리"
                  />
                </ListItem>
                <ListItem
                  button
                  onClick={() => handleSelect('연동 관리')}
                  className={classes.itemHover}
                >
                  <ListItemIcon>
                    <IconIntegration
                      classes={{root: classes.icon }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    classes={{
                      primary: classes.text,
                    }}
                    primary="연동 관리"
                  />
                </ListItem>
              </List>
              <Divider />
              <List className={classes.list}>
                <ListItem
                  button
                  onClick={() => handleSelect('결제 정보')}
                  className={classes.itemHover}
                >
                  <ListItemIcon>
                    <IconPrice
                      classes={{root: classes.icon }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    classes={{
                      primary: classes.text,
                    }}
                    primary="결제 정보"
                  />
                </ListItem>
                <ListItem
                  button
                  onClick={() => handleSelect('FAQ')}
                  className={classes.itemHover}
                >
                  <ListItemIcon>
                    <IconHelp
                      classes={{root: classes.icon }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    classes={{
                      primary: classes.text,
                    }}
                    primary="FAQ"
                  />
                </ListItem>
              </List>
            </div>
          </Drawer>
        </div>
        <div
          className={classNames(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          { children }
        </div>
      </div>
    );
  }
}
export default withStyles(styles, { withTheme: true })(Body);

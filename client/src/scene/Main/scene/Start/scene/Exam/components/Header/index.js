import React from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

const styles = {};
class Header extends React.Component {
  render() {
    const { text } = this.props;
    return (
      <div style={{ paddingBottom: '30px'}}>
        <Typography align="center">
          {text}
        </Typography>
      </div>
    );
  }
}
export default withStyles(styles)(Header);

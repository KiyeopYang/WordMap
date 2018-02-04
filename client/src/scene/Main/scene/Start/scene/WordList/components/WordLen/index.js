import React from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

const styles = {
};
class WordLen extends React.Component {
  render() {
    const {
      length,
    } = this.props;
    return (
      <div>
        <Typography type="title" align="center">
          {`${length}개의 단어`}
        </Typography>
      </div>
    )
  }
}
export default withStyles(styles)(WordLen);

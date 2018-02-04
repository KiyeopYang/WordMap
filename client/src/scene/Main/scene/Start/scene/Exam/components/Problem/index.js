import React from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

const styles = {};
class Problem extends React.Component {
  render() {
    const {
      problem,
      submits,
      handleSubmit,
    } = this.props;
    return (
      <div>
        <Typography
          type="headline"
          align="center"
          gutterBottom
        >
          { problem.word }
        </Typography>
        <div>
          <Button
            fullWidth
            color="primary"
            size="large"
            onClick={() => handleSubmit(submits[0])}
          >
            { submits[0] }
          </Button>
          <Button
            fullWidth
            color="primary"
            size="large"
            onClick={() => handleSubmit(submits[1])}
          >
            { submits[1] }
          </Button>
          <Button
            fullWidth
            color="primary"
            size="large"
            onClick={() => handleSubmit(submits[2])}
          >
            { submits[2] }
          </Button>
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(Problem);

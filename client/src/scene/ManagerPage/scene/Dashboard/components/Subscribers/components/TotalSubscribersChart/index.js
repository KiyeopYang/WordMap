import React from 'react';
import { withStyles } from 'material-ui/styles';
import Typgraphy from 'material-ui/Typography';
import Plot from 'react-plotly.js';

const styles = {};
class TotalSubscribersChart extends React.Component {
  render() {
    const { view } = this.props;
    return (
      view ?
        <Plot
          {...view}
        /> : null
    )
  }
}
export default withStyles(styles)(TotalSubscribersChart);

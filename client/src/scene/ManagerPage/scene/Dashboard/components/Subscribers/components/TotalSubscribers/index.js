import React from 'react';
import { withStyles } from 'material-ui/styles';
import Typgraphy from 'material-ui/Typography';

const styles = {};
class TotalSubscribers extends React.Component {
  render() {
    return (
      <div>
        <Typgraphy type="title" align="center">
          총 구독 : 30000
        </Typgraphy>
        <Typgraphy type="title" align="center">
          데스크탑 구독 : 15000
        </Typgraphy>
        <Typgraphy type="title" align="center">
          모바일 구독 : 15000
        </Typgraphy>
      </div>
    )
  }
}
export default withStyles(styles)(TotalSubscribers);

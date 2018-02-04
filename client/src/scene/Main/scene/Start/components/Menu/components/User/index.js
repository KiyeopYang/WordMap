import React from 'react';
import Typography from 'material-ui/Typography';

class User extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <div style={{ padding: 30 }}>
        <Typography
          type="title"
          align="center"
        >
          { user.phone }
        </Typography>
      </div>
    )
  }
}
export default User;

import React from 'react';
import Typography from 'material-ui/Typography';

class Event extends React.Component {
  render() {
    return (
      <div style={{
        zIndex: 3000,
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'black',
      }}>
        <div style={{ paddingTop: '100px' }}>
          <Typography
            type="headline"
            style={{ color: 'white' }}
            align="center"
          >
            팝업 확인용 페이지입니다.
          </Typography>
          <Typography
            style={{ color: 'white' }}
            align="center"
          >
            본 페이지는 역할이 없습니다.
          </Typography>
        </div>
      </div>
    );
  }
}
export default Event;

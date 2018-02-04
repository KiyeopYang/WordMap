import React from 'react';
import Crop from 'react-cropper';
import 'cropperjs/dist/cropper.css';

class Cropper extends React.Component {
  crop = () => {
    const canvas = this.refs.cropper.getCroppedCanvas();
    this.props.handleCroppedImg(canvas);
  };
  ready = () => {
    this.refs.cropper.zoomTo(0.1);
  };
  render() {
    const {
      icon,
    } = this.props;
    return (
      <Crop
        responsive
        viewMode={1}
        ref='cropper'
        src={icon}
        style={{height: 400, width: '100%'}}
        aspectRatio={1}
        guides={false}
        crop={this.crop}
        ready={this.ready}
      />
    );
  }
}
export default Cropper;
import React from 'react';
import Button from 'material-ui/Button';
import Dialog, {
  DialogContent, DialogActions,
} from 'material-ui/Dialog';
import './styles.css';

function FullSizeImage({ image, handleRequestClose, show }) {
  return (
    <Dialog
      open={show}
      fullScreen
      onRequestClose={handleRequestClose}
    >
      <DialogContent>
        <img className="imgFullScreen" src={image} alt="FullSize" />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleRequestClose} color="primary">
          닫기
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default FullSizeImage;

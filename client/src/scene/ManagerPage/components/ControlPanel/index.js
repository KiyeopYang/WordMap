import React from 'react';
import Button from 'material-ui/Button';
import ArrowBackIcon from 'material-ui-icons/ArrowBack';
import RemoveIcon from 'material-ui-icons/Delete';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    width: 36,
    height: 36
  },
});
function ControlPanel(
  {
    classes,
    handleClickControls,
    remove,
  }) {
  return (
    <div>
      <Button
        fab
        color="primary"
        aria-label="arrowBack"
        className={classes.button}
        onClick={() => handleClickControls('goBack')}
      >
        <ArrowBackIcon />
      </Button>
      {
        remove ?
          <Button
            fab
            color="primary"
            aria-label="removeOne"
            className={classes.button}
            onClick={() => handleClickControls('removeOne')}
          >
            <RemoveIcon />
          </Button> : null
      }
    </div>
  );
}
export default withStyles(styles)(ControlPanel);

import React from 'react';
import { withStyles } from 'material-ui/styles';
import { ListItem, ListItemText } from 'material-ui/List';
import Typography from 'material-ui/Typography';

const styles = {
  remove: {
    cursor: 'pointer',
  },
};
class Word extends React.Component {
  render() {
    const {
      classes,
      word,
      meaning,
      remove,
    } = this.props;
    return (
      <ListItem>
        <ListItemText
          primary={word}
          secondary={meaning}
        />
        {
          remove ?
            <Typography
              type="button"
              className={classes.remove}
              onClick={remove}
            >
              삭제
            </Typography> : null
        }
      </ListItem>
    )
  }
}
export default withStyles(styles)(Word);

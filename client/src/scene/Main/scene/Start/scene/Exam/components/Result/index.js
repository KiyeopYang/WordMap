import React from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Button from 'material-ui/Button';

const styles = {
  list: {
    width: '100%',
  },
};
class Result extends React.Component {
  render() {
    const {
      classes,
      results,
      handleSubmit,
    } = this.props;
    const correctN = results.filter(o => o.correct).length;
    return (
      <div>
        <Typography
          type="title"
          align="center"
        >
          {`${correctN}/${results.length}`}
        </Typography>
        <List className={classes.list}>
          {
            results.map((o, i) => {
              return (
                <ListItem key={`${o.word}${i}`}>
                  <ListItemText
                    primary={o.word}
                    secondary={o.meaning}
                  />
                  {
                    !o.correct ?
                      <Typography type="button">
                        틀림
                      </Typography> : null
                  }
                </ListItem>
              )
            })
          }
        </List>
        <Button
          raised
          color="primary"
          fullWidth
          onClick={handleSubmit}
        >
          제출
        </Button>
      </div>
    );
  }
}
export default withStyles(styles)(Result);

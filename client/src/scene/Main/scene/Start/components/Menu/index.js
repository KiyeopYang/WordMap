import React from 'react';
import Card from 'material-ui/Card';
import { withStyles } from 'material-ui/styles';
import User from './components/User';
import Word from './components/Word';
import Game from './components/Game';

const styles = {
  menu: {
  },
};
class Menu extends React.Component {
  render() {
    const {
      classes,
      user,
      wordLength,
      handleMenu,
    } = this.props;
    return (
      <Card className={classes.menu}>
        <User user={user}/>
        <Word
          length={wordLength}
          handleClick={handleMenu}
        />
        <Game
          disabled={wordLength < 20}
          handleClick={handleMenu}
        />
      </Card>
    )
  }
}
export default withStyles(styles)(Menu);

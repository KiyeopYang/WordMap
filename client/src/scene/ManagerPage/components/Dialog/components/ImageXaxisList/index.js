import React from 'react';
import { withStyles } from 'material-ui/styles';
import { GridList, GridListTile } from 'material-ui/GridList';
import './styles.css';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    background: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  tile: {
    cursor: 'pointer',
  },
});
function ImageXaxisList(props) {
  const { classes, images, handleClickImage } = props;
  return (
    <div className={classes.root}>
      <GridList
        className={classes.gridList}
        spacing={10}
        rows={1}
        cols={1}
        cellHeight={500}
      >
        {images.map(img => (
          <GridListTile
            className={classes.tile}
            key={img}
            onClick={() => handleClickImage(img)}
          >
            <img src={img} className="imageXaxisList" alt="imgTile" />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
export default withStyles(styles)(ImageXaxisList);

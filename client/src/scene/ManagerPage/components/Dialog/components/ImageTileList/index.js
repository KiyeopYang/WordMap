import React from 'react';
import { withStyles } from 'material-ui/styles';
import Dialog, { DialogContent, DialogActions } from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import ZoomIcon from 'material-ui-icons/Search';
import { GridList, GridListTile, GridListTileBar } from 'material-ui/GridList';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    background: theme.palette.background.paper,
  },
  gridList: {
    width: 800,
    height: 450,
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  tileBase: {
    cursor: 'pointer',
    border: '3px solid transparent',
  },
  tileSelected: {
    cursor: 'pointer',
    border: '3px solid coral',
  },
  titleBar: {
    background: 'none',
  },
});
class ImageTileList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit() {
    this.props.handleRequestClose();
    this.props.handleImageSelect(this.state.selected);
  }
  render() {
    const {
      dialog,
      selection,
      classes,
      show,
      images,
      handleRequestClose,
      handleOpenFullSizeImage
    } = this.props;
    const content = (
      <div className={classes.root}>
        <GridList cellHeight={200} spacing={7} className={classes.gridList}>
          {images.map((img) => {
            const index = this.state.selected.findIndex(o => o === img);
            const included = index > -1;
            return (
              <GridListTile
                classes={
                  { tile: included && selection ? classes.tileSelected : classes.tileBase }
                }
                key={img}
                cols={1}
                rows={1}
                onClick={selection ?
                  () => this.setState((prev) => {
                    const state = prev;
                    if (!included) {
                      state.selected.push(img);
                    } else {
                      state.selected.splice(index, 1);
                    }
                    return state;
                  }) : null}
              >
                <img src={img} alt={img} />
                <GridListTileBar
                  title=""
                  titlePosition="bottom"
                  actionIcon={
                    <IconButton onClick={() => handleOpenFullSizeImage(img)}>
                      <ZoomIcon color="black" />
                    </IconButton>
                  }
                  actionPosition="right"
                  className={classes.titleBar}
                />
              </GridListTile>
            );
          })}
        </GridList>
      </div>
    );
    return dialog ? (
      <Dialog
        open={show}
        onRequestClose={handleRequestClose}
      >
        <DialogContent>
          { content }
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleSubmit} color="primary">
            선택
          </Button>
          <Button onClick={handleRequestClose} color="primary">
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    ) : content;
  }
}
export default withStyles(styles)(ImageTileList);

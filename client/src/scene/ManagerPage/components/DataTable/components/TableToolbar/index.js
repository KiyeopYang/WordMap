import React from 'react';
import classNames from 'classnames';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import RemoveIcon from 'material-ui-icons/Delete';
// import FilterListIcon from 'material-ui-icons/FilterList';

const styles = theme => ({
  root: {
    paddingRight: 2,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.A700,
        backgroundColor: theme.palette.secondary.A100,
      }
      : {
        color: theme.palette.secondary.A100,
        backgroundColor: theme.palette.secondary.A700,
      },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});
const AdminTableToolbar = (props) => {
  const {
    title, numSelected, classes, handleClickControls
  } = props;
  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography type="subheading">{numSelected}개 선택</Typography>
        ) : (
          <Typography type="title">{title}</Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title="삭제">
            <IconButton
              aria-label="Remove"
              onClick={() => handleClickControls('removeMany')}
            >
              <RemoveIcon />
            </IconButton>
          </Tooltip>
        ) : (
          null
        )}
      </div>
    </Toolbar>
  );
  // 툴바에 필터링 버튼 추가
  // return (
  //   <Toolbar
  //     className={classNames(classes.root, {
  //       [classes.highlight]: numSelected > 0,
  //     })}
  //   >
  //     <div className={classes.title}>
  //       {numSelected > 0 ? (
  //         <Typography type="subheading">{numSelected}개 선택</Typography>
  //       ) : (
  //         <Typography type="title">{title}</Typography>
  //       )}
  //     </div>
  //     <div className={classes.spacer} />
  //     <div className={classes.actions}>
  //       {numSelected > 0 ? (
  //         <Tooltip title="삭제">
  //           <IconButton aria-label="Delete">
  //             <DeleteIcon />
  //           </IconButton>
  //         </Tooltip>
  //       ) : (
  //         <Tooltip title="필터링">
  //           <IconButton aria-label="Filter list">
  //             <FilterListIcon />
  //           </IconButton>
  //         </Tooltip>
  //       )}
  //     </div>
  //   </Toolbar>
  // );
};
export default withStyles(styles)(AdminTableToolbar);

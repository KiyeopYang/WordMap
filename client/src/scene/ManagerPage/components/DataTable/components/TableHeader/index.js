import React from 'react';
import {
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
} from 'material-ui/Table';
import Checkbox from 'material-ui/Checkbox';
import Tooltip from 'material-ui/Tooltip';

class AdminTableHeader extends React.Component {
  constructor(props) {
    super(props);
    this.createSortHandler = this.createSortHandler.bind(this);
  }
  createSortHandler(prop) {
    return (event) => {
      this.props.onRequestSort(event, prop);
    };
  }
  render() {
    const {
      allowSelection,
      allowSort,
      dataMap,
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount,
    } = this.props;
    //     padding: 4px 4px 4px 24px;
    return (
      <TableHead>
        <TableRow>
          {
            allowSelection ?
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={numSelected > 0 && numSelected < rowCount}
                  checked={numSelected === rowCount}
                  onChange={onSelectAllClick}
                />
              </TableCell> : null
          }
          {
            dataMap && dataMap.size ?
              Array.from(dataMap.values()).map(value => (
                <TableCell
                  key={value.label}
                  padding="dense"
                  numeric={value.numeric}
                >
                  {
                    allowSort ?
                      <Tooltip
                        title="정렬"
                        placement={value.numeric ? 'bottom-end' : 'bottom-start'}
                        enterDelay={300}
                      >
                        <TableSortLabel
                          active={orderBy === value.key}
                          direction={order}
                          onClick={this.createSortHandler(value.key)}
                        >
                          {value.label}
                        </TableSortLabel>
                      </Tooltip> : value.label
                  }
                </TableCell>
              )) : null
          }
        </TableRow>
      </TableHead>
    );
  }
}
export default AdminTableHeader;

import React from 'react';
import keycode from 'keycode';
import { withStyles } from 'material-ui/styles';
import Table, {
  TableBody,
  TableCell,
  TableRow,
  TableFooter,
  TablePagination,
} from 'material-ui/Table';
import CheckBox from 'material-ui/Checkbox';
import Paper from 'material-ui/Paper';
import TableToolbar from './components/TableToolbar';
import TableHeader from './components/TableHeader';

const styles = theme => ({
  root: {
    width: '100%',
  },
  table: {
    minWidth: 800,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  row: {
    cursor: 'pointer',
  },
});
class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: 'asc',
      orderBy: '',
      selected: [],
      page: 0,
      rowsPerPage: 10,
      data: [],
      allowSelection: false,
    };
    if (
      this.props.data &&
      this.props.data.length &&
      this.props.dataMap &&
      this.props.dataMap.size
    ) {
      this.state.orderBy = this.props.dataMap.values().next().value;
      this.state.data = this.props.data;
    }
    this.handleRequestSort = this.handleRequestSort.bind(this);
    this.handleSelectAllClick = this.handleSelectAllClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    this.isSelected = this.isSelected.bind(this);
    this.handleClickControls = this.handleClickControls.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (
      (nextProps.data &&
      nextProps.data.length &&
      nextProps.dataMap &&
      nextProps.dataMap.size) ||
        this.props.data.length !== nextProps.data.length
    ) {
      this.setState({
        orderBy: nextProps.dataMap.values().next().value,
        data: nextProps.data,
        selected: [],
        page: 0,
        allowSelection: false,
      });
    }
  }
  handleRequestSort(event, prop) {
    const orderBy = prop;
    let order = 'desc';
    if (this.state.orderBy === prop && this.state.order === 'desc') {
      order = 'asc';
    }
    const data =
      order === 'desc'
        ? this.state.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
        : this.state.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));
    this.setState({ data, order, orderBy });
  }
  handleSelectAllClick(event, checked) {
    if (this.state.allowSelection) {
      if (checked) {
        this.setState({ selected: this.state.data });
        return;
      }
      this.setState({ selected: [] });
    }
  }
  handleKeyDown(event, item) {
    if (keycode(event) === 'space') {
      this.handleClick(event, item);
    }
  }
  handleClick(event, item) {
    if (this.state.allowSelection) {
      const { selected } = this.state;
      const selectedIndex = selected.findIndex(o => o._id === item._id);
      let newSelected = [];
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, item);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selectedIndex - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1),
        );
      }
      this.setState({ selected: newSelected });
    } else {
      this.props.handleClickItem(item);
    }
  }
  handleChangePage(event, page) {
    this.setState({ page });
  }
  handleChangeRowsPerPage(event) {
    this.setState({ rowsPerPage: event.target.value });
  }
  isSelected(item) {
    return this.state.selected.findIndex(o => o._id === item._id) !== -1;
  }
  handleClickControls(clicked) {
    switch (clicked) {
      case 'allowSelection':
        this.setState({
          allowSelection: !this.state.allowSelection,
          selected: [],
        });
        break;
      case 'removeMany':
        this.props.handleClickControls(clicked, this.state.selected);
        break;
      default:
        this.props.handleClickControls(clicked);
    }
  }
  render() {
    const {
      classes,
      title,
      dataMap,
    } = this.props;
    const {
      data,
      order,
      orderBy,
      selected,
      rowsPerPage,
      page,
    } = this.state;
    return (
      <div>
        <Paper className={classes.root}>
          <TableToolbar
            numSelected={selected.length}
            title={title}
            handleClickControls={this.handleClickControls}
          />
          <div className={classes.tableWrapper}>
            <Table className={classes.table}>
              <TableHeader
                dataMap={dataMap}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={this.handleSelectAllClick}
                onRequestSort={this.handleRequestSort}
                rowCount={data.length}
                allowSelection={this.state.allowSelection}
                allowSort
              />
              <TableBody>
                {
                  data.slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage).map((row) => {
                    const isSelected = this.isSelected(row);
                    const cells = [];
                    if (this.state.allowSelection) {
                      cells.push(
                        <TableCell
                          key="checkbox"
                          padding="checkbox"
                        >
                          <CheckBox checked={isSelected} />
                        </TableCell>
                      );
                    }
                    Array.from(dataMap.keys()).forEach((key) => {
                      const value = dataMap.get(key);
                      cells.push(
                        <TableCell
                          key={key}
                          padding={'dense'}
                          numeric={value.numeric}
                        >
                          {value.tableFunc ? value.tableFunc(row[key]) : row[key]}
                        </TableCell>
                      );
                      }
                    );
                    return (
                      <TableRow
                        hover
                        className={classes.row}
                        onClick={event => this.handleClick(event, row)}
                        onKeyDown={event => this.handleKeyDown(event, row)}
                        role="checkbox"
                        aria-checked={isSelected}
                        tabIndex={-1}
                        key={row._id}
                        selected={isSelected}
                      >
                        {cells}
                      </TableRow>
                    );
                  })
                }
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    rowsPerPageOptions={[10, 25, 50, 100]}
                    labelRowsPerPage="페이지당 행 개수"
                    labelDisplayedRows={({ from, to, count }) => (`${from}행부터 ${to}행, 총 ${count}개`)}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </Paper>
      </div>
    );
  }
}
export default withStyles(styles)(DataTable);

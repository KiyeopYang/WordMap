import React from 'react';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

class List extends React.Component {
  render() {
    const { list } = this.props;
    return (
      <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>이름</TableCell>
              <TableCell>가격</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              list.map(o => (
                <TableRow key={`${o.name}${o.price}`}>
                  <TableCell>{o.name}</TableCell>
                  <TableCell>{o.price}</TableCell>
                </TableRow>
                ))
            }
          </TableBody>
        </Table>
      </div>
    );
  }
}
export default List;

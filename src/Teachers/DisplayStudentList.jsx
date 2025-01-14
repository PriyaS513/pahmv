import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';

const columns = [
  {
    id: 'select',
    label: '',
    minWidth: 50,
    align: 'center',
  },
  { id: 'regid', label: 'Reg Id'},
  { id: 'rollNo', label: 'Roll No'},
  {
    id: 'name',
    label: 'name',
  },
  {
    id: 'sclass',
    label: 'Class',
  },
  {
    id: 'actions',
    label: 'Actions', 
  },
];

function createData(regid, rollNo, name, sclass) {
  
  return { regid, rollNo, name, sclass };
}

const rows = [
  createData('S0121212', '34', 'AAAA', 3),
  createData('S0121212', '43', 'AAAA', 9),
  createData('S0121212', '35', 'AAAA', 3),
  createData('S0121212', '23', 'AAAA', 2),
  createData('S0121212', '65', 'AAAA', 3),
  createData('S0121212', '54', 'AAAA', 2),
  createData('S0121212', '45', 'AAAA', 2),
  createData('S0121212', '55', 'AAAA', 2),
  createData('S0121212', '55', 'AAAA', 2),
  createData('S0121212', '55', 'AAAA', 2),
  createData('S0121212', '55', 'AAAA', 2),
  createData('S0121212', '55', 'AAAA', 2),
  createData('S0121212', '55', 'AAAA', 2),
  createData('S0121212', '93', 'AAAA', 2),
  createData('S0121212', '1', 'AAAA', 2),
];
 function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selected, setSelected] = React.useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.code);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, code) => {
    const selectedIndex = selected.indexOf(code);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, code);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleEdit = (row) => {
    console.log(`Edit row: ${row.name}`);
  };

  const handleDelete = (row) => {
    console.log(`Delete row: ${row.name}`);
  };

  return (
    <div id="StudentList">
      <Paper sx={{ width: '100%', overflow:'hidden' }}>
        <TableContainer sx={{ maxHeight: 600 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={selected.length > 0 && selected.length < rows.length}
                    checked={selected.length === rows.length}
                    onChange={handleSelectAllClick}
                    inputProps={{ 'aria-label': 'elect all desserts' }}
                  />
                </TableCell>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
               .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
               .map((row) => {
                  const isSelected = selected.indexOf(row.code)!== -1;
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                      selected={isSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isSelected}
                          onChange={(event) => handleClick(event, row.code)}
                          inputProps={{ 'aria-label': 'elect dessert' }}
                        />
                      </TableCell>
                      {columns.map((column) => {
                        if (column.id === 'actions') {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <Button sx={{ color: 'green' }} onClick={() => handleEdit(row)}>Edit</Button>
                              <Button sx={{ color: 'red' }} onClick={() => handleDelete(row)}>Delete</Button>
                            </TableCell>
                          );
                        }
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                             ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

export default StickyHeadTable;
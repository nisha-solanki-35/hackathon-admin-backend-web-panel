/* eslint-disable react/jsx-key */
import * as React from 'react'
import PropTypes from 'prop-types'
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import TableFooter from '@mui/material/TableFooter'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import IconButton from '@mui/material/IconButton'
import FirstPageIcon from '@mui/icons-material/FirstPage'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import LastPageIcon from '@mui/icons-material/LastPage'
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead } from '@mui/material'
import Iconify from './Iconify'
import { Link } from 'react-router-dom'

function TablePaginationActions (props) {
  const theme = useTheme()
  const { count, page, rowsPerPage, onPageChange } = props

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0)
  }

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1)
  }

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1)
  }

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
  }

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  )
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
}

function ListTable (props) {
  const { viewLink, rows, cell, heading, length, page, setStart, setPage, rowsPerPage, setRowsPerPage, onDelete } = props

  const handleChangePage = (event, newPage) => {
    setStart(newPage * rowsPerPage)
    setPage(newPage)
  }
  console.log('rows', rows)

  const handleChangeRowsPerPage = (event) => {
    setStart(0)
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            {heading?.map((headingData, index) => <TableCell>{headingData}</TableCell>)}
          </TableRow>
        </TableHead>
        {rows?.length !== 0
          ? <TableBody>
          {rows?.map((row, index) => (
            <TableRow>
              {cell?.map(data2 =>
                data2 !== '_id' && <TableCell>
                {row[data2]}
              </TableCell>)}
              <TableCell>
                <Link to={viewLink + row._id} style={{ textDecoration: 'none' }}><Iconify icon="carbon:view-filled" />View</Link>
                <Button onClick={() => onDelete(row._id)}><Iconify icon="fluent:delete-32-regular" style={{ fontSize: '20px' }}/></Button>
              </TableCell>
            </TableRow>
          ))}

          {/* {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )} */}
        </TableBody>
          : <p style={{ textAlign: 'right', fontSize: '20px', fontWeight: 'bolder', padding: '70px 0' }}>Data not available</p>}
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'length per page'
                },
                native: true
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  )
}

ListTable.propTypes = {
  length: PropTypes.bool,
  page: PropTypes.number,
  setStart: PropTypes.func,
  setPage: PropTypes.func,
  rowsPerPage: PropTypes.bool,
  setRowsPerPage: PropTypes.func,
  rows: PropTypes.object,
  cell: PropTypes.array,
  heading: PropTypes.array,
  viewLink: PropTypes.string,
  onDelete: PropTypes.func
}

export default ListTable

import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import Loader from 'src/components/Loader'
import { deleteVendor, getVendorList } from 'src/API/vendor'
import { useMutation, useQuery } from 'react-query'
import ListTable from 'src/components/ListTable'
import MessagePopup from 'src/components/MessagePopup'

function VendorManagement (props) {
  const { search: searchProp } = props
  const [isOpen, setIsOpen] = useState(false)
  const [start, setStart] = useState(0)
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [rows, setRows] = useState([])
  const [search, setSearch] = useState('')
  const token = localStorage.getItem('token')

  const { mutate: deleteV, isError: isErrorDelete, error: deleteError, isLoading: deleteLoading, data: deletedData, status: deletionStatus } = useMutation('DeleteVendor', deleteVendor)
  const { data: vendorList, status } = useQuery(
    ['GetVendorList', page, rowsPerPage, search, deletedData?.data?.status === 200],
    () => getVendorList({ start, limit: rowsPerPage, search, token }),
    { retry: false }
  )

  const previousProps = useRef({ vendorList, searchProp }).current

  useEffect(() => {
    if (previousProps.vendorList !== vendorList) {
      if (vendorList?.results) {
        const list = vendorList?.results?.map(data => createData(data.sName || '--', data.sEmail || '--', data.sMobileNo || '--', data.eStatus ? 'Yes' : 'No', data._id))
        setRows(list)
      }
    }
    return () => {
      previousProps.vendorList = vendorList
    }
  }, [vendorList])

  useEffect(() => {
    const callSearchService = () => {
      setSearch(searchProp.trim())
      setPage(0)
    }
    if (previousProps.searchProp !== searchProp) {
      const debouncer = setTimeout(() => {
        callSearchService()
      }, 1000)
      return () => {
        clearTimeout(debouncer)
        previousProps.searchProp = searchProp
      }
    }
    return () => {
      previousProps.searchProp = searchProp
    }
  }, [searchProp])

  function createData (sName, sEmail, sMobileNo, eStatus, _id) {
    return { sName, sEmail, sMobileNo, eStatus, _id }
  }

  useEffect(() => {
    if ((deletionStatus === 'success' && deletedData?.data?.status === 200) || deleteError) {
      setIsOpen(true)
    }
  }, [deletionStatus])

  const onDelete = (vendorId) => {
    deleteV({ vendorId })
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  return (rows
    ? <>
      <Loader isOpen={deleteLoading}/>
      <MessagePopup isOpen={isOpen} error={isErrorDelete} successMsg={deletedData} handleClose={handleClose} />
      <ListTable
        onDelete={onDelete}
        viewLink={'/vendor-management/update-vendor/'}
        rows={rows}
        heading={['Name', 'Email', 'Mobile', 'Status', 'Actions']}
        cell={rows?.length !== 0 && Object.keys(rows[0])}
        length={vendorList?.nTotal}
        page={page}
        start={start}
        setStart={setStart}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
      />
      </>
      // ? <TableContainer component={Paper}>
      //   <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
      //     {rows?.length !== 0
      //       ? <TableBody>
      //       {(rowsPerPage > 0
      //         ? rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      //         : rows
      //       )?.map((row) => (
      //         <TableRow key={row?.sEmail}>
      //           <TableCell component="th" scope="row">
      //             {row?.sEmail}
      //           </TableCell>
      //           <TableCell style={{ width: 160 }} align="right">
      //             {row?.sName}
      //           </TableCell>
      //         </TableRow>
      //       ))}

    //       {emptyRows > 0 && (
    //         <TableRow style={{ height: 53 * emptyRows }}>
    //           <TableCell colSpan={6} />
    //         </TableRow>
    //       )}
    //     </TableBody>
    //       : <p style={{ textAlign: 'center', fontSize: '20px', fontWeight: 'bolder', padding: '70px 0' }}>Data not available</p>}
    //     <PaginationComponent
    //       length={data?.nTotal}
    //       page={page}
    //       start={start}
    //       setStart={setStart}
    //       setPage={setPage}
    //       rowsPerPage={rowsPerPage}
    //       setRowsPerPage={setRowsPerPage}
    //     />
    //   </Table>
    // </TableContainer>
    : <Loader isOpen={status === 'loading'} />)
}

VendorManagement.propTypes = {
  search: PropTypes.search
}

export default VendorManagement

import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import Loader from 'src/components/Loader'
import { deleteScreen, getScreenList } from 'src/API/screen'
import { useMutation, useQuery } from 'react-query'
import ListTable from 'src/components/ListTable'
import MessagePopup from 'src/components/MessagePopup'

function ScreenManagement (props) {
  const { search: searchProp } = props
  const [isOpen, setIsOpen] = useState(false)
  const [start, setStart] = useState(0)
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [rows, setRows] = useState([])
  const [search, setSearch] = useState('')
  const token = localStorage.getItem('token')

  const { mutate: deleteV, isError: isErrorDelete, error: deleteError, isLoading: deleteLoading, data: deletedData, status: deletionStatus } = useMutation('DeleteScreen', deleteScreen)
  const { data: screenList, status } = useQuery(
    ['GetScreenList', page, rowsPerPage, search, deletedData?.data?.status === 200],
    () => getScreenList({ start, limit: rowsPerPage, search, token }),
    { retry: false }
  )

  const previousProps = useRef({ screenList, searchProp }).current

  useEffect(() => {
    if (previousProps.screenList !== screenList) {
      if (screenList?.results) {
        const list = screenList?.results?.map(data => createData(data.sName || '--', data.sEmail || '--', data.sMobileNo || '--', data.eStatus ? 'Yes' : 'No', data._id))
        setRows(list)
      }
    }
    return () => {
      previousProps.screenList = screenList
    }
  }, [screenList])

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

  const onDelete = (screenId) => {
    deleteV({ screenId, token })
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
        viewLink={'/screen-management/update-screen/'}
        rows={rows}
        heading={['Name', 'Email', 'Mobile', 'Status', 'Actions']}
        cell={rows?.length !== 0 && Object.keys(rows[0])}
        length={screenList?.nTotal}
        page={page}
        start={start}
        setStart={setStart}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
      />
      </>
    : <Loader isOpen={status === 'loading'} />)
}

ScreenManagement.propTypes = {
  search: PropTypes.search
}

export default ScreenManagement

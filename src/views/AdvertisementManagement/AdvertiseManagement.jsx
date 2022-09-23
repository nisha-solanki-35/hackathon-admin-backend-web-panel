import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import Loader from 'src/components/Loader'
import { useMutation, useQuery } from 'react-query'
import ListTable from 'src/components/ListTable'
import MessagePopup from 'src/components/MessagePopup'
import { deleteAdvertisement, getAdvertisementList } from 'src/API/advertisement'

function AdvertiseManagement (props) {
  const { search: searchProp } = props
  const [isOpen, setIsOpen] = useState(false)
  const [start, setStart] = useState(0)
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [rows, setRows] = useState([])
  const [search, setSearch] = useState('')
  const token = localStorage.getItem('token')

  const { mutate: deleteV, isError: isErrorDelete, error: deleteError, isLoading: deleteLoading, data: deletedData, status: deletionStatus } = useMutation('DeleteAdvertisment', deleteAdvertisement)
  const { data: advertisementList, status } = useQuery(
    ['GetAdvertismentList', page, rowsPerPage, search, deletedData?.data?.status === 200],
    () => getAdvertisementList({ start, limit: rowsPerPage, search, token }),
    { retry: false }
  )

  const previousProps = useRef({ advertisementList, searchProp }).current

  useEffect(() => {
    if (previousProps.advertisementList !== advertisementList) {
      if (advertisementList?.results) {
        const list = advertisementList?.results?.map(data => createData(data.sName || '--', data.sEmail || '--', data.sMobileNo || '--', data.eStatus ? 'Yes' : 'No', data._id))
        setRows(list)
      }
    }
    return () => {
      previousProps.advertisementList = advertisementList
    }
  }, [advertisementList])

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

  const onDelete = (advertisementId) => {
    deleteV({ advertisementId, token })
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
        length={advertisementList?.nTotal}
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

AdvertiseManagement.propTypes = {
  search: PropTypes.search
}

export default AdvertiseManagement
import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import Loader from 'src/components/Loader'
import { useMutation, useQuery } from 'react-query'
import ListTable from 'src/components/ListTable'
import MessagePopup from 'src/components/MessagePopup'
import { deleteTag, getTagList } from 'src/API/tag'

function TagManagement (props) {
  const { search: searchProp } = props
  const [isOpen, setIsOpen] = useState(false)
  const [start, setStart] = useState(0)
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [rows, setRows] = useState([])
  const [search, setSearch] = useState('')
  const token = localStorage.getItem('token')

  const { mutate: deleteV, isError: isErrorDelete, error: deleteError, isLoading: deleteLoading, data: deletedData, status: deletionStatus } = useMutation('TagAdvertisment', deleteTag)
  const { data: TagList, status } = useQuery(
    ['GetTagList', page, rowsPerPage, search, deletedData?.data?.status === 200],
    () => getTagList({ start, limit: rowsPerPage, search, token }),
    { retry: false }
  )

  const previousProps = useRef({ TagList, searchProp }).current

  useEffect(() => {
    if (previousProps.TagList !== TagList) {
      if (TagList?.length !== 0) {
        const list = TagList?.map(data => createData(data.sName || '--', data.eStatus ? 'Yes' : 'No', data._id))
        setRows(list)
      }
    }
    return () => {
      previousProps.TagList = TagList
    }
  }, [TagList])

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

  function createData (sName, eStatus, _id) {
    return { sName, eStatus, _id }
  }

  useEffect(() => {
    if ((deletionStatus === 'success' && deletedData?.data?.status === 200) || deleteError) {
      setIsOpen(true)
    }
  }, [deletionStatus])

  const onDelete = (tagId) => {
    deleteV({ tagId, token })
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
        viewLink={'/tag-management/update-tag/'}
        rows={rows}
        heading={['Name', 'Status', 'Actions']}
        cell={rows?.length !== 0 && Object.keys(rows[0])}
        length={TagList?.nTotal}
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

TagManagement.propTypes = {
  search: PropTypes.search
}

export default TagManagement

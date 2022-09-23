import React, { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from 'src/components/Header'
// import PropTypes from 'prop-types'
import TagDetails from './TagDetails'

function TagDetailsIndex () {
  const params = useParams()
  const [isUpdate, setIsUpdate] = useState(false)
  const [tagId, setTagId] = useState('')

  useEffect(() => {
    if (params?.tagId) {
      setIsUpdate(true)
      setTagId(params?.tagId)
    }
  }, [params])

  return (
    <Fragment>
      <Header title={isUpdate ? 'Tag Details/ Update Tag' : 'Create Tag'} />
      <TagDetails
        isUpdate={isUpdate}
        setIsUpdate={setIsUpdate}
        tagId={tagId}
        setTagId={setTagId}
      />
    </Fragment>
  )
}

TagDetailsIndex.propTypes = {}

export default TagDetailsIndex

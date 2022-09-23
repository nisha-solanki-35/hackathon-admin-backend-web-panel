import React, { Fragment, useState } from 'react'
import Header from 'src/components/Header'
import TagManagement from './TagManagement'

function TagIndex () {
  const [search, setSearch] = useState('')

  const handleOnChange = (event) => {
    setSearch(event.target.value)
  }

  return (
    <Fragment>
      <Header
        title='Tag Management'
        addLink='/tag-management/create-tag'
        handleOnChange={handleOnChange}
      />
      <TagManagement
        search={search}
      />
    </Fragment>
  )
}

export default TagIndex

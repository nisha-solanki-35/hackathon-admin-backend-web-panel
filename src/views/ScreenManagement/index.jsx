import React, { Fragment, useState } from 'react'
import Header from 'src/components/Header'
import ScreenManagement from './ScreenManagement'

function ScreenIndex () {
  const [search, setSearch] = useState('')

  const handleOnChange = (event) => {
    setSearch(event.target.value)
  }

  return (
    <Fragment>
      <Header
        title='Screen Management'
        addLink='/screen-management/create-screen'
        handleOnChange={handleOnChange}
      />
      <ScreenManagement
        search={search}
      />
    </Fragment>
  )
}

export default ScreenIndex

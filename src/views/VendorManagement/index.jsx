import React, { Fragment, useState } from 'react'
import Header from 'src/components/Header'
import VendorManagement from './VendorManagement'

function VendorIndex () {
  const [search, setSearch] = useState('')

  const handleOnChange = (event) => {
    setSearch(event.target.value)
  }

  return (
    <Fragment>
      <Header
        title='Vendor Management'
        addLink='/vendor-management/create-vendor'
        handleOnChange={handleOnChange}
      />
      <VendorManagement
        search={search}
      />
    </Fragment>
  )
}

export default VendorIndex

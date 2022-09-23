import React, { Fragment, useState } from 'react'
import Header from 'src/components/Header'
import AdvertiseManagement from './AdvertiseManagement'

function AdvertisementIndex () {
  const [search, setSearch] = useState('')

  const handleOnChange = (event) => {
    setSearch(event.target.value)
  }

  return (
    <Fragment>
      <Header
        title='Advertise Management'
        addLink='/advertise-management/create-advertise'
        handleOnChange={handleOnChange}
      />
      <AdvertiseManagement
        search={search}
      />
    </Fragment>
  )
}

export default AdvertisementIndex

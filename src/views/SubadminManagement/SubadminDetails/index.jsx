import React, { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from 'src/components/Header'
// import PropTypes from 'prop-types'
import VendorDetails from './SubadminDetails'

function VendorDetailsIndex () {
  const params = useParams()
  const [isUpdate, setIsUpdate] = useState(false)
  const [vendorId, setVendorId] = useState('')

  useEffect(() => {
    if (params?.vendorId) {
      setIsUpdate(true)
      setVendorId(params?.vendorId)
    }
  }, [params])

  return (
    <Fragment>
      <Header title={isUpdate ? 'Vendor Details/ Update Vendor' : 'Create Vendor'} />
      <VendorDetails
        isUpdate={isUpdate}
        setIsUpdate={setIsUpdate}
        vendorId={vendorId}
        setVendorId={setVendorId}
      />
    </Fragment>
  )
}

VendorDetailsIndex.propTypes = {}

export default VendorDetailsIndex

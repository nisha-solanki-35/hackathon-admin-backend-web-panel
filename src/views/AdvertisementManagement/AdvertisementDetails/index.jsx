import React, { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from 'src/components/Header'
// import PropTypes from 'prop-types'
import AdvertisementDetails from './AdvertisementDetails'

function AdvertisementDetailsIndex () {
  const params = useParams()
  const [isUpdate, setIsUpdate] = useState(false)
  const [advertisementId, setAdvertismentId] = useState('')

  useEffect(() => {
    if (params?.advertisementId) {
      setIsUpdate(true)
      setAdvertismentId(params?.advertisementId)
    }
  }, [params])

  return (
    <Fragment>
      <Header title={isUpdate ? 'Advertisement Details/ Update Advertisement' : 'Create Advertisement'} />
      <AdvertisementDetails
        isUpdate={isUpdate}
        setIsUpdate={setIsUpdate}
        advertisementId={advertisementId}
        setAdvertismentId={setAdvertismentId}
      />
    </Fragment>
  )
}

AdvertisementDetailsIndex.propTypes = {}

export default AdvertisementDetailsIndex

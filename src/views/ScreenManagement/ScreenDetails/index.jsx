import React, { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from 'src/components/Header'
// import PropTypes from 'prop-types'
import ScreenDetails from './ScreenDetails'

function ScreenDetailsIndex () {
  const params = useParams()
  const [isUpdate, setIsUpdate] = useState(false)
  const [screenId, setScreenId] = useState('')

  useEffect(() => {
    if (params?.screenId) {
      setIsUpdate(true)
      setScreenId(params?.screenId)
    }
  }, [params])

  return (
    <Fragment>
      <Header title={isUpdate ? 'Screen Details/ Update Screen' : 'Create Screen'} />
      <ScreenDetails
        isUpdate={isUpdate}
        setIsUpdate={setIsUpdate}
        screenId={screenId}
        setScreenId={setScreenId}
      />
    </Fragment>
  )
}

ScreenDetailsIndex.propTypes = {}

export default ScreenDetailsIndex

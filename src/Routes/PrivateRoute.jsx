import React from 'react'
import PropTypes from 'prop-types'
import { Navigate } from 'react-router-dom'

function PrivateRoute ({ element: Component }) {
  const token = localStorage.getItem('token')
  if (!token) return <Navigate to='/login' replace />
  return Component
}

PrivateRoute.propTypes = {
  element: PropTypes.element
}

export default PrivateRoute

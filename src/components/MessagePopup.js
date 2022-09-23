import React from 'react'
import PropTypes from 'prop-types'
import { Alert, Snackbar } from '@mui/material'

function MessagePopup (props) {
  const { isOpen, handleClose, error, successMsg } = props

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={error ? 'error' : 'success'} sx={{ width: '100%' }}>{error ? error?.response?.data?.message : successMsg ? successMsg?.data?.message : ''}</Alert>
    </Snackbar>
  )
}

MessagePopup.propTypes = {
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
  error: PropTypes.object,
  successMsg: PropTypes.object
}

export default MessagePopup

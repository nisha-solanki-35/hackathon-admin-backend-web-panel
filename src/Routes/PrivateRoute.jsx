import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import DashboardNavbar from 'src/layouts/dashboard/DashboardNavbar'
import DashboardSidebar from 'src/layouts/dashboard/DashboardSidebar'
import Loader from 'src/components/Loader'
import { logout } from 'src/API/auth'
import { useMutation } from 'react-query'
import MessagePopup from 'src/components/MessagePopup'

const APP_BAR_MOBILE = 64
const APP_BAR_DESKTOP = 92

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden'
})

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }
}))
function PrivateRoute ({ element: Component }) {
  // if (!token) return <Navigate to='/login' replace />

  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const token = localStorage.getItem('token')

  const { mutate: accountLogout, error: logoutError, isLoading: isLogoutLoading, status: logoutStatus } = useMutation('Logout', logout)

  useEffect(() => {
    if (logoutStatus === 'success') {
      localStorage.removeItem('token')
      localStorage.removeItem('adminData')
      navigate('/login')
    }
  }, [logoutStatus])

  useEffect(() => {
    if (logoutError && logoutStatus === 'error') {
      setIsOpen(true)
      setOpen(null)
    }
  }, [logoutError])

  const handleOnLogout = () => {
    accountLogout(token)
  }
  const handleClose = () => {
    setIsOpen(null)
  }
  console.log('token', token)

  if (token) {
    return (
    <RootStyle>
        <Loader isOpen={isLogoutLoading} />
        <MessagePopup isOpen={isOpen} handleClose={handleClose} error={logoutError} />
        <DashboardNavbar onOpenSidebar={() => setOpen(true)} handleOnLogout={handleOnLogout} open={open} setOpen={setOpen} />
        <DashboardSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
        <MainStyle>
          {Component}
          <Outlet />
        </MainStyle>
      </RootStyle>)
  } else {
    return <Navigate to='/login' replace/>
  }
}

PrivateRoute.propTypes = {
  element: PropTypes.element
}

export default PrivateRoute

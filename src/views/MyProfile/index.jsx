import React from 'react'
import { Outlet } from 'react-router-dom'
// import PropTypes from 'prop-types'
import { styled } from '@mui/material/styles'

const APP_BAR_MOBILE = 64
const APP_BAR_DESKTOP = 92

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
function ProfileIndex (props) {
  return (
    <MainStyle>
      <div>ProfileIndex</div>
        <Outlet />
      </MainStyle>
  )
}

ProfileIndex.propTypes = {}

export default ProfileIndex

import React from 'react'
// import PropTypes from 'prop-types'
import Card from '@mui/material/Card'
// import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
// import CardMedia from '@mui/material/CardMedia'
// import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Box } from '@mui/material'

function Profile (props) {
  const adminData = JSON.parse(localStorage.getItem('adminData'))

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div></div>
      <Card style={{ textAlign: 'center', width: '700px' }}>
        <CardContent>
          <Box p={1}>
            <Typography gutterBottom variant="h5" component="div">
              {adminData?.sName}
            </Typography>
          </Box>
          <Box p={1}>
            <Typography variant="body2" color="text.secondary">
              Email: <b>{`    ${adminData?.sEmail}`}</b>
            </Typography>
          </Box>
          <Box p={1}>
            <Typography variant="body2" color="text.secondary">
              User Name: <b>{`    ${adminData?.sUsername}`}</b>
            </Typography>
          </Box>
          <Box p={1}>
            <Typography variant="body2" color="text.secondary">
              Mobile Number: <b>{`    ${adminData?.sMobNum}`}</b>
            </Typography>
          </Box>
          <Box p={1}>
            <Typography variant="body2" color="text.secondary">
              Type: <b>{`    ${adminData?.eType}`}</b>
            </Typography>
          </Box>
        </CardContent>
      </Card>
      <div></div>
    </div>
  )
}

Profile.propTypes = {}

export default Profile

import React from 'react'
import { styled } from '@mui/material/styles'
import { Card, Container, Typography } from '@mui/material'
import useResponsive from '../../../hooks/useResponsive'
import Page from '../../../components/Page'
import Login from './Login'

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}))

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
}))

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0)
}))

// ----------------------------------------------------------------------

export default function LoginIndex () {
  const mdUp = useResponsive('up', 'md')

  return (
    <Page title="Login">
      <RootStyle>

        {mdUp && (
          <SectionStyle>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hi, Welcome Back
            </Typography>
            <img src="/static/illustrations/illustration_login.png" alt="login" />
          </SectionStyle>
        )}

        <Container maxWidth="sm">
          <ContentStyle>
            <Typography variant="h4" gutterBottom>
              Sign in to Minimal
            </Typography>

            <Typography sx={{ color: 'text.secondary', mb: 5 }}>Enter your details below.</Typography>

            <Login />
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  )
}

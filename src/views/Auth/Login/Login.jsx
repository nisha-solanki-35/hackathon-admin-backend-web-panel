/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
// form
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
// @mui
import { Link, Stack, IconButton, InputAdornment } from '@mui/material'
import { LoadingButton } from '@mui/lab'
// components
import Iconify from '../../../components/Iconify'
import { FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { login } from 'src/redux/actions/auth'

// ----------------------------------------------------------------------

export default function Login () {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [showPassword, setShowPassword] = useState(false)

  const resStatus = useSelector(state => state.auth.resStatus)
  const resMessage = useSelector(state => state.auth.resMessage)

  console.log('resMessage, resStatus', resMessage, resStatus)

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required')
  })

  const defaultValues = {
    email: '',
    password: '',
    remember: true
  }

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues
  })

  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = methods

  const onSubmit = (loginCreds) => {
    // dispatch(login(loginCreds))
    navigate('/dashboard', { replace: true })
  }

  useEffect(() => {
    if (resMessage && resStatus) {
      // navigate('/dashboard', { replace: true })
    }
  }, [resMessage])

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField name="email" label="Email address" handleChange={ { ...register('email') }} />

        <RHFTextField
          handleChange={{ ...register('password') }}
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <RHFCheckbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
        Login
      </LoadingButton>
    </FormProvider>
  )
}

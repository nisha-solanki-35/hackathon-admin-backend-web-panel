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
import { useMutation } from 'react-query'
import Loader from 'src/components/Loader'
import { login } from 'src/API/auth'
import MessagePopup from 'src/components/MessagePopup'

// ----------------------------------------------------------------------

export default function Login () {
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

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

  const { mutate, isSuccess, isError, error, isLoading, data, status } = useMutation('login', login, {
    onSuccess: (data) => {
      console.log(data)
    }
  })

  console.log('data', data)
  console.log('isSuccess, isError, error, isLoading', isSuccess, isError, error, isLoading, status)

  const onSubmit = (loginCreds) => {
    mutate(loginCreds)
  }

  useEffect(() => {
    if (isError) {
      setIsOpen(true)
    }
  }, [isError])

  const handleClose = () => {
    setIsOpen(false)
  }

  useEffect(() => {
    if (status === 'success' && data) {
      const userData = data && data?.data?.data
      const obj = {}
      localStorage.setItem('token', data?.data?.Authorization)
      localStorage.setItem('adminData', JSON.stringify(data?.data?.data))
      userData && userData.iRoleId && userData.iRoleId.aPermissions && userData.iRoleId.aPermissions.map(permission => {
        obj[permission.sKey] = permission.eType
        return obj
      })
      localStorage.setItem('adminPermission', JSON.stringify(obj))
      navigate('/dashboard')
    }
  }, [status])

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Loader isOpen={status === 'loading'} />
      <MessagePopup isOpen={isOpen} handleClose={handleClose} error={error} />

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

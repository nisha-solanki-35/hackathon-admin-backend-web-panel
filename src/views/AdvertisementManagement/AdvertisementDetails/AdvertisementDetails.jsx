import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { FormProvider, RHFTextField } from 'src/components/hook-form'
import Loader from 'src/components/Loader'
import MessagePopup from 'src/components/MessagePopup'
import { IconButton, InputAdornment, Stack } from '@mui/material'
import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery } from 'react-query'
import { createAdvertisement, getAdvertisementDetails, updateAdvertisement } from 'src/API/advertisement'
import Iconify from 'src/components/Iconify'
import { LoadingButton } from '@mui/lab'
import { useNavigate } from 'react-router-dom'

function AdvertisementDetails (props) {
  const { isUpdate, advertisementId } = props
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const token = localStorage.getItem('token')

  const { error: errorInAdvertisementDetails, data: AdvertisementDetails, isLoading: detailsLoading } = useQuery(['AdvertisementDetails', advertisementId], () => getAdvertisementDetails(advertisementId, token), {
    retry: false,
    refetchOnWindowFocus: false,
    enabled: isUpdate
  })

  const { mutate: create, error: createError, isLoading: createLoading, data: createdData, status: creationStatus } = useMutation('CreateAdvertisement', createAdvertisement)

  const { mutate: update, error: updateError, isLoading: updateLoading, data: updatedData, status: updateStatus } = useMutation('UpdateAdvertisement', updateAdvertisement)

  useEffect(() => {
    if (creationStatus === 'success' && createdData?.data?.status === 200) {
      navigate('/advertisement-management')
    }
  }, [createdData, creationStatus])

  const VendorSchema = Yup.object().shape({
    sEmail: Yup.string().email('Email must be a valid email address').required('Email is required'),
    sMobileNo: Yup.number().required('Mobile Number is required'),
    sName: Yup.string().required('Name is required'),
    sPassword: Yup.string().required('Password is required')
  })

  useEffect(() => {
    setValue('sName', AdvertisementDetails?.data?.data?.sName)
    setValue('sEmail', AdvertisementDetails?.data?.data?.sEmail)
    setValue('sMobileNo', AdvertisementDetails?.data?.data?.sMobileNo)
  }, [AdvertisementDetails])

  const methods = useForm({
    resolver: yupResolver(VendorSchema)
  })

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting }
  } = methods

  const onSubmit = (advertisementData) => {
    if (isUpdate) {
      update({ advertisementData, advertisementId, token })
    } else {
      create({ advertisementData, token })
    }
  }

  useEffect(() => {
    if (errorInAdvertisementDetails || createError || updateError || updateStatus === 'success') {
      setIsOpen(true)
    }
  }, [errorInAdvertisementDetails, createError, updateError, updateStatus])

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
  <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Loader isOpen={detailsLoading || createLoading || updateLoading} />
      <MessagePopup isOpen={isOpen} handleClose={handleClose} error={errorInAdvertisementDetails || createError || updateError} successMsg={updatedData} />

      <Stack spacing={3} style={{ padding: '0 70px' }}>
        <RHFTextField name="sName" label="Name" handleChange={ { ...register('sName') }} />
        <RHFTextField name="sEmail" label="Email address" handleChange={ { ...register('sEmail') }} />
        <RHFTextField name="sMobileNo" label="Mobile Number" handleChange={ { ...register('sMobileNo') }} />

        <RHFTextField
          handleChange={{ ...register('sPassword') }}
          name="sPassword"
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
      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
        {isUpdate ? 'Update' : 'Create'}
      </LoadingButton>
      </Stack>
    </FormProvider>)
}

AdvertisementDetails.propTypes = {
  isUpdate: PropTypes.bool,
  advertisementId: PropTypes.string
}

export default AdvertisementDetails

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
import { createTag, getTagDetails, updateTag } from 'src/API/tag'
import Iconify from 'src/components/Iconify'
import { LoadingButton } from '@mui/lab'
import { useNavigate } from 'react-router-dom'

function TagDetails (props) {
  const { isUpdate, tagId } = props
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const token = localStorage.getItem('token')

  const { error: errorInTagDetails, data: TagDetails, isLoading: detailsLoading } = useQuery(['TagDetails', tagId], () => getTagDetails(tagId, token), {
    retry: false,
    refetchOnWindowFocus: false,
    enabled: isUpdate
  })

  const { mutate: create, error: createError, isLoading: createLoading, data: createdData, status: creationStatus } = useMutation('CreateTag', createTag)

  const { mutate: update, error: updateError, isLoading: updateLoading, data: updatedData, status: updateStatus } = useMutation('UpdateTag', updateTag)

  useEffect(() => {
    if (creationStatus === 'success' && createdData?.data?.status === 200) {
      navigate('/tag-management')
    }
  }, [createdData, creationStatus])

  const VendorSchema = Yup.object().shape({
    sEmail: Yup.string().email('Email must be a valid email address').required('Email is required'),
    sMobileNo: Yup.number().required('Mobile Number is required'),
    sName: Yup.string().required('Name is required'),
    sPassword: Yup.string().required('Password is required')
  })

  useEffect(() => {
    setValue('sName', TagDetails?.data?.data?.sName)
    setValue('sEmail', TagDetails?.data?.data?.sEmail)
    setValue('sMobileNo', TagDetails?.data?.data?.sMobileNo)
  }, [TagDetails])

  const methods = useForm({
    resolver: yupResolver(VendorSchema)
  })

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting }
  } = methods

  const onSubmit = (tagData) => {
    if (isUpdate) {
      update({ tagData, tagId, token })
    } else {
      create({ tagData, token })
    }
  }

  useEffect(() => {
    if (errorInTagDetails || createError || updateError || updateStatus === 'success') {
      setIsOpen(true)
    }
  }, [errorInTagDetails, createError, updateError, updateStatus])

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
  <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Loader isOpen={detailsLoading || createLoading || updateLoading} />
      <MessagePopup isOpen={isOpen} handleClose={handleClose} error={errorInTagDetails || createError || updateError} successMsg={updatedData} />

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

TagDetails.propTypes = {
  isUpdate: PropTypes.bool,
  tagId: PropTypes.string
}

export default TagDetails

import React from 'react'
import PropTypes from 'prop-types'
// form
import { useFormContext, Controller } from 'react-hook-form'
// @mui
import { RadioGroup, TextField } from '@mui/material'

// ----------------------------------------------------------------------

RHFTextField.propTypes = {
  name: PropTypes.string,
  handleChange: PropTypes.any
}

export default function RHFTextField ({ name, handleChange, ...other }) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      handleChange
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          value={typeof field.value === 'number' && field.value === 0 ? '' : field.value}
          InputLabelProps={{ shrink: typeof field.value !== 'number' && field.value !== 0 }}
          error={!!error}
          helperText={error?.message}
          handleChange
          // onChange={e => field.onChange(e)}
          {...other}
        />
      )}
    />
  )
}

RHFRadioButton.propTypes = {
  name: PropTypes.string,
  handleChange: PropTypes.any
}

export function RHFRadioButton ({ name, handleChange, ...other }) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      handleChange
      render={({ field, fieldState: { error } }) => (
        <RadioGroup
          {...field}
          // fullWidth
          value={field.value}
          error={!!error}
          helperText={error?.message}
          handleChange
          // onChange={e => field.onChange(e)}
          {...other}
        />
      )}
    />
  )
}

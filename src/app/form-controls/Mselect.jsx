import React, { Fragment, useEffect } from 'react'
import {
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from '@material-ui/core'
import { Controller } from 'react-hook-form'
import _ from 'lodash'
import { Can } from '../uiComponents'
import { STATIC_PERMISSION } from '../../helpers/constants'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
const Mselect = ({
  xs,
  md,
  name,
  control,
  label,
  req,
  options,
  disabled,
  optionsLabel,
  optionsValue,
  reset,
  variant,
  readOnly,
  usersPermissions,
  componentPermissions,
  grantedUsers,
  userType
}) => {
  const moptions = () => {
    const label = (item) => (optionsLabel ? item[optionsLabel] : item.label)
    const value = (item) => (optionsLabel ? item[optionsValue] : item.value)
    return _.isArray(options)
      ? (
          options &&
      options.map((option, i) => (
        <MenuItem value={value(option)} key={i}>
          {label(option)}
        </MenuItem>
      ))
        )
      : (
        <>
          <MenuItem value='others'>No Records Found</MenuItem>
        </>
        )
  }

  const defaultValue = options && options?.length === 1 && options[0][optionsValue] ? options[0][optionsValue] : ''

  useEffect(() => {
    if (defaultValue) {
      reset(formValues => ({
        ...formValues,
        [name]: defaultValue
      }))
    }
  }, [defaultValue])

  return (
    <Can
      usersPermissions={usersPermissions || '*'}
      componentPermissions={STATIC_PERMISSION}
      grantedUsers={grantedUsers || []}
      userType={userType || ''}
      yes={() => (
        <>
          <Grid item xs={xs} md={!_.isUndefined(md) ? md : xs}>
            <FormControl
              variant={variant || 'outlined'}
              className={`${req ? 'm-select req-mark' : 'm-select'}`}
            >
              <InputLabel id={`${name}_ids`}>{label}</InputLabel>
              <Controller
                name={name}
                control={control}
                rules={{
                  required: !!req
                }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                  formState
                }) => (
                  <>
                    <Select
                      labelId={`${name}_ids`}
                      onChange={onChange}
                      value={value}
                      readOnly={readOnly}
                      disabled={disabled || false}
                      displayEmpty
                      helperText={error ? error.message : null}
                      error={!!error}
                      IconComponent={() => (
                        <KeyboardArrowDownIcon style={{ fill: '#00b7cd' }} className='mr-1' />
                      )}
                    >
                      {moptions()}
                    </Select>
                  </>
                )}
              />
            </FormControl>
          </Grid>
        </>
      )}
      no={() => <></>}
    />
  )
}

export default Mselect

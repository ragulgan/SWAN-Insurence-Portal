import React, { useState } from 'react'
import { Grid, TextField } from '@material-ui/core'
import { Controller } from 'react-hook-form'
import { makeStyles } from '@material-ui/core/styles'
import _ from 'lodash'
import { Can } from '../uiComponents'
import { STATIC_PERMISSION } from '../../helpers/constants'

const useStyles = makeStyles((theme) => ({
  warningStyles: {
    '& .MuiFormLabel-root.Mui-error': {
      color: '#000000 !important'
    },
    '& .MuiInput-underline.Mui-error:after': {
      borderBottomColor: 'red !important'
    },
    '& .MuiFormHelperText-root.Mui-error': {
      color: 'rgb(255 13 30) !important',
      fontSize: 13
    }
  },
  lablelBreakdown: {
    zIndex: '1 !important',
    transform: 'translate(5px, 20px) scale(1)',
    whiteSpace: 'break-spaces !important'
  }
}
))

const Mtextarea = ({
  xs,
  md,
  name,
  control,
  label,
  disabled,
  req,
  onBlur,
  usersPermissions,
  componentPermissions,
  grantedUsers,
  userType,
  clearErrors,
  pattern,
  onKeyPress,
  maxLength,
  readOnly
}) => {
  const classes = useStyles()
  const CHARACTER_LIMIT = 600

  return (
    <Can
      usersPermissions={usersPermissions || '*'}
      componentPermissions={STATIC_PERMISSION}
      grantedUsers={grantedUsers || []}
      userType={userType || ''}
      yes={() => (
        <>
          <Grid item xs={xs} md={!_.isUndefined(md) ? md : xs}>
            <Controller
              name={name}
              control={control}
              rules={{
                required: !!req,
                pattern: pattern || ''
              }}
              render={({
                field: { onChange, value },
                fieldState: { error },
                formState
              }) => (
                <TextField
                  className={`${classes.warningStyles} ${req ? 'req-mark' : ''}`}
                  InputLabelProps={{ className: `${classes.lablelBreakdown}` }}
                  helperText={error ? error.message : null}
                  error={!!error}
                  onChange={(e) => {
                    onChange(e)
                    clearErrors && clearErrors(name)
                  }}
                  value={value}
                  label={label}
                  onBlur={onBlur && onBlur}
                  onKeyPress={onKeyPress && onKeyPress}
                  disabled={disabled || false}
                  variant='outlined'
                  multiline
                  rows={2}
                  inputProps={{
                    maxLength: maxLength || 300, readOnly
                  }}

                />
              )}
            />
          </Grid>
        </>
      )}
      no={() => <></>}
    />
  )
}

export default Mtextarea

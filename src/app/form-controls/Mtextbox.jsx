import React from 'react'
import { Grid, TextField } from '@material-ui/core'
import { Controller } from 'react-hook-form'
import _ from 'lodash'
import { makeStyles } from '@material-ui/core/styles'
import { Can } from '../uiComponents'
import { STATIC_PERMISSION } from '../../helpers/constants'
import { thousandSeparator, phNumberSeparator, toInputUppercase } from '../../helpers/helper'
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
  }
}
))

const Mtextbox = ({
  xs,
  md,
  name,
  control,
  label,
  req,
  pattern,
  onBlur,
  onKeyPress,
  setThousandSeparator,
  setPhNumberSeparator,
  setUpperCaseSeparator,
  separatorRegex,
  maxLength,
  disabled,
  readOnly,
  clearErrors,
  usersPermissions,
  componentPermissions,
  grantedUsers,
  userType,
  onCopy,
  onPaste,
  onKeyDown
}) => {
  const classes = useStyles()
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
                  disabled={disabled || false}
                  helperText={error ? error.message : null}
                  inputProps={{ maxLength: maxLength || 300, readOnly }}
                  error={!!error}
                  onChange={(e) => {
                    if (setThousandSeparator) {
                      onChange(thousandSeparator(e))
                    } else if (setPhNumberSeparator) {
                      onChange(phNumberSeparator(e, separatorRegex))
                    } else if (setUpperCaseSeparator) {
                      onChange(toInputUppercase(e))
                    } else {
                      onChange(e)
                    }
                    clearErrors && clearErrors(name)
                  }}
                  onBlur={onBlur && onBlur}
                  onKeyPress={onKeyPress && onKeyPress}
                  onCopy={onCopy}
                  onPaste={onPaste}
                  onKeyDown={onKeyDown}
                  value={value}
                  label={label}
                  variant='outlined'
                  className={`${classes.warningStyles} ${req ? 'req-mark' : ''}`}
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

export default Mtextbox

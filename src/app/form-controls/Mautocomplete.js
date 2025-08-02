import React from 'react'
import TextField from '@material-ui/core/TextField'
import _ from 'lodash'
import {
  Grid,
  FormControl,
  InputLabel,
  MenuItem
} from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import CircularProgress from '@material-ui/core/CircularProgress'
import PropTypes from 'prop-types'
import { Controller } from 'react-hook-form'
import { Can } from '../uiComponents'
import { STATIC_PERMISSION } from '../../helpers/constants'

const Mautocomplete = ({
  xs,
  md,
  name,
  control,
  label,
  req,
  options,
  optionsLabel,
  optionsValue,
  variant,
  usersPermissions,
  componentPermissions,
  grantedUsers,
  userType
}) => {
  const [open, setOpen] = React.useState(false)

  function sleep (delay = 0) {
    return new Promise((resolve) => {
      setTimeout(resolve, delay)
    })
  }

  const loading = open && options.length === 0
  return (
    <Grid item xs={xs} md={!_.isUndefined(md) ? md : xs}>
      <Can
        usersPermissions={usersPermissions || '*'}
        componentPermissions={STATIC_PERMISSION}
        grantedUsers={grantedUsers || []}
        userType={userType || ''}
        yes={() => (
          <>
            <FormControl
              variant={variant || 'outlined'}
              className={`${req ? 'm-select req-mark' : 'm-select'}`}
            >
              {/* {/ <InputLabel id={`${name}_ids`}>{label}</InputLabel> /} */}
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

                    <Autocomplete
                      id='asynchronous-demo'
                      style={{ width: '100%' }}
                      open={open}
                      onOpen={() => {
                        setOpen(true)
                      }}
                      onClose={() => {
                        setOpen(false)
                      }}
                      getOptionSelected={(item) => (optionsLabel ? item[optionsLabel] : item.label)}
                      getOptionLabel={(item) => (optionsLabel ? item[optionsValue] : item.value)}
                      options={options}
                      loading={loading}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label={label}
                          variant='outlined'
                          InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                              <>

                                {loading ? <CircularProgress color='inherit' size={20} /> : null}
                                {params.InputProps.endAdornment}
                              </>
                            )
                          }}
                        />
                      )}
                    />

                  </>
                )}
              />
            </FormControl>
          </>
        )}
        no={() => <></>}
      />
    </Grid>
  )
}

Mautocomplete.propTypes = {
  options: PropTypes.array.isRequired,
  name: PropTypes.any.isRequired,
  control: PropTypes.any.isRequired,
  label: PropTypes.any.isRequired,
  req: PropTypes.any.isRequired,
  xs: PropTypes.any,
  md: PropTypes.any
}

export default Mautocomplete

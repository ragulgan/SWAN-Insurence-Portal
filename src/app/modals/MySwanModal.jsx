import React, { useState, useEffect } from 'react'
import Icofont from 'react-icofont'
import { Grid, Button, Dialog, DialogContent, TextField, InputAdornment, IconButton } from '@material-ui/core'
import { ClientActions } from '../../store/actions/ClientActions'
import { connect } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { logo_one } from '../../helpers/assets'

import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

const MySwanModal = (props) => {
  const { swan_account } = props
  const [open, setOpen] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const { control, watch, setValue, getValues, handleSubmit, formState, clearErrors, reset, setError } = useForm({
    defaultValues: {

    }
  })

  const passwordHandler = () => {
    setShowPassword(!showPassword)
  }
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const onSubmit = (data) => {

  }

  useEffect(() => {
    if (swan_account) {
      setOpen(true)
    }
  }, [swan_account])
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Dialog
        fullWidth
        maxWidth='xs'
        open={open}
        onClose={handleClose}
        aria-labelledby='login-widget'
        className='login-widget'
      >
        <DialogContent>
          <Grid
            container
            direction='row'
            justifyContent='center'
            alignItems='flex-start'
            spacing={4}
          >
            <Grid item xs={12} sm={12} md={12} className='txt-center'>
              <img src={logo_one} />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Controller
                name='username'
                control={control}
                defaultValue=''
                render={({
                  field: { onChange, value },
                  fieldState: {
                    error
                  }
                }) => (
                  <TextField
                    label='USERNAME'
                    variant='outlined'
                    value={value}
                    type='text'
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                )}
                rules={{ required: 'User Name is required' }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Controller
                name='password'
                control={control}
                defaultValue=''
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextField
                    label='PASSWORD'
                    variant='outlined'
                    value={value}
                    type={showPassword ? 'text' : 'password'}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.f : null}
                    InputProps={{
                      endAdornment: <InputAdornment position='end'>
                        <IconButton
                          aria-label='toggle password visibility'
                          onClick={passwordHandler}
                          edge='end'
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }}
                  />
                )}
                rules={{ required: 'Password is required' }}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={6}>
              <Button variant='outlined' color='primary' fullWidth>FORGOT PASSWORD</Button>
            </Grid>
            <Grid item xs={6} sm={6} md={6}>
              <Button variant='contained' color='primary' type='submit' fullWidth>LOG IN</Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </form>
  )
}

const mapStateToProps = (state) => {
  const { Client } = state
  return {
    clientLoading: Client.clientLoading,
    clientData: Client.clientData
  }
}

const mapDispatchToProps = (dispatch) => ({
  searchDispatch: (params) => dispatch(ClientActions.SearchClient(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(MySwanModal)

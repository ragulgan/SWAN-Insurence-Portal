import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Grid, Button, TextField, CircularProgress } from '@material-ui/core'
import { isEmpty } from 'lodash'

const StepNewpasswordSet = (props) => {
  const { submit } = props
  const [loading, setLoading] = useState(false)
  const { handleSubmit, control } = useForm({
    defaultValues: {
      new_password: '',
      confirm_password: ''
    }
  })

  const onSubmit = (values) => {
    if (!isEmpty(values)) {
      setLoading(true)

      // Development Purpose Only
      setTimeout(function () {
        setLoading(false)
        submit()
      }, 3000)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid
        container
        direction='column'
        justifyContent='center'
        alignItems='stretch'
        spacing={3}
      >
        <Grid item>
          <p className='hero-txt'>Reset your password by choosing a new password</p>
        </Grid>
        <Grid item>
          <Controller
            name='new_password'
            control={control}
            defaultValue=''
            render={({
              field: { onChange, value },
              fieldState: {
                error
              }
            }) => (
              <TextField
                label='NEW PASSWORD'
                variant='outlined'
                value={value}
                type='password'
                onChange={onChange}
                error={!!error}
                helperText={error ? error.message : null}
              />
            )}
            rules={{ required: 'New Password is required' }}
          />
        </Grid>
        <Grid item>
          <Controller
            name='confirm_password'
            control={control}
            defaultValue=''
            render={({
              field: { onChange, value },
              fieldState: {
                error
              }
            }) => (
              <TextField
                label='CONFIRM PASSWORD'
                variant='outlined'
                value={value}
                type='password'
                onChange={onChange}
                error={!!error}
                helperText={error ? error.message : null}
              />
            )}
            rules={{ required: 'Confirm Password is required' }}
          />
        </Grid>
        <Grid item>
          <Button
            variant='contained'
            size='medium'
            color='primary'
            type='submit'
            fullWidth
          >
            {
                            loading ? <CircularProgress size={18} style={{ color: '#ffffff' }} /> : 'RESET PASSWORD'
                        }
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default StepNewpasswordSet

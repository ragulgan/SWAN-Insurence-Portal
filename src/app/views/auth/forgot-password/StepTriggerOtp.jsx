import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Grid, Button, TextField, CircularProgress } from '@material-ui/core'
import { isEmpty } from 'lodash'

const StepTriggerOtp = (props) => {
  const { submit } = props
  const [loading, setLoading] = useState(false)
  const { handleSubmit, control } = useForm({
    defaultValues: {
      email: ''
    }
  })

  const onSubmit = (values) => {
    if (!isEmpty(values)) {
      submit(values)
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
          <p className='hero-txt'>Lost your password? Please enter your password. You will receive a link to create a new password via Email.</p>
        </Grid>
        <Grid item>
          <Controller
            name='email'
            control={control}
            render={({
              field: { onChange, value },
              fieldState: {
                error
              }
            }) => (
              <TextField
                label='EMAIL'
                variant='outlined'
                value={value}
                type='text'
                onChange={onChange}
                error={!!error}
                helperText={error ? error.message : null}
              />
            )}
            rules={{ required: 'Email is required' }}
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
                            loading ? <CircularProgress size={18} style={{ color: '#ffffff' }} /> : 'SEND OTP'
                        }
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default StepTriggerOtp

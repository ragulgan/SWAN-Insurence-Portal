import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Grid, Button, TextField, CircularProgress } from '@material-ui/core'
import { isEmpty } from 'lodash'
import OtpInput from 'react-otp-input'

const StepFetchOtp = (props) => {
  const { submit } = props
  const [loading, setLoading] = useState(false)
  const [otp, setOtp] = useState('')
  const { handleSubmit, control, register } = useForm({
    defaultValues: {
      email: ''
    }
  })

  const changeOtpHandler = (value) => {
    setOtp(value)
  }
  const onSubmit = (values) => {
    if (!isEmpty(values)) {
      setLoading(true)

      // Development Purpose Only
      setTimeout(function () {
        submit(otp)
        setLoading(false)
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
          <p className='hero-txt'>An OTP has been sent to your email address, Validity time of OTP: 2 mins</p>
        </Grid>
        <Grid item>
          <OtpInput
            value={otp}
            onChange={changeOtpHandler}
            numInputs={6}
            separator={<span />}
            inputStyle={{
              width: '3rem',
              height: '3rem',
              margin: '0 0.8rem',
              fontSize: '2rem',
              borderRadius: 4,
              border: '1px solid rgba(0,0,0,0.3)'
            }}
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
                            loading ? <CircularProgress size={18} style={{ color: '#ffffff' }} /> : 'CONFIRM'
                        }
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant='outlined'
            size='medium'
            color='primary'
            type='submit'
            fullWidth
          >
            {
                            loading ? <CircularProgress size={18} style={{ color: '#ffffff' }} /> : 'RE-SEND OTP'
                        }
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default StepFetchOtp

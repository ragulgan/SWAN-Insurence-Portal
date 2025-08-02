import React, { useEffect, useState, Fragment } from 'react'
import { makeStyles, Grid, MobileStepper } from '@material-ui/core'
import { connect } from 'react-redux'
import { isEmpty } from 'lodash'
import { Link, useHistory } from 'react-router-dom'
import { AuthActions } from '../../../../store/actions/AuthActions'
import { usePageTitle } from '../../../../hooks/usePageTitle'
import Icofont from 'react-icofont'
import toast from 'react-hot-toast'

import StepTriggerOtp from './StepTriggerOtp'
import StepFetchOtp from './StepFetchOtp'
import StepNewpasswordSet from './StepNewpasswordSet'

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiFormHelperText-root.Mui-error': {
      color: '#ff0d1e',
      fontSize: 'inherit'
    }
  },
  img: {
    marginBottom: 45,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  loginBtn: {
    paddingTop: 7,
    paddingBottom: 7,
    fontSize: 14
  }
}))

function ForgotPassword (props) {
  const history = useHistory()
  const [pagetitle, setPagetitle] = usePageTitle('Swan - Forgot Password')
  const { triggerOtpDispatch, setOtpDispatch, savePasswordDispatch, authLoading, authToken, authRole } = props
  const [activeStep, setActiveStep] = useState(0)

  const onTriggerOtp = (values) => {
    // Otp save Dispatch from here
    console.log('values -', values)
    // triggerOtpDispatch()
    setActiveStep(1)
  }
  const onOtpSave = (values) => {
    // Otp save Dispatch from here
    console.log('values -', values)
    // setOtpDispatch()
    setActiveStep(2)
  }
  const onPasswordReset = (values) => {
    // Password Dispatch from here
    console.log('values -', values)
    // savePasswordDispatch
    toast.success('Your password has been changed Successfully!')
  }
  function getStepContent (stepIndex) {
    switch (stepIndex) {
      case 0:
        return <StepTriggerOtp submit={onTriggerOtp} />
      case 1:
        return <StepFetchOtp submit={onOtpSave} />
      case 2:
        return <StepNewpasswordSet submit={onPasswordReset} />
      default:
        return <StepTriggerOtp submit={onTriggerOtp} />
    }
  }

  useEffect(() => {
    if (authToken !== null) {
      // history.push(`/${authRole}/overview`)
      window.location.replace(`/${authRole}/overview`)
    }
  })

  return (
    <Grid id='kt_login_signin_form' className='auth-pages'>
      <Grid
        container
        direction='row'
        justifyContent='center'
        alignItems='center'
        spacing={3}
      >
        <Grid item xs={10}>
          <Link className='back-btn' to='/auth/login'><span><Icofont icon='arrow-left' /></span> Back to Login</Link>
        </Grid>
        <Grid item xs={10}>
          <h1 className='auth-title'>FORGOT PASSWORD</h1>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          {getStepContent(activeStep)}
        </Grid>
      </Grid>
      <Grid
        container
        direction='column'
        justifyContent='center'
        alignItems='center'
        spacing={3}
      >
        <MobileStepper
          variant='dots'
          steps={3}
          position='static'
          activeStep={activeStep}
          className='step-dots'
        />
      </Grid>
    </Grid>
  )
}

const mapStateToProps = (state) => {
  const { Auth } = state
  return {
    authLoading: Auth.authLoading,
    authToken: Auth.authToken,
    authRole: Auth.authRole
  }
}

const mapDispatchToProps = (dispatch) => ({
  triggerOtpDispatch: (formData) => dispatch(AuthActions.TriggerOtp(formData)),
  setOtpDispatch: (formData) => dispatch(AuthActions.SetOtp(formData)),
  savePasswordDispatch: (formData) => dispatch(AuthActions.SaveNewPassword(formData))
})

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)

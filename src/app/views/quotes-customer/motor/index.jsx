import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Grid, Stepper, Step, StepLabel } from '@material-ui/core'
import { shallowEqual, useSelector } from 'react-redux'
import { setSessionStorage, getSessionStorage } from '../../../../helpers/helper'
import { MOTOR_FORM } from '../../../../helpers/constants'
import StepPersonalDetails from './StepPersonalDetails'
import StepVehicleDetails from './StepVehicleDetails'
import StepPlans from './StepPlans'
import StepSummary from './StepSummary'

function getSteps () {
  return [
    'Personal Information',
    'Vehicle Details',
    'Plans / Extensions',
    'Quotation Summary'
  ]
}

function getStepContent (step, back, next, role, changeStep, backStep, thirdDefault) {
  switch (parseInt(step)) {
    case 0:
      return (
        <StepPersonalDetails
          fromPage='home'
          back={back}
          next={next}
          changeStep={changeStep}
        />
      )
    case 1:
      return (
        <StepVehicleDetails
          fromPage='home'
          back={back}
          next={next}
          changeStep={changeStep}
        />
      )
    case 2:
      return (
        <StepPlans
          fromPage='home'
          back={back}
          next={next}
          changeStep={changeStep}
          thirdDefault={thirdDefault}
          backStep={backStep}
        />
      )
    case 3:
      return (
        <StepSummary
          fromPage='home'
          back={back}
          next={next}
          backStep={backStep}
          changeStep={changeStep}
        />
      )
  }
}

const Motor = () => {
  const { authRole } = useSelector(
    ({ Auth, Quotation }) => ({
      authRole: Auth.authRole
    }),
    shallowEqual
  )
 const active = getSessionStorage(MOTOR_FORM.ACTIVE_STEP)
  const [activeStep, setActiveStep] = useState(0)
  const [detectChanges, setDetectChanges] = useState(0)
  const [thirdDefault, setThirdDefault] = useState("plan")
  const steps = getSteps()

  const handleNext = () => {
    if (Number(activeStep) <= 2) {
      setSessionStorage(MOTOR_FORM.ACTIVE_STEP, Number(activeStep) + 1)
    }
    setActiveStep(prevActiveStep => Number(prevActiveStep) + 1)
    setDetectChanges(prev => prev + 1)
  }
  const handleBack = () => {
    if (Number(activeStep) > 0) {
      setActiveStep(prevActiveStep => Number(prevActiveStep) - 1)
      setSessionStorage(MOTOR_FORM.ACTIVE_STEP, Number(activeStep) - 1)
    }
    setDetectChanges(prev => prev + 1)
  }
  const changeStep = (nxtStep) => {
    setSessionStorage(MOTOR_FORM.ACTIVE_STEP, Number(nxtStep))
    setActiveStep(nxtStep)
  }
  const backStep = (backstep) =>{
    setThirdDefault(backstep)
  }

  useEffect(() => {
    if (!detectChanges) {
      setActiveStep(Number(active))
    }
  }, [])

  return (
    <section className='quote-create'>
      <Grid
        container
        direction='row'
        justifyContent='center'
        alignItems='flex-start'
      >
        <Grid item xs={12} sm={12} md={11}>
          <h4 className='section-title'>
            {/* <Link to={'/overview'}>
              <Icofont icon="arrow-left" />
            </Link>{' '} */}
            Motor Quotation
          </h4>
        </Grid>
      </Grid>
      <Grid
        container
        direction='row'
        justifyContent='center'
        alignItems='flex-start'
        className='form-stepper'
      >
        <Grid item xs={12} sm={12} md={10}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Grid>
      </Grid>
      <Grid
        container
        direction='row'
        justifyContent='center'
        alignItems='flex-start'
      >
        <Grid item xs={12} sm={12} md={10}>
          {getStepContent(activeStep, handleBack, handleNext, authRole, changeStep, backStep, thirdDefault)}
        </Grid>
      </Grid>
    </section>
  )
}

export default Motor

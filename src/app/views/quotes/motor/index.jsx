import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Grid, Stepper, Step, StepLabel, Button } from '@material-ui/core'
import { shallowEqual, useSelector } from 'react-redux'
import Icofont from 'react-icofont'
import StepPersonalDetails from './StepPersonalDetails'
import StepVehicleDetails from './StepVehicleDetails'
import StepExtensions from './StepExtensions'
import StepPlans from './StepPlans'
import StepSummary from './StepSummary'
import { MOTOR_FORM } from '../../../../helpers/constants'
import {
  getSessionStorage
} from '../../../../helpers/helper'

function getSteps () {
  return [
    'Personal Information',
    'Vehicle Details',
    'Extensions',
    'Quotation Summary'
  ]
}

// Suresh
function getBrokerSteps () {
  return [
    'Personal Information',
    'Vehicle Details',
    'Plans',
    'Extensions',
    'Quotation Summary'
  ]
}
// Suresh

const Motor = () => {
  const { authRole, quotationStep } = useSelector(
    ({ Auth, Quotation }) => ({
      authRole: Auth.authRole,
      quotationStep: Quotation.quotationStep
    }),
    shallowEqual
  )

  const active = getSessionStorage(MOTOR_FORM.ACTIVE_STEP)
  const [activeStep, setActiveStep] = useState(0)
  const steps = authRole === 'broker' ? getBrokerSteps() : getSteps()

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
  }
  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  // useEffect(() => {
  //   if(quotationStep){
  //     setActiveStep(3)
  //     //setActiveStep(quotationStep)
  //   }
  // }, [quotationStep])

  // Side Bar Fixes
  useEffect(() => {
    document.body.classList.add('aside-minimize')

    return () => {
      document.body.classList.remove('aside-minimize')
    }
  }, [])

  function getStepContent (stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <StepPersonalDetails
            fromPage='home'
            back={handleBack}
            next={handleNext}
          />
        )
      case 1:
        return (
          <StepVehicleDetails
            fromPage='home'
            back={handleBack}
            next={handleNext}
          />
        )
      case 2:
        return authRole === 'customer'
          ? (
            <StepPlans
              fromPage='home'
              back={handleBack}
              next={handleNext}
            />
            )
          : (
            <StepExtensions
              fromPage='home'
              back={handleBack}
              next={handleNext}
            />
            )
      case 3:
        return (
          <StepSummary
            fromPage='home'
            back={handleBack}
            next={handleNext}
          />
        )
      default:
        return (
          <StepPersonalDetails
            fromPage='home'
            back={handleBack}
            next={handleNext}
          />
        )
    }
  }
  // Suresh
  function getBrokerStepContent (stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <StepPersonalDetails
            fromPage='home'
            back={handleBack}
            next={handleNext}
          />
        )
      case 1:
        return (
          <StepVehicleDetails
            fromPage='home'
            back={handleBack}
            next={handleNext}
          />
        )
      case 2:
        return (
          <StepPlans
            fromPage='home'
            back={handleBack}
            next={handleNext}
          />
        )
      case 3:
        return (
          <StepExtensions
            fromPage='home'
            back={handleBack}
            next={handleNext}
          />
        )
      case 4:
        return (
          <StepSummary
            fromPage='home'
            back={handleBack}
            next={handleNext}
          />
        )
      default:
        return (
          <StepPersonalDetails
            fromPage='home'
            back={handleBack}
            next={handleNext}
          />
        )
    }
  }
  // Suresh

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
            <Link to='/overview'>
              <Icofont icon='arrow-left' />
            </Link>{' '}
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
          {authRole === 'broker' ? getBrokerStepContent(activeStep) : getStepContent(activeStep)}
          {/* {authRole === 'broker' ? getStepContent(activeStep) : getStepContent(activeStep)} */}
        </Grid>
      </Grid>
    </section>
  )
}

export default Motor

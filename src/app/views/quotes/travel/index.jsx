import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Grid, Stepper, Step, StepLabel, Button } from '@material-ui/core'
import { shallowEqual, useSelector } from 'react-redux'
import Icofont from 'react-icofont'
import StepTravelPersonalDetails from './SummaryPersonalDetails'
import StepTravelPlansDetails from './SummaryTravel'
import StepCoverpriceDetails from './_FormCoverpriceDetails'
import StepTravelSummary from './StepSummary'
import './style.css'
import LeaveQuoteConfirmation from '../../../widgets/LeaveQuoteConfirmation'

function getSteps() {
  return [
    'Personal Information',
    'Travel Plans',
    'Cover Price and details',
    'Quotation Summary'
  ]
}

const Travel = () => {
  const { authRole } = useSelector(
    ({ Auth }) => ({
      authRole: Auth.authRole
    }),
    shallowEqual
  )
  const [activeStep, setActiveStep] = useState(0)
  const [thirdDefault, setThirdDefault] = useState("plan")
  const steps = getSteps()

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const [popConfirm, setPopConfirm] = useState(false)
  const LoginHandler = () => {
    setPopConfirm(true)
  }
  const handleClose = () => {
    setPopConfirm(false)
  }
  const backStep = (backstep) =>{
    setThirdDefault(backstep)
  }
  useEffect(() => {
    if (authRole !== 'customer') {
      document.body.classList.add('aside-minimize')
      return () => {
        document.body.classList.remove('aside-minimize')
      }
    }
  }, [])

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
        <StepTravelPersonalDetails
          fromPage='home'
          back={handleBack}
          next={handleNext}
        />)
      case 1:
        return (
        <StepTravelPlansDetails
          fromPage='home'
          back={handleBack}
          next={handleNext}
        />)
      case 2:
        return (
        <StepCoverpriceDetails
          fromPage='home'
          back={handleBack}
          next={handleNext}
          thirdDefault={thirdDefault}
          backStep={backStep}
        />)
      case 3:
        return (
        <StepTravelSummary
          fromPage='home'
          back={handleBack}
          next={handleNext}
          backStep={backStep}
        />)
      default:
        return (
        <StepTravelPersonalDetails
          fromPage='home'
          back={handleBack}
          next={handleNext}
        />)
    }
  }
  return (
    <section className='quote-create'>
      <Grid
        container
        direction='row'
        justifyContent='center'
        alignItems='flex-start'
      >
        <Grid item xs={12} sm={12} md={11}>
          <h4 className='section-title' onClick={() => { setPopConfirm(true) }}><Link to='/overview'><Icofont icon='arrow-left' /></Link> Travel Quotation</h4>
          <LeaveQuoteConfirmation
            open={popConfirm}
            close={handleClose}
            login={LoginHandler}
          />
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
            {steps.map((label) => (
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
          {getStepContent(activeStep)}
        </Grid>
      </Grid>
    </section>
  )
}

export default Travel

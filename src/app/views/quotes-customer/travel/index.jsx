import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Icofont from 'react-icofont'
import { Grid } from '@material-ui/core'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'

import StepPersonalInfo from './StepPersonalInfo'
import StepTravelPlans from './StepTravelPlans'
import StepCoverpriceDetails from './StepCoverpriceDetails'
import StepSummary from './StepSummary'

function getSteps () {
  return [
    'Personal Information',
    'Travel Plans',
    'Cover Price and details',
    'Summary'
  ]
}
function getStepContent (stepIndex) {
  switch (stepIndex) {
    case 0:
      return <StepPersonalInfo />
    case 1:
      return <StepTravelPlans />
    case 2:
      return <StepCoverpriceDetails />
    case 3:
      return <StepSummary />
    default:
      return <StepPersonalInfo />
  }
}
const Travel = () => {
  const [activeStep, setActiveStep] = useState(3)
  const steps = getSteps()

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  return (
    <section className='quote-create'>
      <Grid
        container
        direction='row'
        justifyContent='center'
        alignItems='flex-start'
        spacing={1}
      >
        <Grid item md={10}>
          <h4 className='section-title'><Link to='/overview'><Icofont icon='arrow-left' /></Link> Travel Quotation</h4>
        </Grid>
      </Grid>
      <Grid
        container
        direction='row'
        justifyContent='center'
        alignItems='flex-start'
        spacing={1}
      >
        <Grid item md={8}>
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
        spacing={1}
      >
        <Grid item md={10}>
          {getStepContent(activeStep)}
        </Grid>
        <Grid item md={10} className='txt-right'>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
          >
            Back
          </Button>
          <Button variant='contained' color='primary' onClick={handleNext}>
            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </Grid>
      </Grid>
    </section>
  )
}

export default Travel

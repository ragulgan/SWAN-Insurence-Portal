import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Grid, Stepper, Step, StepLabel, Button } from '@material-ui/core'
import Icofont from 'react-icofont'

import StepProposalDetails from './StepProposalDetails'
import StepSubmitInstruction from './StepSubmitInstruction'

function getSteps () {
  return [
    'Proposal Details',
    'Submit Ins/Upload Docs'

  ]
}

const Proposal = () => {
  const [activeStep, setActiveStep] = useState(0)
  const steps = getSteps()

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  function getStepContent (stepIndex) {
    switch (stepIndex) {
      case 0:
        return <StepProposalDetails fromPage='home' back={handleBack} next={handleNext} />
      case 1:
        return <StepSubmitInstruction fromPage='home' back={handleBack} next={handleNext} />

      default:
        return <StepProposalDetails fromPage='home' back={handleBack} next={handleNext} />
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
          <h4 className='section-title'><Link to='/overview'><Icofont icon='arrow-left' /></Link>Motor Policy</h4>
        </Grid>
      </Grid>
      <Grid
        container
        direction='row'
        justifyContent='center'
        alignItems='flex-start'
        className='form-stepper'
      >
        <Grid item xs={12} sm={10} md={8}>
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
        <Grid item xs={12} sm={12} md={11}>
          {getStepContent(activeStep)}
        </Grid>
      </Grid>
    </section>
  )
}

export default Proposal

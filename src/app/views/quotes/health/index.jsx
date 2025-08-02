import React, { Fragment, useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Grid, Stepper, Step, StepLabel, Button, Backdrop, CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { HealthActions } from 'store/actions'
import { connect } from 'react-redux'
import Icofont from 'react-icofont'

import StepHealthPersonalDetails from './SummaryPersonalDetails'
import StepHealthPlansDetails from './SummaryHealthPlan'
import StepHealthSummary from './StepSummary'

function getSteps () {
  return [
    'Personal Information',
    'Plans Selection',
    'Quotation Summary'
  ]
}

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  }
}))

const Health = (props) => {
  const classes = useStyles()
  const {
    healthLoading,
    quotationData,
    quoteDispatch
  } = props
  const location = useLocation()
  const queryParameters = new URLSearchParams(location.search)
  const step = queryParameters.get('step')
  const quotation_id = queryParameters.get('quotation-id')

  const [activeStep, setActiveStep] = useState(0)
  const [quotation, setQuotation] = useState(null)
  const steps = getSteps()

  function getStepContent (stepIndex, quote) {
    switch (parseInt(stepIndex)) {
      case 0:
        return <StepHealthPersonalDetails fromPage='home' quote={quote} />
      case 1:
        return <StepHealthPlansDetails fromPage='home' quote={quote} />
      case 2:
        return <StepHealthSummary fromPage='home' quote={quote} />
      default:
        return <StepHealthPersonalDetails fromPage='home' quote={quote} />
    }
  }

  // Step Changes
  useEffect(() => {
    if (step) {
      if (step === 'personal-information') {
        setActiveStep(0)
      } else if (step === 'plan-selection') {
        setActiveStep(1)
      } else if (step === 'quotation-summary') {
        setActiveStep(2)
      }
    }
  }, [step])

  // Quotation Fetch
  useEffect(() => {
    if (quotation_id) {
      quoteDispatch(quotation_id)
    }
  }, [quotation_id])

  // Quotation Success
  useEffect(() => {
    if (quotationData) {
      setQuotation(quotationData)
    }
  }, [quotationData])

  return (
    <>
      {quotation_id !== null
        ? (
          <Backdrop className={classes.backdrop} open={healthLoading}>
            <CircularProgress color='inherit' />
          </Backdrop>)
        : null}
      <section className='quote-create'>
        <Grid
          container
          direction='row'
          justifyContent='center'
          alignItems='flex-start'
        >
          <Grid item xs={12} sm={12} md={11}>
            <h4 className='section-title'><Link to='/overview'><Icofont icon='arrow-left' /></Link> Health Quotation</h4>
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
            {getStepContent(activeStep, quotationData)}
          </Grid>
        </Grid>
      </section>
    </>
  )
}

const mapStateToProps = (state) => {
  const { Health } = state
  return {
    healthLoading: Health.healthLoading,
    quotationData: Health.quotationData
  }
}

const mapDispatchToProps = (dispatch) => ({
  quoteDispatch: (quoteId) => dispatch(HealthActions.GetQuotationInfo(quoteId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Health)

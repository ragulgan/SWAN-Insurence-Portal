import React, { useState, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { Grid, Stepper, Step, StepLabel, makeStyles } from '@material-ui/core'
import { shallowEqual, useSelector } from 'react-redux'
import Icofont from 'react-icofont'
import StepPersonalDetails from './StepPersonalDetails'
import StepVehicleDetails from './StepVehicleDetails'
import StepExtensions from './StepExtensions'
import StepPlans from './StepPlans'
import StepSummary from './StepSummary'
import { MOTOR_FORM } from '../../../../helpers/constants'
import {
  getSessionStorage,
  setSessionStorage
} from '../../../../helpers/helper'
import LeaveQuoteConfirmation from '../../../widgets/LeaveQuoteConfirmation'

const useStyles = makeStyles((theme) => ({
  textColor: {
    color: '#00B8CE !important',
    fontSize: '21px'
  }
}
))

function getSteps () {
  return [
    'Personal Information',
    'Vehicle Details',
    'Extensions',
    'Quotation Summary'
  ]
}

const Motor = () => {
  const { authRole } = useSelector(
    ({ Auth, Quotation }) => ({
      authRole: Auth.authRole,
      quotationStep: Quotation.quotationStep
    }),
    shallowEqual
  )
  const history = useHistory()
  const classes = useStyles()
  const search = useLocation().search
  const quoteNumber = new URLSearchParams(search).get('quote')
  const active = getSessionStorage(MOTOR_FORM.ACTIVE_STEP)
  const [popConfirm, setPopConfirm] = useState(false)
  const [activeStep, setActiveStep] = useState(1)
  const [detectChanges, setDetectChanges] = useState(0)
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
  const handleBrowserBackNext = (e) =>{
    e.preventDefault();
    const message ="Are you sure you want to leave? All provided data will be lost.";
    e.returnValue = message;
    return message;
  }
  const LoginHandler = () => {
    setPopConfirm(true)
  }
  const handleClose = () => {
    setPopConfirm(false)
  }
  const LogoutHandler = () => {
    history.push('/agent/quotes/list')
  }

  useEffect(() => {    
    //window.addEventListener('popstate', (event) => {
     // event.preventDefault
      //alert("You message");
      //setPopConfirm(true)
      //console.log("event", event)
    //});
    //window.onpopstate = function(event) {
      //alert("You message");
    //};
  }, [])

  useEffect(() => {
   // return () => {
      //if (history.action === 'POP') {
        
        //console.log("history.action", history.action)
          //history.go(1);
          //setPopConfirm(true)
      //}
   // };
  }, [history]);

  useEffect(() => {
    document.body.classList.add('aside-minimize')
    if (!detectChanges) {
      setActiveStep(Number(active))
    }
    return () => {
      document.body.classList.remove('aside-minimize')
    }
  }, [])

  function getStepContent (stepIndex, quoteNumber) {
    switch (parseInt(stepIndex)) {
      case 0:
        return (
          <StepPersonalDetails
            fromPage='home'
            back={handleBack}
            next={handleNext}
            quoteNumber={quoteNumber}
          />
        )
      case 1:
        return (
          <StepVehicleDetails
            fromPage='home'
            back={handleBack}
            next={handleNext}
            quoteNumber={quoteNumber}
          />
        )
      case 2:
        return authRole === 'customer'
          ? (
            <StepPlans
              fromPage='home'
              back={handleBack}
              next={handleNext}
              quoteNumber={quoteNumber}
            />
            )
          : (
            <StepExtensions
              fromPage='home'
              back={handleBack}
              next={handleNext}
              quoteNumber={quoteNumber}
            />
            )
      case 3:
        return (
          <StepSummary
            fromPage='home'
            back={handleBack}
            next={handleNext}
            quoteNumber={quoteNumber}
          />
        )
      default:
        return (
          <StepPersonalDetails
            fromPage='home'
            back={handleBack}
            next={handleNext}
            quoteNumber={quoteNumber}
          />
        )
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
          <h4
            className='section-title'
          >
            <Icofont icon='arrow-left'
              onClick={() => { setPopConfirm(true) }}
              className={classes.textColor} />
            Motor Quotation
          </h4>
          <LeaveQuoteConfirmation
            open={popConfirm}
            close={handleClose}
            login={LoginHandler}
            logout={LogoutHandler}
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
          {getStepContent(activeStep, quoteNumber)}
        </Grid>
      </Grid>
    </section>
  )
}

export default Motor

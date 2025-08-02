import React, { useState, useEffect, Fragment } from 'react'
import { Grid, Button } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import { REGEX, GRANTED_USERS } from 'helpers/constants'
import { shallowEqual, useSelector } from 'react-redux'
import { useLocation, useHistory } from 'react-router-dom'
import { makeQueryString } from 'helpers/helper'
import InfoPopup from 'app/widgets/InfoPopup'
import HealthPlans from 'app/widgets/HealthPlans'
import ComparePlans from 'app/widgets/ComparePlans'
import Mswitch from 'app/form-controls/Mswitch'
import _ from 'lodash'

const StepPlanSelectionDetails = (props) => {
  const history = useHistory()
  const { authRole } = useSelector(
    ({ Auth }) => ({
      authRole: Auth.authRole
    }),
    shallowEqual
  )
  const location = useLocation()
  const queryParameters = new URLSearchParams(location.search)
  const step = queryParameters.get('step')
  const quotation_id = queryParameters.get('quotation-id')
  const {
    switches,
    fromPage,
    quote
  } = props
  const {
    control,
    watch,
    handleSubmit,
    formState,
    clearErrors,
    reset,
    setError
  } = useForm({
    defaultValues: {}
  })
  const [dep] = useState(false)
  const [toggle, setToggle] = useState(false)
  const [planModal, setPlanModal] = useState(false)
  const [selectedPlans, setSelectedPlans] = useState([])

  const handleToggle = () => {
    toggle ? setToggle(false) : setToggle(true)
  }
  const planHandler = (value) => {
    setPlanModal(value)
  }
  const planSelectHandler = (planTitle, planId) => {
    setSelectedPlans(current => [...current, {
      planTitle: planId
    }])
  }
  const onSubmit = (data) => {

  }

  const label = { inputProps: { 'aria-label': 'toggle' } }

  // Update quote data
  useEffect(() => {
    if (!_.isEmpty(quote)) {
      console.log('quote', quote)
    }
  }, [quote])

  // Clear selected plans on closing comparison modal
  useEffect(() => {
    if (planModal === false) {
      setSelectedPlans([])
    }
  }, [planModal])

  // Open comparison popup
  useEffect(() => {
    if (selectedPlans) {
      if (_.size(selectedPlans) === 3) {
        planHandler(true)
      }
    }
  }, [selectedPlans])

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid
          container
          direction='row'
          justifyContent='center'
          alignItems='flex-end'
          spacing={4}
        >
          <Grid item xs={12} sm={12} md={12} xl={12} lg={12}>
            <Grid container alignItems='flex-end' spacing={2}>
              <Grid item xs={12} sm={12} md={12} xl={12}>
                <h4 className='form-title-md'>Health Insurance Plans</h4>
              </Grid>
              <Grid item xs={12} sm={12} md={12} xl={12}>
                <h4 className='price-bold-header'>You can select multiple plans for your client</h4>
              </Grid>
              <Grid item xs={4} sm={3} md={3} lg={3} xl={3}>
                <ul className='plan-ul-health'>
                  <li>Surgical Care </li>
                  <li>Delivery and Childbirth</li>
                  <li>Road Ambulance</li>
                  <li>Medical Treatment</li>
                  <li>Congenital Operation</li>
                  <li>Assisted Reproduction</li>
                  <li>Psychological Trauma</li>
                  <li>Funeral Benefit</li>
                </ul>
              </Grid>
              <Grid item xs={8} sm={9} md={9} lg={9} xl={9} className='carousel-plan-selection-shadow'>
                <HealthPlans
                  planSelector={planSelectHandler}
                  selectedPlans={selectedPlans}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Grid container alignItems='flex-start' spacing={2}>
              <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                <h4 style={{ color: '#000' }}>
                  COVID-19 Extension{' '}
                  <InfoPopup
                    info='Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                        sed do eiusmod tempor incididunt ut labore et dolore Lorem ipsum dolor sit amet, consectetur.'
                  />
                </h4>
                <p>Do you want a COVID-19<br /> extension? </p>
              </Grid>
              <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                <Mswitch
                  {...label}
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  name='INSUREDMEMBER'
                  component={switches}
                  onChange={handleToggle}
                  checked={toggle}
                  control={control}
                  grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                  userType={authRole}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={fromPage === 'summary' ? 12 : 4} md={12} xl={12} lg={12} className='txt-right travel-plan'>
            <Button
              variant='outlined'
              color='primary'
              className='mar-right-s back-button1'
              onClick={() => (
                history.push({
                  pathname: 'health',
                  search: `?${makeQueryString({
                                        'quotation-id': quotation_id,
                                        step: 'personal-information'
                                    })}`
                })
              )}
            >
              Back
            </Button>
            <Button
              variant='contained'
              className='next-button1'
              color='primary'
              onClick={() => (
                history.push({
                  pathname: 'health',
                  search: `?${makeQueryString({
                                        'quotation-id': quotation_id,
                                        step: 'quotation-summary'
                                    })}`
                })
              )}
            >
              Next
            </Button>
          </Grid>
        </Grid>
        <ComparePlans
          open={planModal}
          handler={planHandler}
          control={control}
          watch={watch}
        />
      </form>
    </>
  )
}

export default StepPlanSelectionDetails

import React, { useState, useEffect } from 'react'
import { Grid, Button } from '@material-ui/core'
import { shallowEqual, useSelector } from 'react-redux'
import _ from 'lodash'
import EditIcon from '@material-ui/icons/Edit'
import Icofont from 'react-icofont'
import { useForm } from 'react-hook-form'
import InfoPopup from '../../../../app/widgets/InfoPopup'
import ValidateNotify from '../../../../app/widgets/ValidateNotify'
import Mswitch from '../../../../app/form-controls/Mswitch'
import { REGEX, GRANTED_USERS } from '../../../../helpers/constants'

const StepCoverpriceDetails = (props) => {
  const { authRole } = useSelector(
    ({ Auth }) => ({
      authRole: Auth.authRole
    }),
    shallowEqual
  )
  const { switches, fromPage, back, next } = props
  const { control, watch, handleSubmit, formState } = useForm({
    defaultValues: {
      rememberMe: '',
      light: '',
      regular: '',
      bold: '',
      delta: '',
      atlas: '',
      explorer: '',
      compass: ''
    }
  })

  const [activeBox, setActiveBox] = useState(null)
  const [activePack, setActivePack] = useState(null)
  const [toggle, setToggle] = useState(false)
  const [errorPop, setErrorPop] = useState(false)
  const refused = watch('refused')
  const { errors } = formState
  const message = 'Please fill in required information to proceed'
  const handleToggle = () => {
    toggle ? setToggle(false) : setToggle(true)
  }

  const onSubmit = (data) => {
    next()
  }

  const clearNotify = () => {
    setErrorPop(false)
  }

  useEffect(() => {}, [refused])

  useEffect(() => {
    if (_.size(errors)) {
      setErrorPop(true)
    }
  }, [errors])

  const label = { inputProps: { 'aria-label': 'toggle' } }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid
        container
        direction='row'
        justifyContent='center'
        alignItems='flex-start'
        spacing={4}
      >
        {(() => {
          if (activeBox === null) {
            return (
              <Grid item xs={12} sm={12} md={12}>
                <Grid container alignItems='center' spacing={2}>
                  <Grid item md={12}>
                    <h4 className='form-title-md'>Travel Insurance Plans</h4>
                  </Grid>
                  <Grid item md={3}>
                    <h4>Select the preferred plan of your client</h4>
                    <ul className='plan-ul'>
                      <li>
                        Medical emergency and related expenses{' '}
                        <InfoPopup
                          info='Personal Emergency Assistance Service and Cover
                            including:
                            Medical Emergency Assistance;
                            Transportation/Repatriation;
                            Return of Travel Companion;
                            Return of Childern;
                            visit by a Family Memeber;
                            Return in case of Death or Imminent Death of
                            close Relative or Business Associate;
                            Bail;
                            Lost of Travel Documents;
                            Transmission of Urgent Messages.
                            .'
                        />
                      </li>
                      <li>Burial, Cremation or Return of Mortal Remains</li>
                      <li>Legal Assistance</li>
                      <li>Personal Liability Insurance</li>
                      <li>Cancellation, Curtailment Alteration & Expenses</li>
                      <li>Personal Accident, Death & Permanent Disability</li>
                    </ul>
                  </Grid>
                  <Grid item md={9}>
                    <Grid container spacing={3}>
                      <Grid item md={3}>
                        <section
                          className={`${
                            activeBox === 'Delta'
                              ? 'plan-box active-box'
                              : 'plan-box'
                          }`}
                          onClick={() => setActiveBox('Delta')}
                        >
                          <h4>DELTA</h4>
                          <h3>Rs 1,259</h3>
                          <p>Rs 250,000</p>
                          <p>Rs 100,000</p>
                          <p>Rs 10,000</p>
                          <p>Rs 250,000</p>
                          <p>Rs 5,000</p>
                          <p>Rs 500,000</p>
                        </section>
                      </Grid>
                      <Grid item md={3}>
                        <section
                          className={`${
                            activeBox === 'atlas'
                              ? 'plan-box active-box'
                              : 'plan-box'
                          }`}
                          onClick={() => setActiveBox('Atlas')}
                        >
                          <h4>ATLAS</h4>
                          <h3>Rs 1,620</h3>
                          <p>Rs 500,000</p>
                          <p>Rs 100,000</p>
                          <p>Rs 15,000</p>
                          <p>Rs 500,000</p>
                          <p>Rs 25,000</p>
                          <p>Rs 1,000,000</p>
                        </section>
                      </Grid>
                      <Grid item md={3}>
                        <section
                          className={`${
                            activeBox === 'explorer'
                              ? 'plan-box active-box'
                              : 'plan-box'
                          }`}
                          onClick={() => setActiveBox('Explorer')}
                        >
                          <h4>EXPLORER</h4>
                          <h3>Rs 2,343</h3>
                          <p>Rs 1,500,000</p>
                          <p>Rs 100,000</p>
                          <p>Rs 10,000</p>
                          <p>Rs 250,000</p>
                          <p>Rs 50,000</p>
                          <p>Rs 500,000</p>
                        </section>
                      </Grid>
                      <Grid item md={3}>
                        <section
                          className={`${
                            activeBox === 'compass'
                              ? 'plan-box active-box'
                              : 'plan-box'
                          }`}
                          onClick={() => setActiveBox('Compass')}
                        >
                          <h4>COMPASS</h4>
                          <h3>Rs3,065</h3>
                          <p>Rs 1,500,000</p>
                          <p>Rs 100,000</p>
                          <p>Rs 25,000</p>
                          <p>Rs 2,500,000</p>
                          <p>Rs 100,000</p>
                          <p>Rs 5,000,000</p>
                        </section>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            )
          } else {
            return (
              <Grid item xs={12} sm={12} md={12}>
                <Grid container spacing={2}>
                  <Grid item md={12}>
                    <h2
                      className='article-title'
                      onClick={() => setActiveBox(null)}
                    >
                      <Icofont icon='arrow-left' />
                      {activeBox} Coverage Plan
                    </h2>
                  </Grid>
                  <Grid item md={9}>
                    <Grid container spacing={3}>
                      <Grid item md={4}>
                        <section
                          className={`${
                            activePack === 'light'
                              ? 'plan-box active-box'
                              : 'plan-box'
                          }`}
                          onClick={() => setActivePack('light')}
                        >
                          <h4>LIGHT</h4>
                          <p>
                            Light Regular includes a baggage, money and document
                            insurance
                          </p>
                          <p>
                            <span className='delta-price'>Rs 602</span>
                          </p>
                          <p className='separator-center'>More Details</p>
                          <p>
                            Baggage Insurance{' '}
                            <span className='price-bold'>Rs 15,000</span>
                          </p>
                          <p>
                            Money & Document Insurance{' '}
                            <span className='price-bold'>Rs 2,000</span>
                          </p>
                        </section>
                      </Grid>
                      <Grid item md={4}>
                        <section
                          className={`${
                            activePack === 'regular'
                              ? 'plan-box active-box'
                              : 'plan-box'
                          }`}
                          onClick={() => setActivePack('regular')}
                        >
                          <h4>REGULAR</h4>
                          <p>
                            Delta Regular includes a baggage, money and document
                            insurance
                          </p>
                          <p>
                            <span className='delta-price'>Rs 602</span>
                          </p>
                          <p className='separator-center'>More Details</p>
                          <p>
                            Baggage Insurance{' '}
                            <span className='price-bold'>Rs 20,000</span>
                          </p>
                          <p>
                            Money & Document Insurance{' '}
                            <span className='price-bold'>Rs 4,000</span>
                          </p>
                        </section>
                      </Grid>
                      <Grid item md={4}>
                        <section
                          className={`${
                            activePack === 'bold'
                              ? 'plan-box active-box'
                              : 'plan-box'
                          }`}
                          onClick={() => setActivePack('bold')}
                        >
                          <h4>BOLD</h4>
                          <p>
                            Bold includes a baggage, money and document
                            insurance
                          </p>
                          <p>
                            <span className='delta-price'>Rs 602</span>
                          </p>
                          <p className='separator-center'>More Details</p>
                          <p>
                            Baggage Insurance{' '}
                            <span className='price-bold'>Rs 30,000</span>
                          </p>
                          <p>
                            Money & Document Insurance{' '}
                            <span className='price-bold'>Rs 6,000</span>
                          </p>
                        </section>
                      </Grid>
                    </Grid>

                    <Grid className='toggle-verticle' container spacing={2}>
                      <Grid item md={5}>
                        <div className='s__head'>
                          <h4>Passive Terrorism</h4>
                          <p>Do you want the passive terrorism cover?</p>
                        </div>
                        <Grid className='swan__switch'>
                          <Mswitch
                            {...label}
                            name='rememberMe'
                            component={switches}
                            onChange={handleToggle}
                            checked={toggle}
                            control={control}
                            grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                            userType={authRole}
                          />
                        </Grid>
                      </Grid>

                      {activeBox === 'Compass'
                        ? (
                          <>
                            <Grid item md={5}>
                              <div className='s__head_v'>
                                <h4>COVID-19 Extension</h4>
                                <p>Do you want a COVID-19 extension? </p>
                              </div>
                              <Grid className='swan__switch'>
                                <Mswitch
                                  {...label}
                                  name='rememberMe'
                                  component={switches}
                                  onChange={handleToggle}
                                  checked={toggle}
                                  control={control}
                                />
                              </Grid>
                            </Grid>
                          </>
                          )
                        : (
                            ''
                          )}
                    </Grid>
                  </Grid>
                  <Grid item md={3}>
                    <section className='travel-summary'>
                      <h4 className='delta-price'>TRAVEL SUMMARY</h4>
                      <h5>Total</h5>
                      <h4 className='delta-price'>Rs 2713</h4>
                      <ul>
                        <div className='delta-price'>
                          Coverage Plan{' '}
                          <span>
                            <EditIcon
                              style={{ fontSize: '1.5rem', color: '#00B8CE' }}
                            />
                          </span>
                        </div>
                        <br />
                        <li>
                          Delta <span>Rs 1259</span>
                        </li>
                        <li>
                          Regular <span>Rs 602</span>
                        </li>
                        <li>
                          Premium <span className='price-bold'>Rs 1861</span>
                        </li>
                      </ul>
                      <ul>
                        <li>
                          FSC Fee <span>Rs 250</span>
                        </li>
                        <li>
                          Fees and Charge <span>Rs 602</span>
                        </li>
                      </ul>
                      <ul>
                        <li>
                          TOTAL <span className='price-bold'>Rs 2713</span>
                        </li>
                      </ul>
                      <ul>
                        <div className='delta-price'>
                          Travel Details{' '}
                          <span>
                            <EditIcon
                              style={{ fontSize: '1.5rem', color: '#00B8CE' }}
                            />
                          </span>
                        </div>
                        <br />
                        <li>
                          Destination <span>France</span>
                        </li>
                        <li>
                          Departure <span>18 Aug 2022</span>
                        </li>
                        <li>
                          Return <span>18 Sep 2022</span>
                        </li>
                        <li>
                          Duration <span>33 days</span>
                        </li>
                        <li>
                          Travellers <span>1 Adult</span>
                        </li>
                      </ul>
                    </section>
                  </Grid>
                </Grid>
              </Grid>
            )
          }
        })()}
        <Grid item xs={12} sm={fromPage === 'summary' ? 12 : 8} md={8}>
          <ValidateNotify show={errorPop} errors={message} clear={clearNotify} />
        </Grid>
        <Grid
          item
          xs={12}
          sm={fromPage === 'summary' ? 12 : 4}
          md={4}
          className='txt-right'
        >
          <Button
            variant='outlined'
            color='primary'
            className='mar-right-s'
            onClick={() => back()}
          >
            Back
          </Button>
          <Button variant='contained' color='primary' onClick={() => next()}>
            Next
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}
export default StepCoverpriceDetails

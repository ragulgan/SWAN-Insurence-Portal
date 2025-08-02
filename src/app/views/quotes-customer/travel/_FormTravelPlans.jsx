import React, { useEffect, useState } from 'react'
import { shallowEqual, useSelector, connect } from 'react-redux'

import {
  Grid,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography
} from '@material-ui/core'
import _ from 'lodash'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { useForm } from 'react-hook-form'
import Mtextbox from '../../../../app/form-controls/Mtextbox'
import Mselect from '../../../../app/form-controls/Mselect'
import Mswitch from '../../../../app/form-controls/Mswitch'
import Mdatepicker from '../../../../app/form-controls/Mdatepicker'
import ValidateNotify from '../../../../app/widgets/ValidateNotify'
import { PersonalDropdownActions } from '../../../../store/actions/index'
import { REGEX, GRANTED_USERS } from '../../../../helpers/constants'
import SelectField from './CustomSelect'
// import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import moment from 'moment'

const validationSchema = yup.object().shape({
  choose_destination: yup.string().required('Destination is required'),
  from_date: yup
    .date()
    .min(new Date(), 'Please choose future date')
    .required('Trip start date is required'),
  to_date: yup
    .date()
    .when('from_date', (from_date, schema) => {
      if (from_date) {
        const dayAfter = new Date(from_date.getTime() + 86400000)
        return schema.min(dayAfter, 'End date has to be after than start date')
      }
      return schema
    })
    .required('Trip end date is required'),
  number_of_days: yup.string().required('Number of travelling days required'),
  number_of_travels: yup.string().required('Number of travels required'),
  full_name: yup.string().required('FullName is required'),
  passport_number: yup.string().required('Passport number is required'),
  dob: yup
    .string()
    .test('DOB', 'Selected date is current date', function (date) {
      if (moment().isSame(moment(date), 'day')) {
        return this.createError({ message: 'Selected date is current date' })
      } else if (moment().diff(moment(date), 'years') > 74) {
        return this.createError({ message: 'Your age should not be above 74' })
      } else if (moment().diff(moment(date), 'years') <= 18) {
        return this.createError({ message: 'Your age should be above 18' })
      } else if (
        moment().diff(moment(date), 'years') >= 18 &&
        moment().diff(moment(date), 'years') <= 74
      ) {
        return true
      }
    }),
  title_other: yup.string().required('Relationship is required'),
  addtraveller_dob: yup
    .string()
    .test('DOB', 'Selected date is current date', function (date) {
      if (moment().isSame(moment(date), 'day')) {
        return this.createError({ message: 'Selected date is current date' })
      } else if (moment().diff(moment(date), 'years') > 74) {
        return this.createError({ message: 'Your age should not be above 74' })
      } else if (moment().diff(moment(date), 'years') <= 0) {
        return this.createError({ message: 'Please select before date' })
      } else if (
        moment().diff(moment(date), 'years') <= 1 ||
        moment().diff(moment(date), 'years') <= 74
      ) {
        return true
      }
    })
    .required('Add Traveller DOB is required'),
  addtraveller_full_name: yup.string().required('FullName is required'),
  number_of_limit_traveller: yup
    .string()
    .required('Number of limit travellers is required')
})

const FormTravelPlansDetails = (props) => {
  const { authRole } = useSelector(
    ({ Auth }) => ({
      authRole: Auth.authRole
    }),
    shallowEqual
  )
  const { fromPage, back, next, getTitleDropdownDispatch, titleData } = props
  const {
    register,
    control,
    watch,
    setValue,
    getValues,
    handleSubmit,
    formState
  } = useForm({
    // resolver: yupResolver(validationSchema),
    defaultValues: {
      choose_destination: '',
      from_date: '',
      to_date: '',
      annual_cover: false,
      number_of_days: '',
      number_of_travels: '',
      add_traveller: false,
      title_self: 'Self',
      title_other: '',
      full_name: '',
      passport_number: '',
      dob: '',
      child_share: false,
      addtraveller_dob: '',
      addtraveller_full_name: '',
      number_of_limit_traveller: ''
    }
  })

  const options1 = [
    { label: 'Self', value: 'Self' },
    { label: 'Spouse', value: 'Spouse' },
    { label: 'Child', value: 'Child' },
    { label: 'Friend', value: 'Friend' },
    { label: 'Parent', value: 'Parent' },
    { label: 'Other', value: 'Other' }
  ]

  const [errorPop, setErrorPop] = useState(false)
  const refused = watch('refused')
  const { errors } = formState
  const message = 'Please fill in required information to proceed'
  const annualtoggle = watch('annual_cover')
  const toggle = watch('add_traveller')
  const togglecover = watch('child_share')

  // const [toggle, setToggle] = useState(false);
  const [addtraveller, setAddTraveller] = useState(0)
  const [addDob, setAddDob] = useState('')

  const onSubmit = (data) => {
    console.log('data -', data)
    next()
  }

  const getDate = () => {
    const condition_date = document.getElementById('addtraveller_dob').value
    setAddDob(condition_date)
    const condition_date2 = moment().diff(moment(condition_date), 'years')

    const element1 = document.getElementById('top-message')
    element1.style.display = 'none'
    const element2 = document.getElementById('bottom-message')
    element2.style.display = 'none'
    const element3 = document.getElementById('middle-toggle')
    element3.style.display = 'none'
    const element4 = document.getElementById('restrict-message')
    element4.style.display = 'none'

    if (condition_date2 > 60 && condition_date2 < 64) {
      const element1 = document.getElementById('top-message')
      element1.style.display = 'block'
    } else if (condition_date2 > 65 && condition_date2 < 74) {
      const element2 = document.getElementById('bottom-message')
      element2.style.display = 'block'
    } else if (condition_date2 < 18) {
      const element3 = document.getElementById('middle-toggle')
      element3.style.display = 'block'
    } else if (condition_date2 < 74) {
      const element4 = document.getElementById('restrict-message')
      element4.style.display = 'block'
    } else if (condition_date2 > 18 && condition_date2 < 59) {
      const element5 = document.querySelectorAll(
        '#middle-toggle',
        '#bottom-message',
        '#top-message',
        '#restrict-message'
      )
      element5.style.display = 'none'
    }
  }

  const handleToggle = () => {
    setAddTraveller(1)
    // toggle ? setToggle(false) : setToggle(true);
  }

  const handleClick = () => {
    setAddTraveller(3)
    const count = document.getElementById('number_of_limit_traveller').value
    const countVal = count != '' ? Number(count) : 1
    setAddTraveller(addtraveller + countVal)
  }

  const handleClickDelete = (e, removeId) => {
    const element = document.getElementById(
      'accordian_custom_container_' + removeId
    )
    element.style.display = 'none'
  }

  const clearNotify = () => {
    setErrorPop(false)
  }

  useEffect(() => {}, [refused])

  useEffect(() => {
    getTitleDropdownDispatch()
  }, [])

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
        spacing={fromPage === 'summary' ? 2 : 4}
      >
        <Grid item xs={12} sm={12} md={12}>
          <Grid container spacing={fromPage === 'summary' ? 1 : 2}>
            <Grid item xs={12}>
              <h4 className='form-title-md'>
                Travel Information{' '}
                <span>
                  <span className='req-mark'>*</span> Required field
                </span>
              </h4>
            </Grid>

            <Grid
              item
              xs={12}
              sm={fromPage === 'summary' ? 12 : 10}
              md={fromPage === 'summary' ? 12 : 10}
            >
              <Grid
                container
                alignItems='center'
                spacing={fromPage === 'summary' ? 1 : 2}
              >
                <Mselect
                  xs={12}
                  sm={fromPage === 'summary' ? 12 : 10}
                  md={fromPage === 'summary' ? 12 : 10}
                  name='choose_destination'
                  label='Choose Destination/s'
                  control={control}
                  className='form-country-md'
                  component={SelectField}
                  options={titleData && titleData}
                  optionsLabel='TITLE'
                  optionsValue='TITLEID'
                  // {...register("choose_destination")}
                  req
                  grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                  userType={authRole}
                />
              </Grid>
            </Grid>

            <Grid
              item
              xs={12}
              sm={fromPage === 'summary' ? 12 : 10}
              md={fromPage === 'summary' ? 12 : 10}
            >
              <span>Travelling Dates</span>
            </Grid>

            <Grid
              item
              xs={12}
              sm={fromPage === 'summary' ? 12 : 10}
              md={fromPage === 'summary' ? 12 : 10}
            >
              <Grid
                container
                alignItems='center'
                spacing={fromPage === 'summary' ? 1 : 2}
              >
                <Grid item xs={12} md={fromPage === 'summary' ? 6 : 1}>
                  <span>From</span>
                </Grid>
                <Grid item xs={12} md={fromPage === 'summary' ? 6 : 4}>
                  <Mdatepicker
                    name='from_date'
                    label='DD/MM/YYYY'
                    control={control}
                    // {...register("from_date")}
                    req
                    grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                    userType={authRole}
                  />
                </Grid>

                <Grid
                  item
                  xs={12}
                  md={fromPage === 'summary' ? 6 : 1} /* className="txt-center" */
                >
                  <span>To</span>
                </Grid>
                <Grid item xs={12} md={fromPage === 'summary' ? 6 : 4}>
                  <Mdatepicker
                    name='to_date'
                    label='DD/MM/YYYY'
                    control={control}
                    // {...register("to_date")}
                    req
                    grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                    userType={authRole}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid
              item
              xs={12}
              sm={fromPage === 'summary' ? 12 : 10}
              md={fromPage === 'summary' ? 12 : 10}
            >
              <Grid
                container
                alignItems='center'
                spacing={fromPage === 'summary' ? 1 : 2}
              >
                <Grid item xs={12} md={fromPage === 'summary' ? 10 : 7}>
                  <Mswitch
                    name='annual_cover'
                    label='Will it be an Annual Cover type?'
                    control={control}
                    grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                    userType={authRole}
                  />
                </Grid>
              </Grid>
            </Grid>

            {annualtoggle === true ? (
              <>
                <Grid
                  item
                  xs={12}
                  sm={fromPage === 'summary' ? 12 : 10}
                  md={fromPage === 'summary' ? 12 : 10}
                >
                  <Grid
                    container
                    alignItems='center'
                    spacing={fromPage === 'summary' ? 1 : 2}
                  >
                    <Grid item xs={12} md={fromPage === 'summary' ? 12 : 3}>
                      <span>
                        Estimated Number
                        <br />
                        of Days Per Trips
                      </span>
                    </Grid>
                    <Grid item xs={12} md={fromPage === 'summary' ? 5 : 3}>
                      <Mtextbox
                        name='number_of_days'
                        label='Number of Days'
                        type='number'
                        control={control}
                        // {...register("number_of_days")}
                        req
                        grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                        userType={authRole}
                      />
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      md={fromPage === 'summary' ? 2 : 1}
                      className='txt-center'
                    >
                      <span>Per</span>
                    </Grid>
                    <Grid item xs={12} md={fromPage === 'summary' ? 5 : 3}>
                      <Mtextbox
                        name='number_of_travels'
                        label='Number of Travels'
                        type='number'
                        control={control}
                        // {...register("number_of_travels")}
                        req
                        grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                        userType={authRole}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </>
            ) : null}

            <Grid
              item
              xs={12}
              sm={fromPage === 'summary' ? 12 : 10}
              md={fromPage === 'summary' ? 12 : 10}
            >
              <Grid
                container
                alignItems='center'
                spacing={fromPage === 'summary' ? 1 : 2}
              >
                <Grid item xs={6} md={fromPage === 'summary' ? 6 : 5}>
                  <h4 className='form-title-md'>Traveller’s Information</h4>
                </Grid>
                <Grid
                  item
                  xs={6}
                  md={fromPage === 'summary' ? 6 : 5}
                  className='txt-right'
                >
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={handleClick}
                  >
                    ADD TRAVELLER
                  </Button>
                </Grid>
              </Grid>
            </Grid>

            <Grid
              item
              xs={12}
              sm={fromPage === 'summary' ? 12 : 10}
              md={fromPage === 'summary' ? 12 : 10}
            >
              <Grid
                container
                alignItems='center'
                spacing={fromPage === 'summary' ? 1 : 2}
              >
                <Grid item xs={12} md={fromPage === 'summary' ? 10 : 7}>
                  <Mswitch
                    name='add_traveller'
                    label='Will the client be one of the travellers?'
                    control={control}
                    grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                    userType={authRole}
                  />
                </Grid>
              </Grid>
            </Grid>

            {toggle === true ? (
              <>
                <Grid
                  container
                  direction='row'
                  alignItems='flex-start'
                  spacing={4}
                >
                  <Grid item xs={12} sm={12} md={12}>
                    <Grid
                      container
                      spacing={fromPage === 'summary' ? 1 : 2}
                      alignItems='center'
                    >
                      <Grid
                        item
                        xs={12}
                        sm={fromPage === 'summary' ? 12 : 6}
                        md={fromPage === 'summary' ? 12 : 6}
                      >
                        <Accordion>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls='panel1a-content'
                            id='panel1a-header'
                          >
                            <Typography>
                              <span className='form-traveller-header'>
                                Traveller 1:
                              </span>{' '}
                              Javin Hong Wa Ban
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Grid
                              container
                              spacing={fromPage === 'summary' ? 1 : 2}
                              alignItems='center'
                            >
                              <Grid item xs={4} md={4}>
                                <Mselect
                                  label='Relationship'
                                  name='title_self'
                                  control={control}
                                  options={titleData && titleData}
                                  optionsLabel='TITLE'
                                  optionsValue='TITLEID'
                                />
                              </Grid>
                              <Grid item xs={8} md={8}>
                                <Mtextbox
                                  label='Full Name'
                                  name='full_name'
                                  control={control}
                                  // {...register("full_name")}
                                  req
                                />
                              </Grid>
                              <Grid item xs={12} md={7}>
                                <Mtextbox
                                  label='Passport Number'
                                  name='passport_number'
                                  control={control}
                                  // {...register("passport_number")}
                                  req
                                />
                              </Grid>
                              <Grid item xs={12} md={5}>
                                <Mdatepicker
                                  label='Date of Birth'
                                  name='dob'
                                  control={control}
                                  // {...register("dob")}
                                  req
                                />
                              </Grid>
                            </Grid>
                          </AccordionDetails>
                        </Accordion>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </>
            ) : (
              <>
                <Grid
                  container
                  direction='row'
                  alignItems='flex-start'
                  spacing={4}
                >
                  <Grid item xs={12} sm={12} md={12}>
                    <Grid
                      container
                      spacing={fromPage === 'summary' ? 1 : 2}
                      alignItems='flex-start'
                    >
                      <Grid
                        item
                        xs={12}
                        sm={fromPage === 'summary' ? 12 : 6}
                        md={fromPage === 'summary' ? 12 : 6}
                      >
                        <Accordion>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls='panel1a-content'
                            id='panel1a-header'
                          >
                            <Typography>
                              <span className='form-traveller-header'>
                                Traveller 1:
                              </span>{' '}
                              Javin Hong Wa Ban
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Grid
                              container
                              spacing={fromPage === 'summary' ? 1 : 2}
                              alignItems='center'
                            >
                              <Grid item xs={4} md={4}>
                                <Mselect
                                  label='Relationship'
                                  name='title_self'
                                  control={control}
                                  options={titleData && titleData}
                                  optionsLabel='TITLE'
                                  optionsValue='TITLEID'
                                />
                              </Grid>
                              <Grid item xs={8} md={8}>
                                <Mtextbox
                                  label='Full Name'
                                  name='full_name'
                                  control={control}
                                  // {...register("full_name")}
                                  req
                                />
                              </Grid>
                              <Grid item xs={12} md={7}>
                                <Mtextbox
                                  label='Passport Number'
                                  name='passport_number'
                                  control={control}
                                  // {...register("passport_number")}
                                  req
                                />
                              </Grid>
                              <Grid item xs={12} md={5}>
                                <Mdatepicker
                                  label='Date of Birth'
                                  name='dob'
                                  control={control}
                                  // {...register("dob")}
                                  req
                                />
                              </Grid>
                            </Grid>
                          </AccordionDetails>
                        </Accordion>
                      </Grid>
                      {Array.from(Array(addtraveller)).map((c, index) => {
                        return (
                          <Grid
                            item
                            xs={12}
                            sm={fromPage === 'summary' ? 12 : 6}
                            md={fromPage === 'summary' ? 12 : 6}
                            id={'accordian_custom_container_' + (index + 2)}
                          >
                            <Accordion>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls='panel1a-content'
                                id='panel1a-header'
                              >
                                <div className='d-block'>
                                  <Typography>
                                    <span className='form-traveller-header'>
                                      Traveller {index + 2}:
                                    </span>{' '}
                                    Fabiola Marie Hong Wa Ban
                                  </Typography>
                                  <Typography
                                    className='form-traveller-medical-report'
                                    id='top-message'
                                  >
                                    Required: Medical Report from Treating
                                    Doctor
                                  </Typography>
                                </div>
                              </AccordionSummary>
                              <AccordionDetails>
                                <Grid
                                  container
                                  spacing={fromPage === 'summary' ? 1 : 2}
                                  alignItems='center'
                                >
                                  <Grid item xs={4} md={4}>
                                    <Mselect
                                      label='Relationship'
                                      name='title_other'
                                      control={control}
                                      options={titleData && titleData}
                                      optionsLabel='TITLE'
                                      optionsValue='TITLEID'
                                      // {...register("title_other")}
                                      req
                                    />
                                  </Grid>
                                  <Grid item xs={8} md={8}>
                                    <Mdatepicker
                                      label='Date of Birth'
                                      id='addtraveller_dob'
                                      name='addtraveller_dob'
                                      control={control}
                                      // {...register("addtraveller_dob")}
                                      req
                                    />
                                  </Grid>
                                  <Grid item xs={12} md={12}>
                                    <Mtextbox
                                      label='Full Name'
                                      name='addtraveller_full_name'
                                      control={control}
                                      // {...register("addtraveller_full_name")}
                                      req
                                    />
                                    <p className='form-traveller-p'>
                                      Name as appears on Passport
                                    </p>
                                  </Grid>
                                  <Grid item xs={12} md={12} id='middle-toggle'>
                                    <Grid
                                      container
                                      alignItems='center'
                                      spacing={1}
                                    >
                                      <Grid item xs={12} md={12}>
                                        <Mswitch
                                          name='child_share'
                                          label='Will child share the parent’s cover?'
                                          control={control}
                                        />
                                      </Grid>
                                    </Grid>
                                  </Grid>

                                  <Grid
                                    item
                                    xs={12}
                                    md={12}
                                    id='bottom-message'
                                  >
                                    <Typography className='form-traveller-medical-report'>
                                      Required: Medical Report from SWAN
                                      In-House Medical Practitioner
                                    </Typography>
                                  </Grid>

                                  <Grid
                                    item
                                    xs={12}
                                    md={12}
                                    id='restrict-message'
                                  >
                                    <Typography className='form-traveller-medical-report'>
                                      Your age should not be above 74
                                    </Typography>
                                  </Grid>

                                  <Grid
                                    item
                                    xs={12}
                                    md={12}
                                    className='txt-right'
                                  >
                                    <Button
                                      variant='outlined'
                                      className='mr-4'
                                      color='primary'
                                      onClick={(event) =>
                                        handleClickDelete(event, index + 2)}
                                    >
                                      Delete
                                    </Button>
                                    <Button
                                      variant='contained'
                                      color='primary'
                                      type='submit'
                                    >
                                      Save
                                    </Button>
                                  </Grid>
                                </Grid>
                              </AccordionDetails>
                            </Accordion>
                          </Grid>
                        )
                      })}
                    </Grid>
                  </Grid>

                  <Grid item xs={6} sm={6} md={fromPage === 'summary' ? 6 : 4}>
                    <Mtextbox
                      label='Number of limit travellers'
                      id='number_of_limit_traveller'
                      name='number_of_limit_traveller'
                      control={control}
                      // {...register("number_of_limit_traveller")}
                      req
                    />
                  </Grid>
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
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

const mapStateToProps = (state) => {
  const { PersonalDropdown } = state
  return {
    getTitleLoading: PersonalDropdown.getTitleLoading,
    titleData: PersonalDropdown.titleData
  }
}

const mapDispatchToProps = (dispatch) => ({
  getTitleDropdownDispatch: (params) => dispatch(PersonalDropdownActions.getTitleRequest(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(FormTravelPlansDetails)

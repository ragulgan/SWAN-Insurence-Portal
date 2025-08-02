import React, { useEffect, useState, useRef } from 'react'
import {
  Grid,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  CircularProgress,
  makeStyles
} from '@material-ui/core'
import _, { isEmpty } from 'lodash'
import toast from 'react-hot-toast'
import { shallowEqual, useSelector, connect } from 'react-redux'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { useForm, useFieldArray } from 'react-hook-form'
import {
  ReactSelect,
  Mtextbox,
  Mselect,
  Mswitch,
  Mdatepicker
} from '../../../../app/form-controls'
import CustomBackdrop from '../../../../app/backdrop/CustomBackdrop'
import { ShowField } from '../../../uiComponents'
import {
  getTravelerPayload,
  otherDobValidation,
  resetTravelPlanifNotTraveller,
  resetTravelPlanifTraveller,
  resetTravelPlanValues
} from './formData/formData'
import ValidateNotify from '../../../../app/widgets/ValidateNotify'
import {
  PersonalDropdownActions, personalTRDropdownActions,
  TravelQuotationAction
} from '../../../../store/actions/index'
import moment from 'moment'
import InfoPopup from '../../../../app/widgets/InfoPopup'
import {
  handleLeadingZeroWhiteSpace,
  preventIfNotAlphaChars,
  getLocalStorage,
  preventIfNotNumber
} from '../../../../helpers/helper'
import {
  GRANTED_USERS, TRAVEL_FORM, DATE,
  REGEX
} from '../../../../helpers/constants'
import { ERROR } from '../../../../helpers/messages'
import { customStyles, getDefaultOptions } from '../../../../helpers/utils'

const useSyles = makeStyles(theme => ({
  BtnDisable: {
    backgroundColor: 'rgba(0, 0, 0, 0.26)',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.26)'
    }
  }
}))

const FormTravelPlansDetails = (props) => {
  const {
    fromPage, back, next, getTitleDropdownDispatch,
    getTCountryDispatch,
    travelCountryData,
    travelCountryStatus,
    getTRQuoteDetailsDispatch,
    clearTRQuoteDetailsDispatch,
    getTRQuoteDetails,
    getTRQuoteDetailsStatus,
    postTravelInfoLoading,
    getTRQuoteDetailsLoading,
    postTravelInfoStatus,
    ClearPostTravelInfoDispatch,
    PostTravelInfoDispatch
  } = props
  const { authRole } = useSelector(
    ({ Auth }) => ({
      authRole: Auth.authRole
    }),
    shallowEqual
  )
  const classes = useSyles()
  const summaryPage = fromPage === 'summary'
  const {
    control,
    watch,
    setValue,
    getValues,
    handleSubmit,
    setError,
    formState,
    clearErrors,
    reset
  } = useForm({
    defaultValues: {
      DestinationList: [],
      DTFROM: null,
      DTTO: null,
      isTraveller: false,
      FNAME: '',
      DTBIRTH: '',
      index: 0,
      dob: null,
      OthTravellersList: [
        {
          Title: 'Mr.',
          RELATIONSHIP: '',
          FNAME: '',
          DTBIRTH: null,
          AGE: ''
        }
      ],
      CHSHRCOVER: false
    }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'OthTravellersList'
  })
  const relatedTo = [
    { label: 'Self', value: 'Self' },
    { label: 'Spouse', value: 'Spouse' },
    { label: 'Child', value: 'Child' }
  ]
  const [message, setMessage] = useState('')
  const [errorPop, setErrorPop] = useState(false)
  const [addtraveller, setAddTraveller] = useState(0)
  const [countries, setCountries] = useState([])
  const [isDisable, setIsDisable] = useState(false)
  const [errorSelect, setErrorSelect] = useState({})
  const [state, setState] = useState({
    toMaxDate: moment().add(365, 'days'),
    toMinDate: moment().add(1, 'days'),
    fromMaxDate: moment().add(365, 'days'),
    currentDOB: moment(),
    personalData: {},
    travelPlan: {},
    isUserTraveler: false,
    fullName: ''
  })
  const didMount = useRef(false)
  const { errors, isValid } = formState
  const countryValue = getValues('DestinationList')
  const countryWatcher = watch('DestinationList')
  const getIndex = getValues('index')
  const getDOB = getValues(`OthTravellersList.${getIndex}.DTBIRTH`)
  const dobWatcher = watch(`OthTravellersList.${getIndex}.DTBIRTH`)
  const relateWatcher = watch(`OthTravellersList.${getIndex}.RELATIONSHIP`)
  const getValuesFNAME = getValues('FNAME')
  const fNAMEWatcher = watch('FNAME')
  const getCHSHRCOVERValue = getValues('CHSHRCOVER')
  const getFromDateValues = getValues('DTFROM')
  const getFromDateWatch = watch('DTFROM')
  const getToDateValues = getValues('DTTO')
  const getToDateWatch = watch('DTTO')
  const getOtherTravelerValues = getValues('OthTravellersList')
  const otherTravelerWatcher = watch('OthTravellersList')

  const onError = (errors, e) => {
    if (!_.isEmpty(errors)) {
      setErrorPop(true)
      setMessage('Please fill in required information to proceed')
    }
  }

  const onSubmit = (data) => {
    const payload = getTravelerPayload({ ...data, ...state.personalData, getOtherTravelerValues })
    PostTravelInfoDispatch(payload)
  }

  const handleRemove = (id) => {
    remove(id)
  }

  const handleAddTraveler = () => {
    const count = getValues('number_of_limit_traveller')
    const countVal = count != '' ? Number(count) : 1
    setAddTraveller(addtraveller + countVal)
    append(
      {
        // Title: 'Mrs.',
        RELATIONSHIP: '',
        FNAME: '',
        DTBIRTH: null,
        AGE: ''
      }
    )
  }
  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (didMount.current && type === 'change') {
        if (name === 'isTraveller') {
          setState(prevState => ({
            ...prevState,
            isUserTraveler: value[name]
          }))
        }
        // if (name === "isTraveller") {

        // }
      }
    })
    return () => subscription.unsubscribe()
  }, [watch])

  useEffect(() => {
    otherDobValidation(
      getDOB, relateWatcher, setMessage, setError, setErrorPop, setIsDisable,
      clearErrors, getIndex
    )
  }, [dobWatcher, relateWatcher])

  useEffect(() => {
    if (didMount.current && getFromDateValues && getFromDateValues) {
      const dFrom = moment(getFromDateValues, 'DD/MM/yyyy').toDate()
      setState(prevState => ({
        ...prevState,
        toMaxDate: moment(dFrom).add(95, 'days'),
        toMinDate: moment(dFrom)
      }))
    }
    if (didMount.current && getToDateValues && getToDateValues) {
      const dto = moment(getToDateValues, 'DD/MM/yyyy').toDate()
      setState(prevState => ({
        ...prevState,
        fromMaxDate: moment(dto)
      }))
    }
  }, [getFromDateWatch, getToDateWatch])

  useEffect(() => {
    if (didMount.current && getTRQuoteDetailsStatus === 'success') {
      const personalInfo = getTRQuoteDetails &&
        getTRQuoteDetails.personalInfo
        ? getTRQuoteDetails.personalInfo
        : {}
      const travelPlanData = getTRQuoteDetails &&
        getTRQuoteDetails.travelPlan
        ? getTRQuoteDetails.travelPlan
        : {}
      if (personalInfo) {
        resetTravelPlanValues(travelPlanData, reset, travelCountryData)
        const ifTraveler = travelPlanData.DestinationList &&
        travelPlanData.DestinationList.length > 0
        // if (!ifTraveler && !isEmpty(personalInfo)) {
        //   resetTravelPlanifTraveller(personalInfo, reset)
        // }
        setState(prevState => ({
          ...prevState,
          personalData: personalInfo,
          travelPlan: travelPlanData
        }))
      }
      clearTRQuoteDetailsDispatch()
    }
  }, [getTRQuoteDetailsStatus])

  useEffect(() => {
    if (didMount.current) {
      if (state.isUserTraveler) {    
        resetTravelPlanifTraveller(state, reset)
        // resetTravelPlanifTraveller(state.personalData, reset)
      } else {
        resetTravelPlanifNotTraveller(state.personalData, reset)
      }
    }
  }, [state.isUserTraveler])

  useEffect(() => {
    const currentValue = getOtherTravelerValues[getIndex] ? getOtherTravelerValues[getIndex] : null
    const getCurrentDOB = currentValue && currentValue.DTBIRTH ? currentValue.DTBIRTH : null
    const addTravelerAge = moment().diff(moment(getCurrentDOB), 'years')
      ? moment().diff(moment(getCurrentDOB), 'years')
      : ''
    setValue(`OthTravellersList.[getIndex].AGE`, addTravelerAge)
  }, [dobWatcher])

  useEffect(() => {
    if (getValuesFNAME) {
      setValue(`OthTravellersList.[getIndex].FNAME`, getValuesFNAME)
    }
  }, [fNAMEWatcher])

  useEffect(() => {
    if (travelCountryStatus === 'success') {
      const countryData = getDefaultOptions(
        travelCountryData, 'COUNTRYNAME', 'COUNTRYCODE'
      )
      if (countryData && countryData.length > 0) {
        setCountries(countryData)
      }
      const travelQuoteNo = getLocalStorage(TRAVEL_FORM.QUOTE_NUMBER)
      if (travelQuoteNo && travelQuoteNo) {
        getTRQuoteDetailsDispatch(travelQuoteNo)
      }
    }
  }, [travelCountryStatus])

  useEffect(() => {
    if (postTravelInfoStatus === 'success') {
      toast.success('Travel Plans has been saved!', { duration: 3000 })
      !summaryPage && next()
      ClearPostTravelInfoDispatch()
    } else if (postTravelInfoStatus === 'error') {
      // toast.error(removeErrString(postPersonalTRInfoData), { duration: 4000 })
      ClearPostTravelInfoDispatch()
    }
  }, [postTravelInfoStatus])

  useEffect(() => {
    if (_.size(errors)) {
      setErrorPop(true)
    }
  }, [errors])

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true
    }
    getTitleDropdownDispatch()
    getTCountryDispatch()
    return () => {
      clearTRQuoteDetailsDispatch()
    }
  }, [])
// console.log('AMONGTRVLR', i === 0 );
  return (
    <>
      <ShowField
        show={!getTRQuoteDetailsLoading}
        yes={() => <></>}
        no={() =>
          <CustomBackdrop isLoading={getTRQuoteDetailsLoading} />}
      />
      <form onSubmit={handleSubmit(onSubmit, onError)}>
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
                  <Grid
                    item
                    xs={12}
                    sm={fromPage === 'summary' ? 12 : 10}
                    md={fromPage === 'summary' ? 12 : 10}
                  >
                    <ReactSelect
                      name='DestinationList'
                      placeholder='Choose Destination/s'
                      control={control}
                      className='form-country-md'
                      options={countries && countries}
                      grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                      userType={authRole}
                      isMulti
                      req
                      classNamePrefix='Choose Destination/s'
                      isClearable
                      isLoading={false}
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
                <span className='travel-date'>Travelling Dates</span>
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
                  <Grid
                    item
                    xs={2}
                    sm={fromPage === 'summary' ? 6 : 1}
                    md={fromPage === 'summary' ? 6 : 1}
                  >
                    <span>From</span>
                  </Grid>
                  <Grid
                    item
                    xs={9}
                    sm={fromPage === 'summary' ? 6 : 4}
                    md={fromPage === 'summary' ? 6 : 4}
                  >                    
                    {/* <Mdatepicker
                      name='DTFROM'
                      label={DATE.DATE_ONLY}
                      control={control}                     
                      format={DATE.DATE_ONLY}
                      onKeyPress={e => {
                        preventIfNotNumber(e)
                      }}
                      placeholder={DATE.DATE_ONLY}
                      minDate={moment()}
                      maxDate={state.fromMaxDate}
                      grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                      userType={authRole}
                      req
                    /> */}
                    <Mdatepicker          
                    name='DTFROM'
                    label='DD/MM/YYYY'
                    control={control}
                    req
                    onKeyPress={e => {
                      preventIfNotNumber(e)
                    }}
                placeholder={DATE.DATE_ONLY}
                minDate={moment()}
                maxDate={state.fromMaxDate}
                grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                userType={authRole}
              />
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    sm={fromPage === 'summary' ? 6 : 1}
                    md={fromPage === 'summary' ? 6 : 1}
                  >
                    <span>To</span>
                  </Grid>
                  <Grid
                    item
                    xs={9}
                    sm={fromPage === 'summary' ? 6 : 4}
                    md={fromPage === 'summary' ? 6 : 4}
                  >
                    {/* <Mdatepicker
                      name='DTTO'
                      label='DD/MM/YYYY'
                      control={control}
                      placeholder={DATE.DATE_ONLY}
                      minDate={state.toMinDate}
                      maxDate={state.toMaxDate}
                      req
                      onKeyPress={e => {
                        preventIfNotNumber(e)
                      }}
                      grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                      userType={authRole}
                    /> */}
                     <Mdatepicker
                      name='DTTO'
                      label='DD/MM/YYYY'
                      control={control}
                      placeholder={DATE.DATE_ONLY}
                      minDate={state.toMinDate}
                      maxDate={state.fromMaxDate}
                      req
                      onKeyPress={e => {
                        preventIfNotNumber(e)
                      }}
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
                  <Grid
                    item
                    xs={12}
                    sm={fromPage === 'summary' ? 6 : 5}
                    md={fromPage === 'summary' ? 6 : 5}
                  >
                    <h4 className='travellers-info-title'>
                      Traveller’s Information{' '}
                      <InfoPopup
                        info='Travelers should be members of the same
                            household.'
                      />
                    </h4>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={fromPage === 'summary' ? 6 : 5}
                    md={fromPage === 'summary' ? 6 : 5}
                    className='txt-right add-traveller-btn'
                  >
                    <Button
                      variant='contained'
                      color='primary'
                      onClick={handleAddTraveler}
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
                  <Grid
                    item
                    xs={12}
                    sm={fromPage === 'summary' ? 12 : 7}
                    md={fromPage === 'summary' ? 10 : 7}
                  >
                    <Mswitch
                      name='isTraveller'
                      label='Will the client be one of the travellers?'
                      control={control}
                      grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                      userType={authRole}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                container
                direction='row'
                alignItems='flex-start'
                spacing={fromPage === 'summary' ? 1 : 4}
              >
                {
                fields && fields.length > 0
                  ? fields && fields.map((traveler, i) => {
                    const getAge = getOtherTravelerValues[i].DTBIRTH
                      ? moment().diff(moment(getOtherTravelerValues[i].DTBIRTH), 'years')
                      : ''
                    return (
                      <Grid
                        item
                        xs={12}
                        sm={fromPage === 'summary' ? 12 : 6}
                        md={fromPage === 'summary' ? 12 : 6}
                      >
                        <Accordion defaultExpanded={i === 0 || getOtherTravelerValues[i].FNAME}>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls='panel1a-content'
                            id='panel1a-header'
                          >
                            <div className='d-block'>
                              <Typography>
                                <span className='form-traveller-header'>
                                  Traveller {i + 1}:
                                </span>{' '}
                                {getOtherTravelerValues[i].FNAME}
                              </Typography>
                              {getAge >= 60 && getAge <= 64
                                ? (
                                  <Typography
                                    className='form-traveller-medical-report'
                                  >
                                    Required: Medical Report from Treating Doctor
                                  </Typography>
                                  )
                                : null}
                            </div>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Grid
                              container
                              spacing={fromPage === 'summary' ? 1 : 2}
                              alignItems='center'
                            >
                              <Grid item xs={6} sm={6} md={6}>
                                <Mselect
                                  key={traveler.id}
                                  label='Relationship'
                                  name={`OthTravellersList.[${i}].RELATIONSHIP`}
                                  control={control}
                                  options={relatedTo}
                                  clearErrors={clearErrors}
                                  grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                                  userType={authRole}
                                  // readOnly={i === 0 && state.isUserTraveler}
                                  disabled={i === 0 && state.travelPlan.AMONGTRVLR}
                                />
                              </Grid>
                              <Grid item xs={6} sm={6} md={6}>
                                <Mdatepicker
                                  key={traveler.id}
                                  label='Date of Birth'
                                  name={`OthTravellersList[${i}].DTBIRTH`}
                                  // name={`OthTravellersList.${i}.DTBIRTH`}
                                  control={control}
                                  req
                                  placeholder={DATE.DATE_ONLY}
                                  minDate={moment().subtract(75, 'years')}
                                  maxDate={moment()}
                                  onKeyPress={e => {
                                    preventIfNotNumber(e)
                                  }}
                                  disabled={i === 0 && state.travelPlan.AMONGTRVLR}
                                  grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                                  userType={authRole}
                                  onAccept={() => {
                                    setValue('index', i)
                                    setValue('dob', moment().millisecond())
                                  }}
                                />
                              </Grid>
                              <Grid item xs={9} sm={9} md={9}>
                                <fieldset disabled={i === 0 && state.isUserTraveler}>
                                  <Mtextbox
                                    key={traveler.id}
                                    label='Full Name'
                                    name={`OthTravellersList.[${i}].FNAME`}
                                    control={control}
                                    req
                                    grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                                    userType={authRole}
                                    onKeyPress={(e) => { preventIfNotAlphaChars(e) }}
                                    onBlur={e => {
                                      handleLeadingZeroWhiteSpace(
                                        e,
                                        'FNAME',
                                        setValue,
                                        REGEX.TEXT,
                                        setError,
                                        ERROR.TEXT
                                      )
                                    }}
                                    readOnly={i === 0 && state.travelPlan.AMONGTRVLR}
                                  />
                                </fieldset>
                                <p className='form-traveller-p'>
                                  Name as appears on Passport
                                </p>
                              </Grid>
                              <Grid item xs={3} sm={3} md={3}>
                                <fieldset disabled>
                                  <TextField
                                    key={traveler.id}
                                    value={
                                getOtherTravelerValues[i].DTBIRTH
                                  ? moment().diff(moment(getOtherTravelerValues[i].DTBIRTH), 'years')
                                  : ''
                              }
                                    label='Age'
                                    variant='outlined'
                                  />
                                </fieldset>
                                <p className='form-traveller-p'>.</p>
                              </Grid>
                              {getAge >= 1 && getAge < 18
                                ? (
                                  <Grid item xs={12} md={12}>
                                    <Grid
                                      container
                                      alignItems='center'
                                      spacing={1}
                                    >
                                      <Grid item xs={12} md={12}>
                                        <Mswitch
                                          key={traveler.id}
                                          disabled={getCHSHRCOVERValue}
                                          name='CHSHRCOVER'
                                          label='Will child share the parent’s cover?'
                                          control={control}
                                          grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                                          userType={authRole}
                                        />
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                  )
                                : null}
                              {getAge >= 65 && getAge <= 74
                                ? (
                                  <Grid
                                    item
                                    xs={12}
                                    md={12}
                                  >
                                    <Typography className='form-traveller-medical-report'>
                                      Required: Medical Report from SWAN
                                      In-House Medical Practitioner
                                    </Typography>
                                  </Grid>
                                  )
                                : null}
                              {getAge > 74
                                ? (
                                  <Grid
                                    item
                                    xs={12}
                                    md={12}
                                  >
                                    <Typography className='form-traveller-medical-report'>
                                      Your age should not be above 74
                                    </Typography>
                                  </Grid>
                                  )
                                : null}
                              <Grid item xs={12} md={12} className='txt-right'>
                                <Button
                                  variant='outlined'
                                  className='mr-4'
                                  color='primary'
                                  onClick={() =>
                                    handleRemove(i)}
                                >
                                  Delete
                                </Button>
                              </Grid>
                            </Grid>
                          </AccordionDetails>
                        </Accordion>
                      </Grid>
                    )
                  })
                  : null
              }
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={fromPage === 'summary' ? 12 : 8} md={8}>
            <ValidateNotify
              show={errorPop} errors={message} clear={setErrorPop}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={fromPage === 'summary' ? 12 : 4}
            md={fromPage === 'summary' ? 12 : 4}
            className='txt-right travel-plan'
          >
            <Button
              variant='outlined'
              color='primary'
              className='mar-right-s back-button1'
              onClick={() => back()}
            >
              Back
            </Button>
            <Button
              variant='contained'
              color='primary'
              type='submit'
              className={!errors || !isValid ? classes.BtnDisable : ''}
              disabled={!errors || !isValid ? !errors : isDisable}
            >
              {postTravelInfoLoading
                ? (
                  <CircularProgress size={18} style={{ color: '#ffffff' }} />
                  )
                : (
                    'Next'
                  )}
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  )
}

const mapStateToProps = (state) => {
  const {
    PersonalDropdown,
    personalTRDropdown,
    TravelQuotation
  } = state
  return {
    getTitleLoading: PersonalDropdown.getTitleLoading,
    titleData: PersonalDropdown.titleData,
    travelCountryData: personalTRDropdown?.travelCountryData,
    travelCountryStatus: personalTRDropdown.travelCountryStatus,
    getTRQuoteDetailsStatus: TravelQuotation?.getTRQuoteDetailsStatus,
    getTRQuoteDetails: TravelQuotation?.getTRQuoteDetails,
    postTravelInfoLoading: TravelQuotation?.postTravelInfoLoading,
    postTravelInfoData: TravelQuotation?.postTravelInfoData,
    postTravelInfoStatus: TravelQuotation?.postTravelInfoStatus,
    getTRQuoteDetailsLoading: TravelQuotation?.getTRQuoteDetailsLoading
  }
}

const mapDispatchToProps = (dispatch) => ({
  getTitleDropdownDispatch: (params) => dispatch(PersonalDropdownActions.getTitleRequest(params)),
  getTCountryDispatch: (params) => dispatch(personalTRDropdownActions.getTCountryRequest(params)),
  getTRQuoteDetailsDispatch: (params) => dispatch(TravelQuotationAction.GetTRQuoteDetailsAction(params)),
  clearTRQuoteDetailsDispatch: () => dispatch(TravelQuotationAction.ClearTRQuoteDetailsAction()),
  PostTravelInfoDispatch: (formData) => dispatch(TravelQuotationAction.PostTravelInfo(formData)),
  ClearPostTravelInfoDispatch: () => dispatch(TravelQuotationAction.ClearPostTravelInfo())
})

export default connect(mapStateToProps, mapDispatchToProps)(FormTravelPlansDetails)

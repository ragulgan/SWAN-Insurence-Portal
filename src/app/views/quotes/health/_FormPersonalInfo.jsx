import React, { useEffect, useState, Fragment } from 'react'
import { connect, shallowEqual, useSelector } from 'react-redux'
import {
  Grid,
  Button,
  makeStyles,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  CircularProgress
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import _ from 'lodash'
import ClientsPopup from 'app/widgets/ClientsPopup'
import AlertBox from 'app/widgets/AlertBox'
import ErrorAlerts from 'app/widgets/ErrorAlerts'
import ValidateNotify from 'app/widgets/ValidateNotify'
import RowMessage from 'app/widgets/RowMessage'
import Mradio from 'app/form-controls/Mradio'
import Mtextbox from 'app/form-controls/Mtextbox'
import Mselect from 'app/form-controls/Mselect'
import Mswitch from 'app/form-controls/Mswitch'
import Mdatepicker from 'app/form-controls/Mdatepicker'
import DependentDetails from './DependentDetails'
import moment from 'moment'
import { Controller, useForm, useFieldArray } from 'react-hook-form'

import { useLocation, useHistory } from 'react-router-dom'
import {
  PersonalDropdownActions,
  ClientActions,
  HealthActions
} from 'store/actions'
import {
  preventIfNotNumber,
  handleTrimWhiteSpace,
  handleSetError,
  preventIfNotAlphaNumric,
  getLocalStorage,
  makeQueryString
} from 'helpers/helper'
import { REGEX, GRANTED_USERS } from 'helpers/constants'
import { ERROR } from 'helpers/messages'
import { ShowField } from 'app/uiComponents'
import './style.css'

const useSyles = makeStyles(theme => ({
  item1: {
    order: 2,
    [theme.breakpoints.up('sm')]: {
      order: 1
    }
  },
  item2: {
    order: 1,
    [theme.breakpoints.up('sm')]: {
      order: 2
    }
  },
  item3: {
    order: 3,
    [theme.breakpoints.up('sm')]: {
      order: 3
    }
  },
  item4: {
    order: 4,
    [theme.breakpoints.up('sm')]: {
      order: 4
    }
  },
  item5: {
    order: 5,
    [theme.breakpoints.up('sm')]: {
      order: 5
    }
  },
  item6: {
    order: 7,
    [theme.breakpoints.up('sm')]: {
      order: 6
    }
  },
  item7: {
    order: 6,
    [theme.breakpoints.up('sm')]: {
      order: 7
    }
  },
  item8: {
    order: 8,
    [theme.breakpoints.up('sm')]: {
      order: 8
    }
  },
  item9: {
    order: 9,
    [theme.breakpoints.up('sm')]: {
      order: 9
    }
  }
}))

const FormPersonalDetails = (props) => {
  const classes = useSyles()
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
    // titleData,
    fromPage,
    getTitleDropdownDispatch,
    searchDispatch,
    companyDispatch,
    saveDispatch,
    updateDispatch,
    companyData,
    quote
  } = props
  const [searched, setSearched] = useState('')
  const [counter, setCounter] = useState(0)
  const [activeStep, setActiveStep] = useState(0)
  const [clientModal, setClientModal] = useState(false)
  const [expanded, setExpanded] = useState([])
  const [passed, setPassed] = useState(false)
  const [companyLoading, setCompanyLoading] = useState(false)
  const [companies, setCompanies] = useState(null)
  const [spouceValidation, setSpouceValidation] = useState(false)
  const [alert, setAlert] = useState({
    open: false,
    type: 'success',
    msg: ''
  })
  // const [errorAlert, setErrorAlert] = useState({
  //     open: false,
  //     msg: '',
  // })
  const [gender, setGender] = useState([
    {
      label: 'Male',
      value: 'MR',
      altValue: 'male'
    },
    {
      label: 'Female',
      value: 'MS',
      altValue: 'female'
    },
    {
      label: 'Dependant',
      value: 'CHILD',
      altValue: 'dependant'
    }
  ])
  const [defaultValues, setDefaultValues] = useState({
    INDCOR: true,
    // Policy Holder Details
    FIRSTNAME: '',
    LASTNAME: '',
    DTBIRTH: '',
    AGE: '0',
    GENDER: '',
    INSUREDMEMBER: '',
    // Policy Holder Contact Details
    MOBILE: '',
    HOMEPHONE: '',
    EML: '',
    // Spouce Details
    S_FIRSTNAME: '',
    S_LASTNAME: '',
    S_DTBIRTH: '',
    S_AGE: '',
    S_GENDER: '',
    // History Info
    medical_insurance: false,
    // Extra Fields For Node/Dotnet
    QUOTNUM: '',
    CLIENTNUM: '',
    NICNO: '',
    TITLE: '',
    OCCUPATION: '',
    EML: '',
    RESIADD: '',
    MOB: ''
  })
  const {
    control,
    watch,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors: formErrors, isDirty },
    clearErrors,
    reset,
    setError
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    criteriaMode: 'firstError',
    shouldFocusError: true,
    shouldUnregister: false,
    shouldUseNativeValidation: true,
    defaultValues
  })
  const {
    fields: members,
    append: addMember,
    remove: removeMember
  } = useFieldArray({
    control,
    name: 'members'
  })

  const medinsWatcher = watch('medical_insurance')
  const dobWatcher = watch('DTBIRTH')
  const ageWatcher = watch('AGE')
  const spouceFirstname = watch('S_FIRSTNAME')
  const loggedUser = getLocalStorage('logged_user')

  const ageValidator = (field, age) => {
    setValue(field, age)
  }
  const dependentAddHandler = () => {
    addMember({
      FIRSTNAME: '',
      LASTNAME: '',
      DTBIRTH: new Date(),
      AGE: 0,
      GENDER: ''
    })

    setExpanded(current => [...current, {
      panel: `panel_${counter}`,
      status: true
    }])

    setCounter(counter + 1)

    setPassed(true)
  }
  const panelToggle = (panel) => (event, isExpanded) => {
    const newState = expanded.map(obj => {
      if (obj.panel === panel) {
        return { ...obj, status: !obj.status }
      }

      return obj
    })

    setExpanded(newState)
  }
  const cancelSearch = () => {
  }
  const openModalHandler = () => {
    setClientModal(true)
  }
  const closeModalHandler = (item) => {
    if (item) {
      const clientData = {
        CLIENTNUM: item.CLIENTNUM,
        NICNO: item.NICNO,
        TITLE: item.TITLE,
        FIRSTNAME: item.FIRSTNAME,
        LASTNAME: item.LASTNAME,
        DTBIRTH: moment(item.DTBIRTH),
        OCCUPATION: item.OCCUPATION,
        EML: item.EMAIL,
        RESIADD: item.RESADDR1,
        MOB: item.TELNO
      }
      reset(defaultValues => ({
        ...defaultValues,
        ...clientData
      }))
    }
    setClientModal(false)
  }
  const requestSearch = search => {
    if (search.length >= 3) {
      setTimeout(() => {
        const param = {
          CLIENTNUM: search,
          NAME: search,
          TITLE: search,
          MOBILENO: search,
          DTBIRTH: search,
          CLIDNO: search,
          USERCRT: 'XUXAVIER' // loggedUser
        }
        searchDispatch(param)
      }, 800)
    }
  }
  const alertModal = (value) => {
    setAlert(defaultValues => ({
      ...defaultValues,
      open: value,
      type: '',
      msg: ''
    }))
  }
  const errorModal = (value) => {
    setAlert(defaultValues => ({
      ...defaultValues,
      open: false,
      type: 'error',
      msg: 'Please fill in required information to proceed'
    }))
  }
  const onSubmit = (formData) => {
    saveDispatch(formData)
    history.push({
      pathname: 'health',
      search: `?${makeQueryString({
                'quotation-id': quotation_id,
                step: 'plan-selection'
            })}`
    })
  }
  const btnHandler = (value) => {
    setPassed(value)
  }

  // Form error updates
  useEffect(() => {
    if (_.size(formErrors)) {
      setAlert(defaultValues => ({
        ...defaultValues,
        open: true,
        type: 'error',
        msg: 'Please fill in required information to proceed'
      }))
    }
  }, [formErrors])

  // Clear Form errors
  useEffect(() => {
    if (isDirty) {
      setAlert(defaultValues => ({
        ...defaultValues,
        open: false,
        type: 'error',
        msg: ''
      }))

      clearErrors()
    }
  }, [isDirty])

  // Update date-of-birth changes
  useEffect(() => {
    if (!_.isEmpty(dobWatcher)) {
      // Find age using moment
      const age = moment().diff(moment(dobWatcher), 'years')
      // First : Which field to be change, Second : What value need to be set
      ageValidator('AGE', age)
    }
  }, [dobWatcher])

  // Update quote data
  useEffect(() => {
    if (!_.isEmpty(quote)) {
      console.log('quote', quote)
    }
  }, [quote])

  // Update ADD-DEPENDENT btn status
  useEffect(() => {
    if (_.isEmpty(members)) {
      setPassed(false)
    }
  }, [members])

  // Update insurance insurance changes
  useEffect(() => {
    if (medinsWatcher) {
      setCompanyLoading(true)
      companyDispatch()
    }
  }, [medinsWatcher])

  // Set company dropdown data
  useEffect(() => {
    if (companyData) {
      const cTemp = []
      _.forEach(companyData, function (com) {
        cTemp.push({
          value: com.COUNTRYCODE,
          label: com.COUNTRYNAME
        })
      })

      setCompanies(cTemp)
      setCompanyLoading(false)
    }
  }, [companyData])

  // Dynamic Validations
  useEffect(() => {
    if (spouceFirstname !== '') {
      setSpouceValidation(true)
    } else if (spouceFirstname === '') {
      setSpouceValidation(false)
    }
  }, [spouceFirstname])

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className='swan-forms health-forms'>
        <Grid
          container
          direction='row'
          justifyContent='flex-start'
          alignItems='flex-start'
          spacing={4}
        >
          {authRole !== 'customer'
            ? (
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Grid container spacing={2} alignItems='center'>
                  <Grid item xs={12} sm={6} md={6} lg={6} className={classes.item1}>
                    <Mradio
                      xs={12}
                      md={8}
                      name='INDCOR'
                      label='Type of Quotation'
                      control={control}
                      setValue={setValue}
                      grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                      userType={authRole}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6} className={classes.item2}>
                    <ClientsPopup
                      disabled={false}
                      showRecordFound
                      open={clientModal}
                      searched={searched}
                      handleClickOpen={openModalHandler}
                      handleClose={closeModalHandler}
                    />
                  </Grid>
                </Grid>
              </Grid>
              )
            : null}
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6} className={classes.item3}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <h4 className='form-title-md'>
                  Policy Holder Details{' '}
                  <span>
                    <span className='req-mark'>*</span> Required field
                  </span>
                </h4>
              </Grid>
              <Mtextbox
                xs={12}
                sm={5}
                md={5}
                lg={5}
                name='FIRSTNAME'
                label='First Name'
                control={control}
                maxLength={130}
                grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                userType={authRole}
                req
                clearErrors={clearErrors}
                onBlur={e => {
                  handleSetError(
                    e,
                    'FIRSTNAME',
                    setError,
                    REGEX.TEXT,
                    ERROR.TEXT
                  )
                }}
              />
              <Mtextbox
                xs={12}
                sm={7}
                md={7}
                lg={7}
                name='LASTNAME'
                label='Last Name'
                control={control}
                maxLength={130}
                grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                userType={authRole}
                req
                clearErrors={clearErrors}
                onBlur={e => {
                  handleSetError(
                    e,
                    'LASTNAME',
                    setError,
                    REGEX.TEXT,
                    ERROR.TEXT
                  )
                }}
              />
              <Mdatepicker
                xs={9}
                sm={5}
                md={5}
                lg={5}
                name='DTBIRTH'
                label='Date of Birth'
                control={control}
                placeHolder={moment().subtract(18, 'years')}
                minDate={moment().subtract(500, 'years')}
                maxDate={moment().subtract(18, 'years')}
                grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                userType={authRole}
                onClick={() => {
                  clearErrors('DTBIRTH')
                }}
                req
              />
              <Mtextbox
                xs={3}
                sm={3}
                md={3}
                lg={3}
                name='AGE'
                label='Age'
                control={control}
                grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                userType={authRole}
                disabled
                clearErrors={clearErrors}
              />
              <Mselect
                xs={12}
                sm={4}
                md={4}
                lg={4}
                name='GENDER'
                label='Gender'
                control={control}
                grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                userType={authRole}
                options={gender}
                optionsLabel='label'
                optionsValue='value'
                req
              />
              {(() => {
                if (ageWatcher < 0) {
                  return <RowMessage msg={"don't select future date in DOB"} />
                } else if (ageWatcher >= 18 && ageWatcher <= 22) {
                  return <RowMessage msg='Note: dependant should be unmarried or full time student.' />
                } else if (ageWatcher >= 55 && ageWatcher <= 59) {
                  return <RowMessage msg='Note: Medical report required' />
                } else if (ageWatcher >= 60 && ageWatcher <= 65) {
                  return <RowMessage msg='Member might be required to undergo medical check by Swan In House Doctor' />
                }

                return null
              })()}
              <Mswitch
                xs={12}
                sm={12}
                md={12}
                lg={12}
                name='INSUREDMEMBER'
                label='Is Policy Holder one of the insured members?'
                control={control}
                setValue={setValue}
                grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                userType={authRole}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6} className={classes.item4}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <h4 className='form-title-md'>Policy Holder Contact Details</h4>
              </Grid>
              <Mtextbox
                xs={12}
                sm={12}
                md={12}
                lg={12}
                name='MOBILE'
                label='Mobile Phone'
                control={control}
                grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                userType={authRole}
                req
                clearErrors={clearErrors}
                onBlur={e => {
                  handleSetError(
                    e,
                    'MOBILE',
                    setError,
                    REGEX.PHONE
                    // ERROR.PHONE_INVALID
                  )
                }}
              />
              <Mtextbox
                xs={12}
                sm={12}
                md={12}
                lg={12}
                name='HOMEPHONE'
                label='Home Phone'
                control={control}
                grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                userType={authRole}
                req
                clearErrors={clearErrors}
                onBlur={e => {
                  handleSetError(
                    e,
                    'HOMEPHONE',
                    setError,
                    REGEX.PHONE
                    // ERROR.PHONE_INVALID
                  )
                }}
                maxLength={10}
              />
              <Mtextbox
                xs={12}
                sm={12}
                md={12}
                lg={12}
                name='EML'
                label='Email Address'
                grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                userType={authRole}
                control={control}
                clearErrors={clearErrors}
                maxLength={50}
                onBlur={e => {
                  handleTrimWhiteSpace(e, 'EML', setValue)
                  handleSetError(
                    e,
                    'EML',
                    setError,
                    REGEX.EMAIL,
                    ERROR.EMAIL_INVALID
                  )
                }}
                req
              />
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6} className={classes.item5}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <h4 className='form-title-md'>Spouse Details</h4>
              </Grid>
              <Mtextbox
                xs={12}
                sm={5}
                md={5}
                lg={5}
                name='S_FIRSTNAME'
                label='First Name'
                control={control}
                grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                userType={authRole}
                clearErrors={clearErrors}
                onBlur={e => {
                  handleSetError(
                    e,
                    'S_FIRSTNAME',
                    setError,
                    REGEX.TEXT,
                    ERROR.TEXT
                  )
                }}
                req={spouceValidation}
              />
              <Mtextbox
                xs={12}
                sm={7}
                md={7}
                lg={7}
                name='S_LASTNAME'
                label='Last Name'
                control={control}
                grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                userType={authRole}
                clearErrors={clearErrors}
                onBlur={e => {
                  handleSetError(
                    e,
                    'S_LASTNAME',
                    setError,
                    REGEX.TEXT,
                    ERROR.TEXT
                  )
                }}
                req={spouceValidation}
              />
              <Mdatepicker
                xs={9}
                sm={5}
                md={5}
                lg={5}
                name='S_DTBIRTH'
                label='Date of Birth'
                control={control}
                placeHolder={moment().subtract(18, 'years')}
                minDate={moment().subtract(500, 'years')}
                maxDate={moment().subtract(18, 'years')}
                grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                userType={authRole}
                onClick={() => {
                  clearErrors('DTBIRTH')
                }}
                req={spouceValidation}
              />
              <Mtextbox
                xs={3}
                sm={3}
                md={3}
                lg={3}
                name='S_AGE'
                label='Age'
                control={control}
                grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                userType={authRole}
                clearErrors={clearErrors}
                onBlur={e => {
                  handleSetError(
                    e,
                    'AGE',
                    setError,
                    REGEX.TEXT,
                    ERROR.TEXT
                  )
                }}
              />
              <Mselect
                xs={12}
                sm={4}
                md={4}
                lg={4}
                name='S_GENDER'
                label='Gender'
                control={control}
                grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                userType={authRole}
                options={gender}
                optionsLabel='label'
                optionsValue='value'
                req={spouceValidation}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6} className={classes.item6}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <h4 className='form-title-md'>History</h4>
              </Grid>
              <Mswitch
                xs={12}
                sm={12}
                md={12}
                lg={12}
                grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                userType={authRole}
                name='medical_insurance'
                label='Are insured members already under a Medical Insurance?'
                control={control}
                setValue={setValue}
                req
              />
              {companyLoading
                ? (
                  <Grid item xs={12} className='txt-center'>
                    <CircularProgress color='secondary' />
                  </Grid>
                  )
                : <ShowField
                    show={medinsWatcher}
                    yes={() => (
                      <>
                        <Mselect
                          xs={12}
                          sm={7}
                          md={7}
                          lg={7}
                          name='insurance_company'
                          label='Insurance Company'
                          grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                          userType={authRole}
                          control={control}
                          options={companies}
                          optionsLabel='label'
                          optionsValue='value'
                        />
                        <Mdatepicker
                          xs={12}
                          sm={5}
                          md={5}
                          lg={5}
                          name='policy_end_date'
                          label='olicy end date'
                          control={control}
                          placeHolder={moment().subtract(18, 'years')}
                          minDate={moment().subtract(500, 'years')}
                          maxDate={moment().subtract(18, 'years')}
                          grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                          userType={authRole}
                          onClick={() => {
                            clearErrors('DTBIRTH')
                          }}
                          req
                        />
                      </>
                    )}
                    no={() => null}
                  />}
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className={classes.item7}>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={3} md={3} lg={3}>
                <h4 className='form-title-md'>Dependant Details</h4>
              </Grid>
              <Grid item xs={6} sm={3} md={3} lg={3} className='txt-right add-traveller-btn'>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={dependentAddHandler}
                  disabled={passed}
                >
                  ADD DEPENDANT
                </Button>
              </Grid>
            </Grid>
          </Grid>
          {members.map((member, index) => (
            <DependentDetails
              key={member.id}
              index={index}
              member={member}
              cssClass={classes.item8}
              expanded={expanded}
              panels={expanded}
              panelToggle={panelToggle}
              authRole={authRole}
              clearErrors={clearErrors}
              handleSetError={handleSetError}
              setError={setError}
              btnHandler={btnHandler}
              control={control}
              watch={watch}
              setValue={setValue}
              remove={removeMember}
            />
          ))}
        </Grid>
        <Grid
          container
          direction='row'
          justifyContent='flex-end'
          alignItems='flex-start'
          spacing={4}
        >
          <Grid
            item
            xs
            className={`${classes.item9} txt-right`}
          >
            {/* <Button
                            variant="contained"
                            className="next-button1"
                            color="primary"
                            onClick={()=>(
                                history.push({
                                    pathname: 'health',
                                    search: `?${makeQueryString({
                                        "quotation-id": quotation_id,
                                        "step": "plan-selection"
                                    })}`
                                })
                            )}>
                            Next
                        </Button> */}
            <Button
              variant='contained'
              color='primary'
              type='submit'
            >
              Next
            </Button>
          </Grid>
        </Grid>
      </form>
      <AlertBox open={alert.open} type={alert.type} msg={alert.msg} close={errorModal} />
      {/* <ErrorAlerts open={errorAlert.open} msg={errorAlert.msg} close={errorModal} /> */}
    </>
  )
}

const mapStateToProps = (state) => {
  const { PersonalDropdown, Health } = state
  return {
    healthLoading: Health.companyData,
    companyData: Health.companyData,
    successData: Health.successData,
    updateSuccess: Health.updateSuccessData
  }
}

const mapDispatchToProps = (dispatch) => ({
  searchDispatch: (params) => dispatch(ClientActions.SearchClient(params)),
  companyDispatch: () => dispatch(HealthActions.GetCompanies()),
  saveDispatch: (formData) => dispatch(HealthActions.SaveHealthQuote(formData)),
  updateDispatch: (formData) => dispatch(HealthActions.UpdateHealthQuote(formData))
})

export default connect(mapStateToProps, mapDispatchToProps)(FormPersonalDetails)

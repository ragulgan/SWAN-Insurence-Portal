import React, { useEffect, useState, useRef } from 'react'
import { connect, shallowEqual, useSelector } from 'react-redux'
import {
  Grid,
  Button,
  makeStyles,
  CircularProgress,
  Dialog
} from '@material-ui/core'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import _ from 'lodash'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import ClientsModals from '../../../../app/modals/ClientsModal'
import MySwanModal from '../../../../app/modals/MySwanModal'
import Mradio from '../../../../app/form-controls/Mradio'
import Mtextbox from '../../../../app/form-controls/Mtextbox'
import Mselect from '../../../../app/form-controls/Mselect'
import Mswitch from '../../../../app/form-controls/Mswitch'
import Mdatepicker from '../../../../app/form-controls/Mdatepicker'
import ValidateNotify from '../../../../app/widgets/ValidateNotify'
import CustomBackdrop from '../../../../app/backdrop/CustomBackdrop'
import {
  PersonalDropdownActions,
  TravelQuotationAction,
  MotorQuotationAction,
  ClientActions
} from '../../../../store/actions/index'

import moment from 'moment'
import {
  preventIfNotAlphaChars,
  checkResFailed,
  handleLeadingZeroWhiteSpace,
  preventIfNotAlphaNumric,
  preventIfNotNumericSpace,
  removeErrString,
  getLocalStorage,
  setLocalStorage,
  splitPhoneNuber,
  preventIfNotNumber
} from '../../../../helpers/helper'
import {
  getPersonalInfoPayloadTR,
  resetPersonalValues
} from './formData/formData'
import { REGEX, GRANTED_USERS, TRAVEL_FORM, MOTOR_FORM, DATE } from '../../../../helpers/constants'
import { ERROR } from '../../../../helpers/messages'
import { ShowField } from '../../../uiComponents'

const useSyles = makeStyles(theme => ({
  BtnDisable: {
    backgroundColor: 'rgba(0, 0, 0, 0.26)',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.26)'
    }
  },
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
  margin: {
    marginTop: '5px',
    marginBottom: '10px',
    color: '#091641 !important',
    textAlign: 'center'
  },
  confirmationText: {
    fontSize: '22px',
    paddingBottom: '17px'
  },
  flex: {
    justifyContent: 'end',
    color: '#00B8CE !important'
  },
  textColor: {
    color: '#00B8CE !important'
  }
}))

const FormPersonalDetails = (props) => {
  const classes = useSyles()
  const didMount = useRef(false)
  const { authRole } = useSelector(
    ({ Auth }) => ({
      authRole: Auth.authRole
    }),
    shallowEqual
  )

  const {
    fromPage,
    back,
    next,
    postPersonalTRInfoLoading,
    getTitleDropdownDispatch,
    titleData,
    getClientDispatch,
    clearClientDispatch,
    postPersonalInfoTravelDispatch,
    clearPostPersonalTravelInfo,
    postPersonalTRInfoStatus,
    postPersonalTRInfoData,
    getAMLRequestDispatch,
    clearAMLRequestDispatch,
    getAmlValidLoading,
    AmlValidMessage,
    AmlValidData,
    AmlValidStatus,
    getTRQuoteDetailsDispatch,
    clearTRQuoteDetailsDispatch,
    getTRQuoteDetails,
    getTRQuoteDetailsLoading,
    getTRQuoteDetailsStatus,
    currentQuoteNumber,
    getQuoteDetailsDispatch,
    profileData,
    asdfasdfasdf
  } = props

  const agentDefault = {
    AGENCIES: 'ag',
    USERLOGIN: 'TESTUSERS',
    QUOTETYPE: '',
    Citizen: true,
    NEWCLN: true,
    TITLE: '',
    FNAME: '',
    LNAME: '',
    OCCUPATION: 'OTHER',
    OTHOCCUPATION: 'SH',
    NIC: '',
    PASSPORTNO: '',
    DTBIRTH: null,
    CONTACTNO: '',
    PHONENUMBER: '',
    EMAIL: ''
  }

  const {
    control,
    watch,
    setValue,
    getValues,
    handleSubmit,
    formState,
    clearErrors,
    reset,
    setError
  } = useForm({
    defaultValues: agentDefault
  })
  const [state, setState] = useState({
    personalData: {},
    editMode: false,
    disabledFields: {}
  })
  const [message, setMessage] = useState('')
  const [isDisable, setIsDisable] = useState(false)
  const [typingTimeout, setTypingTimeout] = useState(0)
  const [showRecordFound, setShowRecordFound] = useState(false)
  const [open, setOpen] = useState(false)
  const [showCusModal, setShowCusModal] = useState(false)
  const [searched, setSearched] = useState('')
  const [errorPop, setErrorPop] = useState(false)
  const { errors, isValid, defaultValues } = formState
  const swanWatcher = watch('swan_account')
  const clientValue = getValues('NEWCLN')
  const clientWatcher = watch('NEWCLN')
  const citizenWatcher = watch('Citizen')
  const citizenValue = getValues('Citizen')
  const NICWatcher = watch('NIC')
  const NICValue = getValues('NIC')
  const dobWatcher = watch('DTBIRTH')
  const summaryPage = fromPage === 'summary'

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = (item) => {
    setShowRecordFound(false)
    setOpen(false)
    clearClientDispatch()
    clearErrors()
    const getNumber = item.Telephone ? splitPhoneNuber(item.Telephone && item.Telephone) : ''
    const setVal = {
      // CLIENTNUM: item.CLIENTNUM,
      NIC: item.NicBrn,
      TITLE: item.TITLE,
      FNAME: item.FIRSTNAME,
      LNAME: item.LASTNAME,
      DTBIRTH: item.DTBIRTH ? moment(item.DTBIRTH) : null,
      EMAIL: item.Email,
      CONTACTNO: getNumber.ph,
      PHONENUMBER: getNumber.tele
    }
    setState(prevState => ({
      ...prevState,
      disabledFields: {
        NIC: !!item.NicBrn,
        TITLE: !!item.TITLE,
        FNAME: !!item.FIRSTNAME,
        LNAME: !!item.LASTNAME,
        DTBIRTH: !!item.DTBIRTH,
        EMAIL: !!item.Email,
        CONTACTNO: !!item.CONTACTNO
      }
    }))
    reset(formValues => ({
      ...formValues,
      ...setVal
    }))
  }

  const requestSearch = searchedVal => {
    const getAgency = getLocalStorage('logged_agency')
    if (searchedVal.length >= 2) {
      typingTimeout && clearTimeout(typingTimeout)
      setTypingTimeout(
        setTimeout(() => {
          !showRecordFound && setShowRecordFound(true)
          const param = {
            // "CLIENTNUM": searchedVal,
            NAME: searchedVal,
            TITLE: searchedVal,
            MOBILENO: searchedVal,
            DTBIRTH: searchedVal,
            CLIDNO: searchedVal,
            USERCRT: getAgency
          }
          getClientDispatch(param)
        }, 1500)
      )
    }
  }

  const cancelSearch = () => {
    setShowRecordFound(false)
    setSearched('')
    requestSearch(searched)
  }

  const onError = (errors, e) => {
    if (!_.isEmpty(errors)) {
      setErrorPop(true)
      setMessage('Please fill in required information to proceed')
    }
  }

  const onSubmit = (formData) => {
    const payload = getPersonalInfoPayloadTR(formData)
    postPersonalInfoTravelDispatch(payload)
  }

  useEffect(() => {
    if (didMount.current) {
      clearErrors()
      reset(formValues => ({
        ...formValues,
        TITLE: '',
        FNAME: '',
        LNAME: '',
        NIC: '',
        PASSPORTNO: '',
        DTBIRTH: '',
        CONTACTNO: '',
        PHONENUMBER: '',
        EMAIL: ''
      }))
      if (!_.isEmpty(state.personalData) && clientValue) {
        resetPersonalValues(state.personalData, reset)
      }
    }
  }, [clientWatcher])

  useEffect(() => {
    if (didMount.current) {
      clearErrors(['NIC', 'PASSPORTNO'])
      reset(formValues => ({
        ...formValues,
        PASSPORTNO: '',
        NIC: ''
      }))
    }
    if (state.editMode &&
      defaultValues.PASSPORTNO
    ) {
      reset(formValues => ({
        ...formValues,
        PASSPORTNO: state.editMode ? defaultValues.PASSPORTNO : ''
      }))
      setState(prevState => ({
        ...prevState,
        editMode: false
      }))
    }
  }, [citizenWatcher])

  const getMotorQuoteDetails = (id) => {
    const getDetailsBtn = document.getElementById(id)
    getDetailsBtn && getDetailsBtn.click()
  }
  useEffect(() => {
    const motorQuoteNo = getLocalStorage(TRAVEL_FORM.QUOTE_NUMBER)
    if (didMount.current && motorQuoteNo && motorQuoteNo) {
      getMotorQuoteDetails('getDetail-btn')
    }
  }, [currentQuoteNumber])

  useEffect(() => {
    if (_.size(errors)) {
      setErrorPop(true)
    }
  }, [errors])

  useEffect(() => {
    if (postPersonalTRInfoStatus === 'success' && !checkResFailed(postPersonalTRInfoData)) {
      toast.success('Personal informations have been saved!', { duration: 3000 })
      const getQouteNo = postPersonalTRInfoData && postPersonalTRInfoData.replace('S-', '')
      setLocalStorage(TRAVEL_FORM.QUOTE_NUMBER, getQouteNo)
      clearPostPersonalTravelInfo()
      !summaryPage && next()
      clearAMLRequestDispatch()
    } else if (postPersonalTRInfoStatus === 'error' || checkResFailed(postPersonalTRInfoData)) {
      toast.error(removeErrString(postPersonalTRInfoData), { duration: 4000 })
      clearPostPersonalTravelInfo()
    }
  }, [postPersonalTRInfoStatus])

  useEffect(() => {
    if (didMount.current && getTRQuoteDetailsStatus === 'success') {
      const personalInfo = getTRQuoteDetails &&
        getTRQuoteDetails.personalInfo
        ? getTRQuoteDetails.personalInfo
        : {}
      if (personalInfo) {
        setState(prevState => ({
          ...prevState,
          personalData: personalInfo,
          editMode: true
        }))
        resetPersonalValues(personalInfo, reset)
      }
      clearTRQuoteDetailsDispatch()
    }
  }, [getTRQuoteDetailsStatus])

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true
    }
    getTitleDropdownDispatch()
    const travelQuoteNo = getLocalStorage(TRAVEL_FORM.QUOTE_NUMBER)
    if (travelQuoteNo && travelQuoteNo) {
      getTRQuoteDetailsDispatch(travelQuoteNo)
    }
  }, [])

  useEffect(() => {
    if (NICValue && NICValue.length === 14) {
      // getAMLRequestDispatch(NICValue)
    }
  }, [NICWatcher])

  useEffect(() => {
    if (AmlValidStatus === 'error') {
      setShowCusModal(true)
    }
  }, [AmlValidStatus])

  useEffect(() => {
    const dob = moment(dobWatcher)?.format('DDMMYY')
    if (NICWatcher?.length === 14 && dob !== 'Invalid date') {
      const arrNic = NICWatcher.match(dob)
      const errorNic = !(arrNic?.[0] && arrNic?.[0] === dob)
      if (errorNic) {
        setMessage('NIC does not match DOB')
        setError('NIC', { type: 'error', shouldFocus: true, message: '' })
        setErrorPop(errorNic)
        setIsDisable(true)
      } else {
        setIsDisable(false)
        clearErrors('NIC')
      }
    }
  }, [dobWatcher, NICWatcher, message])

  const closeDialog = () => {
    setShowCusModal(false)
  }

  const checkdisabledConditions = (name) => {
    if (!clientValue && authRole !== 'customer' && state.disabledFields[name] && !summaryPage) {
      return true
    }
    return false
  }

  return (
    <>
      <ShowField
        show={!getTRQuoteDetailsLoading}
        yes={() => <></>}
        no={() =>
          <CustomBackdrop isLoading={getTRQuoteDetailsLoading} />}
      />
      <button
        onClick={() => {
          getTRQuoteDetailsDispatch(currentQuoteNumber)
        }}
        className='d-none' id='getDetail-btn'
      />
      <Dialog
        fullWidth
        maxWidth='sm'
        open={showCusModal}
        aria-labelledby='form-dialog-title'
        spacing={4}
      >
        <Grid container direction='row' display='flex' className={classes.flex}>
          <IconButton aria-label='close' onClick={() => closeDialog()}>
            <CloseIcon className={classes.textColor} />
          </IconButton>
        </Grid>
        <Grid
          container
          direction='row'
          justifyContent='center'
          alignItems='flex-start'
          className='summary-box motor-summary'
        >
          <Grid item xs={10} className={classes.margin}>
            <h4 className={classes.confirmationText}>
              NIC Validation - {AmlValidData && AmlValidData ? AmlValidData : AmlValidMessage}
            </h4>
          </Grid>
        </Grid>
      </Dialog>
      <ShowField
        show={summaryPage}
        yes={() => (null)}
        no={() =>
          <CustomBackdrop isLoading={getAmlValidLoading} />}
      />
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <Grid
          container
          direction='row'
          justifyContent='center'
          alignItems='flex-start'
          spacing={summaryPage ? 2 : 4}
        >
          <Grid item xs={12}>
            <Grid container spacing={2} alignItems='center'>
              <Grid item xs={12} md={summaryPage ? 12 : 6}>
                <Mradio
                  xs={12}
                  md={8}
                  name='COMPANY'
                  label='Type of Quotation'
                  control={control}
                  setValue={setValue}
                  grantedUsers={GRANTED_USERS.AGENT_BROKER}
                  userType={authRole}
                />
              </Grid>
              <ShowField
                show={authRole === 'customer' || summaryPage}
                yes={() => (null)}
                no={() =>
                  <>
                    <Grid item xs={12} md={summaryPage ? 12 : 6}>
                      <ClientsModals
                        disabled={clientValue}
                        showRecordFound={showRecordFound}
                        open={open}
                        searched={searched}
                        cancelSearch={cancelSearch}
                        handleClickOpen={handleClickOpen}
                        handleClose={handleClose}
                        requestSearch={requestSearch}
                      />
                    </Grid>
                  </>}
              />
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            sm={summaryPage ? 12 : 6}
            md={summaryPage ? 12 : 6}
          >
            <Grid container spacing={summaryPage ? 1 : 2}>
              {summaryPage
                ? (
                  <Grid item xs={12}>
                    <h4 className='form-title-md'>Your Personal Details</h4>
                  </Grid>
                  )
                : (
                  <Grid item xs={12}>
                    <h4 className='form-title-md'>
                      Personal Information{' '}
                      <span>
                        <span className='req-mark'>*</span> Required field
                      </span>
                    </h4>
                  </Grid>
                  )}
              {/* <Mswitch
                xs={12}
                name="swan_account"
                label="Do you have a mySwan app account?"
                control={control}
                setValue={setValue}
                grantedUsers={GRANTED_USERS.CUSTOMER}
                userType={authRole}
              /> */}
              <ShowField
                show={summaryPage}
                yes={() => (null)}
                no={() =>
                  <>
                    <Mswitch
                      xs={12}
                      name='NEWCLN'
                      label='New customer'
                      control={control}
                      setValue={setValue}
                      grantedUsers={GRANTED_USERS.AGENT_BROKER}
                      userType={authRole}
                      req
                    />
                  </>}
              />
              <Mswitch
                xs={12}
                name='Citizen'
                label='Is the Policy Holder a Mauritian citizen/Permanent
                resident?*'
                control={control}
                setValue={setValue}
                grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                userType={authRole}
                req
              />
              <ShowField
                show={citizenValue}
                yes={() => (
                  <>
                    <Mtextbox
                      xs={12}
                      name='NIC'
                      label='National Identity Card'
                      control={control}
                      maxLength={14}
                      clearErrors={clearErrors}
                      grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                      userType={authRole}
                      onKeyPress={(e) => { preventIfNotAlphaNumric(e) }}
                      readOnly={checkdisabledConditions('NIC')}
                      onBlur={
                        (e) => {
                          handleLeadingZeroWhiteSpace(
                            e,
                            'NIC',
                            setValue,
                            REGEX.ALPHA_NUMERIC_THIRTEEN_CHARS,
                            setError,
                            ERROR.NIC_INVALID
                          )
                        }
}
                      req
                    />
                  </>
                )}
                no={() => (
                  <>
                    <Mtextbox
                      xs={12}
                      name='PASSPORTNO'
                      label='Passport Number'
                      control={control}
                      grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                      userType={authRole}
                      req
                      clearErrors={clearErrors}
                      onKeyPress={(e) => { preventIfNotAlphaNumric(e) }}
                      pattern={REGEX.PASSPORT}
                      readOnly={checkdisabledConditions('PASSPORTNO')}
                      onBlur={
                        (e) => {
                          handleLeadingZeroWhiteSpace(
                            e,
                            'PASSPORTNO',
                            setValue,
                            REGEX.PASSPORT,
                            setError,
                            ERROR.PASSPORT_NO_INVALID
                          )
                        }
}
                      maxLength={9}
                    />
                  </>
                )}
              />
              <Mselect
                xs={summaryPage ? 5 : 4}
                md={summaryPage ? 4 : 3}
                name='TITLE'
                label='Title'
                control={control}
                grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                userType={authRole}
                options={titleData && titleData}
                optionsLabel='TITLE'
                optionsValue='TITLE'
                readOnly={checkdisabledConditions('TITLE')}
                req
              />
              <Mtextbox
                xs={summaryPage ? 7 : 8}
                md={summaryPage ? 8 : 9}
                name='FNAME'
                label='First Name'
                control={control}
                readOnly={checkdisabledConditions('FNAME')}
                grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                userType={authRole}
                req
                maxLength={130}
                clearErrors={clearErrors}
                onKeyPress={e => {
                  preventIfNotAlphaChars(e)
                }}
                pattern={REGEX.TEXT}
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
              />
              <Mtextbox
                xs={summaryPage ? 7 : 6}
                md={summaryPage ? 7 : 6}
                name='LNAME'
                label='Last Name'
                control={control}
                readOnly={checkdisabledConditions('LNAME')}
                grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                userType={authRole}
                req
                maxLength={130}
                clearErrors={clearErrors}
                onKeyPress={e => {
                  preventIfNotAlphaChars(e)
                }}
                pattern={REGEX.TEXT}
                onBlur={e => {
                  handleLeadingZeroWhiteSpace(
                    e,
                    'LNAME',
                    setValue,
                    REGEX.TEXT,
                    setError,
                    ERROR.TEXT
                  )
                }}
              />
               <Mdatepicker
               xs={summaryPage ? 5 : 6}
               md={summaryPage ? 5 : 6}
                name='DTBIRTH'
                label='Date of Birth'
                control={control}
                format={DATE.DATE_ONLY}
                placeholder={DATE.DATE_ONLY}
                minDate={moment().subtract(500, 'years')}
                maxDate={moment().subtract(18, 'years')} 
                grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                userType={authRole}
                onKeyPress={e => {
                  preventIfNotNumber(e)
                }}
                onClick={() => {
                  clearErrors('DTBIRTH')
                }}
                req
              />
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            sm={summaryPage ? 12 : 6}
            md={summaryPage ? 12 : 6}
          >
            <Grid container spacing={summaryPage ? 1 : 2}>
              <Grid item xs={12}>
                <h4 className='form-title-md'>Contact Details</h4>
              </Grid>
              <Mtextbox
                xs={12}
                name='EMAIL'
                label='Email Address'
                control={control}
                clearErrors={clearErrors}
                grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                userType={authRole}
                pattern={REGEX.EMAIL}
                readOnly={checkdisabledConditions('EMAIL')}
                onBlur={e => {
                  handleLeadingZeroWhiteSpace(
                    e,
                    'EMAIL',
                    setValue,
                    REGEX.EMAIL,
                    setError,
                    ERROR.EMAIL_INVALID
                  )
                }}
                req
                maxLength={50}
              />
              <Mtextbox
                xs={12}
                name='CONTACTNO'
                label='MOB'
                control={control}
                grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                userType={authRole}
                readOnly={checkdisabledConditions('CONTACTNO')}
                onKeyPress={e => {
                  preventIfNotNumericSpace(e)
                }}
                clearErrors={clearErrors}
                setPhNumberSeparator
                separatorRegex={REGEX.PHONE_SEPERATOR}
                pattern={REGEX.PHONE_NUMBER_3}
                onBlur={e => {
                  handleLeadingZeroWhiteSpace(
                    e,
                    'CONTACTNO',
                    setValue,
                    REGEX.PHONE_NUMBER_3,
                    setError,
                    ERROR.MOB_PHONE_INVALID
                  )
                }}
                maxLength={10}
                req
              />
              <Mtextbox
                xs={12}
                name='PHONENUMBER'
                label='Home Phone'
                control={control}
                grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                userType={authRole}
                onKeyPress={e => {
                  preventIfNotNumericSpace(e)
                }}
                readOnly={checkdisabledConditions('PHONENUMBER')}
                clearErrors={clearErrors}
                setPhNumberSeparator
                separatorRegex={REGEX.HOME_SEPERATOR}
                pattern={REGEX.HOME_NUMBER}
                onBlur={e => {
                  handleLeadingZeroWhiteSpace(
                    e,
                    'PHONENUMBER',
                    setValue,
                    REGEX.HOME_NUMBER,
                    setError,
                    ERROR.HOME_PHONE_INVALID
                  )
                }}
                maxLength={8}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} sm={summaryPage ? 12 : 8} md={8}>
            <ValidateNotify
              show={errorPop} errors={message} clear={setErrorPop}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={summaryPage ? 12 : 4}
            md={summaryPage ? 12 : 4}
            className='txt-right'
          >
            <Button
              variant='contained'
              color='primary'
              type='submit'
              className={!errors || !isValid ? classes.BtnDisable : ''}
            >
              {postPersonalTRInfoLoading
                ? (
                  <CircularProgress size={18} style={{ color: '#ffffff' }} />
                  )
                : (
                    summaryPage ? 'Submit' : 'Next'
                  )}
            </Button>
          </Grid>
        </Grid>
      </form>
      <MySwanModal swan_account={swanWatcher} />
    </>
  )
}

const mapStateToProps = (state) => {
  const {
    PersonalDropdown,
    TravelQuotation,
    MotorQuotation,
    Profile
  } = state
  return {
    getTitleLoading: PersonalDropdown.getTitleLoading,
    titleData: PersonalDropdown.titleData,
    postPersonalTRInfoLoading: TravelQuotation?.postPersonalTRInfoLoading,
    postPersonalTRInfoStatus: TravelQuotation?.postPersonalTRInfoStatus,
    postPersonalTRInfoData: TravelQuotation?.postPersonalTRInfoData,
    getAmlValidLoading: MotorQuotation?.getAmlValidLoading,
    AmlValidData: MotorQuotation?.AmlValidData,
    AmlValidStatus: MotorQuotation?.AmlValidStatus,
    AmlValidMessage: MotorQuotation?.AmlValidMessage,
    getTRQuoteDetailsStatus: TravelQuotation?.getTRQuoteDetailsStatus,
    getTRQuoteDetails: TravelQuotation?.getTRQuoteDetails,
    getTRQuoteDetailsLoading: TravelQuotation?.getTRQuoteDetailsLoading,
    currentQuoteNumber: MotorQuotation?.currentQuoteNumber,
    profileData: Profile.profileData
  }
}

const mapDispatchToProps = (dispatch) => ({
  getTitleDropdownDispatch: (params) => dispatch(PersonalDropdownActions.getTitleRequest(params)),
  postPersonalInfoTravelDispatch: (formData) => dispatch(TravelQuotationAction.PostPersonalInfoTravel(formData)),
  clearPostPersonalTravelInfo: () => dispatch(TravelQuotationAction.ClearPostPersonalTravelInfo()),
  getTRQuoteDetailsDispatch: (params) => dispatch(TravelQuotationAction.GetTRQuoteDetailsAction(params)),
  clearTRQuoteDetailsDispatch: () => dispatch(TravelQuotationAction.ClearTRQuoteDetailsAction()),
  getClientDispatch: params => dispatch(ClientActions.SearchClient(params)),
  clearClientDispatch: () => dispatch(ClientActions.ClearClient()),
  getAMLRequestDispatch: id => dispatch(MotorQuotationAction.getAMLRequest(id)),
  clearAMLRequestDispatch: () => dispatch(MotorQuotationAction.getAMLClear()),
  getQuoteDetailsDispatch: id => dispatch(MotorQuotationAction.GetQuoteDetailsAction(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(FormPersonalDetails)

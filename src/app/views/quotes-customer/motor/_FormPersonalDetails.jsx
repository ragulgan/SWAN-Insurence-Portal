import React, { useEffect, useState, useRef } from 'react'
import { connect, shallowEqual, useSelector } from 'react-redux'
import {
  Grid,
  CircularProgress,
  Button,
  makeStyles,
  Dialog
} from '@material-ui/core'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'

import moment from 'moment'
import _ from 'lodash'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Mtextbox from '../../../../app/form-controls/Mtextbox'
import Mselect from '../../../../app/form-controls/Mselect'
import Mswitch from '../../../../app/form-controls/Mswitch'
import Mtextarea from '../../../../app/form-controls/Mtextarea'
import Mdatepicker from '../../../../app/form-controls/Mdatepicker'
import ValidateNotify from '../../../../app/widgets/ValidateNotify'
import CustomBackdrop from '../../../../app/backdrop/CustomBackdrop'
import { PersonalDropdownActions, ClientActions } from '../../../../store/actions/index'

import { CustomerActions } from '../../../../store/actions/CustomerActions'
import { MotorQuotationAction } from '../../../../store/actions/MotorQuotationAction'
import {
  preventIfNotNumber,
  handleTrimWhiteSpace,
  handleSetError,
  checkResFailed,
  preventIfNotAlphaNumric,
  getSessionStorage,
  handleLeadingZeroWhiteSpace,
  removeErrString,
  setSessionStorage,
  preventIfNotAlphaChars,
  removeLeadingZero,
  preventIfNotNumericSpace,
  removeHyphen,
  removeSingleZero,
  handleLeadingZeroWhiteSpaceSingle
} from '../../../../helpers/helper'
import { REGEX, MOTOR_FORM, GRANTED_USERS, DATE } from '../../../../helpers/constants'
import { ERROR } from '../../../../helpers/messages'
import { ShowField } from '../../../../app/uiComponents'

const useStyles = makeStyles((theme) => ({
  BtnDisable: {
    backgroundColor: 'rgba(0, 0, 0, 0.26)',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.26)'
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
}
))

const fetchDefaults = {
  SWAN_ACC: false,
  TITLE: '',
  FIRSTNAME: '',
  LASTNAME: '',
  DTBIRTH: null,
  OCCUPATION: '',
  OTHOCCUPATION: '',
  YEARLIC: moment(),
  TOTNOCLMS: 0,
  MOB: '',
  PH: '',
  EML: '',
  RESIADD: '',
  RMRKS: '',
  AGENCIES: '01',
  USERLOGIN: 'PSPETER',
  CLIENTNUM: '',
  QUOTREQ: 'Sales Person 1',
  INDCOR: '',
  QUOTNUM: '',
  COMPANY: '',
  NICNO: '',
  LEARNER: true
}

const FormPersonalDetails = props => {
  const didMount = useRef(false)
  const { authRole } = useSelector(
    ({ Auth, Quotation }) => ({
      authRole: Auth.authRole,
      loggedUser: Quotation.loggedUser,
      loggedAgency: Quotation.loggedAgency,
      loggedCompany: Quotation.loggedCompany
    }),
    shallowEqual
  )
  const {
    fromPage,
    changeStep,
    getTitleDropdownDispatch,
    titleData,
    getOccupationDropdownDispatch,
    occupationData,
    getYearofLicenseDropdownDispatch,
    getQuoteDetailsDispatch,
    postPersonalInfoDispatch,
    getQuoteDetailsLoading,
    getQuoteDetailsStatus,
    getQuoteDetails,
    clearPostPersonalInfoDispatch,
    postPersonalInfoLoading,
    postPersonalInfoStatus,
    postPersonalInfoData,
    saveFormDispatch,
    currentQuoteNumber,
    ClearMotQuoteDetailsDispatch,
    getAMLRequestDispatch,
    clearAMLRequestDispatch,
    getAmlValidLoading,
    AmlValidData,
    AmlValidMessage,
    AmlValidStatus,
    postAMLDispatch,
    clearPostAMLDispatch,
    postAMLStatus,
    postAMLData,
    postAMLLoading
  } = props
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
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    shouldFocusError: true,
    shouldUnregister: false,
    shouldUseNativeValidation: false,
    isValid,
    defaultValues: fetchDefaults
  })

  const motorQuoteNo = getSessionStorage(MOTOR_FORM.QUOTE_NUMBER)
  const classes = useStyles()
  const [errorPop, setErrorPop] = useState(false)
  const [dobminDate, setDobminDate] = useState(moment().subtract(25, 'years'))
  const [showCusModal, setShowCusModal] = useState(false)
  const [nicMsg, setNicmsg] = useState('')
  const [state, setState] = useState({
    personalData: {},
    editMode: false
  })
  const { errors, isValid } = formState
  const [message, setMessage] = useState('')
  const [isDisable, setIsDisable] = useState(false)
  const summaryPage = fromPage === 'summary'
  const clientValue = true
  const claimValue = getValues('TOTNOCLMS')
  const learnerValue = getValues('LEARNER')
  const occupationValue = getValues('OCCUPATION')
  const learnerWatch = watch('LEARNER')
  const refusedWatcher = watch('refused')
  const dobWatcher = watch('DTBIRTH')
  const dobValues = getValues('DTBIRTH')
  const YearWatcher = watch('YEARLIC')
  const YearValues = getValues('YEARLIC')
  watch('OCCUPATION')
  watch('TOTNOCLMS')
  const NICWatcher = watch('NICNO')
  const NICValue = getValues('NICNO')

  const onSubmit = formData => {
    const checkSumofClaim = formData?.TOTNOCLMS !== 0 ? formData?.TOTNOCLMS : '0'
    const errorGreater = 'Total Number of Claims Should be less than or equals to 5'
    if (checkSumofClaim?.toString() > 5) {
      setError('TOTNOCLMS', { type: 'error' }, { shouldFocus: true, message: '' })
      setMessage(errorGreater)
      setErrorPop(true)
    } else {
      if (NICValue) {
        const AMLPayload = {
          TITLE: formData?.TITLE,
          FIRSTNAME: formData?.FIRSTNAME,
          LASTNAME: formData?.LASTNAME,
          CLIDNO: formData?.NICNO,
          DTBIRTH: formData.DTBIRTH ? formData.DTBIRTH.format('DD/MM/YYYY') : ''
        }
        postAMLDispatch(AMLPayload)
      }
      const payload = {
        ...formData,
        LEARNER: formData.LEARNER ? 'Y' : 'N',
        SWAN_ACC: formData.SWAN_ACC ? 'Y' : 'N',
        YEARLIC: formData.YEARLIC && formData.YEARLIC ? moment(formData.YEARLIC).format('YYYY') : moment().format('YYYY'),
        DTBIRTH: formData.DTBIRTH && formData.DTBIRTH ? moment(formData.DTBIRTH).format('DD/MM/YYYY') : '',
        TOTNOCLMS: formData?.TOTNOCLMS ? formData?.TOTNOCLMS : '0',
        PH: formData.PH ? removeHyphen(formData.PH) : '',
        MOB: formData.MOB ? removeHyphen(formData.MOB) : ''
      }
      postPersonalInfoDispatch(payload)
      saveFormDispatch(payload)
    }
  }

  const resetTheValues = (item, reset) => {
    reset(formValues => ({
      ...formValues,
      INDCOR: item.INDCOR,
      CLIENTNUM: item.CLIENTNUM,
      NICNO: item.NICNO,
      TITLE: item.TITLE,
      FIRSTNAME: item.FIRSTNAME,
      LASTNAME: item.LASTNAME,
      DTBIRTH: moment(item.DTBIRTH),
      OCCUPATION: item.OCCUPATION,
      OTHOCCUPATION: item.OTHOCCUPATION,
      YEARLIC: moment(item.YEARLIC),
      TOTNOCLMS: item.TOTNOCLMS || '0',
      RMRKS: item.RMRKS,
      RESIADD: item.RESIADD,
      MOB: item.MOB,
      PH: item.PH,
      EML: item.EML,
      AGENCIES: item.AGENCIES,
      USERLOGIN: item.USERLOGIN,
      QUOTREQ: item.QUOTREQ,
      QUOTNUM: item.QUOTNUM,
      LEARNER: item.LEARNER === 'Y'
    }))
  }
  const getMotorQuoteDetails = (id) => {
    const getDetailsBtn = document.getElementById(id)
    getDetailsBtn && getDetailsBtn.click()
  }

  useEffect(() => {
    if ((NICValue && NICValue.length === 14) && !state.editMode) {
      getAMLRequestDispatch(NICValue)
    }
  }, [NICWatcher])

  useEffect(() => {
    if (didMount.current && learnerValue) {
      setValue('YEARLIC', new Date(), { shouldValidate: true })
    }
  }, [learnerWatch])

  useEffect(() => {
    if (didMount.current && dobValues) {
      const dt = moment(dobValues, 'DD/MM/yyyy').toDate()
      if (dt) { setDobminDate(moment(dt).add(18, 'years')) }
    }
  }, [dobWatcher])

  useEffect(() => {
    const checkAmlConditions = NICValue
      ? (postPersonalInfoStatus && postAMLStatus === 'success') &&
      !checkResFailed(postPersonalInfoData)
      : postPersonalInfoStatus && !checkResFailed(postPersonalInfoData)
    if (checkAmlConditions) {
      toast.success('Personal informations have been saved!', { duration: 3000 })
      clearPostPersonalInfoDispatch()
      getQuoteDetailsDispatch(motorQuoteNo)
      const QuoteId = postPersonalInfoData.split('-')
      setSessionStorage(MOTOR_FORM.QUOTE_NUMBER, QuoteId[1])
      !summaryPage && changeStep(1)
    } else if (postPersonalInfoStatus === 'error' || checkResFailed(postPersonalInfoData)) {
      toast.error(removeErrString(postPersonalInfoData), { duration: 4000 })
      clearPostPersonalInfoDispatch()
    } else if (!postPersonalInfoStatus === 'error' && NICValue && postAMLStatus === 'error') {
      toast.error(`${postAMLData}`, { duration: 4000 })
      clearPostAMLDispatch()
      clearPostPersonalInfoDispatch()
    }
  }, [postPersonalInfoStatus, postAMLStatus])

  useEffect(() => {
    if (didMount.current && getQuoteDetailsStatus === 'success') {
      const personalInfo = getQuoteDetails && getQuoteDetails.personalDetails ? getQuoteDetails.personalDetails : {}
      if (personalInfo) {
        resetTheValues(personalInfo, reset)
        setState(prevState => ({
          ...prevState,
          personalData: personalInfo,
          editMode: true
        }))
      }
      ClearMotQuoteDetailsDispatch()
    }
  }, [getQuoteDetailsStatus])

  useEffect(() => {
    if (currentQuoteNumber) {
      getMotorQuoteDetails('getDetail-btn')
    }
  }, [currentQuoteNumber])

  useEffect(() => {
    if (AmlValidStatus === 'error') {
      setShowCusModal(true)
      setNicmsg(AmlValidData && AmlValidData)
    } else if (AmlValidStatus === 'success') {
      const SucessData = AmlValidData && AmlValidData
      const Msgdata = SucessData.split('-')
      const SuccessMsg = Msgdata[1]
      toast.success(`${SuccessMsg}`, { duration: 3000 })
    }
    clearAMLRequestDispatch()
  }, [AmlValidStatus])

  useEffect(() => {
    window.scrollTo(0, localStorage.getItem('position'))
    if (motorQuoteNo && motorQuoteNo) {
      getQuoteDetailsDispatch(motorQuoteNo)
    }
    getTitleDropdownDispatch()
    getOccupationDropdownDispatch()
    getYearofLicenseDropdownDispatch()
  }, [])

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true
    }
  })

  const onError = (errors, e) => {
    if (!_.isEmpty(errors)) {
      setErrorPop(true)
      setMessage('Please fill in required information to proceed')
    }
  }

  const closeDialog = () => {
    setShowCusModal(false)
    clearAMLRequestDispatch()
  }
  useEffect(() => {
    const dob = moment(dobWatcher)?.format('DDMMYY')
    if (dobWatcher && !dobWatcher.isValid()) {
      setError('DTBIRTH', { type: 'error' }, { message: '' })
      setIsDisable(true)
    }
    if (NICWatcher?.length === 14 && dob !== 'Invalid date') {
      const arrNic = NICWatcher.match(dob)
      const errorNic = !(arrNic?.[0] && arrNic?.[0] === dob)
      if (errorNic) {
        setMessage('Date of birth does not match NIC')
        setError('NICNO', { type: 'error' })
        setErrorPop(errorNic)
        setIsDisable(true)
      } else {
        setIsDisable(false)
        clearErrors('NICNO')
      }
    }
  }, [dobWatcher, NICWatcher, message])

  useEffect(() => {
    const yearOfLicense = moment(YearValues).format('YYYY')
      const dob = moment(dobWatcher)?.format('YYYY')
    if (YearWatcher && dob !== 'Invalid date') {
      const subValue = yearOfLicense - dob
      const result = subValue < 18
      if (result &&  yearOfLicense !== 'Invalid date' || moment().format('YYYY') < yearOfLicense) {
        setMessage('User is not 18 years old yet')
        setError('YEARLIC', { type: 'error', shouldFocus: true, message: '' })
        moment().format('YYYY') > yearOfLicense && setError('DTBIRTH', { type: 'error', shouldFocus: true, message: '' })
        setErrorPop(result)
        setIsDisable(true)
      } else  {
        setIsDisable(false)
        clearErrors('YEARLIC')
        clearErrors('DTBIRTH')
      }
    }
  }, [YearWatcher, dobWatcher,message])

  return (
    <>
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
              NIC Validation - {nicMsg}
            </h4>
          </Grid>
        </Grid>
      </Dialog>
      <ShowField
        show={fromPage === 'summary'}
        yes={() => (null)}
        no={() =>
          <CustomBackdrop isLoading={getQuoteDetailsLoading || getAmlValidLoading} />}
      />
      <button
        onClick={() => { getQuoteDetailsDispatch(currentQuoteNumber) }}
        className='d-none' id='getDetail-btn'
      />
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <Grid
          container
          direction='row'
          justifyContent='center'
          alignItems='flex-start'
          spacing={fromPage === 'summary' ? 2 : 4}
        >
          <Grid item xs={12}>
            <Grid container spacing={2} alignItems='center'>
              <Grid item xs={12} md={fromPage === 'summary' ? 12 : 6}>
                {/* <Mradio
                  xs={12}
                  md={8}
                  name="INDCOR"
                  label="Type of Quotation"
                  control={control}
                  clearErrors={clearErrors}
                  setValue={setValue}
                  grantedUsers={GRANTED_USERS.CUSTOMER}
                  userType={authRole}
                /> */}
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={fromPage === 'summary' ? 12 : 6}>
            <Grid container spacing={fromPage === 'summary' ? 1 : 2}>
              <Grid item xs={12}>
                <h4 className='form-title-md'>
                  Personal Details{' '}
                  <span>
                    <span className='req-mark'>*</span> Required field
                  </span>
                </h4>
              </Grid>

              <Mswitch
                xs={12}
                name='SWAN_ACC'
                label='Do you have a mySwan app account?'
                control={control}
                clearErrors={clearErrors}
                grantedUsers={GRANTED_USERS.CUSTOMER}
                userType={authRole}
              />

              <Mtextbox
                xs={12}
                name='NICNO'
                label='National IdentityCard No.'
                control={control}
                clearErrors={clearErrors}
                onKeyPress={e => {
                  preventIfNotAlphaNumric(e)
                }}
                setUpperCaseSeparator
                maxLength={14}
                grantedUsers={GRANTED_USERS.CUSTOMER}
                userType={authRole}
                pattern={REGEX.ALPHA_NUMERIC_THIRTEEN_CHARS}
                onBlur={e => {
                  handleLeadingZeroWhiteSpace(
                    e,
                    'NICNO',
                    setValue,
                    REGEX.ALPHA_NUMERIC_THIRTEEN_CHARS,
                    setError,
                    ERROR.NIC_INVALID
                  )
                  removeSingleZero(e, 'NICNO', setValue)
                }}
              />
              <Mselect
                reset={reset}
                xs={fromPage === 'summary' ? 5 : 4}
                md={fromPage === 'summary' ? 4 : 3}
                name='TITLE'
                label='Title'
                control={control}
                clearErrors={clearErrors}
                disabled={!clientValue}
                grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                userType={authRole}
                options={titleData && titleData}
                optionsLabel='TITLE'
                optionsValue='TITLE'
                req
              />
              <Mtextbox
                xs={fromPage === 'summary' ? 7 : 8}
                md={fromPage === 'summary' ? 8 : 9}
                name='FIRSTNAME'
                label='First Name'
                maxLength={130}
                control={control}
                clearErrors={clearErrors}
                grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                userType={authRole}
                req
                onKeyPress={e => {
                  preventIfNotAlphaChars(e)
                }}
                pattern={REGEX.TEXT}
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
                md={6}
                name='LASTNAME'
                label='Last Name'
                control={control}
                clearErrors={clearErrors}
                grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                userType={authRole}
                maxLength={130}
                req
                onKeyPress={e => {
                  preventIfNotAlphaChars(e)
                }}
                pattern={REGEX.TEXT}
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
                xs={12}
                md={6}
                name='DTBIRTH'
                label='Date of Birth'
                control={control}
                format={DATE.DATE_ONLY}
                placeholder={DATE.DATE_ONLY}
                minDate={moment().subtract(500, 'years')}
                // maxDate={moment().subtract(18, 'years')}
                grantedUsers={GRANTED_USERS.CUSTOMER}
                userType={authRole}
                onKeyPress={e => {
                  preventIfNotNumber(e)
                }}
                onClick={() => {
                  clearErrors('DTBIRTH')
                }}
                req
              />
              <Mselect
                reset={reset}
                xs={12}
                name='OCCUPATION'
                label='Occupation'
                control={control}
                clearErrors={clearErrors}
                disabled={!clientValue}
                grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                userType={authRole}
                options={occupationData && occupationData}
                optionsLabel='FACCATEG'
                optionsValue='FACCATEG'
                req
              />
              <ShowField
                show={occupationValue === 'OTHER'}
                yes={() => (
                  <>
                    <Mtextbox
                      xs={12}
                      name='OTHOCCUPATION'
                      label='Other Occupation'
                      control={control}
                      clearErrors={clearErrors}
                      disabled={!clientValue}
                      grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                      userType={authRole}
                      pattern={REGEX.ALPHA_NUMERIC_SPECIAL_CHARS}
                      maxLength={70}
                      onBlur={e => {
                        handleTrimWhiteSpace(e, 'OTHOCCUPATION', setValue)
                        removeSingleZero(e, 'OTHOCCUPATION', setValue)
                        handleSetError(
                          e,
                          'OTHOCCUPATION',
                          setError,
                          REGEX.ALPHA_NUMERIC_SPECIAL_CHARS,
                          ERROR.ALPHA_NUMERIC_SPACE
                        )
                      }}
                      req
                    />
                  </>
                )}
                no={() => null}
              />
              <Mswitch
                xs={12}
                name='LEARNER'
                label='Learner'
                control={control}
                clearErrors={clearErrors}
                setValue={setValue}
                grantedUsers={GRANTED_USERS.CUSTOMER}
                userType={authRole}
              />
              <Mdatepicker
                xs={12}
                md={5}
                name='YEARLIC'
                label='Year of Licence'
                format='YYYY'
                views={['year']}
                minDate={moment().subtract(25, 'years')}
                maxDate={moment()}
                control={control}
                clearErrors={clearErrors}
                grantedUsers={GRANTED_USERS.AGENT_CUSTOMER}
                userType={authRole}
                disabled={learnerValue === true}
                onKeyPress={e => {
                  preventIfNotNumber(e)
                }}
              />
              <Mtextbox
                xs={12}
                md={7}
                name='TOTNOCLMS'
                label='Total No. Of claims over past 3 years'
                grantedUsers={GRANTED_USERS.AGENT_CUSTOMER}
                userType={authRole}
                maxLength={1}
                onKeyPress={e => {
                  preventIfNotNumber(e)
                }}
                control={control}
                clearErrors={clearErrors}
              />
            </Grid>
          </Grid>
          <Grid item md={fromPage === 'summary' ? 12 : 6}>
            <Grid container spacing={fromPage === 'summary' ? 1 : 2}>
              <ShowField
                show={authRole === 'broker'}
                yes={() => (
                  <Grid item xs={12}>
                    <h4 className='form-title-md'>Driver Details</h4>
                  </Grid>
                )}
                no={() =>
                  <Grid item xs={12}>
                    <h4 className='form-title-md'>Contact Details</h4>
                  </Grid>}
              />
              <Mtextbox
                xs={12}
                name='MOB'
                label='Mobile Phone'
                control={control}
                clearErrors={clearErrors}
                grantedUsers={GRANTED_USERS.AGENT_CUSTOMER}
                userType={authRole}
                onKeyPress={e => {
                  preventIfNotNumericSpace(e)
                }}
                setPhNumberSeparator
                separatorRegex={REGEX.PHONE_SEPERATOR}
                pattern={REGEX.PHONE_NUMBER_3}
                onBlur={e => {
                  removeLeadingZero(e, 'MOB', setValue)
                  handleSetError(
                    e,
                    'MOB',
                    setError,
                    REGEX.PHONE_NUMBER_3,
                    ERROR.PHONE_INVALID
                  )
                }}
                maxLength={10}
                req
              />
              <Mtextbox
                xs={12}
                name='PH'
                label='Home Phone'
                grantedUsers={GRANTED_USERS.AGENT_CUSTOMER}
                userType={authRole}
                control={control}
                clearErrors={clearErrors}
                onKeyPress={e => {
                  preventIfNotNumericSpace(e)
                }}
                setPhNumberSeparator
                separatorRegex={REGEX.HOME_SEPERATOR}
                pattern={REGEX.HOME_NUMBER}
                onBlur={e => {
                  removeLeadingZero(e, 'PH', setValue)
                  handleSetError(
                    e,
                    'PH',
                    setError,
                    REGEX.HOME_NUMBER,
                    ERROR.HOME_PHONE_INVALID
                  )
                }}
                maxLength={8}
              />
              <Mtextbox
                xs={12}
                name='EML'
                label='Email Address'
                grantedUsers={GRANTED_USERS.AGENT_CUSTOMER}
                userType={authRole}
                control={control}
                clearErrors={clearErrors}
                pattern={REGEX.EMAIL}
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
                  removeSingleZero(e, 'EML', setValue)
                }}
                req
              />
              <Mtextarea
                xs={12}
                name='RESIADD'
                label='Residential Address'
                control={control}
                clearErrors={clearErrors}
                disabled={!clientValue}
                grantedUsers={GRANTED_USERS.AGENT_CUSTOMER}
                userType={authRole}
                pattern={REGEX.ALPHA_NUMERIC_SPECIAL_CHARS}
                onBlur={e => {
                  handleLeadingZeroWhiteSpaceSingle(
                    e,
                    'RESIADD',
                    setValue,
                    REGEX.ALPHA_NUMERIC_SPECIAL_CHARS,
                    setError,
                    ERROR.ALPHA_NUMERIC_SPACE
                  )
                  removeSingleZero(e, 'RESIADD', setValue)
                }}
                req
              />
              <Mtextarea
                xs={12}
                name='RMRKS'
                label='Remarks (max 155 chars)'
                onBlur={e => {
                  handleLeadingZeroWhiteSpaceSingle(
                    e,
                    'RMRKS',
                    setValue,
                    REGEX.ALPHA_NUMERIC_SPECIAL_CHARS,
                    setError,
                    ERROR.ALPHA_NUMERIC_SPACE
                  )
                  removeSingleZero(e, 'RMRKS', setValue)
                }}
                maxLength={155}
                grantedUsers={GRANTED_USERS.AGENT_CUSTOMER}
                userType={authRole}
                control={control}
                clearErrors={clearErrors}
              />
              <ShowField
                show={authRole === 'broker'}
                yes={() => (
                  <>
                    <Mswitch
                      xs={12}
                      name='LEARNER'
                      label='Learner'
                      control={control}
                      clearErrors={clearErrors}
                      setValue={setValue}
                      grantedUsers={GRANTED_USERS.BROKER}
                      userType={authRole}
                    />
                    <Mdatepicker
                      xs={6}
                      md={5}
                      name='YEARLIC'
                      label='Year (YYYY)'
                      format='YYYY'
                      views={['year']}
                      minDate={moment().subtract(25, 'years')}
                      maxDate={moment()}
                      control={control}
                      clearErrors={clearErrors}
                      grantedUsers={GRANTED_USERS.BROKER}
                      userType={authRole}
                      disabled={learnerValue === true}
                    />
                    <Mtextbox
                      xs={6}
                      md={7}
                      name='TOTNOCLMS'
                      label='Total No. Of claims over past 3 years'
                      grantedUsers={GRANTED_USERS.BROKER}
                      userType={authRole}
                      maxLength={5}
                      onKeyPress={e => {
                        preventIfNotNumber(e)
                      }}
                      control={control}
                      clearErrors={clearErrors}
                    />
                  </>
                )}
                no={() => null}
              />

              {authRole === 'authRole' && claimValue >= 1
                ? (
                  <>
                    <Grid item xs={12}>
                      <h4 className='form-title-md'>
                        No. of accidents/claims past 3 years
                      </h4>
                    </Grid>
                    <Mdatepicker
                      xs={6}
                      name='year_1'
                      label='Year (YYYY)'
                      control={control}
                      clearErrors={clearErrors}
                      maxDate={moment()}
                      grantedUsers={GRANTED_USERS.BROKER}
                      userType={authRole}
                    />
                    <Mtextbox
                      xs={6}
                      name='number_of_clims_1'
                      label='Number of Claims'
                      control={control}
                      clearErrors={clearErrors}
                      maxDate={moment()}
                      grantedUsers={GRANTED_USERS.BROKER}
                      userType={authRole}
                    />
                    <Mdatepicker
                      xs={6}
                      name='year_2'
                      label='Year (YYYY)'
                      control={control}
                      clearErrors={clearErrors}
                      maxDate={moment()}
                      grantedUsers={GRANTED_USERS.BROKER}
                      userType={authRole}
                    />
                    <Mtextbox
                      xs={6}
                      name='number_of_clims_2'
                      label='Number of Claims'
                      control={control}
                      clearErrors={clearErrors}
                      grantedUsers={GRANTED_USERS.BROKER}
                      userType={authRole}
                    />
                    <Mdatepicker
                      xs={6}
                      name='year_3'
                      label='Year (YYYY)'
                      control={control}
                      clearErrors={clearErrors}
                      maxDate={moment()}
                      grantedUsers={GRANTED_USERS.BROKER}
                      userType={authRole}
                    />
                    <Mtextbox
                      xs={6}
                      name='number_of_clims_3'
                      label='Number of Claims'
                      control={control}
                      clearErrors={clearErrors}
                      grantedUsers={GRANTED_USERS.BROKER}
                      userType={authRole}
                    />
                  </>
                )
                : null}
              <ShowField
                show={authRole === 'broker'}
                yes={() => (
                  <Grid item xs={12}>
                    <p>Total No. of claims: {claimValue}</p>
                  </Grid>
                )}
                no={() => null}
              />
              <Mtextarea
                xs={12}
                name='HEALTHDTL'
                label='Please specify any health problem, if any, that may impair your driving ability'
                control={control}
                clearErrors={clearErrors}
                grantedUsers={GRANTED_USERS.BROKER}
                userType={authRole}
              />
              <Mtextarea
                xs={12}
                name='OTHDRVDTL'
                label='Other Driver details (Age, Occupation, License Info, Driving Experience etc.)'
                control={control}
                clearErrors={clearErrors}
                grantedUsers={GRANTED_USERS.BROKER}
                userType={authRole}
              />
              <Mswitch
                xs={12}
                name='CONVICIND'
                label='Have you or any of the above drivers had any conviction in the past 5 years?'
                control={control}
                clearErrors={clearErrors}
                setValue={setValue}
                grantedUsers={GRANTED_USERS.BROKER}
                userType={authRole}
              />
              <Mswitch
                xs={12}
                name='PROSECIND'
                label='Have you or any of the above drivers had any prosecution pending for any offence in connection with a motor vehicle?'
                control={control}
                clearErrors={clearErrors}
                setValue={setValue}
                grantedUsers={GRANTED_USERS.BROKER}
                userType={authRole}
              />
              <Mswitch
                xs={12}
                name='PROSECIND'
                label='Have you or any of the above drivers had their licence suspended?'
                control={control}
                clearErrors={clearErrors}
                setValue={setValue}
                grantedUsers={GRANTED_USERS.BROKER}
                userType={authRole}
              />
              <Mswitch
                xs={12}
                name='REFINSIND'
                label='Have you or any of the above drivers been refused insurance at normal rates or terms during the past 5 years?'
                control={control}
                clearErrors={clearErrors}
                setValue={setValue}
                grantedUsers={GRANTED_USERS.BROKER}
                userType={authRole}
              />
              {refusedWatcher
                ? (
                  <Mtextarea
                    xs={12}
                    name='specify'
                    label='Please specify'
                    control={control}
                    clearErrors={clearErrors}
                    grantedUsers={GRANTED_USERS.BROKER}
                    userType={authRole}
                  />
                )
                : null}

            </Grid>
          </Grid>
          <Grid item md={12} sm={12} className='txt-right'>
            <Button
              variant='contained'
              color='primary'
              type='submit'
              className={!errors || !isValid ? classes.BtnDisable : ''}
              disabled={!errors || !isValid ? !errors : isDisable}
            >
              {postPersonalInfoLoading
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
      <ValidateNotify show={errorPop} errors={message} clear={setErrorPop} />
    </>
  )
}

const mapStateToProps = state => {
  const { PersonalDropdown, Customer, MotorQuotation } = state
  return {
    getTitleLoading: PersonalDropdown.getTitleLoading,
    titleData: PersonalDropdown.titleData,
    getOccupationLoading: PersonalDropdown.getOccupationLoading,
    occupationData: PersonalDropdown.occupationData,
    getYearofLicenseLoading: PersonalDropdown.getYearofLicenseLoading,
    yearOfLicenseData: PersonalDropdown.yearOfLicenseData,
    personalDetailSuccess: Customer.personalDetailSuccess,
    vehicleDetailSuccess: Customer.vehicleDetailSuccess,
    postPersonalInfoLoading: MotorQuotation?.postPersonalInfoLoading,
    postPersonalInfoData: MotorQuotation?.postPersonalInfoData,
    postPersonalInfoStatus: MotorQuotation?.postPersonalInfoStatus,
    postPersonalInfomessage: MotorQuotation?.postPersonalInfomessage,
    getQuoteDetailsStatus: MotorQuotation?.getQuoteDetailsStatus,
    getQuoteDetailsLoading: MotorQuotation?.getQuoteDetailsLoading,
    getQuoteDetails: MotorQuotation?.getQuoteDetails,
    currentQuoteNumber: MotorQuotation?.currentQuoteNumber,
    getAmlValidLoading: MotorQuotation?.getAmlValidLoading,
    AmlValidData: MotorQuotation?.AmlValidData,
    AmlValidStatus: MotorQuotation?.AmlValidStatus,
    AmlValidMessage: MotorQuotation?.AmlValidMessage,
    postAMLLoading: MotorQuotation?.postAMLLoading,
    postAMLData: MotorQuotation?.postAMLData,
    postAMLStatus: MotorQuotation?.postAMLStatus,
    postAMLmessage: MotorQuotation?.postAMLmessage,
    postAMLLoading: MotorQuotation?.postAMLLoading,
    postAMLData: MotorQuotation?.postAMLData,
    postAMLStatus: MotorQuotation?.postAMLStatus,
    postAMLmessage: MotorQuotation?.postAMLmessage
  }
}

const mapDispatchToProps = dispatch => ({
  getTitleDropdownDispatch: params => dispatch(PersonalDropdownActions.getTitleRequest(params)),
  getOccupationDropdownDispatch: params => dispatch(PersonalDropdownActions.getOccupationRequest(params)),
  getYearofLicenseDropdownDispatch: params => dispatch(PersonalDropdownActions.getYearofLicenseRequest(params)),
  personalDetailsDispatch: formData => dispatch(CustomerActions.SavePersonalDetails(formData)),
  vehicleDetailsDispatch: formData => dispatch(CustomerActions.SaveVehiclesDetails(formData)),
  postPersonalInfoDispatch: formData => dispatch(MotorQuotationAction.PostPersonalDetailsAction(formData)),
  clearPostPersonalInfoDispatch: () => dispatch(MotorQuotationAction.ClearPostPersonalInfoAction()),
  GetPersonalDetailsAction: formData => dispatch(MotorQuotationAction.GetPersonalDetailsAction(formData)),
  ClearMotQuoteDetailsDispatch: () => dispatch(MotorQuotationAction.ClearMotQuoteDetailsAction()),
  saveFormDispatch: data => dispatch(MotorQuotationAction.SaveFormAction(data)),
  getQuoteDetailsDispatch: id => dispatch(MotorQuotationAction.GetQuoteDetailsAction(id)),
  SaveMotorFormAction: data => dispatch(MotorQuotationAction.SaveMotorFormAction(data)),
  getClientDispatch: params => dispatch(ClientActions.SearchClient(params)),
  clearClientDispatch: () => dispatch(ClientActions.ClearClient()),
  getAMLRequestDispatch: id => dispatch(MotorQuotationAction.getAMLRequest(id)),
  clearAMLRequestDispatch: () => dispatch(MotorQuotationAction.getAMLClear()),
  postAMLDispatch: formData => dispatch(MotorQuotationAction.PostAMLAction(formData)),
  clearPostAMLDispatch: () => dispatch(MotorQuotationAction.ClearPostAMLAction()),
  postAMLDispatch: formData => dispatch(MotorQuotationAction.PostAMLAction(formData)),
  clearPostAMLDispatch: () => dispatch(MotorQuotationAction.ClearPostAMLAction())
})

export default connect(mapStateToProps, mapDispatchToProps)(FormPersonalDetails)

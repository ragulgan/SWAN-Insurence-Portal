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
import ClientsModals from '../../../../app/modals/ClientsModal'
import Mradio from '../../../../app/form-controls/Mradio'
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
  preventIfNotAlphaChars,
  handleTrimWhiteSpace,
  handleLeadingZeroWhiteSpaceSingle,
  handleSetError,
  checkResFailed,
  preventIfNotAlphaNumric,
  handleLeadingZeroWhiteSpace,
  getSessionStorage,
  getLocalStorage,
  removeErrString,
  setSessionStorage,
  removeLeadingZero,
  preventIfNotNumericSpace,
  removeHyphen,
  removeSingleZero
} from '../../../../helpers/helper'
import { REGEX, MOTOR_FORM, GRANTED_USERS, DATE } from '../../../../helpers/constants'
import { ERROR } from '../../../../helpers/messages'
import { ShowField } from '../../../../app/uiComponents'
import { date } from 'yup'

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
const userLogin = getLocalStorage('logged_user')
const userAgency = getLocalStorage('logged_agency')
const fetchDefaults = {
  AGENCIES: userAgency,
  USERLOGIN: userLogin,
  QUOTREQ: 'Sales Person 1',
  ZONE: '',
  INDCOR: '',
  QUOTNUM: '',
  NEWCLN: true,
  COMPANY: '',
  CLIENTNUM: '',
  NICNO: '',
  TITLE: '',
  FIRSTNAME: '',
  LASTNAME: '',
  DTBIRTH: null,
  OCCUPATION: '',
  OTHOCCUPATION: '',
  LEARNER: true,
  YEARLIC: moment(),
  TOTNOCLMS: '0',
  CLMYR1: '',
  NOCLMYR1: '',
  CLMYR2: '',
  NOCLMYR2: '',
  CLMYR3: '',
  NOCLMYR3: '',
  RMRKS: '',
  RESIADD: '',
  MOB: '',
  PH: '',
  EML: '',
  STAFFIND: '',
  HEALTHDTL: '',
  OTHDRVDTL: '',
  CONVICIND: '',
  PROSECIND: '',
  REFINSIND: '',
  RefRemarks: ''
}

const FormPersonalDetails = props => {
  const { authRole } = useSelector(
    ({ Auth }) => ({
      authRole: Auth.authRole
    }),
    shallowEqual
  )
  const didMount = useRef(false)
  const {
    activeQuote, // From session storage
    quoteNumber, // From url query params
    fromPage,
    next,
    getTitleDropdownDispatch,
    titleData,
    getOccupationDropdownDispatch,
    occupationData,
    getYearofLicenseDropdownDispatch,
    getClientDispatch,
    clearClientDispatch,
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
    postAMLDispatch,
    clearPostAMLDispatch,
    postAMLStatus,
    postAMLData,
    postAMLLoading,
    getAMLRequestDispatch,
    clearAMLRequestDispatch,
    getAmlValidLoading,
    AmlValidMessage,
    AmlValidData,
    AmlValidStatus
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
  const motorQuoteId = getSessionStorage(MOTOR_FORM.QUOTE_NUMBER)
  const classes = useStyles()
  const [errorPop, setErrorPop] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showCusModal, setShowCusModal] = useState(false)
  const [nicMsg, setNicmsg] = useState('')
  const [dobminDate, setDobminDate] = useState(moment().subtract(25, 'years'))
  const [open, setOpen] = useState(false)
  const [typingTimeout, setTypingTimeout] = useState(0)
  const [showRecordFound, setShowRecordFound] = useState(false)
  const [searched, setSearched] = useState('')
  const [state, setState] = useState({
    personalData: {},
    editMode: false,
    disabledFields: {}
  })
  const { errors, isValid } = formState
  const [message, setMessage] = useState('')
  const [isDisable, setIsDisable] = useState(false)
  const summaryPage = fromPage === 'summary'
  const clientValue = getValues('NEWCLN')
  const learnerValue = getValues('LEARNER')
  const occupationValue = getValues('OCCUPATION')
  const clientWatcher = watch('NEWCLN')
  const learnerWatch = watch('LEARNER')
  const dobWatcher = watch('DTBIRTH')
  const dobValues = getValues('DTBIRTH')
  const YearWatcher = watch('YEARLIC')
  const YearValues = getValues('YEARLIC')
  watch('OCCUPATION')
  watch('TOTNOCLMS')
  const NICWatcher = watch('NICNO')
  const NICValue = getValues('NICNO')

  const onError = (errors, e) => {
    if (!_.isEmpty(errors)) {
      setErrorPop(true)
      setMessage('Please fill in required information to proceed')
    }
  }
  const onSubmit = formData => {
    const checkSumofClaim = formData?.TOTNOCLMS !== 0 ? formData?.TOTNOCLMS : '0'
    const errorGreater = 'Total Number of Claims Should be less than or equals to 5'
    if (checkSumofClaim?.toString() > 5) {
      setMessage(errorGreater)
      setError('TOTNOCLMS', { type: 'error' }, { shouldFocus: true, message: '' })
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
        NEWCLN: formData.NEWCLN ? 'Y' : 'N',
        LEARNER: formData.LEARNER ? 'Y' : 'N',
        YEARLIC: formData.YEARLIC && formData.YEARLIC
          ? moment(formData.YEARLIC).format('YYYY')
          : moment().format('YYYY'),
        DTBIRTH: formData.DTBIRTH && formData.DTBIRTH
          ? moment(formData.DTBIRTH).format('DD/MM/YYYY')
          : '',
        TOTNOCLMS: formData?.TOTNOCLMS ? formData?.TOTNOCLMS : '0',
        PH: formData.PH ? removeHyphen(formData.PH) : '',
        MOB: formData.MOB ? removeHyphen(formData.MOB) : ''
      }
      postPersonalInfoDispatch(payload)
      saveFormDispatch(payload)
    }
  }
  const handleClickOpen = () => {
    setOpen(true)
  }
  
  const handleCloseModal = () => {
    setShowRecordFound(false)
    setOpen(false)
    clearClientDispatch()
  }

  const handleClose = (item) => {
    setShowRecordFound(false)
    setOpen(false)
    clearClientDispatch()
    clearErrors()
    const setVal = {
      CLIENTNUM: item.CLIENTNUM,
      NICNO: item.NICNO,
      TITLE: item.TITLE,
      FIRSTNAME: item.FIRSTNAME,
      LASTNAME: item.LASTNAME,
      DTBIRTH: item.DTBIRTH ? moment(item.DTBIRTH) : null,
      OCCUPATION: item.OCCUPATION,
      EML: item.EMAIL,
      RESIADD: item.RESADDR1,
      MOB: item.TELNO
    }
    setState(prevState => ({
      ...prevState,
      disabledFields: {
        CLIENTNUM: !!item.CLIENTNUM,
        NICNO: !!item.NICNO,
        TITLE: !!item.TITLE,
        FIRSTNAME: !!item.FIRSTNAME,
        LASTNAME: !!item.LASTNAME,
        DTBIRTH: !!item.DTBIRTH,
        OCCUPATION: !!item.OCCUPATION,
        EML: !!item.EML,
        RESIADD: !!item.RESIADD,
        MOB: !!item.MOB
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
            CLIENTNUM: searchedVal,
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
  const resetTheValues = (item, reset) => {
    reset(formValues => ({
      ...formValues,
      INDCOR: item.INDCOR,
      NEWCLN: item.NEWCLN === 'Y',
      LEARNER: item.LEARNER === 'Y',
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
      QUOTNUM: item.QUOTNUM
    }))
  }

  const closeDialog = () => {
    setShowCusModal(false)
    clearAMLRequestDispatch()
  }
  
  const checkdisabledConditions = (name) => {
    const isDisabledField = !!state.disabledFields[name]
    if (!clientValue && authRole !== 'customer' && isDisabledField && !summaryPage) {
      return true
    }
    return false
  }

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true
    }
  })

  useEffect(() => {
    if (didMount.current) {
      clearErrors()
      if (!state.personalData) {
        reset(formValues => ({
          ...formValues,
          CLIENTNUM: '',
          NICNO: '',
          TITLE: '',
          FIRSTNAME: '',
          LASTNAME: '',
          DTBIRTH: '',
          OCCUPATION: '',
          EML: '',
          RESIADD: '',
          MOB: ''
        }))
      }
    }
  }, [clientWatcher])

  useEffect(() => {
    if ((NICValue && NICValue.length === 14) && !state.editMode) {
      getAMLRequestDispatch(NICValue)
    }
  }, [NICWatcher])
  useEffect(() => {
    if (didMount.current && learnerValue) {
      setValue('YEARLIC', moment(), { shouldValidate: true })
    }
  }, [learnerWatch])

  useEffect(() => {
    if (didMount.current && !clientValue && showModal) {
      handleClickOpen()
    }
    if (didMount.current && clientValue) {
      setShowModal(true)
    }
  }, [clientWatcher])

  useEffect(() => {
    if (didMount.current && dobValues) {
      const dt = moment(dobValues, 'DD/MM/yyyy').toDate()
      if (dt) { setDobminDate(moment(dt).add(18, 'years')) }
    }
  }, [dobWatcher])

  useEffect(() => {
    const dob = moment(dobWatcher)?.format('DDMMYY')  
    if(dobWatcher && !dobWatcher.isValid()){
      setError('DTBIRTH', { type: 'error'},{ message: '' })
      setIsDisable(true)
    }
    if (NICWatcher?.length === 14 && dob !== 'Invalid date') {
      const arrNic = NICWatcher.match(dob)
      const errorNic = !(arrNic?.[0] && arrNic?.[0] === dob)
      if (errorNic) {
        setMessage('Date of birth does not match NIC')
        setError('NICNO', { type: 'error', shouldFocus: true, message: '' })
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
      if (result &&  yearOfLicense !== 'Invalid date' ||  moment().format('YYYY') < yearOfLicense) {
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

  useEffect(() => {
    getTitleDropdownDispatch()
    getOccupationDropdownDispatch()
    getYearofLicenseDropdownDispatch()
  }, [])

  useEffect(() => {
    if (activeQuote) {
        getQuoteDetailsDispatch(activeQuote)
    }
    else if(quoteNumber){
      getQuoteDetailsDispatch(quoteNumber)
    }
    else if(motorQuoteId){
      getQuoteDetailsDispatch(motorQuoteId)
    }
  }, [activeQuote, quoteNumber])

  useEffect(() => {
    if (didMount.current && getQuoteDetailsStatus === 'success') {
      const personalInfo = getQuoteDetails &&
        getQuoteDetails.personalDetails
        ? getQuoteDetails.personalDetails
        : {}
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
    const checkAmlConditions = NICValue
      ? (postPersonalInfoStatus && postAMLStatus === 'success') &&
      !checkResFailed(postPersonalInfoData)
      : postPersonalInfoStatus && !checkResFailed(postPersonalInfoData)
    if (checkAmlConditions) {
      toast.success('Personal informations have been saved!', { duration: 3000 })
      clearPostPersonalInfoDispatch()
      const QuoteId = postPersonalInfoData.split('-')
      setSessionStorage(MOTOR_FORM.QUOTE_NUMBER, QuoteId[1])
      getQuoteDetailsDispatch(motorQuoteId)
      !summaryPage && next()
    } else if (postPersonalInfoStatus === 'error' || checkResFailed(postPersonalInfoData)) {
      toast.error(removeErrString(postPersonalInfoData), { duration: 4000 })
      clearPostPersonalInfoDispatch()
    } else if (!postPersonalInfoStatus === 'error' && NICValue && postAMLStatus === 'error') {
      toast.error(`${postAMLData}`, { duration: 4000 })
      clearPostAMLDispatch()
      clearPostPersonalInfoDispatch()
    }
  }, [postPersonalInfoStatus, postAMLStatus])

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
        show={summaryPage}
        yes={() => (null)}
        no={() =>
          <CustomBackdrop isLoading={getQuoteDetailsLoading || getAmlValidLoading} />}
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
              <ShowField
                show={authRole === 'customer' || summaryPage}
                yes={() => (null)}
                no={() =>
                  <>
                    <Grid item xs={12} md={summaryPage ? 12 : 6}>
                      <Mradio
                        xs={12}
                        md={8}
                        name='INDCOR'
                        label='Type of Quotation'
                        control={control}
                        setValue={setValue}
                        grantedUsers={GRANTED_USERS.AGENT}
                        userType={authRole}
                      />
                    </Grid>
                    <Grid item xs={12} md={summaryPage ? 12 : 6}>
                      <ClientsModals
                        disabled={clientValue}
                        showRecordFound={showRecordFound}
                        open={open}
                        searched={searched}
                        cancelSearch={cancelSearch}
                        handleClickOpen={handleClickOpen}
                        handleClose={handleClose}
                        handleCloseModal={handleCloseModal}
                        requestSearch={requestSearch}
                      />
                    </Grid>
                  </>}
              />
            </Grid>
          </Grid>
          <Grid item md={summaryPage ? 12 : 6}>
            <Grid container spacing={summaryPage ? 1 : 2}>
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
                name='NEWCLN'
                label='New Client'
                control={control}
                setValue={setValue}
                grantedUsers={GRANTED_USERS.AGENT_BROKER}
                userType={authRole}
              />

              <Mtextbox
                xs={12}
                name='NICNO'
                label='NIC Number'
                control={control}
                onKeyPress={e => {
                  preventIfNotAlphaNumric(e)
                }}
                setUpperCaseSeparator
                maxLength={14}
                grantedUsers={GRANTED_USERS.AGENT}
                userType={authRole}
                clearErrors={clearErrors}
                pattern={REGEX.ALPHA_NUMERIC_THIRTEEN_CHARS}
                readOnly={checkdisabledConditions('NICNO')}
                onBlur={e => {
                  handleLeadingZeroWhiteSpace(
                    e,
                    'NICNO',
                    setValue,
                    REGEX.ALPHA_NUMERIC_THIRTEEN_CHARS,
                    setError,
                    ERROR.NIC_INVALID
                  )
                }}
              />
              <Mselect
                reset={reset}
                xs={summaryPage ? 5 : 4}
                md={summaryPage ? 4 : 3}
                name='TITLE'
                label='Title'
                control={control}
                grantedUsers={GRANTED_USERS.AGENT}
                readOnly={checkdisabledConditions('TITLE')}
                userType={authRole}
                options={titleData && titleData}
                optionsLabel='TITLE'
                optionsValue='TITLE'
                req
              />
              <Mtextbox
                xs={summaryPage ? 7 : 8}
                md={summaryPage ? 8 : 9}
                name='FIRSTNAME'
                label='First Name'
                maxLength={130}
                control={control}
                grantedUsers={GRANTED_USERS.AGENT}
                userType={authRole}
                req
                clearErrors={clearErrors}
                readOnly={checkdisabledConditions('FIRSTNAME')}
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
                grantedUsers={GRANTED_USERS.AGENT}
                userType={authRole}
                req
                clearErrors={clearErrors}
                maxLength={130}
                onKeyPress={e => {
                  preventIfNotAlphaChars(e)
                }}
                readOnly={checkdisabledConditions('LASTNAME')}
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
                grantedUsers={GRANTED_USERS.AGENT}
                readOnly={checkdisabledConditions('DTBIRTH')}
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
                grantedUsers={GRANTED_USERS.AGENT}
                userType={authRole}
                readOnly={checkdisabledConditions('OCCUPATION')}
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
                      grantedUsers={GRANTED_USERS.AGENT}
                      userType={authRole}
                      pattern={REGEX.ALPHA_CHARS_SPACE}
                      readOnly={checkdisabledConditions('OTHOCCUPATION')}
                      clearErrors={clearErrors}
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
                setValue={setValue}
                grantedUsers={GRANTED_USERS.AGENT}
                userType={authRole}
              />
              <Mdatepicker
                xs={12}
                md={5}
                name='YEARLIC'
                label='Year of Licence'
                format='YYYY'
                views={['year']}
                placeholder={DATE.YEAR_ONLY}
                minDate={moment().subtract(25, 'years')}
                maxDate={new date()}
                control={control}
                readOnly={checkdisabledConditions('YEARLIC')}
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
                grantedUsers={GRANTED_USERS.AGENT}
                userType={authRole}
                maxLength={1}
                readOnly={checkdisabledConditions('TOTNOCLMS')}
                onKeyPress={e => {
                  preventIfNotNumber(e)
                }}
                control={control}
              />
            </Grid>
          </Grid>
          <Grid item md={summaryPage ? 12 : 6}>
            <Grid container spacing={summaryPage ? 1 : 2}>
                  <Grid item xs={12}>
                    <h4 className='form-title-md'>Contact Details</h4>
                  </Grid>
              <Mtextbox
                xs={12}
                name='MOB'
                label='Mobile Phone'
                control={control}
                grantedUsers={GRANTED_USERS.AGENT_CUSTOMER}
                userType={authRole}
                onKeyPress={e => {
                  preventIfNotNumericSpace(e)
                }}
                readOnly={checkdisabledConditions('MOB')}
                setPhNumberSeparator
                separatorRegex={REGEX.PHONE_SEPERATOR}
                clearErrors={clearErrors}
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
                onKeyPress={e => {
                  preventIfNotNumericSpace(e)
                }}
                readOnly={checkdisabledConditions('PH')}
                clearErrors={clearErrors}
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
                readOnly={checkdisabledConditions('EML')}
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
                grantedUsers={GRANTED_USERS.AGENT_CUSTOMER}
                userType={authRole}
                req
                readOnly={checkdisabledConditions('RESIADD')}
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
                clearErrors={clearErrors}
              />
              <Mtextarea
                xs={12}
                name='RMRKS'
                label='Remarks (max 155  chars)'
                maxLength={155}
                readOnly={checkdisabledConditions('RMRKS')}
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
                grantedUsers={GRANTED_USERS.AGENT_CUSTOMER}
                userType={authRole}
                control={control}
                clearErrors={clearErrors}
              />

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
              {postPersonalInfoLoading || postAMLLoading
                ? (
                  <CircularProgress size={18} style={{ color: '#ffffff' }} />
                  )
                : (
                    summaryPage ? 'Submit' : 'Next'
                  )}
            </Button>
          </Grid>
        </Grid>
        <ValidateNotify
          show={errorPop} errors={message} clear={setErrorPop}
        />
      </form>
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
    postAMLLoading: MotorQuotation?.postAMLLoading,
    postAMLData: MotorQuotation?.postAMLData,
    postAMLStatus: MotorQuotation?.postAMLStatus,
    postAMLmessage: MotorQuotation?.postAMLmessage,
    getAmlValidLoading: MotorQuotation?.getAmlValidLoading,
    AmlValidData: MotorQuotation?.AmlValidData,
    AmlValidStatus: MotorQuotation?.AmlValidStatus,
    AmlValidMessage: MotorQuotation?.AmlValidMessage
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
  postAMLDispatch: formData => dispatch(MotorQuotationAction.PostAMLAction(formData)),
  clearPostAMLDispatch: () => dispatch(MotorQuotationAction.ClearPostAMLAction()),
  getAMLRequestDispatch: id => dispatch(MotorQuotationAction.getAMLRequest(id)),
  clearAMLRequestDispatch: () => dispatch(MotorQuotationAction.getAMLClear())
})

export default connect(mapStateToProps, mapDispatchToProps)(FormPersonalDetails)

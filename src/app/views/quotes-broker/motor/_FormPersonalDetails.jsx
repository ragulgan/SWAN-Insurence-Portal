import React, { Fragment, useRef, useEffect, useState } from 'react'
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
  handleSetError,
  checkResFailed,
  preventIfNotAlphaNumric,
  handleLeadingZeroWhiteSpace,
  getSessionStorage,
  getLocalStorage,
  removeErrString,
  setSessionStorage,
  handleTrimWhiteSpace,
  removeSingleZero
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

const userLogin = getLocalStorage('logged_user')
const userAgency = getLocalStorage('logged_agency')
const fetchDefaults = (role, loggedCompany) => {
  const brokerDefault = {
    INDCOR: '',
    QUOTNUM: '',
    NEWCLN: true,
    CLIENTNUM: '',
    NICNO: '',
    DTBIRTH: null,
    OCCUPATION: '',
    OTHOCCUPATION: '',
    STAFFIND: '',
    YEARLIC: moment(),
    TOTNOCLMS: '0',
    USERLOGIN: userLogin,
    AGENCIES: userAgency,
    COMPANY: '',
    QUOTREQ: 'Sales Person 1',
    RESIADD: '',
    TITLE: '',
    FIRSTNAME: '',
    LASTNAME: '',
    ZONE: 'B',
    CLMYR1: moment().subtract(2, 'years').format('YYYY'),
    CLMYR2: moment().subtract(1, 'years').format('YYYY'),
    CLMYR3: moment().format('YYYY'),
    NOCLMYR1: '0',
    NOCLMYR2: '0',
    NOCLMYR3: '0',
    CONVICIND: false,
    LICSUSIND: false,
    PROSECIND: false,
    LEARNER: true,
    REFINSIND: false,
    HEALTHDTL: '',
    OTHDRVDTL: '',
    RMRKS: ''
  }

  if (role === 'broker') {
    return brokerDefault
  }
}

const FormPersonalDetails = props => {
  const { authRole, loggedUser, loggedAgency, loggedCompany } = useSelector(
    ({ Auth, Quotation }) => ({
      authRole: Auth.authRole,
      loggedUser: Quotation.loggedUser,
      loggedAgency: Quotation.loggedAgency,
      loggedCompany: Quotation.loggedCompany
    }),
    shallowEqual
  )

  const didMount = useRef(false)
  const {
    activeQuote, // From local storage
    quoteNumber,  // From url query params
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
    getAMLRequestDispatch,
    clearAMLRequestDispatch,
    getAmlValidLoading,
    AmlValidData,
    AmlValidMessage,
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
    defaultValues: fetchDefaults(authRole, 'asluximon@', '62', 'SG')
  })

  const motorQuoteNumber = getSessionStorage(MOTOR_FORM.QUOTE_NUMBER)
  const classes = useStyles()
  const [errorPop, setErrorPop] = useState(false)
  const [isDisable, setIsDisable] = useState(false)
  const [dobminDate, setDobminDate] = useState(moment().subtract(25, 'years'))
  const [showModal, setShowModal] = useState(false)
  const [showCusModal, setShowCusModal] = useState(false)
  const [nicMsg, setNicmsg] = useState('')
  const [open, setOpen] = useState(false)
  const [typingTimeout, setTypingTimeout] = useState(0)
  const [showRecordFound, setShowRecordFound] = useState(false)
  const [searched, setSearched] = useState('')

  const [alert, setAlert] = useState({
    open: false,
    type: 'success',
    msg: ''
  })
  const [state, setState] = useState({
    personalData: {},
    proposal: {},
    editMode: false,
    disabledFields: {}
  })
  const { errors, isValid } = formState
  const [message, setMessage] = useState('')
  const summaryPage = fromPage === 'summary'
  const clientValue = getValues('NEWCLN')
  const totalClaimValue = getValues('TOTNOCLMS')
  const learnerValue = getValues('LEARNER')
  const occupationValue = getValues('OCCUPATION')
  const clientWatcher = watch('NEWCLN')
  const learnerWatch = watch('LEARNER')
  const refusedWatcher = watch('REFINSIND')
  const dobWatcher = watch('DTBIRTH')
  const dobValues = getValues('DTBIRTH')
  const YearWatcher = watch('YEARLIC')
  const YearValues = getValues('YEARLIC')
  watch('OCCUPATION')
  watch('TOTNOCLMS')
  const NICWatcher = watch('NICNO')
  const NICValue = getValues('NICNO')
  watch('YEARLIC')
  const onSubmit = formData => {
    const totalSumClaim =
      +formData?.NOCLMYR1 + +formData?.NOCLMYR2 + +formData?.NOCLMYR3
        ? +formData?.NOCLMYR1 + +formData?.NOCLMYR2 + +formData?.NOCLMYR3
        : '0'
    const checkSumofClaim = formData?.TOTNOCLMS !== 0 ? formData?.TOTNOCLMS : '0'
    const errorGreater = 'Total Number of Claims Should be less than or equals to 5'
    const totalclaimError = 'Total Number of Claims does not match with the ones specified during the past 3 years'
    if (totalSumClaim?.toString() !== checkSumofClaim?.toString() || checkSumofClaim?.toString() > 5) {
      setMessage(checkSumofClaim?.toString() > 5 ? errorGreater : totalclaimError)
      setErrorPop(true)
      setError('TOTNOCLMS', { type: 'error' }, { shouldFocus: true, message: '' })
      setError('NOCLMYR1', { type: 'error' }, { shouldFocus: true, message: '' })
      setError('NOCLMYR2', { type: 'error' }, { shouldFocus: true, message: '' })
      setError('NOCLMYR3', { type: 'error' }, { shouldFocus: true, message: '' })
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
        NEWCLN: formData.NEWCLN === true ? 'Y' : 'N',
        REFINSIND: formData.REFINSIND === true ? 'Y' : 'N',
        PROSECIND: formData.PROSECIND === true ? 'Y' : 'N',
        CONVICIND: formData.CONVICIND === true ? 'Y' : 'N',
        LICSUSIND: formData.LICSUSIND === true ? 'Y' : 'N',
        LEARNER: formData.LEARNER === true ? 'Y' : 'N',
        YEARLIC: formData.YEARLIC && formData.YEARLIC ? moment(formData.YEARLIC).format('YYYY') : moment().format('YYYY'),
        DTBIRTH: formData.DTBIRTH && formData.DTBIRTH ? moment(formData.DTBIRTH).format('DD/MM/YYYY') : '',
        TOTNOCLMS: formData?.TOTNOCLMS ? formData?.TOTNOCLMS : '0',
        CLMYR1: moment(formData?.CLMYR1).format('YYYY'),
        CLMYR2: moment(formData?.CLMYR2).format('YYYY'),
        CLMYR3: formData?.CLMYR3 ? moment(formData?.CLMYR3).format('YYYY') : '',
        NOCLMYR1:
          formData?.NOCLMYR1 !== ''
            ? formData?.NOCLMYR1?.toString()
            : '0',
        NOCLMYR2:
          formData?.NOCLMYR2 !== ''
            ? formData?.NOCLMYR2?.toString()
            : '0',
        NOCLMYR3:
          formData?.NOCLMYR3 !== ''
            ? formData?.NOCLMYR3?.toString()
            : '0',
        DTLACCDNTS: formData?.DTLACCDNTS
      }
      postPersonalInfoDispatch(payload)
      saveFormDispatch(formData)
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
    // const getNumber = item.Telephone ?
    // splitPhoneNuber(item.Telephone && item.Telephone) : ''
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
        EML: !!item.EMAIL,
        RESIADD: !!item.RESADDR1,
        MOB: !!item.TELNO
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
      REFINSIND: item.REFINSIND === 'Y',
      PROSECIND: item.PROSECIND === 'Y',
      CONVICIND: item.CONVICIND === 'Y',
      LICSUSIND: item.LICSUSIND === 'Y',
      LEARNER: item.LEARNER === 'Y',
      HEALTHDTL: item?.HEALTHDTL,
      OTHDRVDTL: item?.OTHDRVDTL,
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
      AGENCIES: item.AGENCIES,
      USERLOGIN: item.USERLOGIN,
      QUOTREQ: item.QUOTREQ,
      QUOTNUM: item.QUOTNUM,
      NOCLMYR1: item.NOCLMYR1 !== '0' ? item.NOCLMYR1?.toString() : '0',
      NOCLMYR2: item.NOCLMYR2 !== '0' ? item.NOCLMYR2?.toString() : '0',
      NOCLMYR3: item.NOCLMYR3 !== '0' ? item.NOCLMYR3?.toString() : '0',
      CLMYR1: item.CLMYR1 ? item.CLMYR1 : moment().subtract(2, 'years').format('YYYY'),
      CLMYR2: item.CLMYR2 ? item.CLMYR2 : moment().subtract(1, 'years').format('YYYY'),
      CLMYR3: item.CLMYR3 ? item.CLMYR3 : moment().format('YYYY'),
      DTLACCDNTS: item?.DTLACCDNTS,
      RMRKS: item?.RMRKS
    }))
  }
  const getMotorQuoteDetails = (id) => {
    const getDetailsBtn = document.getElementById(id)
    getDetailsBtn && getDetailsBtn.click()
  }

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
      setValue('YEARLIC', new Date(), { shouldValidate: true })
    }
  }, [learnerWatch])

  useEffect(() => {
    if (_.size(errors) !== 0) {
      setAlert(alert => ({
        ...alert,
        open: true,
        type: 'error',
        msg: 'Please fill in required information to proceed'
      }))
    } else if (_.size(errors) === 0) {
      setAlert(alert => ({
        ...alert,
        open: false,
        type: 'error',
        msg: ''
      }))
    }
  }, [errors])

  useEffect(() => {
    const checkAmlConditions = NICValue
      ? (postPersonalInfoStatus && postAMLStatus === 'success') &&
      !checkResFailed(postPersonalInfoData)
      : postPersonalInfoStatus && !checkResFailed(postPersonalInfoData)
    if (checkAmlConditions) {
      toast.success('Personal informations have been saved!', { duration: 3000 })
      clearPostPersonalInfoDispatch()
      //getQuoteDetailsDispatch(motorQuoteNo)
      const QuoteId = postPersonalInfoData.split('-')
      setSessionStorage(MOTOR_FORM.QUOTE_NUMBER, QuoteId[1])
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

  useEffect(() => {
    if (didMount.current && !clientValue && showModal) {
      handleClickOpen()
    }
    if (didMount.current && clientValue) {
      setShowModal(true)
    }
  }, [clientWatcher])

  useEffect(() => {
    if (didMount.current && getQuoteDetailsStatus === 'success') {
      const personalInfo = getQuoteDetails &&
        getQuoteDetails.personalDetails
        ? getQuoteDetails.personalDetails
        : {}
      const proposalsData =
        getQuoteDetails && getQuoteDetails?.proposals
          ? getQuoteDetails?.proposals
          : {}

      const payload = {
        ...personalInfo,
        ...proposalsData
      }
      if (payload) {
        setState(prevState => ({
          ...prevState,
          personalData: personalInfo,
          proposal: proposalsData,
          editMode: true
        }))
        resetTheValues(payload, reset)
      }
      ClearMotQuoteDetailsDispatch()
    }
  }, [getQuoteDetailsStatus])

 /*  useEffect(() => {
    const motorQuoteNo = getSessionStorage(MOTOR_FORM.QUOTE_NUMBER)
    if (currentQuoteNumber) {
      getMotorQuoteDetails('getDetail-btn')
    }
  }, [currentQuoteNumber]) */

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
    else if (motorQuoteNumber){
      getQuoteDetailsDispatch(motorQuoteNumber)
    }
  }, [activeQuote, quoteNumber, motorQuoteNumber])

  console.log("activeQuote", activeQuote)
  console.log("quoteNumber", activeQuote)


  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true
    }
  })

  useEffect(() => {
    if (didMount.current && dobValues) {
      const dt = moment(dobValues, 'DD/MM/yyyy').toDate()
      if (dt) { setDobminDate(moment(dt).add(18, 'years')) }
    }
  }, [dobWatcher])

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

  const checkdisabledConditions = (name) => {
    if (!clientValue && authRole !== 'customer' &&
      state.disabledFields[name] && !summaryPage) {
      return true
    }
    return false
  }

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
      {/* <button
        onClick={() => { getQuoteDetailsDispatch(currentQuoteNumber) }}
        className='d-none' id='getDetail-btn'
      /> */}
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
                        clearErrors={clearErrors}
                        setValue={setValue}
                        grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
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
                clearErrors={clearErrors}
                setValue={setValue}
                grantedUsers={GRANTED_USERS.AGENT_BROKER}
                userType={authRole}
              />
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
                label='NIC Number'
                control={control}
                clearErrors={clearErrors}
                onKeyPress={e => {
                  preventIfNotAlphaNumric(e)
                }}
                maxLength={14}
                setUpperCaseSeparator
                grantedUsers={GRANTED_USERS.AGENT_BROKER}
                userType={authRole}
                pottern={REGEX.ALPHA_NUMERIC_THIRTEEN_CHARS}
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
                clearErrors={clearErrors}
                grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
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
                clearErrors={clearErrors}
                grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                readOnly={checkdisabledConditions('FIRSTNAME')}
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
                readOnly={checkdisabledConditions('LASTNAME')}
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
                grantedUsers={GRANTED_USERS.BROKER}
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
                clearErrors={clearErrors}
                grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                readOnly={checkdisabledConditions('OCCUPATION')}
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
                      grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                      readOnly={checkdisabledConditions('OTHOCCUPATION')}
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
            </Grid>
          </Grid>
          <Grid item md={summaryPage ? 12 : 6}>
            <Grid container spacing={summaryPage ? 1 : 2}>
              <Grid item xs={12}>
                <h4 className='form-title-md'>Driver Details</h4>
              </Grid>

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
                label='Year of License'
                format='YYYY'
                views={['year']}
                minDate={moment().subtract(25, 'years')}
                maxDate={moment()}
                disabled={learnerValue === true}
                readOnly={checkdisabledConditions('YEARLIC')}
                control={control}
                clearErrors={clearErrors}
                grantedUsers={GRANTED_USERS.BROKER}
                userType={authRole}
                onKeyPress={e => {
                  preventIfNotNumber(e)
                }}
              />
              <Mtextbox
                xs={6}
                md={7}
                name='TOTNOCLMS'
                label='Total No. Of claims over past 3 years'
                grantedUsers={GRANTED_USERS.BROKER}
                userType={authRole}
                maxLength={1}
                onKeyPress={e => {
                  preventIfNotNumber(e)
                }}
                readOnly={checkdisabledConditions('TOTNOCLMS')}
                control={control}
                clearErrors={clearErrors}
                req
              />

              {authRole === 'broker' && totalClaimValue >= 1
                ? (
                  <>
                    <Grid item xs={12}>
                      <h4 className='form-title-md'>
                        No. of accidents/claims past 3 years
                      </h4>
                    </Grid>
                    <Mdatepicker
                      xs={12}
                      md={6}
                      name='CLMYR1'
                      label='Year (YYYY)'
                      format='YYYY'
                      views={['year']}
                      control={control}
                      clearErrors={clearErrors}
                      className={classes.alignTopBottom}
                      grantedUsers={GRANTED_USERS.BROKER}
                      readOnly={checkdisabledConditions('CLMYR1')}
                      userType={authRole}
                      placeholder={DATE.YEAR_ONLY}
                      minDate={moment().subtract(3, 'years')}
                      maxDate={moment().subtract(1, 'years')}
                      onKeyPress={e => {
                        preventIfNotNumber(e)
                      }}
                      req
                    />
                    <Mtextbox
                      xs={6}
                      name='NOCLMYR1'
                      label='Number of Claims'
                      control={control}
                      clearErrors={clearErrors}
                      maxDate={moment()}
                      grantedUsers={GRANTED_USERS.BROKER}
                      readOnly={checkdisabledConditions('NOCLMYR1')}
                      userType={authRole}
                      maxLength={5}
                      onKeyPress={e => {
                        preventIfNotNumber(e)
                      }}
                      req
                    />
                    <Mdatepicker
                      xs={12}
                      md={6}
                      name='CLMYR2'
                      label='Year (YYYY)'
                      format='YYYY'
                      views={['year']}
                      control={control}
                      clearErrors={clearErrors}
                      grantedUsers={GRANTED_USERS.BROKER}
                      userType={authRole}
                      readOnly={checkdisabledConditions('CLMYR2')}
                      placeholder={DATE.YEAR_ONLY}
                      minDate={moment().subtract(3, 'years')}
                      maxDate={moment().subtract(1, 'years')}
                      onKeyPress={e => {
                        preventIfNotNumber(e)
                      }}
                      req
                    />
                    <Mtextbox
                      xs={6}
                      name='NOCLMYR2'
                      label='Number of Claims'
                      control={control}
                      clearErrors={clearErrors}
                      grantedUsers={GRANTED_USERS.BROKER}
                      readOnly={checkdisabledConditions('NOCLMYR2')}
                      userType={authRole}
                      maxLength={1}
                      onKeyPress={e => {
                        preventIfNotNumber(e)
                      }}
                      req
                    />
                    <Mdatepicker
                      xs={12}
                      md={6}
                      name='CLMYR3'
                      label='Year (YYYY)'
                      format='YYYY'
                      views={['year']}
                      control={control}
                      clearErrors={clearErrors}
                      grantedUsers={GRANTED_USERS.BROKER}
                      userType={authRole}
                      placeholder={DATE.YEAR_ONLY}
                      minDate={moment().subtract(3, 'years')}
                      maxDate={moment()}
                      onKeyPress={e => {
                        preventIfNotNumber(e)
                      }}
                      req
                    />
                    <Mtextbox
                      xs={6}
                      name='NOCLMYR3'
                      label='Number of Claims'
                      control={control}
                      clearErrors={clearErrors}
                      grantedUsers={GRANTED_USERS.BROKER}
                      readOnly={checkdisabledConditions('NOCLMYR3')}
                      userType={authRole}
                      maxLength={5}
                      onKeyPress={e => {
                        preventIfNotNumber(e)
                      }}
                      req
                    />
                    <ShowField
                      show={authRole === 'broker'}
                      yes={() => (
                        <Grid item xs={12}>
                          <p>Total No. of claims: {totalClaimValue}</p>
                        </Grid>
                      )}
                      no={() => null}
                    />
                  </>
                )
                : null}
              <ShowField
                show={totalClaimValue >= 1}
                yes={() => (
                  <Mtextarea
                    xs={12}
                    name='DTLACCDNTS'
                    label='Please describe accidents/claims'
                    control={control}
                    clearErrors={clearErrors}
                    grantedUsers={GRANTED_USERS.BROKER}
                    userType={authRole}
                    req
                    readOnly={checkdisabledConditions('DTLACCDNTS')}
                    onBlur={e => {
                      handleTrimWhiteSpace(e, 'DTLACCDNTS', setValue)
                      removeSingleZero(e, 'DTLACCDNTS', setValue)
                      handleSetError(
                        e,
                        'DTLACCDNTS',
                        setError,
                        REGEX.ALPHA_NUMERIC_CHARS_SPACE,
                        ERROR.ALPHA_NUMERIC_SPACE
                      )
                    }}
                    maxLength={255}
                  />
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
                readOnly={checkdisabledConditions('HEALTHDTL')}
                pattern={REGEX.ALPHA_NUMERIC_CHARS_SPACE}
                maxLength={35}
                onBlur={e => {
                  handleTrimWhiteSpace(e, 'HEALTHDTL', setValue)
                  removeSingleZero(e, 'HEALTHDTL', setValue)
                  handleSetError(
                    e,
                    'HEALTHDTL',
                    setError,
                    REGEX.ALPHA_NUMERIC_CHARS_SPACE,
                    ERROR.ALPHA_NUMERIC_SPACE
                  )
                }}
              />
              <Mtextarea
                xs={12}
                name='OTHDRVDTL'
                label='Other Driver details (Age, Occupation, License Info, Driving Experience etc.)'
                control={control}
                clearErrors={clearErrors}
                grantedUsers={GRANTED_USERS.BROKER}
                userType={authRole}
                pattern={REGEX.ALPHA_NUMERIC_CHARS_SPACE}
                readOnly={checkdisabledConditions('OTHDRVDTL')}
                maxLength={250}
                onBlur={e => {
                  handleTrimWhiteSpace(e, 'OTHDRVDTL', setValue)
                  removeSingleZero(e, 'OTHDRVDTL', setValue)
                  handleSetError(
                    e,
                    'OTHDRVDTL',
                    setError,
                    REGEX.ALPHA_NUMERIC_CHARS_SPACE,
                    ERROR.ALPHA_NUMERIC_SPACE
                  )
                }}
              />
              <Mswitch
                xs={12}
                name='CONVICIND'
                label='Have you or any of the above drivers had any conviction in the past 5 years?'
                control={control}
                clearErrors={clearErrors}
                grantedUsers={GRANTED_USERS.BROKER}
                userType={authRole}
              />
              <Mswitch
                xs={12}
                name='PROSECIND'
                label='Have you or any of the above drivers had any prosecution pending for any offence in connection with a motor vehicle?'
                control={control}
                clearErrors={clearErrors}
                grantedUsers={GRANTED_USERS.BROKER}
                userType={authRole}
              />
              <Mswitch
                xs={12}
                name='LICSUSIND'
                label='Have you or any of the above drivers had their licence suspended?'
                control={control}
                clearErrors={clearErrors}
                grantedUsers={GRANTED_USERS.BROKER}
                userType={authRole}
              />
              <Mswitch
                xs={12}
                name='REFINSIND'
                label='Have you or any of the above drivers been refused insurance at normal rates or terms during the past 5 years?'
                control={control}
                clearErrors={clearErrors}
                grantedUsers={GRANTED_USERS.BROKER}
                userType={authRole}
              />
              {
                refusedWatcher
                  ? (
                    <Mtextarea
                      xs={12}
                      name='RMRKS'
                      control={control}
                      clearErrors={clearErrors}
                      label='Please Specify'
                      grantedUsers={GRANTED_USERS.BROKER}
                      userType={authRole}
                      pattern={REGEX.ALPHA_NUMERIC_CHARS_SPACE}
                      readOnly={checkdisabledConditions('RMRKS')}
                      onBlur={e => {
                        handleTrimWhiteSpace(e, 'RMRKS', setValue)
                        removeSingleZero(e, 'RMRKS', setValue)
                        handleSetError(
                          e,
                          'RMRKS',
                          setError,
                          REGEX.ALPHA_NUMERIC_CHARS_SPACE,
                          ERROR.ALPHA_NUMERIC_SPACE
                        )
                      }}
                    />
                  )
                  : null
              }

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
                  summaryPage ? 'Submit' : 'Next'
                )}
            </Button>
          </Grid>
        </Grid>
        <ValidateNotify show={errorPop} errors={message} clear={setErrorPop} />
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
    getAmlValidLoading: MotorQuotation?.getAmlValidLoading,
    AmlValidData: MotorQuotation?.AmlValidData,
    AmlValidStatus: MotorQuotation?.AmlValidStatus,
    AmlValidMessage: MotorQuotation?.AmlValidMessage,
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
  clearPostAMLDispatch: () => dispatch(MotorQuotationAction.ClearPostAMLAction())
})

export default connect(mapStateToProps, mapDispatchToProps)(FormPersonalDetails)

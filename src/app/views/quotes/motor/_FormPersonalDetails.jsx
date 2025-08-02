import React, { useEffect, useState, useRef } from 'react'
import { connect, shallowEqual, useSelector } from 'react-redux'
import {
  Grid,
  Radio,
  FormControlLabel,
  CircularProgress,
  Button
} from '@material-ui/core'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'

import moment from 'moment'
import _ from 'lodash'
import ClientsModals from '../../../../app/modals/ClientsModal'
import Mradio from '../../../../app/form-controls/Mradio'
import Mtextbox from '../../../../app/form-controls/Mtextbox'
import Mselect from '../../../../app/form-controls/Mselect'
import Mswitch from '../../../../app/form-controls/Mswitch'
import Mtextarea from '../../../../app/form-controls/Mtextarea'
import Mdatepicker from '../../../../app/form-controls/Mdatepicker'
import ValidateNotify from '../../../../app/widgets/ValidateNotify'
import CustomBackdrop from '../../../../app/backdrop/CustomBackdrop'
import AlertBox from '../../../../app/widgets/AlertBox'
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
  getLocalStorage,
  removeErrString,
  setLocalStorage,
  setSessionStorage
} from '../../../../helpers/helper'
import { REGEX, MOTOR_FORM, GRANTED_USERS } from '../../../../helpers/constants'
import { ERROR } from '../../../../helpers/messages'
import { ShowField } from '../../../../app/uiComponents'

const loggedUser = getLocalStorage('logged_user')
const fetchDefaults = (role) => {
  const customerDefault = {
    TITLE: '',
    FIRSTNAME: '',
    LASTNAME: '',
    DTBIRTH: '',
    OCCUPATION: '',
    OCCUPATION: '',
    OTHOCCUPATION: '',
    YEARLIC: '',
    TOTNOCLMS: 0,
    MOB: '',
    PH: '',
    EML: '',
    RESIADD: ''
  }
  const brokerDefault = {
    NEWCLN: true,
    CLIENTNUM: '',
    NICNO: '',
    TITLE: '',
    FIRSTNAME: '',
    LASTNAME: '',
    DTBIRTH: '',
    OCCUPATION: '',
    LEARNER: '',
    YEARLIC: '',
    TOTNOCLMS: 0,
    RMRKS: '',
    conviction: '',
    prosecution: '',
    suspended: '',
    refused: false,
    specify: '',
    MOB: '',
    PH: '',
    EML: '',
    STAFFIND: ''
  }

  const agentDefault = {
    AGENCIES: '01',
    USERLOGIN: 'PSPETER',
    QUOTREQ: 'Sales Person 1',
    ZONE: '',
    INDCOR: '',
    QUOTNUM: '',
    NEWCLN: true,
    COMPANY: '', // If individual then empty, if corporate the "Y"
    CLIENTNUM: '',
    NICNO: '',
    TITLE: '',
    FIRSTNAME: '',
    LASTNAME: '',
    DTBIRTH: '',
    OCCUPATION: '',
    OTHOCCUPATION: '',
    LEARNER: true,
    YEARLIC: '',
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

  if (role === 'customer') {
    return customerDefault
  } else if (role === 'broker') {
    return brokerDefault
  } else if (role === 'agent') {
    return agentDefault
  }
}
// Suresh

const FormPersonalDetails = props => {
  const { authRole } = useSelector(
    ({ Auth }) => ({
      authRole: Auth.authRole
    }),
    shallowEqual
  )
  const didMount = useRef(false)
  const {
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
    postPersonalInfomessage,
    postPersonalInfoData,
    saveFormDispatch,
    currentQuoteNumber,
    ClearMotQuoteDetailsDispatch
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
    defaultValues: fetchDefaults(authRole) // Suresh
  })
  const [errorPop, setErrorPop] = useState(false)
  const [showModal, setShowModal] = useState(false)
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
    personalData: {}
  })
  const { errors } = formState
  const summaryPage = fromPage === 'summary'
  const clientValue = getValues('NEWCLN')
  const claimValue = getValues('TOTNOCLMS')
  const learnerValue = getValues('LEARNER')
  const occupationValue = getValues('OCCUPATION')
  const clientWatcher = watch('NEWCLN')
  const refusedWatcher = watch('refused')
  const learnerWatch = watch('LEARNER')
  watch('OCCUPATION')
  watch('TOTNOCLMS')
  const onSubmit = formData => {
    if (authRole === 'customer') {
      // personalDetailsDispatch(formData)
    } else if (authRole === 'agent') {
      const payload = {
        ...formData,
        NEWCLN: formData.NEWCLN ? 'Y' : 'N',
        LEARNER: formData.LEARNER ? 'Y' : 'N',
        YEARLIC: formData.YEARLIC && formData.YEARLIC
          ? formData.YEARLIC.format('YYYY')
          : '2022',
        DTBIRTH: formData.DTBIRTH && formData.DTBIRTH
          ? moment(formData.DTBIRTH).format('DD/MM/YYYY')
          : ''
      }
      postPersonalInfoDispatch(payload)
      saveFormDispatch(payload)
    } else if (authRole === 'broker') {
      const payload = {
        ...formData,
        NEWCLN: formData.NEWCLN ? 'Y' : 'N',
        LEARNER: formData.LEARNER ? 'Y' : 'N',
        YEARLIC: formData.YEARLIC ? formData.YEARLIC.format('YYYY') : '2022',
        DTBIRTH: formData.DTBIRTH ? formData.DTBIRTH.format('DD/MM/YYYY') : ''
      }
      postPersonalInfoDispatch(payload)
      saveFormDispatch(payload)
    }
    // Suresh
  }

  const handleClickOpen = () => {
    setOpen(true)
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
      DTBIRTH: moment(item.DTBIRTH),
      OCCUPATION: item.OCCUPATION,
      EML: item.EMAIL,
      RESIADD: item.RESADDR1,
      MOB: item.TELNO
    }
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
  const getMotorQuoteDetails = (id) => {
    const getDetailsBtn = document.getElementById(id)
    getDetailsBtn && getDetailsBtn.click()
  }

  useEffect(() => {
    if (_.size(errors)) {
      setErrorPop(true)
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
          // ...authRole === 'agent' ? agentDefault : brokerDefault
        }))
      }
    }
  }, [clientWatcher])

  useEffect(() => {
    if (didMount.current && learnerValue) {
      setValue('YEARLIC', new Date(), { shouldValidate: true })
    }
  }, [learnerWatch])

  useEffect(() => {
    if (_.size(errors)) {
      setErrorPop(true)
    }
  }, [errors])

  useEffect(() => {
    if (postPersonalInfoStatus === 'success' && !checkResFailed(postPersonalInfoData)) {
      toast.success('Personal informations have been saved!', { duration: 3000 })
      clearPostPersonalInfoDispatch()
      const QuoteId = postPersonalInfoData.split('-')
      setSessionStorage(MOTOR_FORM.QUOTE_NUMBER, QuoteId[1])
      !summaryPage && next()
    } else if (postPersonalInfoStatus === 'error' || checkResFailed(postPersonalInfoData)) {
      toast.error(removeErrString(postPersonalInfoData), { duration: 4000 })
      clearPostPersonalInfoDispatch()
    }
  }, [postPersonalInfoStatus])

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
      if (personalInfo) {
        resetTheValues(personalInfo, reset)
        setState(prevState => ({
          ...prevState,
          personalData: personalInfo
        }))
      }
      const Name = getQuoteDetails.personalDetails.FIRSTNAME &&
            getQuoteDetails.personalDetails.LASTNAME
        ? `${getQuoteDetails.personalDetails.FIRSTNAME}   
      ${getQuoteDetails.personalDetails.LASTNAME}`
        : ''
      setLocalStorage(MOTOR_FORM.NAME, Name)
      ClearMotQuoteDetailsDispatch()
    }
  }, [getQuoteDetailsStatus])

  useEffect(() => {
    const motorQuoteNo = getSessionStorage(MOTOR_FORM.QUOTE_NUMBER)
    if (currentQuoteNumber) {
      getMotorQuoteDetails('getDetail-btn')
    }
  }, [currentQuoteNumber])

  useEffect(() => {
    const motorQuoteNo = getSessionStorage(MOTOR_FORM.QUOTE_NUMBER)
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

  return (
    <>
      <ShowField
        show={summaryPage}
        yes={() => (null)}
        no={() =>
          <CustomBackdrop isLoading={getQuoteDetailsLoading} />}
      />
      <button
        onClick={() => { getQuoteDetailsDispatch(currentQuoteNumber) }}
        className='d-none' id='getDetail-btn'
      />
      <form onSubmit={handleSubmit(onSubmit)}>
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
                  name='INDCOR'
                  label='Type of Quotation'
                  control={control}
                  setValue={setValue}
                  grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
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
              <Mswitch
                xs={12}
                name='SWAN_ACC'
                label='Do you have a mySwan app account?'
                control={control}
                grantedUsers={GRANTED_USERS.CUSTOMER}
                userType={authRole}
              />
              {/* <ShowField
                show={!clientValue}
                yes={() => (
                  <Mtextbox
                    xs={12}
                    name="CLIENTNUM"
                    label="Client Number"
                    control={control}
                    grantedUsers={GRANTED_USERS.AGENT_BROKER}
                    userType={authRole}
                  />
                )}
                no={() => null}
              /> */}
              <Mtextbox
                xs={12}
                name='NICNO'
                label='NIC Number'
                control={control}
                onKeyPress={e => {
                  preventIfNotAlphaNumric(e)
                }}
                maxLength={14}
                grantedUsers={GRANTED_USERS.AGENT_BROKER}
                userType={authRole}
                clearErrors={clearErrors}
                onBlur={e => {
                  handleSetError(
                    e,
                    'NICNO',
                    setError,
                    REGEX.ALPHA_NUMERIC_THIRTEEN_CHARS,
                    ERROR.NIC_INVALID
                  )
                }}
              />
              <Mtextbox
                xs={12}
                name='NICNO'
                label='National Identity Card No.'
                control={control}
                onKeyPress={e => {
                  preventIfNotAlphaNumric(e)
                }}
                maxLength={14}
                grantedUsers={GRANTED_USERS.CUSTOMER}
                userType={authRole}
                clearErrors={clearErrors}
                onBlur={e => {
                  handleSetError(
                    e,
                    'NICNO',
                    setError,
                    REGEX.ALPHA_NUMERIC_THIRTEEN_CHARS,
                    ERROR.NIC_INVALID
                  )
                }}
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
                req
              />
              <Mtextbox
                xs={summaryPage ? 7 : 8}
                md={summaryPage ? 8 : 9}
                name='FIRSTNAME'
                maxLength={130}
                label='First Name'
                control={control}
                grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                userType={authRole}
                req
              />
              <Mtextbox
                xs={12}
                md={6}
                name='LASTNAME'
                label='Last Name'
                maxLength={130}
                control={control}
                grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                userType={authRole}
                req
              />
              <Mdatepicker
                xs={12}
                md={6}
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
              <Mselect
                xs={12}
                name='OCCUPATION'
                label='Occupation'
                control={control}
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
                      grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                      userType={authRole}
                      maxLength={70}
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
                grantedUsers={GRANTED_USERS.AGENT_CUSTOMER}
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
                grantedUsers={GRANTED_USERS.AGENT_CUSTOMER}
                userType={authRole}
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
                maxLength={5}
                onKeyPress={e => {
                  preventIfNotNumber(e)
                }}
                control={control}
              />
            </Grid>
          </Grid>
          <Grid item md={summaryPage ? 12 : 6}>
            <Grid container spacing={summaryPage ? 1 : 2}>
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
                grantedUsers={GRANTED_USERS.AGENT_CUSTOMER}
                userType={authRole}
                onKeyPress={e => {
                  preventIfNotNumber(e)
                }}
                clearErrors={clearErrors}
                onBlur={e => {
                  handleSetError(
                    e,
                    'MOB',
                    setError,
                    REGEX.PHONE_NUMBER_8,
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
                  preventIfNotNumber(e)
                }}
                clearErrors={clearErrors}
                onBlur={e => {
                  handleSetError(
                    e,
                    'PH',
                    setError,
                    REGEX.PHONE_NUMBER_8,
                    ERROR.HOME_PHONE_INVALID
                  )
                }}
                maxLength={10}
              />
              <Mtextbox
                xs={12}
                name='EML'
                label='Email Address'
                grantedUsers={GRANTED_USERS.AGENT_CUSTOMER}
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
              <Mtextarea
                xs={12}
                name='RESIADD'
                label='Residential Address'
                control={control}
                grantedUsers={GRANTED_USERS.AGENT_CUSTOMER}
                userType={authRole}
                req
              />
              <Mtextarea
                xs={12}
                name='RMRKS'
                label='Remarks (max 600 chars)'
                grantedUsers={GRANTED_USERS.AGENT_CUSTOMER}
                userType={authRole}
                control={control}
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
                      grantedUsers={GRANTED_USERS.BROKER}
                      userType={authRole}
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
                      maxDate={moment()}
                      grantedUsers={GRANTED_USERS.BROKER}
                      userType={authRole}
                    />
                    <Mtextbox
                      xs={6}
                      name='number_of_clims_1'
                      label='Number of Claims'
                      control={control}
                      maxDate={moment()}
                      grantedUsers={GRANTED_USERS.BROKER}
                      userType={authRole}
                    />
                    <Mdatepicker
                      xs={6}
                      name='year_2'
                      label='Year (YYYY)'
                      control={control}
                      maxDate={moment()}
                      grantedUsers={GRANTED_USERS.BROKER}
                      userType={authRole}
                    />
                    <Mtextbox
                      xs={6}
                      name='number_of_clims_2'
                      label='Number of Claims'
                      control={control}
                      grantedUsers={GRANTED_USERS.BROKER}
                      userType={authRole}
                    />
                    <Mdatepicker
                      xs={6}
                      name='year_3'
                      label='Year (YYYY)'
                      control={control}
                      maxDate={moment()}
                      grantedUsers={GRANTED_USERS.BROKER}
                      userType={authRole}
                    />
                    <Mtextbox
                      xs={6}
                      name='number_of_clims_3'
                      label='Number of Claims'
                      control={control}
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
                name='health_problem'
                label='Please specify any health problem, if any, that may impair your driving ability'
                control={control}
                grantedUsers={GRANTED_USERS.BROKER}
                userType={authRole}
              />
              <Mtextarea
                xs={12}
                name='other_details'
                label='Other Driver details (Age, Occupation, License Info, Driving Experience etc.)'
                control={control}
                grantedUsers={GRANTED_USERS.BROKER}
                userType={authRole}
              />
              <Mswitch
                xs={12}
                name='conviction'
                label='Have you or any of the above drivers had any conviction in the past 5 years?'
                control={control}
                setValue={setValue}
                grantedUsers={GRANTED_USERS.BROKER}
                userType={authRole}
              />
              <Mswitch
                xs={12}
                name='prosecution'
                label='Have you or any of the above drivers had any prosecution pending for any offence in connection with a motor vehicle?'
                control={control}
                setValue={setValue}
                grantedUsers={GRANTED_USERS.BROKER}
                userType={authRole}
              />
              <Mswitch
                xs={12}
                name='suspended'
                label='Have you or any of the above drivers had their licence suspended?'
                control={control}
                setValue={setValue}
                grantedUsers={GRANTED_USERS.BROKER}
                userType={authRole}
              />
              <Mswitch
                xs={12}
                name='refused'
                label='Have you or any of the above drivers been refused insurance at normal rates or terms during the past 5 years?'
                control={control}
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
                    grantedUsers={GRANTED_USERS.BROKER}
                    userType={authRole}
                  />
                  )
                : null}

            </Grid>
          </Grid>
          <Grid item md={12} sm={12} className='txt-right'>
            <Button variant='contained' color='primary' type='submit'>
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
        <AlertBox open={alert.open} type={alert.type} msg={alert.msg} />
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
    currentQuoteNumber: MotorQuotation?.currentQuoteNumber
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
  clearClientDispatch: () => dispatch(ClientActions.ClearClient())
})

export default connect(mapStateToProps, mapDispatchToProps)(FormPersonalDetails)

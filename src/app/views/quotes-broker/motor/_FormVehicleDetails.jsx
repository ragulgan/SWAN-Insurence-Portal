import React, { Fragment, useEffect, useState, useRef } from 'react'
import _ from 'lodash'
import moment from 'moment'
import { connect, shallowEqual, useSelector } from 'react-redux'
import { Grid, Button, CircularProgress, makeStyles } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import Mtextbox from '../../../../app/form-controls/Mtextbox'
import Mselect from '../../../../app/form-controls/Mselect'
import Mdatepicker from '../../../../app/form-controls/Mdatepicker'
import Mswitch from '../../../../app/form-controls/Mswitch'
import ValidateNotify from '../../../../app/widgets/ValidateNotify'
import CustomBackdrop from '../../../../app/backdrop/CustomBackdrop'
import {
  VehicleDropdownActions,
  MotorQuotationAction,
  proposalDropdownAction
} from '../../../../store/actions/index'
import {
  preventIfNotNumber,
  handleTrimWhiteSpace,
  removeErrString,
  getLocalStorage,
  getSessionStorage,
  preventIfNotAlphaNumric,
  removeComma,
  checkResFailed,
  setSessionStorage,
  handleSetError,
  removeLeadingZeroAllowSingleCammo,
  preventIfNotAlphaChars,
  removeSingleZero
} from '../../../../helpers/helper'
import { ShowField } from '../../../../app/uiComponents'
import { MOTOR_FORM, GRANTED_USERS, REGEX, DATE } from '../../../../helpers/constants'
import { ERROR } from '../../../../helpers/messages'

const useStyles = makeStyles((theme) => ({
  BtnDisable: {
    backgroundColor: 'rgba(0, 0, 0, 0.26)',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.26)'
    }
  }
}
))

const FormVehicleDetails = props => {
  const { authRole, quotationId } = useSelector(
    ({ Auth, Quotation }) => ({
      authRole: Auth.authRole,
      quotationId: Quotation.quotationId
    }),
    shallowEqual
  )
  const {
    activeQuote, // From local storage
    quoteNumber,  // From url query params
    fromPage,
    back,
    next,
    quoteId,
    postVehicleData,
    getPurchaseTypeDropdownDispatch,
    getPolicyTypeDropdownDispatch,
    getMakeDropdownDispatch,
    getModelDropdownDispatch,
    getSubModelDropdownDispatch,
    getVehicleTypeDropdownDispatch,
    getNoOfSeatsDropdownDispatch,
    getVehicleKeptInDropdownDispatch,
    getVoluntaryXSDropdownDispatch,
    getVehicleMatrixDropdownDispatch,
    purchaseTypeData,
    gePurchaseTypeLoading,
    policyTypeData,
    getPolicyTypeLoading,
    makeData,
    getMakeLoading,
    modelData,
    getModelLoading,
    subModelData,
    getSubModelLoading,
    vehicleTypeData,
    noOfSeatsData,
    vehicleKeptInData,
    VoluntaryXSData,
    VehicleMatrixData,
    saveFormDispatch,
    getCountryOfOriginDropdownDispatch,
    CountryOfOriginData,
    getCountryOfOriginLoading,
    putVechileDispatch,
    getVehicleMatrixLoading,
    clearPutVechileDetailsAction,
    postVehicleInfoLoading,
    postVehicleStatus,
    getQuoteDetailsDispatch,
    getQuoteDetails,
    getQuoteDetailsLoading,
    getQuoteDetailsStatus,
    getMotorMatrixDropdownDispatch,
    ClearMotQuoteDetailsDispatch,
    motorMatrixData,
    getLeaseDropDownDispatch,
    getLeasingData
  } = props
  const [defaultValues, setDefaultValues] = useState({
    PurchaseType: '',
    PolicyType: '',
    COUNTRYOFORG: '',
    Make: '',
    Model: '',
    SubModel: '',
    EngineCapacity: '',
    RegMon: null,
    RegNo: '',
    VhType: '',
    NoOfSeats: '',
    VhKeptIn: 'GARAGE',
    SumInsured: '',
    TrSumIns: '0',
    VolXs: '0',
    SecAlrm: '',
    CHASSIS: '',
    OWNER: true,
    OwnerName: '',
    ADDR1: '',
    LEASING: 'None',
    LienADDR1: '',
    RALLYIND: '',
    GOODCARIND: '',
    PASSHIRE: '',
    MTTRADEIND: false,
    USEDTL: '',
    IsVat: false,
    RegFeeIncEst: false,
    LienName: '',
    ZONE: 'B'
  })
  const {
    control,
    watch,
    handleSubmit,
    setValue,
    getValues,
    formState,
    reset,
    setError,
    clearErrors
  } = useForm({
    defaultValues
  })
  const didMount = useRef(false)
  const summaryPage = fromPage === 'summary'
  const policyData = VehicleMatrixData && VehicleMatrixData ? VehicleMatrixData : {}
  const [errorPop, setErrorPop] = useState(false)
  const [resetState, setResetState] = useState(false)
  const [state, setState] = useState({
    personalData: {},
    proposals: {}
  })
  const motorQuoteNumber = getSessionStorage(MOTOR_FORM.QUOTE_NUMBER)
  const classes = useStyles()
  const { errors, isValid } = formState
  const personalData = state?.personalData
  const DTBIRTH = personalData?.DTBIRTH?.replace(/\s+/g, '')
  const PolicyWatcher = watch('PolicyType')
  const MakeWatcher = watch('Make')
  const ModelWatcher = watch('Model')
  const MonthWatcher = watch('RegMon')
  const OwnerWatcher = watch('OWNER')
  const RallyWatcher = watch('RALLYIND')
  const GoodCareWatcher = watch('GOODCARIND')
  const PassHireWatcher = watch('PASSHIRE')
  const TradingWatcher = watch('MTTRADEIND')
  const policyValue = getValues('PolicyType')
  const makeValue = getValues('Make')
  const countryWatcher = watch('COUNTRYOFORG')
  const countryValue = getValues('COUNTRYOFORG')
  const modelValue = getValues('Model')
  const monthValue = getValues('RegMon')
  const regMonthVal = moment(monthValue).format('MM')
  const regYrVal = moment(monthValue).format('YYYY')
  const watchLease = watch('LEASING', 'string')
  const [message, setMessage] = useState('')
  const [isDisable, setIsDisable] = useState(false)

  const ownershipOptions = [
    {
      VALUE: 'Leasing',
      LABEL: 'Leasing'
    },
    {
      VALUE: 'Lien',
      LABEL: 'Lien'
    },
    {
      VALUE: 'None',
      LABEL: 'None'
    },
    {
      VALUE: 'Hire/Purchase',
      LABEL: 'Hire/Purchase'
    }
  ]

  const resetTheValues = item => {
    const cDate = moment().set({ year: item.RegYr, month: item.RegMon - 1 })
    if (item.Make && item.Make) {
      reset(formValues => ({
        ...formValues,
        PurchaseType: item.PurchaseType,
        PolicyType: item.PolicyType,
        Make: item.Make,
        Model: item.Model,
        SubModel: item.SubModel,
        COUNTRYOFORG: item.COUNTRYOFORG,
        EngineCapacity: item.EngineCapacity,
        RegMon: cDate,
        RegNo: item.RegNo,
        VhType: item.VhType === '' ? '0' : item.VhType,
        NoOfSeats: item.NoOfSeats,
        VhKeptIn: item.VhKeptIn,
        SumInsured: item.SumInsured,
        TrSumIns: item.TrSumIns,
        VolXs: item.VolXs,
        SecAlrm: item.SecAlrm === 'Y',
        RALLYIND: item.RALLYIND === 'Y',
        GOODCARIND: item.GOODCARIND === 'Y',
        PASSHIRE: item.PASSHIRE === 'Y',
        MTTRADEIND: item.MTTRADEIND === 'Y',
        RegFeeIncEst: item.RegFeeIncEst === 'Y',
        IsVat: item.IsVat === 'Y',
        OWNER: item.OWNER === 'Y',
        OwnerName: item.OwnerName,
        ADDR1: item.ADDR1,
        LEASING: item.LEASING === 'Y' ? 'Leasing' : item.LIENIND === 'Y' ? 'Lien' : 'None',
        LEASINDIC: item.LEASINDIC,
        HIGHPURIND: item.HIGHPURIND,
        LienName: item.LienName,
        LienADDR1: item.LienADDR1,
        CompulsoryXs: item?.CompulsoryXs,
        CHASSIS: item?.CHASSIS,
        USEDTL: item?.USEDTL
      }))
    }
  }
  const CoverTypeValue = motorMatrixData && motorMatrixData?.CoverType &&
    motorMatrixData.CoverType.value
    ? motorMatrixData.CoverType.value
    : ''

  const onSubmit = data => {
    const payload = {
      ...personalData,
      ...state?.proposals,
      ...data,
      SecAlrm: data.SecAlrm === true ? 'Y' : 'N',
      IsVat: data.IsVat === true ? 'Y' : 'N',
      PurchaseType: {
        value: `${data?.PurchaseType === 'Second Hand' ? 'Y' : 'N'}`,
        type: data?.PurchaseType
      },
      CoverType: CoverTypeValue || '',
      RegYr: data.RegMon.format('YYYY'),
      RegMon: data.RegMon.format('MM'),
      SumInsured: removeComma(data.SumInsured),
      TrSumIns: data.TrSumIns ? removeComma(data.TrSumIns) : '0',
      DTBIRTH: moment(DTBIRTH).format('DD/MM/YYYY'),
      RALLYIND: data.RALLYIND === true ? 'Y' : 'N',
      GOODCARIND: data.GOODCARIND === true ? 'Y' : 'N',
      PASSHIRE: data.PASSHIRE === true ? 'Y' : 'N',
      MTTRADEIND: data.MTTRADEIND === true ? 'Y' : 'N',
      LIENIND: watchLease === 'Lien' ? 'Y' : 'N',
      LEASING: watchLease === 'Leasing' ? 'Y' : 'N',
      HIGHPURIND: watchLease === 'None' ? 'Y' : 'N',
      NoOfSeats: data?.NoOfSeats?.toString(),
      OWNER: data?.OWNER === true ? 'Y' : 'N',
      RegFeeIncEst: data?.RegFeeIncEst === true ? 'Y' : 'N',
      USEDTL: data?.USEDTL,
      LEASINDIC: data?.LEASINDIC,
      LienName: data?.LienName,
      LienADDR1: data?.LienADDR1,
      CompulsoryXs: data?.CompulsoryXs,
      VhType: data.VhType === 0 ? '' : data.VhType
    }
    // const vehiclePayload = _.omit(payload, ['OWNER'])
    saveFormDispatch(data)
    putVechileDispatch(payload)
  }

  useEffect(() => {
    if(MonthWatcher !== null && !MonthWatcher.isValid() || 
    MonthWatcher !== null && 
    moment().format('YYYY') < moment(MonthWatcher).format('YYYY') ||    
    MonthWatcher !== null && 1900 > moment(MonthWatcher).format('YYYY') ){
      setError('RegMon', { type: 'error'},{ message: '' })
      setIsDisable(true)
      setMessage('Invalid Format')
    }else{
      setIsDisable(false)
      clearErrors('RegMon')
    }
  }, [MonthWatcher, message])

  useEffect(() => {
    window.scrollTo(0, localStorage.getItem('position'))
    getPurchaseTypeDropdownDispatch()
    getPolicyTypeDropdownDispatch()
    getVehicleTypeDropdownDispatch()
    getNoOfSeatsDropdownDispatch()
    getVehicleKeptInDropdownDispatch()
    getVoluntaryXSDropdownDispatch()
    getLeaseDropDownDispatch()
  }, [])

  useEffect(() => {
    if(activeQuote){
      getQuoteDetailsDispatch(activeQuote)
      setDefaultValues((prevState) => ({
        ...prevState,
        QUOTNUM: activeQuote
      }))
    }
    else if(quoteNumber){
      getQuoteDetailsDispatch(quoteNumber)
      setDefaultValues((prevState) => ({
        ...prevState,
        QUOTNUM: quoteNumber
      }))
    }
    else if(motorQuoteNumber){
      getQuoteDetailsDispatch(motorQuoteNumber)
      setDefaultValues((prevState) => ({
        ...prevState,
        QUOTNUM: motorQuoteNumber
      }))
    }
  }, [activeQuote, quoteNumber, motorQuoteNumber])

  useEffect(() => {
    if (didMount.current && getQuoteDetailsStatus === 'success') {
      const vehicleDetails = getQuoteDetails && getQuoteDetails.vehicleDetails ? getQuoteDetails.vehicleDetails : {}
      const personalInfo = getQuoteDetails && getQuoteDetails.personalDetails ? getQuoteDetails.personalDetails : {}
      const proposalsData =
        getQuoteDetails && getQuoteDetails?.proposals
          ? getQuoteDetails?.proposals
          : {}

      const payload = {
        ...personalInfo,
        ...vehicleDetails,
        ...proposalsData
      }
      setState(prevState => ({
        ...prevState,
        personalData: personalInfo,
        proposals: proposalsData
      }))
      if (!_.isEmpty(vehicleDetails)) {
        resetTheValues(payload, reset)
        setState(prevState => ({
          ...prevState,
          personalData: personalInfo
        }))
      }
      ClearMotQuoteDetailsDispatch()
    }
  }, [getQuoteDetailsStatus])

  useEffect(() => {
    if (policyData.COUNTRYOFORIGIN === 'Y') {
      getCountryOfOriginDropdownDispatch()
    }
  }, [policyData])

  useEffect(() => {
    if (PolicyWatcher && policyValue != '') {
      setResetState(true)
      resetValues()
    }
  }, [PolicyWatcher])

  const resetValues = () => {
    if (resetState === true) {
      reset(prevState => ({
        ...prevState,
        Make: '',
        Model: '',
        SubModel: '',
        COUNTRYOFORG: ''
      }))
    }
  }
  useEffect(() => {
    if (didMount.current && policyValue != '0' || '') {
      const makeParam = {
        polcd: policyValue || '00'
      }
      getMakeDropdownDispatch(makeParam)
      getVehicleMatrixDropdownDispatch(makeParam)
    }
  }, [PolicyWatcher])

  // Make Watcher
  useEffect(() => {
    if (didMount.current && policyValue != '0' || '') {
      const modelParam = {
        polcd: policyValue,
        make: makeValue,
        country: countryValue || ''
      }
      const pickByParams = _.pickBy(modelParam)
      getModelDropdownDispatch(pickByParams)
    }
  }, [MakeWatcher, countryWatcher])

  // ModelWatcher
  useEffect(() => {
    if (didMount.current && modelValue != '0' || '') {
      const modelParam = {
        model: modelValue
      }
      getSubModelDropdownDispatch(modelParam)
    }
  }, [ModelWatcher])

  // MonthWatcher
  useEffect(() => {
    if (didMount.current && policyValue != '0' || '') {
      const params = {
        polcd: policyValue,
        regMnt: regMonthVal,
        regYrs: regYrVal
      }
      if(regMonthVal && regYrVal !== 'Invalid date') {
        getMotorMatrixDropdownDispatch(params)
      }
    }
  }, [MonthWatcher])

  useEffect(() => {
    if (postVehicleStatus === 'success' && !checkResFailed(postVehicleData)) {
      toast.success('Vehicle informations have been saved!', { duration: 3000 })
      setSessionStorage(MOTOR_FORM.ACTIVE_STEP, 2)
      clearPutVechileDetailsAction()
      //getQuoteDetailsDispatch(activeQuote)
      !summaryPage && next()
    } else if (postVehicleStatus === 'error' || checkResFailed(postVehicleData)) {
      postVehicleData === "F-Conversion from type 'DBNull' to type 'String' is not valid."
        ? toast.error('Internal Server Error. Please Try again later.')
        : toast.error(removeErrString(postVehicleData), { duration: 4000 })
      clearPutVechileDetailsAction()
    }
  }, [postVehicleStatus])

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

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <ShowField
          show={summaryPage}
          yes={() => (null)}
          no={() =>
            <CustomBackdrop isLoading={getVehicleMatrixLoading || getQuoteDetailsLoading} />}
        />
        <Grid
          container
          direction='row'
          justifyContent='center'
          alignItems='flex-start'
          spacing={summaryPage ? 2 : 4}
        >
          <Grid item md={summaryPage ? 12 : 6}>
            <Grid container spacing={summaryPage ? 1 : 2}>
              <Grid item xs={12}>
                <h4 className='form-title-md'>
                  Vehicle Details{' '}
                  <span>
                    <span className='req-mark'>*</span> Required field
                  </span>
                </h4>
              </Grid>

              <ShowField
                show={policyData.PURCHASETYPE != 'N'}
                yes={() => (
                  <>
                    <Mselect
                      reset={reset}
                      xs={12}
                      name='PurchaseType'
                      label={gePurchaseTypeLoading ? 'Loading...' : 'Purchase Type'}
                      control={control}
                      clearErrors={clearErrors}
                      options={purchaseTypeData && purchaseTypeData}
                      optionsLabel='PURCHASETYPE'
                      optionsValue='PURCHASETYPE'
                      grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                      userType={authRole}
                      req
                    />
                  </>
                )}
                no={() => null}
              />
              <Mselect
                reset={reset}
                xs={12}
                name='PolicyType'
                label={getPolicyTypeLoading ? 'Loading...' : 'Policy Type'}
                control={control}
                clearErrors={clearErrors}
                options={policyTypeData && policyTypeData}
                optionsLabel='POLCDDESC'
                optionsValue='POLCD'
                grantedUsers={GRANTED_USERS.AGENT_BROKER}
                userType={authRole}
                req
              />
              <ShowField
                show={policyData.COUNTRYOFORIGIN === 'Y'}
                yes={() => (
                  <>
                    <Mselect
                      reset={reset}
                      xs={12}
                      name='COUNTRYOFORG'
                      label={getCountryOfOriginLoading ? 'Loading...' : 'Country Of Origin'}
                      control={control}
                      clearErrors={clearErrors}
                      options={CountryOfOriginData && CountryOfOriginData}
                      optionsLabel='COUNTRY'
                      optionsValue='COUNTRY'
                      grantedUsers={GRANTED_USERS.BROKER}
                      userType={authRole}
                      disabled={getCountryOfOriginLoading}
                      req
                    />
                  </>
                )}
                no={() => null}
              />

              <ShowField
                show={policyData.MAKE != 'N'}
                yes={() => (
                  <>
                    <Mselect
                      reset={reset}
                      xs={12} sm={6} md={6}
                      name='Make'
                      label={getMakeLoading ? 'Loading...' : 'Make'}
                      control={control}
                      clearErrors={clearErrors}
                      options={makeData && makeData}
                      optionsLabel='CARMAKE'
                      optionsValue='CARMAKE'
                      grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                      userType={authRole}
                      disabled={getMakeLoading}
                      req
                    />
                  </>
                )}
                no={() => null}
              />
              <ShowField
                show={policyData.MODEL != 'N'}
                yes={() => (
                  <>
                    <Mselect
                      reset={reset}
                      xs={12} sm={6} md={6}
                      name='Model'
                      label={getModelLoading ? 'Loading...' : 'Model of Car'}
                      control={control}
                      clearErrors={clearErrors}
                      options={modelData && modelData}
                      optionsLabel='CARMODEL'
                      optionsValue='CARMODEL'
                      grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                      userType={authRole}
                      disabled={getModelLoading}
                      req
                    />
                  </>
                )}
                no={() => null}
              />
              <ShowField
                show={policyData.SUBMODEL != 'N'}
                yes={() => (
                  <>
                    <Mselect
                      reset={reset}
                      xs={12} sm={6} md={6}
                      name='SubModel'
                      label={getSubModelLoading ? 'Loading...' : 'Sub-Model'}
                      control={control}
                      clearErrors={clearErrors}
                      options={subModelData && subModelData}
                      optionsLabel='CARMODNAME'
                      optionsValue='CARMODNAME'
                      grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                      userType={authRole}
                      disabled={getSubModelLoading}
                      req
                    />
                  </>
                )}
                no={() => null}
              />
              <Mtextbox
                xs={12} sm={6} md={6}
                name='EngineCapacity'
                label='Engine Capacity (CC)'
                control={control}
                clearErrors={clearErrors}
                pattern={REGEX.NUMERIC}
                onKeyPress={e => {
                  preventIfNotNumber(e)
                }}
                onBlur={e => {
                  handleTrimWhiteSpace(e, 'EngineCapacity', setValue)
                  removeSingleZero(e, 'EngineCapacity', setValue)
                  handleSetError(
                    e,
                    'EngineCapacity',
                    setError,
                    REGEX.NUMERIC,
                    ERROR.NUMERIC
                  )
                }}
                grantedUsers={GRANTED_USERS.BROKER}
                userType={authRole}
                req
                maxLength={5}
              />
              <ShowField
                show={policyData.REGMONTHYEAR != 'N'}
                yes={() => (
                  <>
                    <Mdatepicker
                      xs={12}
                      views={['year', 'month']}
                      name='RegMon'
                      format='MM/YYYY'
                      label='Reg. Month/Year (MM/YYYY)'
                      control={control}
                      placeholder={DATE.MONTH_YEAR_ONLY}
                      clearErrors={clearErrors}
                      minDate={moment().subtract(500, 'years')}
                      maxDate={new Date()}
                      grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                      userType={authRole}
                      onKeyPress={e => {
                        preventIfNotNumber(e)
                      }}
                      req
                    />
                  </>
                )}
                no={() => null}
              />
              <ShowField
                show={policyData.VEHICLETYPE != 'N'}
                yes={() => (
                  <>
                    <Mselect
                      reset={reset}
                      xs={7}
                      name='VhType'
                      label='Vehicle Type'
                      control={control}
                      clearErrors={clearErrors}
                      options={vehicleTypeData && vehicleTypeData}
                      optionsLabel='VEHICLETYPE'
                      optionsValue='VEHICLETYPECODE'
                      grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                      userType={authRole}
                      maxLength={10}
                    />
                  </>
                )}
                no={() => null}
              />
              <ShowField
                show={policyData.NOOFSEATS != 'N'}
                yes={() => (
                  <>
                    <Mselect
                      reset={reset}
                      xs={5}
                      name='NoOfSeats'
                      label='Num. of Seat'
                      control={control}
                      clearErrors={clearErrors}
                      options={noOfSeatsData && noOfSeatsData}
                      optionsLabel='NOOFSEATCODE'
                      optionsValue='SWNNOOFSEATID'
                      grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                      userType={authRole}
                      maxLength={5}
                      req
                    />
                  </>
                )}
                no={() => null}
              />
              <ShowField
                show={policyData.REGNO != 'N'}
                yes={() => (
                  <>
                    <Mtextbox
                      xs={12}
                      name='RegNo'
                      label='Reg No'
                      control={control}
                      clearErrors={clearErrors}
                      pattern={REGEX.ALPHA_NUMERIC}
                      onKeyPress={e => {
                        preventIfNotAlphaNumric(e)
                      }}
                      onBlur={e => {
                        handleTrimWhiteSpace(e, 'RegNo', setValue)
                        removeSingleZero(e, 'RegNo', setValue)
                        handleSetError(
                          e,
                          'RegNo',
                          setError,
                          REGEX.ALPHA_NUMERIC,
                          ERROR.ALPHA_NUMERIC_SPACE
                        )
                      }}
                      maxLength={10}
                      grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                      userType={authRole}
                    />
                  </>
                )}
                no={() => null}
              />
              <ShowField
                show={authRole === 'broker'}
                yes={() => (
                  <>
                    <Mselect
                      reset={reset}
                      xs={12}
                      name='VhKeptIn'
                      label='Vehicle kept in'
                      control={control}
                      clearErrors={clearErrors}
                      options={vehicleKeptInData && vehicleKeptInData}
                      optionsLabel='VEHICLEKEPT'
                      optionsValue='VEHICLEKEPT'
                      grantedUsers={GRANTED_USERS.BROKER}
                      userType={authRole}
                      req
                    />
                    <ShowField
                      show={policyData.SUMINSURED != 'N'}
                      yes={() => (
                        <>
                          <Mtextbox
                            xs={12} sm={6} md={6}
                            name='SumInsured'
                            label='Sum Insured'
                            control={control}
                            clearErrors={clearErrors}
                            onKeyPress={e => {
                              preventIfNotNumber(e)
                            }}
                            onBlur={e => {
                              removeLeadingZeroAllowSingleCammo(e, 'SumInsured', setValue)
                              removeSingleZero(e, 'SumInsured', setValue)
                            }}
                            setThousandSeparator
                            maxLength={9}
                            grantedUsers={GRANTED_USERS.BROKER}
                            userType={authRole}
                            req
                          />
                        </>
                      )}
                      no={() => null}
                    />
                    <ShowField
                      show={policyData.TRAILERSUMINSURED != 'N'}
                      yes={() => (
                        <>
                          <Mtextbox
                            xs={12} sm={6} md={6}
                            name='TrSumIns'
                            label='Trailer Sum Ins.'
                            control={control}
                            clearErrors={clearErrors}
                            onKeyPress={e => {
                              preventIfNotNumber(e)
                            }}
                            onBlur={e => {
                              removeLeadingZeroAllowSingleCammo(e, 'TrSumIns', setValue)
                            }}
                            setThousandSeparator
                            maxLength={9}
                            grantedUsers={GRANTED_USERS.BROKER}
                            userType={authRole}
                          // req
                          />
                        </>
                      )}
                      no={() => null}
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
                <h4 className='form-title-md'>&nbsp;</h4>
              </Grid>

              <ShowField
                show={policyData.VOLUNTARYXS != 'N'}
                yes={() => (
                  <>
                    <Mselect
                      reset={reset}
                      xs={12}
                      name='VolXs'
                      label='Voluntary XS'
                      control={control}
                      clearErrors={clearErrors}
                      options={VoluntaryXSData && VoluntaryXSData}
                      optionsLabel='VOLUNTARYXS'
                      optionsValue='VOLUNTARYXS'
                      defaultValues='2'
                      grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                      userType={authRole}
                    // value="5000"
                    // req
                    />
                  </>
                )}
                no={() => null}
              />
              <Mswitch
                // xs={summaryPage ? 8 : 12}
                // md={summaryPage ? 8 : 6}
                xs={12}
                md={12}
                name='SecAlrm'
                label='Security / Alarm?'
                control={control}
                clearErrors={clearErrors}
                grantedUsers={GRANTED_USERS.AGENT_BROKER}
                userType={authRole}
              />

              <ShowField
                show={authRole === 'broker'}
                yes={() => (
                  <Grid item xs={12}>
                    <h4 className='form-title-md'>Ownership</h4>
                  </Grid>
                )}
                no={() => null}
              />

              <Mtextbox
                xs={12}
                name='CHASSIS'
                control={control}
                clearErrors={clearErrors}
                label='Chassis Number'
                grantedUsers={GRANTED_USERS.BROKER}
                userType={authRole}
                maxLength={30}
                pattern={REGEX.ALPHA_NUMERIC}
                onBlur={e => {
                  handleTrimWhiteSpace(e, 'CHASSIS', setValue)
                  removeSingleZero(e, 'CHASSIS', setValue)
                  handleSetError(
                    e,
                    'CHASSIS',
                    setError,
                    REGEX.ALPHA_NUMERIC,
                    ERROR.ALPHA_NUMERIC_SPACE
                  )
                }}
              />

              <Mswitch
                xs={12}
                name='OWNER'
                label='Are you the owner of the motor vehicle and is it registered in your name?'
                control={control}
                clearErrors={clearErrors}
                grantedUsers={GRANTED_USERS.BROKER}
                userType={authRole}
                setValue={setValue}
              />

              <ShowField // Today
                show={OwnerWatcher === true}
                yes={() => null}
                no={() => (
                  <>
                    <Mtextbox
                      xs={12}
                      name='OwnerName'
                      control={control}
                      clearErrors={clearErrors}
                      label='Name of registered owner'
                      grantedUsers={GRANTED_USERS.BROKER}
                      userType={authRole}
                      pattern={REGEX.ALPHA_NUMERIC_CHARS_SPACE}
                      onBlur={e => {
                        handleSetError(
                          e,
                          'OwnerName',
                          setError,
                          REGEX.ALPHA_NUMERIC_CHARS_SPACE,
                          ERROR.ALPHA_NUMERIC_SPACE
                        )
                      }}
                      onKeyPress={e => {
                        preventIfNotAlphaChars(e)
                      }}
                      maxLength={30}
                    />

                    <Mtextbox
                      xs={12}
                      name='ADDR1'
                      control={control}
                      clearErrors={clearErrors}
                      label='Address of registered owner'
                      grantedUsers={GRANTED_USERS.BROKER}
                      userType={authRole}
                      pattern={REGEX.ALPHA_NUMERIC_SPECIAL_CHARS}
                      onBlur={e => {
                        handleTrimWhiteSpace(e, 'ADDR1', setValue)
                        removeSingleZero(e, 'ADDR1', setValue)
                        handleSetError(
                          e,
                          'ADDR1',
                          setError,
                          REGEX.ALPHA_NUMERIC_SPECIAL_CHARS,
                          ERROR.ALPHA_NUMERIC_SPACE
                        )
                      }}
                      maxLength={70}
                    />
                  </>
                )}
              />

              <ShowField
                show={authRole === 'broker'}
                yes={() => (
                  <Grid item xs={12}>
                    <p>Please state if any person/firm has any financial interest in the vehicle:</p>
                  </Grid>
                )}
                no={() => null}
              />

              <Mselect
                reset={reset}
                xs={12}
                name='LEASING'
                label='Select'
                control={control}
                clearErrors={clearErrors}
                options={ownershipOptions}
                optionsLabel='VALUE'
                optionsValue='LABEL'
                req
                grantedUsers={GRANTED_USERS.BROKER_CUSTOMER}
                userType={authRole}
              />

              {/* <ShowField
                show={LeasingWatcher === 'Leasing'}
                yes={() => (
                  <>
                    <Mtextbox
                      xs={12} sm={12} md={12}
                      name="LEASING_COMPANY"
                      label="Leasing Company"
                      control={control}
                      clearErrors={clearErrors}
                      grantedUsers={GRANTED_USERS.BROKER_CUSTOMER}
                      userType={authRole}
                    />
                  </>
                )}
                no={() => null}
              /> */}

              <ShowField
                show={watchLease === 'Leasing'}
                yes={() => (
                  <>
                    <Mselect
                      reset={reset}
                      xs={12}
                      name='LEASINDIC'
                      label='Leasing Company'
                      control={control}
                      clearErrors={clearErrors}
                      options={getLeasingData && getLeasingData}
                      optionsLabel='LSNAME'
                      optionsValue='LEASING'
                      req
                      grantedUsers={GRANTED_USERS.BROKER}
                      userType={authRole}
                    />
                  </>
                )}
                no={() => null}
              />

              <ShowField
                show={watchLease === 'Lien'}
                yes={() => (
                  <>
                    <Mtextbox
                      xs={12}
                      name='LienName'
                      control={control}
                      clearErrors={clearErrors}
                      label='Name of person/Firm'
                      grantedUsers={GRANTED_USERS.BROKER}
                      userType={authRole}
                      onKeyPress={e => {
                        preventIfNotAlphaChars(e)
                      }}
                      maxLength={30}
                    />
                    <Mtextbox
                      xs={12}
                      name='LienADDR1'
                      control={control}
                      clearErrors={clearErrors}
                      label='Address of person/Firm'
                      grantedUsers={GRANTED_USERS.BROKER}
                      userType={authRole}
                      pattern={REGEX.ALPHA_NUMERIC_SPECIAL_CHARS}
                      onBlur={e => {
                        handleTrimWhiteSpace(e, 'LienADDR1', setValue)
                        removeSingleZero(e, 'LienADDR1', setValue)
                        handleSetError(
                          e,
                          'LienADDR1',
                          setError,
                          REGEX.ALPHA_NUMERIC_SPECIAL_CHARS,
                          ERROR.ALPHA_NUMERIC_SPACE
                        )
                      }}
                      maxLength={70}
                    />
                  </>
                )}
                no={() => null}
              />

              <ShowField
                show={authRole === 'broker'}
                yes={() => (
                  <Grid item xs={12}>
                    <h4 className='form-title-md'>Vehicle Use</h4>
                  </Grid>
                )}
                no={() => null}
              />

              <Mswitch
                xs={12}
                name='RALLYIND'
                label='Will the motor car be used for rallies, competition, trails?'
                control={control}
                clearErrors={clearErrors}
                grantedUsers={GRANTED_USERS.BROKER}
                userType={authRole}
              />

              <Mswitch
                xs={12}
                name='GOODCARIND'
                label='Will the motor car be used for carriage of goods for business or trade purposes?'
                control={control}
                clearErrors={clearErrors}
                grantedUsers={GRANTED_USERS.BROKER}
                userType={authRole}
              />

              <Mswitch
                xs={12}
                name='PASSHIRE'
                label='Will the motor car be used for carriage of passengers for hire or reward?'
                control={control}
                clearErrors={clearErrors}
                grantedUsers={GRANTED_USERS.BROKER}
                userType={authRole}
              />

              <Mswitch
                xs={12}
                name='MTTRADEIND'
                label='Will the motor car be used in connection with the motor trade?'
                control={control}
                clearErrors={clearErrors}
                grantedUsers={GRANTED_USERS.BROKER}
                userType={authRole}
              />

              <ShowField
                show={RallyWatcher || GoodCareWatcher || PassHireWatcher || TradingWatcher === true}
                yes={() => (
                  <>
                    <Mtextbox
                      xs={12} sm={12} md={12}
                      name='USEDTL'
                      label='Vehicle Use Details'
                      control={control}
                      grantedUsers={GRANTED_USERS.BROKER}
                      userType={authRole}
                      clearErrors={clearErrors}
                      maxLength={150}
                      onBlur={e => {
                        handleTrimWhiteSpace(e, 'USEDTL', setValue)
                        removeSingleZero(e, 'USEDTL', setValue)
                        handleSetError(
                          e,
                          'USEDTL',
                          setError,
                          REGEX.ALPHA_NUMERIC_CHARS_SPACE,
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
                name='RegFeeIncEst'
                label='Is registration fees included in “ESTIMATE OF PRESENT VALUE”?'
                control={control}
                clearErrors={clearErrors}
                grantedUsers={GRANTED_USERS.AGENT_BROKER}
                userType={authRole}
                setValue={setValue}
                info='Info Content'
              />

              <Mswitch
                xs={12}
                name='IsVat'
                label='Is VAT included in “ESTIMATE OF PRESENT VALUE”?'
                control={control}
                clearErrors={clearErrors}
                grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                userType={authRole}
                setValue={setValue}
                info='Info Content'
              />

            </Grid>
          </Grid>
          <Grid item md={12} className='txt-right'>
            <ShowField
              show={!summaryPage}
              yes={() => (
                <>
                  <Button
                    variant='outlined'
                    color='primary'
                    className='mar-right-s'
                    onClick={() => back()}
                  >
                    Back
                  </Button>
                </>
              )}
              no={() => null}
            />

            <Button
              variant='contained'
              color='primary'
              type='submit'
              className={!errors || !isValid ? classes.BtnDisable : ''}
              disabled={!errors || !isValid ? !errors : isDisable}
            >
              {postVehicleInfoLoading
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
      <ValidateNotify show={errorPop} errors={message} clear={setErrorPop} />
    </>
  )
}

const mapStateToProps = state => {
  const { VehicleDropdown, MotorQuotation, ProposalDropDown } = state

  return {
    gePurchaseTypeLoading: VehicleDropdown.gePurchaseTypeLoading,
    purchaseTypeData: VehicleDropdown.purchaseTypeData,
    getPolicyTypeLoading: VehicleDropdown.getPolicyTypeLoading,
    policyTypeData: VehicleDropdown.policyTypeData,
    getMakeLoading: VehicleDropdown.getMakeLoading,
    makeData: VehicleDropdown.makeData,
    getModelLoading: VehicleDropdown.getModelLoading,
    modelData: VehicleDropdown.modelData,
    getSubModelLoading: VehicleDropdown.getSubModelLoading,
    subModelData: VehicleDropdown.subModelData,
    getVehicleTypeLoading: VehicleDropdown.getVehicleTypeLoading,
    vehicleTypeData: VehicleDropdown.vehicleTypeData,
    getNoOfSeatsLoading: VehicleDropdown.getNoOfSeatsLoading,
    noOfSeatsData: VehicleDropdown.noOfSeatsData,
    getVehicleKeptInLoading: VehicleDropdown.getVehicleKeptInLoading,
    vehicleKeptInData: VehicleDropdown.vehicleKeptInData,
    getVoluntaryXSLoading: VehicleDropdown.getVoluntaryXSLoading,
    VoluntaryXSData: VehicleDropdown.VoluntaryXSData,
    getVehicleMatrixLoading: VehicleDropdown.getVehicleMatrixLoading,
    VehicleMatrixData: VehicleDropdown.VehicleMatrixData,
    getCountryOfOriginLoading: VehicleDropdown.getCountryOfOriginLoading,
    CountryOfOriginData: VehicleDropdown.CountryOfOriginData,
    getQuoteDetails: MotorQuotation?.getQuoteDetails,
    getQuoteDetailsLoading: MotorQuotation?.getQuoteDetailsLoading,
    getQuoteDetailsStatus: MotorQuotation?.getQuoteDetailsStatus,
    postVehicleData: MotorQuotation?.postVehicleData,
    postVehicleStatus: MotorQuotation?.postVehicleStatus,
    postVehiclemessage: MotorQuotation?.postVehiclemessage,
    postVehicleInfoLoading: MotorQuotation?.postVehicleInfoLoading,
    tempFormData: MotorQuotation?.tempFormData,
    getMotorMatrixLoading: MotorQuotation.getMotorMatrixLoading,
    motorMatrixData: MotorQuotation.motorMatrixData,
    motorMatrixStatus: MotorQuotation.motorMatrixStatus,
    getLeasingData: ProposalDropDown.getLeasingData
  }
}

const mapDispatchToProps = dispatch => ({
  getPurchaseTypeDropdownDispatch: params =>
    dispatch(VehicleDropdownActions.getPurchaseTypeRequest(params)),
  getPolicyTypeDropdownDispatch: params =>
    dispatch(VehicleDropdownActions.getPolicyTypeRequest(params)),
  getMakeDropdownDispatch: params =>
    dispatch(VehicleDropdownActions.getMakeRequest(params)),
  getModelDropdownDispatch: params =>
    dispatch(VehicleDropdownActions.getModelRequest(params)),
  getSubModelDropdownDispatch: params =>
    dispatch(VehicleDropdownActions.getSubModelRequest(params)),
  getVehicleTypeDropdownDispatch: params =>
    dispatch(VehicleDropdownActions.getVehicleTypeRequest(params)),
  getNoOfSeatsDropdownDispatch: params =>
    dispatch(VehicleDropdownActions.getNoOfSeatsRequest(params)),
  getVehicleKeptInDropdownDispatch: params =>
    dispatch(VehicleDropdownActions.getVehicleKeptInRequest(params)),
  getVoluntaryXSDropdownDispatch: params =>
    dispatch(VehicleDropdownActions.getVoluntaryXSRequest(params)),
  getVehicleMatrixDropdownDispatch: params =>
    dispatch(VehicleDropdownActions.getVehicleMatrixRequest(params)),
  getCountryOfOriginDropdownDispatch: params =>
    dispatch(VehicleDropdownActions.getCountryOfOriginRequest(params)),
  getQuoteDetailsDispatch: id =>
    dispatch(MotorQuotationAction.GetQuoteDetailsAction(id)),
  saveFormDispatch: data => dispatch(MotorQuotationAction.SaveFormAction(data)),
  putVechileDispatch: formData =>
    dispatch(MotorQuotationAction.PutVechileDetailsAction(formData)),
  clearPutVechileDetailsAction: () =>
    dispatch(MotorQuotationAction.ClearPutVechileDetailsAction()),
  getMotorMatrixDropdownDispatch: params =>
    dispatch(MotorQuotationAction.getMotorMatrixRequest(params)),
  ClearMotQuoteDetailsDispatch: () =>
    dispatch(MotorQuotationAction.ClearMotQuoteDetailsAction()),
  getLeaseDropDownDispatch: params =>
    dispatch(proposalDropdownAction.getLeaseDropdown(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(FormVehicleDetails)

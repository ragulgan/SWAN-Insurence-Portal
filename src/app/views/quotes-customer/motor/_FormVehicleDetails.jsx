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
  MotorQuotationAction
} from '../../../../store/actions/index'
import {
  preventIfNotNumber,
  handleTrimWhiteSpace,
  removeErrString,
  getSessionStorage,
  preventIfNotAlphaNumric,
  removeComma,
  checkResFailed,
  handleSetError,
  removeLeadingZeroAllowSingleCammo,
  removeSingleZero,
  removeSessionStorage
} from '../../../../helpers/helper'
import { ShowField } from '../../../../app/uiComponents'
import { MOTOR_FORM, GRANTED_USERS, REGEX, DATE, VARIABLES } from '../../../../helpers/constants'
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
    fromPage,
    back,
    next,
    changeStep,
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
    motorMatrixData
  } = props
  const [defaultValues, setDefaultValues] = useState({
    PurchaseType: '',
    PolicyType: '00',
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
    IsVat: '',
    RegYr: '',
    Vh_Brk_Fee: false,
    COUNTRYOFORG: '',
    CHASSIS: '',
    OWNER: '',
    REGTYPE: false,
    ADDR1: '',
    RALLYIND: '',
    GOODCARIND: '',
    PASSHIRE: '',
    MTTRADEIND: '',
    LienADDR1: '',
    OwnerName: '',
    QUOTNUM: getSessionStorage(MOTOR_FORM.QUOTE_NUMBER)
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
    defaultValues,
    isValid
  })
  const didMount = useRef(false)
  const policyData = VehicleMatrixData && VehicleMatrixData ? VehicleMatrixData : {}
  const classes = useStyles()
  const [errorPop, setErrorPop] = useState(false)
  const [resetState, setResetState] = useState(false)
  const [state, setState] = useState({
    personalData: {}
  })
  const { errors, isValid } = formState
  const summaryPage = fromPage === 'summary'
  const personalData = state?.personalData
  const personalPayload = _.omit(personalData, ['DTBIRTH'])
  const DTBIRTH = personalData?.DTBIRTH?.replace(/\s+/g, '')
  const PolicyWatcher = watch('PolicyType', false)
  const MakeWatcher = watch('Make')
  const ModelWatcher = watch('Model')
  const MonthWatcher = watch('RegMon')
  const policyValue = getValues('PolicyType')
  const makeValue = getValues('Make')
  const countryWatcher = watch('COUNTRYOFORG')
  const countryValue = getValues('COUNTRYOFORG')
  const modelValue = getValues('Model')
  const monthValue = getValues('RegMon')
  const regMonthVal = moment(monthValue).format('MM')
  const regYrVal = moment(monthValue).format('YYYY')
  const [message, setMessage] = useState('')
  const [isDisable, setIsDisable] = useState(false)
  const motorQuoteNo = getSessionStorage(MOTOR_FORM.QUOTE_NUMBER)

  const resetTheValues = item => {
    const cDate = moment().set({ year: item.RegYr, month: item.RegMon - 1 })
    if (item.Make && item.Make) {
      reset(formValues => ({
        ...formValues,
        PurchaseType: item.PurchaseType,
        // PolicyType: item.PolicyType,
        Make: item.Make,
        COUNTRYOFORG: item.COUNTRYOFORG,
        Model: item.Model,
        SubModel: item.SubModel,
        EngineCapacity: item.EngineCapacity,
        RegMon: cDate,
        RegNo: item.RegNo,
        VhType: item.VhType,
        NoOfSeats: item.NoOfSeats,
        VhKeptIn: item.VhKeptIn,
        SumInsured: item.SumInsured === 0 ? '100000' : item.SumInsured,
        TrSumIns: item.TrSumIns,
        VolXs: item.VolXs,
        SecAlrm: item.SecAlrm === 'Y',
        VhType: item.VhType === '' ? '0' : item.VhType,
        REGTYPE: item.REGTYPE,
        IsVat: item.IsVat === 'Y'
      }))
    }
  }

  const CoverTypeValue = motorMatrixData && motorMatrixData?.CoverType &&
  motorMatrixData.CoverType.value
    ? motorMatrixData.CoverType.value
    : ''
  const onSubmit = data => {
    const payload = {
      ...personalPayload,
      ...data,
      SecAlrm: data.SecAlrm === true ? 'Y' : 'N',
      IsVat: data.IsVat === true ? 'Y' : 'N',
      REGTYPE: data.REGTYPE,
      PolicyType: '00',
      PurchaseType: data.PurchaseType == 'Second Hand'
        ? {
            value: 'Y', type: data.PurchaseType
          }
        : {
            value: 'N', type: data.PurchaseType
          },
      RegYr: data.RegMon.format('YYYY'),
      RegMon: data.RegMon.format('MM'),
      CoverType: CoverTypeValue || '',
      SumInsured: removeComma(data.SumInsured),
      VolXs: data.VolXs,
      DTBIRTH: moment(DTBIRTH).format('DD/MM/YYYY'),
      QUOTNUM: getSessionStorage(MOTOR_FORM.QUOTE_NUMBER),
      SumInsured: removeComma(data.SumInsured),
      TrSumIns: data.TrSumIns ? removeComma(data.TrSumIns) : '0',
      NoOfSeats: data?.NoOfSeats?.toString(),
      VhType: data.VhType === 0 ? '' : data.VhType
    }

    saveFormDispatch(data)
    putVechileDispatch(payload)
  }

  useEffect(() => {
    window.scrollTo(0, localStorage.getItem('position'))
    getPurchaseTypeDropdownDispatch()
    getPolicyTypeDropdownDispatch()
    getVehicleTypeDropdownDispatch()
    getNoOfSeatsDropdownDispatch()
    getVehicleKeptInDropdownDispatch()
    getVoluntaryXSDropdownDispatch()
    const motorQuoteNo = getSessionStorage(MOTOR_FORM.QUOTE_NUMBER)
    getQuoteDetailsDispatch(motorQuoteNo)
    setDefaultValues((prevState) => ({
      ...prevState,
      QUOTNUM: motorQuoteNo
    }))
  }, [])

  // useEffect(() => {
  //   if(MonthWatcher && !MonthWatcher.isValid()){
  //     setError('RegMon', { type: 'error'},{ message: '' })
  //     setIsDisable(true)
  //     setMessage('Invalid Format')
  //   }
  // }, [MonthWatcher, message])
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
    if (didMount.current && getQuoteDetailsStatus === 'success') {
      const vehicleDetails = getQuoteDetails && getQuoteDetails.vehicleDetails ? getQuoteDetails.vehicleDetails : {}
      const personalInfo = getQuoteDetails && getQuoteDetails.personalDetails ? getQuoteDetails.personalDetails : {}
      if (!_.isEmpty(vehicleDetails)) {
        resetTheValues(vehicleDetails)
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
    if (didMount.current && policyValue != '0' || '') {
      const makeParam = {
        polcd: '00'
      }
      getMakeDropdownDispatch(makeParam)
      getVehicleMatrixDropdownDispatch(makeParam)
    }
  }, [PolicyWatcher])

  useEffect(() => {
    if (MakeWatcher || countryWatcher && makeValue != '') {
      setResetState(true)
      resetValues()
    }
  }, [MakeWatcher, countryWatcher])

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
      const modelParam = {
        polcd: policyValue,
        make: makeValue,
        country: countryValue || ''
      }
      const pickByParams = _.pickBy(modelParam)
      getModelDropdownDispatch(pickByParams)
    }
  }, [MakeWatcher, countryWatcher])

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
      !summaryPage && next()
      // !summaryPage && changeStep(2)
      clearPutVechileDetailsAction()
      getQuoteDetailsDispatch(motorQuoteNo)
      removeSessionStorage(VARIABLES.PLAN_ID)
    } else if (postVehicleStatus === 'error' || checkResFailed(postVehicleData)) {
      toast.error(removeErrString(postVehicleData), { duration: 4000 })
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
          show={fromPage === 'summary'}
          yes={() => (null)}
          no={() =>
            <CustomBackdrop isLoading={getVehicleMatrixLoading || getQuoteDetailsLoading} />}
        />
        <Grid
          container
          direction='row'
          justifyContent='center'
          alignItems='flex-start'
          spacing={fromPage === 'summary' ? 2 : 4}
        >
          <Grid item md={fromPage === 'summary' ? 12 : 6}>
            <Grid container spacing={fromPage === 'summary' ? 1 : 2}>
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
                      grantedUsers={GRANTED_USERS.CUSTOMER}
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
                      grantedUsers={GRANTED_USERS.CUSTOMER}
                      userType={authRole}
                      req
                      disabled={getCountryOfOriginLoading}
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
                      grantedUsers={GRANTED_USERS.CUSTOMER}
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
                      grantedUsers={GRANTED_USERS.CUSTOMER}
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
                      grantedUsers={GRANTED_USERS.CUSTOMER}
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
                grantedUsers={GRANTED_USERS.AGENT_CUSTOMER}
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
                      clearErrors={clearErrors}
                      placeholder={DATE.MONTH_YEAR_ONLY}
                      minDate={moment().subtract(500, 'years')}
                      maxDate={new Date()}
                      grantedUsers={GRANTED_USERS.CUSTOMER}
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
                      grantedUsers={GRANTED_USERS.CUSTOMER}
                      userType={authRole}
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
                      grantedUsers={GRANTED_USERS.CUSTOMER}
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
                      grantedUsers={GRANTED_USERS.CUSTOMER}
                      userType={authRole}
                    />
                  </>
                )}
                no={() => null}
              />

            </Grid>
          </Grid>
          <Grid item md={fromPage === 'summary' ? 12 : 6}>
            <Grid container spacing={fromPage === 'summary' ? 1 : 2}>
              <Grid item xs={12}>
                <h4 className='form-title-md'>&nbsp;</h4>
              </Grid>
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
                grantedUsers={GRANTED_USERS.CUSTOMER}
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
                      grantedUsers={GRANTED_USERS.CUSTOMER}
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
                      maxLength={9}
                      onKeyPress={e => {
                        preventIfNotNumber(e)
                      }}
                      onBlur={e => {
                        removeLeadingZeroAllowSingleCammo(e, 'TrSumIns', setValue)
                      }}
                      setThousandSeparator
                      grantedUsers={GRANTED_USERS.CUSTOMER}
                      userType={authRole}
                    // req
                    />
                  </>
                )}
                no={() => null}
              />
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
                      grantedUsers={GRANTED_USERS.CUSTOMER}
                      userType={authRole}
                      req
                    />
                  </>
                )}
                no={() => null}
              />
              <Mswitch
                xs={12}
                md={12}
                name='SecAlrm'
                label='Security / Alarm?'
                control={control}
                clearErrors={clearErrors}
                grantedUsers={GRANTED_USERS.CUSTOMER}
                userType={authRole}
              />

              <Mswitch
                xs={12}
                name='REGTYPE'
                label='Is registration fees included in “ESTIMATE OF PRESENT VALUE”?'
                control={control}
                clearErrors={clearErrors}
                grantedUsers={GRANTED_USERS.CUSTOMER}
                userType={authRole}
              />

              <Mswitch
                xs={12}
                name='IsVat'
                label='Is VAT included in “ESTIMATE OF PRESENT VALUE”?'
                control={control}
                clearErrors={clearErrors}
                grantedUsers={GRANTED_USERS.CUSTOMER}
                userType={authRole}
              />

            </Grid>
          </Grid>
          <Grid item md={12} className='txt-right'>
            <Button
              variant='outlined'
              color='primary'
              className='mar-right-s'
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
              {postVehicleInfoLoading
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
  const { VehicleDropdown, MotorQuotation } = state

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
    motorMatrixStatus: MotorQuotation.motorMatrixStatus
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
    dispatch(MotorQuotationAction.ClearMotQuoteDetailsAction())
})

export default connect(mapStateToProps, mapDispatchToProps)(FormVehicleDetails)

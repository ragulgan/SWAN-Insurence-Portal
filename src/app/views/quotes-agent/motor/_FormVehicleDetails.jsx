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
  setSessionStorage,
  removeLeadingZeroAllowSingleCammo,
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

const defaultData = {
  PurchaseType: '',
  PolicyType: '',
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
  RegFeeIncEst: '',
  IsVat: '',
  COUNTRYOFORG: '',
  CHASSIS: ''
}

const FormVehicleDetails = props => {
  const { authRole } = useSelector(
    ({ Auth }) => ({
      authRole: Auth.authRole
    }),
    shallowEqual
  )
  const {
    activeQuote, // From session storage
    quoteNumber, // From url query params
    fromPage,
    back,
    next,
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
    ClearMotorMatrixDispatch,
    ClearMotQuoteDetailsDispatch,
    motorMatrixData
  } = props
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
    defaultValues: defaultData,
    isValid

  })
  const classes = useStyles()
  const didMount = useRef(false)
  const summaryPage = fromPage === 'summary'
  const [message, setMessage] = useState('')
  const policyData = VehicleMatrixData && VehicleMatrixData ? VehicleMatrixData : {}
  const [errorPop, setErrorPop] = useState(false)
  const [resetState, setResetState] = useState(false)
  const [state, setState] = useState({
    personalData: {}
  })
  const motorQuoteId = getSessionStorage(MOTOR_FORM.QUOTE_NUMBER)
  const { errors, isValid } = formState
  const personalData = state?.personalData
  const personalPayload = _.omit(personalData, ['DTBIRTH'])
  const DTBIRTH = personalData?.DTBIRTH?.replace(/\s+/g, '')
  const PolicyWatcher = watch('PolicyType')
  const policyValue = getValues('PolicyType')
  const MakeWatcher = watch('Make')
  const makeValue = getValues('Make')
  const countryWatcher = watch('COUNTRYOFORG')
  const countryValue = getValues('COUNTRYOFORG')
  const ModelWatcher = watch('Model')
  const modelValue = getValues('Model')
  const monthWatcher = watch('RegMon')
  const monthValue = getValues('RegMon')
  const regMonthVal = moment(monthValue).format('MM')
  const regYrVal = moment(monthValue).format('YYYY')
  const [isDisable, setIsDisable] = useState(false)
  const CoverTypeValue = motorMatrixData && motorMatrixData?.CoverType &&
    motorMatrixData.CoverType.value
    ? motorMatrixData.CoverType.value
    : ''

  const onError = (errors, e) => {
    if (!_.isEmpty(errors)) {
      setErrorPop(true)
      setMessage('Please fill in required information to proceed')
    }
  }

  useEffect(() => {
    if(monthWatcher !== null && !monthWatcher.isValid() || 
    monthWatcher !== null && 
    moment().format('YYYY') < moment(monthWatcher).format('YYYY') ||    
    monthWatcher !== null && 1900 > moment(monthWatcher).format('YYYY') ){
      setError('RegMon', { type: 'error'},{ message: '' })
      setIsDisable(true)
      setMessage('Invalid Format')
    }else{
      setIsDisable(false)
      clearErrors('RegMon')
    }
  }, [monthWatcher, message])
  
  const onSubmit = data => {
    const payload = {
      ...personalPayload,
      ...data,
      SecAlrm: data.SecAlrm === true ? 'Y' : 'N',
      RegFeeIncEst: data.RegFeeIncEst === true ? 'Y' : 'N',
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
      VolXs: data.VolXs,
      DTBIRTH: moment(DTBIRTH).format('DD/MM/YYYY'),
      VhType: data.VhType === 0 ? '' : data.VhType,
      NoOfSeats: data?.NoOfSeats?.toString()
    }
    putVechileDispatch(payload)
  }
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
        NoOfSeats: item.NoOfSeats,
        VhKeptIn: item.VhKeptIn,
        SumInsured: item.SumInsured,
        TrSumIns: item.TrSumIns,
        VolXs: item.VolXs,
        SecAlrm: item.SecAlrm === 'Y',
        RegFeeIncEst: item.RegFeeIncEst === 'Y',
        IsVat: item.IsVat === 'Y',
        VhType: item.VhType === '' ? '0' : item.VhType
      }))
    }
  }
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
    getPurchaseTypeDropdownDispatch()
    getPolicyTypeDropdownDispatch()
    getVehicleTypeDropdownDispatch()
    getNoOfSeatsDropdownDispatch()
    getVehicleKeptInDropdownDispatch()
    getVoluntaryXSDropdownDispatch()
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
    return () => {
      ClearMotorMatrixDispatch()
    }
  }, [activeQuote, quoteNumber])

  useEffect(() => {
    if (didMount.current && getQuoteDetailsStatus === 'success') {
      window.scrollTo(0, localStorage.getItem('position'))
      const vehicleDetails = getQuoteDetails &&
        getQuoteDetails.vehicleDetails
        ? getQuoteDetails.vehicleDetails
        : {}
      const personalInfo = getQuoteDetails &&
        getQuoteDetails.personalDetails
        ? getQuoteDetails.personalDetails
        : {}
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
    if (PolicyWatcher && policyValue != '') {
      setResetState(true)
      resetValues()
      setSessionStorage(MOTOR_FORM.CURRENT_POLICY_CODE, policyValue)
    }
  }, [PolicyWatcher])

  useEffect(() => {
    if (didMount.current && policyValue != '0' || '') {
      const makeParam = {
        polcd: policyValue || '00'
      }
      getMakeDropdownDispatch(makeParam)
      getVehicleMatrixDropdownDispatch(makeParam)
    }
  }, [PolicyWatcher])

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
  }, [monthWatcher])

  useEffect(() => {
    if (postVehicleStatus === 'success' && !checkResFailed(postVehicleData)) {
      toast.success('Vehicle informations have been saved!', { duration: 3000 })
      clearPutVechileDetailsAction()
      !summaryPage && next()
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
                      grantedUsers={GRANTED_USERS.AGENT}
                      userType={authRole}
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
                grantedUsers={GRANTED_USERS.AGENT}
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
                      placeholder={DATE.MONTH_YEAR_ONLY}
                      label='Reg. Month/Year (MM/YYYY)'
                      control={control}
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
                        removeSingleZero(e, 'RegNo', setValue)
                      }}
                      maxLength={10}
                      grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                      userType={authRole}
                    // req
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
                show={policyData.VEHICLEKEPTIN != 'N'}
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
                      grantedUsers={GRANTED_USERS.AGENT}
                      userType={authRole}
                      req
                    />
                  </>
                )}
                no={() => null}
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
                      grantedUsers={GRANTED_USERS.AGENT}
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
                      grantedUsers={GRANTED_USERS.AGENT}
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

              <Mselect
                reset={reset}
                xs={12}
                name='VolXs'
                label='Select'
                control={control}
                clearErrors={clearErrors}
                options={VoluntaryXSData && VoluntaryXSData}
                optionsLabel=''
                optionsValue=''
                defaultValues='2'
                grantedUsers={GRANTED_USERS.BROKER_CUSTOMER}
                userType={authRole}
              // req
              />

              <Mswitch
                xs={12}
                name='RegFeeIncEst'
                label='Is registration fees included in “ESTIMATE OF PRESENT VALUE”?'
                control={control}
                clearErrors={clearErrors}
                grantedUsers={GRANTED_USERS.AGENT_BROKER}
                userType={authRole}
                info='Registration fees'
              />

              <Mswitch
                xs={12}
                name='IsVat'
                label='Is VAT included in “ESTIMATE OF PRESENT VALUE”?'
                control={control}
                clearErrors={clearErrors}
                grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                userType={authRole}
                info='VAT'
              />

            </Grid>
          </Grid>
          <Grid item md={12} className='txt-right'>
            {/* <Button
              variant="outlined"
              color="primary"
              className="mar-right-s"
              onClick={() => back()}
            >
              Back
            </Button> */}
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
  putVechileDispatch: formData =>
    dispatch(MotorQuotationAction.PutVechileDetailsAction(formData)),
  clearPutVechileDetailsAction: () =>
    dispatch(MotorQuotationAction.ClearPutVechileDetailsAction()),
  getMotorMatrixDropdownDispatch: params =>
    dispatch(MotorQuotationAction.getMotorMatrixRequest(params)),
  ClearMotorMatrixDispatch: () =>
    dispatch(MotorQuotationAction.getMotorMatrixClear()),
  ClearMotQuoteDetailsDispatch: () =>
    dispatch(MotorQuotationAction.ClearMotQuoteDetailsAction())
})

export default connect(mapStateToProps, mapDispatchToProps)(FormVehicleDetails)

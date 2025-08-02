import React, { Fragment, useEffect, useState, useRef } from 'react'
import _ from 'lodash'
import moment from 'moment'
import { connect, shallowEqual, useSelector } from 'react-redux'
import { Grid, Button, CircularProgress } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import Mtextbox from '../../../../app/form-controls/Mtextbox'
import Mselect from '../../../../app/form-controls/Mselect'
import Mdatepicker from '../../../../app/form-controls/Mdatepicker'
import Mswitch from '../../../../app/form-controls/Mswitch'
import Mcheckboxs from '../../../../app/form-controls/Mcheckboxs'
import ValidateNotify from '../../../../app/widgets/ValidateNotify'
import CustomBackdrop from '../../../../app/backdrop/CustomBackdrop'
import {
  VehicleDropdownActions,
  MotorQuotationAction
} from '../../../../store/actions/index'
import {
  preventIfNotNumber,
  handleTrimWhiteSpace,
  handleTrimWhiteSpaceOnly,
  removeErrString,
  getSessionStorage,
  preventIfNotAlphaNumric,
  removeComma,
  checkResFailed
} from '../../../../helpers/helper'
import { ShowField } from '../../../../app/uiComponents'
import { MOTOR_FORM, GRANTED_USERS } from '../../../../helpers/constants'

const fetchDefaults = (role) => {
  const customerDefault = {
    PurchaseType: '',
    PolicyType: '',
    Make: '',
    Model: '',
    SubModel: '',
    EngineCapacity: '',
    RegMon: '',
    RegNo: '',
    VhType: '',
    NoOfSeats: '',
    VhKeptIn: '',
    SumInsured: '',
    TrSumIns: '0',
    VolXs: '0',
    SecAlrm: '',
    RegFeeIncEst: '',
    IsVat: ''
  }
  const brokerDefault = {
    PurchaseType: '',
    PolicyType: '',
    Make: '',
    Model: '',
    SubModel: '',
    EngineCapacity: '',
    RegMon: '',
    RegNo: '',
    VhType: '',
    NoOfSeats: '',
    VhKeptIn: '',
    SumInsured: '',
    TrSumIns: '0',
    VolXs: '0',
    SecAlrm: '',
    RegFeeIncEst: '',
    IsVat: ''
  }
  const agentDefault = {
    PurchaseType: '',
    PolicyType: '',
    Make: '',
    Model: '',
    SubModel: '',
    EngineCapacity: '',
    RegMon: '',
    RegNo: '',
    VhType: '',
    NoOfSeats: '',
    VhKeptIn: '',
    SumInsured: '',
    TrSumIns: '0',
    VolXs: '0',
    SecAlrm: '',
    RegFeeIncEst: '',
    IsVat: ''
  }

  if (role === 'customer') {
    return customerDefault
  } else if (role === 'broker') {
    return brokerDefault
  } else if (role === 'agent') {
    return agentDefault
  }
}

const defaultData = {
  PurchaseType: '',
  PolicyType: '',
  Make: '',
  Model: '',
  SubModel: '',
  EngineCapacity: '',
  RegMon: '',
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
  CHASSIS: '',
  OWNER: '',
  REGTYPE: '',
  OwnerName: '',
  ADDR1: '',
  OWNER: '',
  LienADDR1: '',
  RALLYIND: '',
  GOODCARIND: '',
  PASSHIRE: '',
  MTTRADEIND: ''
}

const FormVehicleDetails = props => {
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
  const {
    control,
    watch,
    handleSubmit,
    setValue,
    getValues,
    formState,
    reset
  } = useForm({
    // defaultValues: fetchDefaults(authRole)
    defaultValues: defaultData

  })
  const didMount = useRef(false)
  const summaryPage = fromPage === 'summary'
  const policyData = VehicleMatrixData && VehicleMatrixData ? VehicleMatrixData : {}
  const [errorPop, setErrorPop] = useState(false)
  const [state, setState] = useState({
    personalData: {}
  })
  const { errors } = formState
  const personalData = state?.personalData
  const personalPayload = _.omit(personalData, ['DTBIRTH'])
  const DTBIRTH = personalData?.DTBIRTH?.replace(/\s+/g, '')
  const PolicyWatcher = watch('PolicyType')
  const policyValue = getValues('PolicyType')
  const MakeWatcher = watch('Make')
  const makeValue = getValues('Make')
  const countryValue = getValues('country')
  const ModelWatcher = watch('Model')
  const modelValue = getValues('Model')
  const monthWatcher = watch('RegMon')
  const monthValue = getValues('RegMon')
  const regMonthVal = moment(monthValue).format('MM')
  const regYrVal = moment(monthValue).format('YYYY')

  const clearNotify = () => {
    setErrorPop(false)
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
      OTHOCCUPATION: data.OTHOCCUPATION ? data.OTHOCCUPATION : '',
      TrSumIns: removeComma(data.TrSumIns),
      VolXs: data.VolXs,
      DTBIRTH: moment(DTBIRTH).format('DD/MM/YYYY'),
      TOTNOCLMS: 0
    }
    saveFormDispatch(data)
    putVechileDispatch(payload)
  }
  const resetTheValues = item => {
    const cDate = moment().set({ year: item.RegYr, month: item.RegMon })
    if (item.Make && item.Make) {
      reset(formValues => ({
        ...formValues,
        PurchaseType: item.PurchaseType,
        PolicyType: item.PolicyType,
        Make: item.Make,
        Model: item.Model,
        SubModel: item.SubModel,
        EngineCapacity: item.EngineCapacity,
        RegMon: cDate,
        RegNo: item.RegNo,
        VhType: item.VhType,
        NoOfSeats: item.NoOfSeats,
        VhKeptIn: item.VhKeptIn,
        SumInsured: item.SumInsured,
        TrSumIns: item.TrSumIns,
        VolXs: item.VolXs,
        SecAlrm: item.SecAlrm === 'Y'
        // RegFeeIncEst: item.RegFeeIncEst === 'Y' ? true : false,
        // IsVat: item.IsVat === 'Y' ? true : false,
      }))
    }
  }

  useEffect(() => {
    if (_.size(errors)) {
      setErrorPop(true)
    }
  }, [errors])

  useEffect(() => {
    getPurchaseTypeDropdownDispatch()
    getPolicyTypeDropdownDispatch()
    getVehicleTypeDropdownDispatch()
    getNoOfSeatsDropdownDispatch()
    getVehicleKeptInDropdownDispatch()
    getVoluntaryXSDropdownDispatch()
  }, [])

  useEffect(() => {
    const motorQuoteNo = getSessionStorage(MOTOR_FORM.QUOTE_NUMBER)
    if (motorQuoteNo && motorQuoteNo) {
      getQuoteDetailsDispatch(motorQuoteNo)
    }
  }, [])

  useEffect(() => {
    if (didMount.current && getQuoteDetailsStatus === 'success') {
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
  }, [MakeWatcher])

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
      getMotorMatrixDropdownDispatch(params)
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
      <form onSubmit={handleSubmit(onSubmit)}>
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
                      name='country'
                      label='Country Of Origin'
                      control={control}
                      options={CountryOfOriginData && CountryOfOriginData}
                      optionsLabel='COUNTRY'
                      optionsValue='COUNTRY'
                      grantedUsers={GRANTED_USERS.BROKER}
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
                      options={makeData && makeData}
                      optionsLabel='CARMAKE'
                      optionsValue='CARMAKE'
                      grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                      userType={authRole}
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
                      options={modelData && modelData}
                      optionsLabel='CARMODEL'
                      optionsValue='CARMODEL'
                      grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                      userType={authRole}
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
                      options={subModelData && subModelData}
                      optionsLabel='CARMODNAME'
                      optionsValue='CARMODNAME'
                      grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                      userType={authRole}
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
                onKeyPress={e => {
                  preventIfNotNumber(e)
                }}
                onBlur={e => {
                  handleTrimWhiteSpace(e, 'EngineCapacity', setValue)
                }}
                grantedUsers={GRANTED_USERS.AGENT_CUSTOMER}
                userType={authRole}
                maxLength={5}
                req
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
                      minDate={moment().subtract(500, 'years')}
                      maxDate={new Date()}
                      grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                      userType={authRole}
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
                      options={vehicleTypeData && vehicleTypeData}
                      optionsLabel='VEHICLETYPE'
                      optionsValue='VEHICLETYPECODE'
                      grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
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
                      options={noOfSeatsData && noOfSeatsData}
                      optionsLabel='NOOFSEATCODE'
                      optionsValue='SWNNOOFSEATID'
                      grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                      userType={authRole}
                      maxLength={5}
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
                      onKeyPress={e => {
                        preventIfNotAlphaNumric(e)
                      }}
                      onBlur={e => {
                        handleTrimWhiteSpace(e, 'RegNo', setValue)
                      }}
                      grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                      userType={authRole}
                      maxLength={10}
                    // req
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
                      options={vehicleKeptInData && vehicleKeptInData}
                      optionsLabel='VEHICLEKEPT'
                      optionsValue='VEHICLEKEPT'
                      grantedUsers={GRANTED_USERS.BROKER}
                      userType={authRole}
                      req
                    />
                    <Mtextbox
                      xs={12} sm={6} md={6}
                      name='SumInsured'
                      label='Sum Insured'
                      control={control}
                      onBlur={e => {
                        handleTrimWhiteSpace(e, 'SumInsured', setValue)
                      }}
                      setThousandSeparator
                      maxLength={9}
                      grantedUsers={GRANTED_USERS.BROKER}
                      userType={authRole}
                      req
                    />
                    <Mtextbox
                      xs={12} sm={6} md={6}
                      name='TrSumIns'
                      label='Trailer Sum Ins.'
                      control={control}
                      onKeyPress={e => {
                        preventIfNotNumber(e)
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
            </Grid>
          </Grid>
          <Grid item md={summaryPage ? 12 : 6}>
            <Grid container spacing={summaryPage ? 1 : 2}>
              <Grid item xs={12}>
                <h4 className='form-title-md'>&nbsp;</h4>
              </Grid>
              <ShowField
                show={authRole === 'agent'}
                yes={() => (
                  <>
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
                            options={vehicleKeptInData && vehicleKeptInData}
                            optionsLabel='VEHICLEKEPT'
                            optionsValue='VEHICLEKEPT'
                            grantedUsers={GRANTED_USERS.AGENT_CUSTOMER}
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
                            onBlur={e => {
                              handleTrimWhiteSpace(e, 'SumInsured', setValue)
                            }}
                            setThousandSeparator
                            maxLength={15}
                            grantedUsers={GRANTED_USERS.AGENT_CUSTOMER}
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
                            onKeyPress={e => {
                              preventIfNotNumber(e)
                            }}
                            setThousandSeparator
                            maxLength={15}
                            grantedUsers={GRANTED_USERS.AGENT_CUSTOMER}
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
              <ShowField
                show={policyData.COMPULSORY != 'N'}
                yes={() => (
                  <Mtextbox
                    xs={6}
                    name='compulsory_xs'
                    label='Compulsory XS'
                    control={control}
                    grantedUsers={GRANTED_USERS.BROKER}
                    userType={authRole}
                    req
                  />
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
                name='chasis_number'
                label='Chassis Number'
                control={control}
                grantedUsers={GRANTED_USERS.BROKER}
                userType={authRole}
              />

              <Mswitch
                xs={12}
                name='owner'
                label='Are you the owner of the motor vehicle and is it registered in your name?'
                control={control}
                grantedUsers={GRANTED_USERS.BROKER}
                userType={authRole}
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
                name='VolXs'
                label='Select'
                control={control}
                options={VoluntaryXSData && VoluntaryXSData}
                optionsLabel=''
                optionsValue=''
                defaultValues='2'
                grantedUsers={GRANTED_USERS.BROKER_CUSTOMER}
                userType={authRole}
              // req
              />

              <Mtextbox
                xs={12}
                name='owner_name'
                label='Name of registered owner'
                control={control}
                grantedUsers={GRANTED_USERS.BROKER}
                userType={authRole}
              />

              <Mtextbox
                xs={12}
                name='owner_address'
                label='Address of registered owner'
                control={control}
                grantedUsers={GRANTED_USERS.BROKER}
                userType={authRole}
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
                name='use_rallies'
                label='Will the motor car be used for rallies, competition, trails?'
                control={control}
                grantedUsers={GRANTED_USERS.BROKER}
                userType={authRole}
              />

              <Mswitch
                xs={12}
                name='use_goods'
                label='Will the motor car be used for carriage of goods for business or trade purposes?'
                control={control}
                grantedUsers={GRANTED_USERS.BROKER}
                userType={authRole}
              />

              <Mswitch
                xs={12}
                name='use_passengers'
                label='Will the motor car be used for carriage of passengers for hire or reward?'
                control={control}
                grantedUsers={GRANTED_USERS.BROKER}
                userType={authRole}
              />

              <Mswitch
                xs={12}
                name='use_trade'
                label='Will the motor car be used in connection with the motor trade?'
                control={control}
                grantedUsers={GRANTED_USERS.BROKER}
                userType={authRole}
              />

              <Mswitch
                xs={12}
                name='RegFeeIncEst'
                label='Is registration fees included in “ESTIMATE OF PRESENT VALUE”?'
                control={control}
                grantedUsers={GRANTED_USERS.AGENT_BROKER}
                userType={authRole}
              />

              <Mswitch
                xs={12}
                name='IsVat'
                label='Is VAT included in “ESTIMATE OF PRESENT VALUE”?'
                control={control}
                grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                userType={authRole}
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
            <Button variant='contained' color='primary' type='submit'>
              {postVehicleInfoLoading
                ? (
                  <CircularProgress size={18} style={{ color: '#ffffff' }} />
                  )
                : (
                    summaryPage ? 'Submit' : 'Next'
                  )}
            </Button>
            {/* <Button variant="contained" color="primary"
              onClick={() => {
                next()
              }}
            >Next</Button> */}
          </Grid>
        </Grid>
      </form>
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

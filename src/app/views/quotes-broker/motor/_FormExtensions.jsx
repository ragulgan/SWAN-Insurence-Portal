import React, { useEffect, useState, useRef } from 'react'
import { connect, useSelector, shallowEqual } from 'react-redux'
import { Grid, Button, CircularProgress, makeStyles } from '@material-ui/core'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import _ from 'lodash'
import Icofont from 'react-icofont'
import Mselect from '../../../../app/form-controls/Mselect'
import Mswitch from '../../../../app/form-controls/Mswitch'
import ValidateNotify from '../../../../app/widgets/ValidateNotify'
import CustomBackdrop from '../../../../app/backdrop/CustomBackdrop'
import InfoPopup from '../../../../app/widgets/InfoPopup'
import { ShowField } from '../../../../app/uiComponents'
import {
  ExtensionDropdownActions,
  MotorQuotationAction,
  VehicleDropdownActions
} from '../../../../store/actions/index'
import {
  setSessionStorage,
  getSessionStorage,
  removeErrString,
  setLocalStorage,
  checkResFailed,
  functionallyOnclick
  , thousandSeparatorByValue
} from '../../../../helpers/helper'
import { MOTOR_FORM, GRANTED_USERS, VARIABLES } from '../../../../helpers/constants'
import moment from 'moment'

const useStyles = makeStyles((theme) => ({
  BtnDisable: {
    backgroundColor: 'rgba(0, 0, 0, 0.26)',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.26)'
    }
  }
}
))

const fetchDefaults = (role) => {
  const customerDefault = {
    LossOfUse: '',
    AICCover: '',
    AICOPTION: '',
    DriverAtFault: '',
    Replacement: false,
    ExcessWaiver: false,
    AlloyWheel: false,
    SwanAGreedRepair: false,
    PassiveTerror: '',
    RodantDamage: '',
    FinGap: false,
    Vh_Brk_Fee: false
  }
  const brokerDefault = {
    LossOfUse: '',
    AICCover: '',
    AICOPTION: '',
    DriverAtFault: '',
    Replacement: false,
    ExcessWaiver: false,
    AlloyWheel: false,
    SwanAGreedRepair: false,
    PassiveTerror: '',
    RodantDamage: '',
    FinGap: false,
    Vh_Brk_Fee: false
  }
  const agentDefault = {
    LossOfUse: '',
    AICCover: '',
    AICOPTION: '',
    DriverAtFault: '',
    Replacement: false,
    ExcessWaiver: false,
    AlloyWheel: false,
    SwanAGreedRepair: false,
    PassiveTerror: '',
    RodantDamage: '',
    FinGap: false,
    Vh_Brk_Fee: false
  }

  if (role === 'customer') {
    return customerDefault
  } else if (role === 'broker') {
    return brokerDefault
  } else if (role === 'agent') {
    return agentDefault
  }
}
const FormExtensions = props => {
  const { authRole, loggedUser, loggedAgency, loggedCompany } = useSelector(
    ({ Auth, Quotation }) => ({
      authRole: Auth.authRole,
      loggedUser: Quotation.loggedUser,
      loggedAgency: Quotation.loggedAgency,
      loggedCompany: Quotation.loggedCompany
    }),
    shallowEqual
  )

  const {
    activeQuote, // From local storage
    quoteNumber,  // From url query params
    fromPage,
    back,
    next,
    changeStep,
    getLimitDaysDropdownDispatch,
    ClearMotQuoteDetailsDispatch,
    getRodentDamageDropdownDispatch,
    getCompensationDropdownDispatch,
    getAicCoverDropdownDispatch,
    limitDaysData,
    rodentDamgeData,
    rodentDamgeStatus,
    compensationData,
    aicCoverData,
    postExtensionInfoDispatch,
    clearPostExtensionInfoDispatch,
    postExtensionInfoLoading,
    postExtensionInfoStatus,
    postExtensionInfoData,
    getQuoteDetailsDispatch,
    getQuoteDetailsLoading,
    getQuoteDetailsStatus,
    getQuoteDetails,
    getMotorMatrixDropdownDispatch,
    ClearMotorMatrixDispatch,
    getMotorMatrixLoading,
    motorMatrixData,
    getVehicleMatrixDropdownDispatch,
    VehicleMatrixData,
    motorMatrixStatus
  } = props
  const { control, handleSubmit, formState, reset, getValues, watch, clearErrors } = useForm({
    defaultValues: fetchDefaults(authRole),
    isValid
  })

  const [errorPop, setErrorPop] = useState(false)
  const [extensionData, setExtensionData] = useState()
  const [state, setState] = useState({
    personalData: {},
    vehicleDetails: {},
    extensionDetails: {},
    checkPremium: false,
    hasMatrixCalled: true,
    setNext: false,
    motorMatrix: {},
    resetMotorMatrix: false
  })
  const didMount = useRef(false)
  const classes = useStyles()
  const { errors, isValid } = formState
  const summaryPage = fromPage === 'summary'
  const personalInfoData = state?.personalData
  const vehicleDetailsData = state?.vehicleDetails
  const extensionDetailsData = state?.extensionDetails
  const personalPayload = _.omit(personalInfoData, ['DTBIRTH', 'EML'])
  const DTBIRTH = personalInfoData?.DTBIRTH?.replace(/\s+/g, '')  
  const policyData = VehicleMatrixData && VehicleMatrixData ? VehicleMatrixData : {}
  const message = 'Please fill in required information to proceed'

  //const QuoteId = getSessionStorage(MOTOR_FORM.QUOTE_NUMBER)

  watch('LossOfUse')
  watch('PassiveTerror')
  watch('RodantDamage')
  watch('FinGap')
  watch('SwanAGreedRepair')
  watch('Vh_Brk_Fee')
  const LossOfUseValue = getValues('LossOfUse')
  const PassiveTerrorValue = getValues('PassiveTerror')
  const RodantDamageValue = getValues('RodantDamage')
  const FinGapValue = getValues('FinGap')
  const SwanAGreedRepairValue = getValues('SwanAGreedRepair')
  const BreakdownServiceValue = getValues('Vh_Brk_Fee')
  const plan_id = getSessionStorage(VARIABLES.PLAN_ID)
  const PolicyType = vehicleDetailsData &&
    vehicleDetailsData.PolicyType
    ? vehicleDetailsData.PolicyType
    : ''

  const onSubmit = formData => {
    const payload = {
      ...personalPayload,
      ...vehicleDetailsData,
      ...formData,
      PassiveTerror: formData.PassiveTerror === true ? 'Y' : 'N',
      RodantDamage: formData.RodantDamage === true
        ? 'Y'
        : formData.RodantDamage === false ? 'N' : formData.RodantDamage,
      LossOfUse: true,
      AICCover: true,
      LmtAmt: formData.LossOfUse.split('/')?.[1].match(/\d+/g)?.[0],
      LmtDays: formData.LossOfUse.split('/')?.[0].match(/\d+/g)?.[0],
      PurchaseType: {
        value: `${vehicleDetailsData?.PurchaseType === 'Second Hand' ? 'Y' : 'N'}`,
        type: vehicleDetailsData?.PurchaseType
      },
      DTBIRTH: moment(DTBIRTH).format('DD/MM/YYYY'),
      NoOfSeats: vehicleDetailsData?.NoOfSeats && vehicleDetailsData?.NoOfSeats != 0
        ? vehicleDetailsData?.NoOfSeats?.toString()
        : '5',
      AUTOAPP: state.setNext === true ? true : false
    }
    setExtensionData(payload)
    postExtensionInfoDispatch(payload)
  }

  const resetTheMotorValues = (getMotMatrix) => {
    reset(formValues => ({
      ...formValues,
      LossOfUse: getMotMatrix?.limitDays &&
        getMotMatrix.limitDays.value
        ? getMotMatrix.limitDays.value
        : '',
      AICOPTION: getMotMatrix?.aicCover &&
        getMotMatrix.aicCover.value
        ? getMotMatrix.aicCover.value
        : '',
      DriverAtFault: getMotMatrix.faultCompensation &&
        getMotMatrix.faultCompensation.value
        ? getMotMatrix.faultCompensation &&
        getMotMatrix.faultCompensation.value
        : '',
      Replacement: !!(getMotMatrix?.replacement &&
        getMotMatrix.replacement.value === 'Y'),
      ExcessWaiver: !!(getMotMatrix?.excessWaiver &&
        getMotMatrix.excessWaiver.value === 'Y'),
      AlloyWheel: !!(getMotMatrix?.alloyWheel &&
        getMotMatrix.alloyWheel.value === 'Y'),
      SwanAGreedRepair: !!(getMotMatrix?.swanAgreedRepair &&
        getMotMatrix.swanAgreedRepair.value === 'Y'),
      PassiveTerror: getMotMatrix?.PassiveTerror &&
        getMotMatrix.PassiveTerror.value,
      RodantDamage: (_.isEmpty(getMotMatrix?.rodentDamage)) ||
        ['Y', 'N'].includes(getMotMatrix?.rodentDamage)
        ? getMotMatrix?.rodentDamage === 'Y'
        : getMotMatrix.rodentDamage.value,
      FinGap: getMotMatrix?.FinGap &&
        getMotMatrix.FinGap.value,
      Vh_Brk_Fee: !!(getMotMatrix?.swnBreakdown &&
        getMotMatrix.swnBreakdown.value === 'Y')
    }))
  }

  const resetTheValues = item => {
    reset(formValues => ({
      ...formValues,
      LossOfUse: item.LmtDays && item.LmtAmt !== 0 ? `${item.LmtDays} DAYS / RS ${item.LmtAmt}` : '',
      AICOPTION: item.AICOPTION,
      DriverAtFault: item.DriverAtFault,
      Replacement: item.Replacement,
      ExcessWaiver: item.ExcessWaiver,
      AlloyWheel: item.AlloyWheel,
      SwanAGreedRepair: item.SwanAGreedRepair,
      PassiveTerror: item.PassiveTerror === 'Y',
      FinGap: item.FinGap,
      Vh_Brk_Fee: item.Vh_Brk_Fee,
      RodantDamage: ['Y', 'N'].includes(item.RodantDamage)
        ? item.RodantDamage === 'Y'
        : item.RodantDamage
    }))
  }
  const debounceFun = _.debounce(() => {
    functionallyOnclick('submit-btn')
  }, 300)

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (didMount.current && type === 'change') {
        debounceFun()
        setState(prevState => ({
          ...prevState,
          setNext: false
        }))
      }
    })
    return () => subscription.unsubscribe()
  }, [watch])

  useEffect(() => {
    if (postExtensionInfoStatus === 'success' && !checkResFailed(postExtensionInfoData)) {
      if (state.setNext) {
        toast.success('Extension informations have been saved!', {
          duration: 3000
        })
      }
      clearPostExtensionInfoDispatch()
      setLocalStorage(
        MOTOR_FORM.SET_FORM_DATA,
        JSON.stringify(extensionData)
      )
      if (!state.setNext) {
        //getQuoteDetailsDispatch(activeQuote)
      } else {
        !summaryPage && next()
      }
    } else if (postExtensionInfoStatus === 'error' || checkResFailed(postExtensionInfoData)) {
      postExtensionInfoData === "F-Conversion from type 'DBNull' to type 'String' is not valid."
        ? toast.error('Internal Server Error. Please Try again later.')
        : toast.error(removeErrString(postExtensionInfoData), { duration: 4000 })
      clearPostExtensionInfoDispatch()
    }
  }, [postExtensionInfoStatus])

  useEffect(() => {
    getCompensationDropdownDispatch()
    return () => {
      setState(prevState => ({
        ...prevState,
        hasMatrixCalled: true
      }))
    }
  }, [])

  useEffect(() => {
   if(activeQuote){
    getQuoteDetailsDispatch(activeQuote)
   }
   else if(quoteNumber){
    getQuoteDetailsDispatch(quoteNumber)
   }

  }, [activeQuote, quoteNumber])

  useEffect(() => {
    if (didMount.current && motorMatrixStatus === 'success' && motorMatrixData) {
      setState(prevState => ({
        ...prevState,
        motorMatrix: motorMatrixData
      }))
      if (state.resetMotorMatrix) {
        resetTheMotorValues(motorMatrixData)
      }
      if (_.isEmpty(errors)) {
        debounceFun()
      }
      setState(prevState => ({
        ...prevState,
        setNext: false
      }))
      ClearMotorMatrixDispatch()
    }
    if (getMotorMatrixLoading) {
      setState(prevState => ({
        ...prevState,
        hasMatrixCalled: false
      }))
    }
  }, [motorMatrixStatus, getMotorMatrixLoading])

  useEffect(() => {
    if (didMount.current && rodentDamgeStatus === 'success' && !state.resetMotorMatrix) {
      resetTheValues(state.extensionDetails)
    }
  }, [rodentDamgeStatus])

  useEffect(() => {
    if (getQuoteDetailsStatus === 'success') {
      const extension = getQuoteDetails &&
        getQuoteDetails.extension
        ? getQuoteDetails.extension
        : {}
      const vehicleDetails = getQuoteDetails &&
        getQuoteDetails.vehicleDetails
        ? getQuoteDetails.vehicleDetails
        : {}
      const personalInfo = getQuoteDetails &&
        getQuoteDetails.personalDetails
        ? getQuoteDetails.personalDetails
        : {}
      const currentPolcd = getQuoteDetails && getQuoteDetails?.vehicleDetails?.PolicyType
      if (vehicleDetails) {
        const checkExtension = extension && extension.AICOPTION
        setState(prevState => ({
          ...prevState,
          personalData: personalInfo,
          vehicleDetails,
          extensionDetails: extension,
          checkPremium: true,
          resetMotorMatrix: !checkExtension
        }))
        const policyParam = {
          polcd: getQuoteDetails?.vehicleDetails?.PolicyType
        }
        getRodentDamageDropdownDispatch(policyParam)
        getLimitDaysDropdownDispatch(policyParam)
        getAicCoverDropdownDispatch(policyParam)
        if (plan_id !== false || plan_id !== '00') {
          const param = {
            polcd: plan_id
          }
          getVehicleMatrixDropdownDispatch(param)
        }
        const polcd = getSessionStorage(MOTOR_FORM.EXTENSION_PLAN)
        if (polcd !== currentPolcd) {
          setSessionStorage(MOTOR_FORM.EXTENSION_PLAN, currentPolcd)
          setState(prevState => ({
            ...prevState,
            resetMotorMatrix: true
          }))
        } else {
          resetTheValues(getQuoteDetails?.extension)
        }
        const params = {
          polcd: plan_id,
          regMnt: getQuoteDetails && getQuoteDetails?.vehicleDetails?.RegMon,
          regYrs: getQuoteDetails && getQuoteDetails?.vehicleDetails?.RegYr
        }
        if (state.hasMatrixCalled) {
          getMotorMatrixDropdownDispatch(params)
        }
      }
      ClearMotQuoteDetailsDispatch()
    }
  }, [getQuoteDetailsStatus])

  const onError = (errors, e) => {
    if (!_.isEmpty(errors)) {
      setErrorPop(true)
    }
  }

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
            <CustomBackdrop isLoading={getQuoteDetailsLoading || getMotorMatrixLoading} />}
        />
        <Grid
          container
          direction='row'
          justifyContent='center'
          alignItems='flex-start'
          spacing={summaryPage ? 2 : 4}
        >
          <Grid item md={summaryPage ? 12 : 8}>
            <Grid
              container
              direction='row'
              justifyContent='center'
              alignItems='flex-start'
              spacing={5}
            >
              <Grid item md={summaryPage ? 12 : 6}>
                <Grid container spacing={summaryPage ? 1 : 2}>
                  <Grid item xs={12}>
                    <h4 className='form-title-md'>Extensions</h4>
                    <p>Extensions are included</p>
                  </Grid>

                  <Mselect
                    reset={reset}
                    xs={12}
                    name='LossOfUse'
                    label='Loss of use'
                    control={control}
                    clearErrors={clearErrors}
                    options={limitDaysData && limitDaysData}
                    optionsLabel='LUSEREF'
                    optionsValue='LUSEREF'
                    grantedUsers={GRANTED_USERS.BROKER}
                    userType={authRole}
                    readOnly={state.motorMatrix && state.motorMatrix?.limitDays &&
                      state.motorMatrix.limitDays.rule === 'default & read only' || postExtensionInfoLoading}
                    req
                  />
                  <Mselect
                    reset={reset}
                    xs={12}
                    name='AICOPTION'
                    label='AIC cover'
                    control={control}
                    clearErrors={clearErrors}
                    options={aicCoverData && aicCoverData}
                    optionsLabel='AICDESC'
                    optionsValue='AICOPTION'
                    grantedUsers={GRANTED_USERS.BROKER}
                    userType={authRole}
                    readOnly={state.motorMatrix && state.motorMatrix?.aicCover &&
                      state.motorMatrix.aicCover.rule === 'default & read only' || postExtensionInfoLoading}
                    req
                  />
                  <Mselect
                    reset={reset}
                    xs={12}
                    name='DriverAtFault'
                    label='Driver At-fault Compensation'
                    control={control}
                    clearErrors={clearErrors}
                    options={compensationData && compensationData}
                    optionsLabel='FAULTCOMPENSATION'
                    optionsValue='FAULTCOMPENSATIONID'
                    grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                    userType={authRole}
                    readOnly={state.motorMatrix && state.motorMatrix?.faultCompensation &&
                      state.motorMatrix.faultCompensation.rule === 'default & read only' || postExtensionInfoLoading}
                    req
                  />
                  <ShowField
                    show={policyData.REPLACEMENT === 'Y'}
                    yes={() => (
                      <>
                        <Mswitch
                          xs={12}
                          name='Replacement'
                          label='Replacement car following Breakdown'
                          control={control}
                          clearErrors={clearErrors}
                          grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                          userType={authRole}
                          disabled={state.motorMatrix && state.motorMatrix?.replacement &&
                            state.motorMatrix.replacement.rule === 'default & read only' || postExtensionInfoLoading}
                        />
                      </>
                    )}
                    no={() => null}
                  />
                  <ShowField
                    show={policyData.EXCESSWAIVER === 'Y'}
                    yes={() => (
                      <>
                        <Mswitch
                          xs={12}
                          name='ExcessWaiver'
                          label='Excess Waiver'
                          control={control}
                          clearErrors={clearErrors}
                          grantedUsers={GRANTED_USERS.AGENT_BROKER}
                          userType={authRole}
                          disabled={state.motorMatrix && state.motorMatrix?.excessWaiver &&
                            state.motorMatrix.excessWaiver.rule === 'default & read only' || postExtensionInfoLoading}
                        />
                      </>
                    )}
                    no={() => null}
                  />
                  <ShowField
                    show={policyData.ALLOYWHEEL === 'Y'}
                    yes={() => (
                      <>
                        <Mswitch
                          xs={12}
                          name='AlloyWheel'
                          label='Alloy Wheel'
                          control={control}
                          clearErrors={clearErrors}
                          grantedUsers={GRANTED_USERS.AGENT_BROKER}
                          userType={authRole}
                          disabled={state.motorMatrix && state.motorMatrix?.alloyWheel &&
                            state.motorMatrix.alloyWheel.rule === 'default & read only' || postExtensionInfoLoading}
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
                    <h4 className='form-title-md'>Extras</h4>
                  </Grid>
                  <ShowField
                    show={policyData.RODENTDAMAGE !== 'N'}
                    yes={() => (
                      <>
                        <ShowField
                          show={['91', '92', '94', '96', '97', '98'].includes(PolicyType)}
                          yes={() => (
                            <Mselect
                              reset={reset}
                              xs={12}
                              name='RodantDamage'
                              label='Rodent Damage'
                              control={control}
                              clearErrors={clearErrors}
                              options={rodentDamgeData && rodentDamgeData}
                              optionsLabel='RODPREM'
                              optionsValue='RODENTIND'
                              grantedUsers={GRANTED_USERS.AGENT_BROKER}
                              userType={authRole}
                              readOnly={state.motorMatrix && state.motorMatrix?.rodentDamage &&
                                state.motorMatrix.rodentDamage.rule === 'default & read only' || postExtensionInfoLoading}
                              req
                            />
                          )}
                          no={() => (
                            <Mswitch
                              xs={12}
                              name='RodantDamage'
                              label='Rodent Damage'
                              control={control}
                              clearErrors={clearErrors}
                              info='RodantDamage'
                              grantedUsers={GRANTED_USERS.AGENT_BROKER}
                              userType={authRole}
                              disabled={state.motorMatrix && state.motorMatrix?.RodantDamage &&
                                state.motorMatrix.RodantDamage.rule === 'default & read only' || postExtensionInfoLoading}
                              req
                            />
                          )}
                        />
                      </>
                    )}
                    no={() => null}
                  />
                  <ShowField
                    show={policyData.FINGAP === 'Y'}
                    yes={() => (
                      <>
                        <Mswitch
                          xs={12}
                          name='FinGap'
                          label='Finance Gap'
                          control={control}
                          clearErrors={clearErrors}
                          info='Finance Gap'
                          grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                          userType={authRole}
                          disabled={state.motorMatrix && state.motorMatrix?.FinGap &&
                            state.motorMatrix.FinGap.rule === 'default & read only' || postExtensionInfoLoading}
                        />
                      </>
                    )}
                    no={() => null}
                  />
                  <ShowField
                    show={policyData.PASSIVETERRORISM === 'Y'}
                    yes={() => (
                      <>
                        <Mswitch
                          xs={12}
                          name='PassiveTerror'
                          label='Passive Terrorism'
                          control={control}
                          clearErrors={clearErrors}
                          info='Passive Terrorism '
                          grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                          userType={authRole}
                          disabled={state.motorMatrix && state.motorMatrix?.PassiveTerror &&
                            state.motorMatrix.PassiveTerror.rule === 'default & read only' || postExtensionInfoLoading}
                        />
                      </>
                    )}
                    no={() => null}
                  />
                  <ShowField
                    show={policyData.SWANAGREEDREPAIR === 'Y'}
                    yes={() => (
                      <>
                        <Mswitch
                          xs={12}
                          name='SwanAGreedRepair'
                          label='Swan Agreed Repairer'
                          control={control}
                          clearErrors={clearErrors}
                          info='Swan Agreed Repairer'
                          grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                          userType={authRole}
                          disabled={state.motorMatrix && state.motorMatrix?.swanAgreedRepair &&
                            state.motorMatrix.swanAgreedRepair.rule === 'default & read only' || postExtensionInfoLoading}
                        />
                      </>
                    )}
                    no={() => null}
                  />
                  <ShowField
                    show={policyData.BREAKDOWN === 'Y'}
                    yes={() => (
                      <>
                        <Mswitch
                          xs={12}
                          name='Vh_Brk_Fee'
                          label='Breakdown Service'
                          control={control}
                          clearErrors={clearErrors}
                          info='Breakdown Service'
                          grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                          userType={authRole}
                          disabled={state.motorMatrix && state.motorMatrix?.swnBreakdown &&
                            state.motorMatrix.swnBreakdown.rule === 'default & read only' || postExtensionInfoLoading}
                        />
                      </>
                    )}
                    no={() => null}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={summaryPage ? 12 : 4} sm={12}>
            <ShowField
              show={!summaryPage}
              yes={() => (
                <>
                  <section className='summary-box bl'>
                    <div className='txt-center'>
                      <h4 className='summary-title'>
                        MOTOR SUMMARY{' '}
                        <InfoPopup info='The switching component A switching component is a component that renders one of many components.' />
                      </h4>
                      <h5>Total</h5>
                      <h4 className='summary-heading'>
                        Rs  {extensionDetailsData &&
                          extensionDetailsData.NETPREM
                          ? thousandSeparatorByValue(extensionDetailsData.NETPREM)
                          : '0'}
                      </h4>
                    </div>
                    <ul className='summary-ul bb'>
                      <div>
                        <h4 className='summary-heading-alt'>
                          Vehicle Details{' '}
                          <span>
                            <Icofont
                              icon='pencil'
                              onClick={() => changeStep(1)}
                            />
                          </span>
                        </h4>
                      </div>
                      <li>
                        Make
                        <span>
                          {vehicleDetailsData && vehicleDetailsData.Make
                            ? vehicleDetailsData.Make
                            : '--'}
                        </span>
                      </li>
                      <li>
                        Model
                        <span>
                          {vehicleDetailsData && vehicleDetailsData.Model
                            ? vehicleDetailsData.Model
                            : '--'}
                        </span>
                      </li>
                      <li>
                        Sub Model
                        <span>
                          {vehicleDetailsData && vehicleDetailsData
                            ? vehicleDetailsData.Make
                            : '--'}
                        </span>
                      </li>
                      <li>
                        Engine Capacity
                        <span>
                          {vehicleDetailsData && vehicleDetailsData.EngineCapacity
                            ? vehicleDetailsData.EngineCapacity
                            : '--'}
                          cc
                        </span>
                      </li>
                      <li>
                        Reg. Month/Year
                        <span>
                          {vehicleDetailsData
                            ? `${vehicleDetailsData.RegMon} /
                      ${vehicleDetailsData.RegYr}`
                            : '--'}
                        </span>
                      </li>
                    </ul>
                  </section>
                  <section className='summary-box bl'>
                    <ul className='summary-ul bb'>
                      <div>
                        <h4 className='summary-heading-alt'>
                          Fees Breakdown{' '}
                        </h4>
                      </div>
                      <ShowField
                        show={LossOfUseValue}
                        yes={() => (
                          <>
                            <li>
                              Loss of use
                              <span>
                                {extensionDetailsData &&
                                  extensionDetailsData.luseprem
                                  ? extensionDetailsData.luseprem
                                  : '0'}
                              </span>
                            </li>
                          </>
                        )}
                        no={() => null}
                      />
                      <ShowField
                        show={PassiveTerrorValue}
                        yes={() => (
                          <>
                            <li>
                              Passive terrorism
                              <span>
                                {extensionDetailsData &&
                                  extensionDetailsData.PASTERPREM
                                  ? extensionDetailsData.PASTERPREM
                                  : '0'}
                              </span>
                            </li>
                          </>
                        )}
                        no={() => null}
                      />
                      <ShowField
                        show={RodantDamageValue}
                        yes={() => (
                          <>
                            <li>
                              Rodent Damage
                              <span>
                                {extensionDetailsData &&
                                  extensionDetailsData.RODENTPREM
                                  ? extensionDetailsData.RODENTPREM
                                  : '0'}
                              </span>
                            </li>
                          </>
                        )}
                        no={() => null}
                      />
                      <ShowField
                        show={FinGapValue}
                        yes={() => (
                          <>
                            <li>
                              Finance gap
                              <span>
                                {extensionDetailsData &&
                                  extensionDetailsData.FGAPPREM
                                  ? extensionDetailsData.FGAPPREM
                                  : '0'}
                              </span>
                            </li>
                          </>
                        )}
                        no={() => null}
                      />
                      <ShowField
                        show={SwanAGreedRepairValue}
                        yes={() => (
                          <>
                            <li>
                              Swan Agreed Repairer
                              <span>
                                {extensionDetailsData &&
                                  extensionDetailsData.MKGDISCAMT
                                  ? extensionDetailsData.MKGDISCAMT
                                  : '0'}
                              </span>
                            </li>
                          </>
                        )}
                        no={() => null}
                      />
                      <ShowField
                        show={BreakdownServiceValue}
                        yes={() => (
                          <>
                            <li>
                              Breakdown Service
                              <span>
                                {extensionDetailsData &&
                                  extensionDetailsData.BRSFEES
                                  ? extensionDetailsData.BRSFEES
                                  : '0'}
                              </span>
                            </li>
                          </>
                        )}
                        no={() => null}
                      />
                    </ul>
                  </section>
                </>
              )}
              no={() => null}
            />
          </Grid>
          <Grid item md={summaryPage ? 12 : 8}>
            <ValidateNotify show={errorPop} errors={message} clear={setErrorPop} />
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
          <input type='submit' id='submit-btn' name='button_1' className='d-none' value='Click me' />
          <Button
            variant='contained'
            color='primary'
            type='submit'
            // id='submit-btn'
            onClick={() => {
              setState(prevState => ({
                ...prevState,
                setNext: true
              }))
            }}
            className={!errors || !isValid ? classes.BtnDisable : ''}
          >
            {postExtensionInfoLoading
              ? (
                <CircularProgress size={18} style={{ color: '#ffffff' }} />
              )
              : (
                summaryPage ? 'Submit' : 'Next'
              )}
          </Button>
        </Grid>
      </form>
    </>
  )
}

const mapStateToProps = state => {
  const { ExtensionDropdown, MotorQuotation, MotorPlan, VehicleDropdown } = state
  return {
    getLimitDaysLoading: ExtensionDropdown.getLimitDaysLoading,
    limitDaysData: ExtensionDropdown.limitDaysData,
    getRodentDamageLoading: ExtensionDropdown.getRodentDamageLoading,
    rodentDamgeData: ExtensionDropdown.rodentDamgeData,
    rodentDamgeStatus: ExtensionDropdown.rodentDamgeStatus,
    getCompensationLoading: ExtensionDropdown.getCompensationLoading,
    compensationData: ExtensionDropdown.compensationData,
    getAicCoverLoading: ExtensionDropdown.getAicCoverLoading,
    aicCoverData: ExtensionDropdown.aicCoverData,
    postExtensionInfoLoading: MotorQuotation?.postExtensionInfoLoading,
    postExtensionInfoData: MotorQuotation?.postExtensionInfoData,
    postExtensionInfoStatus: MotorQuotation?.postExtensionInfoStatus,
    postExtensionInfomessage: MotorQuotation?.postExtensionInfomessage,
    getQuoteDetails: MotorQuotation?.getQuoteDetails,
    getQuoteDetailsLoading: MotorQuotation?.getQuoteDetailsLoading,
    getQuoteDetailsStatus: MotorQuotation?.getQuoteDetailsStatus,
    tempFormData: MotorQuotation?.tempFormData,
    getMotorMatrixLoading: MotorQuotation.getMotorMatrixLoading,
    motorMatrixData: MotorQuotation.motorMatrixData,
    motorMatrixStatus: MotorQuotation.motorMatrixStatus,
    getVehicleMatrixLoading: VehicleDropdown.getVehicleMatrixLoading,
    VehicleMatrixData: VehicleDropdown.VehicleMatrixData
  }
}

const mapDispatchToProps = dispatch => ({
  getLimitDaysDropdownDispatch: params =>
    dispatch(ExtensionDropdownActions.getLimitDaysRequest(params)),
  getVehicleTypeDropdownDispatch: params =>
    dispatch(VehicleDropdownActions.getVehicleTypeRequest(params)),
  getRodentDamageDropdownDispatch: params =>
    dispatch(ExtensionDropdownActions.getRodentDamageRequest(params)),
  getCompensationDropdownDispatch: params =>
    dispatch(ExtensionDropdownActions.getCompensationRequest(params)),
  getAicCoverDropdownDispatch: params =>
    dispatch(ExtensionDropdownActions.getAicCoverRequest(params)),
  postExtensionInfoDispatch: formData =>
    dispatch(MotorQuotationAction.PostExtensionDetailsAction(formData)),
  clearPostExtensionInfoDispatch: formData =>
    dispatch(MotorQuotationAction.ClearPostExtensionInfoAction(formData)),
  getQuoteDetailsDispatch: id =>
    dispatch(MotorQuotationAction.GetQuoteDetailsAction(id)),
  getMotorMatrixDropdownDispatch: params =>
    dispatch(MotorQuotationAction.getMotorMatrixRequest(params)),
  ClearMotorMatrixDispatch: () =>
    dispatch(MotorQuotationAction.getMotorMatrixClear()),
  SaveMotorFormAction: data =>
    dispatch(MotorQuotationAction.SaveMotorFormAction(data)),
  ClearMotQuoteDetailsDispatch: () =>
    dispatch(MotorQuotationAction.ClearMotQuoteDetailsAction()),
  getVehicleMatrixDropdownDispatch: params =>
    dispatch(VehicleDropdownActions.getVehicleMatrixRequest(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(FormExtensions)

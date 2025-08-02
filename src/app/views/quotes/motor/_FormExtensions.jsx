import React, { Fragment, useEffect, useState } from 'react'
import { connect, useSelector, shallowEqual } from 'react-redux'
import { Grid, Button, CircularProgress } from '@material-ui/core'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import _ from 'lodash'
import Icofont from 'react-icofont'
import Mtextbox from '../../../../app/form-controls/Mtextbox'
import Mselect from '../../../../app/form-controls/Mselect'
import Mswitch from '../../../../app/form-controls/Mswitch'
import ValidateNotify from '../../../../app/widgets/ValidateNotify'
import CustomBackdrop from '../../../../app/backdrop/CustomBackdrop'
import InfoPopup from '../../../../app/widgets/InfoPopup'
import { ShowField } from '../../../../app/uiComponents'
import {
  ExtensionDropdownActions,
  MotorQuotationAction,
  MotorPlanActions,
  VehicleDropdownActions
} from '../../../../store/actions/index'
import {
  getSessionStorage,
  getLocalStorage,
  removeErrString,
  setLocalStorage,
  checkResFailed
} from '../../../../helpers/helper'
import { MOTOR_FORM, GRANTED_USERS } from '../../../../helpers/constants'
import moment from 'moment'

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
    RodantDamage: 'N',
    FinGap: false,
    swnBreakdown: false
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
    RodantDamage: 'N',
    FinGap: false,
    swnBreakdown: false
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
    RodantDamage: 'N',
    FinGap: false,
    swnBreakdown: false
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
    getLimitDaysDropdownDispatch,
    ClearMotQuoteDetailsDispatch,
    getRodentDamageDropdownDispatch,
    getCompensationDropdownDispatch,
    getAicCoverDropdownDispatch,
    limitDaysData,
    rodentDamageData,
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
    getMotorMatrixLoading,
    motorMatrixData,
    postApproveStatusDispatch,
    clearApproveStatusDispatch,
    postApprovalStatusData,
    VehicleMatrixData
  } = props
  const { control, handleSubmit, formState, reset, getValues, watch } = useForm({
    defaultValues: fetchDefaults(authRole)
  })
  const [limitDaysArrData, setLimitDaysArrData] = useState(limitDaysData || [])
  const [errorPop, setErrorPop] = useState(false)
  const [extensionData, setExtensionData] = useState()
  const [state, setState] = useState({
    personalData: {},
    vehicleDetails: {},
    extensionDetails: {}
  })
  const { errors } = formState
  const summaryPage = fromPage === 'summary'
  const personalInfoData = state?.personalData
  const vehicleDetailsData = state?.vehicleDetails
  const personalPayload = _.omit(personalInfoData, ['DTBIRTH', 'EML'])
  const vehiclePayload = _.omit(vehicleDetailsData, ['SubModel', 'IsVat', 'EngineCapacity', 'SumInsured', 'TrSumIns', 'VolXs', 'TOTNOCLMS'])
  const DTBIRTH = personalInfoData?.DTBIRTH?.replace(/\s+/g, '')
  const email = personalInfoData?.EML?.replace(/\s+/g, '')
  const QuoteId = getSessionStorage(MOTOR_FORM.QUOTE_NUMBER)
  const policyData = VehicleMatrixData && VehicleMatrixData ? VehicleMatrixData : {}
  const loggedUser = getLocalStorage('logged_user')

  watch('LossOfUse')
  watch('PassiveTerror')
  watch('RodantDamage')
  watch('FinGap')
  watch('SwanAGreedRepair')
  watch('swnBreakdown')
  const LossOfUseValue = getValues('LossOfUse')
  const PassiveTerrorValue = getValues('PassiveTerror')
  const RodantDamageValue = getValues('RodantDamage')
  const FinGapValue = getValues('FinGap')
  const SwanAGreedRepairValue = getValues('SwanAGreedRepair')
  const BreakdownServiceValue = getValues('swnBreakdown')
  const message = 'Please fill in required information to proceed'
  const clearNotify = () => {
    setErrorPop(false)
  }

  const onSubmit = formData => {
    const payload = {
      ...personalPayload,
      ...vehiclePayload,
      ...formData,
      PassiveTerror: formData.PassiveTerror === true ? 'Y' : 'N',
      RodantDamage: formData.RodantDamage === true ? 'Y' : 'N',
      swnBreakdown: formData.swnBreakdown === true ? 'Y' : 'N',
      Replacement: formData.Replacement === true ? 'Y' : 'N',
      ExcessWaiver: formData.ExcessWaiver === true ? 'Y' : 'N',
      AlloyWheel: formData.AlloyWheel === true ? 'Y' : 'N',
      FinGap: formData.FinGap === true ? 'Y' : 'N',
      SwanAGreedRepair: formData.SwanAGreedRepair === true ? 'Y' : 'N',
      LossOfUse: false,
      AICCover: true,
      LmtAmt: formData.LossOfUse.split('/')?.[1].match(/\d+/g)?.[0],
      LmtDays: formData.LossOfUse.split('/')?.[0].match(/\d+/g)?.[0],
      PurchaseType: {
        value: `${vehicleDetailsData?.PurchaseType === 'Second Hand' ? 'Y' : 'N'}`,
        type: vehicleDetailsData?.PurchaseType
      },
      DTBIRTH: moment(DTBIRTH).format('DD/MM/YYYY'),
      EML: email,
      RegFeeIncEst: 'N',
      PolicyType: vehicleDetailsData?.PolicyType,
      SubModel: vehicleDetailsData?.SubModel,
      IsVat: vehicleDetailsData?.IsVat,
      NoOfSeats: vehicleDetailsData?.NoOfSeats && vehicleDetailsData?.NoOfSeats != 0
        ? vehicleDetailsData?.NoOfSeats
        : 5,
      EngineCapacity: vehicleDetailsData?.EngineCapacity?.toString(),
      SumInsured: vehicleDetailsData?.SumInsured?.toString(),
      TrSumIns: vehicleDetailsData?.TrSumIns?.toString(),
      VolXs: vehicleDetailsData?.VolXs?.toString(),
      TOTNOCLMS: personalInfoData?.TOTNOCLMS !== '' ? personalInfoData?.TOTNOCLMS?.toString() : '0'
    }
    const ApprovePayload = {
      COMPANY: false,
      Make: vehicleDetailsData?.Make,
      Model: vehicleDetailsData?.Model,
      SubModel: vehicleDetailsData?.SubModel,
      TITLE: personalInfoData?.TITLE,
      FIRSTNAME: personalInfoData?.FIRSTNAME,
      LASTNAME: personalInfoData?.LASTNAME,
      EngineCapacity: vehicleDetailsData?.EngineCapacity,
      OCCUPATION: personalInfoData?.OCCUPATION,
      VhKeptIn: vehicleDetailsData?.VhKeptIn,
      SecAlrm: vehicleDetailsData?.SecAlrm,
      YEARLIC: personalInfoData?.YEARLIC,
      TOTNOCLMS: personalInfoData.TOTNOCLMS ? personalInfoData.TOTNOCLM : '0',
      RegYr: vehicleDetailsData?.RegYr,
      SumInsured: vehicleDetailsData?.SumInsured,
      NICNO: personalInfoData?.NICNO,
      DTBIRTH: moment(DTBIRTH).format('DD/MM/YYYY')
    }
    postApproveStatusDispatch(ApprovePayload)
    setExtensionData(payload)
    postExtensionInfoDispatch(_.omit(payload, ['BreakdownService']))
  }

  const LossOfUseGet = motorMatrixData && motorMatrixData?.limitDays &&
  limitDaysData &&
  limitDaysData?.push({
    LUSEREF: motorMatrixData && motorMatrixData?.limitDays &&
      motorMatrixData.limitDays.value,
    LUSEREF: motorMatrixData && motorMatrixData?.limitDays &&
        motorMatrixData.limitDays.value
  })

  const resetTheValues = item => {
    const LimitValue = `${item.LmtDays} DAYS / RS ${item.LmtAmt}`
    reset(formValues => ({
      ...formValues,
      LossOfUse: LossOfUseGet || LimitValue,
      AICOPTION: motorMatrixData && motorMatrixData?.aicCover &&
        motorMatrixData.aicCover.value
        ? motorMatrixData.aicCover.value
        : item.AICOPTION,
      DriverAtFault: item.DriverAtFault
        ? item.DriverAtFault
        : motorMatrixData && motorMatrixData.faultCompensation &&
        motorMatrixData.faultCompensation.value,
      Replacement: !!(motorMatrixData && motorMatrixData?.Replacement &&
        motorMatrixData.Replacement.value || item.Replacement === 'Y'),
      ExcessWaiver: !!(motorMatrixData && motorMatrixData?.ExcessWaiver &&
        motorMatrixData.ExcessWaiver.value || item.ExcessWaiver === 'Y'),
      AlloyWheel: !!(motorMatrixData && motorMatrixData?.AlloyWheel &&
        motorMatrixData.AlloyWheel.value || item.AlloyWheel === 'Y'),
      SwanAGreedRepair: !!(motorMatrixData && motorMatrixData?.SwanAGreedRepair &&
        motorMatrixData.SwanAGreedRepair.value || item.SwanAGreedRepair === 'Y'),
      PassiveTerror: !!(motorMatrixData && motorMatrixData?.PassiveTerror &&
        motorMatrixData.PassiveTerror.value || item.PassiveTerror === 'Y'),
      RodantDamage: motorMatrixData && motorMatrixData?.RodantDamage &&
        motorMatrixData.RodantDamage.value
        ? !!(motorMatrixData &&
          motorMatrixData.RodantDamage.value || item.RodantDamage === 'Y')
        : item.RodantDamage,
      FinGap: !!(motorMatrixData && motorMatrixData?.FinGap &&
        motorMatrixData.FinGap.value || item.FinGap === 'Y'),
      swnBreakdown: !!(motorMatrixData && motorMatrixData?.swnBreakdown &&
        motorMatrixData.swnBreakdown.value || item.swnBreakdown === 'Y')
    }))
  }

  useEffect(() => {
    if (postExtensionInfoStatus === 'success' && !checkResFailed(postExtensionInfoData)) {
      toast.success('Extension informations have been saved!', {
        duration: 3000
      })
      clearApproveStatusDispatch()
      clearPostExtensionInfoDispatch()
      setLocalStorage(
        MOTOR_FORM.SET_FORM_DATA,
        JSON.stringify(extensionData)
      )
      const ApproveStatus = postApprovalStatusData && postApprovalStatusData.split('-')
      setLocalStorage(MOTOR_FORM.APPROVE_STATUS, ApproveStatus[1])
      !summaryPage && next()
    } else if (postExtensionInfoStatus === 'error' || checkResFailed(postExtensionInfoData)) {
      toast.error(removeErrString(postExtensionInfoData), { duration: 4000 })
      clearPostExtensionInfoDispatch()
    }
  }, [postExtensionInfoStatus])

  useEffect(() => {
    getRodentDamageDropdownDispatch()
    getCompensationDropdownDispatch()
    getAicCoverDropdownDispatch()
    getQuoteDetailsDispatch(QuoteId)
  }, [])

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
      if (vehicleDetails) {
        resetTheValues(extension, reset)
        setState(prevState => ({
          ...prevState,
          personalData: personalInfo,
          vehicleDetailsData: vehicleDetails,
          extensionDetails: extension
        }))
        const limitParams = {
          polcd: getQuoteDetails && getQuoteDetails?.vehicleDetails.PolicyType
            ? getQuoteDetails?.vehicleDetails.PolicyType
            : '00',
          make: getQuoteDetails && getQuoteDetails?.vehicleDetails.Make
            ? getQuoteDetails?.vehicleDetails.Make
            : 'BMW',
          model: getQuoteDetails && getQuoteDetails?.vehicleDetails.Model
            ? getQuoteDetails?.vehicleDetails.Model
            : '1-SERIES',
          submodel: getQuoteDetails && getQuoteDetails?.vehicleDetails.SubModel
            ? getQuoteDetails?.vehicleDetails.SubModel
            : '114D'
        }
        getLimitDaysDropdownDispatch(limitParams)
        const params = {
          polcd: getQuoteDetails && getQuoteDetails?.vehicleDetails.PolicyType ? getQuoteDetails?.vehicleDetails.PolicyType : '00',
          regMnt: getQuoteDetails && getQuoteDetails?.vehicleDetails.RegMon,
          regYrs: getQuoteDetails && getQuoteDetails?.vehicleDetails.RegYr
        }
        getMotorMatrixDropdownDispatch(params)
      }
      ClearMotQuoteDetailsDispatch()
    }
  }, [getQuoteDetailsStatus])

  const vehicleDetails = getQuoteDetails &&
    getQuoteDetails.vehicleDetails
    ? getQuoteDetails.vehicleDetails
    : {}
  const personalInfo = getQuoteDetails &&
    getQuoteDetails.personalDetails
    ? getQuoteDetails.personalDetails
    : {}
  const extensionInfo = getQuoteDetails &&
    getQuoteDetails.extension
    ? getQuoteDetails.extension
    : {}

  useEffect(() => {
    if (getQuoteDetailsStatus === 'success') {
      if (vehicleDetails) {
        resetTheValues(extensionInfo, reset)
        setState(prevState => ({
          ...prevState,
          personalData: personalInfo,
          vehicleDetails
        }))
      }
      ClearMotQuoteDetailsDispatch()
    }
  }, [getQuoteDetailsStatus])

  const PolicyType = getQuoteDetails?.vehicleDetails?.PolicyType.replace(/ /g, '') || '00'

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
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
                  </Grid>

                  <Mselect
                    xs={12}
                    name='LossOfUse'
                    label='Loss of use'
                    control={control}
                    options={limitDaysData && limitDaysData}
                    reset={reset}
                    optionsLabel='LUSEREF'
                    optionsValue='LUSEREF'
                    grantedUsers={GRANTED_USERS.AGENT}
                    userType={authRole}
                    value={LossOfUseGet}
                    req
                  />

                  <Mselect
                    xs={12}
                    name='AICOPTION'
                    label='AIC cover'
                    control={control}
                    options={aicCoverData && aicCoverData}
                    reset={reset}
                    optionsLabel='AICDESC'
                    optionsValue='AICOPTION'
                    grantedUsers={GRANTED_USERS.AGENT}
                    userType={authRole}
                    // readOnly={motorMatrixData && motorMatrixData?.aicCover &&
                    //   motorMatrixData.aicCover.rule === 'default & read only'}
                    req
                  />

                  <Mselect
                    xs={12}
                    name='DriverAtFault'
                    label='Driver At-fault Compensation'
                    control={control}
                    options={compensationData && compensationData}
                    reset={reset}
                    optionsLabel='FAULTCOMPENSATION'
                    optionsValue='FAULTCOMPENSATION'
                    grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                    userType={authRole}
                    // readOnly={motorMatrixData && motorMatrixData?.faultCompensation &&
                    //   motorMatrixData.faultCompensation.rule === 'default & read only'}
                    req
                  />

                  <Mswitch
                    xs={12}
                    name='Replacement'
                    label='Replacement car following Breakdown'
                    control={control}
                    grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                    userType={authRole}
                    disabled={motorMatrixData && motorMatrixData?.Replacement &&
                      motorMatrixData.Replacement.rule === 'default & read only'}
                  />

                  <Mswitch
                    xs={12}
                    name='ExcessWaiver'
                    label='Excess Waiver'
                    control={control}
                    grantedUsers={GRANTED_USERS.AGENT_BROKER}
                    userType={authRole}
                    disabled={motorMatrixData && motorMatrixData?.ExcessWaiver &&
                      motorMatrixData.ExcessWaiver.rule === 'default & read only'}
                  />

                  <Mswitch
                    xs={12}
                    name='AlloyWheel'
                    label='Alloy Wheel'
                    control={control}
                    grantedUsers={GRANTED_USERS.AGENT_BROKER}
                    userType={authRole}
                    disabled={motorMatrixData && motorMatrixData?.AlloyWheel &&
                      motorMatrixData.AlloyWheel.rule === 'default & read only'}
                  />
                </Grid>
              </Grid>
              <Grid item md={summaryPage ? 12 : 6}>
                <Grid container spacing={summaryPage ? 1 : 2}>
                  <Grid item xs={12}>
                    <h4 className='form-title-md'>Extras</h4>
                  </Grid>
                  <ShowField
                    show={(!_.isEmpty(PolicyType) && PolicyType == 0) || PolicyType <= 85}
                    yes={() => (
                      <Mswitch
                        xs={12}
                        name='RodantDamage'
                        label='Rodent Damage'
                        control={control}
                        info='RodantDamage'
                        grantedUsers={GRANTED_USERS.AGENT_BROKER}
                        userType={authRole}
                        disabled={motorMatrixData && motorMatrixData?.RodantDamage &&
                          motorMatrixData.RodantDamage.rule === 'default & read only'}
                        req
                      />
                    )}
                    no={() => (
                      <Mselect
                        xs={12}
                        name='RodantDamage'
                        label='Rodent Damage'
                        control={control}
                        options={rodentDamageData && rodentDamageData}
                        reset={reset}
                        optionsLabel='ALTERNATIVECODE'
                        optionsValue='ALTERNATIVEID'
                        grantedUsers={GRANTED_USERS.AGENT_BROKER}
                        userType={authRole}
                        readOnly={motorMatrixData && motorMatrixData?.RodantDamage &&
                          motorMatrixData.RodantDamage.rule === 'default & read only'}
                        req
                      />)}
                  />
                  <Mswitch
                    xs={12}
                    name='FinGap'
                    label='Finance Gap'
                    control={control}
                    info='Finance Gap'
                    grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                    userType={authRole}
                    disabled={motorMatrixData && motorMatrixData?.FinGap &&
                      motorMatrixData.FinGap.rule === 'default & read only'}
                  />

                  <Mswitch
                    xs={12}
                    name='PassiveTerror'
                    label='Passive Terrorism'
                    control={control}
                    info='Passive Terrorism '
                    grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                    userType={authRole}
                    disabled={motorMatrixData && motorMatrixData?.PassiveTerror &&
                      motorMatrixData.PassiveTerror.rule === 'default & read only'}
                  />
                  <ShowField
                    show={policyData.SWANAGREEDREPAIR != 'N'}
                    yes={() => (
                      <>
                        <Mswitch
                          xs={12}
                          name='SwanAGreedRepair'
                          label='Swan Agreed Repairer'
                          control={control}
                          info='Swan Agreed Repairer'
                          grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                          userType={authRole}
                          disabled={motorMatrixData && motorMatrixData?.SwanAGreedRepair &&
                            motorMatrixData.SwanAGreedRepair.rule === 'default & read only'}
                        />
                      </>
                    )}
                    no={() => null}
                  />
                  <ShowField
                    show={policyData.BREAKDOWN != 'N'}
                    yes={() => (
                      <>
                        <Mswitch
                          xs={12}
                          name='swnBreakdown'
                          label='Breakdown Service'
                          control={control}
                          info='Breakdown Service'
                          grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                          userType={authRole}
                          disabled={motorMatrixData && motorMatrixData?.swnBreakdown &&
                            motorMatrixData.swnBreakdown.rule === 'default & read only'}
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
            <section className='summary-box bl'>
              <div className='txt-center'>
                <h4 className='summary-title'>
                  MOTOR SUMMARY{' '}
                  <InfoPopup info='The switching component A switching component is a component that renders one of many components.' />
                </h4>
                <h5>Total</h5>
                <h4 className='summary-heading'>
                  Rs  {state && state.extensionDetails &&
                    state.extensionDetails.NETPREM
                  ? state.extensionDetails.NETPREM
                  : '--'}
                </h4>
              </div>
              <ul className='summary-ul bb'>
                <div>
                  <h4 className='summary-heading-alt'>
                    Vehicle Details{' '}
                    <span>
                      <Icofont
                        icon='pencil'
                        onClick={() => back()}
                      />
                    </span>
                  </h4>
                </div>
                <li>
                  Make
                  <span>
                    {state && state.vehicleDetails &&
                      state.vehicleDetails.Make
                      ? state.vehicleDetails.Make
                      : '--'}
                  </span>
                </li>
                <li>
                  Model
                  <span>
                    {state && state.vehicleDetails &&
                      state.vehicleDetails.Model
                      ? state.vehicleDetails.Model
                      : '--'}
                  </span>
                </li>
                <li>
                  Sub Model
                  <span>
                    {state && state.vehicleDetails &&
                      state.vehicleDetails
                      ? state.vehicleDetails.Make
                      : '--'}
                  </span>
                </li>
                <li>
                  Engine Capacity
                  <span>
                    {state && state.vehicleDetails &&
                      state.vehicleDetails.EngineCapacity
                      ? state.vehicleDetails.EngineCapacity
                      : '--'}
                    cc
                  </span>
                </li>
                <li>
                  Reg. Month/Year
                  <span>
                    {state && state.vehicleDetails
                      ? `${state.vehicleDetails.RegMon} /
                      ${state.vehicleDetails.RegYr}`
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
                          {state && state.extensionDetails &&
                            state.extensionDetails.luseprem
                            ? state.extensionDetails.luseprem
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
                          {state && state.extensionDetails &&
                            state.extensionDetails.PASTERPREM
                            ? state.extensionDetails.PASTERPREM
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
                          {state && state.extensionDetails &&
                            state.extensionDetails.RODENTPREM
                            ? state.extensionDetails.RODENTPREM
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
                          {state && state.extensionDetails &&
                            state.extensionDetails.FGAPPREM
                            ? state.extensionDetails.FGAPPREM
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
                          {state && state.extensionDetails &&
                            state.extensionDetails.MKGDISCAMT
                            ? state.extensionDetails.MKGDISCAMT
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
                          {state && state.extensionDetails &&
                            state.extensionDetails.BRSFEES
                            ? state.extensionDetails.BRSFEES
                            : '0'}
                        </span>
                      </li>
                    </>
                  )}
                  no={() => null}
                />
              </ul>
            </section>
          </Grid>
          <Grid item md={summaryPage ? 12 : 8}>
            <ValidateNotify show={errorPop} errors={message} clear={clearNotify} />
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
          <Button variant='contained' color='primary' type='submit'>
            {postExtensionInfoLoading
              ? (
                <CircularProgress size={18} style={{ color: '#ffffff' }} />
                )
              : (
                  summaryPage ? 'Submit' : 'Next'
                )}
          </Button>
          {/* <Button variant="contained" color="primary" onClick={() => next()}>Next</Button> */}
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
    rodentDamageData: ExtensionDropdown.rodentDamageData,
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
    postApprovalStatusLoading: MotorPlan.postApprovalStatusLoading,
    postApprovalStatusData: MotorPlan.postApprovalStatusData,
    postApprovalStatusStatus: MotorPlan.postApprovalStatusStatus,
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
  postApproveStatusDispatch: formData =>
    dispatch(MotorPlanActions.PostApprovalStatusAction(formData)),
  clearApproveStatusDispatch: formData =>
    dispatch(MotorPlanActions.ClearPostApprovalStatusAction(formData)),
  getQuoteDetailsDispatch: id =>
    dispatch(MotorQuotationAction.GetQuoteDetailsAction(id)),
  getMotorMatrixDropdownDispatch: params =>
    dispatch(MotorQuotationAction.getMotorMatrixRequest(params)),
  SaveMotorFormAction: data =>
    dispatch(MotorQuotationAction.SaveMotorFormAction(data)),
  ClearMotQuoteDetailsDispatch: () =>
    dispatch(MotorQuotationAction.ClearMotQuoteDetailsAction())
})

export default connect(mapStateToProps, mapDispatchToProps)(FormExtensions)

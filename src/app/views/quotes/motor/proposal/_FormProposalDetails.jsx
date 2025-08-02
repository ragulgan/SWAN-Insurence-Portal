import React, { Fragment, useEffect, useState } from 'react'
import { Grid, Button, Box, Paper, CircularProgress, Typography, makeStyles } from '@material-ui/core'
import { useForm, useWatch } from 'react-hook-form'
import _ from 'lodash'
import Icofont from 'react-icofont'

import Mtextbox from '../../../../../app/form-controls/Mtextbox'
import Mselect from '../../../../../app/form-controls/Mselect'
// import Mdatepicker from '../../../../../app/form-controls/Mdatepicker'
import Mswitch from '../../../../../app/form-controls/Mswitch'
import Mtextarea from '../../../../../app/form-controls/Mtextarea'
import ValidateNotify from '../../../../../app/widgets/ValidateNotify'
import InfoPopup from '../../../../../app/widgets/InfoPopup'
import { useTheme } from '@material-ui/core/styles'

import Mdatepicker from '../../../../../app/form-controls/Mdatepicker'

import { connect, shallowEqual, useSelector } from 'react-redux'
import {
  ProposalAction,
  proposalDropdownAction,
  MotorQuotationAction
} from '../../../../../store/actions/index'

import { ShowField } from '../../../../../app/uiComponents'
import {
  getLocalStorage,
  setSessionStorage,
  checkResFailed,
  getSessionStorage,
  removeErrString,
  preventIfNotNumber
} from '../../../../../helpers/helper'
import moment from 'moment'
import { REGEX, MOTOR_FORM, GRANTED_USERS } from '../../../../../helpers/constants'

import toast from 'react-hot-toast'
import CustomBackdrop from '../../../../../app/backdrop/CustomBackdrop'

const _FormProposalDetails = props => {
  const theme = useTheme()
  const {
    fromPage,
    back,
    next,
    getProposalDetailsDispatch,
    getSubmitDetailsDispatch,
    postProposalDetailsDispatch,
    putSubmitDetailsDispatch,
    getTotalClaimDropDownDispatch,
    TotalClaimDropdownData,
    getLeaseDropDownDispatch,
    getLeasingData,
    getQuoteDetailsDispatch,
    getQuoteDetailsStatus,
    getQuoteDetails,
    postProposalStatus,
    postProposalData,
    postProposalLoading,
    clearProposalDetailsDispatch,
    getQuoteDetailsLoading,
    getExcessDropDownDispatch,
    ExcessOptionData,
    ExcessOptionLoading
  } = props
  const useStyles = makeStyles(theme => ({
    alignTopBottom: {
      paddingTop: 12,
      paddingBottom: 12
    },
    alignMargin: {
      paddingTop: 12,
      paddingBottom: 12,
      marginLeft: 8
    },

    textalign: {
      marginLeft: 8,
      fontSize: 14
    }
  }))
  const classes = useStyles()
  const {
    control,
    handleSubmit,
    formState,
    getValues,
    checked,
    watch,
    reset,
    trigger
  } = useForm({
    defaultValues: {
      HEALTHDTL: '',
      OTHDRVDTL: '',
      CONVICIND: '',
      PROSECIND: '',
      LICSUSIND: '',
      REFINSIND: '',
      CHASSIS: '',
      OwnerName: '',
      NOCLMYR1: '',
      NOCLMYR2: '',
      NOCLMYR3: '',
      CLMYR1: null,
      CLMYR2: '',
      CLMYR3: '',
      PRVINSURER: '',
      RALLYIND: '',
      GOODCARIND: '',
      PASSHIRE: '',
      MTTRADEIND: true,
      OTHINSURER: '',
      LEASING: '',
      // switch_owner: false,
      ADDR1: '',
      RefRemarks: '',
      LEASINDIC: '',
      HIGHPURIND: '',
      OWNER: '',
      LienADDR1: ''

    }
  })
  const { authRole } = useSelector(
    ({ Auth }) => ({
      authRole: Auth.authRole
    }),
    shallowEqual
  )
  const [errorPop, setErrorPop] = useState(false)
  const [state, setState] = useState({
    personalData: {},
    vehicleData: {},
    extensionData: {}
  })

  watch('PRVINSURER')
  const PrevInsureValue = getValues('PRVINSURER')
  const message = 'Please fill in required information to proceed'
  const [proposal_step1Data, setProposal_step1Data] = useState()
  const localData = JSON.parse(
    getLocalStorage(MOTOR_FORM.SET_FORM_DATA)
  )
  const { errors } = formState
  const ExcessDropdown = []
  !_.isEmpty(ExcessOptionData) && Object.keys(ExcessOptionData).map((item) => {
    ExcessDropdown.push({ excessLabel: ExcessOptionData[item], excessValue: ExcessOptionData[item] })
  })
  const clearNotify = () => {
    setErrorPop(false)
  }
  const watchOwner = watch('switch_owner', false)
  const watchLease = watch('LEASING', 'string')
  const watchRefInsInd = watch('REFINSIND', 'string')
  const onSubmit = data => {
    // next();
    const personalPayload = _.omit(state.personalData, ['DTBIRTH', 'TOTNOCLMS'])
    const DTBIRTH = state.personalData?.DTBIRTH

    const payload = {
      ...data,
      ...personalPayload,
      ...state.vehicleData,
      ...state.extensionData,
      CLMYR1: typeof data?.CLMYR1 !== 'string' ? data?.CLMYR1?.format('YYYY') : '2020',
      CLMYR2: typeof data?.CLMYR2 !== 'string' ? data?.CLMYR2?.format('YYYY') : '2021',
      CLMYR3: typeof data?.CLMYR3 !== 'string' ? data?.CLMYR3?.format('YYYY') : '2022',
      RALLYIND: data?.RALLYIND === true ? 'Y' : 'N',
      REFINSIND: data?.REFINSIND === true ? 'Y' : 'N',
      PASSHIRE: data?.PASSHIRE === true ? 'Y' : 'N',
      GOODCARIND: data?.GOODCARIND === true ? 'Y' : 'N',
      LICSUSIND: data?.LICSUSIND === true ? 'Y' : 'N',
      CONVICIND: data?.CONVICIND === true ? 'Y' : 'N',
      PROSECIND: data?.PROSECIND === true ? 'Y' : 'N',
      MTTRADEIND: data?.MTTRADEIND === true ? 'Y' : 'N',
      DTBIRTH: moment(DTBIRTH).format('DD/MM/YYYY'),
      LIENIND: watchLease === 'Lien' ? 'Y' : 'N',
      LEASINDIC: watchLease === 'Leasing' ? 'Y' : 'N',
      HIGHPURIND: watchLease === 'None' ? 'Y' : 'N',
      NOCLAIMIND: false,
      DTLACCDNTS: 'ACCIDENT 1',
      TOTNOCLMS: '0',
      AICOPTION: '',
      PurchaseType: {
        value: state.vehicleData?.PurchaseType,
        type: `${state.vehicleData?.PurchaseType === 'Second Hand' ? 'Y' : 'N'}`
      },
      //   "PurchaseType": {
      //     "type": "Second Hand",
      //     "value": "Y"
      // }
      ADDR1: data?.ADDR1 ? data?.ADDR1 : '',
      OTHINSURER: data?.OTHINSURER ? data?.OTHINSURER : '',
      OWNER: data?.OWNER ? data?.OWNER : '',
      LienADDR1: data?.LienADDR1 ? data?.LienADDR1 : '',
      SubModel: state?.vehicleData?.SubModel ? state?.vehicleData?.SubModel : ''
    }
    const proposalPayload = _.omit(payload, ['switch_owner'])
    setProposal_step1Data(payload)
    postProposalDetailsDispatch(proposalPayload)
  }
  const quotnum = getSessionStorage(MOTOR_FORM.QUOTE_NUMBER)
  useEffect(() => {
    getTotalClaimDropDownDispatch()
    getLeaseDropDownDispatch()
    const payload_id = {
      quotnum
    }
    getExcessDropDownDispatch(payload_id)
  }, [])

  useEffect(() => {
    if (quotnum) {
      getQuoteDetailsDispatch(quotnum)
    }
  }, [])

  const resetTheValues = item => {
    reset(formValues => ({
      ...formValues,
      HEALTHDTL: item.HEALTHDTL,
      OTHDRVDTL: item.OTHDRVDTL,
      CONVICIND: item.CONVICIND,
      PROSECIND: item.PROSECIND,
      LICSUSIND: item.LICSUSIND,
      REFINSIND: item.REFINSIND,
      CHASSIS: item.CHASSIS,
      OwnerName: item.OwnerName,
      NOCLMYR1: item.NOCLMYR1,
      NOCLMYR2: item.NOCLMYR2,
      NOCLMYR3: item.NOCLMYR3,
      CLMYR1: item.CLMYR1,
      CLMYR2: item.CLMYR2,
      CLMYR3: item.CLMYR3,
      PRVINSURER: item.PRVINSURER,
      RALLYIND: item.RALLYIND,
      GOODCARIND: item.GOODCARIND,
      PASSHIRE: item.PASSHIRE,
      MTTRADEIND: item.MTTRADEIND,
      OTHINSURER: item.OTHINSURER,
      LEASING: item.LEASING,
      // switch_owner: item.switch_owner,
      ADDR1: item.ADDR1,
      RefRemarks: item.RefRemarks,
      LEASINDIC: item.LEASINDIC,
      HIGHPURIND: item.HIGHPURIND,
      OWNER: item.OWNER,
      LienADDR1: item.LienADDR1
    }))
  }

  useEffect(() => {
    if (getQuoteDetailsStatus === 'success') {
      const extension =
        getQuoteDetails && getQuoteDetails.extension
          ? getQuoteDetails.extension
          : {}
      const vehicleDetails =
        getQuoteDetails && getQuoteDetails.vehicleDetails
          ? getQuoteDetails.vehicleDetails
          : {}
      const personalInfo =
        getQuoteDetails && getQuoteDetails.personalDetails
          ? getQuoteDetails.personalDetails
          : {}
      const proposalsData =
        getQuoteDetails && getQuoteDetails?.proposals
          ? getQuoteDetails?.proposals
          : {}
      setState(prevState => ({
        ...prevState,
        personalData: personalInfo,
        vehicleData: vehicleDetails,
        extensionData: extension
      }))
      if (proposalsData) {
        resetTheValues(proposalsData)
      }
    }
  }, [getQuoteDetailsStatus])
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
    }
  ]
  const excessOptions = [
    {
      VALUE: '0',
      LABEL: '0'
    },
    {
      VALUE: '1000',
      LABEL: '1000'
    },
    {
      VALUE: '15000',
      LABEL: '15,000'
    }
  ]
  useEffect(() => {
    if (postProposalStatus === 'success' && !checkResFailed(postProposalData)) {
      toast.success('Proposal informations have been saved!', {
        duration: 3000
      })
      clearProposalDetailsDispatch()
      const QuoteId = postProposalData.split('-')
      setSessionStorage(MOTOR_FORM.QUOTE_NUMBER, QuoteId[1])
      next()
    } else if (
      postProposalStatus === 'error' ||
      checkResFailed(postProposalData)
    ) {
      toast.error(removeErrString(postProposalData), { duration: 4000 })
      clearProposalDetailsDispatch()
    }
  }, [postProposalStatus])
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CustomBackdrop isLoading={getQuoteDetailsLoading} />
      <Grid
        container
        direction='row'
        justifyContent='center'
        alignItems='flex-start'
        spacing={fromPage === 'summary' ? 2 : 4}
      >
        <Grid item md={fromPage === 'summary' ? 12 : 8}>
          <Grid
            container
            direction='row'
            justifyContent='center'
            alignItems='flex-start'
            spacing={5}
          >
            <Grid item md={fromPage === 'summary' ? 12 : 6}>
              <Grid container spacing={fromPage === 'summary' ? 1 : 2}>
                <Grid item xs={12}>
                  <h4 className='form-title-md'>
                    Proposal Details{' '}
                    <span>
                      <span className='req-mark'>*</span> Required field
                    </span>
                  </h4>
                  <h5
                    style={{ color: theme.palette.primary.main }}
                    className={classes.alignTopBottom}
                  >
                    Personal
                  </h5>
                </Grid>
                <Mtextarea
                  xs={12}
                  name='HEALTHDTL'
                  label='Please specify any health problem,
                  if any, that may impair your driving ability'
                  textLength
                  control={control}
                  grantedUsers={GRANTED_USERS.AGENT}
                  userType={authRole}
                  maxLength={35}
                />

                <Mtextarea
                  xs={12}
                  name='OTHDRVDTL'
                  label='Other Driver details (Age, Occupation, Licence Info,
                                      Driving Experience etc.)'
                  control={control}
                  grantedUsers={GRANTED_USERS.AGENT}
                  userType={authRole}
                  maxLength={250}
                />

                <Mswitch
                  xs={12}
                  lMd={8}
                  name='CONVICIND'
                  label='Have you or any of the above drivers had any conviction in the past 5 years?'
                  cSpacing={3}
                  control={control}
                  className='my-2'
                  grantedUsers={GRANTED_USERS.AGENT}
                  userType={authRole}
                />

                <Mswitch
                  xs={12}
                  lMd={8}
                  name='PROSECIND'
                  label='Have you or any of the above drivers had any prosecution pending for any offence in connection with a motor vehicle?'
                  cSpacing={3}
                  control={control}
                  className='my-2'
                  grantedUsers={GRANTED_USERS.AGENT}
                  userType={authRole}
                />

                <Mswitch
                  xs={12}
                  lMd={8}
                  name='LICSUSIND'
                  label='Have you or any of the above drivers had their licence suspended?'
                  cSpacing={3}
                  control={control}
                  grantedUsers={GRANTED_USERS.AGENT}
                  userType={authRole}
                />
                <Mswitch
                  xs={12}
                  lMd={8}
                  name='REFINSIND'
                  label='Have you or any of the above drivers been refused insurance at normal rates or terms during the past 5 years?'
                  cSpacing={3}
                  control={control}
                  grantedUsers={GRANTED_USERS.AGENT}
                  userType={authRole}
                />
                <ShowField
                  show={watchRefInsInd === true}
                  yes={() => (
                    <>
                      <Mtextarea
                        xs={12}
                        name='RefRemarks'
                        control={control}
                        label='Please Specify'
                        grantedUsers={GRANTED_USERS.AGENT}
                        userType={authRole}
                        maxLength={100}
                      />
                    </>
                  )}
                  no={() => null}
                />
                <h5
                  style={{ color: theme.palette.primary.main }}
                  className={classes.alignMargin}
                >
                  Ownership
                </h5>
                <Mtextbox
                  xs={12}
                  name='CHASSIS'
                  control={control}
                  label='Chassis Number'
                  grantedUsers={GRANTED_USERS.AGENT}
                  userType={authRole}
                  maxLength={30}
                />
                <Mswitch
                  cSpacing={3}
                  xs={12}
                  name='switch_owner'
                  label='Are you the owner of the motor vehicle and is it registered in your name?'
                  control={control}
                  grantedUsers={GRANTED_USERS.AGENT}
                  userType={authRole}
                />
                <ShowField
                  show={watchOwner === false}
                  yes={() => (
                    <>
                      <Mtextbox
                        xs={12}
                        name='OwnerName'
                        control={control}
                        label='Name of registered owner'
                        grantedUsers={GRANTED_USERS.AGENT}
                        userType={authRole}
                        maxLength={30}
                      />
                      <Mtextbox
                        xs={12}
                        name='ADDR1'
                        control={control}
                        label='Address of registered owner'
                        grantedUsers={GRANTED_USERS.AGENT}
                        userType={authRole}
                        maxLength={70}
                      />
                    </>
                  )}
                  no={() => null}
                />
                <Typography variant='inherit' className='ml-2'>
                  Please state if any person/firm has any financial interest in
                  the vehicle:
                </Typography>

                <Mselect
                  reset={reset}
                  xs={12}
                  name='LEASING'
                  label='Select'
                  control={control}
                  options={ownershipOptions}
                  optionsLabel='VALUE'
                  optionsValue='LABEL'
                  grantedUsers={GRANTED_USERS.AGENT}
                  userType={authRole}
                />
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
                        options={getLeasingData && getLeasingData}
                        optionsLabel='LSNAME'
                        optionsValue='LEASING'
                        grantedUsers={GRANTED_USERS.AGENT}
                        userType={authRole}
                        req
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
                        name='OWNER'
                        control={control}
                        label='Name of person/Firm'
                        grantedUsers={GRANTED_USERS.AGENT}
                        userType={authRole}
                      />
                      <Mtextbox
                        xs={12}
                        name='LienADDR1'
                        control={control}
                        label='Address of person/Firm'
                        grantedUsers={GRANTED_USERS.AGENT}
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
                  <h5 style={{ color: theme.palette.primary.main }}>
                    Insurance History
                  </h5>
                  <h5
                    style={{ color: theme.palette.primary.main }}
                    className={classes.alignTopBottom}
                  >
                    No. of accidents/cliams past 3 years
                  </h5>
                </Grid>
                <Mdatepicker
                  xs={12}
                  md={6}
                  name='CLMYR1'
                  label='Year (YYYY)'
                  format='YYYY'
                  views={['year']}
                  control={control}
                  className={classes.alignTopBottom}
                  grantedUsers={GRANTED_USERS.AGENT}
                  userType={authRole}
                  onKeyPress={e => {
                    preventIfNotNumber(e)
                  }}
                />

                <Mtextbox
                  xs={12}
                  md={6}
                  name='NOCLMYR1'
                  label='Number of Claims'
                  control={control}
                  grantedUsers={GRANTED_USERS.AGENT}
                  userType={authRole}
                  maxLength={5}
                />
                <Mdatepicker
                  xs={12}
                  md={6}
                  name='CLMYR2'
                  label='Year (YYYY)'
                  format='YYYY'
                  views={['year']}
                  control={control}
                  grantedUsers={GRANTED_USERS.AGENT}
                  userType={authRole}
                />

                <Mtextbox
                  xs={12}
                  md={6}
                  name='NOCLMYR2'
                  label='Number of Claims'
                  control={control}
                  grantedUsers={GRANTED_USERS.AGENT}
                  userType={authRole}
                  maxLength={5}
                />
                <Mdatepicker
                  xs={12}
                  md={6}
                  name='CLMYR3'
                  label='Year (YYYY)'
                  format='YYYY'
                  views={['year']}
                  control={control}
                  grantedUsers={GRANTED_USERS.AGENT}
                  userType={authRole}
                />

                <Mtextbox
                  xs={12}
                  md={6}
                  name='NOCLMYR3'
                  label='Number of Claims'
                  control={control}
                  grantedUsers={GRANTED_USERS.AGENT}
                  userType={authRole}
                  maxLength={5}
                />
                <h4 className={classes.textalign}>Total No. of claims: {}</h4>
                <Mselect
                  reset={reset}
                  xs={12}
                  name='PRVINSURER'
                  label='Previous Insurer in respect to any motor vehicle'
                  control={control}
                  options={TotalClaimDropdownData && TotalClaimDropdownData}
                  optionsLabel='STATDESC'
                  optionsValue='STATDESC'
                  grantedUsers={GRANTED_USERS.AGENT}
                  userType={authRole}
                />
                {/* <ShowField
                  show={PrevInsureValue === 'OTHER'}
                  yes={() => (
                    <>
                      <Mtextarea
                        xs={12}
                        name="OTHINSURER"
                        label="Specify if insurer is not in the list"
                        control={control}
                        req
                        grantedUsers={GRANTED_USERS.AGENT}
                        userType={authRole}
                      />
                    </>
                  )}
                  no={() => null}
                /> */}
                <ShowField
                  show={PrevInsureValue === 'OTHER'}
                  yes={() => (
                    <Mtextarea
                      xs={12}
                      name='OTHINSURER'
                      label='Specify if insurer is not in the list'
                      control={control}
                      grantedUsers={GRANTED_USERS.AGENT}
                      userType={authRole}
                      maxLength={50}
                    />
                  )}
                  no={() => null}
                />
                <h5
                  style={{ color: theme.palette.primary.main }}
                  className={classes.alignMargin}
                >
                  Vehicle use
                </h5>
                <Mswitch
                  cSpacing={3}
                  xs={12}
                  cMd={8}
                  name='RALLYIND'
                  label='Will the motor car be used for rallies, competition, trails?'
                  control={control}
                  grantedUsers={GRANTED_USERS.AGENT}
                  userType={authRole}
                />

                <Mswitch
                  cSpacing={3}
                  xs={12}
                  cMd={8}
                  name='GOODCARIND'
                  label='Will the motor car be used for carriage of goods for business or trade purposes?'
                  control={control}
                  grantedUsers={GRANTED_USERS.AGENT}
                  userType={authRole}
                />

                <Mswitch
                  cSpacing={3}
                  xs={12}
                  name='PASSHIRE'
                  label='Will the motor car be used for carriage of passengers for hire or reward?'
                  control={control}
                  grantedUsers={GRANTED_USERS.AGENT}
                  userType={authRole}
                />
                <Mswitch
                  cSpacing={3}
                  xs={12}
                  name='MTTRADEIND'
                  label='Will the motor car be used in connection with the motor trade?'
                  control={control}
                  setValue={checked}
                  grantedUsers={GRANTED_USERS.AGENT}
                  userType={authRole}
                />

                <ShowField
                  show={state?.vehicleData?.PolicyType === '0' || state?.vehicleData?.PolicyType == '00'}
                  yes={() => (
                    <>
                      <Mselect
                        reset={reset}
                        xs={12}
                        name='CompulsoryXs'
                        label='Excess options'
                        control={control}
                        options={ExcessDropdown}
                        optionsLabel='excessLabel'
                        optionsValue='excessValue'
                        grantedUsers={GRANTED_USERS.AGENT}
                        userType={authRole}
                      />
                    </>
                  )}
                  no={() => (
                    <>
                      <Mtextbox
                        xs={12}
                        name='CompulsoryXs'
                        control={control}
                        label='Excess options'
                        grantedUsers={GRANTED_USERS.AGENT}
                        userType={authRole}
                        req
                      />
                    </>
                  )}

                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={fromPage === 'summary' ? 12 : 4} sm={12} xs={12}>
          <section className='summary-box bl'>
            <div className='txt-center'>
              <h4 className='summary-title'>
                MOTOR SUMMARY{' '}
                <InfoPopup info='The switching component A switching component is a component that renders one of many components.' />
              </h4>
              <h5>Total</h5>
              <h4 className='summary-heading'>
                Rs  {state && state?.extensionData &&
                  state?.extensionData?.NETPREM
                ? state?.extensionData?.NETPREM
                : '--'}
              </h4>
            </div>
            <ul className='summary-ul bb'>
              <div>
                <h4 className='summary-heading-alt'>
                  Vehicle Details{' '}
                </h4>
              </div>

              <li>
                Make <span>{state?.vehicleData?.Make ? state?.vehicleData?.Make : '--'}</span>
              </li>
              <li>
                Model <span>{state?.vehicleData?.Model ? state?.vehicleData?.Model : '--'}</span>
              </li>
              <li>
                Sub Model <span>{state?.vehicleData?.SubModel ? state?.vehicleData?.SubModel : '--'}</span>
              </li>
              <li>
                Engine Capacity <span>{state?.vehicleData?.EngineCapacity ? state?.vehicleData?.EngineCapacity : '--'}cc</span>
              </li>
              <li>
                Reg. Month/Year <span>{state?.vehicleData?.RegMon ? state?.vehicleData?.RegMon : '--'}/{state?.vehicleData?.RegYr ? state?.vehicleData?.RegYr : '--'}</span>
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
              <li>
                Loss of use
                <span>
                  {state && state?.extensionData &&
                    state?.extensionData?.luseprem
                    ? state?.extensionData?.luseprem
                    : '--'}
                </span>
              </li>
              <li>
                Passive terrorism
                <span>
                  {state && state?.extensionData &&
                    state?.extensionData?.PASTERPREM
                    ? state?.extensionData?.PASTERPREM
                    : '--'}
                </span>
              </li>
              <li>
                Rodent Damage
                <span>
                  {state && state?.extensionData &&
                    state?.extensionData?.RODENTPREM
                    ? state?.extensionData?.RODENTPREM
                    : '--'}
                </span>
              </li>
              <li>
                Finance gap
                <span>
                  {state && state.extensionData &&
                    state?.extensionData?.FGAPPREM
                    ? state?.extensionData?.FGAPPREM
                    : '--'}
                </span>
              </li>
              <li>
                Swan Agreed Repairer
                <span>
                  {state && state?.extensionData &&
                    state?.extensionData?.MKGDISCAMT
                    ? state?.extensionData?.MKGDISCAMT
                    : '--'}
                </span>
              </li>
              <li>
                Breakdown Service
                <span>
                  {state && state.extensionData &&
                    state?.extensionData?.EngineCapacity
                    ? state?.extensionData?.EngineCapacity
                    : '--'}
                </span>
              </li>
            </ul>
          </section>
        </Grid>
        <Grid item md={fromPage === 'summary' ? 12 : 8}>
          <ValidateNotify show={errorPop} errors={message} clear={clearNotify} />
        </Grid>
        <Grid
          item
          md={fromPage === 'summary' ? 12 : 4}
          sm={fromPage === 'summary' ? 12 : 4}
          className='txt-right'
        >
          {/* <Button
            variant="outlined"
            color="primary"
            className="mar-right-s"
            onClick={() => back()}
          >
            Back
          </Button> */}
          <Button variant='contained' color='primary' type='submit'>
            {postProposalLoading
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
  )
}

const mapStateToProps = state => {
  const { PersonalDropdown, Proposal, ProposalDropDown, MotorQuotation } = state
  return {
    ProposalData: Proposal.getProposalDetails,
    ProposalLoading: Proposal.getDetailsLoading,
    TotalClaimDropdownData: ProposalDropDown.getTotalClaimData,
    ExcessOptionData: ProposalDropDown?.xsOptionData ? ProposalDropDown?.xsOptionData : [],
    ExcessOptionLoading: ProposalDropDown?.getXSOptionLoading,
    ExcessOptionStatus: ProposalDropDown?.xsOptionStatus,
    getLeasingData: ProposalDropDown.getLeasingData,
    getQuoteDetails: MotorQuotation?.getQuoteDetails,
    getQuoteDetailsLoading: MotorQuotation?.getQuoteDetailsLoading,
    getQuoteDetailsStatus: MotorQuotation?.getQuoteDetailsStatus,
    postProposalLoading: Proposal && Proposal?.postProposalLoading,
    postProposalData: Proposal?.postProposalDetails,
    postProposalStatus: Proposal?.postProposalstatus
  }
}

const mapDispatchToProps = dispatch => ({
  getProposalDetailsDispatch: () =>
    dispatch(ProposalAction.GetProposalDetailsAction()),
  getSubmitDetailsDispatch: () =>
    dispatch(ProposalAction.GetSubmitDetailsAction()),
  postProposalDetailsDispatch: params =>
    dispatch(ProposalAction.PostProposalDetailsAction(params)),
  clearProposalDetailsDispatch: () =>
    dispatch(ProposalAction.ClearProposalDetailsAction()),
  putSubmitDetailsDispatch: params =>
    dispatch(ProposalAction.PutSubmitDetailsAction(params)),
  getTotalClaimDropDownDispatch: params =>
    dispatch(proposalDropdownAction.getTotalClaim(params)),
  getLeaseDropDownDispatch: params =>
    dispatch(proposalDropdownAction.getLeaseDropdown(params)),
  getQuoteDetailsDispatch: id =>
    dispatch(MotorQuotationAction.GetQuoteDetailsAction(id)),
  getExcessDropDownDispatch: params =>
    dispatch(proposalDropdownAction.getXSOptionRequest(params))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(_FormProposalDetails)

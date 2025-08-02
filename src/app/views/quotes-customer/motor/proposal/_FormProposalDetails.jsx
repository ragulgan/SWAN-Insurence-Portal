import React, { Fragment, useEffect, useState } from 'react'
import { Grid, Button, Dialog, makeStyles, CircularProgress, Typography } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import _ from 'lodash'
import { useHistory } from 'react-router-dom'
import Mtextbox from '../../../../../app/form-controls/Mtextbox'
import Mselect from '../../../../../app/form-controls/Mselect'
import Mswitch from '../../../../../app/form-controls/Mswitch'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Mtextarea from '../../../../../app/form-controls/Mtextarea'
import ValidateNotify from '../../../../../app/widgets/ValidateNotify'  
import InfoPopup from '../../../../../app/widgets/InfoPopup'
import { useTheme } from '@material-ui/core/styles'

import Mdatepicker from '../../../../../app/form-controls/Mdatepicker'
import { connect, shallowEqual, useSelector } from 'react-redux'
import {
  ProposalAction, MotorPlanActions,
  proposalDropdownAction,
  MotorQuotationAction
} from '../../../../../store/actions/index'

import { ShowField } from '../../../../../app/uiComponents'
import {
  checkResFailed,
  setSessionStorage,
  removeErrString,
  preventIfNotNumber,
  handleSetError,
  handleTrimWhiteSpace,
  getSessionStorage,
  preventIfNotAlphaChars,
  removeSingleZero
  , thousandSeparatorByValue
} from '../../../../../helpers/helper'
import moment from 'moment'
import { MOTOR_FORM, GRANTED_USERS, REGEX, VARIABLES, DATE } from '../../../../../helpers/constants'
import { ERROR } from '../../../../../helpers/messages'

import toast from 'react-hot-toast'
import CustomBackdrop from '../../../../../app/backdrop/CustomBackdrop'

const _FormProposalDetails = props => {
  const theme = useTheme()
  const {
    setActiveStepDispatch,
    fromPage,
    next,
    postProposalDetailsDispatch,
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
    postApproveStatusDispatch,
    clearApproveStatusDispatch,
    postApprovalStatusData,
    postApprovalStatusStatus,
    ClearMotQuoteDetailsDispatch,
    ExcessOptionStatus
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
    },
    BtnDisable: {
      backgroundColor: 'rgba(0, 0, 0, 0.26)',
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.26)'
      }
    },
    textColor: {
      color: '#00B8CE !important'
    },
    margin: {
      marginTop: '5px',
      marginBottom: '10px',
      color: '#091641 !important',
      textAlign: 'center'
    },
    flex: {
      justifyContent: 'end',
      color: '#00B8CE !important'
    },
    btn: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '12px',
      marginBottom: '8px'
    },
    btnFlex: {
      margin: '5px',
      minWidth: '150px'
    },
    confirmationText: {
      fontSize: '22px',
      paddingBottom: '17px'
    }
  }))
  const classes = useStyles()
  const [message, setMessage] = useState('')
  const {
    control,
    setValue,
    handleSubmit,
    formState,
    getValues,
    checked,
    watch,
    reset,
    setError,
    clearErrors
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
      NOCLMYR1: '0',
      NOCLMYR2: '0',
      NOCLMYR3: '0',
      CLMYR1: moment().subtract(2, 'years').format('YYYY'),
      CLMYR2: moment().subtract(1, 'years').format('YYYY'),
      CLMYR3: moment().format('YYYY'),
      PRVINSURER: '',
      RALLYIND: '',
      GOODCARIND: '',
      PASSHIRE: '',
      MTTRADEIND: false,
      OTHINSURER: '',
      LEASING: 'None',
      OWNER: false,
      ADDR1: '',
      RefRemarks: '',
      LEASINDIC: '',
      HIGHPURIND: '',
      LienName: '',
      LienADDR1: '',
      ACCIND: false,
      CompulsoryXs: '',
      USEDTL: ''
    },
    isValid
  })

  const { authRole } = useSelector(
    ({ Auth }) => ({
      authRole: Auth.authRole
    }),
    shallowEqual
  )
  const history = useHistory()
  const summaryPage = fromPage === 'summary'
  const [errorPop, setErrorPop] = useState(false)
  const [showCusModal, setShowCusModal] = useState(false)
  const [state, setState] = useState({
    personalData: {},
    vehicleData: {},
    extensionData: {},
    status: ''
  })
  const CompulsoryXsWatcher = watch('CompulsoryXs')
  const RallyWatcher = watch('RALLYIND')
  const GoodCareWatcher = watch('GOODCARIND')
  const PassHireWatcher = watch('PASSHIRE')
  const TradingWatcher = watch('MTTRADEIND')
  watch('PRVINSURER')
  const PrevInsureValue = getValues('PRVINSURER')
  const [proposal_step1Data, setProposal_step1Data] = useState()

  const { errors, isValid } = formState
  const ExcessDropdown = []
  !_.isEmpty(ExcessOptionData) && Object.keys(ExcessOptionData).map((item) => {
    ExcessDropdown.push({ excessLabel: ExcessOptionData[item], excessValue: ExcessOptionData[item] })
  })
  const clearNotify = () => {
    setErrorPop(false)
  }
  const watchOwner = watch('OWNER', false)
  const watchLease = watch('LEASING', 'string')
  const watchRefInsInd = watch('REFINSIND', 'string')
  const DTBIRTH = state.personalData?.DTBIRTH
  const onSubmit = data => {
    const personalPayload = _.omit(state.personalData, ['DTBIRTH'])
    const payload = {
      ...data,
      ...personalPayload,
      ...state.vehicleData,
      ...state.extensionData,
      CLMYR1: moment(data?.CLMYR1).format('YYYY'),
      CLMYR2: moment(data?.CLMYR2).format('YYYY'),
      CLMYR3: data?.CLMYR3 ? moment(data?.CLMYR3).format('YYYY') : '',
      RALLYIND: data?.RALLYIND === true ? 'Y' : 'N',
      REFINSIND: data?.REFINSIND === true ? 'Y' : 'N',
      PASSHIRE: data?.PASSHIRE === true ? 'Y' : 'N',
      GOODCARIND: data?.GOODCARIND === true ? 'Y' : 'N',
      LICSUSIND: data?.LICSUSIND === true ? 'Y' : 'N',
      CONVICIND: data?.CONVICIND === true ? 'Y' : 'N',
      PROSECIND: data?.PROSECIND === true ? 'Y' : 'N',
      MTTRADEIND: data?.MTTRADEIND === true ? 'Y' : 'N',
      ACCIND: data?.ACCIND === true ? 'Y' : 'N',
      DTBIRTH: moment(DTBIRTH).format('DD/MM/YYYY'),
      LIENIND: watchLease === 'Lien' ? 'Y' : 'N',
      LEASING: watchLease === 'Leasing' ? 'Y' : 'N',
      HIGHPURIND: watchLease === 'None' ? 'Y' : 'N',
      NOCLAIMIND: false,
      DTLACCDNTS: data?.DTLACCDNTS,
      // TOTNOCLMS: state?.personalData?.TOTNOCLMS
      //   ? state?.personalData?.TOTNOCLMS
      //   : totalClaim,
      // AICOPTION: "",
      PurchaseType: {
        type: state.vehicleData?.PurchaseType,
        value: `${state.vehicleData?.PurchaseType === 'Second Hand' ? 'Y' : 'N'}`
      },
      ADDR1: data?.ADDR1 ? data?.ADDR1 : '',
      OTHINSURER: data?.OTHINSURER ? data?.OTHINSURER : '',
      LienName: data?.LienName ? data?.LienName : '',
      LienADDR1: data?.LienADDR1 ? data?.LienADDR1 : '',
      SubModel: state?.vehicleData?.SubModel ? state?.vehicleData?.SubModel : '',
      NoOfSeats: state?.vehicleData?.NoOfSeats?.toString(),
      OWNER: data?.OWNER === true ? 'Y' : 'N',
      PRVINSURER: data?.PRVINSURER ? data?.PRVINSURER : '',
      NOCLMYR1: data?.NOCLMYR1?.toString(),
      NOCLMYR2: data?.NOCLMYR2?.toString(),
      NOCLMYR3: data?.NOCLMYR3?.toString(),
      USEDTL: data?.USEDTL
    }
    const totalSumClaim =
      +data?.NOCLMYR1 + +data?.NOCLMYR2 + +data?.NOCLMYR3
        ? +data?.NOCLMYR1 + +data?.NOCLMYR2 + +data?.NOCLMYR3
        : '0'
    const checkSumofClaim = state?.personalData?.TOTNOCLMS !== 0 ? state?.personalData?.TOTNOCLMS : '0'
    const errorGreater = 'Total Number of Claims Should be less than or equals to 5'
    const totalclaimError = 'Total Number of Claims does not match with the ones specified during the past 3 years'
    if (totalSumClaim?.toString() !== checkSumofClaim?.toString() || checkSumofClaim?.toString() > 5) {
      setMessage(checkSumofClaim?.toString() > 5 ? errorGreater : totalclaimError)
      setError('NOCLMYR1', { type: 'error' }, { shouldFocus: true, message: '' })
      setError('NOCLMYR2', { type: 'error' }, { shouldFocus: true, message: '' })
      setError('NOCLMYR3', { type: 'error' }, { shouldFocus: true, message: '' })
      setErrorPop(true)
    } else {
      setProposal_step1Data(payload)
      postProposalDetailsDispatch(payload)
    }
  }
  const quotnum = getSessionStorage(MOTOR_FORM.QUOTE_NUMBER)
  useEffect(() => {
    window.scrollTo(0, localStorage.getItem('position'))
    getTotalClaimDropDownDispatch()
    getLeaseDropDownDispatch()
    const payload_id = {
      quotnum
    }
    getExcessDropDownDispatch(payload_id)
    if (quotnum) {
      getQuoteDetailsDispatch(quotnum)
    }
  }, [])

  const onError = (errors, e) => {
    if (!_.isEmpty(errors)) {
      setErrorPop(true)
      setMessage('Please fill in required information to proceed')
    }
  }
  const resetTheValues = item => {
    reset(formValues => ({
      ...formValues,
      HEALTHDTL: item.HEALTHDTL,
      OTHDRVDTL: item.OTHDRVDTL,
      CONVICIND: item.CONVICIND === 'Y',
      PROSECIND: item.PROSECIND === 'Y',
      LICSUSIND: item.LICSUSIND === 'Y',
      REFINSIND: item.REFINSIND === 'Y',
      CHASSIS: item.CHASSIS,
      OwnerName: item.OwnerName,
      NOCLMYR1: item.NOCLMYR1?.toString(),
      NOCLMYR2: item.NOCLMYR2?.toString(),
      NOCLMYR3: item.NOCLMYR3?.toString(),
      CLMYR1: item.CLMYR1 ? item.CLMYR1 : moment().subtract(2, 'years').format('YYYY'),
      CLMYR2: item.CLMYR2 ? item.CLMYR2 : moment().subtract(1, 'years').format('YYYY'),
      CLMYR3: item.CLMYR3 ? item.CLMYR3 : moment().format('YYYY'),
      PRVINSURER: item.PRVINSURER ? item.PRVINSURER : '',
      RALLYIND: item.RALLYIND === 'Y' ,
      GOODCARIND: item.GOODCARIND === 'Y' ,
      PASSHIRE: item.PASSHIRE === 'Y' ,
      MTTRADEIND: item.MTTRADEIND === 'Y' ,
      ACCIND: item.ACCIND === 'Y' ,
      OTHINSURER: item.OTHINSURER,
      LEASING: item.LEASING === 'Y' ? 'Leasing' : item.LIENIND === 'Y' ? 'Lien' : 'None',
      OWNER: item.OWNER === 'Y' ,
      ADDR1: item.ADDR1,
      RefRemarks: item.RefRemarks,
      LEASINDIC: item.LEASINDIC,
      HIGHPURIND: item.HIGHPURIND,
      LienName: item.LienName,
      LienADDR1: item.LienADDR1,
      CompulsoryXs: item?.CompulsoryXs,
      USEDTL: item?.USEDTL,
      DTLACCDNTS: item?.DTLACCDNTS
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
        extensionData: extension,
        status: getQuoteDetails?.quostatus
      }))
      const payload = {
        ...proposalsData,
        ...vehicleDetails
      }
      if (!_.isEmpty(proposalsData) && getQuoteDetails?.proposals?.LEASING !== '') {
        resetTheValues(payload)
      }
      ClearMotQuoteDetailsDispatch()
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
      VALUE: 'Hire/Purchase',
      LABEL: 'Hire/Purchase'
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
    if (Object.keys(ExcessOptionData).length === 1) {
      resetExcessOption(ExcessOptionData?.option1)
    }
  }, [ExcessOptionStatus])
  function resetExcessOption (item) {
    reset((formValues) => ({
      ...formValues,
      CompulsoryXs: item
    }))
  }
  useEffect(() => {
    if (postProposalStatus === 'success' && !checkResFailed(postProposalData)) {
      toast.success('Proposal informations have been saved!', {
        duration: 3000
      })
      if(state.status === VARIABLES.STATUS_APPROVE) {
        next()
      } else {
        setShowCusModal(true)
      }
      clearProposalDetailsDispatch()
      const QuoteId = postProposalData.split('-')
      setSessionStorage(MOTOR_FORM.QUOTE_NUMBER, QuoteId[1])
      // const ApprovePayload = {
      //   COMPANY: false,
      //   Make: state.vehicleData?.Make,
      //   Model: state.vehicleData?.Model,
      //   SubModel: state.vehicleData?.SubModel,
      //   TITLE: state.personalData?.TITLE,
      //   FIRSTNAME: state.personalData?.FIRSTNAME,
      //   LASTNAME: state.personalData?.LASTNAME,
      //   EngineCapacity: state.vehicleData?.EngineCapacity,
      //   OCCUPATION: state.personalData?.OCCUPATION,
      //   VhKeptIn: state.vehicleData?.VhKeptIn,
      //   SecAlrm: state.vehicleData?.SecAlrm,
      //   YEARLIC: state.personalData?.YEARLIC,
      //   TOTNOCLMS: state.personalData.TOTNOCLMS ? state.personalData.TOTNOCLM : '0',
      //   RegYr: state.vehicleData?.RegYr,
      //   SumInsured: state.vehicleData?.SumInsured,
      //   NICNO: state.personalData?.NICNO,
      //   DTBIRTH: moment(DTBIRTH).format('DD/MM/YYYY')
      // }
      // postApproveStatusDispatch(ApprovePayload)
    } else if (
      postProposalStatus === 'error' ||
      checkResFailed(postProposalData)
    ) {
      toast.error(removeErrString(postProposalData), { duration: 4000 })
      clearProposalDetailsDispatch()
    }
  }, [postProposalStatus])

  useEffect(() => {
    if (postApprovalStatusStatus === 'success' &&
      postApprovalStatusData === VARIABLES.APPROVE_STATUS) {
      clearApproveStatusDispatch()
    } else if (postApprovalStatusData === VARIABLES.NO_APPROVE_STATUS) {
      setShowCusModal(true)
    }
  }, [postApprovalStatusStatus])

  const closeDialog = () => {
    setShowCusModal(false)
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
              A Swan Representative will get in touch to proceed with processing
            </h4>
          </Grid>
        </Grid>
      </Dialog>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
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
                    clearErrors={clearErrors}
                    grantedUsers={GRANTED_USERS.CUSTOMER}
                    userType={authRole}
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
                    label='Other Driver details (Age, Occupation, Licence Info,
                                      Driving Experience etc.)'
                    control={control}
                    clearErrors={clearErrors}
                    grantedUsers={GRANTED_USERS.CUSTOMER}
                    userType={authRole}
                    maxLength={250}
                    pattern={REGEX.ALPHA_NUMERIC_CHARS}
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
                    lMd={8}
                    name='ACCIND'
                    label='Have you or any of the above drivers had any accident or loss during the past 5 years whether insured or not?'
                    cSpacing={3}
                    control={control}
                    clearErrors={clearErrors}
                    className='my-2'
                    grantedUsers={GRANTED_USERS.CUSTOMER}
                    userType={authRole}
                  />
                  <Mswitch
                    xs={12}
                    lMd={8}
                    name='CONVICIND'
                    label='Have you or any of the above drivers had any conviction in the past 5 years?'
                    cSpacing={3}
                    control={control}
                    clearErrors={clearErrors}
                    className='my-2'
                    grantedUsers={GRANTED_USERS.CUSTOMER}
                    userType={authRole}
                  />

                  <Mswitch
                    xs={12}
                    lMd={8}
                    name='PROSECIND'
                    label='Have you or any of the above drivers had any prosecution pending for any offence in connection with a motor vehicle?'
                    cSpacing={3}
                    control={control}
                    clearErrors={clearErrors}
                    className='my-2'
                    grantedUsers={GRANTED_USERS.CUSTOMER}
                    userType={authRole}
                  />

                  <Mswitch
                    xs={12}
                    lMd={8}
                    name='LICSUSIND'
                    label='Have you or any of the above drivers had their licence suspended?'
                    cSpacing={3}
                    control={control}
                    clearErrors={clearErrors}
                    grantedUsers={GRANTED_USERS.CUSTOMER}
                    userType={authRole}
                  />
                  <Mswitch
                    xs={12}
                    lMd={8}
                    name='REFINSIND'
                    label='Have you or any of the above drivers been refused insurance at normal rates or terms during the past 5 years?'
                    cSpacing={3}
                    control={control}
                    clearErrors={clearErrors}
                    grantedUsers={GRANTED_USERS.CUSTOMER}
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
                          clearErrors={clearErrors}
                          label='Please Specify'
                          grantedUsers={GRANTED_USERS.CUSTOMER}
                          userType={authRole}
                          pattern={REGEX.ALPHA_NUMERIC_CHARS_SPACE}
                          maxLength={100}
                          onBlur={e => {
                            handleTrimWhiteSpace(e, 'RefRemarks', setValue)
                            removeSingleZero(e, 'RefRemarks', setValue)
                            handleSetError(
                              e,
                              'RefRemarks',
                              setError,
                              REGEX.ALPHA_NUMERIC_CHARS_SPACE,
                              ERROR.ALPHA_NUMERIC_SPACE
                            )
                          }}
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
                    clearErrors={clearErrors}
                    label='Chassis Number'
                    maxLength={30}
                    grantedUsers={GRANTED_USERS.CUSTOMER}
                    userType={authRole}
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
                    cSpacing={3}
                    xs={12}
                    name='OWNER'
                    label='Are you the owner of the motor vehicle and is it registered in your name?'
                    control={control}
                    clearErrors={clearErrors}
                    grantedUsers={GRANTED_USERS.CUSTOMER}
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
                          clearErrors={clearErrors}
                          label='Name of registered owner'
                          grantedUsers={GRANTED_USERS.CUSTOMER}
                          userType={authRole}
                          pattern={REGEX.ALPHA_NUMERIC_CHARS_SPACE}
                          onKeyPress={e => {
                            preventIfNotAlphaChars(e)
                          }}
                          onBlur={e => {
                            handleSetError(
                              e,
                              'OwnerName',
                              setError,
                              REGEX.ALPHA_NUMERIC_CHARS_SPACE,
                              ERROR.ALPHA_NUMERIC_SPACE
                            )
                          }}
                          maxLength={30}
                        />
                        <Mtextbox
                          xs={12}
                          name='ADDR1'
                          control={control}
                          clearErrors={clearErrors}
                          label='Address of registered owner'
                          grantedUsers={GRANTED_USERS.CUSTOMER}
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
                    clearErrors={clearErrors}
                    options={ownershipOptions}
                    optionsLabel='VALUE'
                    optionsValue='LABEL'
                    grantedUsers={GRANTED_USERS.CUSTOMER}
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
                          clearErrors={clearErrors}
                          options={getLeasingData && getLeasingData}
                          optionsLabel='LSNAME'
                          optionsValue='LEASING'
                          req
                          grantedUsers={GRANTED_USERS.CUSTOMER}
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
                          grantedUsers={GRANTED_USERS.CUSTOMER}
                          userType={authRole}
                          maxLength={30}
                          onKeyPress={e => {
                            preventIfNotAlphaChars(e)
                          }}
                        />
                        <Mtextbox
                          xs={12}
                          name='LienADDR1'
                          control={control}
                          clearErrors={clearErrors}
                          label='Address of person/Firm'
                          grantedUsers={GRANTED_USERS.CUSTOMER}
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
                    clearErrors={clearErrors}
                    className={classes.alignTopBottom}
                    grantedUsers={GRANTED_USERS.CUSTOMER}
                    userType={authRole}
                    placeholder={DATE.YEAR_ONLY}
                    minDate={moment().subtract(3, 'years')}
                    maxDate={moment().subtract(1, 'years')}
                    onKeyPress={e => {
                      preventIfNotNumber(e)
                    }}
                    req={state?.personalData?.TOTNOCLMS?.toString() !== '0'}
                  />

                  <Mtextbox
                    xs={12}
                    md={6}
                    name='NOCLMYR1'
                    label='Number of Claims'
                    control={control}
                    clearErrors={clearErrors}
                    grantedUsers={GRANTED_USERS.CUSTOMER}
                    userType={authRole}
                    maxLength={5}
                    onKeyPress={e => {
                      preventIfNotNumber(e)
                    }}
                    req={state?.personalData?.TOTNOCLMS?.toString() !== '0'}
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
                    grantedUsers={GRANTED_USERS.CUSTOMER}
                    userType={authRole}
                    placeholder={DATE.YEAR_ONLY}
                    minDate={moment().subtract(3, 'years')}
                    maxDate={moment().subtract(1, 'years')}
                    onKeyPress={e => {
                      preventIfNotNumber(e)
                    }}
                    req={state?.personalData?.TOTNOCLMS?.toString() !== '0'}
                  />

                  <Mtextbox
                    xs={12}
                    md={6}
                    name='NOCLMYR2'
                    label='Number of Claims'
                    control={control}
                    clearErrors={clearErrors}
                    grantedUsers={GRANTED_USERS.CUSTOMER}
                    userType={authRole}
                    maxLength={5}
                    onKeyPress={e => {
                      preventIfNotNumber(e)
                    }}
                    req={state?.personalData?.TOTNOCLMS?.toString() !== '0'}
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
                    grantedUsers={GRANTED_USERS.CUSTOMER}
                    userType={authRole}
                    placeholder={DATE.YEAR_ONLY}
                    minDate={moment().subtract(3, 'years')}
                    maxDate={moment()}
                    onKeyPress={e => {
                      preventIfNotNumber(e)
                    }}
                    req={state?.personalData?.TOTNOCLMS?.toString() !== '0'}
                  />

                  <Mtextbox
                    xs={12}
                    md={6}
                    name='NOCLMYR3'
                    label='Number of Claims'
                    control={control}
                    clearErrors={clearErrors}
                    grantedUsers={GRANTED_USERS.CUSTOMER}
                    userType={authRole}
                    maxLength={5}
                    onKeyPress={e => {
                      preventIfNotNumber(e)
                    }}
                    req={state?.personalData?.TOTNOCLMS?.toString() !== '0'}
                  />
                  <h4 className={classes.textalign}>Total No. of claims: {state?.personalData?.TOTNOCLMS}</h4>
                  <ShowField
                    show={state?.personalData?.TOTNOCLMS?.toString() !== '0'}
                    yes={() => (
                      <Mtextarea
                        xs={12}
                        name='DTLACCDNTS'
                        label='Please describe accidents/claims'
                        control={control}
                        clearErrors={clearErrors}
                        grantedUsers={GRANTED_USERS.CUSTOMER}
                        userType={authRole}
                        req
                        maxLength={255}
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
                      />
                    )}
                    no={() => null}
                  />
                  <Mselect
                    reset={reset}
                    xs={12}
                    name='PRVINSURER'
                    label='Previous Insurer in respect to any motor vehicle'
                    control={control}
                    clearErrors={clearErrors}
                    options={TotalClaimDropdownData && TotalClaimDropdownData}
                    optionsLabel='STATDESC'
                    optionsValue='STATCOD'
                    grantedUsers={GRANTED_USERS.CUSTOMER}
                    userType={authRole}
                  />
                  <ShowField
                    show={PrevInsureValue === 'O'}
                    yes={() => (
                      <Mtextarea
                        xs={12}
                        name='OTHINSURER'
                        label='Specify if insurer is not in the list'
                        control={control}
                        clearErrors={clearErrors}
                        grantedUsers={GRANTED_USERS.CUSTOMER}
                        userType={authRole}
                        maxLength={50}
                        onBlur={e => {
                          handleTrimWhiteSpace(e, 'OTHINSURER', setValue)
                          removeSingleZero(e, 'OTHINSURER', setValue)
                          handleSetError(
                            e,
                            'OTHINSURER',
                            setError,
                            REGEX.ALPHA_NUMERIC_CHARS_SPACE,
                            ERROR.ALPHA_NUMERIC_SPACE
                          )
                        }}
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
                    clearErrors={clearErrors}
                    grantedUsers={GRANTED_USERS.CUSTOMER}
                    userType={authRole}
                  />

                  <Mswitch
                    cSpacing={3}
                    xs={12}
                    cMd={8}
                    name='GOODCARIND'
                    label='Will the motor car be used for carriage of goods for business or trade purposes?'
                    control={control}
                    clearErrors={clearErrors}
                    grantedUsers={GRANTED_USERS.CUSTOMER}
                    userType={authRole}
                  />

                  <Mswitch
                    cSpacing={3}
                    xs={12}
                    name='PASSHIRE'
                    label='Will the motor car be used for carriage of passengers for hire or reward?'
                    control={control}
                    clearErrors={clearErrors}
                    grantedUsers={GRANTED_USERS.CUSTOMER}
                    userType={authRole}
                  />
                  <Mswitch
                    cSpacing={3}
                    xs={12}
                    name='MTTRADEIND'
                    label='Will the motor car be used in connection with the motor trade?'
                    control={control}
                    clearErrors={clearErrors}
                    setValue={checked}
                    grantedUsers={GRANTED_USERS.CUSTOMER}
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
                          grantedUsers={GRANTED_USERS.CUSTOMER}
                          userType={authRole}
                          maxLength={150}
                          req
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
                          clearErrors={clearErrors}
                        />
                      </>
                    )}
                    no={() => null}
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
                          clearErrors={clearErrors}
                          options={ExcessDropdown}
                          optionsLabel='excessLabel'
                          optionsValue='excessValue'
                          grantedUsers={GRANTED_USERS.CUSTOMER}
                          userType={authRole}
                          req
                        />
                      </>
                    )}
                    no={() => (
                      <>
                        <Mtextbox
                          xs={12}
                          name='CompulsoryXs'
                          control={control}
                          clearErrors={clearErrors}
                          label='Excess options'
                          grantedUsers={GRANTED_USERS.CUSTOMER}
                          userType={authRole}
                          onKeyPress={e => {
                            preventIfNotNumber(e)
                          }}
                          // onBlur={e => {
                          //   removeSingleZero(e, 'CompulsoryXs', setValue)
                          // }}
                          req
                          readOnly
                        />
                      </>
                    )}

                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={fromPage === 'summary' ? 12 : 4} sm={12} xs={12}>
            <ShowField
              show={fromPage === 'summary'}
              yes={() => null}
              no={() => (
                <>
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
                        ? thousandSeparatorByValue(state?.extensionData?.NETPREM)
                        : 0}
                      </h4>
                    </div>
                    <ul className='summary-ul bb'>
                      <div>
                        <h4 className='summary-heading-alt'>
                          Vehicle Details{' '}
                          <span>
                            {/* <EditIcon fontSize="medium" onClick={() => back()} className={classes.textColor} /> */}
                          </span>
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
                          Rs
                          {state && state.extensionData &&
                            state.extensionData.luseprem
                            ? thousandSeparatorByValue(state.extensionData.luseprem)
                            : 0}
                        </span>
                      </li>
                      <li>
                        Passive terrorism
                        <span>
                          Rs
                          {state && state.extensionData &&
                            state.extensionData.PASTERPREM
                            ? thousandSeparatorByValue(state.extensionData.PASTERPREM)
                            : 0}
                        </span>
                      </li>
                      <li>
                        Rodent Damage
                        <span>
                          Rs
                          {state && state.extensionData &&
                            state.extensionData.RODENTPREM
                            ? thousandSeparatorByValue(state.extensionData.RODENTPREM)
                            : 0}
                        </span>
                      </li>
                      <li>
                        Finance gap
                        <span>
                          Rs
                          {state && state.extensionData &&
                            state.extensionData.FGAPPREM
                            ? thousandSeparatorByValue(state.extensionData.FGAPPREM)
                            : 0}
                        </span>
                      </li>
                      <li>
                        Swan Agreed Repairer
                        <span>
                          Rs
                          {state && state.extensionData &&
                            state.extensionData.MKGDISCAMT
                            ? thousandSeparatorByValue(state.extensionData.MKGDISCAMT)
                            : 0}
                        </span>
                      </li>
                      <li>
                        Breakdown Service
                        <span>
                          Rs     {state && state.extensionData &&
                            state.extensionData.BRSFEES
                          ? thousandSeparatorByValue(state.extensionData.BRSFEES)
                          : 0}
                        </span>
                      </li>
                      {Object.keys(ExcessOptionData).length === 1 || CompulsoryXsWatcher
                        ? <li>
                          Compulsory Excess
                          <span>
                            Rs      {CompulsoryXsWatcher
                            ? thousandSeparatorByValue(Object.keys(ExcessOptionData).length !== 1 ? CompulsoryXsWatcher : ExcessOptionData.option1)
                            : 0}
                          </span>
                        </li>
                        : ''}
                    </ul>
                  </section>
                </>
              )}
            />
          </Grid>
          <Grid item md={fromPage === 'summary' ? 12 : 8}>
            <ValidateNotify show={errorPop} errors={message} clear={setErrorPop} />
          </Grid>
          <Grid
            item
            md={fromPage === 'summary' ? 12 : 4}
            sm={fromPage === 'summary' ? 12 : 4}
            className='txt-right'
          >
            <ShowField
              show={!summaryPage}
              yes={() => (
                <>
                  <Button
                    variant='outlined'
                    color='primary'
                    className='mar-right-s'
                    onClick={() => {
                      setSessionStorage(MOTOR_FORM.ACTIVE_STEP, 3)
                      history.push(`/${authRole}/quotes/motor`)
                    }}
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
            >
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
    </>
  )
}

const mapStateToProps = state => {
  const { MotorPlan, Proposal, ProposalDropDown, MotorQuotation } = state
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
    postProposalStatus: Proposal?.postProposalstatus,
    postApprovalStatusLoading: MotorPlan.postApprovalStatusLoading,
    postApprovalStatusData: MotorPlan.postApprovalStatusData,
    postApprovalStatusStatus: MotorPlan.postApprovalStatusStatus
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
    dispatch(proposalDropdownAction.getXSOptionRequest(params)),
  postApproveStatusDispatch: formData =>
    dispatch(MotorPlanActions.PostApprovalStatusAction(formData)),
  clearApproveStatusDispatch: formData =>
    dispatch(MotorPlanActions.ClearPostApprovalStatusAction(formData)),
  ClearMotQuoteDetailsDispatch: () =>
    dispatch(MotorQuotationAction.ClearMotQuoteDetailsAction()),
  setActiveStepDispatch: num =>
    dispatch(MotorQuotationAction.setActiveStep(num))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(_FormProposalDetails)

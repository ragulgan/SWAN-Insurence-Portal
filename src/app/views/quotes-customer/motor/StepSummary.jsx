import React, { useState, useEffect, Fragment } from 'react'
import moment from 'moment'
import { ShowField } from '../../../../app/uiComponents'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import toast from 'react-hot-toast'
import { connect } from 'react-redux'
import {
  Grid,
  Card,
  CardHeader,
  Box,
  Button,
  CircularProgress,
  Chip,
  makeStyles,
  Dialog,
  Tabs,
  Tab
} from '@material-ui/core'
import CustomBackdrop from '../../../../app/backdrop/CustomBackdrop'
import { useHistory } from 'react-router-dom'
import { MOTOR_FORM, SWAN_API_URL } from '../../../../helpers/constants'
import { MotorQuotationAction } from '../../../../store/actions/MotorQuotationAction'
import { MotorPlanActions } from '../../../../store/actions/motorPlanAction'
import {
  getLocalStorage,
  getSessionStorage,
  removeErrString,
  checkResFailed,
  removeLocalStorage,
  removeSessionStorage
  , thousandSeparatorByValue
} from '../../../../helpers/helper'
import { withStyles } from '@material-ui/core/styles'

function TabPanel (props) {
  const { children, value, index, ...other } = props
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </div>
  )
}

const AntTabs = withStyles({
  root: {
    borderBottom: '1px solid #e8e8e8'
  },
  indicator: {
    backgroundColor: '#002f87'
  }
})(Tabs)

const AntTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    minWidth: '135px',
    fontWeight: 'bold',
    fontSize: '14px',
    marginRight: '8px',
    '&:hover': {
      color: '#000000',
      opacity: 1
    },
    '&$selected': {
      color: '#002f87',
      fontWeight: 'bold'
    },
    '&:focus': {
      color: '#002f87'
    }
  },
  selected: {}
}))((props) => <Tab disableRipple {...props} />)

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: '4px !important',
    fontSize: '1.0rem !important'
  },
  margin: {
    marginTop: '5px',
    marginBottom: '10px',
    color: '#091641 !important',
    textAlign: 'center'
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
  downloadIcon: {
    color: '#00b8ce'
  },
  textColor: {
    color: '#00B8CE !important'
  },
  overLay: {
    background: 'lightgray !important',
    pointerEvents: 'none !important'
  },
  confirmationText: {
    fontSize: '22px',
    paddingBottom: '17px'
  },
  flex: {
    justifyContent: 'end',
    color: '#00B8CE !important'
  },
  card: {
    borderRadius: '15px'
  },
  header: {
    backgroundColor: 'rgb(0, 32, 94)',
    color: '#fff',
    display: 'flex',
    justifyContent: 'start',
    fontSize: '22px'
  },
  space: {
    margin: '25px'
  }
}))

const StepMotorSummary = (props) => {
  const {
    getQuoteDetailsDispatch,
    getQuoteDetails,
    getQuoteDetailsStatus,
    getQuoteDetailsLoading,
    provisionalQuoteData,
    getProvisionalQuoteLoading,
    getProvisionalQuoteDispatch,
    setActiveStepDispatch,
    motorActiveStep,
    back,
    changeStep,
    backStep,
    postCancelQuoteDispatch,
    clearCancelQuoteDispatch,
    postCancelQuoteLoading,
    postCancelQuoteData,
    postCancelQuoteStatus,
    getSmoothRateDispatch,
    getSmoothRateData,
    postSendQuoteDispatch,
    downloadQuoteData,
    getDownloadQuoteDispatch,
    postSendQuoteStatus,
    clearSendQuoteDispatch,
    postSendQuoteData,
    clearDownloadQuoteDispatch,
    downloadQuoteStatus
  } = props

  const classes = useStyles()
  const history = useHistory()
  const [open, setOpen] = useState(false)
  const [subValue, setSubValue] = useState(0)
  const [status, setStatus] = useState({
    statusLabel: '',
    statusColor: '',
    email: '',
    name: '',
    createdAt: ''
  })
  const QuoteId = getSessionStorage(MOTOR_FORM.QUOTE_NUMBER)

  const [state, setState] = useState({
    personalData: {},
    vehicleDetails: {},
    extensionDetails: {},
    proposal: {}
  })
  const [showModal, setShowModal] = useState(false)
  const cancelQuote = () => {
    const payload = {
      quotnum: QuoteId
    }
    postCancelQuoteDispatch(payload)
  }
  const closeDialog = () => {
    setShowModal(false)
  }
  useEffect(() => {
    if (postCancelQuoteStatus === 'success') {
      if (postCancelQuoteStatus === 'success') {
        toast.success('Quote was cancelled successfully!', { duration: 3000 })
        clearCancelQuoteDispatch()
        setOpen(false)
        removeSessionStorage(MOTOR_FORM.QUOTE_NUMBER)
        removeLocalStorage(MOTOR_FORM.NAME)
        changeStep(0)
      } else if (postCancelQuoteStatus === 'error' || checkResFailed(postCancelQuoteData)) {
        toast.error(removeErrString(postCancelQuoteData), { duration: 4000 })
        clearCancelQuoteDispatch()
      }
    }
  }, [postCancelQuoteStatus])

  useEffect(() => {
    if (postSendQuoteStatus === 'success') {
      setShowModal(true)
      clearSendQuoteDispatch()
    } else if (postSendQuoteStatus === 'error') {
      toast.error(removeErrString(postSendQuoteData), { duration: 4000 })
      clearSendQuoteDispatch()
    }
    clearDownloadQuoteDispatch()
  }, [postSendQuoteStatus])

  useEffect(() => {
    window.scrollTo(0, localStorage.getItem('position'))
    getQuoteDetailsDispatch(QuoteId)
    getSmoothRateDispatch(QuoteId)
    getProvisionalQuoteDispatch()
    getDownloadQuoteDispatch(QuoteId)
  }, [])

  useEffect(() => {
    if (getQuoteDetailsStatus) {
      const proposals = getQuoteDetails &&
                getQuoteDetails.proposals
        ? getQuoteDetails.proposals
        : {}
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
        setState(prevState => ({
          ...prevState,
          personalData: personalInfo,
          vehicleDetails,
          extensionDetails: extension,
          proposal: proposals
        }))
      }
      setStatus({
        statusLabel: getQuoteDetails && getQuoteDetails.quostatus,
        statusColor: getQuoteDetails && getQuoteDetails.quostatuscode,
        createdAt: getQuoteDetails && getQuoteDetails.createdAt,
        email: getQuoteDetails && getQuoteDetails.personalDetails &&
                    getQuoteDetails.personalDetails.EML
          ? getQuoteDetails.personalDetails.EML
          : '',
        name: getQuoteDetails && getQuoteDetails.personalDetails &&
                    getQuoteDetails.personalDetails.FIRSTNAME
          ? getQuoteDetails.personalDetails.FIRSTNAME
          : ''
      })
    }
  }, [getQuoteDetailsStatus])

  const downloadFiles = (uri) => {
    const link = document.createElement('a')
    const url = window.URL || window.webkitURL
    const revokeUrlAfterSec = 1000
    link.href = uri
    link.download = true
    link.target = '_blank'
    document.body.append(link)
    link.click()
    link.remove()
    setTimeout(() => url.revokeObjectURL(link.href), revokeUrlAfterSec)
  }

  useEffect(() => {
    const formData = {
      QUOTNUM: QuoteId,
      EML: status?.email,
      FIRSTNAME: status?.name,
      QTSTS: status?.statusLabel
    }
    if (status?.email !== '' && postSendQuoteStatus !== 'success') {
      postSendQuoteDispatch(formData)
    }
  }, [status])

  useEffect(() => {
    if (downloadQuoteData && downloadQuoteStatus === 'success') {
      const downloadUrl = `${SWAN_API_URL}/${downloadQuoteData}`
      downloadFiles(downloadUrl)
    }
    clearDownloadQuoteDispatch()
  }, [downloadQuoteStatus])

  const handleSubTabChange = (event, newValue) => {
    setSubValue(newValue)
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  return (
    <>
      <Dialog
        fullWidth
        maxWidth='sm'
        open={showModal}
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
              Quotation has been sent to the client's email and yours.
            </h4>
          </Grid>
        </Grid>
      </Dialog>
      <Dialog
        fullWidth
        maxWidth='sm'
        open={open}
        aria-labelledby='form-dialog-title'
        spacing={4}
      >
        <h2 className='cancelQuoteHeading'>
          Cancel Quotation
        </h2>
        <Grid
          container
          direction='row'
          justifyContent='center'
          alignItems='flex-start'
          className='summary-box motor-summary'
        >
          <Grid item xs={10} className={classes.margin}>
            <h4 className={classes.confirmationText}>
              Are you sure you want to cancel the Quotation?
            </h4>
          </Grid>
          <Grid item className={classes.btn}>
            <Button
              variant='outlined'
              className={classes.btnFlex}
              color='primary'
              onClick={() => setOpen(false)}
            >
              NO
            </Button>
            <Button
              variant='contained'
              className={classes.btnFlex}
              color='primary'
              type='submit'
              onClick={() => cancelQuote()}
            >
              {postCancelQuoteLoading
                ? (
                  <CircularProgress size={18} style={{ color: '#ffffff' }} />
                  )
                : (
                    'YES'
                  )}
            </Button>
          </Grid>
        </Grid>
      </Dialog>
      <Grid
        container
        direction='row'
        justifyContent='center'
        alignItems='flex-start'
      >
        <Grid item xs={6} className={classes.margin}>
          <h4 className={classes.confirmationText}>
            The quotation has been sent to you by email.
            A Swan representative will contact you within 2 working days.
            If you want to proceed with the Provisional quote, click on
            <a href='' className='ml-2'>proceed with proposal.</a>
          </h4>
        </Grid>
      </Grid>
      <Grid
        container
        direction='row'
        justifyContent='center'
        alignItems='flex-start'
        spacing={4}
      >
        <Grid item xs={12} sm={5} md={5}>
          <CustomBackdrop isLoading={getQuoteDetailsLoading || getProvisionalQuoteLoading} />
          <section className='summary-box motor-summary'>
            <Grid
              container
              alignItems='center'
              justifyContent='flex-end'
              spacing={0}
            >
              <Grid item xs={12} sm={6} md={7} m={2}>
                <h4 className='summary-heading'>Provisional Quote</h4>
              </Grid>
              <Grid item xs={12} sm={6} md={5} m={2}>
                <ShowField
                  show={status.statusLabel != ''}
                  yes={() => (
                    <>
                      <Chip
                        className={`${classes.root} f-right`}
                        label={status.statusLabel}
                        variant='outlined'
                        style={{
                          color: status.statusColor,
                          borderColor: status.statusColor
                        }}
                      />
                    </>
                  )}
                  no={() => null}
                />
              </Grid>
            </Grid>
            <ul className='summary-ul bb'>
              <div>
                <h5 className='summary-title'>Summary</h5>
              </div>
              <li className='txt-bb'>Name <span>
                {state && state.personalData
                  ? `${state.personalData.FIRSTNAME} 
                                     ${state.personalData.LASTNAME}`
                  : '--'}
              </span>
              </li>
              <li>Quote Number: <span>
                {QuoteId}
              </span>
              </li>
              <li>Quote Date: <span>
                {status && status.createdAt
                  ? moment(status.createdAt).format('DD/MM/YYYY')
                  : '--'}
              </span>
              </li>
              <li>Quote Validity: <span>
                {provisionalQuoteData && provisionalQuoteData[0]
                  ? `${provisionalQuoteData[0].VALUE} 
                                 ${provisionalQuoteData[0].UNIT}`
                  : '--'}
              </span>
              </li>
            </ul>
            <ul className='summary-ul bb'>
              <div>
                <h4 className='summary-heading-alt'>
                  Vehicle Details{' '}
                </h4>
              </div>
              <li>
                Make
                <span>
                  {state && state.vehicleDetails &&
                                        state.vehicleDetails.Make
                    ? state.vehicleDetails.Make
                    : 0}
                </span>
              </li>
              <li>
                Model
                <span>
                  {state && state.vehicleDetails &&
                                        state.vehicleDetails.Model
                    ? state.vehicleDetails.Model
                    : 0}
                </span>
              </li>
              <li>
                Sub Model
                <span>
                  {state && state.vehicleDetails &&
                                        state.vehicleDetails
                    ? state.vehicleDetails.Make
                    : 0}
                </span>
              </li>
              <li>
                Engine Capacity
                <span>
                  {state && state.vehicleDetails &&
                                        state.vehicleDetails.EngineCapacity
                    ? state.vehicleDetails.EngineCapacity
                    : 0}
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
            <ul className='summary-ul'>
              <ShowField
                show={state?.vehicleDetails?.PolicyType === '00'}
                yes={() => (
                  <>
                    <div>
                      <h5 className='summary-title'>Excess Options</h5>
                    </div>
                    <AntTabs value={subValue} onChange={handleSubTabChange} aria-label='ant example'>
                      <AntTab label={`Opt1-${getSmoothRateData?.data?.option1?.CXSAMT ? thousandSeparatorByValue(getSmoothRateData?.data?.option1?.CXSAMT) : 0}`} />
                      <AntTab label={`Opt2-${getSmoothRateData?.data?.option2?.CXSAMT ? thousandSeparatorByValue(getSmoothRateData?.data?.option2?.CXSAMT) : 0}`} />
                      <AntTab label={`Opt3-${getSmoothRateData?.data?.option3?.CXSAMT ? thousandSeparatorByValue(getSmoothRateData?.data?.option3?.CXSAMT) : 0}`} />

                    </AntTabs>
                    <TabPanel value={subValue} index={0}>
                      <ul
                        className='summary-ul'
                      >
                        <li className=''>Policy Fee :<span>
                          Rs {getSmoothRateData?.data?.option1?.POLFEE ? thousandSeparatorByValue(getSmoothRateData?.data?.option1?.POLFEE) : 0}
                                                     </span>
                        </li>
                        <li>FSC fee: <span>
                          Rs {getSmoothRateData?.data?.option1?.FSCFEE ? thousandSeparatorByValue(getSmoothRateData?.data?.option1?.FSCFEE) : 0}
                                     </span>
                        </li>
                        <li>Premium: <span>
                          Rs {getSmoothRateData?.data?.option1?.TOTPREM ? thousandSeparatorByValue(getSmoothRateData?.data?.option1?.TOTPREM) : 0}
                                     </span>
                        </li>

                      </ul>
                      <div>
                        <h5 className='summary-title txt-center mr-2'> Total Premium <span className='ml-5'>Rs {getSmoothRateData?.data?.option1?.NETPREM ? thousandSeparatorByValue(getSmoothRateData?.data?.option1?.NETPREM) : 0}</span></h5>
                      </div>

                    </TabPanel>
                    <TabPanel value={subValue} index={1}>
                      <ul
                        className='summary-ul'
                      >
                        <li className=''>Policy Fee :<span>
                          Rs {getSmoothRateData?.data?.option2?.POLFEE ? thousandSeparatorByValue(getSmoothRateData?.data?.option2?.POLFEE) : 0}
                                                     </span>
                        </li>
                        <li>FSC fee: <span>
                          Rs {getSmoothRateData?.data?.option2?.FSCFEE ? thousandSeparatorByValue(getSmoothRateData?.data?.option2?.FSCFEE) : 0}
                                     </span>
                        </li>
                        <li>Premium: <span>
                          Rs {getSmoothRateData?.data?.option2?.TOTPREM ? thousandSeparatorByValue(getSmoothRateData?.data?.option2?.TOTPREM) : 0}
                                     </span>
                        </li>

                      </ul>
                      <div>
                        <h5 className='summary-title txt-center mr-2'> Total Premium <span className='ml-5'>Rs {getSmoothRateData?.data?.option2?.NETPREM ? thousandSeparatorByValue(getSmoothRateData?.data?.option2?.NETPREM) : 0}</span></h5>
                      </div>

                    </TabPanel>
                    <TabPanel value={subValue} index={2}>
                      <ul
                        className='summary-ul'
                      >
                        <li className=''>Policy Fee :<span>
                          Rs {getSmoothRateData?.data?.option3?.POLFEE ? thousandSeparatorByValue(getSmoothRateData?.data?.option3?.POLFEE) : 0}
                                                     </span>
                        </li>
                        <li>FSC fee: <span>
                          Rs {getSmoothRateData?.data?.option3?.FSCFEE ? thousandSeparatorByValue(getSmoothRateData?.data?.option3?.FSCFEE) : 0}
                                     </span>
                        </li>
                        <li>Premium: <span>
                          Rs {getSmoothRateData?.data?.option3?.TOTPREM ? thousandSeparatorByValue(getSmoothRateData?.data?.option3?.TOTPREM) : 0}
                                     </span>
                        </li>

                      </ul>
                      <div>
                        <h5 className='summary-title txt-center mr-2'> Total Premium <span className='ml-5'>Rs {getSmoothRateData?.data?.option3?.NETPREM ? thousandSeparatorByValue(getSmoothRateData?.data?.option3?.NETPREM) : 0}</span></h5>
                      </div>
                    </TabPanel>
                  </>
                )}
                no={() => null}
              />
            </ul>
            <Grid
              container
              alignItems='center'
              display='flex'
              justifyContent='center'
              spacing={2}
              className='mt-8'
            >
              <Grid item>
                <Button variant='outlined' color='primary' onClick={handleClickOpen}>
                  {postCancelQuoteLoading
                    ? (
                      <>
                        <CircularProgress size={18} color='primary' />
                      </>
                      )
                    : (
                      <span>Cancel QUOTE</span>
                      )}
                </Button>
              </Grid>
            </Grid>
          </section>
        </Grid>
        <Grid
          item
          xs={12} sm={6} md={6}
        >
          <section className='summary-box motor-summary'>
            <Card className={classes.card}>
              <CardHeader
                className={classes.header}
                title='Full Quotation'
              />
              <Grid item md={12} sm={10} className={classes.space}>
                <ul className='summary-ul bb'>
                  <li style={{ fontSize: '18px', marginBottom: '5px' }}>
                    Private Comprehensive
                    <span>
                      Rs 25,000
                    </span>
                  </li>
                  <li>
                    Cover Type
                    <span>
                      {state && state.vehicleDetails &&
                                                state.vehicleDetails.CoverType === 'NOV'
                        ? 'Protect new car'
                        : 'Protect car'}
                    </span>
                  </li>
                  <li>
                    Compulsory excess
                    <span>
                      {state && state.proposal &&
                                                state.proposal.CompulsoryXs
                        ? state.proposal.CompulsoryXs
                        : '0'}
                    </span>
                  </li>
                  <li>
                    Loss of use
                    <span>
                      {state && state?.extensionDetails?.luseprem
                        ? thousandSeparatorByValue(state?.extensionDetails?.luseprem)
                        : '0'}
                    </span>
                  </li>
                  <li>
                    Driver at fault compensation
                    <span>
                      Rs {state && state.extensionDetails &&
                                                state.extensionDetails.DriverAtFault
                      ? state.extensionDetails.DriverAtFault
                      : '0'}
                    </span>
                  </li>
                  <li>
                    AIC cover
                    <span>
                      {state && state.extensionDetails &&
                                                state.extensionDetails.AICOPTION
                        ? state.extensionDetails.AICOPTION
                        : '--'}
                    </span>
                  </li>
                  <li>
                    Replacement car
                    <span>
                      {state && state.extensionDetails &&
                                                state.extensionDetails.Replacement === true
                        ? 'Yes'
                        : 'No'}
                    </span>
                  </li>
                  <li>
                    Alloy Wheel
                    <span>
                      {state && state.extensionDetails &&
                                                state.extensionDetails.AlloyWheel === true
                        ? 'Yes'
                        : 'No'}
                    </span>
                  </li>
                  <li>
                    Excess Wavier
                    <span>
                      {state && state.extensionDetails &&
                                                state.extensionDetails.ExcessWaiver === true
                        ? 'Yes'
                        : 'No'}
                    </span>
                  </li>
                </ul>
                <ul className='summary-ul bb'>
                  <h4 className='mb-5'>Extra</h4>
                  <li>
                    Finance gap
                    <span>
                      {state && state.extensionDetails &&
                                                state.extensionDetails.FinGap === true
                        ? 'Yes'
                        : 'No'}
                    </span>
                  </li>
                  <li>
                    Passive terrorism
                    <span>
                      {state && state.extensionDetails &&
                                                state.extensionDetails.PassiveTerror === true
                        ? 'Yes'
                        : 'No'}
                    </span>
                  </li>
                </ul>
                <ShowField
                  show={state?.vehicleDetails?.PolicyType === '00'}
                  yes={() => (null)}
                  no={() =>
                    <>
                      <ul className='summary-ul'>
                        <h4 className='mb-5'>Additional Fees</h4>
                        <li>
                          FSC Fee
                          <span>
                            Rs  {state && state.extensionDetails &&
                                                            state.extensionDetails.fscfee
                            ? state.extensionDetails.fscfee
                            : 0}
                          </span>
                        </li>
                        <li>
                          Policy Fee
                          <span>
                            Rs  {state && state.extensionDetails &&
                                                            state.extensionDetails.polfee
                            ? state.extensionDetails.polfee
                            : 0}
                          </span>
                        </li>
                      </ul>
                      <ul className='summary-ul'>
                        <li style={{ fontSize: '22px', marginBottom: '5px' }}>
                          Total
                          <span>
                            Rs  {state && state.extensionDetails &&
                                                            state.extensionDetails.NETPREM
                            ? thousandSeparatorByValue(state.extensionDetails.NETPREM)
                            : 0}
                          </span>
                        </li>
                      </ul>
                    </>}
                />
              </Grid>
            </Card>
          </section>
          <div
            className='txt-right'
            style={{ padding: '30px 0px' }}
          >
            <Button
              variant='outlined' color='primary' className='mar-right-s'
              onClick={() => {
                back()
                backStep("extension")
              }}
            >
              Back
            </Button>
            <Button
              variant='contained' color='primary'
              onClick={() => {
                setActiveStepDispatch(4)
                history.push('/customer/quotes/proposal')
              }}
            >
              PROCEED PROPOSAL
            </Button>
          </div>
        </Grid>
      </Grid>
    </>
  )
}

const mapStateToProps = state => {
  const { MotorQuotation, MotorPlan } = state
  return {
    getQuoteDetails: MotorQuotation?.getQuoteDetails,
    getQuoteDetailsLoading: MotorQuotation?.getQuoteDetailsLoading,
    getQuoteDetailsStatus: MotorQuotation?.getQuoteDetailsStatus,
    provisionalQuoteData: MotorPlan?.provisionalQuoteData,
    getProvisionalQuoteLoading: MotorPlan?.getProvisionalQuoteLoading,
    getDiscountQuoteLoading: MotorPlan?.getDiscountQuoteLoading,
    discountQuoteData: MotorPlan?.discountQuoteData,
    getDownloadQuoteLoading: MotorPlan?.getDownloadQuoteLoading,
    downloadQuoteData: MotorPlan?.downloadQuoteData,
    downloadQuoteStatus: MotorPlan?.downloadQuoteStatus,
    postCancelQuoteLoading: MotorPlan.postCancelQuoteLoading,
    postCancelQuoteData: MotorPlan.postCancelQuoteData,
    postCancelQuoteStatus: MotorPlan.postCancelQuoteStatus,
    postSendQuoteLoading: MotorPlan.postSendQuoteLoading,
    postSendQuoteData: MotorPlan.postSendQuoteData,
    postSendQuoteStatus: MotorPlan.postSendQuoteStatus,
    postSendQuotemessage: MotorPlan.postSendQuotemessage,
    getSmoothRateData: MotorQuotation?.getSmoothRateData,
    getSmoothRateLoading: MotorQuotation?.getSmoothRateLoading,
    motorActiveStep: MotorQuotation?.motorActiveStep
  }
}

const mapDispatchToProps = dispatch => ({
  getQuoteDetailsDispatch: id =>
    dispatch(MotorQuotationAction.GetQuoteDetailsAction(id)),
  getProvisionalQuoteDispatch: () =>
    dispatch(MotorPlanActions.getProvisionalQuoteRequest()),
  getDiscountQuoteDispatch: () =>
    dispatch(MotorPlanActions.getDiscountQuoteRequest()),
  getDownloadQuoteDispatch: id =>
    dispatch(MotorPlanActions.getDownloadQuoteRequest(id)),
  clearDownloadQuoteDispatch: () =>
    dispatch(MotorPlanActions.ClearDownloadQuoteRequest()),
  saveFormDispatch: data => dispatch(MotorQuotationAction.SaveFormAction(data)),
  postCancelQuoteDispatch: formData =>
    dispatch(MotorPlanActions.postCancelQuoteRequest(formData)),
  clearCancelQuoteDispatch: () =>
    dispatch(MotorPlanActions.ClearCancelQuoteRequest()),
  postSendQuoteDispatch: formData =>
    dispatch(MotorPlanActions.postSendQuoteRequest(formData)),
  clearSendQuoteDispatch: () =>
    dispatch(MotorPlanActions.ClearSendQuoteRequest()),
  getSmoothRateDispatch: id =>
    dispatch(MotorQuotationAction.GetSmoothRateAction(id)),
  setActiveStepDispatch: num =>
    dispatch(MotorQuotationAction.setActiveStep(num))
})

export default connect(mapStateToProps, mapDispatchToProps)(StepMotorSummary)

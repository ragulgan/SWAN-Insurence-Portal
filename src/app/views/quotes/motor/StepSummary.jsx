import React, { useState, useEffect, Fragment } from 'react'
import moment from 'moment'
import { ShowField } from '../../../../app/uiComponents'
import { shallowEqual, useSelector, connect } from 'react-redux'
import toast from 'react-hot-toast'

import {
  Grid,
  Box,
  Tabs,
  Tab,
  Button,
  CircularProgress,
  Chip,
  makeStyles,
  Dialog,
  Paper
} from '@material-ui/core'
import { useForm } from 'react-hook-form'
import Icofont from 'react-icofont'
import CloseIcon from '@material-ui/icons/Close'
import GetAppIcon from '@material-ui/icons/GetApp'
import PerfectScrollbar from 'react-perfect-scrollbar'
import CustomBackdrop from '../../../../app/backdrop/CustomBackdrop'
import { useHistory } from 'react-router-dom'
import StepPersonalDetails from './StepPersonalDetails'
import StepVehicleDetails from './StepVehicleDetails'
import StepExtensions from './StepExtensions'
import { MOTOR_FORM, SWAN_API_URL } from '../../../../helpers/constants'
import { MotorQuotationAction } from '../../../../store/actions/MotorQuotationAction'
import { MotorPlanActions } from '../../../../store/actions/motorPlanAction'
import { withStyles } from '@material-ui/core/styles'
import {
  getSessionStorage,
  getLocalStorage,
  removeErrString,
  checkResFailed
} from '../../../../helpers/helper'
const perfectScrollbarOptions = {
  wheelSpeed: 0.5,
  wheelPropagation: false
}

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: '0px !important',
    fontSize: '1.0rem !important'
  },
  margin: {
    marginTop: '5px'
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
  }
}))

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
    minWidth: '72px',
    fontWeight: 'bold',
    fontSize: '10px',
    marginRight: '2px',
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

const StepMotorSummary = (props) => {
  const {
    getQuoteDetailsDispatch,
    getQuoteDetails,
    getQuoteDetailsStatus,
    getQuoteDetailsLoading,
    provisionalQuoteData,
    getProvisionalQuoteLoading,
    getProvisionalQuoteDispatch,
    back,
    getDownloadQuoteDispatch,
    clearDownloadQuoteDispatch,
    getDownloadQuoteLoading,
    downloadQuoteData,
    downloadQuoteStatus,
    postCancelQuoteDispatch,
    clearCancelQuoteDispatch,
    postCancelQuoteLoading,
    postCancelQuoteData,
    postCancelQuoteStatus,
    getCancelReasonDispatch,
    reasonCancelData,
    reasonCancelStatus,
    postSendQuoteDispatch,
    clearSendQuoteDispatch,
    postSendQuoteData,
    postSendQuoteStatus,
    postSendQuoteLoading,
    getSmoothRateDispatch,
    getSmoothRateData,
    getSmoothRateLoading
  } = props
  const { authRole } = useSelector(
    ({ Auth }) => ({
      authRole: Auth.authRole
    }),
    shallowEqual
  )
  const { control, watch } = useForm({
    defaultValues: {
      reasonData: ''
    }
  })
  const classes = useStyles()
  const history = useHistory()
  const [value, setValue] = useState(0)
  const [subValue, setSubValue] = useState(0)
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState({
    statusLabel: '',
    statusColor: '',
    email: '',
    name: ''
  })
  const [state, setState] = useState({
    personalData: {},
    vehicleDetails: {},
    extensionDetails: {}
  })
  const QuoteId = getSessionStorage(MOTOR_FORM.QUOTE_NUMBER)
  const NameValue = getLocalStorage(MOTOR_FORM.NAME)
  const ApprovedStatus = getLocalStorage(MOTOR_FORM.APPROVE_STATUS)

  const handleTabChange = (event, newValue) => {
    setValue(newValue)
  }
  const handleSubTabChange = (event, newValue) => {
    setSubValue(newValue)
  }

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

  const printQuote = () => {
    getDownloadQuoteDispatch(QuoteId)
    if (downloadQuoteData) {
      const downloadUrl = `${SWAN_API_URL}/${downloadQuoteData}`
      downloadFiles(downloadUrl)
    }
  }

  const downloadQuote = () => {
    getDownloadQuoteDispatch(QuoteId)
  }

  const cancelQuote = () => {
    const payload = {
      quotnum: QuoteId
    }
    postCancelQuoteDispatch(payload)
  }

  useEffect(() => {
    if (postCancelQuoteStatus === 'success') {
      if (postCancelQuoteStatus === 'success') {
        toast.success('Quote was cancelled successfully!', { duration: 3000 })
        clearCancelQuoteDispatch()
        setOpen(false)
        history.push('/agent/quotes/list')
      } else if (postCancelQuoteStatus === 'error' || checkResFailed(postCancelQuoteData)) {
        toast.error(removeErrString(postCancelQuoteData), { duration: 4000 })
        clearCancelQuoteDispatch()
      }
    }
    clearDownloadQuoteDispatch()
  }, [postCancelQuoteStatus])

  useEffect(() => {
    if (reasonCancelStatus === 'success') {
      setOpen(false)
    }
  }, [reasonCancelStatus])

  useEffect(() => {
    if (downloadQuoteStatus === 'success') {
      if (downloadQuoteData) {
        const downloadQuoteUrl = `${SWAN_API_URL}/${downloadQuoteData}`
        downloadFiles(downloadQuoteUrl)
      }
    }
    clearDownloadQuoteDispatch()
  }, [downloadQuoteStatus])

  useEffect(() => {
    getQuoteDetailsDispatch(QuoteId)
    getSmoothRateDispatch(QuoteId)
    getProvisionalQuoteDispatch()
    getCancelReasonDispatch()
    // getDiscountQuoteDispatch()
  }, [])

  useEffect(() => {
    if (getQuoteDetailsStatus) {
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
      if (extension) {
        setState(prevState => ({
          ...prevState,
          personalData: personalInfo,
          vehicleDetails,
          extensionDetails: extension
        }))
      }
      setStatus({
        statusLabel: getQuoteDetails && getQuoteDetails.quostatus,
        statusColor: getQuoteDetails && getQuoteDetails.quostatuscode,
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

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleSendQuote = () => {
    const formData = {
      QUOTNUM: QuoteId,
      EML: status.email,
      FIRSTNAME: status.name,
      QTSTS: status.statusLabel
    }
    postSendQuoteDispatch(formData)
  }

  useEffect(() => {
    if (postSendQuoteStatus === 'success') {
      if (postSendQuoteStatus === 'success') {
        toast.success('Quote sent successfully!', { duration: 3000 })
        clearSendQuoteDispatch()
      } else if (postSendQuoteStatus === 'error') {
        toast.error(removeErrString(postSendQuoteData), { duration: 4000 })
        clearSendQuoteDispatch()
      }
    }
    clearDownloadQuoteDispatch()
  }, [postSendQuoteStatus])
  return (
    <>
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
              Are you sure?
            </h4>
            <h4 className={classes.confirmationText}>
              Do you want to cancel the quote?
            </h4>
          </Grid>
          <Grid item className={classes.btn}>
            <Button
              variant='outlined'
              className={classes.btnFlex}
              color='primary'
              onClick={() => setOpen(false)}
            >
              Discard
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
                    'Cancel Quote'
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
                {NameValue || ''}
              </span>
              </li>
              <li>Quote Number: <span>
                {QuoteId}
              </span>
              </li>
              <li>Quote Date: <span>
                {provisionalQuoteData && provisionalQuoteData[0]
                  ? moment(provisionalQuoteData[0].CREATEDAT).format('DD/MM/YYYY')
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
            <ul className='bb' />
            <ul className='summary-ul'>
              <ShowField
                show={state && state.extensionDetails &&
                                    state.extensionDetails.MKGDISCAMT != '0'}
                yes={() => (
                  <li>Discount Amount: <span>
                    Rs  {state && state.extensionDetails &&
                                            state.extensionDetails.MKGDISCAMT
                    ? state.extensionDetails.MKGDISCAMT
                    : 0}
                  </span>
                  </li>
                )}
                no={() => null}
              />

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
                      <AntTab label={`Opt1-${getSmoothRateData?.data?.option1?.CXSAMT ? getSmoothRateData?.data?.option1?.CXSAMT : 0}`} />
                      <AntTab label={`Opt2-${getSmoothRateData?.data?.option2?.CXSAMT ? getSmoothRateData?.data?.option2?.CXSAMT : 0}`} />
                      <AntTab label={`Opt3-${getSmoothRateData?.data?.option3?.CXSAMT ? getSmoothRateData?.data?.option3?.CXSAMT : 0}`} />

                    </AntTabs>
                    <TabPanel value={subValue} index={0}>
                      <ul
                        className='summary-ul'
                      >
                        <li className=''>Policy Fee :<span>
                          Rs {getSmoothRateData?.data?.option1?.FRATE1 ? getSmoothRateData?.data?.option1?.FRATE1 : 0}
                                                     </span>
                        </li>
                        <li>FSC fee: <span>
                          Rs {getSmoothRateData?.data?.option1?.FSCFEE ? getSmoothRateData?.data?.option1?.FSCFEE : 0}
                                     </span>
                        </li>
                        <li>Premium: <span>
                          Rs {getSmoothRateData?.data?.option1?.TOTPREM ? getSmoothRateData?.data?.option1?.TOTPREM : 0}
                                     </span>
                        </li>

                      </ul>
                      <div>
                        <h5 className='summary-title txt-center mr-2'> Total Premium <span className='ml-5'>Rs {getSmoothRateData?.data?.option1?.NETPREM ? getSmoothRateData?.data?.option1?.NETPREM : 0}</span></h5>
                      </div>

                    </TabPanel>
                    <TabPanel value={subValue} index={1}>
                      <ul
                        className='summary-ul'
                      >
                        <li className=''>Policy Fee :<span>
                          Rs {getSmoothRateData?.data?.option2?.FRATE1 ? getSmoothRateData?.data?.option2?.FRATE1 : 0}
                                                     </span>
                        </li>
                        <li>FSC fee: <span>
                          Rs {getSmoothRateData?.data?.option2?.FSCFEE ? getSmoothRateData?.data?.option2?.FSCFEE : 0}
                                     </span>
                        </li>
                        <li>Premium: <span>
                          Rs {getSmoothRateData?.data?.option2?.TOTPREM ? getSmoothRateData?.data?.option2?.TOTPREM : 0}
                                     </span>
                        </li>

                      </ul>
                      <div>
                        <h5 className='summary-title txt-center mr-2'> Total Premium <span className='ml-5'>Rs {getSmoothRateData?.data?.option2?.NETPREM ? getSmoothRateData?.data?.option2?.NETPREM : 0}</span></h5>
                      </div>

                    </TabPanel>
                    <TabPanel value={subValue} index={2}>
                      <ul
                        className='summary-ul'
                      >
                        <li className=''>Policy Fee :<span>
                          Rs {getSmoothRateData?.data?.option3?.FRATE1 ? getSmoothRateData?.data?.option3?.FRATE1 : 0}
                                                     </span>
                        </li>
                        <li>FSC fee: <span>
                          Rs {getSmoothRateData?.data?.option3?.FSCFEE ? getSmoothRateData?.data?.option3?.FSCFEE : 0}
                                     </span>
                        </li>
                        <li>Premium: <span>
                          Rs {getSmoothRateData?.data?.option3?.TOTPREM ? getSmoothRateData?.data?.option3?.TOTPREM : 0}
                                     </span>
                        </li>

                      </ul>
                      <div>
                        <h5 className='summary-title txt-center mr-2'> Total Premium <span className='ml-5'>Rs {getSmoothRateData?.data?.option3?.NETPREM ? getSmoothRateData?.data?.option3?.NETPREM : 0}</span></h5>
                      </div>
                    </TabPanel>
                  </>
                )}
                no={() =>
                  <>
                    <li>Policy Fee: <span>
                      Rs   {state && state.extensionDetails &&
                                    state.extensionDetails.polfee
                      ? state.extensionDetails.polfee
                      : 0}
                                    </span>
                    </li>
                    <li>FSC fee: <span>
                      Rs  {state && state.extension &&
                                    state.extension.fscfee
                      ? state.extension.fscfee
                      : 0}
                                 </span>
                    </li>
                    <li>Premium <span>
                      Rs  {state && state.extensionDetails &&
                                    state.extensionDetails.NETPREM
                      ? state.extensionDetails.NETPREM
                      : 0}
                                </span>
                    </li>
                    <li className='txt-bb'>Total Premium <span>
                      Rs  {state && state.extensionDetails &&
                                    state.extensionDetails.NETPREM
                      ? state.extensionDetails.NETPREM
                      : 0}
                                                         </span>
                    </li>
                  </>}
              />
            </ul>
            <Grid
              container
              alignItems='center'
              justifyContent='flex-end'
              spacing={2}
            >
              <Grid item>
                <Button variant='outlined' color='primary' onClick={() => { handleSendQuote() }}>
                  {postSendQuoteLoading
                    ? (
                      <CircularProgress size={18} style={{ color: '#002F87' }} />
                      )
                    : (
                        'SEND QUOTE'
                      )}
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={() => {
                    printQuote()
                  }}
                >
                  PRINT QUOTATION
                </Button>
              </Grid>
            </Grid>
          </section>
        </Grid>
        <Grid item xs={12} sm={7} md={7}>
          <section className='quote-summary'>
            <div className='quote-summary-header'>
              <Button
                href='#text-buttons'
                color='primary'
              >
                <Icofont icon='pencil-alt-2' /> &nbsp; EDIT
              </Button>
              <Button
                color='primary'
                onClick={() => {
                  downloadQuote()
                }}
              >
                {getDownloadQuoteLoading
                  ? (
                    <>
                      <CircularProgress size={18} color='primary' />
                    </>
                    )
                  : (
                    <>
                      <GetAppIcon
                        className={`${classes.downloadIcon} `}
                      />
                                        &nbsp; DOWNLOAD QUOTE
                    </>
                    )}
              </Button>
              <Button
                color='primary'
                variant='outlined'
                className='f-right'
                onClick={handleClickOpen}
              >
                Cancel QUOTE
              </Button>
            </div>
            <div className='quote-summary-content'>
              <Tabs
                value={value}
                indicatorColor='primary'
                textColor='primary'
                variant='fullWidth'
                onChange={handleTabChange}
                aria-label='tabs'
              >
                <Tab label='PERSONAL DETAILS' />
                <Tab label='VEHICLE DETAILS' />
                <Tab label='EXTENSIONS' />
              </Tabs>
              <TabPanel value={value} index={0}>
                <PerfectScrollbar
                  options={perfectScrollbarOptions}
                  className='scroll'
                  style={{ maxHeight: '50vh', position: 'relative' }}
                >
                  <StepPersonalDetails fromPage='summary' />
                </PerfectScrollbar>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <PerfectScrollbar
                  options={perfectScrollbarOptions}
                  className='scroll'
                  style={{ maxHeight: '50vh', position: 'relative' }}
                >
                  <StepVehicleDetails fromPage='summary' />
                </PerfectScrollbar>
              </TabPanel>
              <TabPanel value={value} index={2}>
                <PerfectScrollbar
                  options={perfectScrollbarOptions}
                  className='scroll'
                  style={{ maxHeight: '50vh', position: 'relative' }}
                >
                  <StepExtensions fromPage='summary' />
                </PerfectScrollbar>
              </TabPanel>
            </div>
          </section>
          <div
            className='txt-right'
            style={{ padding: '30px 0px' }}
          >
            <Button variant='outlined' color='primary' className='mar-right-s' onClick={() => back()}>Back</Button>
            <ShowField
              show={ApprovedStatus === 'NOAUTOAPPROVAL'}
              yes={() => (
                <>
                  <Button
                    variant='contained' color='primary'
                    onClick={() => { history.push('/agent/quotes/proposal') }}
                  >
                    PROCEED PROPOSAL
                  </Button>
                </>
              )}
              no={() => null}
            />
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
    getReasonCancelLoading: MotorPlan.getReasonCancelLoading,
    reasonCancelData: MotorPlan.reasonCancelData,
    reasonCancelStatus: MotorPlan.reasonCancelStatus,
    postSendQuoteLoading: MotorPlan.postSendQuoteLoading,
    postSendQuoteData: MotorPlan.postSendQuoteData,
    postSendQuoteStatus: MotorPlan.postSendQuoteStatus,
    postSendQuotemessage: MotorPlan.postSendQuotemessage,
    getSmoothRateData: MotorQuotation?.getSmoothRateData,
    getSmoothRateLoading: MotorQuotation?.getSmoothRateLoading
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
  postSendQuoteDispatch: formData =>
    dispatch(MotorPlanActions.postSendQuoteRequest(formData)),
  clearSendQuoteDispatch: () =>
    dispatch(MotorPlanActions.ClearSendQuoteRequest()),
  clearCancelQuoteDispatch: () =>
    dispatch(MotorPlanActions.ClearCancelQuoteRequest()),
  getCancelReasonDispatch: () =>
    dispatch(MotorPlanActions.getReasonCancelRequest()),
  getSmoothRateDispatch: id =>
    dispatch(MotorQuotationAction.GetSmoothRateAction(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(StepMotorSummary)

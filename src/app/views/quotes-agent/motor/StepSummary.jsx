import React, { useState, useEffect, Fragment } from 'react'
import moment from 'moment'
import { ShowField } from '../../../../app/uiComponents'
import { axiosCall } from '../../../../helpers/AxiosInterceptor'
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
  Dialog
} from '@material-ui/core'
import { useForm } from 'react-hook-form'
import GetAppIcon from '@material-ui/icons/GetApp'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import PerfectScrollbar from 'react-perfect-scrollbar'
import CustomBackdrop from '../../../../app/backdrop/CustomBackdrop'
import { useHistory, useLocation } from 'react-router-dom'
import StepPersonalDetails from './StepPersonalDetails'
import StepVehicleDetails from './StepVehicleDetails'
import StepExtensions from './StepExtensions'
import { MOTOR_FORM, SWAN_API_URL } from '../../../../helpers/constants'
import { MotorQuotationAction } from '../../../../store/actions/MotorQuotationAction'
import { MotorPlanActions } from '../../../../store/actions/motorPlanAction'
import { withStyles } from '@material-ui/core/styles'
import {
  getSessionStorage,
  removeErrString,
  checkResFailed
  , thousandSeparatorByValue
} from '../../../../helpers/helper'
import EditIcon from '@material-ui/icons/Edit'

const perfectScrollbarOptions = {
  wheelSpeed: 0.5,
  wheelPropagation: false
}

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
    pointerEvents: 'none !important',
    padding: '16px'
  },
  content: {
    minHeight: '350px !important',
    backgroundColor: '#f6f6f6 !important'
  },
  confirmationText: {
    fontSize: '22px',
    paddingBottom: '17px'
  },
  flex: {
    justifyContent: 'end',
    color: '#00B8CE !important'
  }
}))

function TabPanel(props) {
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
    postSendQuoteDispatch,
    clearSendQuoteDispatch,
    postSendQuoteData,
    postSendQuoteStatus,
    postSendQuoteLoading,
    getSmoothRateDispatch,
    getSmoothRateData
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
  const [showModal, setShowModal] = useState(false)
  const [edit, setEdit] = useState(false)
  const [activeQuote, setActiveQuote] = useState(null)
  const [status, setStatus] = useState({
    statusLabel: '',
    statusColor: '',
    email: '',
    name: '',
    createdAt: ''
  })
  const [state, setState] = useState({
    personalData: {},
    vehicleDetails: {},
    extensionDetails: {}
  })
  const search = useLocation().search
  const quoteNumber = new URLSearchParams(search).get('quote')
  const QuoteId = getSessionStorage(MOTOR_FORM.QUOTE_NUMBER)

  const handleTabChange = (event, newValue) => {
    setValue(newValue)
  }
  const handleSubTabChange = (event, newValue) => {
    setSubValue(newValue)
  }
  const closeDialog = () => {
    setShowModal(false)
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
    getDownloadQuoteDispatch(activeQuote)
    if (downloadQuoteData) {
      const downloadUrl = `${SWAN_API_URL}/${downloadQuoteData}`
      downloadFiles(downloadUrl)
    }
  }

  const downloadQuote = () => {
    getDownloadQuoteDispatch(activeQuote)
  }

  const cancelQuote = () => {
    const payload = {
      quotnum: activeQuote
    }
    postCancelQuoteDispatch(payload)
  }
  useEffect(()=>{
    if(QuoteId){
      setActiveQuote(QuoteId)
    }
    else if(quoteNumber){
      setActiveQuote(quoteNumber)
    }
  }, [QuoteId,quoteNumber])

  useEffect(() => {
    if (postCancelQuoteStatus === 'success') {
      toast.success('Quote was cancelled successfully!', { duration: 3000 })
      clearCancelQuoteDispatch()
      history.push('/agent/quotes/list')
    } else if (postCancelQuoteStatus === 'error' || checkResFailed(postCancelQuoteData)) {
      toast.error(removeErrString(postCancelQuoteData), { duration: 4000 })
      clearCancelQuoteDispatch()
    }
    clearDownloadQuoteDispatch()
  }, [postCancelQuoteStatus])

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
    window.scrollTo(0, localStorage.getItem('position'))
    getProvisionalQuoteDispatch()
  }, [])

  useEffect(() => {
    if(activeQuote){
      getQuoteDetailsDispatch(activeQuote)
      getSmoothRateDispatch(activeQuote)
    }    
  }, [activeQuote])

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

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleSendQuote = () => {
    const formData = {
      QUOTNUM: activeQuote,
      EML: status.email,
      FIRSTNAME: status.name,
      QTSTS: status.statusLabel
    }
    postSendQuoteDispatch(formData)
  }

  useEffect(() => {
    if (postSendQuoteStatus === 'success') {
      if (postSendQuoteStatus === 'success') {
        setShowModal(true)
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
                {activeQuote}
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
            <ul className='bb' />
            <ul className='summary-ul'>
              <ShowField
                show={state && state.extensionDetails &&
                  state.extensionDetails.MKGDISCAMT != '0'}
                yes={() => (
                  <li>Discount Amount: <span>
                    Rs  {state && state.extensionDetails &&
                      state.extensionDetails.MKGDISCAMT
                      ? thousandSeparatorByValue(state.extensionDetails.MKGDISCAMT)
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
                no={() =>
                  <>
                    <li>Policy Fee: <span>
                      Rs   {state && state.extensionDetails &&
                        state.extensionDetails.polfee
                        ? thousandSeparatorByValue(state.extensionDetails.polfee)
                        : 0}
                    </span>
                    </li>
                    <li>FSC fee: <span>
                      Rs  {state && state.extensionDetails &&
                        state.extensionDetails.fscfee
                        ? thousandSeparatorByValue(state.extensionDetails.fscfee)
                        : 0}
                    </span>
                    </li>
                    <li>Premium <span>
                      Rs  {state && state.extensionDetails &&
                        state.extensionDetails.TOTPREM
                        ? thousandSeparatorByValue(state.extensionDetails.TOTPREM)
                        : 0}
                    </span>
                    </li>
                    <li className='txt-bb'>Total Premium <span>
                      Rs  {state && state.extensionDetails &&
                        state.extensionDetails.NETPREM
                        ? thousandSeparatorByValue(state.extensionDetails.NETPREM)
                        : 0}
                    </span>
                    </li>
                    <div>
                      <h5 className='summary-title txt-center mr-2'> Total Premium
                        <span className='ml-5'>Rs
                          {state && state.extensionDetails &&
                            state.extensionDetails.NETPREM
                            ? thousandSeparatorByValue(state.extensionDetails.NETPREM)
                            : 0}
                        </span>
                      </h5>
                    </div>
                  </>}
              />
            </ul>
            <Grid
              container
              alignItems='center'
              justifyContent='center'
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
                        &nbsp;  PRINT QUOTATION
                      </>
                    )}
                </Button>
              </Grid>
            </Grid>
          </section>
        </Grid>
        <Grid item xs={12} sm={7} md={7}>
          <section className='quote-summary'>
            <div className='quote-summary-header'>
              <Button
                color='primary'
                onClick={() => setEdit(!edit)}
              >
                <EditIcon fontSize='medium' className={classes.textColor} /> &nbsp; EDIT
              </Button>
              <Button
                color='primary'
                onClick={() => {
                  downloadQuote()
                }}
                disabled={getDownloadQuoteLoading}
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
                CANCEL QUOTE
              </Button>
            </div>
            <div className={`quote-summary-content ${classes.content}`}>
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
                  className='p-5'
                  style={{ maxHeight: '50vh', position: 'relative', paddingTop: '16px' }}
                >
                  <div className={`scroll ${!edit ? classes.overLay : ''}`}>
                    <StepPersonalDetails fromPage='summary' quoteNumber={activeQuote}/>
                  </div>
                </PerfectScrollbar>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <PerfectScrollbar
                  options={perfectScrollbarOptions}
                  className='p-5'
                  style={{ maxHeight: '50vh', position: 'relative', paddingTop: '16px' }}
                >
                  <div className={`scroll ${!edit ? classes.overLay : ''}`}>
                    <StepVehicleDetails fromPage='summary' quoteNumber={activeQuote}/>
                  </div>
                </PerfectScrollbar>
              </TabPanel>
              <TabPanel value={value} index={2}>
                <PerfectScrollbar
                  options={perfectScrollbarOptions}
                  className='p-5'
                  style={{ maxHeight: '50vh', position: 'relative', paddingTop: '16px' }}
                >
                  <div className={`scroll ${!edit ? classes.overLay : ''}`}>
                    <StepExtensions fromPage='summary' quoteNumber={activeQuote}/>
                  </div>
                </PerfectScrollbar>
              </TabPanel>
            </div>
          </section>
          <div
            className='txt-right'
            style={{ padding: '30px 0px' }}
          >
            <Button variant='outlined' color='primary' className='mar-right-s' onClick={() => back()}>Back</Button>
            <Button
              variant='contained' color='primary'
              onClick={() => {
                history.push(`/${authRole}/quotes/proposal?quote=${activeQuote}`)
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
  getSmoothRateDispatch: id =>
    dispatch(MotorQuotationAction.GetSmoothRateAction(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(StepMotorSummary)

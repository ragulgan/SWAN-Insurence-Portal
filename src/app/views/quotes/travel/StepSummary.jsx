import React, { useState, useEffect, useRef, Fragment } from 'react'
import moment from 'moment'
import toast from 'react-hot-toast'
import { connect, shallowEqual, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Icofont from 'react-icofont'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import GetAppIcon from '@material-ui/icons/GetApp'

import {
  Grid,
  Box,
  Tabs,
  Tab,
  Button,
  CircularProgress,
  Dialog,
  makeStyles
} from '@material-ui/core'
import {
  getLocalStorage,
  removeErrString,
  checkResFailed
} from '../../../../helpers/helper'
import PerfectScrollbar from 'react-perfect-scrollbar'
import StepTravelPersonalDetails from './SummaryPersonalDetails'
import StepTravelPlansDetails from './SummaryTravel'
import StepTravelCoverPriceDetails from './SummaryCoverPrice'
import { TRAVEL_FORM, SWAN_API_URL_TRAVEL } from '../../../../helpers/constants'
import {
  TravelQuotationAction,
  travelPlanActions
}
  from '../../../../store/actions/index'
import { ShowField } from 'app/uiComponents'
import SummaryCoverPriceDetails from './summaryCoverPricetab'

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
    pointerEvents: 'none !important'
  },
  content: {
    minHeight: '350px !important',
    backgroundColor: '#f6f6f6 !important'
  },
  confirmationText: {
    fontSize: '22px',
    paddingBottom: '17px',
    color: '#002f87'
  },
  flex: {
    justifyContent: 'end',
    color: '#00B8CE !important'
  },
  end: {
    textAlign: 'end'
  }
}))

function TabPanel(props) {
  const {
    children,
    value,
    index,
    ...other
  } = props
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  )
}

const StepTravelSummary = (props) => {
  const { authRole } = useSelector(
    ({ Auth }) => ({
      authRole: Auth.authRole
    }),
    shallowEqual
  )
  const {
    back,
    backStep,
    getTRQuoteDetailsDispatch,
    getTRQuoteDetails,
    getTRQuoteDetailsStatus,
    postSendQuoteDispatch,
    clearSendQuoteDispatch,
    postTravelSendQuoteLoading,
    postTravelSendQuoteData,
    postTravelSendQuoteStatus,
    getCancelQuoteDispatch,
    clearCancelQuoteDispatch,
    getTravelCancelQuoteLoading,
    getTravelCancelQuoteStatus,
    getTravelCancelQuoteData,
    postDownloadQuoteDispatch,
    clearDownloadQuoteDispatch,
    postTravelDownloadQuoteLoading,
    postTravelDownloadQuoteData,
    postTravelDownloadQuoteStatus
  } = props
  const [state, setState] = useState({
    personalData: {},
    travelPlan: {},
    coverPlanData: {}
  })
  const [status, setStatus] = useState({
    Quotstatus: '',
    QuotCreatedAt: ''
  })
  const personalData = state?.personalData
  const travelPlan = state?.travelPlan
  const classes = useStyles()
  const history = useHistory()
  const didMount = useRef(false)
  const [value, setValue] = useState(0)
  const [open, setOpen] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const travelQuoteNo = getLocalStorage(TRAVEL_FORM.QUOTE_NUMBER)
  const personalDetails = state?.personalData
  const travelDetails = state?.travelPlan
  const coverPlanDetails = state?.coverPlanData
  const PlanName = getLocalStorage(TRAVEL_FORM.TRAVEL_PLAN)
  const PlanAmount = getLocalStorage(TRAVEL_FORM.TRAVEL_AMOUNT)

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
    if (travelQuoteNo && travelQuoteNo) {
      getTRQuoteDetailsDispatch(travelQuoteNo)
    }
  }, [])

  useEffect(() => {
    if (didMount.current && getTRQuoteDetailsStatus === 'success') {
      const personalInfo = getTRQuoteDetails &&
        getTRQuoteDetails.personalInfo
        ? getTRQuoteDetails.personalInfo
        : {}
      const travelPlanData = getTRQuoteDetails &&
        getTRQuoteDetails.travelPlan
        ? getTRQuoteDetails.travelPlan
        : {}
      const coverPlanData = getTRQuoteDetails &&
        getTRQuoteDetails.coverPriceDetails
        ? getTRQuoteDetails.coverPriceDetails
        : {}
      if (coverPlanData) {
        setState(prevState => ({
          ...prevState,
          personalData: personalInfo,
          travelPlan: travelPlanData,
          coverPlanData
        }))
        setStatus(prevState => ({
          ...prevState,
          Quotstatus: getTRQuoteDetails && getTRQuoteDetails?.QUOSTATUSDESC,
          QuotCreatedAt: getTRQuoteDetails && getTRQuoteDetails?.dateCrt
        }))
      }
    }
  }, [getTRQuoteDetailsStatus])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleSendQuote = () => {
    const formData = {
      QUOTENUM: travelQuoteNo,
      EML: personalData?.EMAIL,
      FIRSTNAME: personalData?.FNAME,
      QTSTS: status?.Quotstatus
    }
    postSendQuoteDispatch(formData)
  }

  useEffect(() => {
    if (postTravelSendQuoteStatus === 'success') {
      setShowModal(true)
      clearSendQuoteDispatch()
    } else if (postTravelSendQuoteStatus === 'error') {
      toast.error(removeErrString(postTravelSendQuoteData), { duration: 4000 })
      clearSendQuoteDispatch()
    }
  }, [postTravelSendQuoteStatus])

  const downloadQuote = () => {
    const paylaod = {
      Quotenum: travelQuoteNo
    }
    postDownloadQuoteDispatch(paylaod)
  }

  useEffect(() => {
    if (postTravelDownloadQuoteStatus === 'success') {
      if (postTravelDownloadQuoteData) {
        const downloadQuoteUrl = `${SWAN_API_URL_TRAVEL}/${postTravelDownloadQuoteData}`
        downloadFiles(downloadQuoteUrl)
      }
    }
    clearDownloadQuoteDispatch()
  }, [postTravelDownloadQuoteStatus])

  const handleClickOpen = () => {
    setOpen(true)
  }

  const cancelQuote = () => {
    getCancelQuoteDispatch(travelQuoteNo)
  }

  useEffect(() => {
    if (getTravelCancelQuoteStatus === 'success') {
      toast.success('Quote was cancelled successfully!', { duration: 3000 })
      clearCancelQuoteDispatch()
      history.push(`/${authRole}/quotes/travel-list`)
    } else if (getTravelCancelQuoteStatus === 'error' || checkResFailed(getTravelCancelQuoteData)) {
      toast.error(removeErrString(getTravelCancelQuoteData), { duration: 4000 })
      clearCancelQuoteDispatch()
    }
  }, [getTravelCancelQuoteStatus])

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true
    }
  }, [])

  const closeDialog = () => {
    setShowModal(false)
  }

  const DestinationList = travelPlan && travelPlan?.DestinationList
  const desCountry = DestinationList && DestinationList.map(function (element) {
    return (
      <li className={classes.end}>
        {element.Destination}
      </li>
    )
  })

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
              {getTravelCancelQuoteLoading
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
      <ShowField
        show={authRole === 'customer'}
        yes={() =>
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
                You can call Swan on 207 3500 for any other information.
              </h4>
            </Grid>
          </Grid>}
        no={() => null}
      />
      <Grid
        container
        direction='row'
        justifyContent='center'
        alignItems='flex-start'
        spacing={4}
      >
        <Grid item xs={12} sm={5} md={5}>
          <section className='summary-box motor-summary'>
            <Grid
              container
              alignItems='center'
              justifyContent='flex-end'
              spacing={0}
            >
              <Grid item xs={12} md={12}>
                <h4 className='summary-heading'>Provisional Quote</h4>
              </Grid>
            </Grid>
            <ul className='summary-ul bb'>
              <div>
                <h5 className='summary-title'>Quotation Summary</h5>
              </div>
              <li>
                Name
                <span>
                  {personalDetails && personalDetails
                    ? `${personalDetails.FNAME} 
                  ${personalDetails.LNAME}`
                    : '--'}
                </span>
              </li>
              <li>
                Quotation Number
                <span>
                  {personalDetails && personalDetails.QUOTENUM
                    ? personalDetails.QUOTENUM
                    : '--'}
                </span>
              </li>
            </ul>
            <ShowField
              show={authRole !== 'customer'}
              yes={() => <>
                <ul>
                  <li>
                    Destination :
                    <span>
                      {desCountry ? desCountry : '--'}
                    </span>
                  </li>
                </ul>
               <div className='pt-5'>
                  <ul>
                    <li>
                      Quotation Date
                      <span>
                        {status.QuotCreatedAt ? moment(status.QuotCreatedAt).format('DD-MM-YYYY') : '--'}
                      </span>
                    </li>
                    <li>
                      Departure
                      <span>
                        {travelDetails && travelDetails.DTFROM
                          ? moment(travelDetails.DTFROM).format('DD-MM-YYYY')
                          : '--'}
                      </span>
                    </li>
                    <li>
                      Return
                      <span>
                        {travelDetails && travelDetails.DTTO
                          ? moment(travelDetails.DTTO).format('DD-MM-YYYY')
                          : '--'}
                      </span>
                    </li>
                  </ul>
               </div>
              </>}
              no={() => null}
            />
            <ShowField
              show={authRole !== 'customer'}
              yes={() => <>
                <ul className='summary-ul'>
                  <li className='price-bold-header'>Fees</li>
                  <li>
                    Discount Amount:
                    <span>
                      Rs 30
                    </span>
                  </li>
                  <li>
                    FSC fee:
                    <span>
                      Rs  {coverPlanDetails && coverPlanDetails.FSCFEE
                        ? coverPlanDetails.FSCFEE
                        : '0'}
                    </span>
                  </li>
                  <li>
                    Fees & Charges:
                    <span>
                      Rs {coverPlanDetails && coverPlanDetails.ADMINFEE
                        ? coverPlanDetails.ADMINFEE
                        : '0'}
                    </span>
                  </li>
                  <li>
                    Premium:
                    <span>
                      Rs {coverPlanDetails && coverPlanDetails.TOTPREM
                        ? coverPlanDetails.TOTPREM
                        : '0'}
                    </span>
                  </li>
                  <li className='summary-title'>
                    Total Premium
                    <span>
                      Rs {coverPlanDetails && coverPlanDetails.NETPREM
                        ? coverPlanDetails.NETPREM
                        : '0'}
                    </span>
                  </li>
                </ul>
              </>}
              no={() => null}
            />
            <ShowField
              show={authRole === 'customer'}
              yes={() =>
                <>
                  <ul className='summary-ul'>
                    <li className='summary-title'>Travel Details</li>
                    <li>
                      Destination:
                      <span>
                        {desCountry || '--'}
                      </span>
                    </li>
                    <li className='price-bold-header'>
                      Travelling Dates:
                    </li>
                    <li>
                      Departure
                      <span>{travelPlan &&
                        travelPlan?.DTFROM
                        ? moment(travelPlan?.DTFROM).format('DD MMM YYYY')
                        : '0'}
                      </span>
                    </li>
                    <li>
                      Arrival
                      <span>{travelPlan &&
                        travelPlan?.DTTO
                        ? moment(travelPlan?.DTTO).format('DD MMM YYYY')
                        : '0'}
                      </span>
                    </li>
                  </ul>
                  <ul className='summary-ul'>
                    <li className='summary-title'>Cover Plan</li>
                    <li className='price-bold-header'>
                      {PlanName || '--'}
                      <span>Rs {PlanAmount || '--'}</span>
                    </li>
                    <li className='price-bold-header'>
                      {coverPlanDetails && coverPlanDetails?.BAGPLANDESC &&
                        coverPlanDetails?.BAGPLANDESC?.PRMINDADESC
                        ? coverPlanDetails?.BAGPLANDESC?.PRMINDADESC
                        : '--'}
                      <span>
                        {coverPlanDetails && coverPlanDetails?.BAGPLANDESC &&
                          coverPlanDetails?.BAGPLANDESC?.BAGGAGEAMOUNT
                          ? coverPlanDetails?.BAGPLANDESC?.BAGGAGEAMOUNT
                          : '0'}
                      </span>
                    </li>
                  </ul>
                </>}
              no={() => null}
            />
            <Grid
              container
              alignItems='center'
              justifyContent='center'
              spacing={2}
            >
              <Grid item>
                <Button variant='outlined' color='primary' onClick={() => { handleSendQuote() }}>
                  {postTravelSendQuoteLoading
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
                // onClick={() => {
                //   printQuote()
                // }}
                >
                  {/* {getDownloadQuoteLoading ? (
                  <>
                    <CircularProgress size={18} color='primary' />
                  </>
                ) : (
                  <>
                    <GetAppIcon
                      className={`${classes.downloadIcon} `}
                    />
                    &nbsp;  PRINT QUOTATION
                  </>
                )} */}
                  PRINT QUOTATION
                </Button>
              </Grid>
            </Grid>
          </section>
        </Grid>
        <ShowField
          show={authRole !== 'customer'}
          yes={() => <>
            <Grid item xs={12} sm={7} md={7}>
              <section className='quote-summary'>
                <div className='quote-summary-header'>
                  <Button color='primary'>
                    <Icofont icon='pencil-alt-2' /> &nbsp; EDIT
                  </Button>
                  <Button
                    color='primary'
                    onClick={() => {
                      downloadQuote()
                    }}
                    disabled={postTravelDownloadQuoteLoading}
                  >
                    {postTravelDownloadQuoteLoading
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
                <div className='quote-summary-content'>
                  <PerfectScrollbar
                    options={perfectScrollbarOptions}
                    className='scroll'
                    style={{ maxHeight: '50vh', position: 'relative', paddingTop: '16px' }}
                  >
                    <Tabs
                      value={value}
                      indicatorColor='primary'
                      textColor='primary'
                      variant='fullWidth'
                      onChange={handleChange}
                      aria-label='tabs'
                    >
                      <Tab label='PERSONAL  INFORMATION' />
                      <Tab label='TRAVEL PLANS' />
                      <Tab label='COVER PRICE & DETAILS' />
                    </Tabs>
                    <TabPanel value={value} index={0}>
                      <StepTravelPersonalDetails fromPage='summary' />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                      <StepTravelPlansDetails fromPage='summary' />
                    </TabPanel>
                    <TabPanel value={value} index={2} className='full-summary-tab-panel'>
                      <StepTravelCoverPriceDetails fromPage='summary' />
                    </TabPanel>
                  </PerfectScrollbar>
                </div>
              </section>
              <div
                className='txt-right travel-plan'
                style={{ padding: '30px 0px' }}
              >
                <Button
                  variant='outlined'
                  color='primary'
                  className='mar-right-s back-button1'
                  onClick={() => {
                    back()
                    backStep("coverage")
                  }}
                >
                  Back
                </Button>
              </div>
            </Grid>
          </>}
          no={() => <>
            <Grid item xs={12} sm={6} md={6}>
              <SummaryCoverPriceDetails />
              <div
                className='txt-right travel-plan'
                style={{ padding: '30px 0px' }}
              >
                <Button
                  variant='outlined'
                  color='primary'
                  className='mar-right-s back-button1'
                  onClick={() => {
                    back()
                  }}
                >
                  Back
                </Button>
              </div>
            </Grid>
          </>}
        />
      </Grid>
    </>
  )
}

const mapStateToProps = (state) => {
  const {
    TravelQuotation, TravelPlan
  } = state
  return {
    getTRQuoteDetailsStatus: TravelQuotation?.getTRQuoteDetailsStatus,
    getTRQuoteDetails: TravelQuotation?.getTRQuoteDetails,
    getTRQuoteDetailsLoading: TravelQuotation?.getTRQuoteDetailsLoading,
    postTravelSendQuoteLoading: TravelPlan?.postTravelSendQuoteLoading,
    postTravelSendQuoteData: TravelPlan?.postTravelSendQuoteData,
    postTravelSendQuoteStatus: TravelPlan?.postTravelSendQuoteStatus,
    postTravelSendQuotemessage: TravelPlan?.postTravelSendQuotemessage,
    getTravelCancelQuoteData: TravelPlan.getTravelCancelQuoteData,
    getTravelCancelQuoteStatus: TravelPlan.getTravelCancelQuoteStatus,
    getTravelCancelQuoteLoading: TravelPlan.getTravelCancelQuoteLoading,
    postTravelDownloadQuoteLoading: TravelPlan.postTravelDownloadQuoteLoading,
    postTravelDownloadQuoteData: TravelPlan.postTravelDownloadQuoteData,
    postTravelDownloadQuoteStatus: TravelPlan.postTravelDownloadQuoteStatus,
    postTravelDownloadQuotemessage: TravelPlan.postTravelDownloadQuotemessage
  }
}

const mapDispatchToProps = (dispatch) => ({
  getTRQuoteDetailsDispatch: (params) => dispatch(TravelQuotationAction.GetTRQuoteDetailsAction(params)),
  postSendQuoteDispatch: formData =>
    dispatch(travelPlanActions.postTravelSendQuoteRequest(formData)),
  clearSendQuoteDispatch: () =>
    dispatch(travelPlanActions.ClearTravelSendQuoteRequest()),
  getCancelQuoteDispatch: id =>
    dispatch(travelPlanActions.getTravelCancelQuoteRequest(id)),
  clearCancelQuoteDispatch: () =>
    dispatch(travelPlanActions.ClearTravelCancelQuoteRequest()),
  postDownloadQuoteDispatch: (payload) =>
    dispatch(travelPlanActions.postTravelDownloadQuoteRequest(payload)),
  clearDownloadQuoteDispatch: () =>
    dispatch(travelPlanActions.ClearTravelDownloadQuoteRequest())
})

export default connect(mapStateToProps, mapDispatchToProps)(StepTravelSummary)

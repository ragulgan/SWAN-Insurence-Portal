import React, { useState, useEffect, useRef } from 'react'
import { Grid, Button, Tabs, Tab, Box, CircularProgress, TablePagination, makeStyles, Popover, Accordion, AccordionSummary, AccordionDetails, Dialog, MenuItem, ListItemIcon, Checkbox, ListItemText } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { connect, shallowEqual, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import GetAppIcon from '@material-ui/icons/GetApp'
import EditIcon from '@material-ui/icons/Edit'
import { QuotationActions } from '../../../../store/actions/QuotationActions'
import { MotorQuotationAction, MotorPlanActions } from '../../../../store/actions'
import { useLocation, useHistory } from 'react-router-dom'
import { removeErrString, checkResFailed, getLocalStorage, setSessionStorage,removeSessionStorage } from '../../../../helpers/helper'
import { MOTOR_FORM, SWAN_API_URL } from '../../../../helpers/constants'
import _ from 'lodash'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import AccessTimeIcon from '@material-ui/icons/AccessTime'
import PerfectScrollbar from 'react-perfect-scrollbar'
import Icofont from 'react-icofont'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import StepPersonalDetails from '../motor/StepPersonalDetails'
import StepVehicleDetails from '../motor/StepVehicleDetails'
import StepExtensions from '../motor/StepExtensions'
import NewQuoteButton from '../../../../app/widgets/NewQuoteButton'
import moment from 'moment'
import { ShowField } from '../../../../app/uiComponents'

const perfectScrollbarOptions = {
  wheelSpeed: 0.5,
  wheelPropagation: false
}

const useStyles = makeStyles((theme) => ({
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
  confirmationText: {
    fontSize: '22px',
    paddingBottom: '17px'
  },
  overLay: {
    background: 'lightgray !important',
    pointerEvents: 'none !important',
    padding: '16px'
  },
  marginLeft: {
    marginLeft: '50%'
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
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  )
}
const QuoteList = (props) => {
  const { authRole } = useSelector(
    ({ Auth }) => ({
      authRole: Auth.authRole
    }),
    shallowEqual
  )
  const {
    motorQuotationId,
    quotationLoading,
    quotationList,
    quotationListDispatch,
    SaveMotorFormAction,
    pageNo,
    pageLimit,
    pageCount,
    postCancelQuoteDispatch,
    clearCancelQuoteDispatch,
    postCancelQuoteLoading,
    postCancelQuoteData,
    postCancelQuoteStatus,
    getDownloadQuoteDispatch,
    clearDownloadQuoteDispatch,
    getDownloadQuoteLoading,
    downloadQuoteData,
    downloadQuoteStatus,
    getQuoteDetailsStatus,
    ClearMotQuoteDetailsDispatch,
    getQuoteDetails
  } = props
  const [edit, setEdit] = useState(false)
  const history = useHistory()
  const search = useLocation().search
  const show = new URLSearchParams(search).get('show')
  const searchQuote = new URLSearchParams(search).get('search')
  const [typingTimeout, setTypingTimeout] = useState(0)
  const [navigatePage, setNavigatePage] = useState(false)
  const [openCancel, setOpenCancel] = useState(false)
  const [activeQuote, setActiveQuote] = useState(motorQuotationId) 
  const [activeSort, setActiveSort] = useState('')
  const [activeName, setActiveName] = useState([])
  const [activeStatus, setActiveStatus] = useState([])
  const [activeTab, setActiveTab] = useState(0)
  const [loading, setLoading] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [pageAllCount, setPageAllCount] = useState(0)
  const userName = getLocalStorage('logged_user')
  const [state, setState] = useState({
    extensionsForm: '',
    instructionForm: '',
    proposalForm:'',
    status: ''
  })
  const [sortAsc, setSortAsc] = useState([
    { key: 0, label: 'A-Z', name: 'asc', checked: false },
    { key: 1, label: 'Z-A', name: 'desc', checked: false }
  ])
  const [sortName, setSortName] = useState([
    { key: 0, label: 'Today', name: 'today', checked: false },
    { key: 1, label: 'Yesterday', name: 'yesterday', checked: false },
    { key: 2, label: 'This Week', name: 'week', checked: false },
    { key: 3, label: 'This Month', name: 'month', checked: false },
    { key: 4, label: 'Past 3 Months', name: 'past3month', checked: false }
  ])
  const [sortStatus, setSortStatus] = useState([
    { key: 0, label: 'Approved', name: 'A', checked: false },
    { key: 1, label: 'Cancelled', name: 'C', checked: false },
    { key: 2, label: 'Pending', name: 'Q', checked: false },
    { key: 3, label: 'Sent To Swan', name: 'SENTTOSWAN', checked: false },
  ])

  const [sName, setSName] = useState('')
  const [sortDate, setSortDate] = useState([])
  const classes = useStyles()
  const handleNext = () => {
    setActiveTab(prevActiveStep => prevActiveStep + 1)
  }
  const handleBack = () => {
    setActiveTab(prevActiveStep => prevActiveStep - 1)
  }
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  const handleClickOpen = () => {
    setOpenCancel(true)
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

  /* const fetchQuote = (quoteNumber) => {
    setSessionStorage(MOTOR_FORM.QUOTE_NUMBER, quoteNumber)
    SaveMotorFormAction({ currentQuoteNumber: quoteNumber })
    setLoading(true)
    setActiveQuote(quoteNumber)
    setTimeout(() => {
      setLoading(false)
    }, 3000)
  } */
  const prepareQuote = (quoteNumber) =>{    
    setSessionStorage(MOTOR_FORM.QUOTE_NUMBER, quoteNumber)
    setActiveQuote(quoteNumber)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setPerPage(+event.target.value);
    setPage(1);
  };

  const onPageLimitChange = (e) => {
    setPerPage(e.target.value)
    setPage(1)
  }
  const handleFilterOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleFilterClose = () => {
    setAnchorEl(null)
  }
  const handleSortChange = (event, sort) => {
    setActiveSort((prevState) =>
      sort.name === prevState
        ? ''
        : sort?.name
    )
  }
  const handleNameChange = (event, sortDay) => {
    setSortDate((prevState) =>
      !Object.values(sortDate).includes(sortDay.name)
        ? !Object.values(sortDate).includes(sortDay.name)
          ? [...prevState, sortDay.name]
          : []
        : prevState.filter((obj) => (obj !== sortDay.name ? obj : null))
    )
    setActiveName((prevState) => [
      ...prevState,
      activeName.name
    ])
  }
  const handleStatusChange = (event, status) => {
    const sortItems = [...sortStatus]
    sortItems[status.key].checked = !sortItems.checked
    setSortStatus(sortItems)
    setActiveStatus((prevState) =>
      !Object.values(activeStatus).includes(status.name)
        ? !Object.values(activeStatus).includes(status.name)
          ? [...prevState, status.name]
          : []
        : prevState.filter((obj) => (obj !== status.name ? obj : null))
    )
  }
  const onSearchList = (event) => {
    const { value } = event.target
    if (value.length >= 1) {
      typingTimeout && clearTimeout(typingTimeout)
      setTypingTimeout(
        setTimeout(() => {
          setSName(value)
        }, 1300)
      )
    }
    if (typingTimeout && value.length === 0) {
      setSName('')
    }
  }
  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  /* useEffect(() => {
    if (!quotationLoading) {
    }
  }, [quotationLoading]) */

  useEffect(() => {
    if (userName) {
      const params = {
        sort: activeSort,
        date: sortDate.toString(),
        quostatus: activeStatus.toString(),
        sname: sName || '',
        limit: perPage,
        page,
        usrcrt: userName
      }
      quotationListDispatch(params)
    }
  }, [activeSort, activeName, activeStatus, userName, page, perPage, sName])

  useEffect(() => {
    if (pageNo) {
      setPage(pageNo)
    }
  }, [pageNo])

  useEffect(() => {
    if (pageLimit) {
      setPerPage(pageLimit)
    }
  }, [pageLimit])

  useEffect(() => {
    if (pageCount) {
      setPageAllCount(pageCount)
    }
  }, [pageCount])

  useEffect(() => {
    if (quotationList) {
      let firstRow = _.first(quotationList)
      setActiveQuote(firstRow.quotnum)
    }
  }, [quotationList])

  const cancelQuote = () => {
    const payload = {
      quotnum: activeQuote
    }
    postCancelQuoteDispatch(payload)
  }

  useEffect(() => {
    if (postCancelQuoteStatus === 'success') {
      if (postCancelQuoteStatus === 'success') {
        toast.success('Quote was cancelled successfully!', { duration: 3000 })
        clearCancelQuoteDispatch()
        setOpenCancel(false)
        const params = {
          sort: activeSort,
          date: sortDate.toString(),
          quostatus: activeStatus.toString(),
          sname: sName || '',
          limit: perPage,
          page,
          usrcrt: userName
        }
        quotationListDispatch(params)
      } else if (postCancelQuoteStatus === 'error' || checkResFailed(postCancelQuoteData)) {
        toast.error(removeErrString(postCancelQuoteData), { duration: 4000 })
        clearCancelQuoteDispatch()
      }
    }
  }, [postCancelQuoteStatus])

  const downloadQuote = () => {
    getDownloadQuoteDispatch(activeQuote)
  }

  useEffect(() => {
    if (downloadQuoteStatus === 'success') {
      if (downloadQuoteData) {
        const downloadQuoteUrl = `${SWAN_API_URL}/${downloadQuoteData}`
        downloadFiles(downloadQuoteUrl)
      }
    } else if (downloadQuoteStatus === 'error' || checkResFailed(downloadQuoteData)) {
      toast.error(removeErrString(downloadQuoteData), { duration: 4000 })
      clearCancelQuoteDispatch()
    }
    clearDownloadQuoteDispatch()
  }, [downloadQuoteStatus])

  useEffect(() => {
    if (getQuoteDetailsStatus === "success") {
      setState(prevState => ({
        ...prevState,
        extensionsForm: getQuoteDetails.extensionsForm,
        instructionForm: getQuoteDetails.instructionForm,
        proposalForm: getQuoteDetails.proposalForm,
        status: getQuoteDetails.quostatus,
      }))
      ClearMotQuoteDetailsDispatch();
      if (activeQuote) {
        setNavigatePage(true)
      }
    }
  }, [getQuoteDetailsStatus])

  const handleClick = () => {
    if (navigatePage === true) {
    if (state.status === 'PENDING' ) {        
        removeSessionStorage(MOTOR_FORM.ACTIVE_STEP)
        history.push(`/${authRole}/quotes/motor?quote=${activeQuote}`)
        } 
     if ( state.status === 'SENT TO SWAN' || state.status === 'AUTO-APPROVED' &&  state.instructionForm === false ) {
      setSessionStorage(MOTOR_FORM.ACTIVE_STEP, 4)      
      history.push(`/${authRole}/quotes/motor?quote=${activeQuote}`)
      } 
      if (state.status === 'AUTO-APPROVED'  && state.instructionForm === true) {
        history.push(`/${authRole}/quotes/summary?quote=${activeQuote}`)
      }}
    setState(prevState => ({
      ...prevState,
      proposalForm: '',
      instructionForm: '',
      status: ''
    }))
  }
  return (
    <>
      <Dialog
        fullWidth
        maxWidth='sm'
        open={openCancel}
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
              onClick={() => setOpenCancel(false)}
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
        direction='column'
        justifyContent='center'
        alignItems='stretch'
        spacing={4}
      >
        <Grid item xs={12} className='bg-white'>
          <Grid
            container
            direction='row'
            justifyContent='flex-start'
            alignItems='flex-start'
            spacing={2}
          >
            <Grid item xs={12} md={6}>
              <h4 className='section-title'>Quotation</h4>
            </Grid>
            <Grid item xs={12} md={12}>
              <Grid
                container
                direction='row'
                justifyContent='flex-start'
                alignItems='flex-start'
                spacing={2}
              >
                <Grid item xs={6} sm={3} md={3}>
                  <InputGroup className='mb-0'>
                    <InputGroup.Text id='quote-search'>
                      <Icofont icon='search' />
                    </InputGroup.Text>
                    <Form.Control
                      placeholder='Search name, quote number...'
                      aria-label='quote-search'
                      aria-describedby='quote-search'
                      onChange={(e) => onSearchList(e)}
                      value={searchQuote}
                    />
                  </InputGroup>
                </Grid>
                <Grid item xs={6} sm={3} md={3}>
                  <Button
                    aria-describedby={id}
                    variant='contained'
                    color='primary'
                    onClick={handleFilterOpen}
                    className='plain-btn'
                  >
                    <span><Icofont icon='filter' /> &nbsp;  </span> Filter
                  </Button>
                  <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleFilterClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'center'
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'center'
                    }}
                  >
                    <div className='quote-filter'>
                      <Accordion>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls='filt-header'
                          id='filt-content'
                        >
                          Sort By Name
                        </AccordionSummary>
                        <AccordionDetails>
                          <ul>
                            {sortAsc && sortAsc.map((sort) => (
                              <MenuItem key={sort.id} value={sort.id}>
                                <ListItemIcon>
                                  <Checkbox
                                    checked={activeSort === sort.name}
                                    onChange={(e) => handleSortChange(e, sort)}
                                  />
                                </ListItemIcon>
                                <ListItemText primary={sort.label} />
                              </MenuItem>
                            ))}
                          </ul>
                        </AccordionDetails>
                      </Accordion>
                      <Accordion>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls='filt-header'
                          id='filt-content'
                        >
                          Sort By Date
                        </AccordionSummary>
                        <AccordionDetails>
                          <ul>
                            {sortName && sortName.map((name) => (
                              <MenuItem key={name.id} value={name.id}>
                                <ListItemIcon>
                                  <Checkbox
                                    checked={Object.values(sortDate).includes(name.name)}
                                    onChange={(e) => handleNameChange(e, name)}
                                  />
                                </ListItemIcon>
                                <ListItemText primary={name.label} />
                              </MenuItem>
                            ))}
                          </ul>
                        </AccordionDetails>
                      </Accordion>
                      <Accordion>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls='filt-header'
                          id='filt-content'
                        >
                          Status
                        </AccordionSummary>
                        <AccordionDetails>
                          <ul>
                            {sortStatus && sortStatus.map((status) => (
                              <MenuItem key={status.id} value={status.id}>
                                <ListItemIcon>
                                  <Checkbox
                                    checked={Object.values(activeStatus).includes(status.name)}
                                    onChange={(e) => handleStatusChange(e, status)}
                                  />
                                </ListItemIcon>
                                <ListItemText primary={status.label} />
                              </MenuItem>
                            ))}
                          </ul>
                        </AccordionDetails>
                      </Accordion>
                    </div>
                  </Popover>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid
            container
            direction='row'
            justifyContent='flex-start'
            alignItems='flex-start'
            spacing={2}
          >
            {quotationLoading
              ? <Grid item xs={10}>
                <CircularProgress size={25} className={classes.marginLeft} />
              </Grid>
              : quotationList && quotationList.length > 0
                ? (
                  <>
                    <Grid item xs={12} sm={12} md={6} className='quote-list'>
                      {quotationList.map((row) => (
                        <section
                          key={`qlist_${row.quotnum}`}
                          className={activeQuote === row.quotnum ? 'quote-list-item active-item' : 'quote-list-item'}
                          //onClick={() => fetchQuote(row.quotnum)}
                          onClick={() => prepareQuote(row.quotnum)}
                        >
                          <Grid
                            container
                            direction='row'
                            justifyContent='flex-start'
                            alignItems='center'
                            spacing={1}
                          >
                            <Grid item xs={4} sm={4} md={4}>
                              <Box m={1}>
                                <h4>FIRST NAME</h4>
                                <p>{row.FIRSTNAME || '-'}</p>
                              </Box>
                              <Box m={1}>
                                <h5>QUOTE NUMBER</h5>
                                <p>{row.quotnum || '-'}</p>
                              </Box>
                            </Grid>
                            <Grid item xs={4} sm={4} md={4}>
                              <Box m={1}>
                                <h4>LAST NAME</h4>
                                <p>{row.LASTNAME || '-'}</p>
                              </Box>
                              <Box m={1}>
                                <h5>
                                  <span><AccessTimeIcon color='secondary' /> &nbsp;</span>
                                  ADDED ON
                                </h5>
                                <p className='ml-8'>
                                  {row.datecrt && moment(row.datecrt).format('DD/MM/YYYY') || '-'}
                                </p>
                              </Box>
                            </Grid>
                            <Grid item xs={4} sm={4} md={4}>
                              <Box m={1}>
                                {row.quostatus
                                  ? <Button variant='outlined' style={{ backgroundColor: row.quostatuscode ? row.quostatuscode : '#002F87', border: `1 px solid ${row.quostatuscode ? row.quostatuscode : '#002F87'}`, color: '#fff' }}>{row.quostatus}</Button>
                                  : <Button variant='outlined' className='expired-btn'>Pending</Button>}
                              </Box>
                            </Grid>
                          </Grid>
                        </section>
                      ))}
                     <TablePagination
                        onRowsPerPageChange={onPageLimitChange}
                        component="div"
                        count={pageCount}
                        rowsPerPage={perPage}
                        page={page - 1}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <section className='quote-summary'>
                        <div className='quote-summary-header'>
                          <Button color='primary' onClick={() => setEdit(!edit)}  disabled={state.status === 'CANCELLED'}>
                            <EditIcon className={`${classes.downloadIcon}`} icon='pencil-alt-2' />
                          </Button>
                          <Button
                            color='primary'
                            onClick={() => {
                              downloadQuote()
                            }}
                            disabled={getDownloadQuoteLoading || state.status === 'CANCELLED'}
                          >
                            {getDownloadQuoteLoading
                              ? (
                                <>
                                  <CircularProgress size={18} color='primary' />
                                </>
                              )
                              : (
                                <GetAppIcon className={`${classes.downloadIcon}`} />
                              )}
                          </Button>
                          { activeQuote ? (<Button
                            color='primary'
                            variant='contained'
                            className='f-right'
                            Quotenum={activeQuote}
                            onClick={() => handleClick(activeQuote)}
                            disabled={state.status === 'CANCELLED'}
                          >
                            PROCEED POLICY
                          </Button>) : (<Button
                            color='primary'
                            variant='contained'
                            className='f-right'
                            Quotenum={activeQuote}                            
                            disabled={true}
                          >
                            PROCEED POLICY
                          </Button>)}
                          <ShowField
                            show={state?.status !== 'APPROVED' || 'AUTO-APPROVED'}
                            yes={() => <>
                              <Button
                                color='primary'
                                variant='outlined'
                                className='f-right'
                                style={{ marginRight: '10px' }}
                                onClick={handleClickOpen}
                                disabled={state.status === 'CANCELLED'}
                              >
                                CANCEL QUOTE
                              </Button>
                            </>}
                            no={() => null}
                          />
                        </div>
                        <div className='quote-summary-content'>
                          <Tabs
                            value={activeTab}
                            indicatorColor='primary'
                            textColor='primary'
                            variant='fullWidth'
                            onChange={handleTabChange}
                            aria-label='tabs'
                          >
                            <Tab label='PERSONAL DETAILS' />
                            <Tab label='VEHICLE DETAILS' />
                            <Tab label='Extension DETAILS' />
                          </Tabs>
                          <TabPanel value={activeTab} index={0}>
                            <PerfectScrollbar
                              options={perfectScrollbarOptions}
                              className='scroll'
                              style={{ maxHeight: '80vh', position: 'relative', paddingTop: '16px' }}
                            >
                              <div className={`scroll ${!edit ? classes.overLay : ''}`}>
                                <StepPersonalDetails
                                  fromPage='summary' 
                                  back={handleBack}
                                  next={handleNext}
                                  activeQuote={activeQuote}
                                />
                              </div>
                            </PerfectScrollbar>
                          </TabPanel> 
                          <TabPanel value={activeTab} index={1}>
                            <PerfectScrollbar
                              options={perfectScrollbarOptions}
                              className='scroll'
                              style={{ maxHeight: '80vh', position: 'relative', paddingTop: '16px' }}
                            >
                              <div className={`scroll ${!edit ? classes.overLay : ''}`}>
                                <StepVehicleDetails
                                  fromPage='summary' 
                                  back={handleBack}
                                  next={handleNext}
                                  activeQuote={activeQuote}
                                />
                              </div>
                            </PerfectScrollbar>
                          </TabPanel> 
                          <TabPanel value={activeTab} index={2}>
                            <PerfectScrollbar
                              options={perfectScrollbarOptions}
                              className='scroll'
                              style={{ maxHeight: '80vh', position: 'relative', paddingTop: '16px' }}
                            >
                              <div className={`scroll ${!edit ? classes.overLay : ''}`}>
                                <StepExtensions
                                  fromPage='summary' 
                                  back={handleBack}
                                  next={handleNext}
                                  activeQuote={activeQuote}
                                />
                              </div>
                            </PerfectScrollbar>
                          </TabPanel>                        
                        </div>
                        {quotationLoading
                          ? (
                            <div className='summary-loader'>
                              <Grid
                                container
                                direction='row'
                                justifyContent='center'
                                alignItems='center'
                              >
                                <CircularProgress color='secondary' size={20} />
                              </Grid>
                            </div>
                          )
                          : null}
                      </section>
                    </Grid>
                  </>
                )
                : (
                  <Grid item xs={12} sm={12} md={12} className='quote-list'>
                    <Alert severity='info'>No records found in <span>{show}</span> quotations</Alert>
                  </Grid>
                )}
          </Grid>
        </Grid>
        <NewQuoteButton />
      </Grid>
    </>
  )
}

const mapStateToProps = (state) => {
  const { Quotation, MotorPlan, MotorQuotation } = state
  return {
    motorQuotationId: Quotation.quotationId,
    quotationLoading: Quotation.quotationLoading,
    quotationList: Quotation.quotationList,
    pageNo: Quotation.pageNo,
    pageLimit: Quotation.pageLimit,
    pageCount: Quotation.pageCount,
    postCancelQuoteLoading: MotorPlan.postCancelQuoteLoading,
    postCancelQuoteData: MotorPlan.postCancelQuoteData,
    postCancelQuoteStatus: MotorPlan.postCancelQuoteStatus,
    getDownloadQuoteLoading: MotorPlan?.getDownloadQuoteLoading,
    downloadQuoteData: MotorPlan?.downloadQuoteData,
    downloadQuoteStatus: MotorPlan?.downloadQuoteStatus,
    getQuoteDetailsStatus: MotorQuotation?.getQuoteDetailsStatus,
    getQuoteDetailsLoading: MotorQuotation?.getQuoteDetailsLoading,
    getQuoteDetails: MotorQuotation?.getQuoteDetails,
  }
}

const mapDispatchToProps = (dispatch) => ({
  quotationListDispatch: (params) => dispatch(QuotationActions.FetchQuotationList(params)),
  SaveMotorFormAction: data => dispatch(MotorQuotationAction.SaveMotorFormAction(data)),
  postCancelQuoteDispatch: formData =>
    dispatch(MotorPlanActions.postCancelQuoteRequest(formData)),
  clearCancelQuoteDispatch: () =>
    dispatch(MotorPlanActions.ClearCancelQuoteRequest()),
  getDownloadQuoteDispatch: id =>
    dispatch(MotorPlanActions.getDownloadQuoteRequest(id)),
  clearDownloadQuoteDispatch: () =>
    dispatch(MotorPlanActions.ClearDownloadQuoteRequest()),
  ClearMotQuoteDetailsDispatch: () => dispatch(MotorQuotationAction.ClearMotQuoteDetailsAction()),
})

export default connect(mapStateToProps, mapDispatchToProps)(QuoteList)

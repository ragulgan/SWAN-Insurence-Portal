import React, { useState, useEffect, useRef } from 'react'
import { Grid, Button, Tabs, Tab, Box, CircularProgress, TablePagination, Popover, Accordion, AccordionSummary, AccordionDetails, MenuItem, ListItemIcon, Checkbox, ListItemText } from '@material-ui/core'

import { Alert } from '@material-ui/lab'
import { connect } from 'react-redux'
import { QuotationActions } from '../../../../store/actions/QuotationActions'
import { MotorQuotationAction } from '../../../../store/actions/MotorQuotationAction'
import { useLocation } from 'react-router-dom'
import { setSessionStorage, getLocalStorage } from '../../../../helpers/helper'
import { MOTOR_FORM } from '../../../../helpers/constants'
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
import CustomBackdrop from '../../../../app/backdrop/CustomBackdrop'

const perfectScrollbarOptions = {
  wheelSpeed: 0.5,
  wheelPropagation: false
}

const rowData = [
  {
    personal: {
      AGENCIES: '01',
      CLIENTNUM: '',
      DTBIRTH: '01/11/1990',
      FIRSTNAME: 'ariana',
      INDCOR: '',
      LASTNAME: 'grande',
      LEARNER: true,
      MOB: '32423432',
      NEWCLN: 'Y',
      NICNO: null,
      OCCUPATION: '',
      OTHOCCUPATION: 'IT',
      PH: '2343242342',
      QUOTNUM: '',
      QUOTREQ: 'Sales Person 1',
      RESIADD: 'sadf',
      RMRKS: 'sadf',
      TITLE: '2',
      TOTNOCLMS: '0',
      USERLOGIN: 'PSPETER',
      YEARLIC: 'moment()',
      EML: 'test@gamil.com'
    },
    vehicle: {
      EngineCapacity: '450',
      IsVat: true,
      Make: 'BMW',
      Model: '7-SERIES',
      NoOfSeats: '3',
      PolicyType: '00',
      PurchaseType: 2,
      RegFeeIncEst: false,
      RegMon: '10/08/2021',
      RegNo: 'TN 47 H 5679',
      SecAlrm: true,
      SubModel: '730D',
      SumInsured: '10,000',
      TrSumIns: '50000',
      VhKeptIn: '3',
      VhType: '1',
      VolXs: '2'
    },
    extensi: {
      INDCOR: 'string',
      QUOTNUM: 'string',
      NEWCLN: 'string',
      CLIENTNUM: 'string',
      TITLE: 'string',
      FIRSTNAME: 'string',
      LASTNAME: 'string',
      COMPANY: 'string',
      NICNO: 'string',
      DTBIRTH: 'string',
      OCCUPATION: 'string',
      OTHOCCUPATION: 'string',
      STAFFIND: 'string',
      YEARLIC: 'string',
      TOTNOCLMS: 'string',
      MOB: 'string',
      PH: 'string',
      EML: 'string',
      RMRKS: 'string',
      AGENCIES: 'string',
      USERLOGIN: 'string',
      QUOTREQ: 'string',
      RESIAD: 'string'
    }
  }
]
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
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  )
}

const QuoteList = (props) => {
  const {
    quotationLoading,
    quotationList,
    quotationListDispatch,
    SaveMotorFormAction,
    pageNo,
    pageLimit,
    pageCount
  } = props
  const search = useLocation().search
  const show = new URLSearchParams(search).get('show')
  const anchorRef = useRef(null)
  const [active, setActive] = useState(1)
  const [value, setValue] = useState(0)
  const [loading, setLoading] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [page, setPage] = useState(1)
  const [perPage, setsetPerPage] = useState(10)
  const [pageAllCount, setPageAllCount] = useState(0)
  const [defFilter, setDefFilter] = useState('female')
  const userName = getLocalStorage('logged_user')
  const [sortAsc, setSortAsc] = useState([
    { key: 0, label: 'A-Z', name: 'asc' },
    { key: 1, label: 'Z-A', name: 'desc' }
  ])
  const [sortName, setSortName] = useState([
    { key: 0, label: 'Today', name: 'today' },
    { key: 1, label: 'Yesterday', name: 'yesterday' },
    { key: 1, label: 'This Week', name: 'this_week' },
    { key: 1, label: 'This Month', name: 'this_month' },
    { key: 1, label: 'Past 3 Months', name: 'past_3month' }
  ])
  const [sortStatus, setSortStatus] = useState([
    { key: 0, label: 'Pending', name: 'pending' },
    { key: 1, label: 'Accepted', name: 'accepted' },
    { key: 1, label: 'Expired', name: 'expired' },
    { key: 1, label: 'Rejected', name: 'rejected' }
  ])

  const handleNext = () => {
    setValue(prevActiveStep => prevActiveStep + 1)
  }
  const handleBack = () => {
    setValue(prevActiveStep => prevActiveStep - 1)
  }
  const handleTabChange = (event, newValue) => {
    setValue(newValue)
  }
  const fetchQuote = (value) => {
    // const val = value.replace(/\D/g, "");
    const val = 'A75126'
    setSessionStorage(MOTOR_FORM.QUOTE_NUMBER, value)
    SaveMotorFormAction({ currentQuoteNumber: value })
    setLoading(true)
    setActive(value)
    setTimeout(() => {
      setLoading(false)
    }, 3000)
  }
  const onPageChange = (pageNo) => {
    setPage(page + 1)
  }
  const onPageLimitChange = (e) => {
    setsetPerPage(e.target.value)
  }
  const handleFilterOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleFilterClose = () => {
    setAnchorEl(null)
  }
  const handleFilterChange = (event) => {
    setDefFilter(event.target.value)
  }
  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  useEffect(() => {
    if (!quotationLoading) {
      // quotationListDispatch(show)
    }
  }, [quotationLoading])
  useEffect(() => {
    if (userName) {
      const params = {
        limit: perPage,
        page,
        usrcrt: 'PSPETER'
      }
      quotationListDispatch(params)
    }
  }, [userName, page, perPage])

  useEffect(() => {
    if (pageNo) {
      setPage(pageNo)
    }
  }, [pageNo])
  useEffect(() => {
    if (pageLimit) {
      setsetPerPage(pageLimit)
    }
  }, [pageLimit])
  useEffect(() => {
    if (pageCount) {
      setPageAllCount(pageCount)
    }
  }, [pageCount])

  return (
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
                  />
                </InputGroup>
              </Grid>
              <Grid item xs={6} sm={3} md={3}>
                <Button aria-describedby={id} variant='contained' color='primary' onClick={handleFilterOpen}>
                  Open Popover
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
                    {/* <Accordion>
                                            <AccordionSummary expandIcon={<ExpandMoreIcon />}
                                                aria-controls="filt-header"
                                                id="filt-content">
                                                Sort
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <FormControl component="fieldset">
                                                    <RadioGroup aria-label="gender" name="gender1" value={defFilter} onChange={handleFilterChange}>
                                                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                                                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                                                        <FormControlLabel value="other" control={<Radio />} label="Other" />
                                                        <FormControlLabel value="disabled" disabled control={<Radio />} label="(Disabled option)" />
                                                    </RadioGroup>
                                                </FormControl>
                                            </AccordionDetails>
                                        </Accordion> */}
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
                          {sortAsc && sortAsc.map((asc) => (
                            <MenuItem key={asc.id} value={asc.id}>
                              <ListItemIcon>
                                <Checkbox />
                              </ListItemIcon>
                              <ListItemText primary={asc.label} />
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
                                <Checkbox />
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
                                <Checkbox />
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
            ? <CustomBackdrop isLoading={quotationLoading} />
            : quotationList && quotationList.length > 0
              ? (
                <>
                  <Grid item xs={12} sm={12} md={6} className='quote-list'>
                    {quotationList.map((row) => (
                      <section
                        key={`qlist_${row.quotnum}`}
                        className={active === 1 ? 'quote-list-item active-item' : 'quote-list-item'}
                        onClick={() => fetchQuote(row.quotnum)}
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
                              <p>{row.usrcrt || '-'}</p>
                            </Box>
                            <Box m={1}>
                              <h5>QUOTE NUMBER</h5>
                              <p>{row.quotnum || '-'}</p>
                            </Box>
                          </Grid>
                          <Grid item xs={4} sm={4} md={4}>
                            <Box m={1}>
                              <h4>LAST NAME</h4>
                              <p>{row.lastname || '-'}</p>
                            </Box>
                            <Box m={1}>
                              <h5>
                                <span><AccessTimeIcon color='secondary' /> &nbsp;</span>
                                ADDED ON
                              </h5>
                              <p className='ml-8'>{row.datecrt || '-'}</p>
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
                      component='div'
                      count={pageAllCount}
                      page={page}
                      rowsPerPage={perPage}
                      onPageChange={onPageChange}
                      onRowsPerPageChange={onPageLimitChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <section className='quote-summary'>
                      <div className='quote-summary-header'>
                        <Button color='primary'>
                          <Icofont icon='pencil-alt-2' />
                        </Button>
                        <Button color='primary'>
                          <Icofont icon='download-alt' />
                        </Button>
                        <Button color='primary' variant='contained' className='f-right'>
                          PROCEED POLICY
                        </Button>
                        <Button color='primary' variant='outlined' className='f-right' style={{ marginRight: '10px' }}>
                          REJECT QUOTE
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
                          <Tab label='VEHICLE DETAILS / EXTENSIONS' />
                          <Tab label='PROPOSAL DETAILS' />
                        </Tabs>
                        <TabPanel value={value} index={0}>
                          <PerfectScrollbar
                            options={perfectScrollbarOptions}
                            className='scroll'
                            style={{ maxHeight: '50vh', position: 'relative' }}
                          >
                            <StepPersonalDetails
                              fromPage='summary' quotationId={active}
                              back={handleBack}
                              next={handleNext}
                            />
                          </PerfectScrollbar>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                          <PerfectScrollbar
                            options={perfectScrollbarOptions}
                            className='scroll'
                            style={{ maxHeight: '50vh', position: 'relative' }}
                          >
                            <StepVehicleDetails
                              fromPage='summary' quotationId={active}
                              back={handleBack}
                              next={handleNext}
                            />
                          </PerfectScrollbar>
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                          <PerfectScrollbar
                            options={perfectScrollbarOptions}
                            className='scroll'
                            style={{ maxHeight: '50vh', position: 'relative' }}
                          >
                            <StepExtensions
                              fromPage='summary' quotationId={active}
                              back={handleBack}
                              next={handleNext}
                            />
                          </PerfectScrollbar>
                        </TabPanel>
                      </div>
                      {loading
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
  )
}

const mapStateToProps = (state) => {
  const { Quotation, MotorQuotation } = state
  return {
    quotationLoading: Quotation.quotationLoading,
    quotationList: Quotation.quotationList,
    pageNo: Quotation.pageNo,
    pageLimit: Quotation.pageLimit,
    pageCount: Quotation.pageCount
  }
}

const mapDispatchToProps = (dispatch) => ({
  quotationListDispatch: (params) => dispatch(QuotationActions.FetchQuotationList(params)),
  SaveMotorFormAction: data => dispatch(MotorQuotationAction.SaveMotorFormAction(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(QuoteList)

import React, { useState, useEffect, useRef } from 'react'
import { Grid, Button, Tabs, Tab, Box, CircularProgress, TablePagination, Popover, Accordion, AccordionSummary, AccordionDetails, MenuItem, ListItemIcon, Checkbox, ListItemText, makeStyles } from '@material-ui/core'

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
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import StepPersonalDetails from '../motor/StepPersonalDetails'
import StepVehicleDetails from '../motor/StepVehicleDetails'
import StepExtensions from '../motor/StepExtensions'
import NewQuoteButton from '../../../../app/widgets/NewQuoteButton'
import CustomBackdrop from '../../../../app/backdrop/CustomBackdrop'
import moment from 'moment'

const perfectScrollbarOptions = {
  wheelSpeed: 0.5,
  wheelPropagation: false
}

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

const useStyles = makeStyles((theme) => ({

  overLay: {
    background: 'lightgray !important',
    pointerEvents: 'none !important',
    padding: '16px'
  }
}))

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
  const [edit, setEdit] = useState(false)
  const search = useLocation().search
  const show = new URLSearchParams(search).get('show')
  const anchorRef = useRef(null)
  const [typingTimeout, setTypingTimeout] = useState(0)
  const searchQuote = new URLSearchParams(search).get('search')
  const [activeSort, setActiveSort] = useState('asc')
  const [activeName, setActiveName] = useState([])
  const [activeStatus, setActiveStatus] = useState([])
  const [active, setActive] = useState(1)
  const [value, setValue] = useState(0)
  const [loading, setLoading] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [pageAllCount, setPageAllCount] = useState(0)
  const [defFilter, setDefFilter] = useState('female')
  const userName = getLocalStorage('logged_user')
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
    { key: 1, label: 'Rejected', name: 'R', checked: false },
    { key: 2, label: 'Pending', name: 'Q', checked: false },
    { key: 3, label: 'Processed', name: 'P', checked: false },
    { key: 4, label: 'Expired', name: 'EX', checked: false }
  ])

  const [sName, setSName] = useState('')
  const classes = useStyles()
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
    setPerPage(e.target.value)
  }
  const handleFilterOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleFilterClose = () => {
    setAnchorEl(null)
  }
  const handleSortChange = (e, sort) => {
    setActiveSort(sort?.name)
  }
  const handleNameChange = (e, name) => {
    const sortItems = [...sortName]
    sortItems[name.key].checked = !sortItems.checked
    setSortName(sortItems)
    setActiveName((prevState) => [
      ...prevState,
      name.name
    ])
  }
  const handleStatusChange = (e, status) => {
    const sortItems = [...sortStatus]
    sortItems[status.key].checked = !sortItems.checked
    setSortStatus(sortItems)
    setActiveStatus((prevState) => [
      ...prevState,
      status.name
    ])
  }

  const onSearchList = (event) => {
    const { value } = event.target
    if (value.length >= 3) {
      typingTimeout && clearTimeout(typingTimeout)
      setTypingTimeout(
        setTimeout(() => {
          setSName(value)
        }, 1500)
      )
    }
    if (typingTimeout && value.length === 0) {
      setSName('')
    }
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
        sort: activeSort,
        date: activeName,
        // date: _.size(activeName) ? activeName.split(",") : "",
        quostatus: _.size(activeStatus) ? activeStatus?.split(',') : '',
        sname: sName || '',
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
      _.forEach(quotationList, (quot, index) => {
        if (index === 0) {
          setActive(quot.QUOTENUM)
        }
      })
    }
  }, [quotationList])

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
                    onChange={e => onSearchList(e)}
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
                                  checked={!!name.checked}
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
                                  checked={!!status.checked}
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
                        <Button color='primary' onClick={() => setEdit(!edit)}>
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
                            <div className={`scroll ${!edit ? classes.overLay : ''}`}>
                              <StepPersonalDetails
                                fromPage='summary' quotationId={active}
                                back={handleBack}
                                next={handleNext}
                              />
                            </div>
                          </PerfectScrollbar>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                          <PerfectScrollbar
                            options={perfectScrollbarOptions}
                            className='scroll'
                            style={{ maxHeight: '50vh', position: 'relative' }}
                          >
                            <div className={`scroll ${!edit ? classes.overLay : ''}`}>
                              <StepVehicleDetails
                                fromPage='summary' quotationId={active}
                                back={handleBack}
                                next={handleNext}
                              />
                            </div>
                          </PerfectScrollbar>
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                          <PerfectScrollbar
                            options={perfectScrollbarOptions}
                            className='scroll'
                            style={{ maxHeight: '50vh', position: 'relative' }}
                          >
                            <div className={`scroll ${!edit ? classes.overLay : ''}`}>
                              <StepExtensions
                                fromPage='summary' quotationId={active}
                                back={handleBack}
                                next={handleNext}
                              />
                            </div>
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

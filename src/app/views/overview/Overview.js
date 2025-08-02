import React, { useState, useCallback, useEffect } from 'react'
import NewQuoteButton from '../../../app/widgets/NewQuoteButton'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { connect, shallowEqual, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Paper from '@material-ui/core/Paper'
import { IconButton, Box, TextField } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import {
  FilterList
} from '@material-ui/icons'
import CachedIcon from '@material-ui/icons/Cached'
import { useForm } from 'react-hook-form'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import DonutChart from './chart/DonutChart'
import BarChart from './chart/BarChart'
import moment from 'moment'
import TablePagination from '@material-ui/core/TablePagination'
import { QuotationActions } from '../../../store/actions/QuotationActions'
import { MotorQuotationAction } from '../../../store/actions/MotorQuotationAction'
import { Drawer, ScrollDialog, ShowField } from '../../uiComponents'
import { getLocalStorage, setLocalStorage, setSessionStorage ,  removeSessionStorage} from '../../../helpers/helper'
import { MOTOR_FORM } from '../../../helpers/constants'

const quotationData = [
  {
    no: 'MTA80540',
    product: 'Motor',
    date: '03.11.21',
    clientName: 'Mr Javin Cauleechurn',
    status: 'Pending'
  },
  {
    no: 'HMW80523',
    product: 'Home',
    date: '03.11.21',
    clientName: 'Mr Pierre Poivre',
    status: 'Pending'
  },
  {
    no: 'HTH80323',
    product: 'Health',
    date: '17.10.21',
    clientName: 'Mrs Marie Rogers',
    status: 'Temporary Quote'
  },
  {
    no: 'TRW81225',
    product: 'Travel',
    date: '18.10.21',
    clientName: 'Mr Mikael Pavadee',
    status: 'Pending'
  }
]

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2)
  },
  midCenter: {
    flex: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  Norecordsfound: {
    color: '#002F87',
    fontSize: '22px',
  },
  MuiTypographyBody2: {
    display: 'flex',
    fontSize: '1.1rem',
    color: 'rgb(0 184 204)',
    '& .MuiTypography-body2': {
      color: 'rgb(0 184 204)',
      fontSize: '1.0rem',
      fontFamily: 'glober_semibold',
      lineHeight: '1.43'
    },
    '& .MuiToolbar-gutters': {
      paddingLeft: '10px'
    },
    '& .MuiTablePagination-actions': {
      paddingLeft: '0px',
      color: 'rgb(0 184 204)'
    }
  }
}))

const Overview = (props) => {
  const { authRole } = useSelector(
    ({ Auth }) => ({
      authRole: Auth.authRole
    }),
    shallowEqual
  )
  const {
    quotationListDispatch,
    quotationLoading,
    quotationList,
    pageNo,
    pageLimit,
    pageCount,
    SaveMotorFormAction,
    getQuoteDetailsDispatch,
    getQuoteDetails,
    getQuoteDetailsStatus,
    getQuoteDetailsLoading,
    ClearMotQuoteDetailsDispatch
  } = props
  const classes = useStyles()
  const history = useHistory()
  const current_date = moment().format('D MMMM YYYY h:mm a')
  const [open, setOpen] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [QutationData, setQutationData] = useState({})
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [activeQuote, setActiveQuote] = useState('')
  const [pageAllCount, setPageAllCount] = useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const { register, setError, formState: { errors } } = useForm()

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const handleOpen = useCallback(() => {
    setOpen(true)
  }, [])

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])

  const handleClickIndividual = (item) => {
    // setSessionStorage(MOTOR_FORM.QUOTE_NUMBER, item.quotnum)
    setActiveQuote(item.quotnum)
    SaveMotorFormAction({ currentQuoteNumber: item.quotnum })
    getQuoteDetailsDispatch(item.quotnum)
  }
  const handleClickOpen = () => {
    // setShowModal(true);
  }

  const handleDialogClose = () => {
    setShowModal(false)
  }

  const handleDialogSave = () => {
    setShowModal(false)
  }

  const userName = getLocalStorage('logged_user')
  useEffect(() => {
    const params = {
      // sort: activeSort,
      // date: sortDate.toString(),
      // quostatus: activeStatus.toString(),
      // sname: sName ? sName : '',
      limit: 4,
      page: page,
      usrcrt: userName
    }
    quotationListDispatch(params)
  }, [page])
  
  useEffect(() => {
    if (getQuoteDetailsStatus === "success" && getQuoteDetails !== null) {
      if (getQuoteDetails.quostatus === 'PENDING' ) {
        removeSessionStorage(MOTOR_FORM.ACTIVE_STEP)
        history.push(`/${authRole}/quotes/motor?quote=${activeQuote}`)
        } 
     if (getQuoteDetails.quostatus === 'SENT TO SWAN' || getQuoteDetails.quostatus === 'AUTO-APPROVED' &&  getQuoteDetails.instructionForm === false && getQuoteDetails.proposalForm === true || getQuoteDetails.proposalForm === false) {
      setSessionStorage(MOTOR_FORM.ACTIVE_STEP, 3)
      history.push(`/${authRole}/quotes/motor?quote=${activeQuote}`)
      } 
      if (getQuoteDetails.quostatus === 'AUTO-APPROVED' && getQuoteDetails.proposalForm === true && getQuoteDetails.instructionForm === true) {
        history.push(`/${authRole}/quotes/summary?quote=${activeQuote}`)
      }
      ClearMotQuoteDetailsDispatch();
    }
  }, [getQuoteDetailsStatus])

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

  return (
    <Grid container>
      <Grid className='swan-page'>
        <ScrollDialog
          showModal={showModal}
          scrollType='paper'
          title='Filter'
          btnOneText='Cancel'
          btnTwoText='Search'
          showAction={false}
          handleDialogClose={handleDialogClose}
          handleDialogSave={handleDialogSave}
        >
          <form>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <TextField
                  {...register('quoteNo')}
                  margin='dense'
                  label='Quote No'
                  variant='outlined'
                  id='quoteNo'
                  type='text'
                  placeholder='Quote No'
                  fullWidth
                />
                {errors.quoteNo && <p>{errors.quoteNo.message}</p>}
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <TextField
                  {...register('product')}
                  margin='dense'
                  label='Product'
                  variant='outlined'
                  id='product'
                  type='text'
                  placeholder='Product'
                  fullWidth
                />
                {errors.product && <p>{errors.product.message}</p>}
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <TextField
                  {...register('date')}
                  margin='dense'
                  id='date'
                  label='Date'
                  type='date'
                  defaultValue={new Date()}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true
                  }}
                  fullWidth
                />
                {errors.date && <p>{errors.date.message}</p>}
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <TextField
                  {...register('clientName')}
                  margin='dense'
                  label='Client Name'
                  variant='outlined'
                  id='clientName'
                  type='text'
                  placeholder='Client Name'
                  fullWidth
                />
                {errors.clientName && <p>{errors.clientName.message}</p>}
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <TextField
                  {...register('status')}
                  margin='dense'
                  label='Status'
                  variant='outlined'
                  id='status'
                  type='text'
                  placeholder='Status'
                  fullWidth
                />
                {errors.status && <p>{errors.status.message}</p>}
              </Grid>
            </Grid>
            <button
              type='button'
              onClick={() => {
                setError('test', { type: 'focus' }, { shouldFocus: true })
              }}
            >
              Set Error Focus
            </button>
            <input type='submit' />
          </form>
        </ScrollDialog>
        <Drawer
          anchor='right'
          open={open}
          drawerWidth={500}
          onClose={handleClose}
        >
          <>
            <div className='d-flex justify-content-between pl-2 pr-4 pt-2'>
              <h3 className='text-primaryBlue fw-bold'>Quotations in process</h3>
              <IconButton
                aria-label='close'
                size='small'
                onClick={() => {
                  handleClose()
                }}
              >
                <CloseIcon color='action' />
              </IconButton>
            </div>
            <hr className='mt-2 mb-3' />
            <Grid container spacing={{ xs: 2, md: 3 }} className='mx-4'>
              <Grid item xs={5} sm={5} md={5} lg={5} className='my-1'>
                <p className='fw-bolder pr-5 d-block'>
                  Quote No :
                </p>
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6}>
                <p className='fs-6 text-info text-hover-secondary d-block'>
                  {QutationData.no}
                </p>
              </Grid>
              <Grid item xs={5} sm={5} md={5} lg={5} className='my-1'>
                <p className='fw-bolder pr-5 d-block'>
                  Product :
                </p>
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6}>
                <p className='fs-6 text-muted text-hover-secondary d-block'>
                  {QutationData.product}
                </p>
              </Grid>
              <Grid item xs={5} sm={5} md={5} lg={5} className='my-1'>
                <p className='fw-bolder pr-5 d-block'>
                  Date :
                </p>
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6}>
                <p className='fs-6 text-muted text-hover-secondary d-block'>
                  {QutationData.date}
                </p>
              </Grid>
              <Grid item xs={5} sm={5} md={5} lg={5} className='my-1'>
                <p className='fw-bolder pr-5 d-block'>
                  Client Name :
                </p>
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6}>
                <p className='fs-6 text-muted text-hover-secondary d-block'>
                  {QutationData.clientName}
                </p>
              </Grid>
              <Grid item xs={5} sm={5} md={5} lg={5} className='my-1'>
                <p className='fw-bolder pr-5 d-block'>
                  Status :
                </p>
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6}>
                <span
                  className={`
                  badge
                  ${QutationData.status === 'Pending'
                      ? 'cBadge-warning'
                      : 'cBadge-primary'
                    }
                fs-6 fw-bold
                  `}
                >
                  {QutationData.status}
                </span>
              </Grid>
            </Grid>
          </>
        </Drawer>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6} lg={5}>
            <Paper className={classes.paper}>
              <DonutChart current_date={current_date} />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={7}>
            <Paper className={classes.paper}>
              <BarChart />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <div className='d-flex justify-content-between mb-3'>
                <div className='d-flex'>
                  <div className='d-flex flex-column align-item-center mr-8'>
                    <h3 className='text-primaryBlue fw-bold'>Quotations in process</h3>
                    <div className='d-flex align-items-center'>
                      <CachedIcon className='text-dark-50 mr-2' />
                      <p className='text-dark-50 fs-8 fw-300 m-0'>4 August 2022 - 3:20 PM</p>
                    </div>
                  </div>
                  <div className='border-left border-2 border-secondary d-flex align-items-center'>
                    {/* <IconButton
                      aria-label='filter'
                      size='medium'
                      onClick={() => {
                        handleClickOpen()
                      }}
                    >
                      <FilterList fontSize='medium' className='text-targetBlue' />
                    </IconButton>
                    <h6 className='text-uppercase'>Filter</h6> */}
                  </div>
                </div>
                <div className='d-flex align-item-center'>
                  <IconButton
                    aria-label='details'
                    size='medium'
                    onClick={() => {
                      history.push(`/${authRole}/quotes/list`)
                    }}
                  >
                    <KeyboardArrowRightIcon className='text-targetBlue' />
                  </IconButton>
                </div>
              </div>
              <div className='table-responsive'>
                <table className='table align-middle gs-0 gy-4'>
                  <thead>
                    <tr className='fw-bolder text-secondary text-hover-dark bg-targetBlue'>
                      <th className='min-w-125px'>Quote No.</th>
                      <th className='min-w-125px'>Product</th>
                      <th className='min-w-125px'>Date</th>
                      <th className='min-w-125px'>Client Name</th>
                      <th className='min-w-125px text-center'>Status</th>
                      <th className='min-w-50px text-center' />
                    </tr>
                  </thead>
                  <tbody>
                    <ShowField
                      show={quotationList && quotationList.length > 0}
                      showInProgress={quotationLoading}
                      yes={() => (
                        <>
                          {quotationList.map((item, i) => (
                            <tr key={i}>
                              <td>
                                <span className='fw-bolder text-hover-secondary d-block fs-6'>
                                  {item.quotnum}
                                </span>
                              </td>
                              <td>
                                <span className='fw-bolder text-hover-secondary d-block fs-6'>
                                  Motor
                                </span>
                              </td>
                              <td>
                                <span className='fw-bolder text-hover-secondary d-block fs-6'>
                                  {moment(item.datecrt).format('D MMMM YYYY')}
                                </span>
                              </td>
                              <td>
                                <span className='fw-bolder text-hover-secondary d-block fs-6'>
                                  {item.FIRSTNAME}
                                </span>
                              </td>
                              <td className='text-center'>
                                <span
                                  style={{ background: item.quostatuscode }}
                                  className='badge text-white fs-6 fw-bold'
                                >
                                  {item.quostatus}
                                </span>
                              </td>
                            {item.quostatus !== 'CANCELLED' && <td>
                                <IconButton
                                  aria-label='details'
                                  size='small'
                                  onClick={() => {
                                    handleClickIndividual(item)
                                  }}
                                >
                                  <KeyboardArrowRightIcon className='text-targetBlue' />
                                </IconButton>
                              </td>}
                            </tr>
                          ))}
                        </>
                      )}
                      no={() =>
                        <Box
                          display='flex'
                          flexDirection='column' justifyContent='center'
                          alignItems='center'
                        >
                          No record(s) found!
                        </Box>}
                    />
                  </tbody>
                </table>
                <TablePagination
                  className={classes.MuiTypographyBody2}
                  rowsPerPageOptions={[]}
                  component='div'
                  count={pageCount}
                  rowsPerPage={perPage}
                  page={page - 1}
                  onPageChange={handleChangePage}
                  // onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <div className='d-flex justify-content-between mb-3'>
                <div className='d-flex'>
                  <div className='d-flex flex-column align-item-center mr-8'>
                    <h3 className='text-primaryBlue fw-bold'>Policies expiring soon</h3>
                    <div className='d-flex align-items-center'>
                      <CachedIcon className='text-dark-50 mr-2' />
                      <p className='text-dark-50 fs-8 fw-300 m-0'>4 August 2022 - 3:20 PM</p>
                    </div>
                  </div>
                  <div className='border-left border-2 border-secondary d-flex align-items-center'>
                    {/* <IconButton
                      aria-label='filter'
                      size='medium'
                      onClick={() => {
                        handleClickOpen()
                      }}
                    >
                      <FilterList fontSize='medium' className='text-targetBlue' />
                    </IconButton>
                    <h6 className='text-uppercase'>Filter</h6> */}
                  </div>
                </div>
                <div className='d-flex align-item-center'>
                  <IconButton
                    aria-label='details'
                    size='medium'
                    onClick={() => {
                      history.push(`/${authRole}/quotes/list`)
                    }}
                  >
                    <KeyboardArrowRightIcon className='text-targetBlue' />
                  </IconButton>
                </div>
              </div>
              <div className='table-responsive'>
                <table className='table align-middle gs-0 gy-4'>
                  {/* <thead>
                    <tr className='fw-bolder text-secondary text-hover-dark bg-targetBlue'>
                      <th className='min-w-125px'>Policy No.</th>
                      <th className='min-w-125px'>Product</th>
                      <th className='min-w-125px'>Client Name</th>
                      <th className='min-w-125px'>Expiry Date</th>
                      <th className='min-w-125px text-center'>Status</th>
                      <th className='min-w-50px text-center' />
                    </tr>
                  </thead> */}
                  <tbody>
                    <ShowField
                      show={quotationList && quotationList.length === 0}
                      showInProgress={quotationLoading}
                      yes={() => (
                        <>
                          {quotationList.map((item, i) => (
                            <tr key={i}>
                              <td>
                                <span className='fw-bolder text-hover-secondary d-block fs-6'>
                                  {item.polcd}
                                </span>
                              </td>
                              <td>
                                <span className='fw-bolder text-hover-secondary d-block fs-6'>
                                  Motor
                                </span>
                              </td>
                              <td>
                                <span className='fw-bolder text-hover-secondary d-block fs-6'>
                                  {moment(item.datecrt).format('D MMMM YYYY')}
                                </span>
                              </td>
                              <td>
                                <span className='fw-bolder text-hover-secondary d-block fs-6'>
                                  {item.FIRSTNAME}
                                </span>
                              </td>
                              <td className='text-center'>
                                <span
                                  style={{ background: item.quostatuscode }}
                                  className='badge text-white fs-6 fw-bold'
                                >
                                  {item.quostatus}
                                </span>
                              </td>
                              <td>
                                <IconButton
                                  aria-label='details'
                                  size='small'
                                  onClick={() => {
                                    handleClickIndividual(item)
                                  }}
                                >
                                  <KeyboardArrowRightIcon className='text-targetBlue' />
                                </IconButton>
                              </td>
                            </tr>
                          ))}
                        </>
                      )}
                      no={() =>
                        <Box
                          display='flex'
                          className={classes.Norecordsfound}
                          flexDirection='column' justifyContent='center'
                          alignItems='center'
                        >
                          No data found!
                        </Box>}
                    />
                  </tbody>
                </table>
                {/* <TablePagination
                  className={classes.MuiTypographyBody2}
                  rowsPerPageOptions={[10, 25, 100]}
                  component='div'
                  count={quotationData.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                /> */}
              </div>
            </Paper>
          </Grid>
        </Grid>
        <NewQuoteButton />
      </Grid>
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
    pageCount: Quotation.pageCount,
    getQuoteDetailsStatus: MotorQuotation?.getQuoteDetailsStatus,
    getQuoteDetailsLoading: MotorQuotation?.getQuoteDetailsLoading,
    getQuoteDetails: MotorQuotation?.getQuoteDetails,
  }
}

const mapDispatchToProps = (dispatch) => ({
  quotationListDispatch: (params) => dispatch(QuotationActions.FetchQuotationList(params)),
  SaveMotorFormAction: data => dispatch(MotorQuotationAction.SaveMotorFormAction(data)),
  getQuoteDetailsDispatch: id => dispatch(MotorQuotationAction.GetQuoteDetailsAction(id)),
  ClearMotQuoteDetailsDispatch: () => dispatch(MotorQuotationAction.ClearMotQuoteDetailsAction()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Overview)

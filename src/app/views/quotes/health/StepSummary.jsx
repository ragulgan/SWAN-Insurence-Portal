import React, { Fragment, useEffect } from 'react'
import Icofont from 'react-icofont'
import PerfectScrollbar from 'react-perfect-scrollbar'
import AliceCarousel from 'react-alice-carousel'
import toast from 'react-hot-toast'
import { Grid, Button, CircularProgress } from '@material-ui/core'
import { Carousel } from '3d-react-carousal'
import { Link, useLocation, useHistory } from 'react-router-dom'
import { connect, shallowEqual, useSelector } from 'react-redux'
import { HealthActions } from 'store/actions'

import { makeQueryString } from 'helpers/helper'
import 'react-alice-carousel/lib/alice-carousel.css'
import _ from 'lodash'

const scrollbarOptions = {
  wheelSpeed: 0.5,
  wheelPropagation: false
}
const responsive = {
  0: {
    items: 1
  },
  568: {
    items: 1
  },
  1024: {
    items: 1
  },
  2000: {
    items: 1
  }
}

const StepHealthSummary = (props) => {
  const history = useHistory()
  const { authRole } = useSelector(
    ({ Auth }) => ({
      authRole: Auth.authRole
    }),
    shallowEqual
  )
  const location = useLocation()
  const queryParameters = new URLSearchParams(location.search)
  const step = queryParameters.get('step')
  const quotation_id = queryParameters.get('quotation-id')
  const {
    fromPage,
    quote,
    allDownloadDispatch,
    allDownloadLoading,
    allDownloadSuccess,
    oneDownloadDispatch,
    oneDownloadLoading,
    oneDownloadSuccess,
    sendQuotesDispatch,
    sendQuoteLoading,
    sendQuoteSuccess,
    printQuotesDispatch,
    printQuoteLoading,
    printQuoteSuccess,
    cancelQuotesDispatch,
    cancelQuoteLoading,
    cancelQuoteSuccess
  } = props

  const allDownloadHandler = () => {
    allDownloadDispatch('#0009')
  }
  const oneDownloadHandler = () => {
    oneDownloadDispatch('#000')
  }
  const sendQuoteHanler = () => {
    sendQuotesDispatch('#0009')
  }
  const printQuoteHanler = () => {
    printQuotesDispatch('#0009')
  }
  const cancelQuoteHanler = () => {
    cancelQuotesDispatch('#0009')
  }

  // Update quote data
  useEffect(() => {
    if (!_.isEmpty(quote)) {
      console.log('quote', quote)
    }
  }, [quote])

  useEffect(() => {
    if (allDownloadSuccess) {
      toast.success('Downloaded ...All Quotes', { duration: 3000 })
    }
  }, [allDownloadSuccess])

  useEffect(() => {
    if (sendQuoteSuccess) {
      toast.success('Quote send ... Successfully', { duration: 3000 })
    }
  }, [sendQuoteSuccess])

  useEffect(() => {
    if (printQuoteSuccess) {
      toast.success('Print quote ... Successfully', { duration: 3000 })
    }
  }, [printQuoteSuccess])

  useEffect(() => {
    if (cancelQuoteSuccess) {
      toast.error('Quote Cancelled', { duration: 3000 })
    }
  }, [cancelQuoteSuccess])

  const items = [
    <>
      <div className='quote-summary-header loader-xs'>
        <Button
          color='primary'
          onClick={() => (
            history.push({
              pathname: 'health',
              search: `?${makeQueryString({
                                'quotation-id': quotation_id,
                                step: 'personal-information'
                            })}`
            })
          )}
        >
          <Icofont icon='pencil-alt-2' /> &nbsp; EDIT
        </Button>
        <Button color='primary' onClick={oneDownloadHandler}>
          <Icofont icon='download-alt' /> &nbsp; DOWNLOAD QUOTE {oneDownloadLoading ? <CircularProgress /> : null}
        </Button>
        <Button
          href='#text-buttons'
          color='primary'
          variant='outlined'
          className='f-right'
          onClick={cancelQuoteHanler}
        >
          CANCEL QUOTE {cancelQuoteLoading ? <CircularProgress /> : null}
        </Button>
      </div>
      <div className='quote-summary-content'>
        <div className='content-box'>
          <div className='content-box-header blue-header'>
            <h4>Provisional Quotation</h4>
          </div>
          <div className='content-box-content'>
            <PerfectScrollbar
              options={scrollbarOptions}
              className='scroll'
              style={{
                maxHeight: '580px',
                position: 'relative'
              }}
            >
              <ul className='summary-ul bb'>
                <li className='bold-li'>
                  Sunrise <span className='price-bold'>Rs 6,982</span>
                </li>
                <li>
                  Surgical care<span>Rs 250 000</span>
                </li>
                <li>
                  Delivery and childbirth <span>Rs 100 000</span>
                </li>
                <li>
                  Road ambulance <span>Rs 10 000</span>
                </li>
                <li>
                  Medical treatment <span>-</span>
                </li>
                <li>
                  Congenital Operation <span>-</span>
                </li>
                <li>
                  Assisted Reproduction <span>-</span>
                </li>
                <li>
                  Psychological Trauma <span>-</span>
                </li>
                <li>
                  Funeral Benefit <span>-</span>
                </li>
              </ul>
              <ul className='summary-ul bb'>
                <li className='bold-li'>
                  Out-Patient (Optional)
                </li>
                <li>
                  Rs10,000 annual limit<span>Rs 5,931</span>
                </li>
              </ul>
              <ul className='summary-ul'>
                <li className='bold-li'>
                  Total <span>Rs 6982</span>
                </li>
              </ul>
            </PerfectScrollbar>
          </div>
        </div>
      </div>
    </>,
    <>
      <div className='quote-summary-header loader-xs'>
        <Button
          color='primary'
          onClick={() => (
            history.push({
              pathname: 'health',
              search: `?${makeQueryString({
                                'quotation-id': quotation_id,
                                step: 'personal-information'
                            })}`
            })
          )}
        >
          <Icofont icon='pencil-alt-2' /> &nbsp; EDIT
        </Button>
        <Button color='primary' onClick={oneDownloadHandler}>
          <Icofont icon='download-alt' /> &nbsp; DOWNLOAD QUOTE {oneDownloadLoading ? <CircularProgress /> : null}
        </Button>
        <Button
          href='#text-buttons'
          color='primary'
          variant='outlined'
          className='f-right'
          onClick={cancelQuoteHanler}
        >
          CANCEL QUOTE {cancelQuoteLoading ? <CircularProgress /> : null}
        </Button>
      </div>
      <div className='quote-summary-content'>
        <div className='content-box'>
          <div className='content-box-header blue-header'>
            <h4>Provisional Quotation</h4>
          </div>
          <div className='content-box-content'>
            <PerfectScrollbar
              options={scrollbarOptions}
              className='scroll'
              style={{
                maxHeight: '580px',
                position: 'relative'
              }}
            >
              <ul className='summary-ul bb'>
                <li className='bold-li'>
                  Sunrise <span className='price-bold'>Rs 6,982</span>
                </li>
                <li>
                  Surgical care<span>Rs 250 000</span>
                </li>
                <li>
                  Delivery and childbirth <span>Rs 100 000</span>
                </li>
                <li>
                  Road ambulance <span>Rs 10 000</span>
                </li>
                <li>
                  Medical treatment <span>-</span>
                </li>
                <li>
                  Congenital Operation <span>-</span>
                </li>
                <li>
                  Assisted Reproduction <span>-</span>
                </li>
                <li>
                  Psychological Trauma <span>-</span>
                </li>
                <li>
                  Funeral Benefit <span>-</span>
                </li>
              </ul>
              <ul className='summary-ul bb'>
                <li className='bold-li'>
                  Out-Patient (Optional)
                </li>
                <li>
                  Rs10,000 annual limit<span>Rs 5,931</span>
                </li>
              </ul>
              <ul className='summary-ul'>
                <li className='bold-li'>
                  Total <span>Rs 6982</span>
                </li>
              </ul>
            </PerfectScrollbar>
          </div>
        </div>
      </div>
    </>,
    <>
      <div className='quote-summary-header loader-xs'>
        <Button
          color='primary'
          onClick={() => (
            history.push({
              pathname: 'health',
              search: `?${makeQueryString({
                                'quotation-id': quotation_id,
                                step: 'personal-information'
                            })}`
            })
          )}
        >
          <Icofont icon='pencil-alt-2' /> &nbsp; EDIT
        </Button>
        <Button color='primary' onClick={oneDownloadHandler}>
          <Icofont icon='download-alt' /> &nbsp; DOWNLOAD QUOTE {oneDownloadLoading ? <CircularProgress /> : null}
        </Button>
        <Button
          href='#text-buttons'
          color='primary'
          variant='outlined'
          className='f-right'
          onClick={cancelQuoteHanler}
        >
          CANCEL QUOTE {cancelQuoteLoading ? <CircularProgress /> : null}
        </Button>
      </div>
      <div className='quote-summary-content'>
        <div className='content-box'>
          <div className='content-box-header blue-header'>
            <h4>Provisional Quotation</h4>
          </div>
          <div className='content-box-content'>
            <PerfectScrollbar
              options={scrollbarOptions}
              className='scroll'
              style={{
                maxHeight: '580px',
                position: 'relative'
              }}
            >
              <ul className='summary-ul bb'>
                <li className='bold-li'>
                  Sunrise <span className='price-bold'>Rs 6,982</span>
                </li>
                <li>
                  Surgical care<span>Rs 250 000</span>
                </li>
                <li>
                  Delivery and childbirth <span>Rs 100 000</span>
                </li>
                <li>
                  Road ambulance <span>Rs 10 000</span>
                </li>
                <li>
                  Medical treatment <span>-</span>
                </li>
                <li>
                  Congenital Operation <span>-</span>
                </li>
                <li>
                  Assisted Reproduction <span>-</span>
                </li>
                <li>
                  Psychological Trauma <span>-</span>
                </li>
                <li>
                  Funeral Benefit <span>-</span>
                </li>
              </ul>
              <ul className='summary-ul bb'>
                <li className='bold-li'>
                  Out-Patient (Optional)
                </li>
                <li>
                  Rs10,000 annual limit<span>Rs 5,931</span>
                </li>
              </ul>
              <ul className='summary-ul'>
                <li className='bold-li'>
                  Total <span>Rs 6982</span>
                </li>
              </ul>
            </PerfectScrollbar>
          </div>
        </div>
      </div>
    </>,
    <>
      <div className='quote-summary-header loader-xs'>
        <Button
          color='primary'
          onClick={() => (
            history.push({
              pathname: 'health',
              search: `?${makeQueryString({
                                'quotation-id': quotation_id,
                                step: 'personal-information'
                            })}`
            })
          )}
        >
          <Icofont icon='pencil-alt-2' /> &nbsp; EDIT
        </Button>
        <Button color='primary' onClick={oneDownloadHandler}>
          <Icofont icon='download-alt' /> &nbsp; DOWNLOAD QUOTE {oneDownloadLoading ? <CircularProgress /> : null}
        </Button>
        <Button
          href='#text-buttons'
          color='primary'
          variant='outlined'
          className='f-right'
          onClick={cancelQuoteHanler}
        >
          CANCEL QUOTE {cancelQuoteLoading ? <CircularProgress /> : null}
        </Button>
      </div>
      <div className='quote-summary-content'>
        <div className='content-box'>
          <div className='content-box-header blue-header'>
            <h4>Provisional Quotation</h4>
          </div>
          <div className='content-box-content'>
            <PerfectScrollbar
              options={scrollbarOptions}
              className='scroll'
              style={{
                maxHeight: '580px',
                position: 'relative'
              }}
            >
              <ul className='summary-ul bb'>
                <li className='bold-li'>
                  Sunrise <span className='price-bold'>Rs 6,982</span>
                </li>
                <li>
                  Surgical care<span>Rs 250 000</span>
                </li>
                <li>
                  Delivery and childbirth <span>Rs 100 000</span>
                </li>
                <li>
                  Road ambulance <span>Rs 10 000</span>
                </li>
                <li>
                  Medical treatment <span>-</span>
                </li>
                <li>
                  Congenital Operation <span>-</span>
                </li>
                <li>
                  Assisted Reproduction <span>-</span>
                </li>
                <li>
                  Psychological Trauma <span>-</span>
                </li>
                <li>
                  Funeral Benefit <span>-</span>
                </li>
              </ul>
              <ul className='summary-ul bb'>
                <li className='bold-li'>
                  Out-Patient (Optional)
                </li>
                <li>
                  Rs10,000 annual limit<span>Rs 5,931</span>
                </li>
              </ul>
              <ul className='summary-ul'>
                <li className='bold-li'>
                  Total <span>Rs 6982</span>
                </li>
              </ul>
            </PerfectScrollbar>
          </div>
        </div>
      </div>
    </>
  ]
  return (
    <>
      {authRole === 'customer'
        ? <Grid
            container
            direction='row'
            justifyContent='center'
            alignItems='center'
            spacing={4}
          >
          <Grid item xs={12} sm={10} md={8} lg={7} className='txt-center'>
            <p className='h-info'>The quotation has been sent to you by email.
              A Swan representative will contact you within 2 working days.
              If you want to proceed with the Provisional quote,
              click on <Link to='/'>proceed with proposal.</Link>
            </p>
          </Grid>
          </Grid>
        : null}
      <Grid
        container
        direction='row'
        justifyContent='flex-start'
        alignItems='center'
        spacing={4}
        className='health-summary'
      >
        <Grid item xs={12} sm={5} md={5} lg={5}>
          <section className='summary-box'>
            <h4 className='summary-heading'>Summary</h4>
            <ul className='summary-ul bb'>
              <div style={{ marginBottom: '10px' }}>
                <h5 className='summary-title'>Quotation Summary</h5>
              </div>
              <li>Policy Holder <span>Javin Hong Wa Ban</span></li>
              <li>Spouse <span>Jessica Hong Wa Ban</span></li>
              <li>Dependant 1 <span>Jimmy Hong Wa Ban</span></li>
              <li>Dependant 2 <span>Jane Hong Wa Ban</span></li>
              <li>Quotation Number <span>HTH12345</span></li>
              <li>Quotation Date <span>05/09/2022</span></li>
              <li>Quote Validity <span>33 Days</span></li>
            </ul>
          </section>
          <p className='txt-center loader-xs'>
            <Button color='primary' onClick={allDownloadHandler}>
              <Icofont icon='download-alt' style={{ color: '#002f87' }} /> &nbsp; DOWNLOAD ALL QUOTES {allDownloadLoading ? <CircularProgress /> : null}
            </Button>
          </p>
        </Grid>
        <Grid item xs={12} sm={7} md={7} lg={7}>
          <section className='quote-summary'>
            <AliceCarousel
              responsive={responsive}
              animationDuration={500}
              paddingLeft={40}
              paddingRight={40}
              items={items}
            />
          </section>
        </Grid>
      </Grid>
      <Grid
        container
        direction='row'
        justifyContent='flex-start'
        alignItems='center'
        spacing={4}
        style={{ marginTop: '74px' }}
      >
        <Grid item xs={12} sm={6} md={6} lg={6} className='txt-center loader-xs'>
          <Button
            color='primary'
            style={{ marginRight: '10px' }}
            onClick={sendQuoteHanler}
          >
            SEND QUOTE {sendQuoteLoading ? <CircularProgress /> : null}
          </Button>
          <Button
            variant='contained'
            color='primary'
            onClick={printQuoteHanler}
          >
            PRINT QUOTATION {printQuoteLoading ? <CircularProgress color='secondary' /> : null}
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6} className='txt-right'>
          <Button
            variant='outlined'
            color='primary'
            className='mar-right-s back-button1'
            onClick={() => (
              history.push({
                pathname: 'health',
                search: `?${makeQueryString({
                                    'quotation-id': quotation_id,
                                    step: 'plan-selection'
                                })}`
              })
            )}
          >
            Back
          </Button>
          {/* <Button
                        variant="contained"
                        color="primary">
                        PROCEED WITH PROPOSAL
                    </Button> */}
        </Grid>
      </Grid>
    </>
  )
}

const mapStateToProps = (state) => {
  const { Health } = state
  return {
    allDownloadLoading: Health.allDownloadLoading,
    allDownloadSuccess: Health.allDownloadSuccess,
    oneDownloadLoading: Health.oneDownloadLoading,
    oneDownloadSuccess: Health.oneDownloadSuccess,
    sendQuoteLoading: Health.sendQuoteLoading,
    sendQuoteSuccess: Health.sendQuoteSuccess,
    printQuoteLoading: Health.printQuoteLoading,
    printQuoteSuccess: Health.printQuoteSuccess,
    cancelQuoteLoading: Health.cancelQuoteLoading,
    cancelQuoteSuccess: Health.cancelQuoteSuccess
  }
}
const mapDispatchToProps = (dispatch) => ({
  allDownloadDispatch: (quoteId) => dispatch(HealthActions.DownloadAllQuote(quoteId)),
  oneDownloadDispatch: (quoteId) => dispatch(HealthActions.DownloadSingleQuote(quoteId)),
  sendQuotesDispatch: (quoteId) => dispatch(HealthActions.SendQuote(quoteId)),
  printQuotesDispatch: (quoteId) => dispatch(HealthActions.PrintQuote(quoteId)),
  cancelQuotesDispatch: (quoteId) => dispatch(HealthActions.CancelQuote(quoteId))
})

export default connect(mapStateToProps, mapDispatchToProps)(StepHealthSummary)

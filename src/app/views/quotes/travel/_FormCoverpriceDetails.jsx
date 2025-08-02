import React, { useState, useEffect, useRef } from 'react'
import { connect, shallowEqual, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { Grid, Button, makeStyles, CircularProgress } from '@material-ui/core'
import _ from 'lodash'
import moment from 'moment'
import Icofont from 'react-icofont'
import { useForm } from 'react-hook-form'
import InfoPopup from '../../../../app/widgets/InfoPopup'
import ValidateNotify from '../../../../app/widgets/ValidateNotify'
import Mswitch from '../../../../app/form-controls/Mswitch'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import 'react-modern-drawer/dist/index.css'
import { GRANTED_USERS, TRAVEL_FORM, DATE } from '../../../../helpers/constants'
import { travelPlanActions, TravelQuotationAction } from '../../../../store/actions'
import CustomBackdrop from '../../../../app/backdrop/CustomBackdrop'
import {
  getLocalStorage,
  removeErrString
} from '../../../../helpers/helper'
import { ShowField } from '../../../uiComponents'
import { getDateDiff } from './formData/formData'

const useSyles = makeStyles((theme) => ({
  item1: {
    order: 1,
    [theme.breakpoints.up('sm')]: {
      order: 1
    }
  },
  item2: {
    order: 2,
    [theme.breakpoints.up('sm')]: {
      order: 2
    }
  },
  item3: {
    order: 3,
    [theme.breakpoints.up('sm')]: {
      order: 3
    }
  },
  item4: {
    order: 4,
    [theme.breakpoints.up('sm')]: {
      order: 4
    }
  },
  end: {
    textAlign: 'end'
  },
  grid: {
    display: 'flex'
  },
  record: {
    fontSize: '22px',
    textAlign: 'center',
    padding: '5px'
  }
}))

const StepCoverpriceDetails = (props) => {
  const {
    thirdDefault,
    backStep,
    travelPlanData,
    gettravelPlanRequestDispatch,
    getTravelPlanLoading,
    postTravelPlanDispatch,
    clearTravelPlanDispatch,
    postTravelPlanLoading,
    postTravelPlanData,
    postTravelPlanStatus,
    getBabbagePlanRequestDispatch,
    babbagePlanData,
    getBabbagePlanLoading,
    postTravelBabbagePlanDispatch,
    clearTravelBabbagePlanDispatch,
    postTravelBabbagePlanLoading,
    postTravelBabbagePlanData,
    postTravelBabbagePlanStatus,
    getTRQuoteDetailsDispatch,
    clearTRQuoteDetailsDispatch,
    getTRQuoteDetails,
    getTRQuoteDetailsStatus,
    getCountryMatrixDispatch,
    clearCountryMatrixDispatch,
    getCountryMatrixLoading,
    countryMatrixData,
    countryMatrixStatus,
    getPlanMatrixDispatch,
    clearPlanMatrixDispatch,
    getPlanMatrixLoading,
    planMatrixData,
    planMatrixStatus
  } = props
  const { authRole } = useSelector(
    ({ Auth }) => ({
      authRole: Auth.authRole
    }),
    shallowEqual
  )
  const classes = useSyles()
  const { fromPage, next, back, deviceType } = props
  const { control, reset, handleSubmit, formState, clearErrors } = useForm({
    defaultValues: {
      TERRORISM: false,
      Covidin: false
    }
  })
  const didMount = useRef(false)
  const [planData, setPlanData] = useState('')
  const [planId, setPlanId] = useState('')
  const [amount, setAmount] = useState('')
  const [activePack, setActivePack] = useState('')
  const [bagPlanId, setBagPlanId] = useState('')
  const [showCoverage, setShowcoverage] = useState(false)
  const [errorPop, setErrorPop] = useState(false)
  const [state, setState] = useState({
    personalData: {},
    travelPlan: {},
    coverPlanData: {}
  })
  const [countryPlan, setCountryPlan] = useState({
    Atlas: '',
    Border: '',
    Compass: '',
    Delta: '',
    Explorer: '',
    PassTerror: ''
  })
  const [planMatrix, setPlanMatrix] = useState({
    Covid: ''
  })

  const personalData = state?.personalData
  const travelPlan = state?.travelPlan
  const coverPlanDetails = state?.coverPlanData
  const DestinationList = travelPlan && travelPlan?.DestinationList
  const { errors } = formState
  const message = 'Please fill in required information to proceed'
  const travelQuoteNo = getLocalStorage(TRAVEL_FORM.QUOTE_NUMBER)
  const DTBIRTH = personalData?.DTBIRTH?.replace(/\s+/g, '')
  const DTFROM = travelPlan?.DTFROM?.replace(/\s+/g, '')
  const DTTO = travelPlan?.DTTO?.replace(/\s+/g, '')
  const clearNotify = () => {
    setErrorPop(false)
  }

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 4
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 580 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 579, min: 391 },
      items: 2
    },
    small_mobile: {
      breakpoint: { max: 390, min: 0 },
      items: 1
    }
  }

  const handlePlanSelect = (desc, plan, amount) => {
    setPlanData(desc)
    setPlanId(plan)
    setAmount(amount)
  }

  const handlePlanSubmit = () => {
    const payload = {
      ...state.personalData,
      ...state.travelPlan,
      TRVPLAN: planId ? planId : state?.coverPlanData?.TRVPLAN,
      DTBIRTH: moment(DTBIRTH).format(DATE.DATE_ONLY),
      DTFROM: moment(DTFROM).format(DATE.DATE_ONLY),
      DTTO: moment(DTTO).format(DATE.DATE_ONLY)
    }
    postTravelPlanDispatch(payload)
  }

  const handleBaggagePlanSelect = (desc, baggagePlan) => {
    setActivePack(desc)
    setBagPlanId(baggagePlan)
  }

  const onSubmit = (data) => {
    const _payload = {
      ...data,
      ...state.personalData,
      ...state.travelPlan,
      TRVPLAN: state?.coverPlanData?.TRVPLAN,
      BAGPLAN: bagPlanId ? bagPlanId : state?.coverPlanData?.BAGPLAN,
      DTBIRTH: moment(DTBIRTH).format(DATE.DATE_ONLY),
      DTFROM: moment(DTFROM).format(DATE.DATE_ONLY),
      DTTO: moment(DTTO).format(DATE.DATE_ONLY)
    }
    postTravelBabbagePlanDispatch(_payload)
  }

  const resetCoverPlanValues = item => {
    reset(formValues => ({
      ...formValues,
      TERRORISM: item.TERRORISM,
      Covidin: item.Covidin
    }))
  }

  const getDuration = getDateDiff(travelPlan && travelPlan?.DTFROM, travelPlan?.DTTO, 'days')
  const mergeArray = () => {
    const arr = []
    {
      if (travelPlanData && travelPlanData.length > 0) {
        _.forEach(travelPlanData, (plan) => {
          if (countryPlan[plan.PRMINDADESC] === 'Y') {
            arr.push({
              ...plan,
              planName: plan[plan.PRMINDADESC]
            })
          }
        })
      }
      return arr
    }
  }

  const desCountry = DestinationList && DestinationList.map(function (element) {
    return (
      <li className={classes.end}>
        {element.Destination}
      </li>
    )
  })

  useEffect(() => {
    if (postTravelPlanStatus === 'success') {
      toast.success('Plan informations have been saved!', { duration: 3000 })
      const planParams = {
        code: planId
      }
      getPlanMatrixDispatch(planParams)
      setShowcoverage(true)
      getTRQuoteDetailsDispatch(travelQuoteNo)
      clearTravelPlanDispatch()
    } else if (postTravelPlanStatus === 'error') {
      toast.error(removeErrString(postTravelPlanData), { duration: 4000 })
      clearTravelPlanDispatch()
    }
  }, [postTravelPlanStatus])

  useEffect(() => {
    if (postTravelBabbagePlanStatus === 'success') {
      toast.success('Coverage Plan informations have been saved!', { duration: 3000 })
      next()
      clearTravelBabbagePlanDispatch()
    } else if (postTravelBabbagePlanStatus === 'error') {
      toast.error(removeErrString(postTravelBabbagePlanData), { duration: 4000 })
      clearTravelBabbagePlanDispatch()
    }
  }, [postTravelBabbagePlanStatus])

  useEffect(() => {
    getBabbagePlanRequestDispatch()
    if (travelQuoteNo) {
      gettravelPlanRequestDispatch(travelQuoteNo)
      getTRQuoteDetailsDispatch(travelQuoteNo)
    }
  }, [])

  useEffect(() => {
    const personalInfo = getTRQuoteDetails &&
      getTRQuoteDetails.personalInfo
      ? getTRQuoteDetails.personalInfo
      : {}
    const travelPlanDetailsData = getTRQuoteDetails &&
      getTRQuoteDetails.travelPlan
      ? getTRQuoteDetails.travelPlan
      : {}
    const coveragePlanData = getTRQuoteDetails &&
      getTRQuoteDetails.coverPriceDetails
      ? getTRQuoteDetails.coverPriceDetails
      : {}
    if (didMount.current && getTRQuoteDetailsStatus === 'success') {
      resetCoverPlanValues(coveragePlanData, reset)
      setState(prevState => ({
        ...prevState,
        personalData: personalInfo,
        travelPlan: travelPlanDetailsData,
        coverPlanData: coveragePlanData
      }))
      setPlanData(getTRQuoteDetails?.coverPriceDetails?.TRVPLANDESC ?
        getTRQuoteDetails?.coverPriceDetails?.TRVPLANDESC?.PRMINDADESC : '')
      setActivePack(getTRQuoteDetails?.coverPriceDetails?.BAGPLANDESC?.PRMINDADESC ?
        getTRQuoteDetails?.coverPriceDetails?.BAGPLANDESC?.PRMINDADESC : '')
    }
    if (getTRQuoteDetails?.travelPlan && getTRQuoteDetails?.travelPlan) {
      const getDistinationList = getTRQuoteDetails?.travelPlan?.DestinationList ? getTRQuoteDetails?.travelPlan?.DestinationList : []
      const desCountry = getDistinationList?.map(item => item.Destination).join(',')
      const param = {
        country: desCountry
      }
      if (desCountry && desCountry) {
        getCountryMatrixDispatch(param)
      }
    }
    clearTRQuoteDetailsDispatch()
  }, [getTRQuoteDetailsStatus])

  useEffect(() => {
    if (countryMatrixStatus === 'success') {
      const matrixData = countryMatrixData && countryMatrixData[0]
      setCountryPlan(prevState => ({
        ...prevState,
        Atlas: matrixData?.PNLCOMPREHENSIVE,
        Border: matrixData?.PNLBORDER,
        Compass: matrixData?.PNLSAFETY,
        Delta: matrixData?.PNLECONOMY,
        Explorer: matrixData?.PNLBASIC,
        PassTerror: matrixData?.PNLTERROR
      }))
      clearCountryMatrixDispatch()
    }
  }, [countryMatrixStatus])

  useEffect(() => {
    if (planMatrixStatus === 'success') {
      const planMatrixDetail = planMatrixData && planMatrixData[0]
      setPlanMatrix(prevState => ({
        ...prevState,
        Covid: planMatrixDetail?.PNLCOVID19
      }))
      clearPlanMatrixDispatch()
    }
  }, [planMatrixStatus])

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true
    }
    return () => {
      clearTRQuoteDetailsDispatch()
    }
  }, [])

  useEffect(() => {
    if (thirdDefault === "coverage") {
      setShowcoverage(true)
    }
  }, [thirdDefault])

  useEffect(() => {
    if (_.size(errors)) {
      setErrorPop(true)
    }
  }, [errors])

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid
          container
          direction='row'
          justifyContent='center'
          alignItems='flex-start'
          spacing={4}
        >
          <ShowField
            show={showCoverage}
            yes={() => (
              <>
                <CustomBackdrop isLoading={getBabbagePlanLoading || getPlanMatrixLoading} />
                <Grid item xs={12} sm={12} md={12} xl={12}>
                  <Grid container spacing={2}>
                    <Grid
                      item
                      xs='auto'
                      sm={12}
                      md={12}
                      xl={12}
                    >
                      <h2
                        className='article-title'
                        onClick={() => setShowcoverage(false)}
                      >
                        <Icofont icon='arrow-left' style={{ color: '#00B7CD' }} />
                        {planData} Coverage Plan
                      </h2>
                    </Grid>
                    <Grid
                      item
                      xs='auto'
                      sm={8}
                      md={9}
                      lg={9}
                      xl={9}
                    >
                      <Carousel
                        className='carousel-three-module'
                        swipeable
                        draggable
                        responsive={responsive}
                        ssr
                        keyBoardControl
                        customTransition='all .5'
                        transitionDuration={500}
                        containerClass='carousel-container'
                        deviceType={deviceType}
                        removeArrowOnDeviceType={[
                          'tablet',
                          'mobile',
                          'small_mobile',
                          'desktop',
                          'superLargeDesktop'
                        ]}
                        itemClass='carousel-item-padding-40-px'
                      >
                        <Grid container spacing={3} className='scroll-module'>
                          {babbagePlanData &&
                            babbagePlanData.map((baggagePlan, i) => (
                              <Grid item xs={4} sm={4} md={3} lg={3}>
                                <section
                                  className={`${activePack === baggagePlan.DESC
                                    ? 'plan-box active-box cover__plan'
                                    : 'plan-box cover__plan'
                                    }`}
                                  onClick={() => { handleBaggagePlanSelect(baggagePlan.DESC, baggagePlan.PRMINDA) }}
                                >
                                  <h4>{baggagePlan.DESC}</h4>
                                  <p>
                                    {`${baggagePlan.DESC} Regular includes a baggage, money and document
                                    insurance`}
                                  </p>
                                  <p>
                                    <span className='delta-price'>{baggagePlan.BAGGAGEAMOUNT}</span>
                                  </p>
                                  <p className='separator-center'>More Details</p>
                                  <p>
                                    Baggage Insurance{' '}
                                    <span className='price-bold cover__price__bold'>
                                      {baggagePlan.BAGGAGEINS}
                                    </span>
                                  </p>
                                  <div>
                                    <span className='mt-5'>Money & Document Insurance </span>
                                    <span className='price-bold cover__price__bold'>
                                      {baggagePlan.MONEYDOCINS}
                                    </span>
                                  </div>
                                </section>
                              </Grid>
                            ))}
                        </Grid>
                      </Carousel>
                      <Grid className='toggle-verticle' container spacing={2}>
                        <ShowField
                          show={countryPlan?.PassTerror === 'Y'}
                          yes={() =>
                            <>
                              <Grid item md={5} sm={6} xs={12}>
                                <div className='s__head'>
                                  <h4>
                                    Passive Terrorism{' '}
                                    <InfoPopup
                                      info='Lorem ipsum dolor sit amet, consectetur adipiscing
                                      elit, sed do eiusmod tempor incididunt ut labore et
                                      dolore Lorem ipsum dolor sit amet, consectetur.'
                                    />
                                  </h4>
                                  <p>Do you want the passive terrorism cover?</p>
                                </div>
                                <Grid className='swan__switch'>
                                  <Mswitch
                                    xs={12}
                                    name='TERRORISM'
                                    control={control}
                                    clearErrors={clearErrors}
                                    grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                                    userType={authRole}
                                  />
                                </Grid>
                              </Grid>
                            </>}
                          no={() => null}
                        />
                        {planMatrix.Covid === 'Y'
                          ? (
                            <>
                              <Grid item md={5} sm={6} xs={12}>
                                <div className='s__head_v'>
                                  <h4>
                                    COVID-19 Extension{' '}
                                    <InfoPopup
                                      info='Lorem ipsum dolor sit amet, consectetur adipiscing
                                          elit, sed do eiusmod tempor incididunt ut labore et
                                          dolore Lorem ipsum dolor sit amet, consectetur.'
                                    />
                                  </h4>
                                  <p>Do you want a COVID-19 extension? </p>
                                </div>
                                <Grid className='swan__switch'>
                                  <Mswitch
                                    xs={12}
                                    name='Covidin'
                                    control={control}
                                    clearErrors={clearErrors}
                                    grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                                    userType={authRole}
                                  />
                                </Grid>
                              </Grid>
                            </>
                          )
                          : (
                            ''
                          )}
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      xl={3}
                      lg={3}
                      md={3}
                      sm={4}
                      xs='auto'
                      id='normal-travel-summary'
                    >
                      <div className='travel-cover-summary'>
                        <section className='summary-box bl'>
                          <div className='txt-center'>
                            <h4 className='summary-title'>TRAVEL SUMMARY</h4>
                            <h5>Total</h5>
                            <h4 className='summary-heading'>
                              Rs {coverPlanDetails &&
                                coverPlanDetails?.NETPREM
                                ? coverPlanDetails?.NETPREM
                                : '0'}
                            </h4>
                          </div>
                          <br />
                          <ul>
                            <div>
                              <h4 className='summary-heading-alt'>
                                Coverage Plan{' '}
                                <span>
                                  <Icofont
                                    icon='pencil'
                                    onClick={() => setShowcoverage(false)}
                                  />
                                </span>
                              </h4>
                            </div>
                            <br />
                            <li>
                              {planData ? planData : '--'}
                              <span>Rs {amount ? amount : '0'} </span>
                            </li>
                            <li>
                              {coverPlanDetails?.BAGPLANDESC?.PRMINDADESC
                                ? coverPlanDetails?.BAGPLANDESC?.PRMINDADESC
                                : babbagePlanData && babbagePlanData[2]?.DESC}
                              <span> {coverPlanDetails?.BAGPLANDESC?.BAGGAGEAMOUNT
                                ? coverPlanDetails?.BAGPLANDESC?.BAGGAGEAMOUNT
                                : babbagePlanData && babbagePlanData[2]?.BAGGAGEAMOUNT}
                              </span>
                            </li>
                            <li className='price-bold-header'>
                              Premium
                              <span className='price-bold'>Rs {coverPlanDetails &&
                                coverPlanDetails?.TOTPREM
                                ? coverPlanDetails?.TOTPREM
                                : '0'}
                              </span>
                            </li>
                          </ul>
                          <ul>
                            <li>
                              FSC Fee
                              <span>Rs {coverPlanDetails &&
                                coverPlanDetails?.FSCFEE
                                ? coverPlanDetails?.FSCFEE
                                : '0'}
                              </span>
                            </li>
                            <li>
                              Fees and Charge
                              <span>
                                Rs {coverPlanDetails &&
                                  coverPlanDetails?.ADMINFEE
                                  ? coverPlanDetails?.ADMINFEE
                                  : '0'}
                              </span>
                            </li>
                          </ul>
                          <ul className='summary-ul bb'>
                            <li className='price-bold-header'>
                              TOTAL
                              <span className='price-bold'>
                                Rs {coverPlanDetails &&
                                  coverPlanDetails?.NETPREM
                                  ? coverPlanDetails?.NETPREM
                                  : '0'}
                              </span>
                            </li>
                          </ul>
                          <br />
                          <div>
                            <h4 className='summary-heading-alt'>
                              Travel Details{' '}
                              <span>
                                <Icofont
                                  icon='pencil'
                                  onClick={() => back()}
                                />
                              </span>
                            </h4>
                          </div>
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
                              Departure
                              <span>{travelPlan &&
                                travelPlan?.DTFROM
                                ? moment(travelPlan?.DTFROM).format('DD MMM YYYY')
                                : '--'}
                              </span>
                            </li>
                            <li>
                              Return
                              <span>{travelPlan &&
                                travelPlan?.DTTO
                                ? moment(travelPlan?.DTTO).format('DD MMM YYYY')
                                : '--'}
                              </span>
                            </li>
                            <li>
                              Duration
                              <span>
                                {travelPlan && travelPlan?.NODAYS ?
                                  travelPlan?.NODAYS : '--'
                                } days
                              </span>
                            </li>
                            <li>
                              Travellers
                              <span>
                                {travelPlan && travelPlan?.ADULTS
                                  ? travelPlan?.ADULTS
                                  : '--'}
                              </span>
                            </li>
                          </ul>
                          </div>
                          <ShowField
                            show={authRole !== 'customer'}
                            yes={() =>
                              <ul>
                                <div>
                                  <h4 className='price-bold-header'>Policy 1 </h4>
                                </div>
                                <br />
                                <li>
                                  Departure
                                  <span>{travelPlan &&
                                    travelPlan?.DTFROM
                                    ? moment(travelPlan?.DTFROM).format('DD MMM YYYY')
                                    : '--'}
                                  </span>
                                </li>
                                <li>
                                  Return
                                  <span>{travelPlan &&
                                    travelPlan?.DTTO
                                    ? moment(travelPlan?.DTTO).format('DD MMM YYYY')
                                    : '--'}
                                  </span>
                                </li>
                                <li>
                                  Duration
                                  <span>
                                    {travelPlan && travelPlan?.NODAYS ?
                                      travelPlan?.NODAYS : '--'
                                    } days
                                  </span>
                                </li>
                              </ul>}
                            no={() => null}
                          />
                        </section>
                      </div>
                    </Grid>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    sm={fromPage === 'summary' ? 12 : 4}
                    md={5}
                    xl={12}
                    lg={12}
                    className='txt-right travel-plan'
                  >
                    <Button
                      variant='outlined'
                      color='primary'
                      className='mar-right-s back-button1'
                      onClick={() => {
                        backStep("plan")
                        setShowcoverage(false)
                      }}
                    >
                      Back
                    </Button>
                    <Button
                      variant='contained'
                      className='next-button1'
                      color='primary'
                      type='submit'
                      disabled={!activePack}
                    >
                      {postTravelBabbagePlanLoading
                        ? (
                          <CircularProgress size={18} style={{ color: '#ffffff' }} />
                        )
                        : (
                          'Next'
                        )}
                    </Button>
                  </Grid>
                </Grid>
              </>
            )}
            no={() => (
              <>
                <CustomBackdrop isLoading={getTravelPlanLoading || getCountryMatrixLoading} />
                <Grid item xs={12} sm={12} md={12} xl={12} lg={12}>
                  <Grid container alignItems='center' spacing={2}>
                    <Grid item xs={12} sm={12} md={12} xl={12}>
                      <h4 className='form-title-md ml-13'>Travel Insurance Plans</h4>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} xl={12}>
                      <h4 className='select-plan'>
                        Select the preferred plan of your client
                      </h4>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} xl={12} lg={12} className={classes.grid}>
                      <Grid item xs={3} sm={3} md={3} xl={3} className='m-5'>
                        <ul className='travel-plan-ul'>
                          <li className='travel-quote-list'>
                            Medical emergency and related expenses{' '}
                            <InfoPopup
                              info='Personal Emergency Assistance Service and Cover
                              including:
                              Medical Emergency Assistance;
                              Transportation/Repatriation;
                              Return of Travel Companion;
                              Return of Childern;
                              visit by a Family Memeber;
                              Return in case of Death or Imminent Death of
                              close Relative or Business Associate;
                              Bail;
                              Lost of Travel Documents;
                              Transmission of Urgent Messages.'
                            />
                          </li>
                          <li>
                            Burial, Cremation or Return of Mortal Remains
                          </li>
                          <li>Legal Assistance</li>
                          <li>Personal Liability Insurance</li>
                          <li>
                            Cancellation, Curtailment Alteration & Expenses
                          </li>
                          <li>
                            Personal Accident, Death & Permanent Disability
                          </li>
                        </ul>
                      </Grid>
                      <Grid item xs={8} sm={8} md={8} xl={8} className='carousel-travel-plan-selection-shadow'>
                        <ShowField
                          show={mergeArray() && mergeArray().length > 0}
                          yes={() => (
                            <>
                              <Carousel
                                swipeable
                                draggable
                                responsive={responsive}
                                ssr
                                keyBoardControl
                                customTransition='all .5'
                                transitionDuration={500}
                                containerClass='carousel-container'
                                deviceType={deviceType}
                                partialVisible
                                centerMode={false}
                                slidesToSlide={1}
                                removeArrowOnDeviceType={[
                                  'tablet',
                                  'mobile',
                                  'small_mobile',
                                  'desktop',
                                  'superLargeDesktop'
                                ]}
                                itemClass='carousel-item-padding-40-px'
                              >
                                {
                                  mergeArray() && mergeArray().map((travelPlan, i) => {
                                    return (
                                      <Grid item xs={3} sm={3} md={3} xl={3} className='m-5'>
                                        <span key={i}>
                                          <section
                                            className={`${planData === travelPlan.PRMINDADESC
                                              ? 'plan-box-initial active-box'
                                              : 'plan-box-initial'
                                              }`}
                                            onClick={() => { handlePlanSelect(travelPlan.PRMINDADESC, travelPlan.PRMINDA, travelPlan.COVERPLANAMOUNT) }}
                                          >
                                            <h4>{travelPlan.PRMINDADESC}</h4>
                                            <h3>Rs {travelPlan.COVERPLANAMOUNT}</h3>
                                            <p className='price'>{travelPlan.MEDEXPENCE}</p>
                                            <p className='price'>{travelPlan.MORTALREMAINS}</p>
                                            <p className='price'>{travelPlan.LEGALASST}</p>
                                            <p className='price'>{travelPlan.PERSONALLIABILITY}</p>
                                            <p className='price'>{travelPlan.ALTERATION}</p>
                                            <p className='price'>{travelPlan.PERSONALACCIDENT}</p>
                                          </section>
                                        </span>
                                      </Grid>
                                    )
                                  })
                                }
                              </Carousel>
                            </>
                          )}
                          no={() => (
                            <Grid item className={classes.record} xs={12} sm={12} md={12}>
                              <InfoPopup info='No records found' className='mr-2' />
                              <span>No records found</span>
                            </Grid>
                          )}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={fromPage === 'summary' ? 12 : 4}
                    md={5}
                    xl={12}
                    lg={12}
                    className='txt-right travel-plan'
                  >
                    <Button
                      variant='outlined'
                      color='primary'
                      className='mar-right-s back-button1'
                      onClick={() => back()}
                    >
                      Back
                    </Button>
                    <Button
                      variant='contained'
                      className='next-button1'
                      color='primary'
                      disabled={!planData}
                      onClick={() => handlePlanSubmit()}
                    >
                      {postTravelPlanLoading
                        ? (
                          <CircularProgress size={18} style={{ color: '#ffffff' }} />
                        )
                        : (
                          'Next'
                        )}
                    </Button>
                  </Grid>
                </Grid>
              </>
            )}
          />
          <Grid item xs={12} sm={fromPage === 'summary' ? 12 : 8} md={8} xl={4}>
            <ValidateNotify show={errorPop} errors={message} clear={clearNotify} />
          </Grid>
        </Grid>
      </form>
    </>
  )
}

const mapStateToProps = (state) => {
  const {
    TravelPlan, TravelQuotation
  } = state
  return {
    getTRQuoteDetailsStatus: TravelQuotation?.getTRQuoteDetailsStatus,
    getTRQuoteDetails: TravelQuotation?.getTRQuoteDetails,
    getTravelPlanLoading: TravelPlan?.getTravelPlanLoading,
    travelPlanData: TravelPlan?.travelPlanData,
    travelPlanStatus: TravelPlan?.travelPlanStatus,
    travelPlanMessage: TravelPlan?.travelPlanMessage,
    getNonCoverPlanLoading: TravelPlan?.getNonCoverPlanLoading,
    nonCoverPlanData: TravelPlan?.nonCoverPlanData,
    nonCoverPlanStatus: TravelPlan?.nonCoverPlanStatus,
    nonCoverPlanMessage: TravelPlan?.nonCoverPlanMessage,
    postTravelPlanLoading: TravelQuotation?.postTravelPlanLoading,
    postTravelPlanData: TravelQuotation?.postTravelPlanData,
    postTravelPlanStatus: TravelQuotation?.postTravelPlanStatus,
    postTravelPlanmessage: TravelQuotation?.postTravelPlanmessage,
    getBabbagePlanLoading: TravelPlan?.getBabbagePlanLoading,
    babbagePlanData: TravelPlan?.babbagePlanData,
    babbagePlanStatus: TravelPlan?.babbagePlanStatus,
    babbagePlanMessage: TravelPlan?.babbagePlanMessage,
    postTravelBabbagePlanLoading: TravelQuotation.postTravelBabbagePlanLoading,
    postTravelBabbagePlanData: TravelQuotation.postTravelBabbagePlanData,
    postTravelBabbagePlanStatus: TravelQuotation.postTravelBabbagePlanStatus,
    postTravelBabbagePlanmessage: TravelQuotation.postTravelBabbagePlanmessage,
    getCountryMatrixLoading: TravelPlan?.getCountryMatrixLoading,
    countryMatrixData: TravelPlan?.countryMatrixData,
    countryMatrixStatus: TravelPlan?.countryMatrixStatus,
    countryMatrixMessage: TravelPlan?.countryMatrixMessage,
    getPlanMatrixLoading: TravelPlan?.getPlanMatrixLoading,
    planMatrixData: TravelPlan?.planMatrixData,
    planMatrixStatus: TravelPlan?.planMatrixStatus,
    planMatrixMessage: TravelPlan?.planMatrixMessage
  }
}

const mapDispatchToProps = (dispatch) => ({
  getTRQuoteDetailsDispatch: (params) => dispatch(TravelQuotationAction.GetTRQuoteDetailsAction(params)),
  clearTRQuoteDetailsDispatch: () => dispatch(TravelQuotationAction.ClearTRQuoteDetailsAction()),
  gettravelPlanRequestDispatch: id => dispatch(travelPlanActions.gettravelPlanRequest(id)),
  clearTravelPlanRequestDispatch: () => dispatch(travelPlanActions.clearTravelPlanRequest()),
  getNonCoverPlanRequestDispatch: () => dispatch(travelPlanActions.getNonCoverPlanRequest()),
  clearNonCoverPlanRequestDispatch: () => dispatch(travelPlanActions.clearNonCoverPlanRequest()),
  postTravelPlanDispatch: (formData) => dispatch(TravelQuotationAction.PostTravelPlan(formData)),
  clearTravelPlanDispatch: () => dispatch(TravelQuotationAction.ClearPostTravelPlan()),
  getBabbagePlanRequestDispatch: () => dispatch(travelPlanActions.getBabbagePlanRequest()),
  clearBabbagePlanRequestDispatch: () => dispatch(travelPlanActions.clearBabbagePlanRequest()),
  postTravelBabbagePlanDispatch: (formData) => dispatch(TravelQuotationAction.PostTravelBabbagePlan(formData)),
  clearTravelBabbagePlanDispatch: () => dispatch(TravelQuotationAction.ClearPostTravelBabbagePlan()),
  getCountryMatrixDispatch: (params) => dispatch(travelPlanActions.getCountryMatrixRequest(params)),
  clearCountryMatrixDispatch: () => dispatch(travelPlanActions.getCountryMatrixClear()),
  getPlanMatrixDispatch: (params) => dispatch(travelPlanActions.getPlanMatrixRequest(params)),
  clearPlanMatrixDispatch: () => dispatch(travelPlanActions.getPlanMatrixClear())
})

export default connect(mapStateToProps, mapDispatchToProps)(StepCoverpriceDetails)

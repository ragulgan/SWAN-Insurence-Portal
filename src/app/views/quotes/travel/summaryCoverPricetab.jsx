import React, { useEffect, useState, useRef } from 'react'
import { Grid } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import { TravelQuotationAction } from '../../../../store/actions/index'
import { getLocalStorage } from '../../../../helpers/helper'
import { TRAVEL_FORM } from '../../../../helpers/constants'
import { connect } from 'react-redux'
import { ShowField } from '../../../uiComponents'
import CustomBackdrop from '../../../../app/backdrop/CustomBackdrop'

const SummaryCoverPriceDetails = (props) => {
  const {
    next,
    getTRQuoteDetailsDispatch,
    clearTRQuoteDetailsDispatch,
    getTRQuoteDetails,
    getTRQuoteDetailsLoading,
    getTRQuoteDetailsStatus
  } = props
  const {
    control,
    handleSubmit,
    formState
  } = useForm({
    defaultValues: {
      choose_destination: ''
    }
  })
  const [state, setState] = useState({
    personalData: {},
    travelPlan: {},
    coverPlanData: {}
  })
  const didMount = useRef(false)
  const travelQuoteNo = getLocalStorage(TRAVEL_FORM.QUOTE_NUMBER)
  const coverPlanDetails = state?.coverPlanData
  const PlanName = getLocalStorage(TRAVEL_FORM.TRAVEL_PLAN)
  const PlanAmount = getLocalStorage(TRAVEL_FORM.TRAVEL_AMOUNT)

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
      }
    }
  }, [getTRQuoteDetailsStatus])

  const onSubmit = (data) => {
    console.log('data -', data)
    next()
  }

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true
    }
  }, [])

  return (
    <>
      <ShowField
        show={getTRQuoteDetailsLoading}
        yes={() => <CustomBackdrop isLoading={getTRQuoteDetailsLoading} />}
        no={() => null}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid
          container
          direction='row'
          justifyContent='center'
          alignItems='flex-start'
          spacing={2}
        >
          <Grid item xs={12} sm={12} md={12} className='summary-box quote-summary'>
            <Grid container spacing={0}>
              <Grid item xs={12} sm={12} md={12} className='quote-summary-header blue-header'>
                <h4>Full Quotation</h4>
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <ul className='summary-ul bb'>
                  <li className='price-bold-header'>
                    {PlanName || '--'} Coverage Plan
                    <span>Rs {PlanAmount || '--'}</span>
                  </li>
                  <li>
                    Medical emergency and related expenses
                    <span>
                     {coverPlanDetails && coverPlanDetails?.TRVPLANDESC &&
                        coverPlanDetails?.TRVPLANDESC?.MEDEXPENCE !== null
                      ? coverPlanDetails?.TRVPLANDESC?.MEDEXPENCE
                      : '0'}
                    </span>
                  </li>
                  <li>
                    Burial, Cremation or Return of Mortal Remains{' '}
                    <span>
                     {coverPlanDetails && coverPlanDetails?.TRVPLANDESC &&
                        coverPlanDetails?.TRVPLANDESC?.MORTALREMAINS !== null
                      ? coverPlanDetails?.TRVPLANDESC?.MORTALREMAINS
                      : '0'}
                    </span>
                  </li>
                  <li>
                    Legal Assistance
                    <span>
                     {coverPlanDetails && coverPlanDetails?.TRVPLANDESC &&
                        coverPlanDetails?.TRVPLANDESC?.LEGALASST !== null
                      ? coverPlanDetails?.TRVPLANDESC?.LEGALASST
                      : '0'}
                    </span>
                  </li>
                  <li>
                    Personal Liability Insurance
                    <span>
                       {coverPlanDetails && coverPlanDetails?.TRVPLANDESC &&
                        coverPlanDetails?.TRVPLANDESC?.PERSONALLIABILITY !== null
                      ? coverPlanDetails?.TRVPLANDESC?.PERSONALLIABILITY
                      : '0'}
                    </span>
                  </li>
                  <li>
                    Cancellation, Curtailment Alteration & Expenses{' '}
                    <span>
                     {coverPlanDetails && coverPlanDetails?.TRVPLANDESC &&
                        coverPlanDetails?.TRVPLANDESC?.ALTERATION !== null
                      ? coverPlanDetails?.TRVPLANDESC?.ALTERATION
                      : '0'}
                    </span>
                  </li>
                  <li>
                    Personal Accident, Death & Permanent Disability{' '}
                    <span>
                     {coverPlanDetails && coverPlanDetails?.TRVPLANDESC &&
                        coverPlanDetails?.TRVPLANDESC?.PERSONALACCIDENT !== null
                      ? coverPlanDetails?.TRVPLANDESC?.PERSONALACCIDENT
                      : '0'}
                    </span>
                  </li>
                </ul>
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <ul className='summary-ul bb'>
                  <li className='price-bold-header'>Extra</li>
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
                  <li>
                    Baggage Insurance
                    <span>
                      {coverPlanDetails && coverPlanDetails?.BAGPLANDESC &&
                        coverPlanDetails?.BAGPLANDESC?.BAGGAGEINS
                        ? coverPlanDetails?.BAGPLANDESC?.BAGGAGEINS
                        : '0'}
                    </span>
                  </li>
                  <li>
                    Money & Document Insurance
                    <span>
                      {coverPlanDetails && coverPlanDetails?.BAGPLANDESC &&
                        coverPlanDetails?.BAGPLANDESC?.MONEYDOCINS
                        ? coverPlanDetails?.BAGPLANDESC?.MONEYDOCINS
                        : '0'}
                    </span>
                  </li>
                </ul>
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <ul className='summary-ul bb'>
                  <li className='price-bold-header'>Additional Fees</li>
                  <li>
                    FSC Fee:
                    <span>
                      Rs {coverPlanDetails && coverPlanDetails?.FSCFEE
                      ? coverPlanDetails?.FSCFEE
                      : '0'}
                    </span>
                  </li>
                  <li>
                    Fees and Charges:
                    <span>
                      Rs {coverPlanDetails && coverPlanDetails.ADMINFEE
                      ? coverPlanDetails.ADMINFEE
                      : '0'}
                    </span>
                  </li>
                </ul>
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <ul className='summary-ul'>
                  <li className='price-bold-header'>
                    Total <span>Rs 2 120</span>
                  </li>
                </ul>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </>
  )
}

const mapStateToProps = (state) => {
  const {
    TravelQuotation
  } = state
  return {
    getTRQuoteDetailsStatus: TravelQuotation?.getTRQuoteDetailsStatus,
    getTRQuoteDetails: TravelQuotation?.getTRQuoteDetails,
    getTRQuoteDetailsLoading: TravelQuotation?.getTRQuoteDetailsLoading
  }
}

const mapDispatchToProps = (dispatch) => ({
  getTRQuoteDetailsDispatch: (params) => dispatch(TravelQuotationAction.GetTRQuoteDetailsAction(params)),
  clearTRQuoteDetailsDispatch: () => dispatch(TravelQuotationAction.ClearTRQuoteDetailsAction())
})

export default connect(mapStateToProps, mapDispatchToProps)(SummaryCoverPriceDetails)

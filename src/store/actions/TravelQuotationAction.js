import * as Constant from '../../store/constants/TravelQuotationConstants'

export const TravelQuotationAction = {
  PostPersonalInfoTravel: formData => ({
    type: Constant.POST_TPERSONAL_INFO_INIT,
    formData
  }),
  ClearPostPersonalTravelInfo: () => ({
    type: Constant.POST_TPERSONAL_INFO_CLEAR
  }),
  PostTravelInfo: formData => ({
    type: Constant.POST_TRAVEL_INFO_INIT,
    formData
  }),
  ClearPostTravelInfo: () => ({
    type: Constant.POST_TRAVEL_INFO_CLEAR
  }),
  GetTRQuoteDetailsAction: id => ({
    type: Constant.GET_TR_QUOTE_DETAILS_INIT,
    id
  }),
  ClearTRQuoteDetailsAction: () => ({
    type: Constant.GET_TR_QUOTE_DETAILS_CLEAR
  }),
  PostTravelPlan: formData => ({
    type: Constant.POST_TRAVEL_PLAN_INIT,
    formData
  }),
  ClearPostTravelPlan: () => ({
    type: Constant.POST_TRAVEL_PLAN_CLEAR
  }),
  PostTravelBabbagePlan: formData => ({
    type: Constant.POST_TRAVEL_BABBAGE_PLAN_INIT,
    formData
  }),
  ClearPostTravelBabbagePlan: () => ({
    type: Constant.POST_TRAVEL_BABBAGE_PLAN_CLEAR
  })
}

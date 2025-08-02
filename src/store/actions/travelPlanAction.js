import * as Constant from '../../store/constants/travelPlanConstant'

export const travelPlanActions = {
  gettravelPlanRequest: (id) => ({
    type: Constant.GET_TRAVEL_PLAN_DATA,
    id
  }),
  clearTravelPlanRequest: () => ({
    type: Constant.GET_TRAVEL_PLAN_CLEAR
  }),
  getNonCoverPlanRequest: () => ({
    type: Constant.GET_NON_COVER_PLAN_DATA
  }),
  clearNonCoverPlanRequest: () => ({
    type: Constant.GET_NON_COVER_PLAN_CLEAR
  }),
  getBabbagePlanRequest: () => ({
    type: Constant.GET_BABBAGE_PLAN_DATA
  }),
  clearBabbagePlanRequest: () => ({
    type: Constant.GET_BABBAGE_PLAN_CLEAR
  }),
  getCountryMatrixRequest: (params) => ({
    type: Constant.GET_COUNTRY_MATRIX_DATA,
    params
  }),
  getCountryMatrixClear: () => ({
    type: Constant.GET_COUNTRY_MATRIX_CLEAR
  }),
  getPlanMatrixRequest: (params) => ({
    type: Constant.GET_PLAN_MATRIX_DATA,
    params
  }),
  getPlanMatrixClear: () => ({
    type: Constant.GET_PLAN_MATRIX_CLEAR
  }),
  postTravelSendQuoteRequest: formData => ({
    type: Constant.POST_TRAVEL_SEND_QUOTE_DATA,
    formData
  }),
  ClearTravelSendQuoteRequest: () => ({
    type: Constant.POST_TRAVEL_SEND_QUOTE_CLEAR
  }),
  getTravelCancelQuoteRequest: (id) => ({
    type: Constant.GET_TRAVEL_CANCEL_QUOTE_DATA,
    id
  }),
  ClearTravelCancelQuoteRequest: () => ({
    type: Constant.GET_TRAVEL_CANCEL_QUOTE_CLEAR
  }),
  postTravelDownloadQuoteRequest: (payload) => ({
    type: Constant.POST_TRAVEL_DOWNLOAD_QUOTE_DATA,
    payload
  }),
  ClearTravelDownloadQuoteRequest: () => ({
    type: Constant.POST_TRAVEL_DOWNLOAD_QUOTE_CLEAR
  })
}

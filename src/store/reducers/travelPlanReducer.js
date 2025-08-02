import * as Constant from '../../store/constants/travelPlanConstant'

const initState = {
  getTravelPlanLoading: false,
  travelPlanData: null,
  travelPlanStatus: '',
  travelPlanMessage: '',
  getNonCoverPlanLoading: false,
  nonCoverPlanData: null,
  nonCoverPlanStatus: '',
  nonCoverPlanMessage: '',
  getBabbagePlanLoading: false,
  babbagePlanData: null,
  babbagePlanStatus: '',
  babbagePlanMessage: '',
  getCountryMatrixLoading: false,
  countryMatrixData: null,
  countryMatrixStatus: '',
  countryMatrixMessage: '',
  getPlanMatrixLoading: false,
  planMatrixData: null,
  planMatrixStatus: '',
  planMatrixMessage: '',
  postTravelSendQuoteLoading: false,
  postTravelSendQuoteData: null,
  postTravelSendQuoteStatus: '',
  postTravelSendQuotemessage: '',
  getTravelCancelQuoteLoading: false,
  getTravelCancelQuoteData: null,
  getTravelCancelQuoteStatus: '',
  getTravelCancelQuotemessage: '',
  postTravelDownloadQuoteLoading: false,
  postTravelDownloadQuoteData: null,
  postTravelDownloadQuoteStatus: '',
  postTravelDownloadQuotemessage: ''
}

const TravelPlanReducer = (state = initState, action) => {
  switch (action.type) {
    case Constant.GET_TRAVEL_PLAN_DATA:
      return {
        ...state,
        getTravelPlanLoading: true
      }
    case Constant.GET_TRAVEL_PLAN_SUCCESS:
      return {
        ...state,
        getTravelPlanLoading: false,
        travelPlanData: action?.response.data,
        travelPlanStatus: action.status,
        travelPlanMessage: action.message
      }
    case Constant.GET_TRAVEL_PLAN_FAILURE:
      return {
        ...state,
        getTravelPlanLoading: false,
        travelPlanStatus: action.status,
        travelPlanMessage: action.message
      }
    case Constant.GET_TRAVEL_PLAN_CLEAR:
      return {
        ...state,
        travelPlanData: '',
        travelPlanStatus: '',
        travelPlanMessage: ''
      }
    case Constant.GET_NON_COVER_PLAN_DATA:
      return {
        ...state,
        getNonCoverPlanLoading: true
      }
    case Constant.GET_NON_COVER_PLAN_SUCCESS:
      return {
        ...state,
        getNonCoverPlanLoading: false,
        nonCoverPlanData: action?.response.data,
        nonCoverPlanStatus: action.status,
        nonCoverPlanMessage: action.message
      }
    case Constant.GET_NON_COVER_PLAN_FAILURE:
      return {
        ...state,
        getNonCoverPlanLoading: false,
        nonCoverPlanStatus: action.status,
        nonCoverPlanMessage: action.message
      }
    case Constant.GET_NON_COVER_PLAN_CLEAR:
      return {
        ...state,
        nonCoverPlanData: '',
        nonCoverPlanStatus: '',
        nonCoverPlanMessage: ''
      }
    case Constant.GET_BABBAGE_PLAN_DATA:
      return {
        ...state,
        getBabbagePlanLoading: true
      }
    case Constant.GET_BABBAGE_PLAN_SUCCESS:
      return {
        ...state,
        getBabbagePlanLoading: false,
        babbagePlanData: action?.response.data,
        babbagePlanStatus: action.status,
        babbagePlanMessage: action.message
      }
    case Constant.GET_BABBAGE_PLAN_FAILURE:
      return {
        ...state,
        getBabbagePlanLoading: false,
        babbagePlanStatus: action.status,
        babbagePlanMessage: action.message
      }
    case Constant.GET_BABBAGE_PLAN_CLEAR:
      return {
        ...state,
        babbagePlanData: '',
        babbagePlanStatus: '',
        babbagePlanMessage: ''
      }
    case Constant.GET_COUNTRY_MATRIX_DATA:
      return {
        ...state,
        getCountryMatrixLoading: true
      }
    case Constant.GET_COUNTRY_MATRIX_SUCCESS:
      return {
        ...state,
        getCountryMatrixLoading: false,
        countryMatrixData: action.response.data,
        countryMatrixStatus: action.response.status,
        countryMatrixMessage: action.response.message
      }
    case Constant.GET_COUNTRY_MATRIX_FAILURE:
      return {
        ...state,
        getCountryMatrixLoading: false,
        countryMatrixStatus: action.response.status,
        countryMatrixMessage: action.response.message
      }
    case Constant.GET_COUNTRY_MATRIX_CLEAR:
      return {
        ...state,
        countryMatrixData: '',
        countryMatrixStatus: '',
        countryMatrixMessage: ''
      }
    case Constant.GET_PLAN_MATRIX_DATA:
      return {
        ...state,
        getPlanMatrixLoading: true
      }
    case Constant.GET_PLAN_MATRIX_SUCCESS:
      return {
        ...state,
        getPlanMatrixLoading: false,
        planMatrixData: action.response.data,
        planMatrixStatus: action.response.status,
        planMatrixMessage: action.response.message
      }
    case Constant.GET_PLAN_MATRIX_FAILURE:
      return {
        ...state,
        getPlanMatrixLoading: false,
        planMatrixStatus: action.response.status,
        planMatrixMessage: action.response.message
      }
    case Constant.GET_PLAN_MATRIX_CLEAR:
      return {
        ...state,
        planMatrixData: '',
        planMatrixStatus: '',
        planMatrixMessage: ''
      }
    case Constant.POST_TRAVEL_SEND_QUOTE_DATA:
      return {
        ...state,
        postTravelSendQuoteLoading: true
      }
    case Constant.POST_TRAVEL_SEND_QUOTE_SUCCESS:
      return {
        ...state,
        postTravelSendQuoteLoading: false,
        postTravelSendQuoteData: action?.response?.data,
        postTravelSendQuoteStatus: action?.response?.status,
        postTravelSendQuotemessage: action?.response?.message
      }
    case Constant.POST_TRAVEL_SEND_QUOTE_FAILURE:
      return {
        ...state,
        postTravelSendQuoteLoading: false,
        postTravelSendQuoteData: action?.response?.data,
        postTravelSendQuoteStatus: action?.response?.status,
        postTravelSendQuotemessage: action?.response?.message
      }
    case Constant.POST_TRAVEL_SEND_QUOTE_CLEAR:
      return {
        ...state,
        postTravelSendQuoteData: null,
        postTravelSendQuoteStatus: '',
        postTravelSendQuotemessage: ''
      }
    case Constant.GET_TRAVEL_CANCEL_QUOTE_DATA:
      return {
        ...state,
        getTravelCancelQuoteLoading: true
      }
    case Constant.GET_TRAVEL_CANCEL_QUOTE_SUCCESS:
      return {
        ...state,
        getTravelCancelQuoteLoading: false,
        getTravelCancelQuoteData: action?.response.data,
        getTravelCancelQuoteStatus: action?.response.status,
        getTravelCancelQuotemessage: action?.response.message
      }
    case Constant.GET_TRAVEL_CANCEL_QUOTE_FAILURE:
      return {
        ...state,
        getTravelCancelQuoteLoading: false,
        getTravelCancelQuoteData: action?.response.data,
        getTravelCancelQuoteStatus: action?.response.status,
        getTravelCancelQuotemessage: action?.response.message
      }
    case Constant.GET_TRAVEL_CANCEL_QUOTE_CLEAR:
      return {
        ...state,
        getTravelCancelQuoteData: null,
        getTravelCancelQuoteStatus: '',
        getTravelCancelQuotemessage: ''
      }
    case Constant.POST_TRAVEL_DOWNLOAD_QUOTE_DATA:
      return {
        ...state,
        postTravelDownloadQuoteLoading: true
      }
    case Constant.POST_TRAVEL_DOWNLOAD_QUOTE_SUCCESS:
      return {
        ...state,
        postTravelDownloadQuoteLoading: false,
        postTravelDownloadQuoteData: action?.response?.data,
        postTravelDownloadQuoteStatus: action?.response?.status,
        postTravelDownloadQuotemessage: action?.response?.message
      }
    case Constant.POST_TRAVEL_DOWNLOAD_QUOTE_FAILURE:
      return {
        ...state,
        postTravelDownloadQuoteLoading: false,
        postTravelDownloadQuoteData: action?.response?.data,
        postTravelDownloadQuoteStatus: action?.response?.status,
        postTravelDownloadQuotemessage: action?.response?.message
      }
    case Constant.POST_TRAVEL_DOWNLOAD_QUOTE_CLEAR:
      return {
        ...state,
        postTravelDownloadQuoteData: null,
        postTravelDownloadQuoteStatus: '',
        postTravelDownloadQuotemessage: ''
      }
    default:
      return state
  }
}

export default TravelPlanReducer

import * as constant from '../../store/constants/TravelQuotationConstants'

const initState = {
  postPersonalTRInfoLoading: false,
  postPersonalTRInfoData: null,
  postPersonalTRInfoStatus: '',
  postPersonalTRInfomessage: '',
  postTravelInfoLoading: false,
  postTravelInfoData: null,
  postTravelInfoStatus: '',
  postTravelInfomessage: '',
  getTRQuoteDetailsLoading: false,
  getTRQuoteDetailsStatus: '',
  getTRQuoteDetailsmessage: '',
  getTRQuoteDetails: null,
  postTravelPlanLoading: false,
  postTravelPlanData: null,
  postTravelPlanStatus: '',
  postTravelPlanmessage: '',
  postTravelBabbagePlanLoading: false,
  postTravelBabbagePlanData: null,
  postTravelBabbagePlanStatus: '',
  postTravelBabbagePlanmessage: ''
}

const TravelQuotationReducer = (state = initState, response) => {
  const res = response && response.response && response.response
  switch (response.type) {
    case constant.POST_TPERSONAL_INFO_INIT:
      return {
        ...state,
        postPersonalTRInfoLoading: true
      }
    case constant.POST_TPERSONAL_INFO_SUCCESS:
      return {
        ...state,
        postPersonalTRInfoLoading: false,
        postPersonalTRInfoData: res.data,
        postPersonalTRInfoStatus: res.status,
        postPersonalTRInfomessage: res.message
      }
    case constant.POST_TPERSONAL_INFO_FAILED:
      return {
        ...state,
        postPersonalTRInfoLoading: false,
        postPersonalTRInfoData: res?.data,
        postPersonalTRInfoStatus: res?.status,
        postPersonalTRInfomessage: res?.message
      }
    case constant.POST_TPERSONAL_INFO_CLEAR:
      return {
        ...state,
        postPersonalTRInfoData: null,
        postPersonalTRInfoStatus: '',
        postPersonalTRInfomessage: ''
      }
    case constant.POST_TRAVEL_INFO_INIT:
      return {
        ...state,
        postTravelInfoLoading: true
      }
    case constant.POST_TRAVEL_INFO_SUCCESS:
      return {
        ...state,
        postTravelInfoLoading: false,
        postTravelInfoData: res.data,
        postTravelInfoStatus: res.status,
        postTravelInfomessage: res.message
      }
    case constant.POST_TRAVEL_INFO_FAILED:
      return {
        ...state,
        postTravelInfoLoading: false,
        postTravelInfoData: res?.data,
        postTravelInfoStatus: res?.status,
        postTravelInfomessage: res?.message
      }
    case constant.POST_TRAVEL_INFO_CLEAR:
      return {
        ...state,
        postTravelInfoData: null,
        postTravelInfoStatus: '',
        postTravelInfomessage: ''
      }
    case constant.GET_TR_QUOTE_DETAILS_INIT:
      return {
        ...state,
        getTRQuoteDetailsLoading: true
      }
    case constant.GET_TR_QUOTE_DETAILS_SUCCESS:
      return {
        ...state,
        getTRQuoteDetailsLoading: false,
        getTRQuoteDetails: res?.data,
        getTRQuoteDetailsStatus: res?.status,
        getTRQuoteDetailsmessage: res?.message
      }
    case constant.GET_TR_QUOTE_DETAILS_FAILED:
      return {
        ...state,
        getTRQuoteDetailsLoading: false,
        getTRQuoteDetails: res?.error_data,
        getTRQuoteDetailsStatus: res?.status,
        getTRQuoteDetailsmessage: res?.message
      }
    case constant.GET_TR_QUOTE_DETAILS_CLEAR:
      return {
        ...state,
        getTRQuoteDetails: null,
        getTRQuoteDetailsStatus: '',
        getTRQuoteDetailsmessage: ''
      }
    case constant.POST_TRAVEL_PLAN_INIT:
      return {
        ...state,
        postTravelPlanLoading: true
      }
    case constant.POST_TRAVEL_PLAN_SUCCESS:
      return {
        ...state,
        postTravelPlanLoading: false,
        postTravelPlanData: res.data,
        postTravelPlanStatus: res.status,
        postTravelPlanmessage: res.message
      }
    case constant.POST_TRAVEL_PLAN_FAILED:
      return {
        ...state,
        postTravelPlanLoading: false,
        postTravelPlanData: res?.data,
        postTravelPlanStatus: res?.status,
        postTravelPlanmessage: res?.message
      }
    case constant.POST_TRAVEL_PLAN_CLEAR:
      return {
        ...state,
        postTravelPlanData: null,
        postTravelPlanStatus: '',
        postTravelPlanmessage: ''
      }
    case constant.POST_TRAVEL_BABBAGE_PLAN_INIT:
      return {
        ...state,
        postTravelBabbagePlanLoading: true
      }
    case constant.POST_TRAVEL_BABBAGE_PLAN_SUCCESS:
      return {
        ...state,
        postTravelBabbagePlanLoading: false,
        postTravelBabbagePlanData: res.data,
        postTravelBabbagePlanStatus: res.status,
        postTravelBabbagePlanmessage: res.message
      }
    case constant.POST_TRAVEL_BABBAGE_PLAN_FAILED:
      return {
        ...state,
        postTravelBabbagePlanLoading: false,
        postTravelBabbagePlanData: res?.data,
        postTravelBabbagePlanStatus: res?.status,
        postTravelBabbagePlanmessage: res?.message
      }
    case constant.POST_TRAVEL_BABBAGE_PLAN_CLEAR:
      return {
        ...state,
        postTravelBabbagePlanData: null,
        postTravelBabbagePlanStatus: '',
        postTravelBabbagePlanmessage: ''
      }
    default:
      return state
  }
}

export default TravelQuotationReducer

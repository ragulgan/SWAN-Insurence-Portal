import * as Constant from '../../store/constants/motorPlanConstant'

const initState = {
  getMotorPlanLoading: false,
  motorPlanData: null,
  motorPlanStatus: '',
  motorPlanMessage: '',
  getProvisionalQuoteLoading: false,
  provisionalQuoteData: null,
  provisionalQuoteStatus: '',
  provisionalQuoteMessage: '',
  getDiscountQuoteLoading: false,
  discountQuoteData: '',
  discountQuoteStatus: '',
  discountQuoteMessage: '',
  getDownloadQuoteLoading: false,
  downloadQuoteData: null,
  downloadQuoteStatus: '',
  downloadQuoteMessage: '',
  getPrintQuoteLoading: false,
  printQuoteData: null,
  printQuoteStatus: '',
  printQuoteMessage: '',
  postSendQuoteLoading: false,
  postSendQuoteData: null,
  postSendQuoteStatus: '',
  postSendQuotemessage: '',
  postCancelQuoteLoading: false,
  postCancelQuoteData: null,
  postCancelQuoteStatus: '',
  postCancelQuotemessage: '',
  postApprovalStatusLoading: false,
  postApprovalStatusData: null,
  postApprovalStatusStatus: '',
  postApprovalStatusmessage: '',
  getReasonCancelLoading: false,
  reasonCancelData: null,
  reasonCancelStatus: '',
  reasonCancelMessage: ''
}

const MotorPlanReducer = (state = initState, action) => {
  switch (action.type) {
    case Constant.GET_MOTOR_PLAN_DATA:
      return {
        ...state,
        getMotorPlanLoading: true
      }
    case Constant.GET_MOTOR_PLAN_SUCCESS:
      return {
        ...state,
        getMotorPlanLoading: false,
        motorPlanData: action?.response.data,
        motorPlanStatus: action.status,
        motorPlanMessage: action.message
      }
    case Constant.GET_MOTOR_PLAN_FAILURE:
      return {
        ...state,
        getMotorPlanLoading: false,
        motorPlanStatus: action.status,
        motorPlanMessage: action.message
      }
    case Constant.GET_MOTOR_PLAN_CLEAR:
      return {
        ...state,
        motorPlanData: '',
        motorPlanStatus: '',
        motorPlanMessage: ''
      }
    case Constant.GET_PROVISIONAL_QUOTE_DATA:
      return {
        ...state,
        getProvisionalQuoteLoading: true
      }
    case Constant.GET_PROVISIONAL_QUOTE_SUCCESS:
      return {
        ...state,
        getProvisionalQuoteLoading: false,
        provisionalQuoteData: action?.response.data,
        provisionalQuoteStatus: action.status,
        provisionalQuoteMessage: action.message
      }
    case Constant.GET_PROVISIONAL_QUOTE_FAILURE:
      return {
        ...state,
        getProvisionalQuoteLoading: false,
        provisionalQuoteStatus: action.status,
        provisionalQuoteMessage: action.message
      }
    case Constant.GET_PROVISIONAL_QUOTE_CLEAR:
      return {
        ...state,
        provisionalQuoteData: '',
        provisionalQuoteStatus: '',
        provisionalQuoteMessage: ''
      }
    case Constant.GET_DISCOUNT_QUOTE_DATA:
      return {
        ...state,
        getDiscountQuoteLoading: true
      }
    case Constant.GET_DISCOUNT_QUOTE_SUCCESS:
      return {
        ...state,
        getDiscountQuoteLoading: false,
        discountQuoteData: action?.response.data,
        discountQuoteStatus: action.status,
        discountQuoteMessage: action.message
      }
    case Constant.GET_DISCOUNT_QUOTE_FAILURE:
      return {
        ...state,
        getDiscountQuoteLoading: false,
        discountQuoteStatus: action.status,
        discountQuoteMessage: action.message
      }
    case Constant.GET_DISCOUNT_QUOTE_CLEAR:
      return {
        ...state,
        discountQuoteData: '',
        discountQuoteStatus: '',
        discountQuoteMessage: ''
      }
    case Constant.GET_DOWNLOAD_QUOTE_DATA:
      return {
        ...state,
        getDownloadQuoteLoading: true
      }
    case Constant.GET_DOWNLOAD_QUOTE_SUCCESS:
      return {
        ...state,
        getDownloadQuoteLoading: false,
        downloadQuoteData: action?.response.data,
        downloadQuoteStatus: action?.response.status,
        downloadQuoteMessage: action?.response.message
      }
    case Constant.GET_DOWNLOAD_QUOTE_FAILURE:
      return {
        ...state,
        getDownloadQuoteLoading: false,
        downloadQuoteStatus: action?.response.status,
        downloadQuoteMessage: action?.response.message
      }
    case Constant.GET_DOWNLOAD_QUOTE_CLEAR:
      return {
        ...state,
        downloadQuoteData: '',
        downloadQuoteStatus: '',
        downloadQuoteMessage: ''
      }
    case Constant.GET_PRINT_QUOTE_DATA:
      return {
        ...state,
        getPrintQuoteLoading: true
      }
    case Constant.GET_PRINT_QUOTE_SUCCESS:
      return {
        ...state,
        getPrintQuoteLoading: false,
        printQuoteData: action?.response.data,
        printQuoteStatus: action?.response.status,
        printQuoteMessage: action?.response.message
      }
    case Constant.GET_PRINT_QUOTE_FAILURE:
      return {
        ...state,
        getPrintQuoteLoading: false,
        printQuoteStatus: action?.response.status,
        printQuoteMessage: action?.response.message
      }
    case Constant.GET_PRINT_QUOTE_CLEAR:
      return {
        ...state,
        printQuoteData: '',
        printQuoteStatus: '',
        printQuoteMessage: ''
      }
    case Constant.POST_SEND_QUOTE_DATA:
      return {
        ...state,
        postSendQuoteLoading: true
      }
    case Constant.POST_SEND_QUOTE_SUCCESS:
      return {
        ...state,
        postSendQuoteLoading: false,
        postSendQuoteData: action?.response.data,
        postSendQuoteStatus: action?.response.status,
        postSendQuotemessage: action?.response.message
      }
    case Constant.POST_SEND_QUOTE_FAILURE:
      return {
        ...state,
        postSendQuoteLoading: false,
        postSendQuoteData: action?.response.data,
        postSendQuoteStatus: action?.response.status,
        postSendQuotemessage: action?.response.message
      }
    case Constant.POST_SEND_QUOTE_CLEAR:
      return {
        ...state,
        postSendQuoteData: null,
        postSendQuoteStatus: '',
        postSendQuotemessage: ''
      }
    case Constant.POST_CANCEL_QUOTE_DATA:
      return {
        ...state,
        postCancelQuoteLoading: true
      }
    case Constant.POST_CANCEL_QUOTE_SUCCESS:
      return {
        ...state,
        postCancelQuoteLoading: false,
        postCancelQuoteData: action?.response.data,
        postCancelQuoteStatus: action?.response.status,
        postCancelQuotemessage: action?.response.message
      }
    case Constant.POST_CANCEL_QUOTE_FAILURE:
      return {
        ...state,
        postCancelQuoteLoading: false,
        postCancelQuoteData: action?.response.data,
        postCancelQuoteStatus: action?.response.status,
        postCancelQuotemessage: action?.response.message
      }
    case Constant.POST_CANCEL_QUOTE_CLEAR:
      return {
        ...state,
        postCancelQuoteData: null,
        postCancelQuoteStatus: '',
        postCancelQuotemessage: ''
      }
    case Constant.POST_APPROVAL_STATUS_INIT:
      return {
        ...state,
        postApprovalStatusLoading: true
      }
    case Constant.POST_APPROVAL_STATUS_SUCCESS:
      return {
        ...state,
        postApprovalStatusLoading: false,
        postApprovalStatusData: action?.response.data,
        postApprovalStatusStatus: action?.response.status,
        postApprovalStatusmessage: action?.response.message
      }
    case Constant.POST_APPROVAL_STATUS_FAILURE:
      return {
        ...state,
        postApprovalStatusLoading: false,
        postApprovalStatusData: action?.response.data,
        postApprovalStatusStatus: action?.response.status,
        postApprovalStatusmessage: action?.response.message
      }
    case Constant.POST_APPROVAL_STATUS_CLEAR:
      return {
        ...state,
        postApprovalStatusData: null,
        postApprovalStatusStatus: '',
        postApprovalStatusmessage: ''
      }
    case Constant.GET_REASON_CANCEL_DATA:
      return {
        ...state,
        getReasonCancelLoading: true
      }
    case Constant.GET_REASON_CANCEL_SUCCESS:
      return {
        ...state,
        getReasonCancelLoading: false,
        reasonCancelData: action?.response.data,
        reasonCancelStatus: action.status,
        reasonCancelMessage: action.message
      }
    case Constant.GET_REASON_CANCEL_FAILURE:
      return {
        ...state,
        getReasonCancelLoading: false,
        reasonCancelStatus: action.status,
        reasonCancelMessage: action.message
      }
    case Constant.GET_REASON_CANCEL_CLEAR:
      return {
        ...state,
        reasonCancelData: '',
        reasonCancelStatus: '',
        reasonCancelMessage: ''
      }
    default:
      return state
  }
}

export default MotorPlanReducer

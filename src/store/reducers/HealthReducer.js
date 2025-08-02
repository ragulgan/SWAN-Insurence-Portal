import * as Constant from 'store/constants/HealthConstants'

const initState = {
  healthLoading: false,
  allDownloadLoading: false,
  oneDownloadLoading: false,
  sendQuoteLoading: false,
  printQuoteLoading: false,
  cancelQuoteLoading: false,
  companyLoading: false,
  quotationData: null,
  companyData: null,
  healthPlans: null,
  successData: null,
  updateSuccessData: null,
  allDownloadSuccess: null,
  oneDownloadSuccess: null,
  sendQuoteSuccess: null,
  printQuoteSuccess: null,
  cancelQuoteSuccess: null,
  errorData: null
}

const HealthReducer = (state = initState, action) => {
  switch (action.type) {
    case Constant.GET_QUOTATION_INFO_INIT:
    case Constant.HEALTH_PLANS_INIT:
    case Constant.SAVE_HEALTH_QUOTE_INIT:
    case Constant.UPDATE_HEALTH_QUOTE_INIT:
      return {
        ...state,
        healthLoading: true
      }

    case Constant.GET_COMPANIES_INIT:
      return {
        ...state,
        companyLoading: true
      }

    case Constant.DOWNLOAD_QUOTE_INIT:
      return {
        ...state,
        allDownloadLoading: true
      }
    case Constant.DOWNLOAD_QUOTE_SINGLE_INIT:
      return {
        ...state,
        oneDownloadLoading: true
      }
    case Constant.SEND_QUOTE_INIT:
      return {
        ...state,
        sendQuoteLoading: true
      }
    case Constant.PRINT_QUOTE_INIT:
      return {
        ...state,
        printQuoteLoading: true
      }
    case Constant.CANCEL_QUOTE_INIT:
      return {
        ...state,
        cancelQuoteLoading: true
      }

    case Constant.GET_QUOTATION_INFO_INIT_SUCCESS:
      return {
        ...state,
        healthLoading: false,
        quotationData: action.response.data
      }
    case Constant.HEALTH_PLANS_SUCCESS:
      return {
        ...state,
        healthLoading: false,
        healthPlans: action.response.data
      }
    case Constant.GET_COMPANIES_SUCCESS:
      return {
        ...state,
        companyLoading: false,
        companyData: action.response.data
      }
    case Constant.SAVE_HEALTH_QUOTE_SUCCESS:
      return {
        ...state,
        healthLoading: false,
        successData: action.response.data
      }
    case Constant.UPDATE_HEALTH_QUOTE_SUCCESS:
      return {
        ...state,
        healthLoading: false,
        updateSuccessData: action.response.data
      }

    case Constant.DOWNLOAD_QUOTE_SUCCESS:
      return {
        ...state,
        allDownloadLoading: false,
        allDownloadSuccess: action.response.data
      }
    case Constant.DOWNLOAD_QUOTE_SINGLE_SUCCESS:
      return {
        ...state,
        oneDownloadLoading: false,
        oneDownloadSuccess: action.response.data
      }
    case Constant.SEND_QUOTE_SUCCESS:
      return {
        ...state,
        sendQuoteLoading: false,
        sendQuoteSuccess: action.response.data
      }
    case Constant.PRINT_QUOTE_SUCCESS:
      return {
        ...state,
        printQuoteLoading: false,
        printQuoteSuccess: action.response.data
      }
    case Constant.CANCEL_QUOTE_SUCCESS:
      return {
        ...state,
        cancelQuoteLoading: false,
        cancelQuoteSuccess: action.response.data
      }

    case Constant.GET_QUOTATION_INFO_INIT_FAILED:
    case Constant.HEALTH_PLANS_FAILED:
    case Constant.GET_COMPANIES_FAILED:
    case Constant.SAVE_HEALTH_QUOTE_FAILED:
    case Constant.UPDATE_HEALTH_QUOTE_FAILED:
    case Constant.DOWNLOAD_QUOTE_FAILED:
    case Constant.DOWNLOAD_QUOTE_SINGLE_FAILED:
    case Constant.SEND_QUOTE_FAILED:
    case Constant.PRINT_QUOTE_FAILED:
    case Constant.CANCEL_QUOTE_FAILED:
      return {
        ...state,
        healthLoading: false,
        companyLoading: false,
        sendQuoteLoading: false,
        errorData: action
      }

    default:
      return state
  }
}

export default HealthReducer

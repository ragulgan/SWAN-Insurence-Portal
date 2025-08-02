import * as constant from '../../store/constants/MotorQuotationConstants'
import { getSessionStorage } from '../../helpers/helper'
import { MOTOR_FORM } from '../../helpers/constants'

const initState = {
  getQuoteDetailsLoading: false,
  getQuoteDetailsStatus: '',
  getQuoteDetailsmessage: '',
  getQuoteDetails: null,
  postPersonalDetails: null,
  putExtensionDetails: null,
  putExtensionStatus: null,
  putQuotationDetails: null,
  saveForm: null,
  postPersonalInfoLoading: false,
  postPersonalInfoData: null,
  postPersonalInfoStatus: '',
  postPersonalInfomessage: '',
  postExtensionInfoData: null,
  postExtensionInfoStatus: '',
  postExtensionInfomessage: '',
  postVehicleData: null,
  getMotorMatrixLoading: false,
  motorMatrixData: null,
  motorMatrixStatus: '',
  motorMatrixMessage: '',
  currentQuoteNumber: null,
  getQuoteSummaryLoading: false,
  getQuoteSummaryStatus: '',
  getQuoteSummarymessage: '',
  getQuoteSummary: null,
  postVehicleStatus: null,
  getSmoothRateData: null,
  getSmoothRateLoading: false,
  postAMLLoading: false,
  postAMLData: null,
  postAMLStatus: '',
  postAMLmessage: '',
  getAmlValidLoading: false,
  AmlValidData: '',
  AmlValidStatus: '',
  AmlValidMessage: '',
  motorActiveStep: null,
  quotationId: getSessionStorage(MOTOR_FORM.QUOTE_NUMBER) ? getSessionStorage(MOTOR_FORM.QUOTE_NUMBER) : null,
  quotationStep: getSessionStorage(MOTOR_FORM.ACTIVE_STEP) ? getSessionStorage(MOTOR_FORM.ACTIVE_STEP) : 0,
}

const MotorQuotationReducer = (state = initState, response) => {
  const res = response && response.response && response.response
  switch (response.type) {
    case constant.GET_QUOTE_DETAILS_INIT:
      return {
        ...state,
        getQuoteDetailsLoading: true // here
      }
    case constant.GET_QUOTE_DETAILS_SUCCESS:
      return {
        ...state,
        getQuoteDetailsLoading: false,
        getQuoteDetails: res?.data,
        getQuoteDetailsStatus: res?.status,
        getQuoteDetailsmessage: res?.message
      }
    case constant.GET_QUOTE_DETAILS_FAILED:
      return {
        ...state,
        getQuoteDetailsLoading: false,
        getQuoteDetails: res?.error_data,
        getQuoteDetailsStatus: res?.status,
        getQuoteDetailsmessage: res?.message
      }
    case constant.GET_QUOTE_DETAILS_CLEAR:
      return {
        ...state,
        getQuoteDetails: '',
        getQuoteDetailsStatus: '',
        getQuoteDetailsmessage: ''
      }
    case constant.POST_MOTOR_PERSONAL_DETAILS_INIT:
      return {
        ...state,
        postPersonalInfoLoading: true
      }
    case constant.POST_MOTOR_PERSONAL_DETAILS_SUCCESS:
      return {
        ...state,
        postPersonalInfoLoading: false,
        postPersonalInfoData: res.data,
        postPersonalInfoStatus: res.status,
        postPersonalInfomessage: res.message
      }
    case constant.POST_MOTOR_PERSONAL_DETAILS_FAILED:
      return {
        ...state,
        postPersonalInfoLoading: false,
        postPersonalInfoData: res?.data,
        postPersonalInfoStatus: res?.status,
        postPersonalInfomessage: res?.message
      }
    case constant.POST_MOTOR_PERSONAL_DETAILS_CLEAR:
      return {
        ...state,
        postPersonalInfoData: null,
        postPersonalInfoStatus: '',
        postPersonalInfomessage: ''
      }
    case constant.SAVE_FORM_SUCCESS:
      return {
        ...state,
        getDetailsLoading: false,
        saveForm: response?.formData
      }
    case constant.PUT_VECHILE_DETAILS_INIT:
      return {
        ...state,
        postVehicleInfoLoading: true
      }
    case constant.PUT_VECHILE_DETAILS_SUCCESS:
      return {
        ...state,
        postVehicleInfoLoading: false,
        postVehicleData: res.data,
        postVehicleStatus: res.status,
        postVehiclemessage: res.message
      }
    case constant.PUT_VECHILE_DETAILS_FAILED:
      return {
        ...state,
        postVehicleInfoLoading: false,
        postVehicleData: response?.error_data
      }
    case constant.PUT_VECHILE_DETAILS_CLEAR:
      return {
        ...state,
        postVehicleData: '',
        postVehicleStatus: '',
        postVehiclemessage: ''
      }
    case constant.POST_EXTENSION_DETAILS_INIT:
      return {
        ...state,
        postExtensionInfoLoading: true
      }
    case constant.POST_EXTENSION_DETAILS_SUCCESS:
      return {
        ...state,
        postExtensionInfoLoading: false,
        postExtensionInfoData: res.data,
        postExtensionInfoStatus: res.status,
        postExtensionInfomessage: res.message
      }
    case constant.POST_EXTENSION_DETAILS_FAILED:
      return {
        ...state,
        postExtensionInfoLoading: false,
        postExtensionInfoData: res?.data,
        postExtensionInfoStatus: res?.status,
        postExtensionInfomessage: res?.message
      }
    case constant.POST_EXTENSION_DETAILS_CLEAR:
      return {
        ...state,
        postExtensionInfoData: null,
        postExtensionInfoStatus: '',
        postExtensionInfomessage: ''
      }
    case constant.PUT_QUOTATION_SUMMARY_DETAILS_INIT:
      return {
        ...state,
        getDetailsLoading: true
      }
    case constant.PUT_QUOTATION_SUMMARY_DETAILS_SUCCESS:
      return {
        ...state,
        getDetailsLoading: false,
        putQuotationDetails: response?.data
      }
    case constant.PUT_QUOTATION_SUMMARY_DETAILS_FAILED:
      return {
        ...state,
        getDetailsLoading: false,
        putQuotationDetails: response?.error_data
      }
    case constant.GET_MOTOR_MATRIX_DATA:
      return {
        ...state,
        getMotorMatrixLoading: true
      }
    case constant.GET_MOTOR_MATRIX_SUCCESS:
      return {
        ...state,
        getMotorMatrixLoading: false,
        motorMatrixData: res?.data,
        motorMatrixStatus: res?.status,
        motorMatrixMessage: res?.message
      }
    case constant.GET_MOTOR_MATRIX_FAILURE:
      return {
        ...state,
        getMotorMatrixLoading: false,
        motorMatrixStatus: res?.status,
        motorMatrixMessage: res?.message
      }
    case constant.GET_MOTOR_MATRIX_CLEAR:
      return {
        ...state,
        motorMatrixData: '',
        motorMatrixStatus: '',
        motorMatrixMessage: ''
      }
    case constant.GET_QUOTE_SUMMARY_INIT:
      return {
        ...state,
        getQuoteSummaryLoading: true
      }
    case constant.GET_QUOTE_SUMMARY_SUCCESS:
      return {
        ...state,
        getQuoteSummaryLoading: false,
        getQuoteSummary: res?.data,
        getQuoteSummaryStatus: res.status,
        getQuoteSummarymessage: res.message
      }
    case constant.GET_QUOTE_SUMMARY_FAILURE:
      return {
        ...state,
        getQuoteSummaryLoading: false,
        getQuoteSummary: res?.error_data,
        getQuoteSummaryStatus: res.status,
        getQuoteSummarymessage: res.message
      }
    case constant.GET_MOTOR_CURRENT_DATA:
      const motorData = response.data ? response.data : null
      return {
        ...state,
        currentQuoteNumber: motorData && motorData.currentQuoteNumber
      }

    case constant.GET_SMOOTH_RATE_INIT:
      return {
        ...state,
        getSmoothRateLoading: false
      }
    case constant.GET_SMOOTH_RATE_SUCCESS:
      return {
        ...state,
        getSmoothRateLoading: false,
        getSmoothRateData: res

      }
    case constant.GET_SMOOTH_RATE_FAILED:
      return {
        ...state,
        getSmoothRateLoading: false,
        getSmoothRateData: res?.error_data

      }
    case constant.GET_SMOOTH_RATE_CLEAR:
      return {
        ...state,
        getSmoothRateData: ''

      }
    case constant.POST_AML_INIT:
      return {
        ...state,
        postAMLLoading: true
      }
    case constant.POST_AML_SUCCESS:
      return {
        ...state,
        postAMLLoading: false,
        postAMLData: res.data,
        postAMLStatus: res.status,
        postAMLmessage: res.message
      }
    case constant.POST_AML_FAILED:
      return {
        ...state,
        postAMLLoading: false,
        postAMLData: res?.data,
        postAMLStatus: res?.status,
        postAMLmessage: res?.message
      }
    case constant.POST_AML_CLEAR:
      return {
        ...state,
        postAMLData: null,
        postAMLStatus: '',
        postAMLmessage: ''
      }
    case constant.GET_AML_VALID_DATA:
      return {
        ...state,
        getAmlValidLoading: true
      }
    case constant.GET_AML_VALID_SUCCESS:
      return {
        ...state,
        getAmlValidLoading: false,
        AmlValidData: res?.data,
        AmlValidStatus: res?.status,
        AmlValidMessage: res?.message
      }
    case constant.GET_AML_VALID_FAILURE:
      return {
        ...state,
        getAmlValidLoading: false,
        AmlValidStatus: res?.status,
        AmlValidMessage: res?.message
      }
    case constant.GET_AML_VALID_CLEAR:
      return {
        ...state,
        AmlValidData: '',
        AmlValidStatus: '',
        AmlValidMessage: ''
      }
    case constant.SET_MOTOR_ACTIVE_STEP:
      return {
        ...state,
        motorActiveStep: response && response.motorActiveStep
      }
    default:
      return state
  }
}

export default MotorQuotationReducer

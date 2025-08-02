import * as Constant from '../../store/constants/MotorQuotationConstants'
export const MotorQuotationAction = {
  GetQuoteDetailsAction: id => ({
    type: Constant.GET_QUOTE_DETAILS_INIT,
    id
  }),
  ClearMotQuoteDetailsAction: () => ({
    type: Constant.GET_QUOTE_DETAILS_CLEAR
  }),
  PostPersonalDetailsAction: formData => ({
    type: Constant.POST_MOTOR_PERSONAL_DETAILS_INIT,
    formData
  }),
  ClearPostPersonalInfoAction: () => ({
    type: Constant.POST_MOTOR_PERSONAL_DETAILS_CLEAR
  }),
  PutVechileDetailsAction: formData => ({
    type: Constant.PUT_VECHILE_DETAILS_INIT,
    formData
  }),
  ClearPutVechileDetailsAction: () => ({
    type: Constant.PUT_VECHILE_DETAILS_CLEAR
  }),
  PostExtensionDetailsAction: formData => ({
    type: Constant.POST_EXTENSION_DETAILS_INIT,
    formData
  }),
  ClearPostExtensionInfoAction: () => ({
    type: Constant.POST_EXTENSION_DETAILS_CLEAR
  }),
  PutQuotationDetailsAction: formData => ({
    type: Constant.PUT_QUOTATION_SUMMARY_DETAILS_INIT,
    formData
  }),
  SaveFormAction: formData => ({
    type: Constant.SAVE_FORM_SUCCESS,
    formData
  }),
  getMotorMatrixRequest: (params) => ({
    type: Constant.GET_MOTOR_MATRIX_DATA,
    params
  }),
  getMotorMatrixClear: () => ({
    type: Constant.GET_MOTOR_MATRIX_CLEAR
  }),
  GetQuoteSummaryAction: () => ({
    type: Constant.GET_QUOTE_SUMMARY_INIT
  }),
  SaveMotorFormAction: (data) => ({
    type: Constant.GET_MOTOR_CURRENT_DATA,
    data
  }),
  GetSmoothRateAction: id => ({
    type: Constant.GET_SMOOTH_RATE_INIT,
    id
  }),
  PostAMLAction: formData => ({
    type: Constant.POST_AML_INIT,
    formData
  }),
  ClearPostAMLAction: () => ({
    type: Constant.POST_AML_CLEAR
  }),
  getAMLRequest: id => ({
    type: Constant.GET_AML_VALID_DATA,
    id
  }),
  getAMLClear: () => ({
    type: Constant.GET_AML_VALID_CLEAR
  }),
  setActiveStep: num => ({
    type: Constant.SET_MOTOR_ACTIVE_STEP,
    motorActiveStep: num
  })
}

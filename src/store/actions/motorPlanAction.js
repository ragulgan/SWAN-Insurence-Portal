import * as Constant from '../../store/constants/motorPlanConstant'

export const MotorPlanActions = {
  getMotorPlanRequest: (polcd) => ({
    type: Constant.GET_MOTOR_PLAN_DATA,
    polcd
  }),
  getProvisionalQuoteRequest: () => ({
    type: Constant.GET_PROVISIONAL_QUOTE_DATA
  }),
  getDiscountQuoteRequest: () => ({
    type: Constant.GET_DISCOUNT_QUOTE_DATA
  }),
  getDownloadQuoteRequest: (id) => ({
    type: Constant.GET_DOWNLOAD_QUOTE_DATA,
    id
  }),
  ClearDownloadQuoteRequest: () => ({
    type: Constant.GET_DOWNLOAD_QUOTE_CLEAR
  }),
  getPrintQuoteRequest: (id) => ({
    type: Constant.GET_PRINT_QUOTE_DATA,
    id
  }),
  ClearPrintQuoteRequest: () => ({
    type: Constant.GET_PRINT_QUOTE_CLEAR
  }),
  postSendQuoteRequest: formData => ({
    type: Constant.POST_SEND_QUOTE_DATA,
    formData
  }),
  ClearSendQuoteRequest: () => ({
    type: Constant.POST_SEND_QUOTE_CLEAR
  }),
  postCancelQuoteRequest: formData => ({
    type: Constant.POST_CANCEL_QUOTE_DATA,
    formData
  }),
  ClearCancelQuoteRequest: () => ({
    type: Constant.POST_CANCEL_QUOTE_CLEAR
  }),
  PostApprovalStatusAction: formData => ({
    type: Constant.POST_APPROVAL_STATUS_INIT,
    formData
  }),
  ClearPostApprovalStatusAction: () => ({
    type: Constant.POST_APPROVAL_STATUS_CLEAR
  }),
  getReasonCancelRequest: () => ({
    type: Constant.GET_REASON_CANCEL_DATA
  })
}

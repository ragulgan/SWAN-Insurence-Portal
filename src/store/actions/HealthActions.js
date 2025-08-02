import * as Constant from 'store/constants/HealthConstants'

export const HealthActions = {
  GetQuotationInfo: (quoteId) => ({
    type: Constant.GET_QUOTATION_INFO_INIT,
    quoteId
  }),
  GetHealthPlans: (planId) => ({
    type: Constant.HEALTH_PLANS_INIT,
    planId
  }),
  GetCompanies: () => ({
    type: Constant.GET_COMPANIES_INIT
  }),
  SaveHealthQuote: (formData) => ({
    type: Constant.SAVE_HEALTH_QUOTE_INIT,
    formData
  }),
  UpdateHealthQuote: (formData) => ({
    type: Constant.UPDATE_HEALTH_QUOTE_INIT,
    formData
  }),
  DownloadAllQuote: (quoteId) => ({
    type: Constant.DOWNLOAD_QUOTE_INIT,
    quoteId
  }),
  DownloadSingleQuote: (quoteId) => ({
    type: Constant.DOWNLOAD_QUOTE_SINGLE_INIT,
    quoteId
  }),
  SendQuote: (quoteId) => ({
    type: Constant.SEND_QUOTE_INIT,
    quoteId
  }),
  PrintQuote: (quoteId) => ({
    type: Constant.PRINT_QUOTE_INIT,
    quoteId
  }),
  CancelQuote: (quoteId) => ({
    type: Constant.CANCEL_QUOTE_INIT,
    quoteId
  })
}

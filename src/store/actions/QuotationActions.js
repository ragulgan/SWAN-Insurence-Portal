import * as Constant from '../../store/constants/QuotationConstants'

export const QuotationActions = {
  FetchQuotationList: (params) => ({
    type: Constant.QUOTATION_LIST_INIT,
    params
  })
}

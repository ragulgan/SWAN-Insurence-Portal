import * as Constant from '../constants/TravelQuotationList'

export const TravelQuotationListAction = {
  FetchQuotationList: (params) => ({
    type: Constant.TRAVEL_QUOTATION_LIST_INIT,
    params
  })
}

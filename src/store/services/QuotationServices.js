import AxiosIn from '../../helpers/AxiosInterceptor'
const QuotationServices = {}

QuotationServices.FetchQuotationList = function (userName) {
  return AxiosIn({
    url: `/client/quoteslist/${userName}`,
    method: 'get'
  })
}

export default QuotationServices

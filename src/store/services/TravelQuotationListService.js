import AxiosIn from '../../helpers/AxiosInterceptor'
const TravelQuotationServices = {}

TravelQuotationServices.FetchQuotationList = function (userName) {
  return AxiosIn({
    url: `/client/quoteslist/${userName}`,
    method: 'get'
  })
}

export default TravelQuotationServices

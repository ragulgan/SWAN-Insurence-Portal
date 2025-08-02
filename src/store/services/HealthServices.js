import AxiosIn from 'helpers/AxiosInterceptor'
const HealthServices = {}

HealthServices.GetQuotation = function (quoteId) {
  return AxiosIn({
    url: `/client/quotes/${quoteId}`,
    method: 'get'
  })
}
HealthServices.GetHealthPlans = function (planId) {
  return AxiosIn({
    url: `/master/swnmotplan?polcd=${planId}`,
    method: 'get'
  })
}
HealthServices.GetCompanies = function () {
  return AxiosIn({
    url: '/travel/country',
    method: 'get'
  })
}
HealthServices.SaveHealthQuote = function () {
  return AxiosIn({
    url: '/travel/country',
    method: 'get'
  })
}
HealthServices.UpdateHealthQuote = function () {
  return AxiosIn({
    url: '/travel/country',
    method: 'get'
  })
}
HealthServices.DownloadAllHealthQuote = function () {
  return AxiosIn({
    url: '/travel/country',
    method: 'get'
  })
}
HealthServices.DownloadSingleHealthQuote = function () {
  return AxiosIn({
    url: '/travel/country',
    method: 'get'
  })
}
HealthServices.SendHealthQuote = function () {
  return AxiosIn({
    url: '/travel/country',
    method: 'get'
  })
}
HealthServices.PrintHealthQuote = function () {
  return AxiosIn({
    url: '/travel/country',
    method: 'get'
  })
}
HealthServices.CancelHealthQuote = function () {
  return AxiosIn({
    url: '/travel/country',
    method: 'get'
  })
}

export default HealthServices

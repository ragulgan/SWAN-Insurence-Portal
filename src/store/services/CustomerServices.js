import AxiosIn from '../../helpers/AxiosInterceptor'
const CustomerServices = {}

CustomerServices.SaveCustomerDetails = function (formData) {
  return AxiosIn({
    url: '/client/personaldetails',
    method: 'post',
    data: formData
  })
}
CustomerServices.SaveVehicleDetails = function (formData) {
  return AxiosIn({
    url: '/client/vehicledetails',
    method: 'post',
    data: formData
  })
}

export default CustomerServices

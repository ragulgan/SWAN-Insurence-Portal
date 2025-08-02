import * as Constant from '../../store/constants/CustomerConstants'

export const CustomerActions = {
  SavePersonalDetails: (formData) => ({
    type: Constant.POST_PERSONAL_DETAILS_INIT,
    formData
  }),
  SaveVehiclesDetails: (formData) => ({
    type: Constant.POST_VEHICLE_DETAILS_INIT,
    formData
  })
}

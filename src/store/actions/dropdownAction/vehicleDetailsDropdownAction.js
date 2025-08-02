import * as Constant from '../../../store/constants/vehicleDetailsDropdownConstants'

export const VehicleDropdownActions = {
  getPurchaseTypeRequest: () => ({
    type: Constant.GET_PURCHASE_TYPE_DATA
  }),
  getPurchaseTypeClear: () => ({
    type: Constant.GET_PURCHASE_TYPE_CLEAR
  }),
  getPolicyTypeRequest: () => ({
    type: Constant.GET_POLICY_TYPE_DATA
  }),
  getPolicyTypeClear: () => ({
    type: Constant.GET_POLICY_TYPE_CLEAR
  }),
  getMakeRequest: (params) => ({
    type: Constant.GET_MAKE_DATA,
    params
  }),
  getMakeClear: () => ({
    type: Constant.GET_MAKE_CLEAR
  }),
  getModelRequest: (params) => ({
    type: Constant.GET_MODEL_DATA,
    params
  }),
  getModelClear: () => ({
    type: Constant.GET_MODEL_CLEAR
  }),
  getSubModelRequest: (params) => ({
    type: Constant.GET_SUB_MODEL_DATA,
    params
  }),
  getSubModelClear: () => ({
    type: Constant.GET_SUB_MODEL_CLEAR
  }),
  getNoOfSeatsRequest: () => ({
    type: Constant.GET_NO_OF_SEATS_DATA
  }),
  getNoOfSeatsClear: () => ({
    type: Constant.GET_NO_OF_SEATS_CLEAR
  }),
  getVehicleTypeRequest: () => ({
    type: Constant.GET_VEHICLE_TYPE_DATA
  }),
  getVehicleTypeClear: () => ({
    type: Constant.GET_VEHICLE_TYPE_CLEAR
  }),
  getVehicleKeptInRequest: () => ({
    type: Constant.GET_VEHICLE_KEPT_IN_DATA
  }),
  getVehicleKeptInClear: () => ({
    type: Constant.GET_VEHICLE_KEPT_IN_CLEAR
  }),
  getVoluntaryXSRequest: () => ({
    type: Constant.GET_VOLUNTARY_XS_DATA
  }),
  getVoluntaryXSClear: () => ({
    type: Constant.GET_VOLUNTARY_XS_CLEAR
  }),
  getVehicleMatrixRequest: (params) => ({
    type: Constant.GET_VEHICLE_MATRIX_DATA,
    params
  }),
  getVehicleMatrixClear: () => ({
    type: Constant.GET_VEHICLE_MATRIX_CLEAR
  }),
  getCountryOfOriginRequest: (params) => ({
    type: Constant.GET_COUNTRY_OF_ORIGIN_DATA,
    params
  }),
  getCountryOfOriginClear: () => ({
    type: Constant.GET_COUNTRY_OF_ORIGIN_CLEAR
  })
}

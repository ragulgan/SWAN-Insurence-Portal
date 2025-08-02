import * as Constant from '../../../store/constants/vehicleDetailsDropdownConstants'

const initState = {
  getPurchaseTypeLoading: false,
  purchaseTypeData: null,
  purchaseTypeStatus: '',
  purchaseTypeMessage: '',
  getPolicyTypeLoading: false,
  policyTypeData: null,
  policyTypeStatus: '',
  policyTypeMessage: '',
  getMakeLoading: false,
  makeData: null,
  makeStatus: '',
  makeMessage: '',
  getModelLoading: false,
  modelData: null,
  modelStatus: '',
  modelMessage: '',
  getSubModelLoading: false,
  subModelData: null,
  subModelStatus: '',
  subModelMessage: '',
  getNoOfSeatsLoading: false,
  noOfSeatsData: null,
  noOfSeatsStatus: '',
  noOfSeatsMessage: '',
  getVehicleTypeLoading: false,
  vehicleTypeData: null,
  vehicleTypeStatus: '',
  vehicleTypeMessage: '',
  getVehicleKeptInLoading: false,
  vehicleKeptInData: null,
  vehicleKeptInStatus: '',
  vehicleKeptInMessage: '',
  getVoluntaryXSLoading: false,
  VoluntaryXSData: null,
  VoluntaryXSStatus: '',
  VoluntaryXSMessage: '',
  getVehicleMatrixLoading: false,
  VehicleMatrixData: '',
  VehicleMatrixStatus: '',
  VehicleMatrixMessage: '',
  getCountryOfOriginLoading: false,
  CountryOfOriginData: '',
  CountryOfOriginStatus: '',
  CountryOfOriginMessage: ''
}

const VehicleDropdownReducer = (state = initState, action) => {
  switch (action.type) {
    case Constant.GET_PURCHASE_TYPE_DATA:
      return {
        ...state,
        getPurchaseTypeLoading: true
      }
    case Constant.GET_PURCHASE_TYPE_SUCCESS:
      return {
        ...state,
        getPurchaseTypeLoading: false,
        purchaseTypeData: action?.response.data,
        purchaseTypeStatus: action.status,
        purchaseTypeMessage: action.message
      }
    case Constant.GET_PURCHASE_TYPE_FAILURE:
      return {
        ...state,
        getPurchaseTypeLoading: false,
        purchaseTypeStatus: action.status,
        purchaseTypeMessage: action.message
      }
    case Constant.GET_PURCHASE_TYPE_CLEAR:
      return {
        ...state,
        purchaseTypeData: '',
        purchaseTypeStatus: '',
        purchaseTypeMessage: ''
      }
    case Constant.GET_POLICY_TYPE_DATA:
      return {
        ...state,
        getPolicyTypeLoading: true
      }
    case Constant.GET_POLICY_TYPE_SUCCESS:
      return {
        ...state,
        getPolicyTypeLoading: false,
        policyTypeData: action?.response.data,
        policyTypeStatus: action.status,
        policyTypeMessage: action.message
      }
    case Constant.GET_POLICY_TYPE_FAILURE:
      return {
        ...state,
        getPolicyTypeLoading: false,
        policyTypeStatus: action.status,
        policyTypeMessage: action.message
      }
    case Constant.GET_POLICY_TYPE_CLEAR:
      return {
        ...state,
        policyTypeData: '',
        policyTypeStatus: '',
        policyTypeMessage: ''
      }
    case Constant.GET_MAKE_DATA:
      return {
        ...state,
        getMakeLoading: true
      }
    case Constant.GET_MAKE_SUCCESS:
      return {
        ...state,
        getMakeLoading: false,
        makeData: action?.response.data,
        makeStatus: action.status,
        makeMessage: action.message
      }
    case Constant.GET_MAKE_FAILURE:
      return {
        ...state,
        getMakeLoading: false,
        makeStatus: action.status,
        makeMessage: action.message
      }
    case Constant.GET_MAKE_CLEAR:
      return {
        ...state,
        makeData: '',
        makeStatus: '',
        makeMessage: ''
      }
    case Constant.GET_MODEL_DATA:
      return {
        ...state,
        getModelLoading: true
      }
    case Constant.GET_MODEL_SUCCESS:
      return {
        ...state,
        getModelLoading: false,
        modelData: action?.response.data,
        modelStatus: action.status,
        modelMessage: action.message
      }
    case Constant.GET_MODEL_FAILURE:
      return {
        ...state,
        getModelLoading: false,
        modelStatus: action.status,
        modelMessage: action.message
      }
    case Constant.GET_MODEL_CLEAR:
      return {
        ...state,
        modelData: '',
        modelStatus: '',
        modelMessage: ''
      }
    case Constant.GET_SUB_MODEL_DATA:
      return {
        ...state,
        getSubModelLoading: true
      }
    case Constant.GET_SUB_MODEL_SUCCESS:
      return {
        ...state,
        getSubModelLoading: false,
        subModelData: action?.response.data,
        subModelStatus: action.status,
        subModelMessage: action.message
      }
    case Constant.GET_SUB_MODEL_FAILURE:
      return {
        ...state,
        getSubModelLoading: false,
        subModelStatus: action.status,
        subModelMessage: action.message
      }
    case Constant.GET_SUB_MODEL_CLEAR:
      return {
        ...state,
        subModelData: '',
        subModelStatus: '',
        subModelMessage: ''
      }
    case Constant.GET_NO_OF_SEATS_DATA:
      return {
        ...state,
        getNoOfSeatsLoading: true
      }
    case Constant.GET_NO_OF_SEATS_SUCCESS:
      return {
        ...state,
        getNoOfSeatsLoading: false,
        noOfSeatsData: action?.response.data,
        noOfSeatsStatus: action.status,
        noOfSeatsMessage: action.message
      }
    case Constant.GET_NO_OF_SEATS_FAILURE:
      return {
        ...state,
        getNoOfSeatsLoading: false,
        noOfSeatsStatus: action.status,
        noOfSeatsMessage: action.message
      }
    case Constant.GET_NO_OF_SEATS_CLEAR:
      return {
        ...state,
        noOfSeatsData: '',
        noOfSeatsStatus: '',
        noOfSeatsMessage: ''
      }
    case Constant.GET_VEHICLE_TYPE_DATA:
      return {
        ...state,
        getVehicleTypeLoading: true
      }
    case Constant.GET_VEHICLE_TYPE_SUCCESS:
      return {
        ...state,
        getVehicleTypeLoading: false,
        vehicleTypeData: action?.response.data,
        vehicleTypeStatus: action.status,
        vehicleTypeMessage: action.message
      }
    case Constant.GET_VEHICLE_TYPE_FAILURE:
      return {
        ...state,
        getVehicleTypeLoading: false,
        vehicleTypeStatus: action.status,
        vehicleTypeMessage: action.message
      }
    case Constant.GET_VEHICLE_TYPE_CLEAR:
      return {
        ...state,
        vehicleTypeData: '',
        vehicleTypeStatus: '',
        vehicleTypeMessage: ''
      }
    case Constant.GET_VEHICLE_KEPT_IN_DATA:
      return {
        ...state,
        getVehicleKeptInLoading: true
      }
    case Constant.GET_VEHICLE_KEPT_IN_SUCCESS:
      return {
        ...state,
        getVehicleKeptInLoading: false,
        vehicleKeptInData: action?.response.data,
        vehicleKeptInStatus: action.status,
        vehicleKeptInMessage: action.message
      }
    case Constant.GET_VEHICLE_KEPT_IN_FAILURE:
      return {
        ...state,
        getVehicleKeptInLoading: false,
        vehicleKeptInStatus: action.status,
        vehicleKeptInMessage: action.message
      }
    case Constant.GET_VEHICLE_KEPT_IN_CLEAR:
      return {
        ...state,
        vehicleKeptInData: '',
        vehicleKeptInStatus: '',
        vehicleKeptInMessage: ''
      }
    case Constant.GET_VOLUNTARY_XS_DATA:
      return {
        ...state,
        getVoluntaryXSLoading: true
      }
    case Constant.GET_VOLUNTARY_XS_SUCCESS:
      return {
        ...state,
        getVoluntaryXSLoading: false,
        VoluntaryXSData: action?.response.data,
        VoluntaryXSStatus: action.status,
        VoluntaryXSMessage: action.message
      }
    case Constant.GET_VOLUNTARY_XS_FAILURE:
      return {
        ...state,
        getVoluntaryXSLoading: false,
        VoluntaryXSStatus: action.status,
        VoluntaryXSMessage: action.message
      }
    case Constant.GET_VOLUNTARY_XS_CLEAR:
      return {
        ...state,
        VoluntaryXSData: '',
        VoluntaryXSStatus: '',
        VoluntaryXSMessage: ''
      }
    case Constant.GET_VEHICLE_MATRIX_DATA:
      return {
        ...state,
        getVehicleMatrixLoading: true
      }
    case Constant.GET_VEHICLE_MATRIX_SUCCESS:
      return {
        ...state,
        getVehicleMatrixLoading: false,
        VehicleMatrixData: action?.response.data,
        VehicleMatrixStatus: action?.response?.status,
        VehicleMatrixMessage: action.message
      }
    case Constant.GET_VEHICLE_MATRIX_FAILURE:
      return {
        ...state,
        getVehicleMatrixLoading: false,
        VehicleMatrixStatus: action?.response?.status,
        VehicleMatrixMessage: action.message
      }
    case Constant.GET_VEHICLE_MATRIX_CLEAR:
      return {
        ...state,
        VehicleMatrixData: '',
        VehicleMatrixStatus: '',
        VehicleMatrixMessage: ''
      }
    case Constant.GET_COUNTRY_OF_ORIGIN_DATA:
      return {
        ...state,
        getCountryOfOriginLoading: true
      }
    case Constant.GET_COUNTRY_OF_ORIGIN_SUCCESS:
      return {
        ...state,
        getCountryOfOriginLoading: false,
        CountryOfOriginData: action?.response.data,
        CountryOfOriginStatus: action.status,
        CountryOfOriginMessage: action.message
      }
    case Constant.GET_COUNTRY_OF_ORIGIN_FAILURE:
      return {
        ...state,
        getCountryOfOriginLoading: false,
        CountryOfOriginStatus: action.status,
        CountryOfOriginMessage: action.message
      }
    case Constant.GET_COUNTRY_OF_ORIGIN_CLEAR:
      return {
        ...state,
        CountryOfOriginData: '',
        CountryOfOriginStatus: '',
        CountryOfOriginMessage: ''
      }
    default:
      return state
  }
}

export default VehicleDropdownReducer

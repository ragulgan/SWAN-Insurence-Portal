import * as Constant from '../../store/constants/CustomerConstants'

const initState = {
  customerLoading: false,
  personalDetailSuccess: null,
  vehicleDetailSuccess: null
}

const CustomerReducer = (state = initState, action) => {
  switch (action.type) {
    case Constant.POST_PERSONAL_DETAILS_INIT:
    case Constant.POST_VEHICLE_DETAILS_INIT:
      return {
        ...state,
        customerLoading: true
      }

    case Constant.POST_PERSONAL_DETAILS_SUCCESS:
      return {
        ...state,
        customerLoading: false,
        personalDetailSuccess: action.response
      }

    case Constant.POST_VEHICLE_DETAILS_SUCCESS:
      return {
        ...state,
        customerLoading: false,
        vehicleDetailSuccess: action.response
      }

    case Constant.POST_PERSONAL_DETAILS_FAILED:
    case Constant.POST_VEHICLE_DETAILS_FAILED:
      return {
        ...state,
        customerLoading: false,
        error: action
      }

    default:
      return state
  }
}

export default CustomerReducer

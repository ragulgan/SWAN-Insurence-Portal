import * as Constant from '../../constants/travelPersonalDropdownConstant'

const initState = {
  getTravelCountryLoading: false,
  travelCountryData: null,
  travelCountryStatus: '',
  TravelCountryMessage: ''
}

const travelPersonalDropdownReducer = (state = initState, action) => {
  switch (action.type) {
    case Constant.GET_TRAVEL_COUNTRY_DATA:
      return {
        ...state,
        getTravelCountryLoading: true
      }
    case Constant.GET_TRAVEL_COUNTRY_SUCCESS:
      return {
        ...state,
        getTravelCountryLoading: false,
        travelCountryData: action?.response.data,
        travelCountryStatus: action?.response.status,
        TravelCountryMessage: action?.response.message
      }
    case Constant.GET_TRAVEL_COUNTRY_FAILED:
      return {
        ...state,
        getTravelCountryLoading: false,
        travelCountryStatus: action.status,
        TravelCountryMessage: action.message
      }
    case Constant.GET_TRAVEL_COUNTRY_CLEAR:
      return {
        ...state,
        travelCountryData: '',
        travelCountryStatus: '',
        TravelCountryMessage: ''
      }
    default:
      return state
  }
}

export default travelPersonalDropdownReducer

import * as Constant from '../../../store/constants/personalDropdownConstants'

const initState = {
  getTitleLoading: false,
  titleData: null,
  titleStatus: '',
  titleMessage: '',
  getOccupationLoading: false,
  occupationData: null,
  occupationStatus: '',
  occupationMessage: '',
  getYearofLicenseLoading: false,
  yearofLicenseData: null,
  yearofLicenseStatus: '',
  yearofLicenseMessage: ''
}

const PersonalDropdownReducer = (state = initState, action) => {
  switch (action.type) {
    case Constant.GET_TITLE_DATA:
      return {
        ...state,
        getTitleLoading: true
      }
    case Constant.GET_TITLE_SUCCESS:
      return {
        ...state,
        getTitleLoading: false,
        titleData: action?.response.data,
        titleStatus: action.status,
        titleMessage: action.message
      }
    case Constant.GET_TITLE_FAILURE:
      return {
        ...state,
        getTitleLoading: false,
        titleStatus: action.status,
        titleMessage: action.message
      }
    case Constant.GET_TITLE_CLEAR:
      return {
        ...state,
        titleData: '',
        titleStatus: '',
        titleMessage: ''
      }
    case Constant.GET_OCCUPATION_DATA:
      return {
        ...state,
        getOccupationLoading: true
      }
    case Constant.GET_OCCUPATION_SUCCESS:
      return {
        ...state,
        getOccupationLoading: false,
        occupationData: action?.response.data,
        occupationStatus: action.status,
        occupationMessage: action.message
      }
    case Constant.GET_OCCUPATION_FAILURE:
      return {
        ...state,
        getOccupationLoading: false,
        occupationStatus: action.status,
        occupationMessage: action.message
      }
    case Constant.GET_OCCUPATION_CLEAR:
      return {
        ...state,
        occupationData: '',
        occupationStatus: '',
        occupationMessage: ''
      }
    case Constant.GET_YEAR_OF_LICENSE_DATA:
      return {
        ...state,
        getYearofLicenseLoading: true
      }
    case Constant.GET_YEAR_OF_LICENSE_SUCCESS:
      return {
        ...state,
        getYearofLicenseLoading: false,
        yearOfLicenseData: action?.response.data,
        yearOfLicenseStatus: action.status,
        yearOfLicenseMessage: action.message
      }
    case Constant.GET_YEAR_OF_LICENSE_FAILURE:
      return {
        ...state,
        getYearofLicenseLoading: false,
        yearOfLicenseStatus: action.status,
        yearOfLicenseMessage: action.message
      }
    case Constant.GET_YEAR_OF_LICENSE_CLEAR:
      return {
        ...state,
        yearOfLicenseData: '',
        yearOfLicenseStatus: '',
        yearOfLicenseMessage: ''
      }
    default:
      return state
  }
}

export default PersonalDropdownReducer

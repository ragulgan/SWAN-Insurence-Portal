import * as Constant from '../../../store/constants/proposalDropdownConstants'

const initState = {
  getTotalClaimLoading: false,
  getTotalClaimData: null,
  getLeasingLoading: false,
  getLeasingData: null,
  getXSOptionLoading: false,
  xsOptionData: null,
  xsOptionStatus: '',
  xsOptionMessage: ''
}

const proposalDropdownReducer = (
  state = initState,
  { type, error_data, response }
) => {
  switch (type) {
    case Constant.GET_TOTAL_CLAIMS_INIT:
      return {
        ...state,
        getTotalClaimLoading: true
      }
    case Constant.GET_TOTAL_CLAIMS_SUCCESS:
      return {
        ...state,
        getTotalClaimLoading: false,
        getTotalClaimData: response.data
      }
    case Constant.GET_TOTAL_CLAIMS_FAILURE:
      return {
        ...state,
        getTotalClaimLoading: false,
        getTotalClaimData: error_data
      }
    case Constant.GET_LEASING_INIT:
      return {
        ...state,
        getLeasingLoading: true
      }
    case Constant.GET_LEASING_SUCCESS:
      return {
        ...state,
        getLeasingLoading: false,
        getLeasingData: response.data
      }
    case Constant.GET_LEASING_FAILURE:
      return {
        ...state,
        getLeasingLoading: false,
        getLeasingData: error_data
      }
    case Constant.GET_TOTAL_CLAIMS_CLEAR:
      return {
        ...state,
        getLeasingData: ''
      }
    case Constant.GET_TOTAL_CLAIMS_CLEAR:
      return {
        ...state,
        getTotalClaimData: ''
      }
    case Constant.GET_XS_OPTION_INIT:
      return {
        ...state,
        getXSOptionLoading: true
      }
    case Constant.GET_XS_OPTION_SUCCESS:
      return {
        ...state,
        getXSOptionLoading: false,
        xsOptionData: response?.data,
        xsOptionStatus: response?.status,
        xsOptionMessage: response?.message
      }
    case Constant.GET_XS_OPTION_FAILURE:
      return {
        ...state,
        getXSOptionLoading: false,
        xsOptionStatus: response?.status,
        xsOptionMessage: response?.message
      }
    case Constant.GET_XS_OPTION_CLEAR:
      return {
        ...state,
        xsOptionData: '',
        xsOptionStatus: '',
        xsOptionMessage: ''
      }
    default:
      return state
  }
}

export default proposalDropdownReducer

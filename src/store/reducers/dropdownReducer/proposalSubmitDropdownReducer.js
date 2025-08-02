import * as Constant from '../../../store/constants/proposalSubmitDropdownConstants'

const initState = {
  getPayMethodLoading: false,
  getPayMethodData: null,
  getPolicyDeliveryLoading: false,
  getPolicyDeliveryData: null
}

const proposalDropdownReducer = (
  state = initState,
  { type, error_data, response }
) => {
  switch (type) {
    case Constant.GET_PAYMENT_METHOD_INIT:
      return {
        ...state,
        getPayMethodLoading: true
      }
    case Constant.GET_PAYMENT_METHOD_SUCCESS:
      return {
        ...state,
        getPayMethodLoading: false,
        getPayMethodData: response.data
      }
    case Constant.GET_PAYMENT_METHOD_FAILURE:
      return {
        ...state,
        getPayMethodLoading: false,
        getPayMethodData: error_data
      }
    case Constant.GET_PAYMENT_METHOD_CLEAR:
      return {
        ...state,
        getPayMethodData: ''
      }

    case Constant.GET_POLICY_DELIVERY_INIT:
      return {
        ...state,
        getPolicyDeliveryLoading: true
      }
    case Constant.GET_POLICY_DELIVERY_SUCCESS:
      return {
        ...state,
        getPolicyDeliveryLoading: false,
        getPolicyDeliveryData: response.data
      }
    case Constant.GET_POLICY_DELIVERY_FAILURE:
      return {
        ...state,
        getPolicyDeliveryLoading: false,
        getPolicyDeliveryData: error_data
      }
    case Constant.GET_POLICY_DELIVERY_CLEAR:
      return {
        ...state,
        getPolicyDeliveryData: '',
        getPolicyDeliveryLoading: false
      }

    default:
      return state
  }
}

export default proposalDropdownReducer

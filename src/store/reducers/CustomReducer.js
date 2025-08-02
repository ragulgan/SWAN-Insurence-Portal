import * as constant from '../../store/constants/CustomConstants'

const initState = {
  customLoading: false,
  customData: null
}

const CustomReducer = (state = initState, { type, response }) => {
  switch (type) {
    case constant.CUSTOM_INIT:
      return {
        ...state,
        customLoading: true
      }

    case constant.CUSTOM_SUCCESS:
      return {
        ...state,
        customLoading: false,
        customData: response.data
      }

    case constant.CUSTOM_FAILED:
      return {
        ...state,
        customLoading: false,
        error: response
      }

    default:
      return state
  }
}

export default CustomReducer

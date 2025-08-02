import * as Constant from '../../store/constants/ClientConstants'

const initState = {
  clientLoading: false,
  clientData: null
}

const ClientReducer = (state = initState, action) => {
  const res = action.response && action.response
  const Table =
    action.response &&
    action.response.data &&
    action.response.data.Table &&
    action.response.data.Table
  switch (action.type) {
    case Constant.SEARCH_CLIENT_INIT:
      return {
        ...state,
        clientLoading: true
      }
    case Constant.SEARCH_CLIENT_SUCCESS:
      return {
        ...state,
        clientLoading: false,
        status: res.status,
        message: res.message,
        clientData: Table
      }
    case Constant.SEARCH_CLIENT_CLEAR:
      return {
        ...state,
        status: '',
        message: '',
        clientData: ''
      }
    case Constant.SEARCH_CLIENT_FAILED:
      return {
        ...state,
        clientLoading: false,
        status: 'error',
        message: res.message,
        error: action
      }
    default:
      return state
  }
}

export default ClientReducer

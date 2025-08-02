import * as Constant from '../../store/constants/AuthConstants'
import { getSessionStorage } from '../../helpers/helper'
import { SESSION } from '../../helpers/constants'

const initState = {
  authLoading: false,
  authData: null,
  authToken: getSessionStorage(SESSION.AUTH_TOKEN) === false ? null : getSessionStorage(SESSION.AUTH_TOKEN),
  authRole: getSessionStorage(SESSION.AUTH_ROLE) === false ? 'customer' : getSessionStorage(SESSION.AUTH_ROLE),
  logout: null,
  authStatus: '',
  authMessage: ''
}

const AuthReducer = (state = initState, action) => {
  switch (action.type) {
    case Constant.SIGNIN_INIT:
    case Constant.SIGNOUT_INIT:
      return {
        ...state,
        authLoading: true
      }

    case Constant.SIGNIN_SUCCESS:
      return {
        ...state,
        authLoading: false,
        authStatus: action.authStatus,
        authMessage: action.authMessage
      }

    case Constant.USER_AUTHENTICATED:
      return {
        ...state,
        authLoading: false,
        authToken: action.authToken,
        authRole: action.authRole,
        authStatus: action.status,
        authMessage: action.message
      }
    case Constant.USER_AUTH_CLEAR:
      return {
        ...state,
        authToken: '',
        authRole: '',
        authStatus: '',
        authMessage: ''
      }
    case Constant.SIGNIN_CLEAR:
      return {
        ...state,
        authToken: '',
        authRole: ''

      }

    case Constant.SIGNOUT_SUCCESS:
      return {
        ...state,
        authLoading: false,
        logout: action?.data
      }

    case Constant.SIGNIN_FAILED:
      return {
        ...state,
        // authData:action,
        authLoading: false
      }
    case Constant.SIGNOUT_FAILED:
      return {
        ...state,
        authLoading: false,
        error: action
      }

    default:
      return state
  }
}

export default AuthReducer

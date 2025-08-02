import * as Constant from '../../store/constants/ProfileConstants'
import { getSessionStorage } from '../../helpers/helper'

const initState = {
  profileLoading: false,
  profileData: null,
  profilePages: null,
  myMenusList: null,
  loggedUser: getSessionStorage('logged_user') === false ? null : getSessionStorage('logged_user')
}

const ProfileReducer = (state = initState, action) => {
  switch (action.type) {
    case Constant.MY_PROFILE_INIT:
    case Constant.MY_MENUS_INIT:
      return {
        ...state,
        profileLoading: true
      }

    case Constant.MY_PROFILE_SUCCESS:
      return {
        ...state,
        profileLoading: false,
        profileData: action.response.data?.profile?.[0],
        profilePages: action.response.data?.access
      }

    case Constant.MY_MENUS_SUCCESS:
      return {
        ...state,
        profileLoading: false,
        myMenusList: action.response.data
      }

    case Constant.MY_PROFILE_FAILED:
    case Constant.MY_MENUS_FAILED:
      return {
        ...state,
        profileLoading: false,
        error: action
      }

    default:
      return state
  }
}

export default ProfileReducer

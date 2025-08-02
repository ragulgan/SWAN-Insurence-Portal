import * as Constant from '../../store/constants/AuthConstants'

export const AuthActions = {
  SignIn: (formData) => ({
    type: Constant.SIGNIN_INIT,
    formData
  }),
  SignOut: () => ({
    type: Constant.SIGNOUT_INIT
  }),
  UserAuthenticate: (authToken, authRole) => ({
    type: Constant.USER_AUTHENTICATED,
    authToken,
    authRole
  }),
  UserAuthenticationClear: () => ({
    type: Constant.USER_AUTH_CLEAR
  }),
  SignInSuccess: (params) => ({
    type: Constant.SIGNIN_SUCCESS,
    params
  }),
  SignInClear: () => ({
    type: Constant.SIGNIN_CLEAR
  }),
  SignOutSuccess: (data) => ({
    type: Constant.SIGNOUT_SUCCESS,
    data
  }),
  ShowMessage: () => ({
    type: Constant.SHOW_AUTH_MESSAGE
  }),
  TriggerOtp: () => ({
    type: Constant.TRIGGER_OTP_INIT
  }),
  SetOtp: () => ({
    type: Constant.SET_OTP_INIT
  }),
  SaveNewPassword: () => ({
    type: Constant.RESET_PASSWORD_INIT
  })

  // saveCustomProfile: (data) => ({
  //     type: Constant.MY_PROFILE_SUCCESS,
  //     data
  // })
}

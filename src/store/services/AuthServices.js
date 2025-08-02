import AxiosIn from '../../helpers/AxiosInterceptor'
const AuthServices = {}

AuthServices.SignIn = function (formData) {
  return AxiosIn({
    url: '/auth',
    method: 'post',
    data: formData
  })
}
AuthServices.Logout = function () {
  return 'undefined'
}

export default AuthServices

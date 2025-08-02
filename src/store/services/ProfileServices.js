import AxiosIn from '../../helpers/AxiosInterceptor'
const ProfileServices = {}

ProfileServices.MyProfile = function () {
  return AxiosIn({
    url: '/users',
    method: 'get'
  })
}
ProfileServices.MyMenus = function () {
  return AxiosIn({
    url: '/users/getAccess',
    method: 'get'
  })
}

export default ProfileServices

import * as Constant from '../../store/constants/ProfileConstants'

export const ProfileActions = {
  MyProfile: () => ({
    type: Constant.MY_PROFILE_INIT
  }),
  MyMenus: () => ({
    type: Constant.MY_MENUS_INIT
  })
}

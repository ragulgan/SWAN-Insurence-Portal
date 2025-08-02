import * as Constant from '../../store/constants/CustomConstants'

export const CustomAction = {
  DemoAction: (params) => ({
    type: Constant.CUSTOM_INIT,
    params
  })
}

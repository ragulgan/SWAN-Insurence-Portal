import * as Constant from '../../../store/constants/extensionDropdownConstants'

export const ExtensionDropdownActions = {
  getLimitDaysRequest: (params) => ({
    type: Constant.GET_LIMIT_DAYS_DATA,
    params
  }),
  getLimitDaysClear: () => ({
    type: Constant.GET_LIMIT_DAYS_CLEAR
  }),
  getRodentDamageRequest: (params) => ({
    type: Constant.GET_RODENT_DAMAGE_DATA,
    params
  }),
  getRodentDamageClear: () => ({
    type: Constant.GET_RODENT_DAMAGE_CLEAR
  }),
  getCompensationRequest: (params) => ({
    type: Constant.GET_COMPENSATION_DATA,
    params
  }),
  getCompensationClear: () => ({
    type: Constant.GET_COMPENSATION_CLEAR
  }),
  getAicCoverRequest: (params) => ({
    type: Constant.GET_AIC_COVER_DATA,
    params
  }),
  getAicCoverClear: () => ({
    type: Constant.GET_AIC_COVER_CLEAR
  })
}

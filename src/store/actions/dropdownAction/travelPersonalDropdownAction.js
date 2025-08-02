import * as Constant from '../../constants/travelPersonalDropdownConstant'

export const personalTRDropdownActions = {
  getTCountryRequest: (params) => ({
    type: Constant.GET_TRAVEL_COUNTRY_DATA,
    params
  }),
  getTCountryClear: () => ({
    type: Constant.GET_TRAVEL_COUNTRY_CLEAR
  })
}

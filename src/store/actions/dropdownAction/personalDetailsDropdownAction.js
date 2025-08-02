import * as Constant from '../../../store/constants/personalDropdownConstants'

export const PersonalDropdownActions = {
  getTitleRequest: () => ({
    type: Constant.GET_TITLE_DATA
  }),
  getTitleClear: () => ({
    type: Constant.GET_TITLE_CLEAR
  }),
  getOccupationRequest: () => ({
    type: Constant.GET_OCCUPATION_DATA
  }),
  getOccupationClear: () => ({
    type: Constant.GET_OCCUPATION_CLEAR
  }),
  getYearofLicenseRequest: () => ({
    type: Constant.GET_YEAR_OF_LICENSE_DATA
  }),
  getYearofLicenseClear: () => ({
    type: Constant.GET_YEAR_OF_LICENSE_CLEAR
  })
}

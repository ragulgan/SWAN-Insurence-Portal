import * as Constant from '../../../store/constants/proposalDropdownConstants'

export const proposalDropdownAction = {
  getTotalClaim: () => ({
    type: Constant.GET_TOTAL_CLAIMS_INIT
  }),
  getLeaseDropdown: () => ({
    type: Constant.GET_LEASING_INIT
  }),
  getXSOptionRequest: (params) => ({
    type: Constant.GET_XS_OPTION_INIT,
    params
  })
}

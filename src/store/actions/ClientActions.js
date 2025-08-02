import * as Constant from '../../store/constants/ClientConstants'

export const ClientActions = {
  SearchClient: (params) => ({
    type: Constant.SEARCH_CLIENT_INIT,
    params
  }),
  ClearClient: () => ({
    type: Constant.SEARCH_CLIENT_CLEAR
  })
}

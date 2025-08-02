import * as Constant from '../../../store/constants/proposalSubmitDropdownConstants'

export const proposalSubmitDropdownAction = {
  getPaymentMethod: () => ({
    type: Constant.GET_PAYMENT_METHOD_INIT
  }),
  getPolicyDelivery: () => ({
    type: Constant.GET_POLICY_DELIVERY_INIT
  })
}

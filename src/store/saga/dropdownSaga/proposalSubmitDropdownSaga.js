import AxiosIn from '../../../helpers/AxiosInterceptor'
import endpoints from '../../services/endpoints'
import { takeLatest, put } from 'redux-saga/effects'
import * as Constant from '../../../store/constants/proposalSubmitDropdownConstants'
import * as CustomConstants from '../../../store/constants/CustomConstants'

export function * PaymentMethodDropdownSaga () {
  try {
    const response = yield AxiosIn.get(endpoints.PaymentMethod)
    yield put({ type: Constant.GET_PAYMENT_METHOD_SUCCESS, response })
  } catch (error) {
    const error_data = { status: 'error', message: CustomConstants.SOMETHING_WRONG }
    yield put({ type: Constant.GET_PAYMENT_METHOD_FAILURE, error_data })
  }
}
export function * PolicyDeliveryDropdownSaga () {
  try {
    const response = yield AxiosIn.get(endpoints.PolicyMethod)
    yield put({ type: Constant.GET_POLICY_DELIVERY_SUCCESS, response })
  } catch (error) {
    const error_data = { status: 'error', message: CustomConstants.SOMETHING_WRONG }
    yield put({ type: Constant.GET_POLICY_DELIVERY_FAILURE, error_data })
  }
}

export default function * ProposolSubmitDropdownSaga () {
  yield takeLatest(Constant.GET_PAYMENT_METHOD_INIT, PaymentMethodDropdownSaga)
  yield takeLatest(Constant.GET_POLICY_DELIVERY_INIT, PolicyDeliveryDropdownSaga)
}

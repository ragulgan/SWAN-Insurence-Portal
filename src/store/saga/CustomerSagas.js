import { all, takeEvery, takeLatest, put, fork, call } from 'redux-saga/effects'
import * as Constant from '../../store/constants/CustomerConstants'
import CustomerServices from '../../store/services/CustomerServices'

export function * PostCustomerDetailsSaga (formData) {
  try {
    const response = yield call(CustomerServices.SaveCustomerDetails, formData)
    yield put({ type: Constant.POST_PERSONAL_DETAILS_SUCCESS, response })
  } catch (error) {
    yield put({ type: Constant.POST_PERSONAL_DETAILS_FAILED, error })
  }
}
export function * PostVehicleDetailsSaga (formData) {
  try {
    const response = yield call(CustomerServices.SaveVehicleDetails, formData)
    yield put({ type: Constant.POST_VEHICLE_DETAILS_SUCCESS, response })
  } catch (error) {
    yield put({ type: Constant.POST_VEHICLE_DETAILS_FAILED, error })
  }
}

export default function * CustomerSaga () {
  yield takeLatest(Constant.POST_PERSONAL_DETAILS_INIT, PostCustomerDetailsSaga)
  yield takeLatest(Constant.POST_VEHICLE_DETAILS_INIT, PostVehicleDetailsSaga)
}

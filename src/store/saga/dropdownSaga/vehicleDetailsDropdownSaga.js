import AxiosIn from '../../../helpers/AxiosInterceptor'
import endpoints from '../../services/endpoints'
import { takeLatest, put } from 'redux-saga/effects'
import * as Constant from '../../../store/constants/vehicleDetailsDropdownConstants'
import * as CustomConstants from '../../../store/constants/CustomConstants'

export function * PurchaseTypeDropdownSaga () {
  try {
    const response = yield AxiosIn.get(endpoints.PurchaseType)
    yield put({ type: Constant.GET_PURCHASE_TYPE_SUCCESS, response })
  } catch (error) {
    const data = { status: 'error', message: CustomConstants.SOMETHING_WRONG }
    yield put({ type: Constant.GET_PURCHASE_TYPE_FAILURE, data })
  }
}

export function * PolicyTypeDropdownSaga () {
  try {
    const response = yield AxiosIn.get(endpoints.PolicyType)
    yield put({ type: Constant.GET_POLICY_TYPE_SUCCESS, response })
  } catch (error) {
    const data = { status: 'error', message: CustomConstants.SOMETHING_WRONG }
    yield put({ type: Constant.GET_POLICY_TYPE_FAILURE, data })
  }
}

export function * MakeDropdownSaga (actions) {
  const { params } = actions
  try {
    const response = yield AxiosIn.get(endpoints.Make, { params })
    yield put({ type: Constant.GET_MAKE_SUCCESS, response })
  } catch (error) {
    const data = { status: 'error', message: CustomConstants.SOMETHING_WRONG }
    yield put({ type: Constant.GET_MAKE_FAILURE, data })
  }
}

export function * ModelDropdownSaga (actions) {
  const { params } = actions
  try {
    const response = yield AxiosIn.get(endpoints.Model, { params })
    yield put({ type: Constant.GET_MODEL_SUCCESS, response })
  } catch (error) {
    const data = { status: 'error', message: CustomConstants.SOMETHING_WRONG }
    yield put({ type: Constant.GET_MODEL_FAILURE, data })
  }
}

export function * SubModelDropdownSaga (actions) {
  const { params } = actions
  try {
    const response = yield AxiosIn.get(endpoints.SubModel, { params })
    yield put({ type: Constant.GET_SUB_MODEL_SUCCESS, response })
  } catch (error) {
    const data = { status: 'error', message: CustomConstants.SOMETHING_WRONG }
    yield put({ type: Constant.GET_SUB_MODEL_FAILURE, data })
  }
}

export function * NoOfSeatsDropdownSaga () {
  try {
    const response = yield AxiosIn.get(endpoints.NoOfSeats)
    yield put({ type: Constant.GET_NO_OF_SEATS_SUCCESS, response })
  } catch (error) {
    const data = { status: 'error', message: CustomConstants.SOMETHING_WRONG }
    yield put({ type: Constant.GET_NO_OF_SEATS_FAILURE, data })
  }
}

export function * VehicleTypeDropdownSaga () {
  try {
    const response = yield AxiosIn.get(endpoints.VehicleType)
    yield put({ type: Constant.GET_VEHICLE_TYPE_SUCCESS, response })
  } catch (error) {
    const data = { status: 'error', message: CustomConstants.SOMETHING_WRONG }
    yield put({ type: Constant.GET_VEHICLE_TYPE_FAILURE, data })
  }
}

export function * VehicleKeptInDropdownSaga () {
  try {
    const response = yield AxiosIn.get(endpoints.VehicleKeptIn)
    yield put({ type: Constant.GET_VEHICLE_KEPT_IN_SUCCESS, response })
  } catch (error) {
    const data = { status: 'error', message: CustomConstants.SOMETHING_WRONG }
    yield put({ type: Constant.GET_VEHICLE_KEPT_IN_FAILURE, data })
  }
}

export function * VoluntaryXSDropdownSaga () {
  try {
    const response = yield AxiosIn.get(endpoints.VoluntaryXS)
    yield put({ type: Constant.GET_VOLUNTARY_XS_SUCCESS, response })
  } catch (error) {
    const data = { status: 'error', message: CustomConstants.SOMETHING_WRONG }
    yield put({ type: Constant.GET_VOLUNTARY_XS_FAILURE, data })
  }
}

export function * VehicleMatrixDropdownSaga (actions) {
  const { params } = actions
  try {
    const response = yield AxiosIn.get(endpoints.VehicleMatrix, { params })
    yield put({ type: Constant.GET_VEHICLE_MATRIX_SUCCESS, response })
  } catch (error) {
    const data = { status: 'error', message: CustomConstants.SOMETHING_WRONG }
    yield put({ type: Constant.GET_VEHICLE_MATRIX_FAILURE, data })
  }
}

export function * CountryOfOriginDropdownSaga (actions) {
  const { params } = actions
  try {
    const response = yield AxiosIn.get(endpoints.CountryOfOrigin, { params })
    yield put({ type: Constant.GET_COUNTRY_OF_ORIGIN_SUCCESS, response })
  } catch (error) {
    const data = { status: 'error', message: CustomConstants.SOMETHING_WRONG }
    yield put({ type: Constant.GET_COUNTRY_OF_ORIGIN_FAILURE, data })
  }
}

export default function * vehicleDetailsDropdownSaga () {
  yield takeLatest(Constant.GET_PURCHASE_TYPE_DATA, PurchaseTypeDropdownSaga)
  yield takeLatest(Constant.GET_POLICY_TYPE_DATA, PolicyTypeDropdownSaga)
  yield takeLatest(Constant.GET_MAKE_DATA, MakeDropdownSaga)
  yield takeLatest(Constant.GET_MODEL_DATA, ModelDropdownSaga)
  yield takeLatest(Constant.GET_SUB_MODEL_DATA, SubModelDropdownSaga)
  yield takeLatest(Constant.GET_NO_OF_SEATS_DATA, NoOfSeatsDropdownSaga)
  yield takeLatest(Constant.GET_VEHICLE_TYPE_DATA, VehicleTypeDropdownSaga)
  yield takeLatest(Constant.GET_VEHICLE_KEPT_IN_DATA, VehicleKeptInDropdownSaga)
  yield takeLatest(Constant.GET_VOLUNTARY_XS_DATA, VoluntaryXSDropdownSaga)
  yield takeLatest(Constant.GET_VEHICLE_MATRIX_DATA, VehicleMatrixDropdownSaga)
  yield takeLatest(Constant.GET_COUNTRY_OF_ORIGIN_DATA, CountryOfOriginDropdownSaga)
}

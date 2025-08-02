import AxiosIn from '../../../helpers/AxiosInterceptor'
import endpoints from '../../services/endpoints'
import { takeLatest, put } from 'redux-saga/effects'
import * as Constant from '../../../store/constants/extensionDropdownConstants'
import * as CustomConstants from '../../../store/constants/CustomConstants'

export function * LimitDaysDropdownSaga (params) {
  try {
    const response = yield AxiosIn.get(endpoints.LimitDays, params)
    yield put({ type: Constant.GET_LIMIT_DAYS_SUCCESS, response })
  } catch (error) {
    const data = { status: 'error', message: CustomConstants.SOMETHING_WRONG }
    yield put({ type: Constant.GET_LIMIT_DAYS_FAILURE, data })
  }
}

export function * RodentDamgeDropdownSaga (params) {
  try {
    const response = yield AxiosIn.get(endpoints.RodentDamge, params)
    yield put({ type: Constant.GET_RODENT_DAMAGE_SUCCESS, response })
  } catch (error) {
    const data = { status: 'error', message: CustomConstants.SOMETHING_WRONG }
    yield put({ type: Constant.GET_RODENT_DAMAGE_FAILURE, data })
  }
}

export function * CompensationDropdownSaga (params) {
  try {
    const response = yield AxiosIn.get(endpoints.Compensation, params)
    yield put({ type: Constant.GET_COMPENSATION_SUCCESS, response })
  } catch (error) {
    const data = { status: 'error', message: CustomConstants.SOMETHING_WRONG }
    yield put({ type: Constant.GET_COMPENSATION_FAILURE, data })
  }
}

export function * AicCoverDropdownSaga (params) {
  try {
    const response = yield AxiosIn.get(endpoints.AicCover, params)
    yield put({ type: Constant.GET_AIC_COVER_SUCCESS, response })
  } catch (error) {
    const data = { status: 'error', message: CustomConstants.SOMETHING_WRONG }
    yield put({ type: Constant.GET_AIC_COVER_FAILURE, data })
  }
}

export default function * ProfileSaga () {
  yield takeLatest(Constant.GET_LIMIT_DAYS_DATA, LimitDaysDropdownSaga)
  yield takeLatest(Constant.GET_RODENT_DAMAGE_DATA, RodentDamgeDropdownSaga)
  yield takeLatest(Constant.GET_COMPENSATION_DATA, CompensationDropdownSaga)
  yield takeLatest(Constant.GET_AIC_COVER_DATA, AicCoverDropdownSaga)
}

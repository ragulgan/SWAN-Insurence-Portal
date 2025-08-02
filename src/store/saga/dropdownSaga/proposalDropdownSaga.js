import AxiosIn from '../../../helpers/AxiosInterceptor'
import endpoints from '../../services/endpoints'
import { takeLatest, put } from 'redux-saga/effects'
import * as Constant from '../../../store/constants/proposalDropdownConstants'
import * as CustomConstants from '../../../store/constants/CustomConstants'

export function * TotalClaimDropdownSaga () {
  try {
    const response = yield AxiosIn.get(endpoints.GetTotalClaim)
    yield put({ type: Constant.GET_TOTAL_CLAIMS_SUCCESS, response })
  } catch (error) {
    const error_data = { status: 'error', message: CustomConstants.SOMETHING_WRONG }
    yield put({ type: Constant.GET_TOTAL_CLAIMS_FAILURE, error_data })
  }
}

export function * GetLeasingDropdownSaga () {
  try {
    const response = yield AxiosIn.get(endpoints.GetSwnLeasing)
    yield put({ type: Constant.GET_LEASING_SUCCESS, response })
  } catch (error) {
    const error_data = { status: 'error', message: CustomConstants.SOMETHING_WRONG }
    yield put({ type: Constant.GET_LEASING_FAILURE, error_data })
  }
}

export function * XSOptionDropdownSaga (actions) {
  const { params } = actions
  try {
    const response = yield AxiosIn.get(endpoints.XSOption, { params })
    yield put({ type: Constant.GET_XS_OPTION_SUCCESS, response })
  } catch (error) {
    const data = { status: 'error', message: CustomConstants.SOMETHING_WRONG }
    yield put({ type: Constant.GET_XS_OPTION_FAILURE, data })
  }
}

export default function * ProprosolDropDownSaga () {
  yield takeLatest(Constant.GET_TOTAL_CLAIMS_INIT, TotalClaimDropdownSaga)
  yield takeLatest(Constant.GET_LEASING_INIT, GetLeasingDropdownSaga)
  yield takeLatest(Constant.GET_XS_OPTION_INIT, XSOptionDropdownSaga)
}

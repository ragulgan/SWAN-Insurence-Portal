import AxiosIn from '../../helpers/AxiosInterceptor'
import { all, takeEvery, takeLatest, put } from 'redux-saga/effects'
import endpoints from '../services/endpoints'
import * as Constant from '../../store/constants/ClientConstants'
import * as AuthConstant from '../../store/constants/AuthConstants'

export function * ClientSearchSaga (data) {
  const {
    params
  } = data
  try {
    const response = yield AxiosIn.post(endpoints.postClient, params)
    yield put({ type: Constant.SEARCH_CLIENT_SUCCESS, response })
  } catch (error) {
    const data = { status: 'error', message: AuthConstant.SOMETHING_WRONG }
    yield put({ type: Constant.SEARCH_CLIENT_FAILED, data })
  }
}

export default function * ClientSaga () {
  yield takeLatest(Constant.SEARCH_CLIENT_INIT, ClientSearchSaga)
}

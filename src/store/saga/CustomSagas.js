import { all, takeEvery, takeLatest, put, fork, call } from 'redux-saga/effects'
import * as constant from '../../store/constants/CustomConstants'
import { MyCustom } from '../../store/actions/CustomActions'
import ProfileServices from '../../store/services/CustomServices'

export function * CustomSaga (payload) {
  try {
    const response = yield call(ProfileServices.MyCustom, payload)
    yield put({ type: constant.CUSTOM_SUCCESS, response })
  } catch (error) {
    yield put({ type: constant.CUSTOM_FAILED, error })
  }
}

export default function * CustomSagaAll () {
  yield takeLatest(constant.CUSTOM_INIT, CustomSaga)
}

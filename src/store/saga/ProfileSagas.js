import { all, takeEvery, takeLatest, put, fork, call } from 'redux-saga/effects'
import * as Constant from '../../store/constants/ProfileConstants'
import ProfileServices from '../../store/services/ProfileServices'

export function * MyProfileSaga (token) {
  try {
    const response = yield call(ProfileServices.MyProfile, token)
    yield put({ type: Constant.MY_PROFILE_SUCCESS, response })
  } catch (error) {
    yield put({ type: Constant.MY_PROFILE_FAILED, error })
  }
}
export function * MyMenusSaga () {
  try {
    const response = yield call(ProfileServices.MyMenus)
    yield put({ type: Constant.MY_MENUS_SUCCESS, response })
  } catch (error) {
    yield put({ type: Constant.MY_MENUS_FAILED, error })
  }
}

export default function * ProfileSaga () {
  yield takeLatest(Constant.MY_PROFILE_INIT, MyProfileSaga)
  yield takeLatest(Constant.MY_MENUS_INIT, MyMenusSaga)
}

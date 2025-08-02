import { all, takeEvery, put, fork, call } from 'redux-saga/effects'
import * as Constant from '../../store/constants/AuthConstants'
import { AuthActions } from '../../store/actions/AuthActions'
import AuthServices from '../../store/services/AuthServices'
import AxiosIn from '../../helpers/AxiosInterceptor'
import { unsetSessionStorage, setSessionStorage } from '../../helpers/helper'

import { SESSION } from '../../helpers/constants'
import endpoints from '../services/endpoints'
import { constant } from 'lodash'

export function * SignInSaga () {
  yield takeEvery(Constant.SIGNIN_INIT, function * ({ formData }) {
    try {
      const user = yield AxiosIn.post(endpoints.auth, formData)
      if (user?.status === 'error') {
        yield put({ type: Constant.SIGNIN_FAILED, authMessage: user.msg, authStatus: 'error' })
      } else {
        if (typeof user.data?.role !== 'undefined') {
          setSessionStorage(SESSION.AUTH_TOKEN, user.data?.token)
          setSessionStorage(SESSION.AUTH_ROLE, user.data?.role.toLowerCase())
          yield put(AuthActions.UserAuthenticate(user.data?.token, user.data?.role.toLowerCase()))
          yield put({ type: Constant.SIGNIN_SUCCESS, authMessage: Constant.LOGIN_SUCCESS, authStatus: 'success' })
        }
      }
    } catch (err) {
      unsetSessionStorage()
      const data = { status: 'error', message: Constant.SOMETHING_WRONG }
      yield put(AuthActions.ShowMessage(data))
      yield put({ type: Constant.SIGNIN_FAILED, authMessage: Constant.SOMETHING_WRONG, authStatus: 'error' })
    }
  })
}
export function * SignOutSaga () {
  yield takeEvery(Constant.SIGNOUT_INIT, function * () {
    try {
      const signOutUser = yield call(AuthServices.Logout)
      if (signOutUser === 'undefined') {
        unsetSessionStorage()
        yield put(AuthActions.SignOutSuccess(signOutUser))
      } else {
        yield put(AuthActions.ShowMessage(signOutUser.message))
      }
    } catch (err) {
      yield put(AuthActions.ShowMessage(err))
    }
  })
}

export default function * authSaga () {
  yield all([
    fork(SignInSaga),
    fork(SignOutSaga)
  ])
}

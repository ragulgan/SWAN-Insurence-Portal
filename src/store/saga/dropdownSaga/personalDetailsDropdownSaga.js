import AxiosIn from '../../../helpers/AxiosInterceptor'
import endpoints from '../../services/endpoints'
import { takeLatest, put } from 'redux-saga/effects'
import * as Constant from '../../../store/constants/personalDropdownConstants'
import * as CustomConstants from '../../../store/constants/CustomConstants'

export function * TitleDropdownSaga () {
  try {
    const response = yield AxiosIn.get(endpoints.Title)
    yield put({ type: Constant.GET_TITLE_SUCCESS, response })
  } catch (error) {
    const data = { status: 'error', message: CustomConstants.SOMETHING_WRONG }
    yield put({ type: Constant.GET_TITLE_FAILURE, data })
  }
}

export function * OccupationDropdownSaga () {
  try {
    const response = yield AxiosIn.get(endpoints.Occupation)
    yield put({ type: Constant.GET_OCCUPATION_SUCCESS, response })
  } catch (error) {
    const data = { status: 'error', message: CustomConstants.SOMETHING_WRONG }
    yield put({ type: Constant.GET_OCCUPATION_FAILURE, data })
  }
}
export default function * ProfileSaga () {
  yield takeLatest(Constant.GET_TITLE_DATA, TitleDropdownSaga)
  yield takeLatest(Constant.GET_OCCUPATION_DATA, OccupationDropdownSaga)
}

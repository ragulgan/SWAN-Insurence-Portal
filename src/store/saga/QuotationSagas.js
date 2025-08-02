import AxiosIn from '../../helpers/AxiosInterceptor'
import { all, takeEvery, takeLatest, put, fork, call } from 'redux-saga/effects'
import * as Constant from '../../store/constants/QuotationConstants'
import endpoints from '../services/endpoints'

export function * FetchQuotationList (request) {
  const qs = new URLSearchParams(request.params).toString()
  try {
    const url = `${endpoints.GetMotorQuoteList}?${qs}`
    const response = yield AxiosIn.get(url, request.params)
    yield put({ type: Constant.QUOTATION_LIST_SUCCESS, response })
  } catch (error) {
    yield put({ type: Constant.QUOTATION_LIST_FAILED, error })
  }
}

export default function * QuotationSaga () {
  yield takeLatest(Constant.QUOTATION_LIST_INIT, FetchQuotationList)
}

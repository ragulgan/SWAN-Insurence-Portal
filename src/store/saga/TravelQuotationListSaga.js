import AxiosIn from '../../helpers/AxiosInterceptor'
import { all, takeEvery, takeLatest, put, fork, call } from 'redux-saga/effects'
import * as Constant from '../constants/TravelQuotationList'
import endpoints from '../services/endpoints'

export function * FetchTravelQuotationList (request) {
  const qs = new URLSearchParams(request.params).toString()
  try {
    const url = `${endpoints.GetTravelListQuotation}?${qs}`
    const response = yield AxiosIn.get(url, request.params)
    yield put({ type: Constant.TRAVEL_QUOTATION_LIST_SUCCESS, response })
  } catch (error) {
    yield put({ type: Constant.TRAVEL_QUOTATION_LIST_FAILED, error })
  }
}

export default function * TravelQuotationSaga () {
  yield takeLatest(Constant.TRAVEL_QUOTATION_LIST_INIT, FetchTravelQuotationList)
}

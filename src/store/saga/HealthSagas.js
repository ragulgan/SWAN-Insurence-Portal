import { all, takeEvery, takeLatest, put, fork, call } from 'redux-saga/effects'
import * as Constant from 'store/constants/HealthConstants'
import HealthServices from 'store/services/HealthServices'

export function * GetQuotationById (req) {
  try {
    const response = yield call(HealthServices.GetQuotation, req.quoteId)
    yield put({ type: Constant.GET_QUOTATION_INFO_INIT_SUCCESS, response })
  } catch (error) {
    yield put({ type: Constant.GET_QUOTATION_INFO_INIT_FAILED, error })
  }
}
export function * GetHealthPlans (req) {
  try {
    const response = yield call(HealthServices.GetHealthPlans, req.planId)
    yield put({ type: Constant.HEALTH_PLANS_SUCCESS, response })
  } catch (error) {
    yield put({ type: Constant.HEALTH_PLANS_FAILED, error })
  }
}
export function * GetCompanies () {
  try {
    const response = yield call(HealthServices.GetCompanies)
    yield put({ type: Constant.GET_COMPANIES_SUCCESS, response })
  } catch (error) {
    yield put({ type: Constant.GET_COMPANIES_FAILED, error })
  }
}
export function * SaveHealthQuote () {
  try {
    const response = yield call(HealthServices.SaveHealthQuote)
    yield put({ type: Constant.SAVE_HEALTH_QUOTE_SUCCESS, response })
  } catch (error) {
    yield put({ type: Constant.SAVE_HEALTH_QUOTE_FAILED, error })
  }
}
export function * UpdateHealthQuote () {
  try {
    const response = yield call(HealthServices.UpdateHealthQuote)
    yield put({ type: Constant.UPDATE_HEALTH_QUOTE_SUCCESS, response })
  } catch (error) {
    yield put({ type: Constant.UPDATE_HEALTH_QUOTE_FAILED, error })
  }
}

export function * DownloadHealthQuote (req) {
  try {
    const response = yield call(HealthServices.DownloadAllHealthQuote)
    yield put({ type: Constant.DOWNLOAD_QUOTE_SUCCESS, response })
  } catch (error) {
    yield put({ type: Constant.DOWNLOAD_QUOTE_FAILED, error })
  }
}
export function * DownloadSingleQuote (req) {
  try {
    const response = yield call(HealthServices.DownloadSingleHealthQuote)
    yield put({ type: Constant.DOWNLOAD_QUOTE_SINGLE_SUCCESS, response })
  } catch (error) {
    yield put({ type: Constant.DOWNLOAD_QUOTE_SINGLE_FAILED, error })
  }
}
export function * SendHealthQuote (req) {
  try {
    const response = yield call(HealthServices.SendHealthQuote)
    yield put({ type: Constant.SEND_QUOTE_SUCCESS, response })
  } catch (error) {
    yield put({ type: Constant.SEND_QUOTE_FAILED, error })
  }
}
export function * PrintHealthQuote (req) {
  try {
    const response = yield call(HealthServices.PrintHealthQuote)
    yield put({ type: Constant.PRINT_QUOTE_SUCCESS, response })
  } catch (error) {
    yield put({ type: Constant.PRINT_QUOTE_FAILED, error })
  }
}
export function * CancelHealthQuote (req) {
  try {
    const response = yield call(HealthServices.CancelHealthQuote)
    yield put({ type: Constant.CANCEL_QUOTE_SUCCESS, response })
  } catch (error) {
    yield put({ type: Constant.CANCEL_QUOTE_FAILED, error })
  }
}

export default function * ProfileSaga () {
  yield takeLatest(Constant.GET_QUOTATION_INFO_INIT, GetQuotationById)
  yield takeLatest(Constant.HEALTH_PLANS_INIT, GetHealthPlans)
  yield takeLatest(Constant.GET_COMPANIES_INIT, GetCompanies)
  yield takeLatest(Constant.SAVE_HEALTH_QUOTE_INIT, SaveHealthQuote)
  yield takeLatest(Constant.UPDATE_HEALTH_QUOTE_INIT, UpdateHealthQuote)
  yield takeLatest(Constant.DOWNLOAD_QUOTE_INIT, DownloadHealthQuote)
  yield takeLatest(Constant.DOWNLOAD_QUOTE_SINGLE_INIT, DownloadSingleQuote)
  yield takeLatest(Constant.SEND_QUOTE_INIT, SendHealthQuote)
  yield takeLatest(Constant.PRINT_QUOTE_INIT, PrintHealthQuote)
  yield takeLatest(Constant.CANCEL_QUOTE_INIT, CancelHealthQuote)
}

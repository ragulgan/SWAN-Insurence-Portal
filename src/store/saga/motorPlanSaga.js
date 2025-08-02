import AxiosIn from '../../helpers/AxiosInterceptor'
import endpoints from '../services/endpoints'
import { takeLatest, put } from 'redux-saga/effects'
import * as Constant from '../../store/constants/motorPlanConstant'
import * as CustomConstants from '../../store/constants/CustomConstants'

export function * MotorPlanDetailsSaga (request) {
  try {
    const endPointUrl = `${endpoints.MotorPlan}?polcd=${request.polcd}`
    const response = yield AxiosIn.get(endPointUrl)
    yield put({ type: Constant.GET_MOTOR_PLAN_SUCCESS, response })
  } catch (error) {
    const data = { status: 'error', message: CustomConstants.SOMETHING_WRONG }
    yield put({ type: Constant.GET_MOTOR_PLAN_FAILURE, data })
  }
}

export function * ProvisionalQuoteSaga () {
  try {
    const response = yield AxiosIn.get(endpoints.ProvisionalQuote)
    yield put({ type: Constant.GET_PROVISIONAL_QUOTE_SUCCESS, response })
  } catch (error) {
    const data = { status: 'error', message: CustomConstants.SOMETHING_WRONG }
    yield put({ type: Constant.GET_PROVISIONAL_QUOTE_FAILURE, data })
  }
}
export function * DiscountQuoteSaga () {
  try {
    const response = yield AxiosIn.get(endpoints.DiscountQuote)
    yield put({ type: Constant.GET_DISCOUNT_QUOTE_SUCCESS, response })
  } catch (error) {
    const data = { status: 'error', message: CustomConstants.SOMETHING_WRONG }
    yield put({ type: Constant.GET_DISCOUNT_QUOTE_FAILURE, data })
  }
}

export function * DownloadQuoteSaga ({ id }) {
  try {
    const endPointUrl = `${endpoints.GetDownloadQuote}/${id}`
    const response = yield AxiosIn.get(endPointUrl)
    yield put({ type: Constant.GET_DOWNLOAD_QUOTE_SUCCESS, response })
  } catch (error) {
    const error_data = {
      status: 'error',
      message: CustomConstants.SOMETHING_WRONG
    }
    yield put({ type: Constant.GET_DOWNLOAD_QUOTE_FAILURE, error_data })
  }
}

export function * PrintQuoteSaga ({ id }) {
  try {
    const endPointUrl = `${endpoints.GetPrintQuote}/${id}`
    const response = yield AxiosIn.get(endPointUrl)
    yield put({ type: Constant.GET_PRINT_QUOTE_SUCCESS, response })
  } catch (error) {
    const error_data = {
      status: 'error',
      message: CustomConstants.SOMETHING_WRONG
    }
    yield put({ type: Constant.GET_PRINT_QUOTE_FAILURE, error_data })
  }
}

export function * PostCancelQuoteSaga ({ formData }) {
  try {
    const response = yield AxiosIn.post(endpoints.PostCancelQuote, formData)
    yield put({ type: Constant.POST_CANCEL_QUOTE_SUCCESS, response })
  } catch (error) {
    const error_data = {
      status: 'error',
      message: CustomConstants.SOMETHING_WRONG
    }
    yield put({ type: Constant.POST_CANCEL_QUOTE_FAILURE, error_data })
  }
}

export function * PostSendQuoteSaga ({ formData }) {
  try {
    const response = yield AxiosIn.post(endpoints.PostSendQuote, formData)
    yield put({ type: Constant.POST_SEND_QUOTE_SUCCESS, response })
  } catch (error) {
    const error_data = {
      status: 'error',
      message: CustomConstants.SOMETHING_WRONG
    }
    yield put({ type: Constant.POST_SEND_QUOTE_FAILURE, error_data })
  }
}

export function * PostApprovalStatusSaga ({ formData }) {
  try {
    const response = yield AxiosIn.post(endpoints.PostApprovalStatus, formData)
    yield put({ type: Constant.POST_APPROVAL_STATUS_SUCCESS, response })
  } catch (error) {
    const error_data = {
      status: 'error',
      message: CustomConstants.SOMETHING_WRONG
    }
    yield put({ type: Constant.POST_APPROVAL_STATUS_FAILURE, error_data })
  }
}

export function * ReasonCancelDropdownSaga () {
  try {
    const response = yield AxiosIn.get(endpoints.ReasonCancel)
    yield put({ type: Constant.GET_REASON_CANCEL_SUCCESS, response })
  } catch (error) {
    const data = { status: 'error', message: CustomConstants.SOMETHING_WRONG }
    yield put({ type: Constant.GET_REASON_CANCEL_FAILURE, data })
  }
}

export default function * MotorPlanSaga () {
  yield takeLatest(Constant.GET_MOTOR_PLAN_DATA, MotorPlanDetailsSaga)
  yield takeLatest(Constant.GET_PROVISIONAL_QUOTE_DATA, ProvisionalQuoteSaga)
  yield takeLatest(Constant.GET_DISCOUNT_QUOTE_DATA, DiscountQuoteSaga)
  yield takeLatest(Constant.GET_DOWNLOAD_QUOTE_DATA, DownloadQuoteSaga)
  yield takeLatest(Constant.GET_PRINT_QUOTE_DATA, PrintQuoteSaga)
  yield takeLatest(Constant.POST_APPROVAL_STATUS_INIT, PostApprovalStatusSaga)
  yield takeLatest(Constant.POST_SEND_QUOTE_DATA, PostSendQuoteSaga)
  yield takeLatest(Constant.POST_CANCEL_QUOTE_DATA, PostCancelQuoteSaga)
  yield takeLatest(Constant.GET_REASON_CANCEL_DATA, ReasonCancelDropdownSaga)
}

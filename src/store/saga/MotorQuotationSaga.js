import AxiosIn from '../../helpers/AxiosInterceptor'
import endpoints from '../../store/services/endpoints'
import { takeLatest, put } from 'redux-saga/effects'
import * as Constant from '../../store/constants/MotorQuotationConstants'
import * as CustomConstants from '../../store/constants/CustomConstants'

export function * QuoteDetailsSaga ({ id }) {
  try {
    const endPointUrl = `${endpoints.GetMotorQuotation}/${id}`
    const response = yield AxiosIn.get(endPointUrl)
    yield put({ type: Constant.GET_QUOTE_DETAILS_SUCCESS, response })
  } catch (error) {
    const error_data = {
      status: 'error',
      message: CustomConstants.SOMETHING_WRONG
    }
    yield put({ type: Constant.GET_QUOTE_DETAILS_FAILED, error_data })
  }
}
export function * PostPersonalDetailsSaga ({ formData }) {
  try {
    const response = yield AxiosIn.post(endpoints.PostMotorQuotation, formData)
    yield put({ type: Constant.POST_MOTOR_PERSONAL_DETAILS_SUCCESS, response })
  } catch (error) {
    const error_data = {
      status: 'error',
      message: CustomConstants.SOMETHING_WRONG
    }
    yield put({ type: Constant.POST_MOTOR_PERSONAL_DETAILS_FAILED, error_data })
  }
}
export function * PutVechileDetailsSaga ({ formData }) {
  try {
    const response = yield AxiosIn.post(endpoints.PutMotorQuotation, formData)
    yield put({ type: Constant.PUT_VECHILE_DETAILS_SUCCESS, response })
  } catch (error) {
    const error_data = {
      status: 'error',
      message: CustomConstants.SOMETHING_WRONG
    }
    yield put({ type: Constant.PUT_VECHILE_DETAILS_FAILED, error_data })
  }
}
export function * MotorMatrixDropdownSaga (params) {
  try {
    const response = yield AxiosIn.get(endpoints.MotorMatrix, params)
    yield put({ type: Constant.GET_MOTOR_MATRIX_SUCCESS, response })
  } catch (error) {
    const data = { status: 'error', message: CustomConstants.SOMETHING_WRONG }
    yield put({ type: Constant.GET_MOTOR_MATRIX_FAILURE, data })
  }
}
export function * PostExtensionDetailsSaga ({ formData }) {
  try {
    const response = yield AxiosIn.post(endpoints.PostExtensionQuotation, formData)
    yield put({ type: Constant.POST_EXTENSION_DETAILS_SUCCESS, response })
  } catch (error) {
    const error_data = {
      status: 'error',
      message: CustomConstants.SOMETHING_WRONG
    }
    yield put({ type: Constant.POST_EXTENSION_DETAILS_FAILED, error_data })
  }
}
export function * PutQuotationSummarySaga ({ formData }) {
  try {
    const response = yield AxiosIn.post(endpoints.PostMotorQuotation, formData)

    yield put({
      type: Constant.PUT_QUOTATION_SUMMARY_DETAILS_SUCCESS,
      response
    })
  } catch (error) {
    const error_data = {
      status: 'error',
      message: CustomConstants.SOMETHING_WRONG
    }
    yield put({
      type: Constant.PUT_QUOTATION_SUMMARY_DETAILS_FAILED,
      error_data
    })
  }
}
export function * QuoteSummarySaga ({ formData }) {
  try {
    const response = yield AxiosIn.get(endpoints.QuoteSummary, formData)
    yield put({ type: Constant.GET_QUOTE_SUMMARY_SUCCESS, response })
  } catch (error) {
    const error_data = {
      status: 'error',
      message: CustomConstants.SOMETHING_WRONG
    }
    yield put({ type: Constant.GET_QUOTE_SUMMARY_FAILURE, error_data })
  }
}

export function * SmoothRateDetailsSaga ({ id }) {
  try {
    const endPointUrl = `${endpoints.GetSwnSmoothRates}?quotnum=${id}`
    const response = yield AxiosIn.get(endPointUrl)
    yield put({ type: Constant.GET_SMOOTH_RATE_SUCCESS, response })
  } catch (error) {
    const error_data = {
      status: 'error',
      message: CustomConstants.SOMETHING_WRONG
    }
    yield put({ type: Constant.GET_SMOOTH_RATE_FAILED, error_data })
  }
}

export function * PostAMLSaga ({ formData }) {
  try {
    const response = yield AxiosIn.post(endpoints.PostAML, formData)
    yield put({ type: Constant.POST_AML_SUCCESS, response })
  } catch (error) {
    const error_data = {
      status: 'error',
      message: CustomConstants.SOMETHING_WRONG
    }
    yield put({ type: Constant.POST_AML_FAILED, error_data })
  }
}

export function * AmlValidSaga ({ id }) {
  try {
    const endPointUrl = `${endpoints.AmlValid}/${id}`
    const response = yield AxiosIn.get(endPointUrl)
    yield put({ type: Constant.GET_AML_VALID_SUCCESS, response })
  } catch (error) {
    const error_data = {
      status: 'error',
      message: CustomConstants.SOMETHING_WRONG
    }
    yield put({ type: Constant.GET_AML_VALID_FAILURE, error_data })
  }
}

export default function * MotorQuotationSaga () {
  yield takeLatest(Constant.GET_QUOTE_DETAILS_INIT, QuoteDetailsSaga)
  yield takeLatest(Constant.POST_MOTOR_PERSONAL_DETAILS_INIT, PostPersonalDetailsSaga)
  yield takeLatest(Constant.PUT_VECHILE_DETAILS_INIT, PutVechileDetailsSaga)
  yield takeLatest(Constant.POST_EXTENSION_DETAILS_INIT, PostExtensionDetailsSaga)
  yield takeLatest(Constant.PUT_QUOTATION_SUMMARY_DETAILS_INIT, PutQuotationSummarySaga)
  yield takeLatest(Constant.GET_MOTOR_MATRIX_DATA, MotorMatrixDropdownSaga)
  yield takeLatest(Constant.GET_QUOTE_SUMMARY_INIT, QuoteSummarySaga)
  yield takeLatest(Constant.GET_SMOOTH_RATE_INIT, SmoothRateDetailsSaga)
  yield takeLatest(Constant.POST_AML_INIT, PostAMLSaga)
  yield takeLatest(Constant.GET_AML_VALID_DATA, AmlValidSaga)
}

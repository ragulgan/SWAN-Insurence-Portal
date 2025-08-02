import AxiosIn from '../../helpers/AxiosInterceptor'
import endpoints from '../services/endpoints'
import { takeLatest, put } from 'redux-saga/effects'
import * as Constant from '../../store/constants/travelPlanConstant'
import * as CustomConstants from '../../store/constants/CustomConstants'
import { StayPrimaryLandscapeOutlined } from '@material-ui/icons'

export function * TravelPlanDetailsSaga ({ id }) {
  try {
    const endPointUrl = `${endpoints.TravelPlan}/${id}`
    const response = yield AxiosIn.get(endPointUrl)
    yield put({ type: Constant.GET_TRAVEL_PLAN_SUCCESS, response })
  } catch (error) {
    const data = { status: 'error', message: CustomConstants.SOMETHING_WRONG }
    yield put({ type: Constant.GET_TRAVEL_PLAN_FAILURE, data })
  }
}

export function * NonCoverPlanDetailsSaga ({}) {
  try {
    const response = yield AxiosIn.get(endpoints.NonCoverPlan)
    yield put({ type: Constant.GET_NON_COVER_PLAN_SUCCESS, response })
  } catch (error) {
    const data = { status: 'error', message: CustomConstants.SOMETHING_WRONG }
    yield put({ type: Constant.GET_NON_COVER_PLAN_FAILURE, data })
  }
}

export function * BabbagePlanDetailsSaga ({}) {
  try {
    const response = yield AxiosIn.get(endpoints.BabbagePlan)
    yield put({ type: Constant.GET_BABBAGE_PLAN_SUCCESS, response })
  } catch (error) {
    const data = { status: 'error', message: CustomConstants.SOMETHING_WRONG }
    yield put({ type: Constant.GET_BABBAGE_PLAN_FAILURE, data })
  }
}

export function * CountryMatrixSaga (params) {
  try {
    const response = yield AxiosIn.get(endpoints.CountryMatrix, params)
    yield put({ type: Constant.GET_COUNTRY_MATRIX_SUCCESS, response })
  } catch (error) {
    const data = { status: 'error', message: CustomConstants.SOMETHING_WRONG }
    yield put({ type: Constant.GET_COUNTRY_MATRIX_FAILURE, data })
  }
}

export function * PlanMatrixSaga (params) {
  try {
    const response = yield AxiosIn.get(endpoints.PlanMatrix, params)
    yield put({ type: Constant.GET_PLAN_MATRIX_SUCCESS, response })
  } catch (error) {
    const data = { status: 'error', message: CustomConstants.SOMETHING_WRONG }
    yield put({ type: Constant.GET_PLAN_MATRIX_FAILURE, data })
  }
}

export function * PostTravelSendQuoteSaga ({ formData }) {
  try {
    const response = yield AxiosIn.post(endpoints.PostTravelSendQuote, formData)
    yield put({ type: Constant.POST_TRAVEL_SEND_QUOTE_SUCCESS, response })
  } catch (error) {
    const error_data = {
      status: 'error',
      message: CustomConstants.SOMETHING_WRONG
    }
    yield put({ type: Constant.POST_TRAVEL_SEND_QUOTE_FAILURE, error_data })
  }
}

export function * GetTravelCancelQuoteSaga ({ id }) {
  try {
    const endPointUrl = `${endpoints.GetTravelCancelQuote}/${id}`
    const response = yield AxiosIn.get(endPointUrl)
    yield put({ type: Constant.GET_TRAVEL_CANCEL_QUOTE_SUCCESS, response })
  } catch (error) {
    const error_data = {
      status: 'error',
      message: CustomConstants.SOMETHING_WRONG
    }
    yield put({ type: Constant.GET_TRAVEL_CANCEL_QUOTE_FAILURE, error_data })
  }
}

export function * postTravelDownloadQuoteSaga ({ payload }) {
  try {
    const response = yield AxiosIn.post(endpoints.postTravelDownloadQuote, payload)
    yield put({ type: Constant.POST_TRAVEL_DOWNLOAD_QUOTE_SUCCESS, response })
  } catch (error) {
    const error_data = {
      status: 'error',
      message: CustomConstants.SOMETHING_WRONG
    }
    yield put({ type: Constant.POST_TRAVEL_DOWNLOAD_QUOTE_FAILURE, error_data })
  }
}

export default function * TravelPlanSaga () {
  yield takeLatest(Constant.GET_TRAVEL_PLAN_DATA, TravelPlanDetailsSaga)
  yield takeLatest(Constant.GET_NON_COVER_PLAN_DATA, NonCoverPlanDetailsSaga)
  yield takeLatest(Constant.GET_BABBAGE_PLAN_DATA, BabbagePlanDetailsSaga)
  yield takeLatest(Constant.GET_COUNTRY_MATRIX_DATA, CountryMatrixSaga)
  yield takeLatest(Constant.GET_PLAN_MATRIX_DATA, PlanMatrixSaga)
  yield takeLatest(Constant.POST_TRAVEL_SEND_QUOTE_DATA, PostTravelSendQuoteSaga)
  yield takeLatest(Constant.GET_TRAVEL_CANCEL_QUOTE_DATA, GetTravelCancelQuoteSaga)
  yield takeLatest(Constant.POST_TRAVEL_DOWNLOAD_QUOTE_DATA, postTravelDownloadQuoteSaga)
}

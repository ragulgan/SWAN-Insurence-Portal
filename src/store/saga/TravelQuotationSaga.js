import AxiosIn from '../../helpers/AxiosInterceptor'
import endpoints from '../../store/services/endpoints'
import { takeLatest, put } from 'redux-saga/effects'
import * as Constant from '../../store/constants/TravelQuotationConstants'
import * as CustomConstants from '../../store/constants/CustomConstants'

export function * PostPersonalInfoSaga ({ formData }) {
  try {
    const response = yield AxiosIn.post(endpoints.PostTPersonalQuotation, formData)
    yield put({ type: Constant.POST_TPERSONAL_INFO_SUCCESS, response })
  } catch (error) {
    const error_data = {
      status: 'error',
      message: CustomConstants.SOMETHING_WRONG
    }
    yield put({ type: Constant.POST_TPERSONAL_INFO_FAILED, error_data })
  }
}

export function * PostTravelInfoSaga ({ formData }) {
  try {
    const response = yield AxiosIn.post(endpoints.PostTravelInfo, formData)
    yield put({ type: Constant.POST_TRAVEL_INFO_SUCCESS, response })
  } catch (error) {
    const error_data = {
      status: 'error',
      message: CustomConstants.SOMETHING_WRONG
    }
    yield put({ type: Constant.POST_TRAVEL_INFO_FAILED, error_data })
  }
}

export function * QuoteTRDetailsSaga ({ id }) {
  try {
    const endPointUrl = `${endpoints.GetTravelMotorQuotation}/${id}`
    const response = yield AxiosIn.get(endPointUrl)
    yield put({ type: Constant.GET_TR_QUOTE_DETAILS_SUCCESS, response })
  } catch (error) {
    const error_data = {
      status: 'error',
      message: CustomConstants.SOMETHING_WRONG
    }
    yield put({ type: Constant.GET_TR_QUOTE_DETAILS_FAILED, error_data })
  }
}

export function * PostTravelPlanSaga ({ formData }) {
  try {
    const response = yield AxiosIn.post(endpoints.PostTravelPlan, formData)
    yield put({ type: Constant.POST_TRAVEL_PLAN_SUCCESS, response })
  } catch (error) {
    const error_data = {
      status: 'error',
      message: CustomConstants.SOMETHING_WRONG
    }
    yield put({ type: Constant.POST_TRAVEL_PLAN_FAILED, error_data })
  }
}

export function * PostTravelBabbagePlanSaga ({ formData }) {
  try {
    const response = yield AxiosIn.post(endpoints.PostTravelBabbagePlan, formData)
    yield put({ type: Constant.POST_TRAVEL_BABBAGE_PLAN_SUCCESS, response })
  } catch (error) {
    const error_data = {
      status: 'error',
      message: CustomConstants.SOMETHING_WRONG
    }
    yield put({ type: Constant.POST_TRAVEL_BABBAGE_PLAN_FAILED, error_data })
  }
}

export default function * TravelQuotationSaga () {
  yield takeLatest(Constant.POST_TPERSONAL_INFO_INIT, PostPersonalInfoSaga)
  yield takeLatest(Constant.POST_TRAVEL_INFO_INIT, PostTravelInfoSaga)
  yield takeLatest(Constant.GET_TR_QUOTE_DETAILS_INIT, QuoteTRDetailsSaga)
  yield takeLatest(Constant.POST_TRAVEL_PLAN_INIT, PostTravelPlanSaga)
  yield takeLatest(Constant.POST_TRAVEL_BABBAGE_PLAN_INIT, PostTravelBabbagePlanSaga)
}

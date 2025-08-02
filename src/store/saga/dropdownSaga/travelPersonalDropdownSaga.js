import AxiosIn from '../../../helpers/AxiosInterceptor'
import endpoints from '../../../store/services/endpoints'
import { takeLatest, put } from 'redux-saga/effects'
import * as Constant from '../../../store/constants/travelPersonalDropdownConstant'
import * as CustomConstants from '../../../store/constants/CustomConstants'

export function * GetTravelCountrySaga ({ formData }) {
  try {
    const response = yield AxiosIn.get(endpoints.GetTravelCountry, formData)
    yield put({ type: Constant.GET_TRAVEL_COUNTRY_SUCCESS, response })
  } catch (error) {
    const error_data = {
      status: 'error',
      message: CustomConstants.SOMETHING_WRONG
    }
    yield put({ type: Constant.GET_TRAVEL_COUNTRY_FAILED, error_data })
  }
}

export default function * TravelPersonalDropdownSaga () {
  yield takeLatest(Constant.GET_TRAVEL_COUNTRY_DATA, GetTravelCountrySaga)
}

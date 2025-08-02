import { fork } from 'redux-saga/effects'

import personalDetailsDropdownSaga from './dropdownSaga/personalDetailsDropdownSaga'
import vehicleDetailsDropdownSaga from './dropdownSaga/vehicleDetailsDropdownSaga'
import extensionDropdownSaga from './dropdownSaga/extensionDropdownSaga'
import AuthSagas from './AuthSagas'
import ProfileSagas from './ProfileSagas'
import ClientSagas from './ClientSagas'
import CustomerSagas from './CustomerSagas'
import MotorQuotationSaga from './MotorQuotationSaga'
import ProposalSaga from './ProposalSaga'
import ProprosolDropDownSaga from './dropdownSaga/proposalDropdownSaga'
import ProposolSubmitDropdownSaga from './dropdownSaga/proposalSubmitDropdownSaga'
import QuotationSagas from './QuotationSagas'
import MotorPlanSaga from './motorPlanSaga'
import HealthSagas from './HealthSagas'
import TravelQuotationSaga from './TravelQuotationSaga'
import TravelPersonalDropdownSaga from './dropdownSaga/travelPersonalDropdownSaga'
import TravelPlanSaga from './travelPlanSaga'
import TravelListSaga from './TravelQuotationListSaga'

export default function * rootSaga () {
  yield fork(AuthSagas)
  yield fork(ProfileSagas)
  yield fork(personalDetailsDropdownSaga)
  yield fork(vehicleDetailsDropdownSaga)
  yield fork(extensionDropdownSaga)
  yield fork(ClientSagas)
  yield fork(CustomerSagas)
  yield fork(MotorQuotationSaga)
  yield fork(ProposalSaga)
  yield fork(ProprosolDropDownSaga)
  yield fork(ProposolSubmitDropdownSaga)
  yield fork(QuotationSagas)
  yield fork(MotorPlanSaga)
  yield fork(HealthSagas)
  yield fork(TravelQuotationSaga)
  yield fork(TravelPersonalDropdownSaga)
  yield fork(TravelPlanSaga)
  yield fork(TravelListSaga)
}

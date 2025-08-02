import { combineReducers } from 'redux'
import AuthReducer from './reducers/AuthReducer'
import PersonalDropdownReducer from './reducers/dropdownReducer/personalDetailsDropdownReducer'
import VehicleDropdownReducer from './reducers/dropdownReducer/vehicleDetailsDropdownReducer'
import ExtensionDropdownReducer from './reducers/dropdownReducer/extensionDropdownReducer'
import ProfileReducer from './reducers/profileReducer'
import ClientReducer from './reducers/ClientReducer'
import CustomerReducer from './reducers/CustomerReducer'
import QuotationReducer from './reducers/QuotationReducer'
import MotorQuotationReducer from './reducers/MotorQuotationReducer'
import ProposalReducer from './reducers/ProposalReducer'
import ProposalDropdownReducer from './reducers/dropdownReducer/proposalDropdownReducer'
import proposalSubmitDropdownReducer from './reducers/dropdownReducer/proposalSubmitDropdownReducer'
import MotorPlanReducer from './reducers/motorPlanReducer'
import HealthReducer from './reducers/HealthReducer'
import TravelQuotationReducer from './reducers/TravelQuotationReducer'
import travelPersonalDropdownReducer from './reducers/dropdownReducer/travelPersonalDropdownReducer'
import TravelPlanReducer from './reducers/travelPlanReducer'
import TravelQuotationListReducer from './reducers/TravelQuotationListReducer'

export default function createReducer () {
  const rootReducer = combineReducers({
    Auth: AuthReducer,
    Profile: ProfileReducer,
    Client: ClientReducer,
    PersonalDropdown: PersonalDropdownReducer,
    VehicleDropdown: VehicleDropdownReducer,
    ExtensionDropdown: ExtensionDropdownReducer,
    Customer: CustomerReducer,
    MotorQuotation: MotorQuotationReducer,
    Proposal: ProposalReducer,
    ProposalDropDown: ProposalDropdownReducer,
    ProposalSubmitDropDown: proposalSubmitDropdownReducer,
    Quotation: QuotationReducer,
    MotorPlan: MotorPlanReducer,
    Health: HealthReducer,
    TravelQuotation: TravelQuotationReducer,
    personalTRDropdown: travelPersonalDropdownReducer,
    TravelPlan: TravelPlanReducer,
    TravelList: TravelQuotationListReducer
  })

  return rootReducer
}

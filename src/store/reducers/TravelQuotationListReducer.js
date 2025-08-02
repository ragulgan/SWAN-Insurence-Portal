import * as constant from '../constants/TravelQuotationList'
import { getLocalStorage } from '../../helpers/local_storage'
import { getSessionStorage } from '../../helpers/helper'
import { MOTOR_FORM } from '../../helpers/constants'

const initState = {
  quotationLoading: false,
  quotationList: null,
  pageNo: null,
  pageLimit: null,
  pageCount: null,
  quotationId: getSessionStorage(MOTOR_FORM.QUOTE_NUMBER) ? getSessionStorage(MOTOR_FORM.QUOTE_NUMBER) : null,
  quotationStep: getSessionStorage(MOTOR_FORM.ACTIVE_STEP) ? getSessionStorage(MOTOR_FORM.ACTIVE_STEP) : 0,
  loggedUser: getLocalStorage('logged_user') ? getLocalStorage('logged_user') : null,
  loggedAgency: getLocalStorage('logged_agency') ? getLocalStorage('logged_agency') : null,
  loggedCompany: getLocalStorage('logged_company') ? getLocalStorage('logged_company') : null
}

const TravelQuotationReducer = (state = initState, { type, response }) => {
  switch (type) {
    case constant.TRAVEL_QUOTATION_LIST_INIT:
      return {
        ...state,
        quotationLoading: true
      }

    case constant.TRAVEL_QUOTATION_LIST_SUCCESS:
      return {
        ...state,
        quotationLoading: false,
        quotationList: response.data?.quotesList,
        pageNo: response.data?.page,
        pageLimit: response.data?.limit,
        pageCount: response.data?.totalCount
      }

    case constant.TRAVEL_QUOTATION_LIST_FAILED:
      return {
        ...state,
        quotationLoading: false,
        error: response
      }
    default:
      return state
  }
}

export default TravelQuotationReducer

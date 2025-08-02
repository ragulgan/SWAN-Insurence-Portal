import * as Constant from '../../../store/constants/extensionDropdownConstants'

const initState = {
  getLimitDaysLoading: false,
  limitDaysData: null,
  limitDaysStatus: '',
  limitDaysMessage: '',
  getRodentDamgeLoading: false,
  rodentDamgeData: null,
  rodentDamgeStatus: '',
  rodentDamgeMessage: '',
  getCompensationLoading: false,
  compensationData: null,
  compensationStatus: '',
  compensationMessage: '',
  getAicCoverLoading: false,
  aicCoverData: null,
  aicCoverStatus: '',
  aicCoverMessage: ''
}

const ExtensionDropdownReducer = (state = initState, action) => {
  switch (action.type) {
    case Constant.GET_LIMIT_DAYS_DATA:
      return {
        ...state,
        getLimitDaysLoading: true
      }
    case Constant.GET_LIMIT_DAYS_SUCCESS:
      return {
        ...state,
        getLimitDaysLoading: false,
        limitDaysData: action?.response.data,
        limitDaysStatus: action.status,
        limitDaysMessage: action.message
      }
    case Constant.GET_LIMIT_DAYS_FAILURE:
      return {
        ...state,
        getLimitDaysLoading: false,
        limitDaysStatus: action.status,
        limitDaysMessage: action.message
      }
    case Constant.GET_LIMIT_DAYS_CLEAR:
      return {
        ...state,
        limitDaysData: '',
        limitDaysStatus: '',
        limitDaysMessage: ''
      }
    case Constant.GET_RODENT_DAMAGE_DATA:
      return {
        ...state,
        getRodentDamgeLoading: true
      }
    case Constant.GET_RODENT_DAMAGE_SUCCESS:
      return {
        ...state,
        getRodentDamgeLoading: false,
        rodentDamgeData: action?.response.data,
        rodentDamgeStatus: action?.response.status,
        rodentDamgeMessage: action?.response.message
      }
    case Constant.GET_RODENT_DAMAGE_FAILURE:
      return {
        ...state,
        getRodentDamgeLoading: false,
        rodentDamgeStatus: action?.response.status,
        rodentDamgeMessage: action.message
      }
    case Constant.GET_RODENT_DAMAGE_CLEAR:
      return {
        ...state,
        rodentDamgeData: '',
        rodentDamgeStatus: '',
        rodentDamgeMessage: ''
      }
    case Constant.GET_COMPENSATION_DATA:
      return {
        ...state,
        getCompensationLoading: true
      }
    case Constant.GET_COMPENSATION_SUCCESS:
      return {
        ...state,
        getCompensationLoading: false,
        compensationData: action?.response.data,
        compensationStatus: action.status,
        compensationMessage: action.message
      }
    case Constant.GET_COMPENSATION_FAILURE:
      return {
        ...state,
        getCompensationLoading: false,
        compensationStatus: action.status,
        compensationMessage: action.message
      }
    case Constant.GET_COMPENSATION_CLEAR:
      return {
        ...state,
        compensationData: '',
        compensationStatus: '',
        compensationMessage: ''
      }
    case Constant.GET_AIC_COVER_DATA:
      return {
        ...state,
        getAicCoverLoading: true
      }
    case Constant.GET_AIC_COVER_SUCCESS:
      return {
        ...state,
        getAicCoverLoading: false,
        aicCoverData: action?.response.data,
        aicCoverStatus: action.status,
        aicCoverMessage: action.message
      }
    case Constant.GET_AIC_COVER_FAILURE:
      return {
        ...state,
        getAicCoverLoading: false,
        aicCoverStatus: action.status,
        aicCoverMessage: action.message
      }
    case Constant.GET_AIC_COVER_CLEAR:
      return {
        ...state,
        aicCoverData: '',
        aicCoverStatus: '',
        aicCoverMessage: ''
      }
    default:
      return state
  }
}

export default ExtensionDropdownReducer

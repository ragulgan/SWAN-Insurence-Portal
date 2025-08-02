export const SESSION = {
  AUTH_TOKEN: 'auth_token',
  AUTH_ROLE: 'auth_role',
  TOKEN: 'token'
}

export const DATE = {
  TIME: 'Time',
  TIME_INTERVAL: 15,
  TWELVE_HRS_FORMAT: 'h:mm A',
  DATE_TIME_FORMAT: ' D/MM/YYYY, h:mm A',
  DATE_ONLY: 'DD/MM/YYYY',
  DATE_FOR_PICKER: 'yyyy/MM/dd',
  DATE_MONTH_ONLY: 'dd/MM',
  DATE_MONTH_ONLY__: 'DD/MM',
  MONTH_ONLY: 'MM',
  YEAR_ONLY: 'YYYY',
  MONTH_YEAR_ONLY: 'MM/YYYY',
  EXAMPLE_DATE: '2017-03-13',
  DATE_FORMAT: 'YYYY-MM-DD',
  DATE_FORMAT_MINS: 'MMM-DD-YYYY, hh:mm',
  DATE_FOR_PICKER_MONTH: 'MM'
}

export const HEADER = {
  CONTENT_TYPE: 'application/json',
  MULTIPART_CONTENT_TYPE:
    'multipart/form-data,boundary=----WebKitFormBoundaryyrV7KO0BoCBuDbTL',
  TIMEOUT: 60000
}

export const REGEX = {
  EMAIL: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
  DOB: /^\d{2}[-/.]\d{2}[-/.]\d{4}$/,
  PHONE: /^[0][1-9]\d{9}$|^[1-9]\d{9}$/,
  PHONE_NUMBER_8: /^^[0-9]{8}$/,
  PHONE_NUMBER_1: /^[0-9]+(-[0-9]+)+$/,
  PHONE_NUMBER: /^(1\s?)?((\([0-9]{3}\))|[0-9]{3})[\s-]?[\0-9]{3}[\s-]?[0-9]{4}$/,
  PHONE_NUMBER_2: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
  PHONE_NUMBER_3: /\(?([5]{1})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
  HOME_NUMBER: /\(?([0-9]{3})\)?([ .-]?)([0-9]{4})/,
  PHONE_SEPERATOR: /^(\d{1})(\d{3})(\d{4})/,
  HOME_SEPERATOR: /^(\d{3})(\d{4})/,
  NUMERIC: /^[0-9]+$/,
  NUMERIC_CHARS: /^[0-9-]+$/,
  PASSWORD: /^[a-zA-Z0-9@#^\-_$]*$/,
  PASSWORD_MIN_MAX_LENGTH: /(?=^.{7,14}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
  PASSWORD_SMALL_CAPITAL_NUMBER_SPECIAL_CHARS__: /^(?=.*[a-zA-Z0-9_-])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,14}$/,
  PASSWORD_SMALL_CAPITAL_NUMBER_SPECIAL_CHARS: /^(?=.*[a-zA-Z0-9_-])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,14}$/,
  TEXT: /^[a-zA-Z_ ]*$/,
  ALPHA_UPPER_CASE: /^[A-Z]*$/,
  ALPHA_NUMERIC: /^[a-zA-Z0-9 /]*$/,
  MULTI_ZERO: /^0+/,
  ALPHA_NUMERIC_THIRTEEN_CHARS: /^([a-zA-Z0-9_-]){14}$/,
  ALPHA_NUMERIC_TEN_CHARS: /^([a-zA-Z0-9_-]){10}$/,
  ALPHA_NUMERIC_CHARS: /^[a-zA-Z0-9@#^\-_$/]*$/,
  ALPHA_NUMERIC_CHARS_SPACE_: /^[a-zA-Z0-9@^\-_./,àâçéèêëîïôûùüÿñæœ +g]*$/,
  ALPHA_NUMERIC_CHARS_SPACE: /^[a-zA-Z0-9\/àâçéèêëîïôûùüÿñæœ g]*$/,
  ALPHA_SPECIAL_CHARS: /^[a-zA-Z0-9\-_./,àâçéèêëîïôûùüÿñæœ g]*$/,
  ALPHA_NUMERIC_SPECIAL_CHARS: /^[a-zA-Z0-9@^\-_:/'"{}|.,àâçéèêëîïôûùüÿñæœ +g]*$/,
  ALPHA_CHARS_SPACE: /^[a-zA-Z.,àâçéèêëîïôûùüÿñæœ +g]*$/,
  ZIP_CODE: /^([0-9]){6}$/,
  ZIP_CODE_1: /^(?=.*\d.*)[A-Za-z0-9]{3,10}$/,
  CAID_NUMBER: /^([0-9]){6,8}$/,
  BIN_NUMBER: /^([0-9]){4,6}$/,
  NUMERIC_SIX_DIGITS: /^([0-9]{6}|[0-9]{8})$/,
  NUMERIC_FOUR_DIGITS: /^([0-9]){4}$/,
  SPACE: / +/g,
  URL: /^(ftp|http|https):\/\/[^ "]+\.[a-zA-Z]{2,4}$/,
  URL_ONE: /^(ftp|http|https):\/\/[^ "]+$/,
  PASSPORT: /^(?!^0+$)[a-zA-Z0-9]{9}$/
}

export const AUTH_TOKEN = 'sdfa'

export const SWAN_API_URL = 'https://secureuat.swanforlife.com/MotorQuoteApi'
export const SWAN_API_URL_TRAVEL = 'https://secureuat.swanforlife.com/TravelApi'
// export const SWAN_API_URL = `${process.env.REACT_APP_SWAN_API_URL}`

export const API_MESSAGES = {
  SOMETHING_WRONG: 'Something went wrong. Please try again later!'
}

export const STATIC_PERMISSION = [
  'view',
  'create',
  'update',
  'delete',
  'import',
  'export'
]

export const FILE_DOCUMENT = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'text/plain',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/jpeg',
  'image/png',
  'image/jpg',
  'image/svg+xml',
  'image/JPEG',
  'image/PNG',
  'image/JPG'
]

export const SVG_ICONS = {
  HOME: '/icons/Overview.svg',
  CLIENTS: '/icons/Group.svg',
  POLICIES: '/icons/Shield-protected.svg',
  QUOTES: '/icons/Write.svg',
  INSTRUCTIONS: '/icons/Clipboard-list.svg',
  REPORTS: '/icons/Equalizer.svg',
  DEBTORS: '/icons/Archive.svg',
  AGENTPROFILE: '/icons/Wallet.svg',
  MOTOR: '/icons/car.svg',
  QUOTEHOME: 'home',
  QUOTETRAVEL: 'airplane-alt',
  QUOTEHEALTH: 'heart-beat'
}

export const MOTOR_FORM = {
  PERSONAL_DETAILS: 'PERSONAL_DETAILS',
  QUOTE_NUMBER: 'QUOTE_NUMBER',
  APPROVE_STATUS: 'APPROVE_STATUS',
  SET_FORM_DATA: 'SET_FORM_DATA',
  NAME: 'NAME',
  ACTIVE_STEP: 'ACTIVE_STEP',
  PREV_ROUTE_PATH: 'PREV_ROUTE_PATH',
  CURRENT_POLICY_CODE: 'CURRENT_POLICY_CODE',
  EXTENSION_PLAN: 'EXTENSION_PLAN'
}

export const TRAVEL_FORM = {
  PERSONAL_DETAILS: 'TRAVEL_FORM_PERSONAL_DETAILS',
  QUOTE_NUMBER: 'TRAVEL_FORM_QUOTE_NUMBER',
  APPROVE_STATUS: 'TRAVEL_FORM_APPROVE_STATUS',
  SET_FORM_DATA: 'TRAVEL_FORM_SET_FORM_DATA',
  NAME: 'NAME',
  ACTIVE_STEP: 'TRAVEL_FORM_ACTIVE_STEP',
  PREV_ROUTE_PATH: 'TRAVEL_FORM_PREV_ROUTE_PATH',
  TRAVEL_PLAN: 'TRAVEL_PLAN',
  PLAN_ID: 'PLAN_ID',
  TRAVEL_AMOUNT: 'TRAVEL_AMOUNT',
  TRAVEL_BAGGAGE_PLAN: 'TRAVEL_BAGGAGE_PLAN',
  TRAVEL_BAGGAGE_PLAN_ID: 'TRAVEL_BAGGAGE_PLAN_ID'
}

export const GRANTED_USERS = {
  AGENT_CUSTOMER: ['agent', 'customer'],
  BROKER_CUSTOMER: ['broker', 'customer'],
  AGENT_BROKER: ['agent', 'broker'],
  AGENT_BROKER_CUSTOMER: ['agent', 'broker', 'customer'],
  AGENT: ['agent'],
  BROKER: ['broker'],
  CUSTOMER: ['customer']
}

export const VARIABLES = {
  NO_APPROVE_STATUS: 'S-NOAUTOAPPROVAL',
  APPROVE_STATUS: 'S-AUTOAPPROVAL',
  PLAN_ID: 'PLAN_ID',
  STATUS_APPROVE: 'AUTO-APPROVED'
}

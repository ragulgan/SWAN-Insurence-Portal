import moment from 'moment'
import { REGEX } from './constants'

export const setLocalStorage = (key, varToSet) => localStorage.setItem(key, window.btoa(varToSet))
export const setSessionStorage = (key, varToSet) => sessionStorage.setItem(key, window.btoa(varToSet))
export const removeLocalStorage = (key) => localStorage.removeItem(key)
export const removeSessionStorage = (key) => {
  sessionStorage.removeItem(key)
}

export const getLocalStorage = (key) => {
  const getStorage = localStorage.getItem(key)
  try {
    return getStorage ? window.atob(getStorage) : false
  } catch (e) {
    return false
  }
}

export const getSessionStorage = (key) => {
  const getStorage = sessionStorage.getItem(key)
  try {
    return getStorage ? window.atob(getStorage) : false
  } catch (e) {
    return false
  }
}

export const unsetLocalStorage = () => localStorage.clear()
export const unsetSessionStorage = () => sessionStorage.clear()

export const preventIfNotNumber = (e) => !REGEX.NUMERIC.test(e.key) && e.preventDefault()
export const preventIfNotAlphaNumric = (e) => !REGEX.ALPHA_NUMERIC.test(e.key) && e.preventDefault()
export const preventIfNotAlphaChars = (e) => !REGEX.ALPHA_CHARS_SPACE.test(e.key) && e.preventDefault()
export const preventIfNotAlphaNumricSpaceChars = (e) => !REGEX.ALPHA_NUMERIC_CHARS_SPACE.test(e.key) && e.preventDefault()
export const preventSpecialChars = (e) => !REGEX.ALPHA_SPECIAL_CHARS.test(e.key) && e.preventDefault()
export const preventIfNotNumericSpace = (e) => !REGEX.NUMERIC_CHARS.test(e.key) && e.preventDefault()

export const handleTrimWhiteSpace = (e, name, setValue) => {
  const { value } = e.target
  if (value && value.length > 1) {
    const getData = value.replace(/ +/g, ' ')
    setValue(name, getData.trim())
  } else {
    setValue(name, '')
  }
}

export const handleSetError = (e, name, setError, pattern, message) => {
  const { value } = e.target
  if (value.length > 2 && !pattern.test(value)) {
    setError(name, { type: 'custom', message })
  }
}

export const handleTotalClaimError = (e, name, setError, message) => {
  const { value } = e.target
  if (Number(value) > 5) {
    setError(name, { type: 'error', message })
  }
}

export const handleDobError = (name, setError, value, message) => {
  if (moment().diff(value, 'years') <= 18) {
    setError(name, { type: 'custom', message })
  } else {
    setError(name, { type: 'custom', message: '' })
  }
}
export const removeComma = string => {
  if (
    (typeof string === 'string' || string instanceof String) &&
    string.includes(',')
  ) {
    return string.replace(/,/g, '')
  }
  return string
}

export const removeHyphen = string => {
  if (
    (typeof string === 'string' || string instanceof String) &&
    string.includes('-')
  ) {
    return string.replace(/-/g, '')
  }
  return string
}

export const checkResFailed = data => {
  if (
    (typeof data === 'string' || data instanceof String) &&
    data.includes('F-', 0)
  ) {
    return true
  }
  return false
}

export const thousandSeparator = (event) => {
  const addCommas = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  const removeNonNumeric = num => num.toString().replace(/[^0-9]/g, '')
  return addCommas(removeNonNumeric(event.target.value))
}

export const thousandSeparatorByValue = (value) => {
  const addCommas = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  const removeNonNumeric = num => num.toString().replace(/[^0-9]/g, '')
  return addCommas(removeNonNumeric(value))
}

const omitLastTwo = (str) => {
  const getSubstring = str && !str.includes('-')
    ? str.substring(0, str.length - 2)
    : str
  return getSubstring
}

export const phNumberSeparator = (event, phoneRegEx) => {
  const { value } = event.target
  const val = value && value.length > 8 ? omitLastTwo(value && value) : value
  if (phoneRegEx) {
    const checkWhetherPhOrTele = phoneRegEx === REGEX.PHONE_SEPERATOR
    const getPhoneRegEx = checkWhetherPhOrTele ? REGEX.PHONE_SEPERATOR : REGEX.HOME_SEPERATOR
    const ifPhone = checkWhetherPhOrTele ? '$1-$2-$3' : '$1-$2'
    const phone = num => num.toString().replace(getPhoneRegEx, ifPhone)
    const removeNonNumeric = num => num.toString().replace(/[^0-9-@$!%*?&]/g, '')
    return phone(removeNonNumeric(val))
  }
}

export const phoneNuberSeparator = (value) => {
  const val = value && value.length > 8 ? omitLastTwo(value && value) : value
  const phone = num => num.toString().replace(/^(\d{1})(\d{3})(\d{4})/, '$1-$2-$3')
  const removeNonNumeric = num => num.toString().replace(/[^0-9-@$!%*?&]/g, '')
  return phone(removeNonNumeric(val))
}

export const splitPhoneNuber = (value) => {
  const getNumber = value && value.split(' / ')
  const ph = getNumber[1] ? phoneNuberSeparator(getNumber[1]) : ''
  const tele = getNumber[0] ? phoneNuberSeparator(getNumber[0]) : ''
  return {
    ph, tele
  }
}

export const removeCharsFromString = (string, regex) => {
  if (typeof string === 'string' || string instanceof String) {
    return string.replace(regex, '')
  }
}

export const removeErrString = (string) => {
  if (typeof string === 'string' || string instanceof String) {
    const s = string.replaceAll('F-<br />', '')
    return s.replaceAll('<br />', '')
  }
}

export const removeLeadingZero = (e, name, setValue) => {
  const { value } = e.target
  if (value && value.length > 1) {
    const getData = value.replace(/^0+/, 0)
    setValue(name, getData.trim())
  } else {
    setValue(name, '')
  }
}

export const functionallyOnclick = (id) => {
  const btn = document.getElementById(id)
  btn && btn.click()
}

export const handleLeadingZeroWhiteSpace = (
  e, name, setValue,
  pattern, setError, message
) => {
  const { value } = e.target
  if (value && value.length > 1) {
    const trimSpace = value.replace(/ +/g, ' ').trim()
    const removeZero = trimSpace.replace(/^0+/, 0).trim()
    setValue(name, removeZero)
    if (pattern && !pattern.test(value)) {
      setError(name, { type: 'custom', message })
    }
  } else {
    setValue(name, '')
  }
}

export const handleLeadingZeroWhiteSpaceSingle = (
  e, name, setValue,
  pattern, setError, message
) => {
  const { value } = e.target
  if (value && value.length > 1) {
    const trimSpace = value.replace(/ +/g, ' ').trim()
    const removeZero = trimSpace.replace(/^0+/, 0).trim()
    setValue(name, removeZero)
    if (pattern && !pattern.test(value)) {
      setError(name, { type: 'custom', message })
    }
  }
}

export const removeLeadingZeroCammo = (e, name, setValue) => {
  const { value } = e.target
  if (value && value.length > 2) {
    const getData = value.replace(/^[0,]+/, 0)
    setValue(name, getData.trim())
  } else {
    setValue(name, '')
  }
}

export const removeLeadingZeroAllowSingleCammo = (e, name, setValue) => {
  const { value } = e.target
  if (value && value.length > 1) {
    const getData = value.replace(/^[0,]+/, 0)
    setValue(name, getData.trim())
  }
}

export const makeQueryString = (params) => {
  const queryString = Object.entries(params)
    .filter(([_, value]) => value !== null && value !== undefined)
    .map(([key, value]) => `${key}=${value}`).join('&')

  return queryString
}

export const removeSingleZero = (e, name, setValue) => {
  const { value } = e.target
  if (value) {
    const getData = value && value.replace(/^[0,]+/, '')
    setValue(name, getData && getData.trim())
  } else {
    setValue(name, '')
  }
}

export const toInputUppercase = (e) => {
  const { value } = e.target
  const convertCase = value.toUpperCase()
  return convertCase
}

export const isValidDate = (e, name, setError, message) => {
  const { value } = e.target
  var datePattern = /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
  var matchArray = value.match(datePattern);
  if (matchArray == null) {
      setError(name, { type: 'custom', message })
  }
  var dateString = value.replace(/\D/g, ''); 
  var year = parseInt(dateString.substr(0, 4));
  var month = parseInt(dateString.substr(4, 2));
  var day = parseInt(dateString.substr(6, 2));
  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) {
      daysInMonth[1] = 29;
  }
  if (month < 1 || month > 12 || day < 1 || day > daysInMonth[month - 1]) {
      setError(name, { type: 'custom', message })
  }
  return true;
}

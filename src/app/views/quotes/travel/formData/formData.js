import _ from 'lodash'
import moment from 'moment'
import { DATE, TRAVEL_FORM } from '../../../../../helpers/constants'
import { ERROR } from '../../../../../helpers/messages'
import { getDefaultOptions } from '../../../../../helpers/utils'
import { getLocalStorage, removeHyphen } from '../../../../../helpers/helper'

export const getPersonalInfoPayloadTR = (data) => {
  if (!_.isEmpty(data)) {
    const getQuoteNo = getLocalStorage(TRAVEL_FORM.QUOTE_NUMBER)
    return {
      ...data,
      Citizen: data.Citizen ? 'True' : 'False',
      NEWCLN: data.NEWCLN,
      OCCUPATION: '',
      OTHOCCUPATION: '',
      DTBIRTH: moment(data.DTBIRTH).format(DATE.DATE_ONLY),
      PHONENUMBER: removeHyphen(data.PHONENUMBER),
      CONTACTNO: removeHyphen(data.CONTACTNO),
      QUOTETYPE: 'individual',
      QUOTENUM: getQuoteNo || '',
      AGENCIES: '01',
      USERLOGIN: 'TESTUSER'
    }
  }
}

export const setDestinationList = (countryArr, selectedValue) => {
  if (!_.isEmpty(countryArr)) {
    const country = getDefaultOptions(
      countryArr, 'COUNTRYNAME', 'COUNTRYCODE'
    )
    const selOption = _.filter(country, (x) => {
      if (_.includes(selectedValue, x.label)) { return x }
    })
    return selOption
  }
}

export const handleGetValueOfArr = (array, name) => {
  return array && array.length > 0 ? array.map(a => a[name]) : []
}

export const getDestinationList = (array) => {
  if (!_.isEmpty(array)) {
    const arr = []
    array.forEach((item) => {
      arr.push({ Destination: item.label })
    })
    return arr
  }
}

export const getPassPortNo = (string) => {
  return string &&
  string.startsWith('PAS')
    ? string.replace('PAS-', '')
    : ''
}

export const resetPersonalValues = (item, reset) => {
  if (item.FNAME) {
    reset(formValues => ({
      ...formValues,
      AGENCIES: item.AGENCIES,
      USERLOGIN: item.USERLOGIN,
      QUOTETYPE: item.QUOTETYPE,
      Citizen: !item.NIC.startsWith('PAS'),
      TITLE: item.TITLE,
      FNAME: item.FNAME,
      LNAME: item.LNAME,
      NIC: !item.NIC.startsWith('PAS') ? item.NIC : '',
      PASSPORTNO: getPassPortNo(item.NIC),
      DTBIRTH: moment(item.DTBIRTH),
      CONTACTNO: item.CONTACTNO,
      PHONENUMBER: item.PHONENUMBER,
      EMAIL: item.EMAIL
    }))
  }
}

const arrrrrrr = [
  { Title: 'Mrs.', RELATIONSHIP: 'Self', FNAME: 'don', DTBIRTH: '06/12/1995', AGE: '27' }
]

const setOtherTraveler = (array, item) => {
  const arr = []
  _.forEach(array, (value) => {
    if (value && value.RELATIONSHIP === 'Self') {
      arr.push({
        ...value,
        Title: item.Title,
        RELATIONSHIP: 'Self',
        DTBIRTH: moment(item.DTBIRTH),
        FNAME: `${item.FNAME} ${item.LNAME}`,
        AGE: moment().diff(moment(item.DTBIRTH), 'years')
      })
    }
  })
  return arr
}

export const otherDobValidation = (
  getDOB, relateWatcher, setMessage, setError, setErrorPop, setIsDisable,
  clearErrors, getIndex
) => {
  const dob = moment(getDOB)?.format('YYYY')
  const YearWatcher = moment().format('YYYY')
  if (YearWatcher && dob !== 'Invalid date') {
    const subValue = YearWatcher - dob
    const result = subValue < 18
    const checkLimit = subValue > 18
    if (relateWatcher !== 'Child' && result) {
      setMessage(ERROR.REL_DOB_LESS)
      setError(`OthTravellersList.${getIndex}.RELATIONSHIP`,
        { type: 'error', shouldFocus: true, message: '' })
      setErrorPop(result)
      setIsDisable(true)
    } else if (relateWatcher === 'Child' && checkLimit) {
      setMessage(ERROR.REL_DOB_MORE)
      setError(`OthTravellersList.${getIndex}.RELATIONSHIP`,
        { type: 'error', shouldFocus: true, message: '' })
      setErrorPop(checkLimit)
      setIsDisable(true)
    } else {
      setIsDisable(false)
      clearErrors(`OthTravellersList.${getIndex}.RELATIONSHIP`)
    }
  }
}

const setOtherNotTraveler = (array, item) => {
  const arr = []
  _.forEach(array, (value) => {
    if (value && value.RELATIONSHIP !== 'Self') {
      arr.push({
        ...value,
        Title: item.Title,
        RELATIONSHIP: 'Self',
        DTBIRTH: moment(item.DTBIRTH),
        FNAME: item.FNAME,
        AGE: moment().diff(moment(item.DTBIRTH), 'years')
      })
    }
  })
  return arr
}

const setSelectedOtherTraveler = (array) => {
  const arr = []
  _.forEach(array, (value) => {
       arr.push({
      ...value,
      Title: value.Title,
      RELATIONSHIP: value.RELATIONSHIP,
      DTBIRTH: moment(value.DTBIRTH),
      FNAME: value.FNAME,
      AGE: moment().diff(moment(value.DTBIRTH), 'years')
    })
  })
  return arr
}

export const resetTravelPlanValues = (
  item,
  reset,
  countryData
) => {
  const getPropsValues = handleGetValueOfArr(item.DestinationList, 'Destination')
  if (item.DestinationList && item.DestinationList.length > 0) {
    reset(formValues => ({
      ...formValues,
      CHSHRCOVER: item.CHSHRCOVER,
      DestinationList: countryData && countryData.length > 0
        ? setDestinationList(countryData, getPropsValues)
        : [],
      DTFROM: moment(item.DTFROM),
      DTTO: moment(item.DTTO),
      isTraveller: item.AMONGTRVLR,
      OthTravellersList: setSelectedOtherTraveler(item.OthTravellersList)
    }))
  }
}

export const resetTravelPlanifTraveller = (
  item, reset
) => {
  if (item.personalData.NIC) {
    reset(formValues => ({
      ...formValues,
      isTraveller: item.isUserTraveler,
      // isTraveller: getPassPortNo(item.NIC),
      OthTravellersList: setOtherTraveler(arrrrrrr, item.personalData)
    }))
  }
}

export const resetTravelPlanifNotTraveller = (
  item, reset
) => {
  if (item.NIC) {
    reset(formValues => ({
      ...formValues,
      isTraveller: item.AMONGTRVLR,
      OthTravellersList: setOtherNotTraveler(arrrrrrr, item)
    }))
  }
}

const getPersonAge = (array) => {
  const getNoOfChilds = _.filter(array, (x) => {
    if (moment().diff(moment(x.DTBIRTH), 'years') <= 18) { return x }
  })
  const getNoOfAdults = _.filter(array, (x) => {
    if (moment().diff(moment(x.DTBIRTH), 'years') >= 18) { return x }
  })
  return {
    noOfChilds: getNoOfChilds.length,
    noOfAdults: getNoOfAdults.length
  }
}

const omittedFields = (array) => {
  const arr = []
  _.forEach(array, (value) => {
    if (value) {
      arr.push({
        ...value,
        DTBIRTH: moment(value.DTBIRTH).format(DATE.DATE_ONLY)
      })
    }
  })
  return arr
}

export const getTravelerPayload = (data) => {
  if (!_.isEmpty(data)) {
    const omitted = _.omit(data, [
      'NEWCLN',
      'isTraveller',
      'fields',
      'index',
      'dob',
      'getOtherTravelerValues',
      'child_share',
      'countriesList',
      'CITIZEN',
      'CLIENTNUM',
      'QUOSTATUS'
    ])
    const getPersonDetails = getPersonAge(data.OthTravellersList)
    const getNoDays = () => {
      const x = moment(data.DTFROM).diff(moment(data.DTTO), 'days')
      return Math.abs(x)
    }
    return {
      ...omitted,
      DestinationList: getDestinationList(data.DestinationList),
      CHSHRCOVER: data.CHSHRCOVER,
      OthTravellersList: omittedFields(data.getOtherTravelerValues),
      DTTO: moment(data.DTTO).format(DATE.DATE_ONLY),
      DTFROM: moment(data.DTFROM).format(DATE.DATE_ONLY),
      DTBIRTH: moment(data.DTBIRTH).format(DATE.DATE_ONLY),
      QUOTETYPE: 'individual',
      CHILDREN: getPersonDetails.noOfChilds,
      NODAYS: getNoDays(),
      ADULTS: getPersonDetails.noOfAdults,
      AMONGTRVLR:  data.isTraveller
    }
  }
}

export const getDateDiff = (from, to, format) => {
  const x = moment(from).diff(moment(to), format)
  return Math.abs(x)
}

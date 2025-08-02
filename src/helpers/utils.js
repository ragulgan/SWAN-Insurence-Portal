import _ from 'lodash'

export const color = {
  tangerine: '#00a2ff',
  peach: '#00a2ff',
  redSand: '#00a2ff',
  black: '#000000',
  gray: 'gray',
  white: '#ffffff',
  bgGray: '#f8fafb',
  outerSpace: '#414a4c',
  ebony: '#1b1b1b',
  purple: '#800080',
  iris: '#5D3FD3',
  lightPurple: '#CF9FFF',
  violet: '#89769f'
}

export const customStyles = {
  control: styles => ({
    ...styles
    // zIndex: 10000
  }),
  menu: provided => ({ ...provided, zIndex: 10 }),
  option: (provided, state) => ({
    ...provided,
    zIndex: 10,
    color: state.isSelected ? color.gray : color.black,
    background: state.isSelected ? color.white : color.white
  })
}

export const getDefaultOptions = (data, name, value) => {
  const defaultOptions = []
  if (!_.isEmpty(data)) {
    data.map((item) =>
      defaultOptions.push({
        label: `${item[name] ? item[name] : ''}`,
        value: `${item[value] ? item[value] : ''}`
      })
    )
    return defaultOptions
  }
}

export const onclickFunctionally = (id) => {
  const getBtn = document.getElementById(id)
  getBtn && getBtn.click()
}

export const omittedKeys = (array) => {
  _.map(array, (value) => {
    if (value) {
      return _.omit(value, ['id'])
    }
  })
}

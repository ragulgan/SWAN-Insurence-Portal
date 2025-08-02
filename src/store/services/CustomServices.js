import env from '../../helpers/env_config'

const { API_BASE_URL } = env
const CustomServices = {}

CustomServices.MyCustom = function (email, password) {
  const MyCustom = API_BASE_URL + '/master/login'
  const parameters = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  }

  return fetch(MyCustom, parameters).then(response => {
    return response.json()
  }).then(json => {
    return json
  })
}

export default CustomServices

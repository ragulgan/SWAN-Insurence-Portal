import AxiosIn from '../../helpers/AxiosInterceptor'
import _ from 'lodash'

const ClientServices = {}

const clients = [
  {
    client_no: '0001',
    lastname: 'Robbie',
    firstname: 'Bill Robbie',
    dob: '10-03-2001',
    nic: 'H1Z23098666601'
  },
  {
    client_no: '0002',
    lastname: 'Robert',
    firstname: 'James',
    dob: '11-09-1983',
    nic: 'H1Z23098666601'
  },
  {
    client_no: '0003',
    lastname: 'Jenny',
    firstname: 'Penny',
    dob: '11-09-1983',
    nic: 'H1Z23098666601'
  },
  {
    client_no: '0004',
    lastname: 'Dwayne',
    firstname: 'Jhonson',
    dob: '11-09-1983',
    nic: 'H1Z23098666601'
  },
  {
    client_no: '0005',
    lastname: 'Michael',
    firstname: 'Brown',
    dob: '11-09-1983',
    nic: 'H1Z23098666601'
  }
]
ClientServices.Search = function (params) {
  // return AxiosIn({
  //     url: '/users',
  //     method: 'get'
  // })
  return clients
}

export default ClientServices

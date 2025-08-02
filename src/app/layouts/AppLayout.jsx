import React from 'react'
import { shallowEqual, useSelector } from 'react-redux'

import CustomerRoutes from '../CustomerRoutes'
import BrokerRoutes from '../BrokerRoutes'
import AgentRoutes from '../AgentRoutes'

function RoleBasedRoutes (authRole) {
  switch (authRole) {
    case 'customer':
      return <CustomerRoutes customer={authRole} />
    case 'broker':
      return <BrokerRoutes broker={authRole} />
    case 'agent':
      return <AgentRoutes agent={authRole} />
    default:
      return null
  }
}

const AppLayout = () => {
  const { authRole } = useSelector(
    ({ Auth }) => ({
      authRole: Auth.authRole
    }),
    shallowEqual
  )

  return (
    <section className='swan-pages'>
      {RoleBasedRoutes(authRole)}
    </section>
  )
}

export default AppLayout

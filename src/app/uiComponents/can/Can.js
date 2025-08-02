import React from 'react'
import PropTypes from 'prop-types'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorHandler from '../errorHandler'

// const check = (usersPermissions, componentPermissions) => {
//   if (
//     (componentPermissions && componentPermissions.includes(usersPermissions)) ||
//     usersPermissions === '*'
//   ) {
//     return true
//   }
//   return false
// }

const check = (
  usersPermissions,
  componentPermissions,
  grantedUsers,
  userType
) => {
  if (
    ((componentPermissions && componentPermissions.includes(usersPermissions)) ||
    usersPermissions === '*') && grantedUsers.includes(userType)
  ) {
    return true
  }
  return false
}

const Can = props => {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorHandler}
      onReset={() => {
        // reset the state of your app so the error doesn't happen again
      }}
    >
      {check(
        props.usersPermissions,
        props.componentPermissions,
        props.grantedUsers,
        props.userType
      )
        ? props.yes()
        : props.no()}
    </ErrorBoundary>
  )
}

Can.propTypes = {
  usersPermissions: PropTypes.any,
  userType: PropTypes.any,
  grantedUsers: PropTypes.any,
  componentPermissions: PropTypes.array.isRequired,
  yes: PropTypes.func.isRequired,
  no: PropTypes.func.isRequired
}

export default Can

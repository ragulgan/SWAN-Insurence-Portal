import React from 'react'
import PropTypes from 'prop-types'
import { ErrorBoundary } from 'react-error-boundary'
import { Box, CircularProgress } from '@material-ui/core'
import ErrorHandler from '../errorHandler'

const ShowField = (props) => {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorHandler}
      onReset={() => {
        // reset the state of your app so the error doesn't happen again
      }}
    >
      {
         props.showInProgress
           ? <Box
               display='flex'
               flexDirection='column' justifyContent='center'
               alignItems='center'
             >
             <CircularProgress className='splash-screen-spinner' size={30} />
           </Box>
           : props.show
             ? props.yes()
             : props.no() ? props.no() : null
      }
    </ErrorBoundary>
  )
}

ShowField.propTypes = {
  showInProgress: PropTypes.bool,
  // showLoader: PropTypes.bool,
  show: PropTypes.bool.isRequired,
  yes: PropTypes.func.isRequired,
  no: PropTypes.func.isRequired
}

export default ShowField

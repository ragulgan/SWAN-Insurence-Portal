import React from 'react'
import FormPersonalDetails from './_FormPersonalInfo'

const StepHealthPersonalDetails = (props) => {
  return (
    <FormPersonalDetails
      fromPage={props.fromPage}
      quote={props.quote}
    />
  )
}
export default StepHealthPersonalDetails

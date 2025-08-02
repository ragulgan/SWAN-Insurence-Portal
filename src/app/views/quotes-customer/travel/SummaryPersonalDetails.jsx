import React from 'react'
import FormPersonalDetails from './_FormPersonalInfo'

const StepTravelPersonalDetails = (props) => {
  return (
    <FormPersonalDetails
      fromPage={props.fromPage}
      back={props.back}
      next={props.next}
    />
  )
}

export default StepTravelPersonalDetails

import React from 'react'
import FormTravelPlansDetails from './_FormTravelPlans'

const StepTravelPlansDetails = (props) => {
  return (
    <FormTravelPlansDetails
      fromPage={props.fromPage}
      back={props.back}
      next={props.next}
    />
  )
}

export default StepTravelPlansDetails

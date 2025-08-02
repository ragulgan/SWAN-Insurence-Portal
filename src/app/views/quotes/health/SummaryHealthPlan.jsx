import React from 'react'
import StepPlanSelectionDetails from './_FormPlanSelection'

const StepHealthPlansDetails = (props) => {
  return (
    <StepPlanSelectionDetails
      fromPage={props.fromPage}
      quote={props.quote}
    />
  )
}
export default StepHealthPlansDetails

import React from 'react'
import FormPlans from './_FormPlans'

const StepMotorPlans = (props) => {
  //console.log("StepMotorPlans", props.quoteNumber)
  return (
    <FormPlans
      fromPage={props.fromPage}
      back={props.back}
      next={props.next}
      changeStep={props.changeStep}
      activeQuote={props.activeQuote}
      quoteNumber={props.quoteNumber}
    />
  )
}

export default StepMotorPlans

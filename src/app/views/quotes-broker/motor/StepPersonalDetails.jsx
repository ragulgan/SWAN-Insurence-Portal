import React from 'react'
import FormPersonalDetails from './_FormPersonalDetails'

const StepMotorPersonalDetails = (props) => {
  //console.log("StepMotorPersonalDetails", props.quoteNumber)
  return (
    <FormPersonalDetails
      fromPage={props.fromPage}
      back={props.back}
      next={props.next}
      activeQuote={props.activeQuote}
      quoteNumber={props.quoteNumber}
      changeStep={props.changeStep}
    />
  )
}

export default StepMotorPersonalDetails

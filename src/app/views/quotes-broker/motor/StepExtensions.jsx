import React, { Fragment } from 'react'
import FormExtensions from './_FormExtensions'

const StepMotorExtensions = (props) => {
  //console.log("StepMotorExtensions", props.quoteNumber)
  return (
    <FormExtensions
      fromPage={props.fromPage}
      back={props.back}
      next={props.next}
      activeQuote={props.activeQuote}
      quoteNumber={props.quoteNumber}
      changeStep={props.changeStep}
    />
  )
}

export default StepMotorExtensions

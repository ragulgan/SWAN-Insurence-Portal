import React from 'react'
import FormExtensions from './_FormExtensions'

const StepMotorExtensions = (props) => {
  return (
    <FormExtensions
      fromPage={props.fromPage}
      back={props.back}
      next={props.next}
      activeQuote={props.activeQuote}
      quoteNumber={props.quoteNumber}
    />
  )
}

export default StepMotorExtensions

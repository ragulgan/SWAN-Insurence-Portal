import React from 'react'
import FormSubmitInstruction from './_FormSubmitInstruction'

const StepSubmitInstruction = (props) => {
  return (
    <FormSubmitInstruction
      fromPage={props.fromPage}
      back={props.back}
      next={props.next}
    />
  )
}

export default StepSubmitInstruction

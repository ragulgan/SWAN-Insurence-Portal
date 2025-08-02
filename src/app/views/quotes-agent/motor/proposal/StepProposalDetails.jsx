import React from 'react'
import FormProposalDetails from './_FormProposalDetails'

const StepMotorProposalDetails = (props) => {

  console.log("props.quoteNumber", props.quoteNumber)
  return (
    <FormProposalDetails
      fromPage={props.fromPage}
      back={props.back}
      next={props.next}
      quoteNumber={props.quoteNumber}
    />
  )
}

export default StepMotorProposalDetails

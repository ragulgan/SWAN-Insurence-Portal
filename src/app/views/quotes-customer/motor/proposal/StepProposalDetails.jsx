import React from 'react'
import FormProposalDetails from './_FormProposalDetails'

const StepMotorProposalDetails = (props) => {
  return (
    <FormProposalDetails
      fromPage={props.fromPage}
      back={props.back}
      next={props.next}
    />
  )
}

export default StepMotorProposalDetails

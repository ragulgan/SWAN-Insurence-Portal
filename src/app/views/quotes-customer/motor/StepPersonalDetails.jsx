import React from 'react'
import FormPersonalDetails from './_FormPersonalDetails'

const StepMotorPersonalDetails = (props) => {
  return (
    <FormPersonalDetails
      fromPage={props.fromPage}
      back={props.back}
      next={props.next}
      quotationId={props.quotationId}
      changeStep={props.changeStep}
    />
  )
}

export default StepMotorPersonalDetails

import React from 'react'
import FormVehicleDetails from './_FormVehicleDetails'

const StepMotorVehicleDetails = (props) => {
  //console.log("StepMotorVehicleDetails", props.quoteNumber)
  return (
    <FormVehicleDetails
      fromPage={props.fromPage}
      back={props.back}
      next={props.next}
      activeQuote={props.activeQuote}
      quoteNumber={props.quoteNumber}
      changeStep={props.changeStep}
    />
  )
}

export default StepMotorVehicleDetails

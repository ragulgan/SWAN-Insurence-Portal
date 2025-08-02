import React from 'react'
import FormVehicleDetails from './_FormVehicleDetails'

const StepMotorVehicleDetails = (props) => {
  return (
    <FormVehicleDetails
      fromPage={props.fromPage}
      back={props.back}
      next={props.next}
      activeQuote={props.activeQuote}
      quoteNumber={props.quoteNumber}
    />
  )
}

export default StepMotorVehicleDetails

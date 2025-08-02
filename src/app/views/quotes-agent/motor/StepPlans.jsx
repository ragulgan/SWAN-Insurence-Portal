import React from 'react'
import FormPlans from './_FormPlans'

const StepMotorPlans = (props) => {
  return (
    <FormPlans
      fromPage={props.fromPage}
      back={props.back}
      next={props.next}
    />
  )
}

export default StepMotorPlans

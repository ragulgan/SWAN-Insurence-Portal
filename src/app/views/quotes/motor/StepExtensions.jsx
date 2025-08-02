import React, { Fragment } from 'react'
import FormExtensions from './_FormExtensions'

const StepMotorExtensions = (props) => {
  return (
    <FormExtensions
      fromPage={props.fromPage}
      back={props.back}
      next={props.next}
    />
  )
}

export default StepMotorExtensions

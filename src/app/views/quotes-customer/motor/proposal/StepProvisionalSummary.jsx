import React, { useEffect } from 'react'
import ProvisionalSummary from './ProvisionalStep'

const StepProvisionalSummary = (props) => {
  return (
    <ProvisionalSummary
      fromPage={props.fromPage}
      back={props.back}
      next={props.next}
    />
  )
}

export default StepProvisionalSummary

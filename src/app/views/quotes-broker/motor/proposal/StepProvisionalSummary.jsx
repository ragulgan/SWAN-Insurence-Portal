import React, { useEffect } from 'react'
import ProvisionalSummary from './ProvisionalStep'

const StepProvisionalSummary = (props) => {
  useEffect(() => {
    document.body.classList.add('aside-minimize')
    return () => {
      document.body.classList.remove('aside-minimize')
    }
  }, [])

  return (
    <ProvisionalSummary
      fromPage={props.fromPage}
      back={props.back}
      next={props.next}
    />
  )
}

export default StepProvisionalSummary

import React from 'react'
import ViewTravelQuote from './_FormViewQuotes'

const StepTravelViewQuotes = (props) => {
  return (
    <ViewTravelQuote
      fromPage={props.fromPage}
      back={props.back}
      next={props.next}
    />
  )
}

export default StepTravelViewQuotes

import React, { useState } from 'react'
import { Grid, Fade } from '@material-ui/core'
import _ from 'lodash'

const PlanSelectValidateNotify = (props) => {
  const { size, show, errors, clear } = props
  const [state, setState] = useState({
    	vertical: 'bottom',
    	horizontal: 'left'
  	})
  	const { vertical, horizontal } = state

  	const ErrorMessages = () => {
  		return _.size(errors) === 1
      ? (
        <Grid
          container
          direction='row'
          justifyContent='center'
          alignItems='center'
          className='validation-widget'
          spacing={0}
        >
          <Grid item xs={10}>
            <p>Please select a plan to proceed</p>
          </Grid>
          <Grid item xs={2}>
            <span onClick={clear}>CLOSE</span>
          </Grid>
        </Grid>
  		)
      : null
  }

  return show ? <ErrorMessages /> : null
}

export default PlanSelectValidateNotify

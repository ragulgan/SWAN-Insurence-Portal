import React, { useState } from 'react'
import { Grid, Fade } from '@material-ui/core'
import _ from 'lodash'

const AgeValidateNotify = (props) => {
  const { close } = props
  const [state, setState] = useState({
    	vertical: 'bottom',
    	horizontal: 'left'
  	})
  	const { vertical, horizontal } = state

  		return (
    <Grid
      container
      direction='row'
      justifyContent='center'
      alignItems='center'
      className='validation-widget'
      spacing={0}
    >
      <Grid item xs={10}>
        <p>Member not eligible for <br /> insurance.</p>
      </Grid>
      <Grid item xs={2}>
        <span onClick={close}>CLOSE</span>
      </Grid>
    </Grid>
  		)
}

export default AgeValidateNotify

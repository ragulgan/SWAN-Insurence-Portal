import React, { useState } from 'react'
import { Grid, Fade } from '@material-ui/core'
import _ from 'lodash'

const SpouseValidateNotify = (props) => {
  const { clear, open } = props
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
        <p>Please fill in all mandatory fields<br /> for Spouse/Dependent.</p>
      </Grid>
      <Grid item xs={2}>
        <span onClick={clear}>CLOSE</span>
      </Grid>
    </Grid>
  		)
}

export default SpouseValidateNotify

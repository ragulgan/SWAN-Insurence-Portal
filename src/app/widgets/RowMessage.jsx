import React from 'react'
import { Grid } from '@material-ui/core'

const RowMessage = (props) => {
  const { msg } = props
  return (
    <Grid item xs={12}>
      <div className='row-msg'>
        <p>{msg}</p>
      </div>
    </Grid>
  )
}

export default RowMessage

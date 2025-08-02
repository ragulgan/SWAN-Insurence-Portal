import React from 'react'
import { Grid, Dialog, DialogTitle, Button } from '@material-ui/core'
import Icofont from 'react-icofont'

const ErrorAlerts = (props) => {
  const { open, msg, close } = props

  return (
    <Dialog
      onClose={() => close(false)}
      open={open}
      aria-labelledby='erroralerts-title'
      className='error-widget'
    >
      <DialogTitle id='erroralerts-title' className='txt-right'>
        <span onClick={() => close(false)}><Icofont icon='close' /></span>
      </DialogTitle>
      <Grid
        container
        direction='row'
        justifyContent='flex-start'
        alignItems='center'
      >
        <div className='msg-wrap'>
          <p>{msg}</p>
        </div>
      </Grid>
    </Dialog>
  )
}

export default ErrorAlerts

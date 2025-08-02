import React from 'react'
import { Grid, Dialog, DialogTitle, Button } from '@material-ui/core'

const CustomerExistDetails = (props) => {
  const { close, logout, open } = props

  return (
    <Dialog
      onClose={close}
      open={open}
      aria-labelledby='simple-dialog-title'
      className='confirm-widget'
    >
      <DialogTitle id='simple-dialog-title' className='simple-dialog-title'>Customer already exists, do you <br /> want to load Customer details?</DialogTitle>
      <Grid
        container
        direction='row'
        justifyContent='center'
        alignItems='flex-start'
      >
        <div className='confirm-wrap'>
          <Button variant='outlined' color='primary' onClick={close}>NO</Button>
          <Button variant='contained' color='primary' onClick={logout}>YES</Button>
        </div>
      </Grid>
    </Dialog>
  )
}

export default CustomerExistDetails

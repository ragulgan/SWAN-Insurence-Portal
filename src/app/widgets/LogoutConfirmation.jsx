import React from 'react'
import { Grid, Dialog, DialogTitle, Button } from '@material-ui/core'

const LogoutConfirmation = (props) => {
  const { close, logout, open } = props

  return (
    <Dialog
      onClose={close}
      open={open}
      aria-labelledby='simple-dialog-title'
      className='confirm-widget'
    >
      <DialogTitle id='simple-dialog-title'>Are you sure you want to Log out?</DialogTitle>
      <Grid
        container
        direction='row'
        justifyContent='center'
        alignItems='flex-start'
      >
        <div className='confirm-wrap'>
          <Button variant='outlined' color='primary' onClick={close}>CANCEL</Button>
          <Button variant='contained' color='primary' onClick={() => logout()}>LOG OUT</Button>
        </div>
      </Grid>
    </Dialog>
  )
}

export default LogoutConfirmation

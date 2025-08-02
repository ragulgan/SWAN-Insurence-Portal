import React, { useState } from 'react'
import { Grid, Dialog, DialogTitle, Button } from '@material-ui/core'
import QuoteSavedConfirmation from '../widgets/QuoteSavedConfirmation'

const SaveQuoteConfirmation = (props) => {
  const { close, login, open } = props
  const [popConfirm, setPopConfirm] = useState(false)

  const LoginHandler = () => {
    setPopConfirm(true)
  }
  const handleClose = () => {
    setPopConfirm(false)
  }

  return (
    <Dialog
      onClose={close}
      open={open}
      aria-labelledby='simple-dialog-title'
      className='confirm-widget'
    >
      <DialogTitle id='simple-dialog-title' className='simple-dialog-title'>To save the quote please log in <br /> your My Swan account or sign up.</DialogTitle>
      <Grid
        container
        direction='row'
        justifyContent='center'
        alignItems='flex-start'
      >
        <div className='confirm-wrap'>
          <Button variant='outlined' color='primary' onClick={close}>SIGN UP</Button>
          {/* <Button variant="contained" color="primary" onClick={login}>LOG IN</Button> */}
          <Button variant='contained' color='primary' onClick={LoginHandler}>LOG IN</Button>
          <QuoteSavedConfirmation open={popConfirm} close={handleClose} logout={LoginHandler} />
        </div>
      </Grid>
    </Dialog>
  )
}

export default SaveQuoteConfirmation

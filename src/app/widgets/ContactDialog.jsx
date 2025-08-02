import React from 'react'
import { Dialog, DialogTitle } from '@material-ui/core'
import Icofont from 'react-icofont'
import IconButton from '@material-ui/core/IconButton'

const ContactMessage = (props) => {
  const { close, open } = props

  return (
    <Dialog
      onClose={close}
      open={open}
      aria-labelledby='simple-dialog-title'
      className='confirm-widget'
    >
      <IconButton style={{ justifyContent: 'right' }} aria-label='close'>
        <Icofont style={{ color: '#00b8ce', marginBottom: '-20px', padding: '9px' }} icon='close' onClick={close} />
      </IconButton>
      <DialogTitle id='simple-dialog-title' className='simple-dialog-title'>Cannot proceed with customer. <br /> Please contact Swan Compliance <br /> on 205 35 00</DialogTitle>
    </Dialog>
  )
}

export default ContactMessage

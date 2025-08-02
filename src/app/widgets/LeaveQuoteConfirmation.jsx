import React from 'react'
import { Grid, Dialog, DialogTitle, Button, makeStyles, } from '@material-ui/core'

const LeaveQuoteConfirmation = (props) => {
  const useStyles = makeStyles(theme => ({
    Leavequote: {
      color: '#002F87',
      fontSize : "24px",
      marginLeft: "20px",
      marginTop: "10px"
    },
  }))
  const classes = useStyles()
  const { close, logout, open } = props

  return (
    <Dialog
      onClose={close}
      open={open}
      aria-labelledby='simple-dialog-title'
      className='confirm-widget'
    >
      <span className={classes.Leavequote}>Leave Quote</span>
      <DialogTitle>Are you sure you want to leave the quotation?</DialogTitle>
      <Grid
        container
        direction='row'
        justifyContent='center'
        alignItems='flex-start'
      >
        <div className='confirm-wrap'>
          <Button variant='outlined' color='primary' onClick={close}>NO,CANCEL</Button>
          <Button variant='contained' color='primary' onClick={logout}>YES,PROCEED</Button>
        </div>
      </Grid>
    </Dialog>
  )
}

export default LeaveQuoteConfirmation

import React, { useState, useEffect } from 'react'
import { Snackbar, Slide, Button, makeStyles } from '@material-ui/core'
import _ from 'lodash'

function TransitionLeft(props) {
  return <Slide {...props} direction="right" />;
}

const ValidateNotify = (props) => {
  const { show, clear, errors } = props
  const [transition, setTransition] = useState(null);
  const [open, setOpen] = useState(show)
  const msg = errors || 'Please fill in required information to proceed'

  const useStyles = makeStyles((theme) => ({
    textColor: {
      color: 'white !important'
    }
  }))
  const classes = useStyles()
  const handleClose = ( reason, Transition) => {
    setTransition(() => Transition);
    setOpen(true);
    if (reason === 'clickaway') {
      return
    }
    clear(false)
    setOpen(false)
  }

  useEffect(() => {
    if (show) {
      setOpen(true)
      setTimeout(() => {
        clear(false)
      }, 3000)
    } else {
      setOpen(false)
    }
  }, [show])

  return (
    <>
      <Snackbar
        className='validation-widget'
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={open}
        onClose={handleClose}
        autoHideDuration={6000}
        message={msg}
        TransitionComponent={TransitionLeft}
        key={transition ? transition.name : ''}
        action={
          <>
            <Button size='small' onClick={handleClose} className={classes.textColor}>
              CLOSE
            </Button>
          </>
        }
      />
    </>
  )
}

export default ValidateNotify

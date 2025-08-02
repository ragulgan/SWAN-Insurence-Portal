import React, { useState, useEffect } from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import { Grid } from '@material-ui/core'

function Alert (props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />
}

const AlertBox = (props) => {
  const { open, type, msg, close } = props
  const [alertOpen, setAlertOpen] = useState(false)

  // const handleClose = (event, reason) => {
  //     if (reason === 'clickaway') {
  //         return;
  //     }
  //     close();
  // }

  return (
    <div className='swan-alert'>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={open}
        autoHideDuration={6000}
        onClose={() => close(false)}
      >
        <Alert onClose={() => close(false)} severity={type}>
          <Grid
            container
            direction='row'
            justifyContent='flex-start'
            alignItems='center'
            spacing={2}
          >
            <Grid item xs>
              {msg}
            </Grid>
            <Grid item xs={3} className='txt-right'>
              <span onClick={() => close(false)}>CLOSE</span>
            </Grid>
          </Grid>
        </Alert>
      </Snackbar>
    </div>
  )
}

export default AlertBox

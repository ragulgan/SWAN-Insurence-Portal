import React, { useEffect, useState } from 'react'
import { connect, shallowEqual, useSelector } from 'react-redux'
import { Grid, Button, Dialog, DialogTitle, Paper } from '@material-ui/core'
import { REGEX, GRANTED_USERS } from 'helpers/constants'

import Icofont from 'react-icofont'
import Mselect from 'app/form-controls/Mselect'

const ComparePlans = props => {
  const {
    open,
    handler,
    control,
    watch
  } = props
  const { authRole } = useSelector(
    ({ Auth }) => ({
      authRole: Auth.authRole
    }),
    shallowEqual
  )
  const [limit, setLimit] = useState([
    {
      label: 'Rs 15,000',
      value: '15000'
    },
    {
      label: 'Rs 20,000',
      value: '20000'
    },
    {
      label: 'Rs 25,000',
      value: '25000'
    },
    {
      label: 'Rs 30,000',
      value: '30000'
    },
    {
      label: 'Rs 35,000',
      value: '35000'
    }
  ])
  const limitOneWatcher = watch('choose_limit1')
  const limitTwoWatcher = watch('choose_limit2')
  const limitThreeWatcher = watch('choose_limit3')

  useEffect(() => {
    console.log('limitOneWatcher', limitOneWatcher)
    console.log('limitTwoWatcher', limitTwoWatcher)
    console.log('limitThreeWatcher', limitThreeWatcher)
  }, [limitOneWatcher, limitTwoWatcher, limitThreeWatcher])

  return (
    <Dialog
      fullWidth
      maxWidth='md'
      open={open}
      aria-labelledby='form-dialog-title'
      className='compare-widget'
    >
      <DialogTitle id='form-dialog-title'>
        Compare Optional Out-Patient cover
      </DialogTitle>
      <Paper className='compare-wrap'>
        <Grid
          container
          direction='row'
          justifyContent='center'
          alignItems='flex-start'
        >
          <Grid item xs>
            <ul>
              <div>
                <Mselect
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  name='choose_limit1'
                  label='Choose limit'
                  control={control}
                  grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                  userType={authRole}
                  options={limit}
                  optionsLabel='label'
                  optionsValue='value'
                />
              </div>
              <li>Medical Expenses 100% of annual limit</li>
              <li>Dentistry 50% of annual limit</li>
              <li>Optical Costs 20% of annual limit</li>
              <li>Pre Natal 10% of annual limit</li>
              <li>Hearing Aids & Artificial Appliances 50% of annual limit</li>
              <li>Psychological Trauma 10% of annual limit</li>
              <li>-</li>
            </ul>
          </Grid>
          <Grid item xs>
            <ul>
              <div>
                <Mselect
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  name='choose_limit2'
                  label='Choose limit'
                  control={control}
                  grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                  userType={authRole}
                  options={limit}
                  optionsLabel='label'
                  optionsValue='value'
                />
              </div>
              <li>Medical Expenses 100% of annual limit</li>
              <li>Dentistry 50% of annual limit</li>
              <li>Optical Costs 20% of annual limit</li>
              <li>Pre Natal 10% of annual limit</li>
              <li>Hearing Aids & Artificial Appliances 50% of annual limit</li>
              <li>Psychological Trauma 10% of annual limit</li>
              <li>-</li>
            </ul>
          </Grid>
          <Grid item xs>
            <ul>
              <div>
                <Mselect
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  name='choose_limit3'
                  label='Choose limit'
                  control={control}
                  grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                  userType={authRole}
                  options={limit}
                  optionsLabel='label'
                  optionsValue='value'
                />
              </div>
              <li>Medical Expenses 100% of annual limit</li>
              <li>Dentistry 50% of annual limit</li>
              <li>Optical Costs 20% of annual limit</li>
              <li>Pre Natal 10% of annual limit</li>
              <li>Hearing Aids & Artificial Appliances 50% of annual limit</li>
              <li>Psychological Trauma 10% of annual limit</li>
              <li>-</li>
            </ul>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} className='txt-center'>
            <Button
              variant='outlined'
              color='primary'
              className='mar-right-s'
              onClick={() => handler(false)}
            >
              Cancel
            </Button>
            <Button
              variant='contained'
              color='primary'
            >
              Continue
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Dialog>
  )
}

const mapStateToProps = state => {
  const { Client } = state
  return {
    clientLoading: Client.clientLoading,
    clientData: Client.clientData
  }
}

const mapDispatchToProps = dispatch => ({
  // searchDispatch: params => dispatch(ClientActions.SearchClient(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ComparePlans)

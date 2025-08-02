import React from 'react'
import {
  Grid,
  BootstrapDialog,
  BootstrapDialogTitle,
  DialogTitle,
  styled,
  Dialog,
  Typography,
  DialogContent,
  DialogActions,
  Button
} from '@material-ui/core'
import { useForm } from 'react-hook-form'
import Mselect from 'app/form-controls/Mselect'
const PlanSelection = (props) => {
  const { close, select, open, titleData } = props
  const { control, handleSubmit } = useForm({
    defaultValues: {
      rememberMe: '',
      light: '',
      regular: '',
      bold: '',
      delta: '',
      atlas: '',
      explorer: '',
      compass: ''
    }
  })

  const onSubmit = (data) => {
    console.log('data -', data)
  }

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2)
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1)
    }
  }))

  function BootstrapDialogTitle (props) {
    const { children, onClose, ...other } = props

    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose}
      </DialogTitle>
    )
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid
        container
        direction='row'
        justifyContent='center'
        alignItems='flex-start'
        spacing={4}
      >
        <BootstrapDialog
          onClose={close}
          aria-labelledby='customized-dialog-title'
          open={open}
        >
          <BootstrapDialogTitle className='form-dialog-titles'>
            Compare Optional Out-Patient cover
          </BootstrapDialogTitle>
          <Grid item xs={12} sm={12} md={12} lg={12} className='three-drop-down'>
            <Grid container spacing={2} alignItems='flex-start'>
              <Grid item xs={4} sm={4} md={4} lg={4}>
                <Mselect
                  name='Choose Limit'
                  label='Choose Limit'
                  control={control}
                  options={titleData && titleData}
                  optionsLabel='CHOOSELIMIT'
                  optionsValue='CHOOSELIMIT'
                />
              </Grid>
              <Grid item xs={4} sm={4} md={4} lg={4}>
                <Mselect
                  name='Choose Limit'
                  label='Choose Limit'
                  control={control}
                  options={titleData && titleData}
                  optionsLabel='CHOOSELIMIT'
                  optionsValue='CHOOSELIMIT'
                />
              </Grid>
              <Grid item xs={4} sm={4} md={4} lg={4}>
                <Mselect
                  name='Choose Limit'
                  label='Choose Limit'
                  control={control}
                  options={titleData && titleData}
                  optionsLabel='CHOOSELIMIT'
                  optionsValue='CHOOSELIMIT'
                />
              </Grid>
              <Grid item xs={4} sm={4} md={4} lg={4}>
                <ul>
                  <li className='compare-optional'>Medical Expenses <br />100% of annual limit</li>
                  <li className='compare-optional'>Dentistry<br />50% of annual limit</li>
                  <li className='compare-optional'>Optical Costs<br />20% of annual limit</li>
                  <li className='compare-optional'>Pre Natal<br />10% of annual limit</li>
                  <li className='compare-optional'>Hearing Aids & <br />Artificial Appliances<br />50% of annual limit</li>
                  <li className='compare-optional'>Psychological Trauma <br />10% of annual limit</li>
                  <li className='compare-optional-price'> Rs 8,963 </li>
                </ul>
              </Grid>
              <Grid item xs={4} sm={4} md={4} lg={4}>
                <ul>
                  <li className='compare-optional'>Medical Expenses <br />100% of annual limit</li>
                  <li className='compare-optional'>Dentistry<br />50% of annual limit</li>
                  <li className='compare-optional'>Optical Costs<br />20% of annual limit</li>
                  <li className='compare-optional'>Pre Natal<br />10% of annual limit</li>
                  <li className='compare-optional'>Hearing Aids & <br />Artificial Appliances<br />50% of annual limit</li>
                  <li className='compare-optional'>Psychological Trauma <br />10% of annual limit</li>
                  <li className='compare-optional-price'> Rs 5,785 </li>
                </ul>
              </Grid>
              <Grid item xs={4} sm={4} md={4} lg={4}>
                <ul>
                  <li className='compare-optional'>Medical Expenses <br />100% of annual limit</li>
                  <li className='compare-optional'>Dentistry<br />50% of annual limit</li>
                  <li className='compare-optional'>Optical Costs<br />20% of annual limit</li>
                  <li className='compare-optional'>Pre Natal<br />10% of annual limit</li>
                  <li className='compare-optional'>Hearing Aids & <br />Artificial Appliances<br />50% of annual limit</li>
                  <li className='compare-optional'>Psychological Trauma <br />10% of annual limit</li>
                  <li className='compare-optional-price'> Rs 6,781 </li>
                </ul>
              </Grid>
            </Grid>
          </Grid>
          <DialogActions>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              xl={12}
              lg={12}
              className='txt-center travel-plan'
            >
              <Button
                variant='outlined'
                color='primary'
                className='mar-right-s back-button1'
                onClick={close}
              >
                Cancel
              </Button>
              <Button
                variant='contained'
                className='next-button1'
                color='primary'
                onClick={select}
              >
                Continue
              </Button>
            </Grid>
          </DialogActions>
        </BootstrapDialog>
      </Grid>
    </form>
  )
}
export default PlanSelection

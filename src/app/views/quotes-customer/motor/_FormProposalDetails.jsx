import React from 'react'
import { Grid, Box, Radio, Button, MenuItem, InputLabel, Select, FormControl, FormControlLabel, RadioGroup } from '@material-ui/core'

const FormProposalDetails = () => {
  return (
    <Grid
      container
      direction='row'
      justifyContent='center'
      alignItems='flex-start'
      spacing={4}
    >
      <Grid item md={12}>
        Leasing, Lien, Hire purchase
      </Grid>
      <Grid item md={6}>
        <Grid
          container
          spacing={2}
        >
          <Grid item xs={12}>
            Leasing Company
          </Grid>
          <Grid item xs={6}>
            Year (YYYY)
          </Grid>
          <Grid item xs={6}>
            Number of Claims
          </Grid>
          <Grid item xs={6}>
            Year (YYYY)
          </Grid>
          <Grid item xs={6}>
            Number of Claims
          </Grid>
          <Grid item xs={6}>
            Year (YYYY)
          </Grid>
          <Grid item xs={6}>
            Number of Claims
          </Grid>
          <Grid item xs={12}>
            Total No. of claims: 0
          </Grid>
          <Grid item xs={12}>
            Details of accidents
          </Grid>
          <Grid item xs={12}>
            Is registration fees included in “ESTIMATE OF
            PRESENT VALUE”?
          </Grid>
          <Grid item xs={12}>
            Is VAT included in “ESTIMATE OF PRESENT VALUE”?
          </Grid>
          <Grid item xs={12}>
            Are you the owner of the motor vehicle and is it registered in your name?
          </Grid>
          <Grid item xs={12}>
            Previous Insurer in respect to any motor vehicle
          </Grid>
          <Grid item xs={6}>
            Chassis Number
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={6}>
        <Grid item xs={6}>
          Please specify any health problem, if any, that may impair your driving ability
        </Grid>
        <Grid item xs={6}>
          Other driver details
        </Grid>
        <Grid item xs={6}>
          Have you or any of the above drivers had any conviction in the past 5 years?
        </Grid>
        <Grid item xs={6}>
          Have you or any of the above drivers had any prosecution for any offence in connection with a motor vehicle?
        </Grid>
        <Grid item xs={6}>
          Have you or any of the above drivers had their licence suspended?
        </Grid>
        <Grid item xs={6}>
          Have you or any of the above drivers been refused insurance at normal rates or terms during the past 5 years?
        </Grid>
        <Grid item xs={6}>
          Will the motor car be used for rallies, competition, trails?
        </Grid>
        <Grid item xs={6}>
          Will the motor car be used for carriage of goods for business or trade purposes?
        </Grid>
        <Grid item xs={6}>
          Will the motor car be used for carriage of passengers for hire or reward?
        </Grid>
        <Grid item xs={6}>
          Will the motor car be used in connection with the motor trade?
        </Grid>
      </Grid>
    </Grid>
  )
}

export default FormProposalDetails

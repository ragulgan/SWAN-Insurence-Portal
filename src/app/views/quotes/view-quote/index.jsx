import React from 'react'
import _ from 'lodash'
import Icofont from 'react-icofont'
import ViewQuoteWidget from '../../../../app/widgets/ViewQuote'
import { Grid, Button } from '@material-ui/core'

const ViewQuote = () => {
  return (
    <Grid
      container
      direction='row'
      justifyContent='center'
      alignItems='center'
    >
      <Grid item xs={12} sm={10} md={7}>
        <ViewQuoteWidget />
      </Grid>
    </Grid>
  )
}

export default ViewQuote

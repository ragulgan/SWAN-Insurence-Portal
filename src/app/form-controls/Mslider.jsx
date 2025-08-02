import React, { useEffect, useState } from 'react'
import { Grid, Slider } from '@material-ui/core'
import { Controller } from 'react-hook-form'
import _ from 'lodash'

const marks = [
  {
    value: 0,
    label: '0'
  },
  {
    value: 1,
    label: '1'
  },
  {
    value: 2,
    label: '2'
  },
  {
    value: 3,
    label: '3'
  },
  {
    value: 4,
    label: '4'
  },
  {
    value: 5,
    label: '5'
  },
  {
    value: 6,
    label: '6'
  },
  {
    value: 7,
    label: '7'
  },
  {
    value: 8,
    label: '8'
  },
  {
    value: 9,
    label: '9'
  },
  {
    value: 10,
    label: '10'
  }
]
const Mslider = ({ xs, md, name, label }) => {
  return (
    <Grid item xs={xs} md={!_.isUndefined(md) ? md : xs}>
      <Slider
        defaultValue={1.5}
        valueLabelDisplay='auto'
        valueLabelDisplay='on'
        step={0.5}
        marks
        min={0}
        max={10}
      />
    </Grid>
  )
}

export default Mslider

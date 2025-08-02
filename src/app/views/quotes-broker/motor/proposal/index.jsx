import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Grid } from '@material-ui/core'
import Icofont from 'react-icofont'
import StepSubmitInstruction from './StepSubmitInstruction'

const Proposal = () => {
  useEffect(() => {
    document.body.classList.add('aside-minimize')

    return () => {
      document.body.classList.remove('aside-minimize')
    }
  }, [])

  return (
    <section className='quote-create'>
      <Grid
        container
        direction='row'
        justifyContent='center'
        alignItems='flex-start'
      >
        <Grid item xs={12} sm={12} md={11}>
          <h4 className='section-title'>
            <Link to='/broker/quotes/motor'>
              <Icofont icon='arrow-left' />
            </Link>
            Motor Policy
          </h4>
        </Grid>
      </Grid>
      <Grid
        container
        direction='row'
        justifyContent='center'
        alignItems='flex-start'
      >
        <Grid item xs={12} sm={12} md={11}>
          <StepSubmitInstruction />
        </Grid>
      </Grid>
    </section>
  )
}

export default Proposal

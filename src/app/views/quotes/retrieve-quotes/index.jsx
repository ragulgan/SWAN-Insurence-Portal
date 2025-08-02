import React, { useState, useEffect } from 'react'
import { Card, Grid, Button } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import _ from 'lodash'

import Mtextbox from '../../../../app/form-controls/Mtextbox'
import Mdatepicker from '../../../../app/form-controls/Mdatepicker'
import ValidateNotify from '../../../../app/widgets/ValidateNotify'

const RetrieveQuotes = () => {
  const { control, watch, setValue, getValues, handleSubmit, formState } = useForm({
    defaultValues: {
      quote_number: '',
      dob: '',
      email_address: ''
    }
  })
  const [errorPop, setErrorPop] = useState(false)
  const [dataShow, setDataShow] = useState(false)
  const { errors } = formState
  const message = 'Please fill in required information to proceed'
  const clearNotify = () => {
    setErrorPop(false)
  }
  const onSubmit = (data) => {

  }

  useEffect(() => {
    if (_.size(errors)) {
      setErrorPop(true)
    }
    if (_.isEmpty(errors)) {
      setDataShow(true)
    }
  }, [errors])

  return (
    <Grid
      container
      direction='row'
      justifyContent='center'
      alignItems='center'
    >
      <Grid item xs={12} sm={10} md={10}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid
            container
            direction='row'
            justifyContent='flex-start'
            alignItems='center'
            className='puplic-forms'
          >
            <Grid item xs={12} sm={12} md={6}>
              <Grid
                container
                spacing={4}
              >
                <Grid item xs={10}>
                  <h4 className='form-title'>Retrieve a saved quote</h4>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fames ac turpis egestas sed tempus urna et pharetra.</p>
                </Grid>

                <Mtextbox
                  xs={8}
                  name='quote_number'
                  label='Quote number'
                  control={control}
                  req
                />

                <Mdatepicker
                  xs={8}
                  name='dob'
                  label='Date of birth*'
                  control={control}
                  req
                />

                <Mtextbox
                  xs={8}
                  name='email_address'
                  label='Email address*'
                  control={control}
                  req
                />

                <Grid item xs={8}>
                  <ValidateNotify show={errorPop} errors={message} clear={clearNotify} />
                </Grid>
                <Grid item xs={8}>
                  <Button variant='contained' size='medium' color='primary' type='submit' fullWidth>RETRIEVE A QUOTE</Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              {dataShow
                ? (
                  <section>
                    <ul className='ul-myquote'>
                      <div>Motor Summary</div>
                      <li>Name: <span>Javin Badin Hong Wa Ban</span></li>
                      <li>Quote Number: <span>MTA12345</span></li>
                      <li>Quote Date: <span>15/09/2022</span></li>
                      <li><Link variant='contained' color='primary' to='/public/view-quote'>VIEW QUOTE</Link></li>
                    </ul>
                    <ul className='ul-myquote'>
                      <div>Motor Summary</div>
                      <li>Name: <span>Javin Badin Hong Wa Ban</span></li>
                      <li>Quote Number: <span>MTA12345</span></li>
                      <li>Quote Date: <span>15/09/2022</span></li>
                      <li><Link variant='contained' color='primary' to='/public/view-quote'>VIEW QUOTE</Link></li>
                    </ul>
                  </section>
                  )
                : <h2>No Results Found</h2>}
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  )
}

export default RetrieveQuotes

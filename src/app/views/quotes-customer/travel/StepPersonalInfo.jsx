import React, { useState } from 'react'
import * as Yup from 'yup'
import { Formik, Form, Field } from 'formik'
import { TextField, Switch } from 'formik-material-ui'

import {
  Grid,
  Radio,
  MenuItem,
  FormControlLabel,
  RadioGroup
} from '@material-ui/core'
import ClientsModals from '../../../../app/modals/ClientsModal'

const initialValues = {
  quotation_type: '',
  mauritian_citizen: '',
  national_identity_card: '',
  passport_number: '',
  title: '',
  last_name: '',
  first_name: '',
  dob: '',
  email: '',
  mobile: '',
  telephone: ''
}
const options = [
  { label: 'Computer Programmer', value: 'Computer_programmer' },
  { label: 'Web Developer', value: 'web_developer' },
  { label: 'User Experience Designer', value: 'user_experience_designer' },
  { label: 'Systems Analyst', value: 'systems_analyst' },
  { label: 'Quality Assurance Tester', value: 'quality_assurance_tester' }
]
const validationSchema = Yup.object().shape({
  national_identity_card: Yup.string().required('Required'),
  title: Yup.string().required('Required'),
  last_name: Yup.string().required('Required'),
  first_name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required')
})
const StepPersonalInfo = () => {
  const [toggle, setToggle] = useState(false)

  const onSubmit = (values) => {
    console.log(values)
  }
  const handleToggle = () => {
    toggle ? setToggle(false) : setToggle(true)
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ dirty, isValid, values, handleChange, handleBlur }) => {
        return (
          <Form className='swan-forms'>
            <Grid
              container
              direction='row'
              justifyContent='center'
              alignItems='flex-start'
              spacing={4}
            >
              <Grid item md={12}>
                <Grid container spacing={2} alignItems='center'>
                  <Grid item xs={2}>
                    <span> Type of Quotation</span>
                  </Grid>
                  <Grid item xs={6}>
                    <RadioGroup row aria-label='position' name='position' defaultValue='end'>
                      <FormControlLabel value='individual' control={<Radio color='primary' />} label='Individual' />
                      <FormControlLabel value='corporate' control={<Radio color='primary' />} label='Corporate' />
                    </RadioGroup>
                  </Grid>
                  <Grid item xs={4} className='txt-right'>
                    <ClientsModals />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item md={6}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <h4 className='form-title-md'>Personal Information <span>*Required field </span></h4>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid component='label' container alignItems='center' spacing={1}>
                      <Grid item xs={8}>Is the Policy Holder a Mauritian citizen/Permanent resident?*</Grid>
                      <Grid item>No </Grid>
                      <Grid item>
                        <Field
                          label='Remember Me'
                          name='rememberMe'
                          component={Switch}
                          onChange={handleToggle}
                          checked={toggle}
                        />
                      </Grid>
                      <Grid item>Yes</Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      label='National Identity Card'
                      variant='outlined'
                      fullWidth
                      name='national_identity_card'
                      value={values.national_identity_card}
                      component={TextField}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      label='Passport Number'
                      variant='outlined'
                      fullWidth
                      name='passport_number'
                      value={values.passport_number}
                      component={TextField}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Field
                      label='Title'
                      variant='outlined'
                      fullWidth
                      name='title'
                      component={TextField}
                      type='text'
                      icon={props => (
                        <i {...props}>KL</i>
                      )}
                      select
                    >
                      {options && options.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Field>
                  </Grid>
                  <Grid item xs={8}>
                    <Field
                      label='Last Name'
                      variant='outlined'
                      fullWidth
                      name='last_name'
                      value={values.last_name}
                      component={TextField}
                    />
                  </Grid>
                  <Grid item xs={7}>
                    <Field
                      label='First Name'
                      variant='outlined'
                      fullWidth
                      name='first_name'
                      value={values.first_name}
                      component={TextField}
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <Field
                      label='Date of Birth'
                      variant='outlined'
                      fullWidth
                      name='dob'
                      value={values.dob}
                      component={TextField}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item md={6}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                                        &nbsp;
                  </Grid>
                  <Grid item xs={12}>
                    <h4 className='form-title-sm'>Contact Details</h4>
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      label='Email Address'
                      variant='outlined'
                      fullWidth
                      name='email'
                      value={values.email}
                      component={TextField}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      label='Mobile Number'
                      variant='outlined'
                      fullWidth
                      name='mobile'
                      value={values.mobile}
                      component={TextField}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      label='Telephone Number'
                      variant='outlined'
                      fullWidth
                      name='telephone'
                      value={values.telephone}
                      component={TextField}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Form>
        )
      }}
    </Formik>
  )
}

export default StepPersonalInfo

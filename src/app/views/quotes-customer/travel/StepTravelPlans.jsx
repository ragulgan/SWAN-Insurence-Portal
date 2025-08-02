import React, { useState } from 'react'
import * as Yup from 'yup'
import { Formik, Form, Field } from 'formik'
import { TextField, Switch } from 'formik-material-ui'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import {
  Grid,
  Button,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography
} from '@material-ui/core'

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
const validationSchema = Yup.object().shape({
  national_identity_card: Yup.string().required('Required'),
  title: Yup.string().required('Required'),
  last_name: Yup.string().required('Required'),
  first_name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required')
  // mobile: Yup.string().matches(phoneRegExp, 'Phone number is not valid')
})
const options = [
  { label: 'Computer Programmer', value: 'Computer_programmer' },
  { label: 'Web Developer', value: 'web_developer' },
  { label: 'User Experience Designer', value: 'user_experience_designer' },
  { label: 'Systems Analyst', value: 'systems_analyst' },
  { label: 'Quality Assurance Tester', value: 'quality_assurance_tester' }
]
const StepTravelPlans = () => {
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
              alignItems='flex-start'
              spacing={4}
            >
              <Grid item md={8}>
                <Grid container spacing={3} alignItems='center'>
                  <Grid item xs={12} />
                  <Grid item xs={12}>
                    <Field
                      label='Choose Destination/s*'
                      variant='outlined'
                      name='title'
                      component={TextField}
                      type='text'
                      fullWidth
                      multiple
                      select
                    >
                      {options && options.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Field>
                  </Grid>
                  <Grid item xs={3}>
                    <span>Travelling Dates</span>
                  </Grid>
                  <Grid item xs={4}>
                    <Field
                      label='DD/MM/YYYY*'
                      variant='outlined'
                      fullWidth
                      name='last_name'
                      value={values.last_name}
                      component={TextField}
                    />
                  </Grid>
                  <Grid item xs={1} className='txt-center'>
                    <span>to</span>
                  </Grid>
                  <Grid item xs={4}>
                    <Field
                      label='DD/MM/YYYY*'
                      variant='outlined'
                      fullWidth
                      name='last_name'
                      value={values.last_name}
                      component={TextField}
                    />
                  </Grid>
                  <Grid item xs={9}>
                    <Grid container alignItems='center' spacing={1}>
                      <Grid item xs={8}>Will it be an Annual Cover type?</Grid>
                      <Grid item>No </Grid>
                      <Grid item>
                        <Field
                          name='annual_cover'
                          component={Switch}
                          onChange={handleToggle}
                          checked={toggle}
                        />
                      </Grid>
                      <Grid item>Yes</Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <h4 className='form-title-md'>Traveller’s Information</h4>
                  </Grid>
                  <Grid item xs={6} className='txt-right'>
                    <Button variant='contained' color='primary'>
                      ADD TRAVELLER
                    </Button>
                  </Grid>
                  <Grid item xs={9}>
                    <Grid container alignItems='center' spacing={1}>
                      <Grid item xs={8}>Will the client be one of the travellers?</Grid>
                      <Grid item>No </Grid>
                      <Grid item>
                        <Field
                          name='client'
                          component={Switch}
                          onChange={handleToggle}
                          checked={toggle}
                        />
                      </Grid>
                      <Grid item>Yes</Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              container
              direction='row'
              alignItems='flex-start'
              spacing={4}
            >
              <Grid item md={12}>
                <Grid container spacing={3} alignItems='center'>
                  <Grid item xs={6}>
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls='panel1a-content'
                        id='panel1a-header'
                      >
                        <Typography>Traveller 1</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Grid container spacing={3} alignItems='center'>
                          <Grid item xs={3}>
                            <Field
                              label='Title'
                              variant='outlined'
                              fullWidth
                              name='title'
                              component={TextField}
                            />
                          </Grid>
                          <Grid item xs={9}>
                            <Field
                              label='Full Name'
                              variant='outlined'
                              fullWidth
                              name='fullname'
                              component={TextField}
                            />
                          </Grid>
                          <Grid item xs={7}>
                            <Field
                              label='Passport Number'
                              variant='outlined'
                              fullWidth
                              name='passport_number'
                              component={TextField}
                            />
                          </Grid>
                          <Grid item xs={5}>
                            <Field
                              label='Date of Birth'
                              variant='outlined'
                              fullWidth
                              name='date_of_birth'
                              component={TextField}
                            />
                          </Grid>
                        </Grid>
                      </AccordionDetails>
                    </Accordion>
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

export default StepTravelPlans

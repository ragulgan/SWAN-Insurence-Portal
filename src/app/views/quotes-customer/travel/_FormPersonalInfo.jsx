import React, { useEffect, useState } from 'react'
import { connect, shallowEqual, useSelector } from 'react-redux'
import {
  Grid,
  Button
} from '@material-ui/core'

import { useForm } from 'react-hook-form'
import { REGEX, GRANTED_USERS } from '../../../../helpers/constants'
import _ from 'lodash'
import ClientsModals from '../../../../app/modals/ClientsModal'
import Mradio from '../../../../app/form-controls/Mradio'
import Mtextbox from '../../../../app/form-controls/Mtextbox'
import Mselect from '../../../../app/form-controls/Mselect'
import Mswitch from '../../../../app/form-controls/Mswitch'
import Mdatepicker from '../../../../app/form-controls/Mdatepicker'
import ValidateNotify from '../../../../app/widgets/ValidateNotify'
import { PersonalDropdownActions } from '../../../../store/actions/index'
// import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import moment from 'moment'

const validationSchema = yup.object().shape({
  nic_number: yup.string().required('National identity card no required'),
  title: yup.string().required('Title is required'),
  last_name: yup.string().required('Last name is required'),
  first_name: yup.string().required('First name is required'),
  email_address: yup.string().email('Invalid email').required('Email id required'),
  dob: yup
    .string()
    .test(
      'DOB',
      'Selected date is current date',
      function (date) {
        if (moment().isSame(moment(date), 'day')) {
          return this.createError({ message: 'Selected date is current date' })
        } else if (moment().diff(moment(date), 'years') > 74) {
          return this.createError({ message: 'Your age should not be above 74' })
        } else if (moment().diff(moment(date), 'years') <= 18) {
          return this.createError({ message: 'Your age should be above 18' })
        } else if (moment().diff(moment(date), 'years') >= 18 && moment().diff(moment(date), 'years') <= 74) {
          return true
        }
      }
    ),
  mobile_phone: yup.string().required('Mobile number is required')
})

const FormPersonalDetails = (props) => {
  const { authRole } = useSelector(
    ({ Auth }) => ({
      authRole: Auth.authRole
    }),
    shallowEqual
  )
  const { fromPage, back, next, getTitleDropdownDispatch, titleData } = props
  const {
    register,
    control,
    watch,
    setValue,
    getValues,
    handleSubmit,
    reset,
    formState
  } = useForm({
    // resolver: yupResolver(validationSchema),
    defaultValues: {
      quotation_type: '',
      mauritian_citizen: '',
      nic_number: '',
      passport_number: '',
      title: '',
      last_name: '',
      first_name: '',
      dob: '',
      email_address: '',
      mobile_phone: '',
      home_phone: ''
    }
  })

  const [activeStep, setActiveStep] = useState(0)
  const [errorPop, setErrorPop] = useState(false)
  const refused = watch('refused')
  const { errors } = formState
  const message = 'Please fill in required information to proceed'
  const onSubmit = (data) => {
    console.log('data -', data)
    next()
  }
  const clearNotify = () => {
    setErrorPop(false)
  }

  useEffect(() => {}, [refused])

  useEffect(() => {
    getTitleDropdownDispatch()
  }, [])

  useEffect(() => {
    if (_.size(errors)) {
      setErrorPop(true)
    }
  }, [errors])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid
        container
        direction='row'
        justifyContent='center'
        alignItems='flex-start'
        spacing={fromPage === 'summary' ? 2 : 4}
      >
        {fromPage === 'summary' ? (
          ''
        ) : (
          <Grid item xs={12}>
            <Grid container spacing={2} alignItems='center'>
              <Grid item xs={12} md={6}>
                {/* <Mradio
                  xs={12}
                  name="quotation_type"
                  label="Type of Quotation"
                  control={control}
                  setValue={setValue}
                /> */}
                <Mradio
                  xs={12}
                  // md={8}
                  name='quotation_type'
                  label='Type of Quotation'
                  control={control}
                  setValue={setValue}
                  grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                  userType={authRole}
                />
              </Grid>
              <Grid item xs={12} md={6} className='txt-right'>
                <ClientsModals />
              </Grid>
            </Grid>
          </Grid>
        )}
        <Grid
          item
          xs={12}
          sm={fromPage === 'summary' ? 12 : 6}
          md={fromPage === 'summary' ? 12 : 6}
        >
          <Grid container spacing={fromPage === 'summary' ? 1 : 2}>
            {fromPage === 'summary'
              ? (
                <Grid item xs={12}>
                  <h4 className='form-title-md'>Your Personal Details</h4>
                </Grid>
                )
              : (
                <Grid item xs={12}>
                  <h4 className='form-title-md'>
                    Personal Information{' '}
                    <span>
                      <span className='req-mark'>*</span> Required field
                    </span>
                  </h4>
                </Grid>
                )}
            <Mswitch
              xs={12}
              name='mauritian_citizen'
              label='Is the Policy Holder a Mauritian citizen/Permanent
              resident?*'
              control={control}
              setValue={setValue}
              req
              grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
              userType={authRole}
            />
            <Mtextbox
              xs={12}
              name='nic_number'
              label='National Identity Card'
              control={control}
              // {...register("nic_number")}
              req
              grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
              userType={authRole}
            />
            <Mtextbox
              xs={12}
              name='passport_number'
              label='Passport Number'
              control={control}
              grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
              userType={authRole}
            />
            <Mselect
              reset={reset}
              xs={fromPage === 'summary' ? 5 : 4}
              md={fromPage === 'summary' ? 4 : 3}
              name='title'
              label='Title'
              control={control}
              options={titleData && titleData}
              optionsLabel='TITLE'
              optionsValue='TITLEID'
              // {...register("title")}
              req
              grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
              userType={authRole}
            />
            <Mtextbox
              xs={fromPage === 'summary' ? 7 : 8}
              md={fromPage === 'summary' ? 8 : 9}
              name='last_name'
              label='Last Name'
              control={control}
              // {...register("last_name")}
              req
              grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
              userType={authRole}
            />
            <Mtextbox
              xs={fromPage === 'summary' ? 7 : 6}
              md={fromPage === 'summary' ? 7 : 6}
              name='first_name'
              label='First Name'
              control={control}
              // {...register("first_name")}
              req
              grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
              userType={authRole}
            />
            <Mdatepicker
              xs={fromPage === 'summary' ? 5 : 6}
              md={fromPage === 'summary' ? 5 : 6}
              name='dob'
              label='Date of Birth'
              control={control}
              // {...register("dob")}
              req
              grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
              userType={authRole}
            />
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          sm={fromPage === 'summary' ? 12 : 6}
          md={fromPage === 'summary' ? 12 : 6}
        >
          <Grid container spacing={fromPage === 'summary' ? 1 : 2}>
            <Grid item xs={12}>
              <h4 className='form-title-md'>Contact Details</h4>
            </Grid>
            <Mtextbox
              xs={12}
              name='email_address'
              label='Email Address'
              control={control}
              // {...register("email_address")}
              req
              grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
              userType={authRole}
            />

            <Mtextbox
              xs={12}
              name='mobile_phone'
              label='Mobile Phone'
              control={control}
              // {...register("mobile_phone")}
              req
              grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
              userType={authRole}
            />

            <Mtextbox
              xs={12}
              name='home_phone'
              label='Home Phone'
              control={control}
              grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
              userType={authRole}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} sm={fromPage === 'summary' ? 12 : 8} md={8}>
          <ValidateNotify show={errorPop} errors={message} clear={clearNotify} />
        </Grid>
        <Grid
          item
          xs={12}
          sm={fromPage === 'summary' ? 12 : 4}
          md={4}
          className='txt-right'
        >
          <Button
            variant='outlined'
            color='primary'
            className='mar-right-s'
            disabled={activeStep === 0}
            onClick={() => back()}
          >
            Back
          </Button>
          <Button variant='contained' color='primary' onClick={() => next()}>Next</Button>
        </Grid>
      </Grid>
    </form>
  )
}

const mapStateToProps = (state) => {
  const { PersonalDropdown } = state
  return {
    getTitleLoading: PersonalDropdown.getTitleLoading,
    titleData: PersonalDropdown.titleData
  }
}

const mapDispatchToProps = (dispatch) => ({
  getTitleDropdownDispatch: (params) => dispatch(PersonalDropdownActions.getTitleRequest(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(FormPersonalDetails)

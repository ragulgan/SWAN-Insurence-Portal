import React, { useState, useEffect } from 'react'
import { connect, shallowEqual, useSelector } from 'react-redux'
import { Grid, Button } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import { ExtensionDropdownActions, MotorQuotationAction } from '../../../../store/actions/index'

import { setSessionStorage } from '../../../../helpers/helper'
import { MOTOR_FORM } from '../../../../helpers/constants'
import toast from 'react-hot-toast'
import QuotationPlans from '../../../../app/widgets/QuotationPlans'
import InfoPopup from '../../../../app/widgets/InfoPopup'
import Icofont from 'react-icofont'
import _ from 'lodash'
import moment from 'moment'

import Mselect from '../../../../app/form-controls/Mselect'
import Mswitch from '../../../../app/form-controls/Mswitch'

const FormMotorPlans = (props) => {
  const { authRole, quotationId } = useSelector(
    ({ Auth, Quotation }) => ({
      authRole: Auth.authRole,
      quotationId: Quotation.quotationId
    }),
    shallowEqual
  )
  const {
    fromPage,
    back,
    next,
    alternativeData,
    MotorPersonalInfo,
    MotorVehicleInfo,
    getQuoteDetailsDispatch,
    saveFormDispatch,
    putVechileDispatch,
    postPlanStatus
  } = props
  const [plan, setPlan] = useState('loading')
  const [defaultValues, setDefaultValues] = useState({})
  const { control, handleSubmit, formState, reset } = useForm({
    defaultValues
  })
  const planSelector = (plan) => {
    const payload = {
      ...defaultValues,
      PolicyType: plan
    }
    saveFormDispatch(payload)
    putVechileDispatch(payload)
  }
  const onSubmit = (data) => {
    saveFormDispatch(data)
    putVechileDispatch(data)
  }

  useEffect(() => {
    if (quotationId) {
      getQuoteDetailsDispatch(quotationId)
    }
  }, [quotationId])

  useEffect(() => {
    if (MotorPersonalInfo !== undefined && MotorVehicleInfo !== undefined) {
      const defValues = _.merge(MotorPersonalInfo, MotorVehicleInfo)
      setDefaultValues(defValues)
      setPlan('00')
    }
  }, [MotorPersonalInfo, MotorVehicleInfo])

  // Post Success
  useEffect(() => {
    if (postPlanStatus) {
      setSessionStorage(MOTOR_FORM.ACTIVE_STEP, 3)
      toast.success('Plan informations have been saved!', { duration: 3000 })
      next()
    }
  }, [postPlanStatus])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid
        container
        direction='row'
        justifyContent='center'
        alignItems='flex-start'
        spacing={2}
      >
        {(() => {
          if (plan === '00') {
            return (
              <>
                <Grid item xs={12}>
                  <h4 className='form-title-md'>Motor Insurance Plans</h4>
                </Grid>
                <Grid item md={3}>
                  <ul className='ul-info'>
                    <div>You can select a plan for your car</div>
                    <li>Compulsory Expense <InfoPopup info="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s," /></li>
                    <li>Loss of use <InfoPopup info="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s," /></li>
                    <li>Driver at fault <InfoPopup info="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s," /></li>
                    <li>AIC cover <InfoPopup info="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s," /></li>
                    <li>Replacement car <InfoPopup info="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s," /></li>
                    <li>Alloy wheel <InfoPopup info="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s," /></li>
                    <li>Excess waiver <InfoPopup info="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s," /></li>
                  </ul>
                </Grid>
                <Grid item md={9}>
                  <QuotationPlans planSelector={planSelector} />
                </Grid>
                <Grid item md={12} className='txt-right'>
                  <Button
                    variant='outlined'
                    color='primary'
                    className='mar-right-s'
                    onClick={() => back()}
                  >
                    Back
                  </Button>
                  <Button
                    variant='outlined'
                    color='primary'
                    className='mar-right-s'
                    onClick={() => next()}
                  >
                    Next
                  </Button>
                </Grid>
              </>
            )
          } else if (plan === null) {
            return (
              <>
                <Grid item xs={12}>
                  <h4 className='form-title-md'>Private Comprehensive Plan</h4>
                </Grid>
                <Grid item xs={9}>
                  <Grid
                    container
                    direction='row'
                    justifyContent='center'
                    alignItems='flex-start'
                    spacing={2}
                  >
                    <Grid item xs={6}>
                      <Grid
                        container
                        direction='row'
                        justifyContent='center'
                        alignItems='flex-start'
                        spacing={2}
                      >
                        <Grid item xs={12}>
                          <h4 className='form-title-md'>Extensions</h4>
                          <p>Extensions are included</p>
                        </Grid>
                        <Mselect
                          reset={reset}
                          xs={12}
                          name='loss_of_use'
                          label='Loss of use'
                          control={control}
                          options={alternativeData && alternativeData}
                          optionsLabel='ALTERNATIVECODE'
                          optionsValue='ALTERNATIVEID'
                          req
                        />
                        <Mselect
                          reset={reset}
                          xs={12}
                          name='aic_cover'
                          label='AIC cover'
                          control={control}
                          options={alternativeData && alternativeData}
                          optionsLabel='ALTERNATIVECODE'
                          optionsValue='ALTERNATIVEID'
                          req
                        />
                        <Mselect
                          reset={reset}
                          xs={12}
                          name='fault_compensation'
                          label='Driver At-fault Compensation'
                          control={control}
                          options={alternativeData && alternativeData}
                          optionsLabel='ALTERNATIVECODE'
                          optionsValue='ALTERNATIVEID'
                          req
                        />
                      </Grid>
                    </Grid>
                    <Grid item xs={6}>
                      <Grid
                        container
                        direction='row'
                        justifyContent='center'
                        alignItems='flex-start'
                        spacing={2}
                      >
                        <Grid item xs={12}>
                          <h4 className='form-title-md'>Extras</h4>
                          <p>&nbsp;</p>
                        </Grid>
                        <Mselect
                          reset={reset}
                          xs={12}
                          name='rodent_damage'
                          label='Rodent Damage'
                          control={control}
                          options={alternativeData && alternativeData}
                          optionsLabel='ALTERNATIVECODE'
                          optionsValue='ALTERNATIVEID'
                          req
                        />
                        <Mswitch
                          xs={12}
                          name='finance_gap'
                          label='Finance Gap'
                          info='Hello'
                          control={control}
                        />
                        <Mswitch
                          xs={12}
                          name='passive_terrorism'
                          label='Passive Terrorism'
                          info='Hello'
                          control={control}
                        />
                        <Mswitch
                          xs={12}
                          name='swan_agreed_repair'
                          label='Swan Agreed Repairer'
                          info='Hello'
                          control={control}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={3}>
                  <section className='summary-box bl'>
                    <div className='txt-center'>
                      <h4 className='summary-title'>MOTOR SUMMARY</h4>
                      <h5>Total</h5>
                      <h4 className='summary-heading'>Rs 20,713</h4>
                    </div>
                    <ul className='summary-ul bb'>
                      <div><h4 className='summary-heading-alt'>Vehicle Details <span><Icofont icon='pencil' /></span></h4></div>
                      <li>Make <span>Toyota</span></li>
                      <li>Model <span>Corolla</span></li>
                      <li>Sub Model <span>1.5</span></li>
                      <li>Engine Capacity <span>Rs 250</span></li>
                      <li>Reg. Month/Year <span>28/2022</span></li>
                    </ul>
                  </section>
                </Grid>
              </>
            )
          } else if (plan === 'loading') {
            return (
              <Grid item xs={24}>
                <p>Loading ....</p>
              </Grid>
            )
          } else {
            return (
              <Grid item xs={24}>
                <h4 className='form-title-md' style={{ paddingBottom: '40px' }}>You don't have a plan</h4>
                <Button
                  variant='outlined'
                  color='primary'
                  className='mar-right-s'
                  onClick={() => next()}
                >
                  Prev Step
                </Button>
                <Button
                  variant='outlined'
                  color='primary'
                  className='mar-right-s'
                  onClick={() => next()}
                >
                  Next Step
                </Button>
              </Grid>
            )
          }
        })()}
      </Grid>
    </form>
  )
}

const mapStateToProps = (state) => {
  const { ExtensionDropdown, MotorQuotation } = state
  return {
    MotorPersonalInfo: MotorQuotation?.getQuoteDetails?.personalDetails,
    MotorVehicleInfo: MotorQuotation?.getQuoteDetails?.vehicleDetails,
    postPlanStatus: MotorQuotation?.postVehicleStatus,
    getLimitDaysLoading: ExtensionDropdown.getLimitDaysLoading,
    limitDaysData: ExtensionDropdown.limitDaysData,
    getAlternativeLoading: ExtensionDropdown.getAlternativeLoading,
    alternativeData: ExtensionDropdown.alternativeData,
    getCompensationLoading: ExtensionDropdown.getCompensationLoading,
    yearOfLicenseData: ExtensionDropdown.yearOfLicenseData
  }
}

const mapDispatchToProps = (dispatch) => ({
  getQuoteDetailsDispatch: (id) => dispatch(MotorQuotationAction.GetQuoteDetailsAction(id)),
  saveFormDispatch: (data) => dispatch(MotorQuotationAction.SaveFormAction(data)),
  putVechileDispatch: (formData) => dispatch(MotorQuotationAction.PutVechileDetailsAction(formData)),

  getLimitDaysDropdownDispatch: (params) => dispatch(ExtensionDropdownActions.getLimitDaysRequest(params)),
  getAlternativeDropdownDispatch: (params) => dispatch(ExtensionDropdownActions.getAlternativeRequest(params)),
  getCompensationDropdownDispatch: (params) => dispatch(ExtensionDropdownActions.getCompensationRequest(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(FormMotorPlans)

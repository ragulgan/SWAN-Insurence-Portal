import React, { useState, useEffect, useRef } from 'react'
import { connect, shallowEqual, useSelector } from 'react-redux'
import { Grid, Button, CircularProgress } from '@material-ui/core'
import CustomBackdrop from '../../../../app/backdrop/CustomBackdrop'
import { useForm } from 'react-hook-form'
import { MotorQuotationAction } from '../../../../store/actions/index'

import { getSessionStorage, setSessionStorage, removeSessionStorage } from '../../../../helpers/helper'
import toast from 'react-hot-toast'
import QuotationPlans from '../../../../app/widgets/QuotationPlans'
import InfoPopup from '../../../../app/widgets/InfoPopup'
import _ from 'lodash'
import moment from 'moment'
import { ShowField } from '../../../../app/uiComponents'
import { VARIABLES, MOTOR_FORM } from '../../../../helpers/constants'
import FormExtensions from './_FormExtensions'

const FormMotorPlans = (props) => {
  const { quotationId } = useSelector(
    ({ Auth, Quotation }) => ({
      authRole: Auth.authRole,
      quotationId: Quotation.quotationId
    }),
    shallowEqual
  )

  const {
    back,
    next,
    changeStep,
    thirdDefault,
    backStep,
    MotorPersonalInfo,
    MotorVehicleInfo,
    getQuoteDetailsDispatch,
    saveFormDispatch,
    putVechileDispatch,
    postVehicleStatus,
    clearPutVechileDetailsAction,
    postVehicleInfoLoading,
    getQuoteDetails,
    getQuoteDetailsLoading,
    ClearMotQuoteDetailsDispatch,
    getQuoteDetailsStatus
  } = props
  const didMount = useRef(false)
  const [plan, setPlan] = useState('00')
  const [showExtensions, setShowExtensions] = useState(false)
  const [defaultValues, setDefaultValues] = useState({})
  const [state, setState] = useState({
    personalData: {},
    vehicleDetails: {},
    extensionDetails: {}
  })
  const personalDetailsData = state?.personalData
  const vehicleDetailsData = state?.vehicleDetails

  const planSelector = () => {
    const payload = {
      ...state.personalData,
      ...state.vehicleDetails,
      PolicyType: plan,
      PurchaseType: {
        value: `${defaultValues?.PurchaseType === 'Second Hand' ? 'Y' : 'N'}`,
        type: defaultValues?.PurchaseType
      }
    }
    saveFormDispatch(payload)
  }

  const getPlan = (_plan) => {
    setPlan(_plan)
    setSessionStorage(VARIABLES.PLAN_ID, _plan)
  }

  useEffect(() => {
    if(thirdDefault === "extension"){
      setShowExtensions(true)
    }
  }, [thirdDefault])

  useEffect(() => {
    const motorQuoteNo = getSessionStorage(MOTOR_FORM.QUOTE_NUMBER)
    getQuoteDetailsDispatch(motorQuoteNo)
  }, [])

  useEffect(() => {
    if (MotorPersonalInfo !== undefined && MotorVehicleInfo !== undefined) {
      const defValues = _.merge(MotorPersonalInfo, MotorVehicleInfo)
      setDefaultValues(defValues)
      setPlan(defValues?.PolicyType)
    }
  }, [MotorPersonalInfo, MotorVehicleInfo])

  useEffect(() => {
    if (postVehicleStatus === 'success') {
      toast.success('Plan informations have been saved!', { duration: 3000 })
      clearPutVechileDetailsAction()
      setShowExtensions(true)
    } else if (postVehicleStatus === 'error') {
      toast.error('Internal Server Error. Please Try again later.')
      clearPutVechileDetailsAction()
    }
  }, [postVehicleStatus])

  useEffect(() => {
    if (didMount.current && getQuoteDetailsStatus === 'success') {
      const vehicleDetails = getQuoteDetails &&
                getQuoteDetails.vehicleDetails
        ? getQuoteDetails.vehicleDetails
        : {}
      const personalInfo = getQuoteDetails &&
                getQuoteDetails.personalDetails
        ? getQuoteDetails.personalDetails
        : {}
      setState(prevState => ({
        ...prevState,
        personalData: personalInfo,
        vehicleDetails
      }))
    }
  }, [getQuoteDetailsStatus])

  const handlePlanSelector = () => {
    const payload = {
      ...personalDetailsData,
      ...vehicleDetailsData,
      DTBIRTH: moment(defaultValues.DTBIRTH).format('DD/MM/YYYY'),
      PolicyType: plan,
      PurchaseType: {
        value: `${defaultValues.PurchaseType == 'Second Hand' ? 'Y' : 'N'}`,
        type: defaultValues.PurchaseType
      }
    }
    putVechileDispatch(payload)
  }

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true
    }
  })

  return (
    <>
      <CustomBackdrop isLoading={getQuoteDetailsLoading} />
      <ShowField
        show={!showExtensions}
        yes={() => (
          <>
            <Grid
              container
              direction='row'
              justifyContent='center'
              alignItems='flex-start'
              spacing={2}
            >
              <ShowField
                show={plan !== 'loading'}
                showInProgress={plan === 'loading'}
                yes={() => (
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
                        <li>AR <InfoPopup info="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s," /></li>
                      </ul>
                    </Grid>
                    <Grid item md={9}>
                      <QuotationPlans planSelector={planSelector} getPlan={getPlan} />
                    </Grid>
                    <Grid item md={12} className='txt-right'>
                      <Button
                        variant='outlined'
                        color='primary'
                        className='mar-right-s'
                        onClick={() => {
                          removeSessionStorage(VARIABLES.PLAN_ID)
                          back()
                        }}
                      >
                        Back
                      </Button>
                      <Button
                        variant='contained' color='primary'
                        onClick={handlePlanSelector}
                        disabled={plan === '00' || plan === ''}
                      >
                        {postVehicleInfoLoading
                          ? (
                            <CircularProgress size={18} style={{ color: '#ffffff' }} />
                            )
                          : (
                              'Next'
                            )}
                      </Button>
                    </Grid>
                  </>
                )}
                no={() =>
                  <>
                    <Grid item xs={24}>
                      <h4 className='form-title-md' style={{ paddingBottom: '40px' }}>You don't have a plan</h4>
                      <Button
                        variant='outlined'
                        color='primary'
                        className='mar-right-s'
                        onClick={() => back()}
                      >
                        Prev Step
                      </Button>
                      <Button
                        variant='outlined'
                        color='primary'
                        className='mar-right-s'
                        onClick={() => setShowExtensions(true)}
                      >
                        Next Step
                      </Button>
                    </Grid>
                  </>}
              />
            </Grid>
          </>
        )}
        no={() => (
          <>
            <FormExtensions
              setShowExtensions={setShowExtensions}
              back={back}
              next={next}
              changeStep={changeStep}
              backStep={backStep}
            />
          </>
        )}
      />
    </>
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
    yearOfLicenseData: ExtensionDropdown.yearOfLicenseData,
    getQuoteDetails: MotorQuotation?.getQuoteDetails,
    getQuoteDetailsLoading: MotorQuotation?.getQuoteDetailsLoading,
    getQuoteDetailsStatus: MotorQuotation?.getQuoteDetailsStatus,
    postVehicleData: MotorQuotation?.postVehicleData,
    postVehicleStatus: MotorQuotation?.postVehicleStatus,
    postVehiclemessage: MotorQuotation?.postVehiclemessage,
    postVehicleInfoLoading: MotorQuotation?.postVehicleInfoLoading
  }
}

const mapDispatchToProps = (dispatch) => ({
  getQuoteDetailsDispatch: (id) => dispatch(MotorQuotationAction.GetQuoteDetailsAction(id)),
  saveFormDispatch: (data) => dispatch(MotorQuotationAction.SaveFormAction(data)),
  putVechileDispatch: (formData) => dispatch(MotorQuotationAction.PutVechileDetailsAction(formData)),
  clearPutVechileDetailsAction: () => dispatch(MotorQuotationAction.ClearPutVechileDetailsAction()),
  ClearMotQuoteDetailsDispatch: () =>
    dispatch(MotorQuotationAction.ClearMotQuoteDetailsAction())
})

export default connect(mapStateToProps, mapDispatchToProps)(FormMotorPlans)

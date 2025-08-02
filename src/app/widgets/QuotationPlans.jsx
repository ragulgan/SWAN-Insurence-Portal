import React, { useEffect, useState, useRef } from 'react'
import AliceCarousel from 'react-alice-carousel'
import moment from 'moment'
import Icofont from 'react-icofont'
import { connect, shallowEqual, useSelector } from 'react-redux'
import { MotorPlanActions } from '../../store/actions/motorPlanAction'

import { MotorQuotationAction } from '../../store/actions/index'
import _ from 'lodash'
import 'react-alice-carousel/lib/alice-carousel.css'
import { makeStyles } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import {
  getSessionStorage
} from '../../helpers/helper'
import { VARIABLES } from 'helpers/constants'

const responsive = {
  0: { items: 4 },
  568: { items: 6 },
  1024: { items: 4 },
  2000: { items: 6 }
}

const QuotationPlans = (props) => {
  const { authRole } = useSelector(
    ({ Auth }) => ({
      authRole: Auth.authRole
    }),
    shallowEqual
  )
  const {
    ClearMotQuoteDetailsDispatch,
    motorPlanData,
    motorPlansDispatch,
    MotorPersonalInfo,
    MotorVehicleInfo,
    putVechileDispatch
  } = props
  const didMount = useRef(false)
  const [polcd, setPolcd] = useState('00')
  const [defaultValues, setDefaultValues] = useState({})
  const [planItems, setPlanItems] = useState(null)

  const useStyles = makeStyles((theme) => ({
    planSelect: {
      border: '3px solid blue'
    }
  }
  ))
  const classes = useStyles()
  const editPlanId = getSessionStorage(VARIABLES.PLAN_ID)

  const handlePlanSelector = (plan) => {
    setPolcd(plan)
    props.getPlan(plan)
  }

  useEffect(() => {
    if (!didMount.current) {
      setPolcd(editPlanId || '')
      props.getPlan(editPlanId || '')
    }
  }, [])

  useEffect(() => {
    if (MotorPersonalInfo !== undefined && MotorVehicleInfo !== undefined) {
      const defValues = _.merge(MotorPersonalInfo, MotorVehicleInfo)
      setDefaultValues(defValues)
      ClearMotQuoteDetailsDispatch()
    }
  }, [MotorPersonalInfo, MotorVehicleInfo])

  useEffect(() => {
    motorPlansDispatch(polcd)
  }, [])

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true
    }
  })

  useEffect(() => {
    if (motorPlanData) {
      const tArray = []
      _.forEach(motorPlanData, function (plan, index) {
        if (authRole === 'customer') {
          tArray.push(<div key={index} className='item' data-value={index++} onClick={() => { handlePlanSelector(plan.POLCD) }}>
            <div className='plan-box-blue'>
              <div className='plan-header'>
                <h4>{plan.TITLE}</h4>
              </div>
              <div className={`plan-content ${plan.POLCD === polcd ? 'plan-content_active' : ''}`}>
                <ul className={`${classes.planSelect} ul-plans`}>
                  <li className={classes.planSelect}>{plan.COMPLUSORYEXPENSE}</li>
                  <li>{plan.LOSSOFUSE}</li>
                  <li>{plan.DRIVERATFAULT}</li>
                  <li>{plan.AICCOVER}</li>
                  <li>{plan.REPLACEMENT === 'true' ? <Icofont icon='check-alt' /> : <Icofont icon='close-line' />}</li>
                  <li>{plan.ALLOYWHEEL === 'true' ? <Icofont icon='check-alt' /> : <Icofont icon='close-line' />}</li>
                  <li>{plan.EXCESSWAIVER === 'true' ? <Icofont icon='check-alt' /> : <Icofont icon='close-line' />}</li>
                  <li>{plan.AR === 'true' ? <Icofont icon='check-alt' /> : <Icofont icon='close-line' />}</li>
                </ul>
              </div>
            </div>
                      </div>)
        } else {
          tArray.push(<div
            key={index} className='item' data-value={index++}
            onClick={() => { handlePlanSelector(plan.POLCD) }}
                      >
            <div className='plan-box-blue'>
              <div className='plan-header'>
                <h4>{plan.TITLE}</h4>
              </div>
              <div className={`plan-content ${plan.POLCD === polcd ? 'plan-content_active' : ''}`}>
                <ul className={`${classes.planSelect} ul-plans`}>
                  <li className={classes.planSelect}>{plan.COMPLUSORYEXPENSE}</li>
                  <li>{plan.LOSSOFUSE}</li>
                  <li>{plan.DRIVERATFAULT}</li>
                  <li>{plan.AICCOVER}</li>
                  <li>{plan.REPLACEMENT === 'true' ? <Icofont icon='check-alt' /> : <Icofont icon='close-line' />}</li>
                  <li>{plan.ALLOYWHEEL === 'true' ? <Icofont icon='check-alt' /> : <Icofont icon='close-line' />}</li>
                  <li>{plan.EXCESSWAIVER === 'true' ? <Icofont icon='check-alt' /> : <Icofont icon='close-line' />}</li>
                  <li>{plan.AR === 'true' ? <Icofont icon='check-alt' /> : <Icofont icon='close-line' />}</li>
                </ul>
              </div>
            </div>
                      </div>)
        }
      })

      setPlanItems(tArray)
    }
  }, [motorPlanData, polcd])
  return (
    <>
      <button
        onClick={() => {
          const payload = {
            ...defaultValues,
            DTBIRTH: moment(defaultValues.DTBIRTH).format('DD/MM/YYYY'),
            PurchaseType: {
              value: `${defaultValues.PurchaseType == 'Second Hand' ? 'Y' : 'N'}`,
              type: defaultValues.PurchaseType
            }
          }
          putVechileDispatch(payload)
        }}
        className='d-none' id='postPlan-btn'
      />
      <section className='plans-widget'>
        {planItems
          ? (
            <AliceCarousel
              mouseTracking
              items={planItems}
              responsive={responsive}
              controlsStrategy='responsive'
              autoPlayStrategy='none'
              disableDotsControls
            />
            )
          : <div className='d-flex align-items-center'>
            <CircularProgress color='inherit' align='center' />
            </div>}
      </section>
    </>
  )
}

const mapStateToProps = state => {
  const { MotorPlan, MotorQuotation } = state
  return {
    getMotorPlanLoading: MotorPlan.getMotorPlanLoading,
    motorPlanData: MotorPlan.motorPlanData,
    MotorPersonalInfo: MotorQuotation?.getQuoteDetails?.personalDetails,
    MotorVehicleInfo: MotorQuotation?.getQuoteDetails?.vehicleDetails
  }
}

const mapDispatchToProps = dispatch => ({
  motorPlansDispatch: (polcd) => dispatch(MotorPlanActions.getMotorPlanRequest(polcd)),
  ClearMotQuoteDetailsDispatch: () => dispatch(MotorQuotationAction.ClearMotQuoteDetailsAction()),
  putVechileDispatch: (formData) => dispatch(MotorQuotationAction.PutVechileDetailsAction(formData))
})

export default connect(mapStateToProps, mapDispatchToProps)(QuotationPlans)

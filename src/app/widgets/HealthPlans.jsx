import React, { useEffect, useState } from 'react'
import AliceCarousel from 'react-alice-carousel'
import moment from 'moment'
import Icofont from 'react-icofont'
import { connect, shallowEqual, useSelector } from 'react-redux'
import { HealthActions } from 'store/actions'
import _ from 'lodash'
import 'react-alice-carousel/lib/alice-carousel.css'

const responsive = {
  0: { items: 1 },
  568: { items: 3 },
  1024: { items: 4 },
  1600: { items: 6 },
  2000: { items: 6 }
}

const HealthPlans = (props) => {
  const { authRole } = useSelector(
    ({ Auth }) => ({
      authRole: Auth.authRole
    }),
    shallowEqual
  )
  const {
    planSelector,
    selectedPlans,
    healthPlansDispatch,
    healthLoading,
    healthPlans
  } = props
  const [planId, setPlanId] = useState('00')
  const [planList, setPlanList] = useState(null)
  const [nextItem, setNextItem] = useState(null)
  const [prevItem, setPrevItem] = useState(null)
  const [plans, setPlans] = useState(null)

  const onSliderChange = (event) => {
    setNextItem(event.isNextSlideDisabled)
    setPrevItem(event.isPrevSlideDisabled)
  }

  useEffect(() => {
    healthPlansDispatch(planId)
  }, [])

  useEffect(() => {
    if (selectedPlans) {
      const pTemp = []
      _.forEach(selectedPlans, function (pl) {
        pTemp.push(pl.planTitle)
      })

      setPlans(pTemp)
    }
  }, [selectedPlans])

  useEffect(() => {
    if (healthPlans) {
      const pArray = []
      _.forEach(healthPlans, function (plan, index) {
        pArray.push(<div key={index} className='item' data-value={index++} onClick={() => planSelector(plan.TITLE, plan.POLCD)}>
          <div className='plan-box-blue'>
            <div className='plan-header'>
              <h4>{plan.TITLE}</h4>
            </div>
            <div className='plan-content'>
              <ul className={_.includes(plans, String(plan.POLCD)) ? 'ul-plans selected' : 'ul-plans'}>
                <li className='li-div'>Rs 3,233</li>
                <li>Rs 300,000 1 illness</li>
                <li>Rs 15,000 Annual Limit</li>
                <li>Rs 10,000 Annual Limit</li>
                <li>Rs 625,000 Lifetime Limit</li>
                <li>-</li>
                <li>-</li>
                <li>-</li>
                <li>-</li>
              </ul>
            </div>
          </div>
                    </div>)
      })

      setPlanList(pArray)
    }
  }, [healthPlans, plans])

  return (
    <>
      <section className={`plans-widget ${prevItem ? '' : 'prevItem'} ${nextItem ? '' : 'nextItem'}`}>
        {planList
          ? (
            <AliceCarousel
              mouseTracking
              items={planList}
              responsive={responsive}
              controlsStrategy='alternate'
              disableDotsControls
              onSlideChange={onSliderChange}
              onSlideChanged={onSliderChange}
              onInitialized={onSliderChange}
            />
            )
          : 'Loading ...'}
      </section>
    </>
  )
}

const mapStateToProps = state => {
  const { Health } = state
  return {
    healthLoading: Health.healthLoading,
    healthPlans: Health.healthPlans
  }
}

const mapDispatchToProps = dispatch => ({
  healthPlansDispatch: (planId) => dispatch(HealthActions.GetHealthPlans(planId))
})

export default connect(mapStateToProps, mapDispatchToProps)(HealthPlans)

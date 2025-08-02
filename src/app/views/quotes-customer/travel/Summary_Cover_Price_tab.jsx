import React, { Fragment } from 'react'
import { Grid, Divider } from '@material-ui/core'
import { useForm } from 'react-hook-form'

const SummaryCoverPriceDetails = (props) => {
  const { fromPage, back, next } = props
  const {
    control,
    handleSubmit,
    formState
  } = useForm({
    defaultValues: {
      choose_destination: ''
    }
  })

  const onSubmit = (data) => {
    console.log('data -', data)
    next()
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid
        container
        direction='row'
        justifyContent='center'
        alignItems='flex-start'
        spacing={2}
      >
        <Grid item xs={12} sm={12} md={12} className='summary-box motor-summary'>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={12}>
              <h4 className='summary-heading'>Full Quotation</h4>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <ul className='summary-ul bb'>
                <li className='txt-bb'>
                  Delta Coverage Plan <span>Rs 1,259</span>
                </li>
                <li>
                  Medical emergency and related expenses<span>Rs 250 000</span>
                </li>
                <li>
                  Burial, Cremation or Return of Mortal Remains{' '}
                  <span>Rs 100 000</span>
                </li>
                <li>
                  Legal Assistance <span>Rs 10 000</span>
                </li>
                <li>
                  Personal Liability Insurance <span>Rs 250 000</span>
                </li>
                <li>
                  Cancellation, Curtailment Alteration & Expenses{' '}
                  <span>Rs 50 000</span>
                </li>
                <li>
                  Personal Accident, Death & Permanent Disability{' '}
                  <span>Rs 500 000</span>
                </li>
              </ul>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <ul className='summary-ul bb'>
                <li className='txt-bb'>Extra</li>
                <li className='txt-bb'>
                  Regular <span>Rs 602</span>
                </li>
                <li>
                  Baggage Insurance <span>Rs 20 000</span>
                </li>
                <li>
                  Money & Document Insurance <span>Rs 4 000</span>
                </li>
              </ul>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <ul className='summary-ul bb'>
                <li className='txt-bb'>Additional Fees</li>
                <li>
                  FSC Fee: <span>Rs 250</span>
                </li>
                <li>
                  Fees and Charges: <span>Rs 9</span>
                </li>
              </ul>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <ul className='summary-ul'>
                <li className='txt-bb'>
                  Total <span>Rs 2 120</span>
                </li>
              </ul>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  )
}

export default SummaryCoverPriceDetails

import React, { useState } from 'react'
import { Grid, Button } from '@material-ui/core'
import SaveQuoteConfirmation from '../../../../app/widgets/SaveQuoteConfirmation'

const ViewTravelQuote = () => {
  const [popConfirm, setPopConfirm] = useState(false)
  const LoginHandler = () => {
    setPopConfirm(true)
  }
  const handleClose = () => {
    setPopConfirm(false)
  }
  return (
    <Grid container direction='row' justifyContent='center' alignItems='center'>
      <Grid item xs={12} sm={9} md={9}>
        <Grid
          container
          direction='row'
          justifyContent='center'
          alignItems='center'
          spacing={4}
          className='puplic-pages'
        >
          <Grid item xs={12} sm={9} md={9}>
            <p className='hero-txt-travel'>
              The quotation has been sent to you by email. A Swan representative
              will contact you within 2 working days. You can call Swan on 207
              3500 for any other information.
            </p>
          </Grid>
          <Grid item xs={12} sm={5} md={5}>
            <section className='summary-box'>
              <Grid
                container
                alignItems='center'
                justifyContent='flex-end'
                spacing={{ xs: 2, md: 2, lg: 2, xl: 4 }}
                rowSpacing={{ xs: 1, sm: 4, md: 2, lg: 2 }}
              >
                <Grid item xs={12} sm={12} md={12}>
                  <h4 className='summary-heading'>Summary</h4>
                </Grid>
                <Grid item xs={7} sm={7} md={7}>
                  <h4 className='summary-heading'>Provisional Quote</h4>
                </Grid>
                <Grid item xs={5} sm={5} md={5} className='txt-right'>
                  <Button variant='outlined' className='orange-btn'>
                    SENT TO SWAN
                  </Button>
                </Grid>
              </Grid>
              <ul className='summary-ul bb'>
                <div>
                  <h4 className='summary-heading-alt'>Personal Information</h4>
                </div>
                <li>
                  Full Name <span>Javin Hong Wa Ban</span>
                </li>
                <li>
                  Quote Number: <span>TRV122321</span>
                </li>
              </ul>
              <ul className='summary-ul bb'>
                <div>
                  <h4 className='summary-heading-alt'>Travel Details</h4>
                </div>
                <li>
                  Destination <span>France, England, Dubai</span>
                </li>
                <li className='txt-bb'>Travelling Dates</li>
                <li>
                  Depature <span>15/09/2022</span>
                </li>
                <li>
                  Arrival <span>25/09/2022</span>
                </li>
              </ul>
              <ul className='summary-ul bb'>
                <div>
                  <h4 className='summary-heading-alt'>Cover Plan</h4>
                </div>
                <li>
                  DELTA <span>Rs 1259</span>
                </li>
                <li>
                  Regular <span>Rs 602</span>
                </li>
              </ul>
            </section>
            <Grid
              item
              xs={12}
              md={12}
              sm={12}
              className='txt-right submit-button'
              style={{ padding: '30px 0px' }}
            >
              <Button
                variant='outlined'
                color='primary'
                className='mar-right-s back-button1'
                onClick={() => {
                  setPopConfirm(true)
                }}
              >
                SAVE QUOTE
              </Button>
              <SaveQuoteConfirmation
                open={popConfirm}
                close={handleClose}
                logout={LoginHandler}
              />
              <Button variant='contained' className='btn-space next-button1' type='submit' color='primary'>
                DOWNLOAD QUOTE
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={7} md={7}>
            <section className='quote-summary'>
              <div className='quote-summary-header blue-header'>
                <h4>Full Quotation</h4>
              </div>
              <div className='quote-summary-content summary-box'>
                <ul className='summary-ul bb'>
                  <li className='price-bold-header'>
                    Delta Coverage Plan{' '}
                    <span className='price-bold'>Rs 1,259</span>
                  </li>
                  <li>
                    Medical emergency and related expenses
                    <span>Rs 250 000</span>
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
                <ul className='summary-ul bb'>
                  <li className='txt-bb'>Extra</li>
                  <li className='price-bold-header'>
                    Regular <span className='price-bold'>Rs 602</span>
                  </li>
                  <li>
                    Baggage Insurance <span>Rs 20 000</span>
                  </li>
                  <li>
                    Money & Document Insurance <span>Rs 4 000</span>
                  </li>
                </ul>
                <ul className='summary-ul bb'>
                  <li className='price-bold-header'>Additional Fees</li>
                  <li>
                    FSC Fee: <span>Rs 250</span>
                  </li>
                  <li>
                    Fees and Charges: <span>Rs 9</span>
                  </li>
                </ul>
                <ul className='summary-ul'>
                  <li className='price-bold-header'>
                    Total <span className='price-bold'>Rs 2 120</span>
                  </li>
                </ul>
              </div>
            </section>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ViewTravelQuote

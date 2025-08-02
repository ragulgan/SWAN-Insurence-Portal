import React from 'react'
import { Grid, Button } from '@material-ui/core'

const ViewQuote = () => {
  return (
    <Grid
      container
      direction='row'
      justifyContent='center'
      alignItems='center'
      spacing={2}
      className='puplic-pages'
    >
      <Grid item xs={12} sm={8} md={8}>
        <p className='hero-txt'>Documents have been sent to Swan for processing. You will be informed once approved. You can call Swan on 207 3500 for any other information.</p>
      </Grid>
      <Grid item xs={12} sm={5} md={5}>
        <section className='summary-box'>
          <Grid
            container
            alignItems='center'
            justifyContent='flex-end'
            spacing={0}
          >
            <Grid item xs={12} md={8}>
              <h4 className='summary-heading'>Provisional Quote</h4>
            </Grid>
            <Grid item xs={12} md={4} className='txt-right'>
              <Button variant='outlined' className='orange-btn'>
                SENT TO SWAN
              </Button>
            </Grid>
          </Grid>
          <ul className='summary-ul bb'>
            <div>
              <h4 className='summary-heading-alt'>Summary</h4>
            </div>
            <li>Name <span>Javin Badin Hong Wa Ban</span></li>
            <li>Quote Number: <span>MTA12345</span></li>
            <li>Quote Date: <span>15/09/2022</span></li>
            <li>Quote Validity: <span>15 Days</span></li>
          </ul>
          <ul className='summary-ul bb'>
            <div>
              <h4 className='summary-heading-alt'>Vehicle Details</h4>
            </div>
            <li>Make <span>Toyota</span></li>
            <li>Model <span>Corolla</span></li>
            <li>Sub Model <span>1.5</span></li>
            <li>Engine Capacity <span>1200</span></li>
            <li>Reg. Month/Year <span>10/2022</span></li>
          </ul>
        </section>
      </Grid>
      <Grid item xs={12} sm={7} md={7}>
        <section className='quote-summary'>
          <div className='quote-summary-header blue-header'>
            <h4>Full Quotation</h4>
          </div>
          <div className='quote-summary-content summary-box'>
            <ul className='summary-ul bb'>
              <div>
                <h5 className='summary-title'>Private Comprehensive</h5>
              </div>
              <li>Cover Type <span>Protect new car</span></li>
              <li>Compulsory excess <span>8000 - 5000</span></li>
              <li>Loss of use <span>30/Rs4000</span></li>
              <li>Driver at fault compensation<span>Rs 1,000,000</span></li>
              <li>AIC cover <span>S-Death: Rs500,000; P-Dis: Rs500,000</span></li>
              <li>Replacement car <span>Yes</span></li>
              <li>Alloy wheel <span>Yes</span></li>
              <li>Excess waiver <span>Yes</span></li>
            </ul>
            <ul className='summary-ul bb'>
              <div>
                <h5 className='summary-title'>Extra</h5>
              </div>
              <li>Finance gap <span>Yes</span></li>
              <li>Passive terrorism<span>Yes</span></li>
            </ul>
            <ul className='summary-ul bb'>
              <div>
                <h5 className='summary-title'>Additional Fees</h5>
              </div>
              <li>FSC Fee <span>Rs 250</span></li>
              <li>Policy Fee<span>Rs 9</span></li>
            </ul>
            <ul className='summary-ul'>
              <li className='txt-bb'>Total <span>Rs 30,250</span></li>
            </ul>
          </div>
        </section>
      </Grid>
    </Grid>
  )
}

export default ViewQuote

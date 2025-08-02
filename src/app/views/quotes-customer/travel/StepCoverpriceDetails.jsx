import React, { Fragment, useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Icofont from 'react-icofont'

const StepCoverpriceDetails = () => {
  const [activeBox, setActiveBox] = useState(null)
  const [activePack, setActivePack] = useState(null)

  return (
    <>
      {
                (() => {
                  if (activeBox === null) {
                    return (
                      <Grid
                        container
                        alignItems='center'
                        spacing={1}
                      >
                        <Grid item md={12}>
                          <h4 className='form-title-md'>Travel Insurance Plans</h4>
                        </Grid>
                        <Grid item md={3}>
                          <h4>Select the preferred plan of your client</h4>
                          <ul className='plan-ul'>
                            <li>Medical emergency and related expenses</li>
                            <li>Burial, Cremation or Return of Mortal Remains</li>
                            <li>Legal Assistance</li>
                            <li>Personal Liability Insurance</li>
                            <li>Cancellation, Curtailment Alteration & Expenses</li>
                            <li>Personal Accident, Death & Permanent Disability</li>
                          </ul>
                        </Grid>
                        <Grid item md={9}>
                          <Grid container spacing={3}>
                            <Grid item md={3}>
                              <section
                                className={`${activeBox === 'delta' ? 'plan-box active-box' : 'plan-box'}`}
                                onClick={() => setActiveBox('delta')}
                              >
                                <h4>DELTA</h4>
                                <h3>Rs 1,259</h3>
                                <p>Rs 250,000</p>
                                <p>Rs 100,000</p>
                                <p>Rs 10,000</p>
                                <p>Rs 250,000</p>
                                <p>Rs 5,000</p>
                                <p>Rs 500,000</p>
                              </section>
                            </Grid>
                            <Grid item md={3}>
                              <section
                                className={`${activeBox === 'atlas' ? 'plan-box active-box' : 'plan-box'}`}
                                onClick={() => setActiveBox('atlas')}
                              >
                                <h4>ATLAS</h4>
                                <h3>Rs 1,620</h3>
                                <p>Rs 500,000</p>
                                <p>Rs 100,000</p>
                                <p>Rs 15,000</p>
                                <p>Rs 500,000</p>
                                <p>Rs 25,000</p>
                                <p>Rs 1,000,000</p>
                              </section>
                            </Grid>
                            <Grid item md={3}>
                              <section
                                className={`${activeBox === 'explorer' ? 'plan-box active-box' : 'plan-box'}`}
                                onClick={() => setActiveBox('explorer')}
                              >
                                <h4>EXPLORER</h4>
                                <h3>Rs 2,343</h3>
                                <p>Rs 1,500,000</p>
                                <p>Rs 100,000</p>
                                <p>Rs 10,000</p>
                                <p>Rs 250,000</p>
                                <p>Rs 50,000</p>
                                <p>Rs 500,000</p>
                              </section>
                            </Grid>
                            <Grid item md={3}>
                              <section
                                className={`${activeBox === 'compass' ? 'plan-box active-box' : 'plan-box'}`}
                                onClick={() => setActiveBox('compass')}
                              >
                                <h4>COMPASS</h4>
                                <h3>Rs3,065</h3>
                                <p>Rs 1,500,000</p>
                                <p>Rs 100,000</p>
                                <p>Rs 25,000</p>
                                <p>Rs 2,500,000</p>
                                <p>Rs 100,000</p>
                                <p>Rs 5,000,000</p>
                              </section>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    )
                  } else {
                    return (
                      <Grid container spacing={1}>
                        <Grid item md={12}>
                          <h2 className='article-title' onClick={() => setActiveBox(null)}><Icofont icon='arrow-left' /> &nbsp; {activeBox} Coverage Plan</h2>
                        </Grid>
                        <Grid item md={9}>
                          <Grid container spacing={3}>
                            <Grid item md={4}>
                              <section
                                className={`${activePack === 'light' ? 'plan-box active-box' : 'plan-box'}`}
                                onClick={() => setActivePack('light')}
                              >
                                <h4>LIGHT</h4>
                                <p>Light Regular includes a baggage, money and document insurance</p>
                                <p><span>Rs 602</span></p>
                                <p className='separator-center'>More Details</p>
                                <p>Baggage Insurance <span>Rs 15,000</span></p>
                                <p>Money & Document Insurance <span>Rs 2,000</span></p>
                              </section>
                            </Grid>
                            <Grid item md={4}>
                              <section
                                className={`${activePack === 'regular' ? 'plan-box active-box' : 'plan-box'}`}
                                onClick={() => setActivePack('regular')}
                              >
                                <h4>REGULAR</h4>
                                <p>Delta Regular includes a baggage, money and document insurance</p>
                                <p><span>Rs 602</span></p>
                                <p className='separator-center'>More Details</p>
                                <p>Baggage Insurance <span>Rs 20,000</span></p>
                                <p>Money & Document Insurance <span>Rs 4,000</span></p>
                              </section>
                            </Grid>
                            <Grid item md={4}>
                              <section
                                className={`${activePack === 'bold' ? 'plan-box active-box' : 'plan-box'}`}
                                onClick={() => setActivePack('bold')}
                              >
                                <h4>BOLD</h4>
                                <p>Bold includes a baggage, money and document insurance</p>
                                <p><span>Rs 602</span></p>
                                <p className='separator-center'>More Details</p>
                                <p>Baggage Insurance <span>Rs 30,000</span></p>
                                <p>Money & Document Insurance <span>Rs 6,000</span></p>
                              </section>
                            </Grid>
                          </Grid>
                          <Grid container spacing={3}>
                            <Grid item md={6}>
                              <h4>Passive Terrorism</h4>
                              <p>Do you want the passive terrorism cover?</p>
                            </Grid>
                            <Grid item md={6}>
                              <h4>COVID-19 Extension</h4>
                              <p>Do you want a COVID-19 extension? </p>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item md={3}>
                          <section className='travel-summary'>
                            <h4>TRAVEL SUMMARY</h4>
                            <h5>Total</h5>
                            <h4>Rs 2713</h4>
                            <ul>
                              <div>Coverage Plan <span /></div>
                              <li>Delta <span>Rs 1259</span></li>
                              <li>Regular <span>Rs 602</span></li>
                              <li>Premium <span>Rs 1861</span></li>
                            </ul>
                            <ul>
                              <li>FSC Fee <span>Rs 250</span></li>
                              <li>Fees and Charge <span>Rs 602</span></li>
                            </ul>
                            <ul>
                              <li>TOTAL <span /></li>
                            </ul>
                            <ul>
                              <div>Travel Details <span /></div>
                              <li>Destination <span>France</span></li>
                              <li>Departure <span>18 Aug 2022</span></li>
                              <li>Return <span>18 Sep 2022</span></li>
                              <li>Duration <span>33 days</span></li>
                              <li>Travellers <span>1 Adult</span></li>
                            </ul>
                          </section>
                        </Grid>
                      </Grid>
                    )
                  }
                })()
            }
    </>
  )
}

export default StepCoverpriceDetails

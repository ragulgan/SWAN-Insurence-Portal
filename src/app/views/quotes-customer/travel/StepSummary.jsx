import React, { useState } from 'react'
import { Grid, Box, Tabs, Tab, Button } from '@material-ui/core'
import Icofont from 'react-icofont'

function TabPanel (props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  )
}
const StepSummaryPage = () => {
  const [value, setValue] = useState(2)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Grid container spacing={1}>
      <Grid item md={4}>
        <section className='full-summary'>
          <h4>TRAVEL SUMMARY</h4>
          <h4>Rs 2713</h4>
          <ul>
            <li>Name <span>Javin Hong Wa Ban</span></li>
            <li>Quotation Number <span>TRV12345</span></li>
            <li>Destination <span>France</span></li>
            <li>Quotation Date <span>05/09/2022</span></li>
            <li>Departure <span>15/09/2022</span></li>
            <li>Return <span>25/09/2022</span></li>
          </ul>
          <ul>
            <div>
              Fees
            </div>
            <li>FSC Fee <span>Rs 250</span></li>
            <li>Fees and Charges <span>Rs 30</span></li>
            <li>Premium <span>Rs 1,000</span></li>
          </ul>
          <ul>
            <li>Total Premium <span>Rs 1,861</span></li>
          </ul>
          <div>
            <Button variant='outlined'>EMAIL QUOTE</Button>
          </div>
        </section>
      </Grid>
      <Grid item md={2} />
      <Grid item md={6}>
        <section className='quote-summary'>
          <div className='quote-summary-header'>
            <Button href='#text-buttons' color='primary'>
              <Icofont icon='pencil-alt-2' /> &nbsp; EDIT
            </Button>
            <Button href='#text-buttons' color='primary'>
              <Icofont icon='download-alt' /> &nbsp; DOWNLOAD QUOTE
            </Button>
          </div>
          <div className='quote-summary-content'>
            <Tabs
              value={value}
              indicatorColor='primary'
              textColor='primary'
              onChange={handleChange}
              aria-label='tabs'
            >
              <Tab label='Personal Information' />
              <Tab label='Travel Plans' />
              <Tab label='Cover price & Details' />
            </Tabs>
            <TabPanel value={value} index={0} />
            <TabPanel value={value} index={1} />
            <TabPanel value={value} index={2} />
          </div>
        </section>
      </Grid>
    </Grid>
  )
}

export default StepSummaryPage

import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CachedIcon from '@material-ui/icons/Cached'
import Chart from 'react-apexcharts'

const useStyles = makeStyles(theme => ({
  paper: {
    flexDirection: 'column'
  },
  h3: {
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '24px',
    lineHeight: '36px',
    color: '#001F72',
    margin: '14px 0px 13px 12px'
  }
}))

const BarChart = () => {
  const classes = useStyles()
  const BarChartData = {
    series: [{
      name: 'Pending',
      data: [44, 0, 0, 0, 0, 0]
    }, {
      name: 'Approved',
      data: [13, 0, 0, 0, 0, 0]
    }, {
      name: 'Canceled',
      data: [11, 0, 0, 0, 0, 0]
    }, {
      name: 'Rejected',
      data: [21, 0, 0, 0, 0, 0]
    },
    {
      name: 'Other',
      data: [21, 0, 0, 0, 0, 0]
    }
    ],
    options: {
      chart: {
        type: 'bar',
        height: 300,
        width: 400,
        stacked: true,
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%'

        }
      },
      dataLabels: {
        enabled: false,
        formatter: function (val) {
          return val
        },
        offsetX: -20,
        style: {
          fontSize: '12px',
          colors: ['#304758']
        }
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
        radius: 50
      },

      xaxis: {
        categories: [
          'Motor', 'Health', 'Home', 'Travel', 'Marine', 'Others'
        ],

        labels: {
          style: {
            fontSize: '10px'
          }
        }
      },
      legend: {
        position: 'right',
        offsetY: -3,
        markers: {
          radius: 12
        },
        itemMargin: {
          horizontal: 20,
          vertical: 3
        }
      },
      fill: {
        opacity: 1
      },

      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0
            }
          }
        }
      ]

    }
  }
  return (
    <>
      <h3 className='text-primaryBlue fw-bold'>Policies Status</h3>
      <div className='d-flex align-items-center'>
        <CachedIcon className='text-dark-50 mr-2' />
        <p className='text-dark-50 fs-8 fw-300 m-0'>4 August 2022 - 2:10 PM</p>
      </div>
      <Chart
        options={BarChartData.options}
        series={BarChartData.series}
        type='bar'
        height='220'
      />
    </>

  )
}

export default BarChart

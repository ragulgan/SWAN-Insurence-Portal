import React from 'react'
import CachedIcon from '@material-ui/icons/Cached'
import Chart from 'react-apexcharts'

const DonutChart = ({ current_date }) => {
  const donutchartData = {
    series: [0, 0, 0, 0, 100],
    options: {
      bar: {
        width: 100,
        height: '200px',
        type: 'donut',
        dataLabels: {
          position: 'top'
        }
      },
      dataLabels: {
        enabled: true,
        style: {
          colors: ['#ffffff']
        },
        offsetX: 60
      },
      colors: ['#B11E8D', '#00B8CE', '#EE5BA0', '#A7B93A', '#28d821'],
      labels: ['Travel', 'Marine', 'Home', 'Health', 'Motor'],
      legend: {
        itemMargin: {
          horizontal: 20,
          vertical: 3
        }
      },

      states: {
        hover: {
          filter: 'none'
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'

            }
          }
        }
      ]
      // fill: {
      //     colors:["#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#34495e", "#16a085", "#27ae60", "#2980b9", "#8e44ad", "#2c3e50", "#f1c40f", "#e67e22", "#e74c3c", "#ecf0f1", "#95a5a6", "#f39c12", "#d35400", "#c0392b", "#bdc3c7", "#7f8c8d"]
      // },
    }
  }
  return (
    <>
      <h3 className='text-primaryBlue fw-bold'>Quotation Status</h3>
      <div className='d-flex align-items-center'>
        <CachedIcon className='text-dark-50 mr-2' />
        <p className='text-dark-50 fs-8 fw-300 m-0'>4 August 2022 - 2:10 PM</p>
      </div>
      <Chart
        options={donutchartData.options}
        series={donutchartData.series}
        type='donut'
        height='235'
      />
    </>
  )
}

export default DonutChart

/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { KTSVG } from '../helpers/components/KTSVG'
import { toAbsoluteUrl } from '../helpers/AssetHelpers'

const QutationTable = (props) => {
  const {
    className
  } = props
  return (
    <div className={`card ${className}`}>
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bolder fs-3 mb-1'>Quotations in process</span>
          <span className='text-muted mt-1 fw-bold fs-7'>Over 500 new products</span>
        </h3>
        <div className='card-toolbar'>
          <a href='#' className='btn btn-sm btn-light-primary'>
            <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
            New Member
          </a>
        </div>
      </div>
      <div className='card-body py-3'>

        <div className='table-responsive'>
          <table className='table align-middle gs-0 gy-4'>
            <thead>
              <tr className='fw-bolder text-muted bg-light'>
                <th className='min-w-125px'>Quote No.</th>
                <th className='min-w-125px'>Product</th>
                <th className='min-w-125px'>Date</th>
                <th className='min-w-125px'>Client Name</th>
                <th className='min-w-125px'>Status</th>
                <th className='min-w-125px text-end rounded-end' />
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>MTA80540</td>
                <td>Motor</td>
                <td>03.11.21</td>
                <td>Mr Javin Cauleechurn</td>
                <td>Pending</td>
              </tr>
              <tr>
                <td>HMW80523</td>
                <td>Home</td>
                <td>03.11.21</td>
                <td>Mr Pierre Poivre</td>
                <td>Pending</td>
              </tr>
              <tr>
                <td>HTH80323</td>
                <td>Health</td>
                <td>17.10.21</td>
                <td>Mrs Marie Rogers</td>
                <td>Temporary Quote</td>
              </tr>
              <tr>
                <td>TRW81225</td>
                <td>Travel</td>
                <td>16.10.21</td>
                <td>Dr Mikael Pavadee</td>
                <td>Pending</td>
              </tr>

            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}

export default QutationTable

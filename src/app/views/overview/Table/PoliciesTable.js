import React from 'react'
import Table from 'react-bootstrap/Table'
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator'
import BootstrapTable from 'react-bootstrap-table-next'
import { dummydata, columns } from './dummydata'
const PoliciesTable = () => {
  // #13265c
  const dataColumn = [
    {
      dataField: 'id',
      text: 'Quotation ID',
      sort: true,
      style: {
        width: '10px'
      },
      headerStyle: {
        minWidth: '10px'
      }

    },
    {
      dataField: 'product',
      text: 'Product',
      sort: true,
      style: {
        width: '10px'
      },
      headerStyle: {
        maxWidth: '10px'
      }

    },
    {
      dataField: 'client',
      text: 'Client Name',
      sort: true,
      style: {
        width: '10px'
      },
      headerStyle: {
        maxWidth: '10px'
      }

    }
  ]

  return (
    <>
      <h5 className='fw-bold' style={{ color: '#001F72' }}>Policies expiring soon</h5>

      <table className='table table-striped gy-7 gs-7'>
        <thead>
          <tr className='fw-bold fs-6 text-dark border-bottom' style={{ background: '#00B7CD' }}>
            <th>Name</th>
            <th>Position</th>
            <th>Office</th>
            <th>Age</th>
            <th>Start date</th>
            <th>Salary</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Tiger Nixon</td>
            <td>System Architect</td>
            <td>Edinburgh</td>
            <td>61</td>
            <td>2011/04/25</td>
            <td>$320,800</td>
          </tr>
          <tr>
            <td>Garrett Winters</td>
            <td>Accountant</td>
            <td>Tokyo</td>
            <td>63</td>
            <td>2011/07/25</td>
            <td>$170,750</td>
          </tr>
          <tr>
            <td>Garrett Winters</td>
            <td>Accountant</td>
            <td>Tokyo</td>
            <td>63</td>
            <td>2011/07/25</td>
            <td>$170,750</td>
          </tr>
          <tr>
            <td>Garrett Winters</td>
            <td>Accountant</td>
            <td>Tokyo</td>
            <td>63</td>
            <td>2011/07/25</td>
            <td>$170,750</td>
          </tr>

        </tbody>
      </table>
      <div className=''><span>Previous&nbsp;  <a href='#' class='btn btn-icon btn-light'>&lt;</a></span>&nbsp; &nbsp;&nbsp;1/2&nbsp;&nbsp;<span><a href='#' class='btn btn-icon btn-light'>&nbsp;&gt;</a>&nbsp;&nbsp;Next </span></div>
    </>
  )
}

export default PoliciesTable

/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import SVG from 'react-inlinesvg'
import { toAbsoluteUrl } from '../../../../../_metronic/_helpers'
import { Link } from 'react-router-dom'
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
  Checkbox
} from '../../../../../_metronic/_partials/controls'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory, {
  PaginationProvider
} from 'react-bootstrap-table2-paginator'

const data = [
  {
    id: 1,
    fname: 'Shyam',
    lname: 'joe',
    gender: 'male',
    email: 'shyamjaiswal@gmail.com'
  },
  { id: 2, fname: 'Bob', email: 'bob32@gmail.com' },
  { id: 3, fname: 'Jai', email: 'jai87@gmail.com' },
  { id: 4, fname: 'Sujay', email: 'sujay@gmail.com' },
  { id: 5, fname: 'Ravesh', email: 'boravesh32@gmail.com' },
  { id: 6, fname: 'Rakesh', email: 'jrakeshai87@gmail.com' }
]

const columns = [
  {
    dataField: 'id',
    text: 'ID',
    sort: true
  },
  {
    dataField: 'fname',
    text: 'First Name',
    sort: true
  },
  {
    dataField: 'lname',
    text: 'Last Name',
    sort: true
  },
  {
    dataField: 'gender',
    text: 'Gender',
    sort: true
  },
  {
    dataField: 'email',
    text: 'Email'
  }
]

const customTotal = (from, to, size) => (
  <span className='react-bootstrap-table-pagination-total ml-3'>
    Showing {from} to {to} of {size} Results
  </span>
)

const selectRow = {
  mode: 'checkbox',
  clickToSelect: true,
  hideSelectAll: false
}

const options = {
  paginationSize: 4,
  pageStartIndex: 0,
  // alwaysShowAllBtns: true, // Always show next and previous button
  // withFirstAndLast: false, // Hide the going to First and Last page button
  // hideSizePerPage: true, // Hide the sizePerPage dropdown always
  // hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
  firstPageText: 'First',
  prePageText: 'Back',
  nextPageText: 'Next',
  lastPageText: 'Last',
  nextPageTitle: 'First page',
  prePageTitle: 'Pre page',
  firstPageTitle: 'Next page',
  lastPageTitle: 'Last page',
  showTotal: true,
  paginationTotalRenderer: customTotal,
  disablePageTitle: true,
  sizePerPageList: [{
    text: '5', value: 5
  }, {
    text: '10', value: 10
  }, {
    //   text: 'All', value: products.length
  }] // A numeric array is also available. the purpose of above example is custom the text
}

export default class DemoList extends Component {
  render () {
    return (
      <div className='card card-custom'>
        <Card>
          <CardHeader title='Products list'>
            <CardHeaderToolbar>
              <div className='card-toolbar'>
                <Link
                  to='demo-create' className='btn btn-primary font-weight-bolder
                                 font-size-sm mr-3'
                >
                  Create
                </Link>
              </div>
            </CardHeaderToolbar>
          </CardHeader>
          <CardBody>

            <div className='App'>
              <BootstrapTable
                bootstrap4
                keyField='id'
                data={data}
                columns={columns}
                pagination={paginationFactory(options)}
                wrapperClasses='table-responsive'
                classes='table table-head-custom table-vertical-center overflow-hidden'
                bordered={false}
                selectRow={selectRow}
              />
            </div>

          </CardBody>
        </Card>

      </div>
    )
  }
}

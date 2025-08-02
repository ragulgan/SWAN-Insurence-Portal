import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button } from '@material-ui/core'
const NotFound = () => {
  const history = useHistory()
  return (
    <div className='d-flex flex-column flex-root'>
      <div className='d-flex flex-row-fluid flex-column align-items-center justify-content-center bgi-size-cover bgi-position-center bgi-no-repeat p-10 p-sm-30'>
        <h1
          className='font-size-sm-100 font-weight-boldest text-dark-75 mt-15'
          style={{ fontSize: '150px' }}
        >
          404
        </h1>
        <p className='font-size-h3 font-weight-light'>
          OOPS! Something went wrong here
        </p>
        <Button
          variant='contained' size='medium' color='primary' type='button'
          className='mt-5'
          onClick={() => { history.goBack() }}
        >
          Go Back
        </Button>

      </div>
    </div>
  )
}

export default NotFound

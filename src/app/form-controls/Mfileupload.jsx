import React from 'react'
import { Can } from '../uiComponents'
import { STATIC_PERMISSION } from '../../helpers/constants'
import { Controller, useForm } from 'react-hook-form'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core'

function Mfileupload ({ children, control, id, name, req, onChange }) {
  const useStyles = makeStyles((theme) => ({
    h6: {
      fontWeight: 600,
      color: theme.palette.primary.main,
      marginLeft: '6px'
    }
  }))
  const classes = useStyles()
  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={{
          required: !!req
        }}
        render={({ field, value, ref }) => (
          <>
            <Input
              style={{ display: 'none' }}
              type='file'
              multiple='multiple'
              name={name}
              id={id}
              onChange={onChange}
              ref={ref}
              className={`${req ? 'req-mark' : ''}`}
            />
            {children}
            <Button
              color='secondary'
              className='pl-0'
              onClick={() => {
                const uploadBtn = document.getElementById(id)
                uploadBtn && uploadBtn.click()
              }}
            >
              <AddCircleOutlineIcon />
              <Typography className={classes.h6}>
                {' '}
                ADD NEW DOCUMENT HERE
              </Typography>
            </Button>
          </>
        )}
      />
    </>
  )
}

export default Mfileupload

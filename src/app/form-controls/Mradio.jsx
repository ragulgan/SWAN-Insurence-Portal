import React from 'react'
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Grid
} from '@material-ui/core'
import { Controller, useFormContext } from 'react-hook-form'
import _ from 'lodash'
import { Can } from '../uiComponents'
import { STATIC_PERMISSION } from '../../helpers/constants'

const options = [
  {
    label: 'Individual',
    value: '1'
  },
  {
    label: 'Corporate',
    value: '2'
  }
]

const Mradio = ({
  xs,
  md,
  name,
  control,
  label,
  usersPermissions,
  componentPermissions,
  grantedUsers,
  userType
}) => {
  const generateRadioOptions = () => {
    return options.map(singleOption => (
      <Grid item className='m-radio'>
        <FormControlLabel
          value={singleOption.value}
          label={singleOption.label}
          control={<Radio />}
        />
      </Grid>
    ))
  }

  return (
    <Grid item xs={xs} md={!_.isUndefined(md) ? md : xs}>
      <Can
        usersPermissions={usersPermissions || '*'}
        componentPermissions={STATIC_PERMISSION}
        grantedUsers={grantedUsers || []}
        userType={userType || ''}
        yes={() => (
          <>
            <Grid
              container
              alignItems='center'
              justifyContent='flex-start'
              spacing={1}
            >
              <Grid item xs={4}>
                {label}
              </Grid>
              <Grid item xs={8}>
                <Controller
                  name={name}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <RadioGroup value='1' onChange={onChange}>
                      <Grid
                        container
                        alignItems='center'
                        justifyContent={{
                          xs: 'space-between',
                          sm: 'space-between',
                          md: 'flex-end'
                        }}
                        spacing={0}
                      >
                        {generateRadioOptions()}
                      </Grid>
                    </RadioGroup>
                  )}
                />
              </Grid>
            </Grid>
          </>
        )}
        no={() => <></>}
      />
    </Grid>
  )
}

export default Mradio

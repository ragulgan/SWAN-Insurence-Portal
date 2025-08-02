import React from 'react'
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Checkbox,
  FormGroup,
  Grid,
  makeStyles
} from '@material-ui/core'
import { Controller, useFormContext } from 'react-hook-form'
import _ from 'lodash'
import { Can } from '../uiComponents'
import { STATIC_PERMISSION } from '../../helpers/constants'

const useSyles = makeStyles((theme) => ({
  MuiFormControlLabelRoot: {
    alignItems: 'flex-start',
    paddingTop: '15px'
  },
  alignLeft: {
    marginLeft: '10px'
  }
}))
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

const Mcheckboxs = ({
  xs,
  md,
  name,
  control,
  label,
  labelPlacement,
  usersPermissions,
  componentPermissions,
  grantedUsers,
  userType
}) => {
  const classes = useSyles()
  const generateCheckboxOptions = () => {
    return options.map((singleOption) => (
      <Grid item className='m-Checkbox'>
        <FormControlLabel
          value={singleOption.value}
          label={singleOption.label}
          control={<Checkbox />}
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
            <Controller
              name={name}
              control={control}
              render={({ field: { onChange, value } }) => (
                <FormGroup
                  value={value}
                  onChange={onChange}
                  className={classes.alignLeft}
                >
                  <FormControlLabel
                    className={classes.MuiFormControlLabelRoot}
                    value={value}
                    label={label}
                    control={<Checkbox color='primary' className='pt-0' />}
                    labelPlacement={labelPlacement || 'end'}
                  />
                </FormGroup>
              )}
            />
          </>
        )}
        no={() => <></>}
      />
    </Grid>
  )
}

export default Mcheckboxs

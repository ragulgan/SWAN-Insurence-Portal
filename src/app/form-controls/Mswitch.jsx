import React from 'react'
import { Grid, FormControlLabel, Switch, makeStyles } from '@material-ui/core'
import { Controller } from 'react-hook-form'
import _ from 'lodash'
import { Can } from '../uiComponents'
import { STATIC_PERMISSION } from '../../helpers/constants'
import InfoPopup from 'app/widgets/InfoPopup'

const useStyles = makeStyles((theme) => ({
  Mswitchlabel: {
    color: '#00000'
  }
}))

const Mswitch = ({
  xs,
  md,
  name,
  control,
  label,
  setValue,
  disabled,
  lXs,
  lSm,
  lMd,
  rXs,
  rSm,
  rMd,
  info,
  usersPermissions,
  componentPermissions,
  grantedUsers,
  userType
}) => {
  const classes = useStyles()

  return (
    <Can
      usersPermissions={usersPermissions || '*'}
      componentPermissions={STATIC_PERMISSION}
      grantedUsers={grantedUsers || []}
      userType={userType || ''}
      yes={() => (
        <>
          <Grid item xs={xs} md={!_.isUndefined(md) ? md : xs}>
            <Grid
              container
              alignItems='center'
              justifyContent='flex-end'
              spacing={0}
              wrap='nowrap'
            >
              <Grid item xs={lXs || 6} sm={lSm || 7} md={lMd || 6}>
                <span className='d-flex'>
                  {' '}
                  <label className={`${classes.Mswitchlabel} `}>{label}</label>{' '}
                  {info ? <InfoPopup info={info} /> : null}
                </span>
              </Grid>
              <Grid item xs={rXs || 6} sm={rSm || 5} md={rMd || 6}>
                <Grid
                  container
                  alignItems='center'
                  justifyContent='flex-end'
                  spacing={0}
                >
                  <Controller
                    control={control}
                    name={name}
                    defaultValue
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                      formState
                    }) => (
                      <>
                        <Grid item>
                          <span className='yesno-span'>No</span>
                        </Grid>
                        <Grid item>
                          <Switch
                            size='small'
                            color='primary'
                            className='m-switch'
                            value={value}
                            checked={value}
                            onChange={onChange}
                            disabled={disabled}
                          />
                        </Grid>
                        <Grid item>
                          <span className='yesno-span'>Yes</span>
                        </Grid>
                      </>
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
      no={() => <></>}
    />
  )
}

export default Mswitch

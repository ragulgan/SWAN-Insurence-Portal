import React from 'react'
import Select from 'react-select'
import {
  Grid,
  FormControl,
  Typography
} from '@material-ui/core'
import { Controller } from 'react-hook-form'
import _ from 'lodash'
import { Can, ShowField } from '../uiComponents'
import { STATIC_PERMISSION } from '../../helpers/constants'
import { color } from '../../helpers/utils'

const ReactSelect = (props) => {
  const {
    handleChangeReactSelect,
    isMulti,
    isDisabled,
    isLoading,
    noOptionsMessage,
    placeholder,
    isClearable,
    initialScrollOffset,
    handleInputChange,
    onBlur,
    xs,
    md,
    name,
    control,
    req,
    options,
    reset,
    variant,
    readOnly,
    usersPermissions,
    componentPermissions,
    grantedUsers,
    userType

  } = props

  return (
    <Can
      usersPermissions={usersPermissions || '*'}
      componentPermissions={STATIC_PERMISSION}
      grantedUsers={grantedUsers || []}
      userType={userType || ''}
      yes={() => (
        <>
          <Grid item xs={xs} md={!_.isUndefined(md) ? md : xs}>
            <FormControl
              variant={variant || 'outlined'}
              className={`${req ? 'm-select req-mark' : 'm-select'}`}
            >
              <Controller
                name={name}
                control={control}
                rules={{
                  required: !!req
                }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                  formState,
                  ref
                }) => (
                  <>
                    <Select
                      styles={{
                        control: styles => ({
                          ...styles,
                          borderColor: error && error.type === 'required' ? 'red' : '#c2c2c2'
                        }),
                        menu: provided => ({ ...provided, zIndex: 10 }),
                        option: (provided, state) => ({
                          ...provided,
                          zIndex: 10,
                          color: state.isSelected ? color.gray : color.black,
                          background: state.isSelected ? color.white : color.white
                        })
                      }}
                      value={value || ''}
                      inputRef={ref}
                      onInputChange={(e) => { handleInputChange && handleInputChange(e) }}
                      onBlur={(e) => onBlur && onBlur(e)}
                      onChange={(e) => onChange && onChange(e)}
                      placeholder={placeholder}
                      options={options}
                      isLoading={isLoading}
                      theme={theme => ({
                        ...theme,
                        borderRadius: 0,
                        borderWidth: 1,
                        colors: {
                          ...theme.colors,
                          primary25: color.tangerine,
                          primary: color.redSand,
                          primary75: color.peach,
                          primary50: color.redSand
                        }
                      })}
                      isMulti={isMulti}
                      noOptionsMessage={noOptionsMessage}
                      isClearable={isClearable || false}
                      isDisabled={isDisabled || false}
                      initialScrollOffset={initialScrollOffset}
                    />
                    <ShowField
                      show={error && error.message}
                      yes={() =>
                        <Typography className='form-traveller-medical-report'>
                          {error.message}
                        </Typography>}
                      no={() => null}
                    />
                  </>
                )}
              />
            </FormControl>
          </Grid>
        </>
      )}
      no={() => <></>}
    />

  )
}

export default ReactSelect

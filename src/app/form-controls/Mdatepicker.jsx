import React ,{useRef}from 'react'
import { Grid } from '@material-ui/core'
import DateFnsUtils from '@date-io/moment'
import moment from 'moment'
import { makeStyles } from '@material-ui/core/styles'
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers'
import { Controller } from 'react-hook-form'
import _ from 'lodash'
import { Can } from '../uiComponents'
import { STATIC_PERMISSION } from '../../helpers/constants'
import CalendarTodayIcon from '@material-ui/icons/CalendarToday'
const useStyles = makeStyles((theme) => ({
  warningStyles: {
    '& .MuiFormLabel-root.Mui-error': {
      color: 'red !important'
    },
    '& .MuiFormLabel-root': {
      color: '#000000'
    },
    '& .MuiInput-underline.Mui-error:after': {
      borderBottomColor: 'red !important'
    },
    '& .MuiFormHelperText-root.Mui-error': {
      color: 'red !important',
      fontSize: 13
    }
  }
}
))

const Mdatepicker = ({
  xs,
  md,
  name,
  control,
  label,
  req,
  format,
  views,
  disabled,
  readOnly,
  minDate,
  maxDate,
  usersPermissions,
  grantedUsers,
  userType,
  clearErrors,
  placeholder
}) => {
  const classes = useStyles()

  return (
    <Grid item xs={xs} md={md}>
      <Can
        usersPermissions={usersPermissions || '*'}
        componentPermissions={STATIC_PERMISSION}
        grantedUsers={grantedUsers || []}
        userType={userType || ''}
        yes={() => (
          <>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Controller
                name={name}
                control={control}
                rules={{
                  required: !!req
                }}
                render={({
                  field: { onChange, value },
                  fieldState: { error }
                }) => (
                  <KeyboardDatePicker
                  // helperText={error?.message}
                 error ={ error} 
                  views={views}
                    label={label}
                    disabled={disabled || false}
                    readOnly={readOnly}
                    inputVariant='outlined'
                    format={format || 'DD/MM/yyyy'}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => {
                      onChange(e)
                      clearErrors && clearErrors(name)
                    }}
                    minDate={minDate || moment().subtract(500, 'years')}
                    maxDate={maxDate || moment().add(500, 'years')}
                    autoOk
                    KeyboardButtonProps={{
                      'aria-label': 'change date'
                    }}
                    InputLabelProps={{
                      shrink: true
                    }}                    
                    className={`${error  && classes.warningStyles} ${req ? 'req-mark' : ''}`}
                    components={{
                      EventIcon: CalendarTodayIcon
                    }}
                  />
                )}
              />
            </MuiPickersUtilsProvider>
          </>
        )}
        no={() => <></>}
      />
    </Grid>
  )
}

export default Mdatepicker

import React, { useState, useEffect } from 'react'
import {
  Grid,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core'
import _ from 'lodash'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import TextField from '@material-ui/core/TextField'
import DateFnsUtils from '@date-io/date-fns'
import RowMessage from 'app/widgets/RowMessage'
import Mradio from 'app/form-controls/Mradio'
import Mtextbox from 'app/form-controls/Mtextbox'
import Mselect from 'app/form-controls/Mselect'
import Mswitch from 'app/form-controls/Mswitch'
import Mdatepicker from 'app/form-controls/Mdatepicker'
import moment from 'moment'
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers'
import { REGEX, GRANTED_USERS } from 'helpers/constants'
import { ERROR } from 'helpers/messages'
import { Controller, useController, useForm, useWatch, useFieldArray } from 'react-hook-form'

const DependentDetails = (props) => {
  const {
    index,
    member,
    cssClass,
    authRole,
    clearErrors,
    handleSetError,
    setError,
    expanded,
    panels,
    panelToggle,
    btnHandler,
    control,
    watch,
    setValue,
    remove
  } = props
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [name, setName] = useState(null)
  const [dependentValidation, setDependentValidation] = useState(false)
  const { fields } = useFieldArray({
    control,
    name: 'members'
  })
  const [gender, setGender] = useState([
    {
      label: 'Male',
      value: 'MR',
      altValue: 'male'
    },
    {
      label: 'Female',
      value: 'MS',
      altValue: 'female'
    },
    {
      label: 'Dependant',
      value: 'CHILD',
      altValue: 'dependant'
    }
  ])
  const dobWatcher = watch(`members.${index}.DTBIRTH`)
  const firstWatcher = watch(`members.${index}.FIRSTNAME`)
  const lastWatcher = watch(`members.${index}.LASTNAME`)
  const ageWatcher = watch(`members.${index}.AGE`)
  const genderWatcher = watch(`members.${index}.GENDER`)

  const ageValidator = (field, age) => {
    setValue(field, age)
  }

  // {errors.items?.[index]?.name && <p>This can't be empty</p>}

  // Date of birth change handler
  useEffect(() => {
    if (!_.isEmpty(dobWatcher)) {
      // Find age using moment
      const age = moment().diff(moment(dobWatcher), 'years')
      console.log('age', age)
      // First : Which field to be change, Second : What value to be set
      ageValidator(`members.${index}.AGE`, age)
    }
  }, [dobWatcher])

  // Firstname & Lastname change handler
  useEffect(() => {
    if (!_.isEmpty(firstWatcher) || !_.isEmpty(lastWatcher)) {
      setName(`${firstWatcher} ${lastWatcher}`)
    }
  }, [firstWatcher, lastWatcher])

  // Firstname & Lastname change handler
  useEffect(() => {
    if (!_.isEmpty(firstWatcher) && !_.isEmpty(lastWatcher) && !_.isEmpty(dobWatcher) && !_.isEmpty(genderWatcher)) {
      btnHandler(false)
    }

    if (firstWatcher !== '') {
      setDependentValidation(true)
    } else if (firstWatcher === '') {
      setDependentValidation(false)
    }
  }, [firstWatcher, lastWatcher, dobWatcher, genderWatcher])

  return (
    <Grid key={member.id} item xs={12} sm={6} md={6} lg={6} xl={6} className={cssClass}>
      <Accordion
        expanded={panels[index]?.status}
        onChange={panelToggle(`panel_${index}`)}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`panel${index}-content`}
          id={`panel${index}-header`}
        >
          <Typography>{name !== null
            ? (
              <span className='be-bold'>Dependent {index} : <span>{name}</span></span>
              )
            : (
              <span className='be-bold'>Dependent {index}</span>
              )}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid
            container
            direction='row'
            justifyContent='flex-start'
            alignItems='flex-start'
            spacing={2}
          >
            <Mtextbox
              xs={12}
              sm={5}
              md={5}
              lg={5}
              name={`members.${index}.FIRSTNAME`}
              label='First Name'
              control={control}
              grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
              userType={authRole}
              clearErrors={clearErrors}
              onBlur={e => {
                handleSetError(
                  e,
                                        `members.${index}.FIRSTNAME`,
                                        setError,
                                        REGEX.TEXT,
                                        ERROR.TEXT
                )
              }}
              req={dependentValidation}
            />
            <Mtextbox
              xs={12}
              sm={7}
              md={7}
              lg={7}
              name={`members.${index}.LASTNAME`}
              label='Last Name'
              control={control}
              grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
              userType={authRole}
              clearErrors={clearErrors}
              onBlur={e => {
                handleSetError(
                  e,
                                        `members.${index}.LASTNAME`,
                                        setError,
                                        REGEX.TEXT,
                                        ERROR.TEXT
                )
              }}
              req={dependentValidation}
            />
            <Mdatepicker
              xs={9}
              sm={5}
              md={5}
              lg={5}
              name={`members.${index}.DTBIRTH`}
              label='Date of Birth'
              control={control}
              placeHolder={moment().subtract(18, 'years')}
                                // minDate={moment().subtract(500, 'years')}
                                // maxDate={moment().subtract(18, 'years')}
                                // disabled={!clientWatcher}
              grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
              userType={authRole}
              onClick={() => {
                clearErrors(`members.${index}.DTBIRTH`)
              }}
              req={dependentValidation}
            />
            <Mtextbox
              xs={3}
              sm={3}
              md={3}
              lg={3}
              name={`members.${index}.AGE`}
              label='Age'
              control={control}
              grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
              userType={authRole}
              disabled
              shrink
            />
            <Mselect
              xs={12}
              sm={4}
              md={4}
              lg={4}
              name={`members.${index}.GENDER`}
              label='Gender'
              control={control}
              grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
              userType={authRole}
              options={gender}
              optionsLabel='label'
              optionsValue='value'
              req={dependentValidation}
            />
            {(() => {
              if (ageWatcher < 0) {
                return <RowMessage msg={"don't select future date in DOB"} />
              } else if (ageWatcher >= 18 && ageWatcher <= 22) {
                return <RowMessage msg='Note: dependant should be unmarried or full time student.' />
              } else if (ageWatcher >= 55 && ageWatcher <= 59) {
                return <RowMessage msg='Note: Medical report required' />
              } else if (ageWatcher >= 60 && ageWatcher <= 65) {
                return <RowMessage msg='Member might be required to undergo medical check by Swan In House Doctor' />
              } else if (ageWatcher != 0 && ageWatcher < 65) {
                return <RowMessage msg='Member not eligible for insurance' />
              }

              return null
            })()}
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className={`${cssClass} txt-right`}>
              <Button
                variant='outlined'
                className='mr-4'
                color='primary'
                onClick={remove}
              >
                Delete
              </Button>
              {/* <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    >
                                    Save
                                </Button> */}
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Grid>
  )
}

export default DependentDetails

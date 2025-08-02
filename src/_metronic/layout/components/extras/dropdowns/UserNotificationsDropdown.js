import React, { useMemo } from 'react'
import { Dropdown } from 'react-bootstrap'
import SVG from 'react-inlinesvg'
import objectPath from 'object-path'
import { useHtmlClassService } from '../../../_core/MetronicLayout'
import { toAbsoluteUrl } from '../../../../_helpers'
import { DropdownTopbarItemToggler } from '../../../../_partials/dropdowns'

import IconButton from '@material-ui/core/IconButton'
import NotificationsIcon from '@material-ui/icons/Notifications'
import Badge from '@material-ui/core/Badge'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Alert from '@material-ui/lab/Alert'
import AlertTitle from '@material-ui/lab/AlertTitle'
import spacing from '@material-ui/system'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const perfectScrollbarOptions = {
  wheelSpeed: 2,
  wheelPropagation: false
}
const useStyles = makeStyles((theme) => ({
  AltertSpacing: {
    '& .MuiAlert-standardError': {
      margin: '8px'
    },
    '& .MuiAlert-standardWarning': {
      margin: '8px'
    },
    '& .MuiAlert-standardInfo': {
      margin: '8px'
    },
    '& .MuiAlert-standardSuccess': {
      margin: '8px'
    }
  }

}

))
export function UserNotificationsDropdown () {
  const [checked, setChecked] = React.useState(false)
  const uiService = useHtmlClassService()
  const classes = useStyles()
  const layoutProps = useMemo(() => {
    return {
      offcanvas: objectPath.get(uiService.config, 'extras.notifications.layout') ===
        'offcanvas'
    }
  }, [uiService])
  const handleChange = () => {
    setChecked((prev) => !prev)
  }
  const icon = (
    <Paper sx={{ m: 1 }} elevation={4}>
      <Box component='svg' sx={{ width: 100, height: 100 }}>
        <Box
          component='polygon'
          sx={{
            fill: (theme) => theme.palette.common.white,
            stroke: (theme) => theme.palette.divider,
            strokeWidth: 1
          }}
          points='0,100 50,00, 100,100'
        />
      </Box>
    </Paper>
  )

  return (
    <>
      {
        layoutProps.offcanvas && (
          <div className='topbar-item'>
            <div
              className='btn btn-icon btn-clean btn-lg mr-1 pulse pulse-primary'
              id='kt_quick_notifications_toggle'
            >
              <span className='svg-icon svg-icon-xl svg-icon-primary'>
                <SVG src={toAbsoluteUrl('/media/svg/icons/Code/Compiling.svg')} />
              </span>
              <span className='pulse-ring' />
            </div>
          </div>)
      } {
        !layoutProps.offcanvas && (
          <Dropdown drop='down' alignRight>
            <Dropdown.Toggle
              as={DropdownTopbarItemToggler}
              id='kt_quick_notifications_toggle'
            >

              <span className='svg-icon svg-icon-xl svg-icon-primary'>
                <IconButton
                  size='large'
                  aria-label='show 17 new notifications'
                  color='inherit'
                  onClick={handleChange}
                >
                  <Badge badgeContent={17} color='error'>
                    <NotificationsIcon color='secondary' />
                  </Badge>
                </IconButton>
              </span>
              <span className='pulse-ring' />
            </Dropdown.Toggle>
            <Dropdown.Menu className='dropdown-menu p-0 m-0 dropdown-menu-right dropdown-menu-anim-up dropdown-menu-lg'>
              <Box className={classes.AltertSpacing}>
                <Typography component='div'>
                  <Box fontStyle='normal' m={1}>
                    Notifications
                  </Box>
                </Typography>
                <Alert severity='error'>
                  <AlertTitle>Error</AlertTitle>
                  This is an error alert — <strong>check it out!</strong>
                </Alert>
                <Alert severity='warning'>
                  <AlertTitle>Warning</AlertTitle>
                  This is a warning alert — <strong>check it out!</strong>
                </Alert>
                <Alert severity='info'>
                  <AlertTitle>Info</AlertTitle>
                  This is an info alert — <strong>check it out!</strong>
                </Alert>
                <Alert severity='success'>
                  <AlertTitle>Success</AlertTitle>
                  This is a success alert — <strong>check it out!</strong>
                </Alert>
              </Box>

            </Dropdown.Menu>
          </Dropdown>
        )
      }
    </>
  )
}

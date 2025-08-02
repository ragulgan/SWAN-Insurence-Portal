import React, { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { shallowEqual, useSelector } from 'react-redux'
import Icofont from 'react-icofont'
import {
  removeSessionStorage
} from '../../helpers/helper'
import {
  MOTOR_FORM
} from '../../helpers/constants'
import Button from '@material-ui/core/Button'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Grow from '@material-ui/core/Grow'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'

const NewQuoteButton = () => {
  const [open, setOpen] = useState(false)
  const anchorRef = useRef(null)
  const prevOpen = useRef(open)
  const { authRole } = useSelector(
    ({ Auth }) => ({
      authRole: Auth.authRole
    }),
    shallowEqual
  )

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }
    setOpen(false)
  }
  function handleListKeyDown (event) {
    if (event.key === 'Tab') {
      event.preventDefault()
      setOpen(false)
    }
  }

  const handleChangeMenu = () => {
    removeSessionStorage(MOTOR_FORM.ACTIVE_STEP)
    removeSessionStorage(MOTOR_FORM.QUOTE_NUMBER)
  }

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus()
    }
    prevOpen.current = open
  }, [open])

  const menuArray = [
    {
      link: 'quotes/motor',
      name: 'Motor',
      icon: 'car'
    },
    {
      link: 'quotes/health',
      name: 'Health',
      icon: 'heart-beat'
    },
    {
      link: 'quotes/home',
      name: 'Home',
      icon: 'home'
    },
    {
      link: 'quotes/travel',
      name: 'Travel',
      icon: 'heart'
    }
  ]

  return (
    <div className='new-quote-widget'>
      <Button
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup='true'
        onClick={handleToggle}
        variant='contained'
        color='primary'
        className='quote-blue-btn rounded'
      >
        <Icofont icon='pencil-alt-5' /> &nbsp; &nbsp; Make a New quote
      </Button>
      <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} id='menu-list-grow' onKeyDown={handleListKeyDown}>
                  {
                    menuArray.map((menu, i) => (
                      <MenuItem onClick={() => { handleChangeMenu() }}>
                        <Link to={`/${authRole}/${menu.link}`}>{menu.name} <span><Icofont icon={menu.icon} /></span></Link>
                      </MenuItem>
                    ))
                  }
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  )
}

export default NewQuoteButton

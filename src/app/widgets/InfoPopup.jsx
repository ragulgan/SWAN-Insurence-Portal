import React, { Fragment, useState } from 'react'

import { Popover, makeStyles } from '@material-ui/core'

import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'

const InfoPopup = (props) => {
  const [anchor, setAnchor] = useState(null)

  const handlePopoverOpen = (event) => {
    setAnchor(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchor(null)
  }

  const open = Boolean(anchor)

  const id = open ? 'mouse-over-popover' : undefined

  const useStyles = makeStyles((theme) => ({
    textColor: {
      color: '#00B8CE !important'
    },

    infoPop: {
      color: '#ffffff !important',

      pointerEvents: 'none'
    }
  }))

  const classes = useStyles()

  return (
    <>
      <span
        aria-owns={open ? { id } : undefined}
        aria-haspopup='true'
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        className='ml-2'
      >
        <InfoOutlinedIcon className={classes.textColor} />
      </span>

      <Popover
        id={id}
        open={open}
        anchorEl={anchor}
        anchorOrigin={{
          vertical: 'top',

          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'bottom',

          horizontal: 'center'
        }}
        disableRestoreFocus
        className={`info-widget-popup ${classes.infoPop}`}
      >
        {props.info}
      </Popover>
    </>
  )
}

export default InfoPopup

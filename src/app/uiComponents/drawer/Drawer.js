import React from 'react'
import PropTypes from 'prop-types'
import classes from './Drawer.module.scss'

export const Drawer = (props) => {
  const { open, anchor, onClose, drawerWidth, children } = props
  const {
    drawer,
    animate,
    hidden,
    overlay,
    overlayOpen,
    overlayHidden
  } = classes

  const changeAnchor = (anchor, classes) => {
    switch (anchor) {
      case 'left':
        return classes.left
      case 'right':
        return classes.right
      default:
        return classes.left
    }
  }

  return (
    <>
      <div
        className={`${overlay} ${!open && overlayHidden} ${open && overlayOpen
          }`}
        onClick={onClose}
        aria-hidden='true'
      />
      <div
        tabIndex='-1'
        style={{
          width: drawerWidth || 300
        }}
        className={`${drawer} ${open && animate} ${!open && hidden
          } ${changeAnchor(anchor, classes)}`}
      >
        <div className='px-3'>
          {children}
        </div>
      </div>
    </>
  )
}

Drawer.propTypes = {
  open: PropTypes.bool.isRequired,
  anchor: PropTypes.string.isRequired,
  drawerWidth: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired
}

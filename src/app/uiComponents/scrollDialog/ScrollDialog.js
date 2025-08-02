import React, { useState, useRef, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import PropTypes from 'prop-types'

export const ScrollDialog = (props) => {
  const {
    showModal, scrollType, children,
    title, btnOneText, btnTwoText, handleDialogClose,
    handleDialogSave, showAction
  } = props

  const descriptionElementRef = useRef(null)

  useEffect(() => {
    if (showModal) {
      const { current: descriptionElement } = descriptionElementRef
      if (descriptionElement !== null) {
        descriptionElement.focus()
      }
    }
  }, [showModal])

  return (
    <div>
      <Dialog
        open={showModal}
        onClose={handleDialogClose}
        scroll={scrollType || 'paper'}
        aria-labelledby='scroll-dialog-title'
        aria-describedby='scroll-dialog-description'
      >
        <DialogTitle id='scroll-dialog-title'>{title}</DialogTitle>
        <DialogContent dividers={scrollType === 'paper'}>
          <DialogContentText
            id='scroll-dialog-description'
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {children}
          </DialogContentText>
        </DialogContent>
        {
          showAction
            ? (
              <DialogActions>
                <Button onClick={handleDialogClose} color='danger'>
                  {btnOneText}
                </Button>
                <Button onClick={handleDialogSave} color='primary'>
                  {btnTwoText}
                </Button>
              </DialogActions>
              )
            : null
        }
      </Dialog>
    </div>
  )
}

ScrollDialog.propTypes = {
  showModal: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  showAction: PropTypes.bool.isRequired,
  btnOneText: PropTypes.string,
  btnTwoText: PropTypes.string,
  handleDialogClose: PropTypes.func,
  handleDialogSave: PropTypes.func,
  scrollType: PropTypes.string
}

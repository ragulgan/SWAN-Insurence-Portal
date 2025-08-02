import React from 'react'
import PropTypes from 'prop-types'
import classes from './Modal.module.scss'

export const Modal = (props) => {
  const { showModal, modalWidth, children } = props
  const { reactModal, reactModalMain } = classes

  return (
    <>
      {showModal
        ? (
          <div className={reactModal}>
            <div
              className={reactModalMain}
              style={{
                width: modalWidth || 550
              }}
            >
              {children}
            </div>
          </div>
          )
        : null}
    </>
  )
}

Modal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  modalWidth: PropTypes.number.isRequired,
  children: PropTypes.element.isRequired,
  modalHeight: PropTypes.element
}

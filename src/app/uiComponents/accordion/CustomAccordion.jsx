import React, { useState, useEffect } from 'react'
import { useTheme } from '@material-ui/core/styles'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import Accordion from '@material-ui/core/Accordion'
import Divider from '@material-ui/core/Divider'
import { makeStyles } from '@material-ui/core'
import PropTypes from 'prop-types'
import ExpandMore from '@material-ui/icons/ExpandMore'

export function CustomAccordion(props) {
  const { label, children, req, isExpanded, isUploaded } = props
  const [flag, setFlag] = useState(isExpanded)
  const theme = useTheme()

  const useStyles = makeStyles((theme) => ({
    boxShadowNone: {
      boxShadow: 'none !important'
    },
    removeMargin: {
      margin: '0px !important'
    },
    warningStyles: {
      color: 'red !important'
    },
    defaultColor: {
      color: '#5b6670 !important'
    },
    isUploaded: {
      color: '#002f87',
      fontFamily: 'Glober',
      fontWeight: 600
    }
  }))

  useEffect(() => {
    setFlag(isExpanded)
  }, [isExpanded])

  const classes = useStyles()

  return (
    <Accordion className={`${classes.removeMargin} ${classes.boxShadowNone}`} expanded={flag}>
      <AccordionSummary 
      className={`${req ? classes.warningStyles : ''}
      ${isUploaded ? classes.isUploaded : classes.defaultColor}`}
        expandIcon={<ExpandMore onClick={() => { setFlag(!flag) }} />}>
        {label}
        <span className='req-mark'>*</span>
      </AccordionSummary>
      <AccordionDetails className='pr-0 pt-0'>{children}</AccordionDetails>
      <Divider />
    </Accordion>
  )
}
CustomAccordion.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired
}

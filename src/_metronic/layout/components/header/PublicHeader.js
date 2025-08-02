import React, { useMemo, Fragment } from 'react'
import { useHtmlClassService } from '../../../../_metronic/layout/_core/MetronicLayout'
import { logo_dark } from '../../../../helpers/assets'
import { makeStyles, Grid, Typography } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import EmailIcon from '@material-ui/icons/Email'
import LockIcon from '@material-ui/icons/Lock'
import LocationOnIcon from '@material-ui/icons/LocationOn'

const useStyles = makeStyles((theme) => ({
  MarginHead: {
    color: '#363434',
    fontSize: '36px'
  },
  typo: {
    color: '#002F87',
    fontSize: '16px',
    '@media screen and (max-width: 900px)': {
      fontSize: 10
    }
  },
  typo1: {
    color: '#00B8CE',
    fontSize: '16px',
    '@media screen and (max-width: 900px)': {
      fontSize: 10
    }
  },
  IconHead: {
    color: '#adabab',
    fontSize: '16px',
    cursor: 'pointer'
  }
}
))

const PublicHeader = () => {
  const classes = useStyles()
  const uiService = useHtmlClassService()
  const layoutProps = useMemo(() => {
    return {
      headerContainerClasses: uiService.getClasses('header_container', true)
    }
  }, [uiService])

  return (
    <>
      <Grid
        className={`header ${layoutProps.headerClasses}`}
        id='kt_header'
        {...layoutProps.headerAttributes}
      >
        <Grid className={` ${layoutProps.headerContainerClasses} d-flex align-items-stretch justify-content-between p-5`}>
          <MenuIcon className={classes.MarginHead} />
          <img src={logo_dark} alt='swan_logo' className='max-h-40px px-5' id='AUTH.LOGIN.TITLE' />
          <Grid className='d-flex align-items-stretch justify-content-end flex-lg-grow-1'>
            <span className='px-5'><Typography className={classes.typo}>FOR YOU</Typography></span>
            <span className='px-5'><Typography className={classes.typo}>FOR YOUR BUSINESS</Typography></span>
            <span className='px-5'><Typography className={classes.typo1}>INTERNATIONAL SOLUTIONS</Typography></span>
            <span className='px-5'><EmailIcon className={classes.IconHead} /></span>
            <span className='px-5'><LocationOnIcon className={classes.IconHead} /></span>
            <span className='px-5'><LockIcon className={classes.IconHead} /></span>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default PublicHeader

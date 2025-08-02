import React, { Fragment, useEffect, useState } from 'react'
import Icofont from 'react-icofont'
import { connect } from 'react-redux'
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  Paper,
  TableHead,
  TableCell,
  Typography
} from '@material-ui/core'
import SearchBar from 'material-ui-search-bar'
import { makeStyles } from '@material-ui/styles'
import { ShowField } from '../uiComponents'
import { ClientActions } from 'store/actions'
import { getLocalStorage } from 'helpers/helper'
const useStyles = makeStyles({
  table: {
    maxWidth: '100%',
    maxHeight: 468
  },
  records: {
    color: '#002f87'
  }
})

const ClientsPopup = props => {
  const {
    disabled,
    handleClickOpen,
    handleClose, // remove
    clientLoading,
    clientData,
    open,
    searchDispatch
  } = props

  const classes = useStyles()
  const [search, setSearch] = useState('')
  const [clients, setClients] = useState(null)
  const loggedUser = getLocalStorage('logged_user')

  const onSearch = (search) => {
    if (search !== '') {
      if (search.length >= 3) {
        setSearch(search)
      }
    }
  }
  const onClear = () => {
    setSearch('')
    setClients(null)
  }
  const onClose = () => {
    setSearch('')
    setClients(null)
    handleClose(null)
  }
  const onSet = (row) => {
    setSearch('')
    setClients(null)
    if (row) {
      handleClose(row)
    }
  }

  // On Search call
  useEffect(() => {
    if (search !== '') {
      setTimeout(() => {
        const param = {
          CLIENTNUM: search,
          NAME: search,
          TITLE: search,
          MOBILENO: search,
          DTBIRTH: search,
          CLIDNO: search,
          USERCRT: 'XUXAVIER' // loggedUser
        }
        searchDispatch(param)
      }, 800)
    }
  }, [search])

  // On Search success
  useEffect(() => {
    if (clientData) {
      setClients(clientData)
    }
  }, [clientData])

  return (
    <>
      <Button
        variant='contained'
        color='primary'
        className='quote-blue-btn'
        disabled={disabled}
        onClick={handleClickOpen}
      >
        <Icofont icon='search' /> &nbsp; FIND EXISTING CLIENTS
      </Button>
      <Dialog
        fullWidth
        maxWidth='md'
        open={open}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title' className='searchBelow_line'>
          Search for clients
        </DialogTitle>
        <Paper className='shadow_field'>
          <SearchBar
            className='searchbar_field'
            value={search}
            placeholder='Search clients by name,date of birth,NYC'
            onChange={searchval => onSearch(searchval)}
            onCancelSearch={() => onClear()}
          />
          <ShowField
            show={clients}
            showInProgress={clientLoading}
            yes={() => (
              <>
                <TableContainer className='table-modal' component={Paper}>
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow striped bordered hover>
                        <TableCell>Client no</TableCell>
                        <TableCell align='left'>First Name</TableCell>
                        <TableCell align='left'>Last Name</TableCell>
                        <TableCell align='left'>Date of Birth</TableCell>
                        <TableCell align='left'>NICNO</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {clients && clients.length > 0
                        ? clients.map((row, i) => (
                          <TableRow
                            key={i}
                            onClick={() => onSet(row)}
                            style={{ cursor: 'pointer' }}
                          >
                            <TableCell component='th' scope='row'>
                              {row.CLIENTNUM}
                            </TableCell>
                            <TableCell align='left'>
                              {row.FIRSTNAME}
                            </TableCell>
                            <TableCell align='left'>
                              {row.LASTNAME}
                            </TableCell>
                            <TableCell align='left'>
                              {row.DTBIRTH ? row.DTBIRTH : '--'}
                            </TableCell>
                            <TableCell align='left'>
                              {row.NICNO ? row.NICNO : '--'}
                            </TableCell>
                          </TableRow>
                        ))
                        : null}
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            )}
            no={() => (
              <>
                {clients === null
                  ? (
                    <Box
                      display='flex'
                      flexDirection='column'
                      justifyContent='center'
                      alignItems='center'
                    >
                      <Typography variant='h5' className={classes.records}>
                        No results found!
                      </Typography>
                    </Box>
                    )
                  : null}
              </>
            )}
          />
          <Button
            variant='contained'
            className='close-blue-btn'
            onClick={onClose}
            disabled={clientLoading}
            color='primary'
          >
            Close
          </Button>
        </Paper>
      </Dialog>
    </>
  )
}

const mapStateToProps = state => {
  const { Client } = state
  return {
    clientLoading: Client.clientLoading,
    clientData: Client.clientData
  }
}

const mapDispatchToProps = dispatch => ({
  searchDispatch: params => dispatch(ClientActions.SearchClient(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(ClientsPopup)

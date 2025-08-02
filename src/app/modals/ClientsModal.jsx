import React, { Fragment } from 'react'
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
const useStyles = makeStyles({
  table: {
    maxWidth: 855,
    maxHeight: 468,
    radius: 4
  },
  records: {
    color: '#002f87'
  }
})

const ClientsModals = props => {
  const {
    clientLoading,
    clientData,
    disabled,
    cancelSearch,
    handleClickOpen,
    handleClose,
    handleCloseModal,
    requestSearch,
    showRecordFound,
    open,
    searched
  } = props

  const classes = useStyles()

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
        maxWidth='sm'
        open={open}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>
          <h2 className='searchBelow_line'>Search for clients</h2>
        </DialogTitle>
        <Paper className='shadow_field'>
          <SearchBar
            className='searchbar_field'
            value={searched}
            placeholder='Search clients by name,date of birth,NYC'
            onChange={searchval => requestSearch(searchval)}
            onCancelSearch={() => () => {
              cancelSearch()
            }}
          />
          <ShowField
            show={clientData}
            showInProgress={clientLoading}
            yes={() => (
              <>
                <TableContainer
                  className='table-modal'
                  component={Paper}
                  id='style-4'
                >
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
                      {clientData && clientData.length > 0
                        ? clientData.map((row, i) => (
                          <TableRow
                            key={i}
                            onClick={() => {
                              handleClose(row)
                            }}
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
                {showRecordFound
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
            onClick={handleCloseModal}
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
    clientData: Client.clientData,
    error: Client.error
  }
}

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(ClientsModals)

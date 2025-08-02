import React, { useState, useEffect } from 'react'
import {
  Box,
  Button,
  Grid,
  IconButton,
  Typography,
  CircularProgress,
  makeStyles,
  Dialog
} from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import toast from 'react-hot-toast'
import _, { omit } from 'lodash'
import { useForm } from 'react-hook-form'
import Mselect from '../../../../../app/form-controls/Mselect'
import Mtextbox from '../../../../../app/form-controls/Mtextbox'
import { useTheme } from '@material-ui/core/styles'
import Mcheckboxs from '../../../../../app/form-controls/Mcheckboxs'
import Mdatepicker from '../../../../../app/form-controls/Mdatepicker'
import ValidateNotify from '../../../../../app/widgets/ValidateNotify'
import PerfectScrollbar from 'react-perfect-scrollbar'
import AccessTime from '@material-ui/icons/AccessTime'
import DeleteOutline from '@material-ui/icons/DeleteOutline'
import PersonOutline from '@material-ui/icons/PersonOutline'
import PictureAsPdfOutlined from '@material-ui/icons/PictureAsPdfOutlined'
import TextFormatOutlined from '@material-ui/icons/TextFormatOutlined'
import Mfileupload from '../../../../../app/form-controls/Mfileupload'
import { CustomAccordion, ShowField } from '../../../../../app/uiComponents'
import CustomBackdrop from '../../../../../app/backdrop/CustomBackdrop'
import moment from 'moment'
import {
  FILE_DOCUMENT,
  MOTOR_FORM,
  GRANTED_USERS,
  SWAN_API_URL,
  REGEX,
  DATE
} from '../../../../../helpers/constants'
import { ERROR } from '../../../../../helpers/messages'
import { connect, shallowEqual, useSelector } from 'react-redux'
import {
  proposalSubmitDropdownAction,
  ProposalAction,
  MotorQuotationAction
} from '../../../../../store/actions/index'

import GetAppIcon from '@material-ui/icons/GetApp'
import {
  getSessionStorage,
  removeErrString,
  handleSetError,
  checkResFailed,
  handleTrimWhiteSpace,
  removeSingleZero,
  preventIfNotAlphaNumric,
  preventIfNotNumber
} from '../../../../../helpers/helper'
import DescriptionIcon from '@material-ui/icons/Description'

const _FormSubmitInstruction = props => {
  const theme = useTheme()
  const useStyles = makeStyles(theme => ({
    alignTop: {
      paddingBottom: 12,
      paddingTop: 12
    },
    alignMargin: {
      paddingTop: 16,
      marginLeft: 14
    },
    textColor: {
      color: theme.palette.primary.main
    },
    subSvg: {
      width: 15,
      fill: '#b1a9a9 !important'
    },
    deleteiconColor: {
      fill: '#e53935 !important'
    },
    blueiconColor: {
      fill: '#00B7CD !important'
    },
    textGrey: {
      color: '#b1a9a9 !important',
      fontSize: '9px',
      fontWeight: 600
    },
    h6: {
      fontWeight: 600,
      color: theme.palette.primary.main,
      marginLeft: '6px'
    },
    centerText: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    downloadIcon: {
      color: '#00b8ce'
    },
    downloadHeader: {
      fontSize: '14px',
      marginRight: '10px'
    },
    error: {
      marginLeft: '37px',
      color: '#ff0d1e',
      fontSize: '14px',
      fontWeight: 600
    },
    BtnDisable: {
      backgroundColor: 'rgba(0, 0, 0, 0.26)',
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.26)'
      }
    },
    btn: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '12px',
      marginBottom: '8px'
    },
    margin: {
      marginTop: '5px',
      marginBottom: '10px',
      color: '#091641 !important',
      textAlign: 'center'
    },
    btnFlex: {
      margin: '5px',
      minWidth: '150px'
    }
  }
  ))

  const classes = useStyles()
  const {
    fromPage,
    back,
    getPayMethodDispatch,
    getPayMethodDropdownData,
    postFileUploadDispatch,
    postSubmitFileDispatch,
    postFinalSubmitDispatch,
    getQuoteDetailsDispatch,
    getQuoteDetailsStatus,
    postProposalFileUploadData,
    postProposalFinalSubmit,
    clearProposalFileUploadDispatch,
    clearProposalSubmitFileDispatch,
    getQuoteDetails,
    postProposalFileSubmitData,
    clearProposalFinalSubmitAction,
    postDownloadTemplateDispatch,
    clearDownloadTemplateDispatch,
    postDownloadTemplateLoading,
    downloadTemplateData,
    downloadTemplateStatus,
    clearDownloadPreTempDispatch,
    downloadPreTempData,
    downloadPreTempStatus,
    getPolicyMethodDispatch,
    getPolicyDeliveryData,
    postProposalFileSubmitLoading,
    ClearMotQuoteDetailsDispatch,
    getQuoteDetailsLoading,
    getUploadedFileDispatch,
    clearUploadedFileDispatch,
    getUploadedFileLoading,
    uploadedFileData,
    uploadedFileStatus,
    postDeleteDocsDispatch,
    clearDeleteDocsDispatch,
    postDeleteDocsLoading,
    postDeleteDocsData,
    postDeleteDocsStatus
  } = props

  const { control, handleSubmit, formState, reset, ref, setValue, setError, clearErrors, register, watch, getValues } = useForm(
    {
      defaultValues: {
        DTFRM: null,
        DTTO: null,
        POLDLVRY: '',
        PAYMTD: '',
        RegNo: '',
        CORPCLIENT: '',
        OTR: '',
        MSR: '',
        PFI: '',
        RDS: '',
        KYC: '',
        HP: '',
        DISCLAIMER: false
      },
      isValid
    }
  )
  const getFromDateValues = getValues('DTFRM')
  const getFromDateWatch = watch('DTFRM')
  const getToDateValues = getValues('DTTO')
  const getToDateWatch = watch('DTTO')
  const { authRole } = useSelector(
    ({ Auth }) => ({
      authRole: Auth.authRole
    }),
    shallowEqual
  )
  const QuoteId = getSessionStorage(MOTOR_FORM.QUOTE_NUMBER)
  const history = useHistory()
  const [errorPop, setErrorPop] = useState(false)
  const { errors, isValid } = formState
  const [open, setOpen] = useState(false)
  const [state, setState] = useState({
    personalData: {},
    vehicleData: {},
    extensionData: {},
    proposalsData: {},
    SubmitData: {},
    fileUrl: '',
    fileName: '',
    toMaxDate: moment().add(365, 'days'),
    toMinDate: moment().add(1, 'days'),
    fromMaxDate: moment().add(365, 'days')
  })
  const [message, setMessage] = useState('')
  const [error, setErrors] = useState()
  const [filename, setFileName] = useState({
    OTR: [],
    MSR: [],
    PFI: [],
    RDS: [],
    KYC: [],
    HP: []
  })

  const onSubmit = data => {
    const payload = {
      ...data,
      ...state?.personalData,
      ...state?.vehicleData,
      ...state?.extensionData,
      ...state?.proposalsData,
      DTFRM: data.DTFRM && data.DTFRM
        ? moment(data.DTFRM).format('DD/MM/YYYY')
        : '',
      DTTO: data.DTTO && data.DTTO
        ? moment(data.DTTO).format('DD/MM/YYYY')
        : '',
      INST: '',
      INSTREF: '',
      QUOTETYPE: '',
      TRANSTYPE: '',
      CORPCLIENT: '',
      DTBIRTH: moment(state?.personalData?.DTBIRTH).format('DD/MM/YYYY'),
      PurchaseType: {
        value: `${state?.personalData?.PurchaseType === 'Second Hand' ? 'Y' : 'N'}`,
        type: state?.personalData?.PurchaseType
      },
      NoOfSeats: state?.vehicleData?.NoOfSeats?.toString(),
      RegNo: data?.RegNo ? data?.RegNo : ''
    }
    const proposalPayload = _.omit(payload, [
      'OTR',
      'MSR',
      'PFI',
      'RDS',
      'KYC',
      'HP',
      'DISCLAIMER'])
    postFinalSubmitDispatch(proposalPayload)
  }

  useEffect(() => {
    if (getFromDateValues && getFromDateValues) {
      const dFrom = moment(getFromDateValues, 'DD/MM/yyyy').toDate()
      setState(prevState => ({
        ...prevState,
        toMaxDate: moment(dFrom).add(365, 'days'),
        toMinDate: moment(dFrom).add(1, 'days'),
      }))
    }
    if (getToDateValues && getToDateValues) {
      const dto = moment(getToDateValues, 'DD/MM/yyyy').toDate()
      setState(prevState => ({
        ...prevState,
        fromMaxDate: moment(dto)
      }))
    }
  }, [getFromDateWatch, getToDateWatch])
  
  const perfectScrollbarOptions = {
    wheelSpeed: 0.5,
    wheelPropagation: false
  }

  const handleDelete = (file, name) => {
    setOpen(true)
    setState(prevState => ({
      ...prevState,
      fileUrl: file,
      fileName: name
    }))
  }

  const deleteUploded = (name) => {
    const splittedName = name && name.split('/')
    const file = splittedName[1]
    const payload = {
      QUOTNUM: QuoteId,
      FLNM: file
    }
    postDeleteDocsDispatch(payload)
  }

  useEffect(() => {
    if (postDeleteDocsStatus == 'success') {
      toast.success('Document was deleted successfully!', { duration: 3000 })
      setOpen(false)
      if (state.fileName) {
        const omitFile = omit(filename, state.fileName)
        setFileName(omitFile)
      }
      clearDeleteDocsDispatch()
      const params = {
        quotnum: QuoteId
      }
      getUploadedFileDispatch(params)
    } else if (postDeleteDocsStatus === 'error' || checkResFailed(postDeleteDocsData)) {
      toast.error(removeErrString(postDeleteDocsData), { duration: 4000 })
      clearDeleteDocsDispatch()
    }
  }, [postDeleteDocsStatus])

  const handleFileChange = async e => {
    e.preventDefault()
    const file = e.target.files[0]
    const { name } = e.target
    setValue(name, e.target.files)
    let isValidFileFormat = true
    const maxFileSize = 0
    const fileType = file && file.type
    const uploadedFileSize = file && file.size
    isValidFileFormat = _.includes(FILE_DOCUMENT, fileType)
    const fileSize = Number(maxFileSize)
    if (isValidFileFormat) {
      if (uploadedFileSize) {
        const form_data = new FormData()
        form_data.append('file', file)
        form_data.append('doctype', name)
        form_data.append('quotnum', QuoteId)
        postFileUploadDispatch(form_data)
        setErrors(values => ({ ...values, file_to_upload: '' }))
        setFileName(value => ({
          ...value,
          [name]: {
            filename: file && file.name,
            filetype: fileType,
            fieldName: name,
            uploaded_time: moment().format('DD.MM.YY')
          }
        }))
      } else {
        setErrors({
          ...errors,
          [name]: `File size must below ${fileSize /
            1048576} MB!. You file size is : ${Math.round(
              uploadedFileSize / 1024
            )}KB`
        })
      }
    }
  }
  useEffect(()=>{
    if (getFromDateWatch && !getFromDateWatch.isValid() || getToDateValues && !getToDateValues.isValid()) {
      setError('DTFRM', { type: 'error' }, { message: '' })
      setError('DTTO', { type: 'error' }, { message: '' })
      // setIsDisable(true)
    }else{
      clearErrors('DTFRM')
      clearErrors('DTTO')
      // setIsDisable(false)
    }
  },[getFromDateWatch,getToDateValues])
  function previewDoctype(fileType) {
    switch (fileType) {
      case 'text/plain':
        return <TextFormatOutlined className={classes.blueiconColor} />
      case 'application/pdf':
        return <PictureAsPdfOutlined className={classes.blueiconColor} />
      default:
        return <DescriptionIcon className={classes.blueiconColor} />
    }
  }

  const PreviewDoc = ({ name, file_name, file_type, uploaded_time }) => {
    return (
      <>
        <Box
          display='flex'
          flexDirection='row'
          alignItems='center'
          justifyContent='space-between'
          padding={0}
        >
          <Box display='flex' flexDirection='column' alignItems='stretch'>
            <Box display='flex' flexDirection='row' alignItems='stretch'>
              <Box component='span'>
                {' '}
                {previewDoctype(file_type)}
                {file_name}
              </Box>
            </Box>
            <Box
              display='flex'
              flexDirection='row'
              alignItems='space-between'
              justifyContent='space-between'
            >
              <Typography className={`${classes.textGrey} pr-5 py-3`}>
                <PersonOutline className={classes.subSvg} />
                {state && state.personalData
                  ? `${state.personalData.FIRSTNAME} 
                     ${state.personalData.LASTNAME}`
                  : '--'}
              </Typography>
              <Typography className={`${classes.textGrey} py-3`}>
                <AccessTime className={classes.subSvg} />{' '}
                {uploaded_time}
              </Typography>
            </Box>
          </Box>
          <IconButton aria-label='delete'>
            <DeleteOutline
              onClick={() => {
                handleDelete(file_name, name)
              }}
              className={classes.deleteiconColor}
            />
          </IconButton>
        </Box>
      </>
    )
  }

  useEffect(() => {
    window.scrollTo(0, localStorage.getItem('position'))
    getPayMethodDispatch()
    getPolicyMethodDispatch()
    if (QuoteId) {
      getQuoteDetailsDispatch(QuoteId)
    }
    const params = {
      quotnum: QuoteId
    }
    getUploadedFileDispatch(params)
  }, [])

  const resetRegNo = (_resetRegNo) => {
    if (typeof _resetRegNo === 'string' && _resetRegNo !== '') {
      reset(prevState => ({
        ...prevState,
        RegNo: _resetRegNo
      }))
    }
  }

  const resetTheValues = item => {
    reset(formValues => ({
      ...formValues,
      DTFRM: item.DTFRM ? moment(item.DTFRM) : null,
      DTTO: item.DTTO ? moment(item.DTTO) : null,
      POLDLVRY: item.POLDLVRY,
      PAYMTD: item.PAYMTD,
      CORPCLIENT: item.CORPCLIENT
    }))
  }

  const resetFilevalue = item => {
    reset(formValues => ({
      ...formValues,
      OTR: item?.OTR,
      MSR: item?.MSR,
      PFI: item?.PFI,
      RDS: item?.RDS,
      KYC: item?.KYC,
      HP: item?.HP
    }))
  }

  useEffect(() => {
    if (getQuoteDetailsStatus === 'success') {
      const extension =
        getQuoteDetails && getQuoteDetails.extension
          ? getQuoteDetails.extension
          : {}
      const vehicleDetails =
        getQuoteDetails && getQuoteDetails.vehicleDetails
          ? getQuoteDetails.vehicleDetails
          : {}
      const personalInfo =
        getQuoteDetails && getQuoteDetails.personalDetails
          ? getQuoteDetails.personalDetails
          : {}
      const proposalsData =
        getQuoteDetails && getQuoteDetails?.proposals
          ? getQuoteDetails?.proposals
          : {}
      const SubmitData = getQuoteDetails && getQuoteDetails?.submit
        ? getQuoteDetails?.submit
        : {}
      resetRegNo(getQuoteDetails?.vehicleDetails?.RegNo)
      if (!_.isEmpty(SubmitData)) {
        resetTheValues(SubmitData)
        setState(prevState => ({
          ...prevState,
          personalData: personalInfo,
          vehicleData: vehicleDetails,
          extensionData: extension,
          proposalsData: proposalsData,
          SubmitData: SubmitData
        }))
      }
      ClearMotQuoteDetailsDispatch()
    }
  }, [getQuoteDetailsStatus])

  useEffect(() => {
    if (uploadedFileStatus == 'success') {
      Object.keys(uploadedFileData).map((file) => {
        const fileValue = uploadedFileData
        setFileName(value => ({
          ...value,
          [file]: {
            filename: uploadedFileData[file].fileUrl,
            filetype: uploadedFileData[file].fileType,
            uploaded_time: moment(uploadedFileData[file].createdAt).format('DD.MM.YY')
          }
        }))
        if (fileValue) {
          resetFilevalue(fileValue)
        }
      })
    }
    clearUploadedFileDispatch()
  }, [uploadedFileStatus])

  useEffect(() => {
    if (
      postProposalFileUploadData?.status === 'success' &&
      !checkResFailed(postProposalFileUploadData?.data)
    ) {
      const fileSubmitData = {
        QUOTNUM: QuoteId || 'A75355',
        FIRSTNAME: 'UA',
        AGENCIES: '01',
        PolicyType: '00',
        QUOTETYPE: 'MT',
        COMPANY: '',
        USERLOGIN: 'PSPETER',
        TRANSTYPE: 'O',
        ISMANTATORY: '0',
        FLNM: postProposalFileUploadData?.data
      }
      postSubmitFileDispatch(fileSubmitData)
      clearProposalFileUploadDispatch()
    } else if (
      postProposalFileUploadData?.status === 'error' ||
      checkResFailed(postProposalFileUploadData?.data)
    ) {
      toast.error('File Failed to Upload', {
        duration: 4000
      })
    }
  }, [postProposalFileUploadData])

  useEffect(() => {
    if (
      postProposalFileSubmitData?.status === 'success' &&
      !checkResFailed(postProposalFileSubmitData?.data)
    ) {
      toast.success('File Uploaded Successfully!')
      clearProposalSubmitFileDispatch()
    } else if (
      postProposalFileSubmitData?.status === 'error' ||
      checkResFailed(postProposalFileSubmitData?.data)
    ) {
      toast.error('Unable to SUbmit FIle', {
        duration: 4000
      })
    }
  }, [postProposalFileSubmitData])

  useEffect(() => {
    if (
      postProposalFinalSubmit?.status === 'success' &&
      !checkResFailed(postProposalFinalSubmit?.data)
    ) {
      toast.success('Proposal informations have been saved!', {
        duration: 3000
      })
      clearProposalFinalSubmitAction()
      history.push('/customer/quotes/summary')
    } else if (
      postProposalFinalSubmit?.status === 'error' ||
      checkResFailed(postProposalFinalSubmit?.data)
    ) {
      toast.error('Something Went Wrong', { duration: 4000 })
    }
  }, [postProposalFinalSubmit])

  const downloadTemplate = () => {
    const payload = {
      QUOTNUM: QuoteId
    }
    postDownloadTemplateDispatch(payload)
  }

  const downloadFiles = (uri) => {
    const link = document.createElement('a')
    const url = window.URL || window.webkitURL
    const revokeUrlAfterSec = 1000
    link.href = uri
    link.download = true
    link.target = '_blank'
    document.body.append(link)
    link.click()
    link.remove()
    setTimeout(() => url.revokeObjectURL(link.href), revokeUrlAfterSec)
  }

  useEffect(() => {
    if (downloadTemplateStatus === 'success') {
      if (downloadTemplateData) {
        const data = downloadTemplateData && downloadTemplateData.split('-')
        const templateData = data && data[1]
        const downloadTemplateUrl = `${SWAN_API_URL}/${templateData}`
        downloadFiles(downloadTemplateUrl)
      }
    }
    clearDownloadTemplateDispatch()
  }, [downloadTemplateStatus])

  useEffect(() => {
    if (downloadPreTempStatus === 'success') {
      if (downloadPreTempData) {
        const downloadTemplateUrl = `${downloadPreTempData}`
        downloadFiles(downloadTemplateUrl)
      }
    }
    clearDownloadPreTempDispatch()
  }, [downloadPreTempStatus])

  const onError = (errors, e) => {
    if (!_.isEmpty(errors)) {
      setErrorPop(true)
      setMessage('Please fill in required information to proceed')
    }
  }

  return (
    <>
      <Dialog
        fullWidth
        maxWidth='sm'
        open={open}
        aria-labelledby='form-dialog-title'
        spacing={4}
      >
        <Grid
          container
          direction='row'
          justifyContent='center'
          alignItems='flex-start'
          className='summary-box motor-summary'
        >
          <Grid item xs={10} className={classes.margin}>
            <h4 className={classes.confirmationText}>
              Are you sure you want to Delete the Document?
            </h4>
          </Grid>
          <Grid item className={classes.btn}>
            <Button
              variant='outlined'
              className={classes.btnFlex}
              color='primary'
              onClick={() => setOpen(false)}
            >
              NO
            </Button>
            <Button
              variant='contained'
              className={classes.btnFlex}
              color='primary'
              type='submit'
              onClick={() => deleteUploded(state.fileUrl)}
            >
              {postDeleteDocsLoading
                ? (
                  <CircularProgress size={18} style={{ color: '#ffffff' }} />
                )
                : (
                  'YES'
                )}
            </Button>
          </Grid>
        </Grid>
      </Dialog>
      <CustomBackdrop isLoading={getQuoteDetailsLoading || getUploadedFileLoading} />
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <Grid
          container
          direction='row'
          justifyContent='center'
          alignItems='flex-start'
          spacing={fromPage === 'summary' ? 2 : 4}
        >
          <Grid item xs={12}>
            <Grid container spacing={2} alignItems='center' />
          </Grid>
          <Grid item md={fromPage === 'summary' ? 12 : 6} xl={6}>
            <Grid container spacing={fromPage === 'summary' ? 1 : 2}>
              <Grid item xs={12}>
                <h4 className='form-title-md'>
                  Submit instructions{' '}
                  <span>
                    <span className='req-mark'>*</span> Required field
                  </span>
                </h4>
                <h5
                  style={{ color: theme.palette.primary.main }}
                  className={classes.alignTop}
                >
                  Period of Insurance
                </h5>
              </Grid>
              <Grid item md={1} xs={1} spacing={0} className={classes.centerText}>
                <Typography>From</Typography>
              </Grid>
              <Mdatepicker
                xs={11}
                md={5}
                name='DTFRM'
                label='DD/MM/YYYY'
                control={control}
                req
                onKeyPress={e => {
                  preventIfNotNumber(e)
                }}
                placeholder={DATE.DATE_ONLY}
                minDate={moment()}
                maxDate={state.fromMaxDate}
                grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                userType={authRole}
              />
              <Grid item md={1} xs={1} spacing={0} className={classes.centerText}>
                <Typography>To</Typography>
              </Grid>
              <Mdatepicker
                xs={11}
                md={5}
                name='DTTO'
                label='DD/MM/YYYY'
                control={control}
                placeholder={DATE.DATE_ONLY}
                minDate={state.toMinDate}
                maxDate={state.toMaxDate}
                req
                onKeyPress={e => {
                  preventIfNotNumber(e)
                }}
                grantedUsers={GRANTED_USERS.AGENT_BROKER_CUSTOMER}
                userType={authRole}
              />
              <Mtextbox
                xs={12}
                name='RegNo'
                label='Registration Number'
                control={control}
                clearErrors={clearErrors}
                pattern={REGEX.ALPHA_NUMERIC}
                onKeyPress={e => {
                  preventIfNotAlphaNumric(e)
                }}
                onBlur={e => {
                  handleTrimWhiteSpace(e, 'RegNo', setValue)
                  removeSingleZero(e, 'RegNo', setValue)
                  handleSetError(
                    e,
                    'RegNo',
                    setError,
                    REGEX.ALPHA_NUMERIC,
                    ERROR.ALPHA_NUMERIC_SPACE
                  )
                }}
                maxLength={10}
                grantedUsers={GRANTED_USERS.CUSTOMER}
                userType={authRole}
                req
              />
              <Mselect
                reset={reset}
                xs={12}
                name='PAYMTD'
                control={control}
                label='Payment method'
                options={getPayMethodDropdownData && getPayMethodDropdownData}
                optionsLabel='DESCRIP'
                optionsValue='CODE'
                grantedUsers={GRANTED_USERS.CUSTOMER}
                userType={authRole}
                req
              />
              <Mselect
                reset={reset}
                xs={12}
                name='POLDLVRY'
                control={control}
                label='Policy delivery'
                options={getPolicyDeliveryData && getPolicyDeliveryData}
                optionsLabel='POLICYDELIVERY'
                optionsValue='POLICYDELIVERY'
                grantedUsers={GRANTED_USERS.CUSTOMER}
                userType={authRole}
                req
              />
              <p style={{ color: '#ed5722', fontSize: '14px', fontWeight: 600 }} className='ml-2'>Note: Save Rs200 if by email</p>
            </Grid>
          </Grid>
          <Grid item md={fromPage === 'summary' ? 12 : 6} xl={6} sm={12}>
            <section className='quote-summary'>
              <Box className='quote-summary-header'>
                <Button
                  color='primary'
                  className={classes.downloadHeader}
                  onClick={() => {
                    downloadTemplate()
                  }}
                >
                  {postDownloadTemplateLoading
                    ? (
                      <>
                        <CircularProgress size={18} color='primary' />
                      </>
                    )
                    : (
                      <>
                        <GetAppIcon
                          className={`${classes.downloadIcon} `}
                        />
                        &nbsp; DOWNLOAD PREFILLED DOCUMENTS
                      </>
                    )}
                </Button>
              </Box>
              <div className='quote-summary-content'>
                <PerfectScrollbar
                  options={perfectScrollbarOptions}
                  className='scroll'
                  style={{ maxHeight: '50vh', position: 'relative' }}
                >
                  <h4 className={`form-title-md ${classes.alignMargin}`}>
                    Upload documents{' '}
                    <span>
                      <span className='req-mark'>*</span> Required field
                    </span>
                  </h4>
                  <p className={`${classes.alignMargin} ${classes.alignTop}`}>
                    Please upload the required documents to complete the
                    transaction.
                  </p>
                  <CustomAccordion
                    label='Driving licence'
                    req={errors?.OTR}
                    isExpanded={!filename?.OTR?.filename}
                    isUploaded={!!filename?.OTR?.filename}
                  >
                    <Grid item xs={12}>
                      <ShowField
                        show={filename?.OTR && filename?.OTR.length !== 0}
                        yes={() => (
                          <PreviewDoc
                            name='OTR'
                            file_name={filename?.OTR?.filename}
                            file_type={filename?.OTR?.filetype}
                            uploaded_time={filename?.OTR?.uploaded_time}
                          />
                        )}
                        no={() => null}
                      />
                      <Mfileupload
                        name='OTR'
                        id='doc_driving_licence'
                        control={control}
                        clearErrors={clearErrors}
                        ref={ref}
                        onChange={e => {
                          handleFileChange(e)
                        }}
                        req
                        grantedUsers={GRANTED_USERS.AGENT}
                        userType={authRole}
                      />
                    </Grid>
                  </CustomAccordion>
                  <CustomAccordion
                    label='Mode of payment (PPA/Standing Debit)'
                    req={errors?.MSR}
                    isExpanded={!filename?.MSR?.filename}
                    isUploaded={!!filename?.MSR?.filename}
                  >
                    <Grid item xs={12}>
                      <ShowField
                        show={filename?.MSR && filename?.MSR.length !== 0}
                        yes={() => (
                          <PreviewDoc
                            name='MSR'
                            file_name={filename?.MSR?.filename}
                            file_type={filename?.MSR?.filetype}
                            uploaded_time={filename?.MSR?.uploaded_time}
                          />
                        )}
                        no={() => null}
                      />
                      <Mfileupload
                        name='MSR'
                        id='doc_payment_method_doc'
                        control={control}
                        clearErrors={clearErrors}
                        ref={ref}
                        onChange={e => {
                          handleFileChange(e)
                        }}
                        req
                        grantedUsers={GRANTED_USERS.AGENT}
                        userType={authRole}
                      />
                    </Grid>
                  </CustomAccordion>
                  <CustomAccordion
                    label='Pro-Forma invoice' req={errors?.PFI}
                    isExpanded={!filename?.PFI?.filename}
                    isUploaded={!!filename?.PFI?.filename}
                  >
                    <Grid item xs={12}>
                      <ShowField
                        show={filename?.PFI && filename?.PFI.length !== 0}
                        yes={() => (
                          <PreviewDoc
                            name='PFI'
                            file_name={filename?.PFI?.filename}
                            file_type={filename?.PFI?.filetype}
                            uploaded_time={filename?.PFI?.uploaded_time}
                          />
                        )}
                        no={() => null}
                      />
                      <Mfileupload
                        name='PFI'
                        id='doc_pro_forma_invoice'
                        control={control}
                        clearErrors={clearErrors}
                        ref={ref}
                        onChange={e => {
                          handleFileChange(e)
                        }}
                        req
                        grantedUsers={GRANTED_USERS.AGENT}
                        userType={authRole}
                      />
                    </Grid>
                  </CustomAccordion>
                  <CustomAccordion
                    label='Registered deed of sale'
                    req={errors?.RDS}
                    isExpanded={!filename?.RDS?.filename}
                    isUploaded={!!filename?.RDS?.filename}
                  >
                    <Grid item xs={12}>
                      <ShowField
                        show={filename?.RDS && filename?.RDS.length !== 0}
                        yes={() => (
                          <PreviewDoc
                            name='RDS'
                            file_name={filename?.RDS?.filename}
                            file_type={filename?.RDS?.filetype}
                            uploaded_time={filename?.RDS?.uploaded_time}
                          />
                        )}
                        no={() => null}
                      />
                      <Mfileupload
                        name='RDS'
                        id='doc_registered_deed_sale'
                        control={control}
                        clearErrors={clearErrors}
                        ref={ref}
                        onChange={e => {
                          handleFileChange(e)
                        }}
                        req
                        grantedUsers={GRANTED_USERS.AGENT}
                        userType={authRole}
                      />
                    </Grid>
                  </CustomAccordion>
                  <CustomAccordion
                    label='KYC Docs' req={errors?.KYC}
                    isExpanded={!filename?.KYC?.filename}
                    isUploaded={!!filename?.KYC?.filename}
                  >
                    <Grid item xs={12}>
                      <ShowField
                        show={filename?.KYC && filename?.KYC.length !== 0}
                        yes={() => (
                          <PreviewDoc
                            name='KYC'
                            file_name={filename?.KYC?.filename}
                            file_type={filename?.KYC?.filetype}
                            uploaded_time={filename?.KYC?.uploaded_time}
                          />
                        )}
                        no={() => null}
                      />
                      <Mfileupload
                        name='KYC'
                        id='doc_kyc_docs'
                        control={control}
                        clearErrors={clearErrors}
                        ref={ref}
                        onChange={e => {
                          handleFileChange(e)
                        }}
                        req
                        grantedUsers={GRANTED_USERS.AGENT}
                        userType={authRole}
                      />
                    </Grid>
                  </CustomAccordion>
                  <CustomAccordion
                    label='HorsePower' req={errors?.HP}
                    isExpanded={!filename?.HP?.filename}
                    isUploaded={!!filename?.HP?.filename}
                  >
                    <Grid item xs={12}>
                      <ShowField
                        show={filename?.HP && filename?.HP.length !== 0}
                        yes={() => (
                          <PreviewDoc
                            name='HP'
                            file_name={filename?.HP?.filename}
                            file_type={filename?.HP?.filetype}
                            uploaded_time={filename?.HP?.uploaded_time}
                          />
                        )}
                        no={() => null}
                      />
                      <Mfileupload
                        name='HP'
                        id='doc_horsepower'
                        control={control}
                        clearErrors={clearErrors}
                        ref={ref}
                        onChange={e => {
                          handleFileChange(e)
                        }}
                        req
                        grantedUsers={GRANTED_USERS.AGENT}
                        userType={authRole}
                      />
                    </Grid>
                  </CustomAccordion>
                </PerfectScrollbar>
                <Mcheckboxs
                  xs={12}
                  name='DISCLAIMER'
                  control={control}
                  clearErrors={clearErrors}
                  {...register("DISCLAIMER", { required: "This is required." })}
                  label='By ticking this checkbox, we agree that the documents uploaded and
                  attached are valid and conform to the requirements. Please note that
                  Swan General Ltd cannot be held liable if wrong documents have been provided.
                  Kindly ensure that the correct attachments are uploaded before submission of instruction.
                  Thank you.'
                  grantedUsers={GRANTED_USERS.CUSTOMER}
                  userType={authRole}
                  req
                />
                <p className={classes.error}>{errors && errors.DISCLAIMER && ERROR.DISCLAIMER}</p>
              </div>
            </section>
          </Grid>
          <Grid item md={fromPage === 'summary' ? 12 : 8} />
          <Grid
            item
            md={fromPage === 'summary' ? 12 : 4}
            sm={fromPage === 'summary' ? 12 : 4}
            className='txt-right'
          >
            <Button
              variant='outlined'
              color='primary'
              className='mar-right-s'
              onClick={() => back()}
            >
              Back
            </Button>
            <Button
              variant='contained'
              color='primary'
              type='submit'
              className={!errors || !isValid ? classes.BtnDisable : ''}
            >
              {postProposalFileSubmitLoading
                ? (
                  <CircularProgress size={18} style={{ color: '#ffffff' }} />
                )
                : (
                  'Submit'
                )}
            </Button>
          </Grid>
          <ValidateNotify show={errorPop} errors={message} clear={setErrorPop} />
        </Grid>
      </form>
    </>
  )
}

const mapStateToProps = state => {
  const { ProposalSubmitDropDown, MotorQuotation, Proposal } = state
  return {
    getPayMethodDropdownData: ProposalSubmitDropDown.getPayMethodData,
    getPolicyDeliveryData: ProposalSubmitDropDown?.getPolicyDeliveryData,
    getQuoteDetails: MotorQuotation?.getQuoteDetails,
    getQuoteDetailsLoading: MotorQuotation?.getQuoteDetailsLoading,
    getQuoteDetailsStatus: MotorQuotation?.getQuoteDetailsStatus,
    postProposalSubmitFileData: Proposal?.postProposalSubmitFileData,
    postProposalFileUploadData: Proposal?.postProposalFileUploadData,
    postProposalFinalSubmit: Proposal?.postProposalFinalSubmit,
    postProposalFileSubmitData: Proposal?.postProposalSubmitFileData,
    postProposalFileSubmitLoading: Proposal.postProposalSubmitFileLoading,
    postFileUploading: Proposal.postProposalFileUploadLoading,
    postDownloadTemplateLoading: Proposal?.postDownloadTemplateLoading,
    downloadTemplateData: Proposal?.downloadTemplateData,
    downloadTemplateStatus: Proposal?.downloadTemplateStatus,
    getDownloadPreTempLoading: Proposal?.getDownloadPreTempLoading,
    downloadPreTempData: Proposal?.downloadPreTempData,
    downloadPreTempStatus: Proposal?.downloadPreTempStatus,
    downloadPreTempStatus: Proposal?.downloadPreTempStatus,
    getUploadedFileLoading: Proposal?.getUploadedFileLoading,
    uploadedFileData: Proposal?.uploadedFileData,
    uploadedFileStatus: Proposal?.uploadedFileStatus,
    postDeleteDocsLoading: Proposal?.postDeleteDocsLoading,
    postDeleteDocsData: Proposal?.postDeleteDocsData,
    postDeleteDocsStatus: Proposal?.postDeleteDocsStatus,
  }
}

const mapDispatchToProps = dispatch => ({
  getPayMethodDispatch: () =>
    dispatch(proposalSubmitDropdownAction.getPaymentMethod()),
  getPolicyMethodDispatch: () =>
    dispatch(proposalSubmitDropdownAction.getPolicyDelivery()),
  postFileUploadDispatch: data =>
    dispatch(ProposalAction.PostProposalFileUploadAction(data)),
  clearProposalFileUploadDispatch: () =>
    dispatch(ProposalAction.clearProposalFileUploadAction()),
  postSubmitFileDispatch: data =>
    dispatch(ProposalAction.PostProposalSubmitFileAction(data)),
  clearProposalSubmitFileDispatch: () =>
    dispatch(ProposalAction.clearProposalSubmitFileAction()),
  postFinalSubmitDispatch: data =>
    dispatch(ProposalAction.PostProposalFinalSubmitAction(data)),
  clearProposalFinalSubmitDispatch: () =>
    dispatch(ProposalAction.clearProposalFinalSubmitAction()),
  getQuoteDetailsDispatch: id =>
    dispatch(MotorQuotationAction.GetQuoteDetailsAction(id)),
  clearProposalFinalSubmitAction: () =>
    dispatch(ProposalAction.clearProposalFinalSubmitAction()),
  postDownloadTemplateDispatch: data =>
    dispatch(ProposalAction.postDownloadTemplateRequest(data)),
  clearDownloadTemplateDispatch: () =>
    dispatch(ProposalAction.ClearDownloadTemplateRequest()),
  getDownloadPreTempDispatch: params =>
    dispatch(ProposalAction.getDownloadPreTempRequest(params)),
  clearDownloadPreTempDispatch: () =>
    dispatch(ProposalAction.ClearDownloadPreTempRequest()),
  ClearMotQuoteDetailsDispatch: () =>
    dispatch(MotorQuotationAction.ClearMotQuoteDetailsAction()),
  getUploadedFileDispatch: params =>
    dispatch(ProposalAction.getUploadedFileRequest(params)),
  clearUploadedFileDispatch: () =>
    dispatch(ProposalAction.getUploadedFileClear()),
  postDeleteDocsDispatch: data =>
    dispatch(ProposalAction.postDeleteDocsRequest(data)),
  clearDeleteDocsDispatch: () =>
    dispatch(ProposalAction.ClearDeleteDocsRequest()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(_FormSubmitInstruction)

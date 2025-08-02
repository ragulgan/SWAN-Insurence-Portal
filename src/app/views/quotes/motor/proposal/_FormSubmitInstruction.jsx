import {
  Box,
  Button,
  Grid,
  IconButton,
  Typography,
  CircularProgress
  , makeStyles
} from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import toast from 'react-hot-toast'
import _ from 'lodash'
import React, { useState, useReducer, useEffect } from 'react'
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
import moment from 'moment'
import {
  FILE_DOCUMENT,
  MOTOR_FORM,
  GRANTED_USERS,
  SWAN_API_URL
} from '../../../../../helpers/constants'
import { connect, shallowEqual, useSelector } from 'react-redux'
import {
  proposalSubmitDropdownAction,
  ProposalAction,
  MotorQuotationAction
} from '../../../../../store/actions/index'

// import FormData from 'form-data'
import GetAppIcon from '@material-ui/icons/GetApp'
import {
  getSessionStorage,
  getLocalStorage,
  removeCharsFromString,
  checkResFailed,
  setLocalStorage,
  removeErrString
} from '../../../../../helpers/helper'
const _FormSubmitInstruction = props => {
  const [state, setState] = useState({
    personalData: {},
    vehicleData: {},
    extensionData: {},
    proposalsData: {}
  })
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
    }
  }))
  const classes = useStyles()
  const {
    fromPage,
    back,
    next,
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
    getDownloadPreTempDispatch,
    clearDownloadPreTempDispatch,
    getDownloadPreTempLoading,
    downloadPreTempData,
    downloadPreTempStatus,
    getPolicyMethodDispatch,
    getPolicyDeliveryData
  } = props

  const { control, handleSubmit, formState, reset, ref, setValue } = useForm(
    {
      defaultValues: {
        DTFRM: '',
        DTTO: '',
        POLDLVRY: '',
        PAYMTD: '',
        registration_no: '',
        CORPCLIENT: '',
        OTR: '',
        MSR: '',
        PFI: '',
        RDS: '',
        KYC: '',
        HP: ''
      }
    }
  )
  const { authRole } = useSelector(
    ({ Auth }) => ({
      authRole: Auth.authRole
    }),
    shallowEqual
  )
  const history = useHistory()
  const [errorPop, setErrorPop] = useState(false)
  const { errors } = formState
  const clearNotify = () => {
    setErrorPop(false)
  }
  const localData = JSON.parse(getLocalStorage(MOTOR_FORM.SET_FORM_DATA))
  const message = 'Please fill in required information to proceed'
  const onSubmit = data => {
    const payload = {
      ...data,
      ...localData,
      DTFRM: data.DTFRM ? data.DTFRM.format('DD/MM/YYYY') : '',
      DTTO: data.DTTO ? data.DTTO.format('DD/MM/YYYY') : '',
      INST: '',
      INSTREF: '',
      QUOTETYPE: '',
      TRANSTYPE: '',
      CORPCLIENT: 'False'
    }
    postFinalSubmitDispatch(payload)
  }
  const perfectScrollbarOptions = {
    wheelSpeed: 0.5,
    wheelPropagation: false
  }
  const [error, setErrors] = useState()
  const [filename, setFileName] = useState({
    OTR: [],
    MSR: [],
    PFI: [],
    RDS: [],
    KYC: [],
    HP: []
  })
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

  function previewDoctype (fileType) {
    switch (fileType) {
      case 'text/plain':
        return <TextFormatOutlined className={classes.blueiconColor} />
        break
      case 'application/pdf':
        return <PictureAsPdfOutlined className={classes.blueiconColor} />
        break

      default:
        return <h6>format_not_supported</h6>
        break
    }
  }

  const PreviewDoc = ({ file_name, file_type, uploaded_time }) => {
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
                Ana de Armas
              </Typography>
              <Typography className={`${classes.textGrey} py-3`}>
                <AccessTime className={classes.subSvg} />{' '}
                {/* {moment().format('DD.MM.YY')} */}
                {uploaded_time}
              </Typography>
            </Box>
          </Box>
          <IconButton aria-label='delete'>
            <DeleteOutline
              // onClick={() => setFileName()}
              className={classes.deleteiconColor}
            />
          </IconButton>
        </Box>
      </>
    )
  }
  useEffect(() => {
    getPayMethodDispatch()
    getPolicyMethodDispatch()
  }, [])

  const QuoteId = getSessionStorage(MOTOR_FORM.QUOTE_NUMBER)
  useEffect(() => {
    if (QuoteId) {
      getQuoteDetailsDispatch(QuoteId)
    }
  }, [])
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
      setState(prevState => ({
        ...prevState,
        personalData: personalInfo,
        vehicleData: vehicleDetails,
        extensionData: extension,
        proposalsData
      }))
    }
  }, [getQuoteDetailsStatus])

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
      history.push('/agent/quotes/list')
    } else if (
      postProposalFinalSubmit?.status === 'error' ||
      checkResFailed(postProposalFinalSubmit?.data)
    ) {
      toast.error('Something Went Wrong', {
        duration: 4000
      })
    }
  }, [postProposalFinalSubmit])

  const downloadTemplate = () => {
    const payload = {
      QUOTNUM: QuoteId
    }
    postDownloadTemplateDispatch(payload)
  }

  const downloadPreTemp = () => {
    const param = {
      quotnum: QuoteId
    }
    getDownloadPreTempDispatch(param)
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
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
              format='DD/MM/YYYY'
              control={control}
              className={classes.alignTop}
              grantedUsers={GRANTED_USERS.AGENT}
              userType={authRole}
              minDate={moment()}
              maxDate={moment().add(364, 'days')}
            />
            <Grid item md={1} xs={1} spacing={0} className={classes.centerText}>
              <Typography>To</Typography>
            </Grid>
            <Mdatepicker
              xs={11}
              md={5}
              name='DTTO'
              label='DD/MM/YYYY'
              format='DD/MM/YYYY'
              control={control}
              className={classes.alignTop}
              grantedUsers={GRANTED_USERS.AGENT}
              userType={authRole}
              placeHolder={moment().add(364, 'days')}
              minDate={moment()}
              maxDate={moment().add(364, 'days')}
            />
            <Mtextbox
              xs={12}
              name='registration_no'
              control={control}
              label='Registration Number'
              req
              grantedUsers={GRANTED_USERS.AGENT}
              userType={authRole}
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
              grantedUsers={GRANTED_USERS.AGENT}
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
              optionsValue='SWNPOLICYDELIVERY'
              grantedUsers={GRANTED_USERS.AGENT}
              userType={authRole}
              req
            />
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
              <Button
                color='primary'
                className={classes.downloadHeader}
                onClick={() => {
                  downloadPreTemp()
                }}
              >
                {getDownloadPreTempLoading
                  ? (
                    <>
                      <CircularProgress size={18} color='primary' />
                    </>
                    )
                  : (
                    <>
                      <GetAppIcon className={`${classes.downloadIcon} `} />
                    &nbsp; DOWNLOAD TEMPLATE
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
                <CustomAccordion label='Driving licence' req={errors?.OTR} isExpanded={!filename?.OTR?.filename}>
                  <Grid item xs={12}>
                    <ShowField
                      show={filename?.OTR.length !== 0}
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
                      ref={ref}
                      onChange={e => {
                        handleFileChange(e)
                      }}
                      // req
                      grantedUsers={GRANTED_USERS.AGENT}
                      userType={authRole}
                    />
                  </Grid>
                </CustomAccordion>
                <CustomAccordion
                  label='Mode of payment (PPA/Standing Debit)'
                  req={errors?.MSR}
                  isExpanded={!filename?.MSR?.filename}
                >
                  <Grid item xs={12}>
                    <ShowField
                      show={filename?.MSR.length !== 0}
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
                      ref={ref}
                      onChange={e => {
                        handleFileChange(e)
                      }}
                      // req
                      grantedUsers={GRANTED_USERS.AGENT}
                      userType={authRole}
                    />
                  </Grid>
                </CustomAccordion>
                <CustomAccordion label='Pro-Forma invoice' req={errors?.PFI} isExpanded={!filename?.PFI?.filename}>
                  <Grid item xs={12}>
                    <ShowField
                      show={filename?.PFI.length !== 0}
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
                      ref={ref}
                      onChange={e => {
                        handleFileChange(e)
                      }}
                      // req
                      grantedUsers={GRANTED_USERS.AGENT}
                      userType={authRole}
                    />
                  </Grid>
                </CustomAccordion>
                <CustomAccordion
                  label='Registered deed of sale'
                  req={errors?.RDS}
                  isExpanded={!filename?.RDS?.filename}
                >
                  <Grid item xs={12}>
                    <ShowField
                      show={filename?.RDS.length !== 0}
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
                      ref={ref}
                      onChange={e => {
                        handleFileChange(e)
                      }}
                      // req
                      grantedUsers={GRANTED_USERS.AGENT}
                      userType={authRole}
                    />
                  </Grid>
                </CustomAccordion>
                <CustomAccordion label='KYC Docs' req={errors?.KYC} isExpanded={!filename?.KYC?.filename}>
                  <Grid item xs={12}>
                    <ShowField
                      show={filename?.KYC.length !== 0}
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
                      ref={ref}
                      onChange={e => {
                        handleFileChange(e)
                      }}
                      // req
                      grantedUsers={GRANTED_USERS.AGENT}
                      userType={authRole}
                    />
                  </Grid>
                </CustomAccordion>
                <CustomAccordion label='HorsePower' req={errors?.HP} isExpanded={!filename?.HP?.filename}>
                  <Grid item xs={12}>
                    <ShowField
                      show={filename?.HP.length !== 0}
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
                      ref={ref}
                      onChange={e => {
                        handleFileChange(e)
                      }}
                      // req
                      grantedUsers={GRANTED_USERS.AGENT}
                      userType={authRole}
                    />
                  </Grid>
                </CustomAccordion>
              </PerfectScrollbar>
              <Mcheckboxs
                xs={12}
                name='CORPCLIENT'
                control={control}
                label='By ticking this checkbox, we agree that the documents uploaded and attached are valid and conform to the requirements. Please note that Swan General Ltd cannot be held liable if wrong documents have been provided. Kindly ensure that the correct attachments are uploaded before submission of instruction.
              Thank you.'
                grantedUsers={GRANTED_USERS.AGENT}
                userType={authRole}
              />
            </div>
          </section>
        </Grid>

        <Grid item md={fromPage === 'summary' ? 12 : 8}>
          <ValidateNotify show={errorPop} errors={message} clear={clearNotify} />
        </Grid>
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

          <Button variant='contained' type='submit' color='primary'>
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
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
    downloadPreTempStatus: Proposal?.downloadPreTempStatus
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
    dispatch(ProposalAction.ClearDownloadPreTempRequest())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(_FormSubmitInstruction)

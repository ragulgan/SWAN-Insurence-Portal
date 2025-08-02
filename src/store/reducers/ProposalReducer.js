import * as constant from '../../store/constants/ProposalConstants'
const initState = {
  getProposalLoading: false,
  postProposalLoading: false,
  getSubmitLoading: false,
  puSubmitLoading: false,
  getProposalDetails: null,
  getSubmitDetails: null,
  postProposalDetails: null,
  putSubmitDetails: null,
  getFileUploadLoading: false,
  postProposalFileUploadData: null,
  postProposalFileUploadLoading: false,
  getFeesBreakDownLoading: false,
  feesBreakdownData: null,
  feesBreakdownStatus: '',
  feesBreakdownMessage: '',
  postProposalSubmitFileData: null,
  postProposalSubmitFileLoading: false,
  postProposalFinalSubmit: null,
  postProposalFinalLoading: false,
  postDownloadTemplateLoading: false,
  downloadTemplateData: null,
  downloadTemplateStatus: '',
  downloadTemplateMessage: '',
  getDownloadPreTempLoading: false,
  downloadPreTempData: null,
  downloadPreTempStatus: '',
  downloadPreTempMessage: '',
  getUploadedFileLoading: false,
  uploadedFileData: null,
  uploadedFileStatus: '',
  uploadedFileMessage: '',
  postDeleteDocsData: null,
  postDeleteDocsLoading: false,
  postDeleteDocsStatus: '',
  postDeleteDocsMessage: '',
}

const ProposalReducer = (state = initState, { type, response, action }) => {
  switch (type) {
    case constant.GET_PROPOSAL_DETAILS_INIT:
    case constant.GET_SUBMIT_INS_UPLOAD_DOCS_DETAILS_INIT:
    case constant.PUT_SUBMIT_INS_UPLOAD_DOCS_DETAILS_INIT:
    case constant.GET_PROPOSAL_DETAILS_SUCCESS:
      return {
        ...state,
        getProposalLoading: false,
        getProposalDetails: response
      }
    case constant.GET_SUBMIT_INS_UPLOAD_DOCS_DETAILS_SUCCESS:
      return {
        ...state,
        getProposalLoading: false,
        getSubmitDetails: response
      }
    case constant.POST_PROPOSAL_DETAILS_INIT:
      return {
        ...state,
        postProposalLoading: true
      }
    case constant.POST_PROPOSAL_DETAILS_SUCCESS:
      return {
        ...state,
        postProposalDetails: response?.data,
        postProposalmessage: response?.message,
        postProposalstatus: response?.status
      }
    case constant.PUT_SUBMIT_INS_UPLOAD_DOCS_DETAILS_SUCCESS:
      return {
        ...state,
        getProposalLoading: false,
        putSubmitDetails: response?.data
      }
    case constant.POST_PROPOSAL_FILE_UPLOAD_SUCCESS:
      return {
        ...state,
        getFileUploadLoading: false,
        postProposalFileUploadData: response
      }
    case constant.GET_PROPOSAL_DETAILS_CLEAR:
      return {
        ...state,
        getProposalLoading: false,
        getProposalDetails: ''
      }
    case constant.GET_SUBMIT_INS_UPLOAD_DOCS_DETAILS_CLEAR:
      return {
        ...state,
        getProposalLoading: false,
        getSubmitDetails: ''
      }
    case constant.POST_PROPOSAL_DETAILS_CLEAR:
      return {
        ...state,
        postProposalDetails: null,
        postProposalLoading: false,
        postProposalmessage: '',
        postProposalstatus: ''
      }
    case constant.PUT_SUBMIT_INS_UPLOAD_DOCS_DETAILS_CLEAR:
      return {
        ...state,
        getProposalLoading: false,
        putSubmitDetails: ''
      }
    case constant.POST_PROPOSAL_FILE_UPLOAD_CLEAR:
      return {
        ...state,
        getFileUploadLoading: false,
        postProposalFileUploadData: ''
      }
    case constant.GET_PROPOSAL_DETAILS_FAILED:
      return {
        ...state,
        getProposalLoading: false,
        getProposalDetails: response
      }
    case constant.GET_SUBMIT_INS_UPLOAD_DOCS_DETAILS_FAILED:
      return {
        ...state,
        getSubmitLoading: false,
        getSubmitDetails: response
      }
    case constant.POST_PROPOSAL_DETAILS_FAILED:
      return {
        ...state,
        postProposalLoading: false,
        postProposalDetails: response
      }
    case constant.PUT_SUBMIT_INS_UPLOAD_DOCS_DETAILS_FAILED:
      return {
        ...state,
        puSubmitLoading: false,
        putSubmitDetails: response
      }
    // 1 ST
    case constant.POST_PROPOSAL_FILE_UPLOAD_INIT:
      return {
        ...state,
        postProposalFileUploadLoading: true
      }
    case constant.POST_PROPOSAL_FILE_UPLOAD_SUCCESS:
      return {
        ...state,
        postProposalFileUploadLoading: false,
        postProposalFileUploadData: response.data
      }
    case constant.POST_PROPOSAL_FILE_UPLOAD_FAILED:
      return {
        ...state,
        postProposalFileUploadLoading: false,
        postProposalFileUploadData: response
      }
    case constant.POST_PROPOSAL_FILE_UPLOAD_CLEAR:
      return {
        ...state,
        postProposalFileUploadData: null,
        postProposalFileUploadLoading: false
      }

    // 2nd
    case constant.POST_PROPOSAL_FILE_SUBMIT_INIT:
      return {
        ...state,
        postProposalSubmitFileLoading: true
      }
    case constant.POST_PROPOSAL_FILE_SUBMIT_SUCCESS:
      return {
        ...state,
        postProposalSubmitFileLoading: false,
        postProposalSubmitFileData: response
      }
    case constant.POST_PROPOSAL_FILE_SUBMIT_FAILED:
      return {
        ...state,
        postProposalSubmitFileLoading: false,
        postProposalSubmitFileData: response
      }
    case constant.POST_PROPOSAL_FILE_SUBMIT_CLEAR:
      return {
        ...state,
        postProposalSubmitFileData: null,
        postProposalSubmitFileLoading: false
      }
    // 3rd
    case constant.POST_PROPOSAL_FINAL_SUBMIT_INIT:
      return {
        ...state,
        postProposalFinalLoading: true
      }
    case constant.POST_PROPOSAL_FINAL_SUBMIT_SUCCESS:
      return {
        ...state,
        postProposalFinalLoading: false,
        postProposalFinalSubmit: response
      }
    case constant.POST_PROPOSAL_FINAL_SUBMIT_FAILED:
      return {
        ...state,
        postProposalFinalLoading: false,
        postProposalFinalSubmit: response
      }
    case constant.POST_PROPOSAL_FINAL_SUBMIT_CLEAR:
      return {
        ...state,
        postProposalFinalSubmit: null,
        postProposalFinalLoading: false
      }

    case constant.GET_FEES_BREAKDOWN_DATA:
      return {
        ...state,
        getFeesBreakDownLoading: true
      }
    case constant.GET_FEES_BREAKDOWN_SUCCESS:
      return {
        ...state,
        getFeesBreakDownLoading: false,
        feesBreakdownData: response.data,
        feesBreakdownStatus: action.status,
        feesBreakdownMessage: action.message
      }
    case constant.GET_FEES_BREAKDOWN_FAILURE:
      return {
        ...state,
        getFeesBreakDownLoading: false,
        feesBreakdownStatus: action.status,
        feesBreakdownMessage: action.message
      }
    case constant.GET_FEES_BREAKDOWN_CLEAR:
      return {
        ...state,
        feesBreakdownData: '',
        feesBreakdownStatus: '',
        feesBreakdownMessage: ''
      }
    case constant.POST_DOWNLOAD_TEMPLATE_DATA:
      return {
        ...state,
        postDownloadTemplateLoading: true
      }
    case constant.POST_DOWNLOAD_TEMPLATE_SUCCESS:
      return {
        ...state,
        postDownloadTemplateLoading: false,
        downloadTemplateData: response.data,
        downloadTemplateStatus: response.status,
        downloadTemplateMessage: response.message
      }
    case constant.POST_DOWNLOAD_TEMPLATE_FAILURE:
      return {
        ...state,
        postDownloadTemplateLoading: false,
        downloadTemplateStatus: response.status,
        downloadTemplateMessage: response.message
      }
    case constant.POST_DOWNLOAD_TEMPLATE_CLEAR:
      return {
        ...state,
        downloadTemplateData: '',
        downloadTemplateStatus: '',
        downloadTemplateMessage: ''
      }
    case constant.GET_DOWNLOAD_PRE_TEMP_DATA:
      return {
        ...state,
        getDownloadPreTempLoading: true
      }
    case constant.GET_DOWNLOAD_PRE_TEMP_SUCCESS:
      return {
        ...state,
        getDownloadPreTempLoading: false,
        downloadPreTempData: response.data,
        downloadPreTempStatus: response.status,
        downloadPreTempMessage: response.message
      }
    case constant.GET_DOWNLOAD_PRE_TEMP_FAILURE:
      return {
        ...state,
        getDownloadPreTempLoading: false,
        downloadPreTempStatus: response.status,
        downloadPreTempMessage: response.message
      }
    case constant.GET_DOWNLOAD_PRE_TEMP_CLEAR:
      return {
        ...state,
        downloadPreTempData: '',
        downloadPreTempStatus: '',
        downloadPreTempMessage: ''
      }
    case constant.GET_UPLOADED_FILE_DATA:
      return {
        ...state,
        getUploadedFileLoading: true
      }
    case constant.GET_UPLOADED_FILE_SUCCESS:
      return {
        ...state,
        getUploadedFileLoading: false,
        uploadedFileData: response.data,
        uploadedFileStatus: response.status,
        uploadedFileMessage: response.message
      }
    case constant.GET_UPLOADED_FILE_FAILED:
      return {
        ...state,
        getUploadedFileLoading: false,
        uploadedFileStatus: response.status,
        uploadedFileMessage: action.message
      }
    case constant.GET_UPLOADED_FILE_CLEAR:
      return {
        ...state,
        uploadedFileData: '',
        uploadedFileStatus: '',
        uploadedFileMessage: ''
      }
      case constant.POST_DELETE_DOCS_DATA:
        return {
          ...state,
          postDeleteDocsLoading: true
        }
      case constant.POST_DELETE_DOCS_SUCCESS:
        return {
          ...state,
          postDeleteDocsLoading: false,
         postDeleteDocsData: response.data,
         postDeleteDocsStatus: response.status,
         postDeleteDocsMessage: response.message
        }
      case constant.POST_DELETE_DOCS_FAILED:
        return {
          ...state,
          postDeleteDocsLoading: false,
         postDeleteDocsStatus: response.status,
         postDeleteDocsMessage: action.message
        }
      case constant.POST_DELETE_DOCS_CLEAR:
        return {
          ...state,
         postDeleteDocsData: '',
         postDeleteDocsStatus: '',
         postDeleteDocsMessage: ''
        }
    default:
      return state
  }
}
export default ProposalReducer

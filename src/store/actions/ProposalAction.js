import * as Constant from '../../store/constants/ProposalConstants'
export const ProposalAction = {
  GetProposalDetailsAction: () => ({
    type: Constant.GET_PROPOSAL_DETAILS_INIT
  }),
  GetSubmitDetailsAction: () => ({
    type: Constant.GET_SUBMIT_INS_UPLOAD_DOCS_DETAILS_INIT
  }),
  PostProposalDetailsAction: formData => ({
    type: Constant.POST_PROPOSAL_DETAILS_INIT,
    formData
  }),
  ClearProposalDetailsAction: () => ({
    type: Constant.POST_PROPOSAL_DETAILS_CLEAR
  }),
  PutSubmitDetailsAction: (formData) => ({
    type: Constant.PUT_SUBMIT_INS_UPLOAD_DOCS_DETAILS_INIT,
    formData
  }),
  // 1st
  PostProposalFileUploadAction: (formData) => ({
    type: Constant.POST_PROPOSAL_FILE_UPLOAD_INIT,
    formData
  }),
  clearProposalFileUploadAction: () => ({
    type: Constant.POST_PROPOSAL_FILE_UPLOAD_CLEAR
  }),
  // 2nd
  PostProposalSubmitFileAction: formData => ({
    type: Constant.POST_PROPOSAL_FILE_SUBMIT_INIT,
    formData
  }),
  clearProposalSubmitFileAction: () => ({
    type: Constant.POST_PROPOSAL_FILE_SUBMIT_CLEAR
  }),
  // 3rd
  PostProposalFinalSubmitAction: (formData) => ({
    type: Constant.POST_PROPOSAL_FINAL_SUBMIT_INIT,
    formData
  }),
  clearProposalFinalSubmitAction: () => ({
    type: Constant.POST_PROPOSAL_FINAL_SUBMIT_CLEAR
  }),
  getFeeBreakdownRequest: () => ({
    type: Constant.GET_FEES_BREAKDOWN_DATA
  }),
  postDownloadTemplateRequest: (formData) => ({
    type: Constant.POST_DOWNLOAD_TEMPLATE_DATA,
    formData
  }),
  ClearDownloadTemplateRequest: () => ({
    type: Constant.POST_DOWNLOAD_TEMPLATE_CLEAR
  }),
  getDownloadPreTempRequest: (params) => ({
    type: Constant.GET_DOWNLOAD_PRE_TEMP_DATA,
    params
  }),
  ClearDownloadPreTempRequest: () => ({
    type: Constant.GET_DOWNLOAD_PRE_TEMP_CLEAR
  }),
  getUploadedFileRequest: (params) => ({
    type: Constant.GET_UPLOADED_FILE_DATA,
    params
  }),
  getUploadedFileClear: () => ({
    type: Constant.GET_UPLOADED_FILE_CLEAR
  }),
  postDeleteDocsRequest: (formData) => ({
    type: Constant.POST_DELETE_DOCS_DATA,
    formData
  }),
  ClearDeleteDocsRequest: () => ({
    type: Constant.POST_DELETE_DOCS_CLEAR
  }),
}

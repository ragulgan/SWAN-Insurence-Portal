import AxiosIn from '../../helpers/AxiosInterceptor'
import endpoints from '../services/endpoints'
import { takeLatest, put } from 'redux-saga/effects'
import * as Constant from '../../store/constants/ProposalConstants'
import * as CustomConstants from '../../store/constants/CustomConstants'

export function * GetProposalDetailsSaga () {
  try {
    const response = yield AxiosIn.get(endpoints.GetMotorQuotation)
    yield put({ type: Constant.GET_PROPOSAL_DETAILS_SUCCESS, response })
  } catch (error) {
    const error_data = {
      status: 'error',
      message: CustomConstants.SOMETHING_WRONG
    }
    yield put({ type: Constant.GET_PROPOSAL_DETAILS_FAILED, response: error_data })
  }
}
export function * GetSubmitDetailsSaga () {
  try {
    const response = yield AxiosIn.get(endpoints.GetMotorQuotation)
    yield put({
      type: Constant.GET_SUBMIT_INS_UPLOAD_DOCS_DETAILS_SUCCESS,
      response
    })
  } catch (error) {
    const error_data = {
      status: 'error',
      message: CustomConstants.SOMETHING_WRONG
    }
    yield put({
      type: Constant.GET_SUBMIT_INS_UPLOAD_DOCS_DETAILS_FAILED,
      response: error_data
    })
  }
}
export function * PostProposalDetailsSaga ({ formData }) {
  try {
    const response = yield AxiosIn.post(endpoints.PostProposal, formData)

    yield put({ type: Constant.POST_PROPOSAL_DETAILS_SUCCESS, response })
  } catch (error) {
    const error_data = {
      status: 'error',
      message: CustomConstants.SOMETHING_WRONG
    }
    yield put({ type: Constant.POST_PROPOSAL_DETAILS_FAILED, response: error_data })
  }
}

export function * PostProposalFileUploadSaga ({ formData }) {
  try {
    const headers = {
      'Content-Type': 'application/json; charset=utf-8'
    }
    const response = yield AxiosIn.post(endpoints.FileUpload, formData)
    yield put({ type: Constant.POST_PROPOSAL_FILE_UPLOAD_SUCCESS, response })
  } catch (error) {
    const error_data = {
      status: 'error',
      message: CustomConstants.SOMETHING_WRONG
    }
    yield put({ type: Constant.POST_PROPOSAL_FILE_UPLOAD_FAILED, response: error_data })
  }
}

export function * PostProposalFileSubmit ({ formData }) {
  try {
    const response = yield AxiosIn.post(endpoints.SubmitFile, formData)
    yield put({ type: Constant.POST_PROPOSAL_FILE_SUBMIT_SUCCESS, response })
  } catch (error) {
    const error_data = {
      status: 'error',
      message: CustomConstants.SOMETHING_WRONG
    }
    yield put({ type: Constant.POST_PROPOSAL_FILE_SUBMIT_FAILED, response: error_data })
  }
}

export function * PostProposalFinalSaga ({ formData }) {
  try {
    const response = yield AxiosIn.post(endpoints.FinalSubmit, formData)
    yield put({
      type: Constant.POST_PROPOSAL_FINAL_SUBMIT_SUCCESS,
      response
    })
  } catch (error) {
    const error_data = {
      status: 'error',
      message: CustomConstants.SOMETHING_WRONG
    }
    yield put({
      type: Constant.POST_PROPOSAL_FINAL_SUBMIT_FAILED,
      response: error_data
    })
  }
}

export function * DownloadTemplateSaga ({ formData }) {
  try {
    const response = yield AxiosIn.post(endpoints.GetDownloadTemplate, formData)
    yield put({ type: Constant.POST_DOWNLOAD_TEMPLATE_SUCCESS, response })
  } catch (error) {
    const error_data = {
      status: 'error',
      message: CustomConstants.SOMETHING_WRONG
    }
    yield put({ type: Constant.POST_DOWNLOAD_TEMPLATE_FAILURE, error_data })
  }
}

export function * DownloadPreTempSaga (params) {
  try {
    const response = yield AxiosIn.get(endpoints.GetDownloadPreTemp, params)
    yield put({ type: Constant.GET_DOWNLOAD_PRE_TEMP_SUCCESS, response })
  } catch (error) {
    const error_data = {
      status: 'error',
      message: CustomConstants.SOMETHING_WRONG
    }
    yield put({ type: Constant.GET_DOWNLOAD_PRE_TEMP_FAILURE, error_data })
  }
}

export function * FeesBreakDownSaga () {
  try {
    const response = yield AxiosIn.get(endpoints.FeesBreakDown)
    yield put({ type: Constant.GET_FEES_BREAKDOWN_SUCCESS, response })
  } catch (error) {
    const data = { status: 'error', message: CustomConstants.SOMETHING_WRONG }
    yield put({ type: Constant.GET_FEES_BREAKDOWN_FAILURE, data })
  }
}

export function * UploadedFileDropdownSaga (params) {
  try {
    const response = yield AxiosIn.get(endpoints.UploadedFile, params)
    yield put({ type: Constant.GET_UPLOADED_FILE_SUCCESS, response })
  } catch (error) {
    const data = { status: 'error', message: CustomConstants.SOMETHING_WRONG }
    yield put({ type: Constant.GET_UPLOADED_FILE_FAILED, data })
  }
}

export function * DeleteDocsSaga ({ formData }) {
  try {
    const response = yield AxiosIn.post(endpoints.DeleteDocs, formData)
    yield put({ type: Constant.POST_DELETE_DOCS_SUCCESS, response })
  } catch (error) {
    const error_data = {
      status: 'error',
      message: CustomConstants.SOMETHING_WRONG
    }
    yield put({ type: Constant.POST_DELETE_DOCS_FAILED, error_data })
  }
}

export default function * ProposalSaga () {
  yield takeLatest(Constant.GET_PROPOSAL_DETAILS_INIT, GetProposalDetailsSaga)
  yield takeLatest(
    Constant.GET_SUBMIT_INS_UPLOAD_DOCS_DETAILS_INIT,
    GetSubmitDetailsSaga
  )
  yield takeLatest(
    Constant.POST_PROPOSAL_DETAILS_INIT,
    PostProposalDetailsSaga
  )
  yield takeLatest(
    Constant.PUT_SUBMIT_INS_UPLOAD_DOCS_DETAILS_INIT,
    PostProposalFinalSaga
  )
  yield takeLatest(
    Constant.POST_PROPOSAL_FILE_UPLOAD_INIT,
    PostProposalFileUploadSaga
  )
  yield takeLatest(
    Constant.POST_PROPOSAL_FILE_SUBMIT_INIT,
    PostProposalFileSubmit
  )
  yield takeLatest(
    Constant.POST_PROPOSAL_FINAL_SUBMIT_INIT,
    PostProposalFinalSaga
  )
  yield takeLatest(Constant.GET_FEES_BREAKDOWN_DATA, FeesBreakDownSaga)
  yield takeLatest(Constant.POST_DOWNLOAD_TEMPLATE_DATA, DownloadTemplateSaga)
  yield takeLatest(Constant.GET_DOWNLOAD_PRE_TEMP_DATA, DownloadPreTempSaga)
  yield takeLatest(Constant.GET_UPLOADED_FILE_DATA, UploadedFileDropdownSaga)
  yield takeLatest(Constant.POST_DELETE_DOCS_DATA, DeleteDocsSaga)
}

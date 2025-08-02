
import env from '../../helpers/env_config'
const { API_BASE_URL } = env

const API_URL = API_BASE_URL
const MOTOR_API_URL = `${API_BASE_URL}/motor`
const TRAVEL_API_URL = `${API_BASE_URL}/travel`

const endpoints = {
  auth: `${API_URL}/auth`,
  staff: `${API_URL}/Staff`,
  profile: `${API_URL}/users`,
  // master
  Title: `${API_URL}/master/swntitle`,
  RodentDamge: `${API_URL}/master/swnrodentdamage`,
  CoverType: `${API_URL}/master/swncovertype`,
  ReqDocs: `${API_URL}/master/swnrequireddocs`,
  PolicyType: `${API_URL}/master/swnpolicytype`,
  VoluntaryXS: `${API_URL}/master/swnvoluntaryxs`,
  VehicleType: `${API_URL}/master/swnvehicletype`,
  VehicleKeptIn: `${API_URL}/master/swnvehiclekept`,
  Occupation: `${API_URL}/master/swnoccupation`,
  PurchaseType: `${API_URL}/master/swnpurchasetype`,
  VoluntaryXS: `${API_URL}/master/swnvoluntaryxs`,
  VehicleType: `${API_URL}/master/swnvehicletype`,
  VehicleKeptIn: `${API_URL}/master/swnvehiclekept`,
  PolicyType: `${API_URL}/master/swnpolicytype`,
  Make: `${API_URL}/master/swncarmakes`,
  Model: `${API_URL}/master/swncarmodels`,
  SubModel: `${API_URL}/master/swnsubmodels`,
  NoOfSeats: `${API_URL}/master/swnnoofseats`,
  VehicleMatrix: `${API_URL}/master/swnvehiclematrix`,
  CountryOfOrigin: `${API_URL}/master/country`,
  LimitDays: `${API_URL}/master/swnlimitdaysamount`,
  Compensation: `${API_URL}/master/swncompensation`,
  AicCover: `${API_URL}/master/swnaiccover`,
  MotorMatrix: `${API_URL}/master/swnmotormatrix`,
  GetTotalClaim: `${API_URL}/master/swnpreviousinsurers`,
  GetSwnLeasing: `${API_URL}/master/swnleasing`,
  ProvisionalQuote: `${API_URL}/master/swngeneralconfigs`,
  PaymentMethod: `${API_URL}/master/swmpaymentmethod`,
  PolicyMethod: `${API_URL}/master/swnpolicydelivery`,
  XSOption: `${API_URL}/master/swncompulsoryexcess`,
  MotorPlan: `${API_URL}/master/swnmotplan`,
  ReasonCancel: `${API_URL}/master/swnreasonrenewal`,
  PostAML: `${API_URL}/master/aml`,
  AmlValid: `${API_URL}/master/aml`,
  GetSwnSmoothRates: `${API_URL}/master/swnsmoothrates`,
  // motor
  PostMotorQuotation: `${MOTOR_API_URL}/personaldetails`,
  PutMotorQuotation: `${MOTOR_API_URL}/vehicledetails`,
  PostExtensionQuotation: `${MOTOR_API_URL}/extensions`,
  PostProposal: `${MOTOR_API_URL}/proposals`,
  FinalSubmit: `${MOTOR_API_URL}/submit`,
  SubmitFile: `${MOTOR_API_URL}/submitfile`,
  PostApprovalStatus: `${MOTOR_API_URL}/autoapproval`,
  GetDownloadQuote: `${MOTOR_API_URL}/pdfquotes`,
  clientKeyword: `${API_URL}/client/keyword`,
  GetMotorQuotation: `${MOTOR_API_URL}/quotes`,
  GetMotorQuoteList: `${MOTOR_API_URL}/quoteslist`,
  PostCancelQuote: `${MOTOR_API_URL}/cancelquote`,
  FileUpload: `${MOTOR_API_URL}/upload`,
  GetDownloadTemplate: `${MOTOR_API_URL}/templates`,
  PostSendQuote: `${MOTOR_API_URL}/sendemail`,
  GetDownloadPreTemp: `${MOTOR_API_URL}/templatepdf`,
  // client
  postClient: `${API_URL}/client`,
  clientBYId: `${API_URL}/client/clientid?id=A30000`,
  // travel
  PostTPersonalQuotation: `${TRAVEL_API_URL}/personalinfo`,
  PostTravelInfo: `${TRAVEL_API_URL}/traveller`,
  GetTravelCountry: `${TRAVEL_API_URL}/country`
  // GetTravelMotorQuotation: `${API_URL}/travel/country`,
}

export default endpoints

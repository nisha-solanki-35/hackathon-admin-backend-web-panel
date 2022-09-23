import { commonReducer } from 'src/helper/helper'
import { CLEAR_VENDOR_MESSAGE, CREATE_VENDOR, DELETE_VENDOR, UPDATE_VENDOR, VENDOR_DETAILS, VENDOR_LIST } from '../constants'

export default (state = { }, action = {}) => {
  switch (action.type) {
    case CREATE_VENDOR:
      return commonReducer(state, action)
    case VENDOR_LIST:
      return {
        ...state,
        vendorList: action.payload.data,
        resStatus: action.payload.resStatus,
        resMessage: action.payload.resMessage
      }
    case VENDOR_DETAILS:
      return {
        ...state,
        vendorDetails: action.payload.data,
        resStatus: action.payload.resStatus,
        resMessage: action.payload.resMessage
      }
    case UPDATE_VENDOR:
      return commonReducer(state, action)
    case DELETE_VENDOR:
      return {
        ...state,
        resStatus: action.payload.resStatus,
        resMessage: action.payload.resMessage
      }
    case CLEAR_VENDOR_MESSAGE:
      return {
        resMessage: ''
      }
    default:
      return state
  }
}

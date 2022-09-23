import { commonReducer } from 'src/helper/helper'
import { CLEAR_SUBADMIN_MESSAGE, CREATE_SUBADMIN, DELETE_SUBADMIN, SUBADMIN_DETAILS, SUBADMIN_LIST, UPDATE_SUBADMIN } from '../constants'

export default (state = { }, action = {}) => {
  switch (action.type) {
    case CREATE_SUBADMIN:
      return commonReducer(state, action)
    case SUBADMIN_LIST:
      return {
        ...state,
        subadminList: action.payload.data,
        resStatus: action.payload.resStatus,
        resMessage: action.payload.resMessage
      }
    case SUBADMIN_DETAILS:
      return {
        ...state,
        subadminDetails: action.payload.data,
        resStatus: action.payload.resStatus,
        resMessage: action.payload.resMessage
      }
    case UPDATE_SUBADMIN:
      return commonReducer(state, action)
    case DELETE_SUBADMIN:
      return {
        ...state,
        resStatus: action.payload.resStatus,
        resMessage: action.payload.resMessage
      }
    case CLEAR_SUBADMIN_MESSAGE:
      return {
        resMessage: ''
      }
    default:
      return state
  }
}

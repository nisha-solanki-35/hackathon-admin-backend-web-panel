import { commonReducer } from 'src/helper/helper'
import { ADVERTISEMENT_DETAILS, ADVERTISEMENT_LIST, CLEAR_ADVERTISEMENT_MESSAGE, CREATE_ADVERTISEMENT, DELETE_ADVERTISEMENT, UPDATE_ADVERTISEMENT } from '../constants'

export default (state = { }, action = {}) => {
  switch (action.type) {
    case CREATE_ADVERTISEMENT:
      return commonReducer(state, action)
    case ADVERTISEMENT_LIST:
      return {
        ...state,
        advertisementList: action.payload.data,
        resStatus: action.payload.resStatus,
        resMessage: action.payload.resMessage
      }
    case ADVERTISEMENT_DETAILS:
      return {
        ...state,
        advertisementDetails: action.payload.data,
        resStatus: action.payload.resStatus,
        resMessage: action.payload.resMessage
      }
    case UPDATE_ADVERTISEMENT:
      return commonReducer(state, action)
    case DELETE_ADVERTISEMENT:
      return {
        ...state,
        resStatus: action.payload.resStatus,
        resMessage: action.payload.resMessage
      }
    case CLEAR_ADVERTISEMENT_MESSAGE:
      return {
        resMessage: ''
      }
    default:
      return state
  }
}

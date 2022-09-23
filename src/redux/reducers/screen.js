import { commonReducer } from 'src/helper/helper'
import { CLEAR_SCREEN_MESSAGE, CREATE_SCREEN, DELETE_SCREEN, SCREEN_DETAILS, SCREEN_LIST, UPDATE_SCREEN } from '../constants'

export default (state = { }, action = {}) => {
  switch (action.type) {
    case CREATE_SCREEN:
      return commonReducer(state, action)
    case SCREEN_LIST:
      return {
        ...state,
        screenList: action.payload.data,
        resStatus: action.payload.resStatus,
        resMessage: action.payload.resMessage
      }
    case SCREEN_DETAILS:
      return {
        ...state,
        screenDetails: action.payload.data,
        resStatus: action.payload.resStatus,
        resMessage: action.payload.resMessage
      }
    case UPDATE_SCREEN:
      return commonReducer(state, action)
    case DELETE_SCREEN:
      return {
        ...state,
        resStatus: action.payload.resStatus,
        resMessage: action.payload.resMessage
      }
    case CLEAR_SCREEN_MESSAGE:
      return {
        resMessage: ''
      }
    default:
      return state
  }
}

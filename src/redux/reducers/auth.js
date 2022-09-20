import { LOGIN } from '../constants'

export default (state = {}, action = {}) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        adminData: action.payload.data,
        adminPermission: action.payload.permission,
        token: action.payload.token,
        resStatus: action.payload.resStatus,
        resMessage: action.payload.resMessage
      }
    default:
      return state
  }
}

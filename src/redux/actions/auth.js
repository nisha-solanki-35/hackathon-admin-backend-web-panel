import axios from '../baseURL'
import { encryption } from '../../helper/helper'
import { CLEAR_AUTH_RESPONSE, LOGIN } from '../constants'

const errMsg = 'Server is unavailable.'

export const login = (data) => async (dispatch) => {
  dispatch({ type: CLEAR_AUTH_RESPONSE })
  console.log('data?.email, data?.password', data?.email, data?.password)
  const Password = encryption(data?.password)
  await axios.post('/auth/login/v1', {
    sLogin: data?.email,
    sPassword: Password
  }).then((response) => {
    const userData = response.data && response.data.data
    const obj = {}
    localStorage.setItem('Token', response.data.Authorization)
    localStorage.setItem('adminData', JSON.stringify(response.data.data))
    userData && userData.iRoleId && userData.iRoleId.aPermissions && userData.iRoleId.aPermissions.map(permission => {
      obj[permission.sKey] = permission.eType
      return obj
    })
    localStorage.setItem('adminPermission', JSON.stringify(obj))
    dispatch({
      type: LOGIN,
      payload: {
        token: response.data.Authorization,
        data: response.data.data,
        resStatus: true,
        resMessage: response.data.message
      }
    })
  }).catch((error) => {
    dispatch({
      type: LOGIN,
      payload: {
        resStatus: false,
        resMessage: error.response ? error.response.data.message : errMsg
      }
    })
  })
}

import axios from '../../API/baseURL'
import { encryption } from '../../helper/helper'
import { CLEAR_AUTH_PROPS, LOGOUT } from '../constants'

const errMsg = 'Server is unavailable.'

export const login = async (data) => {
  // dispatch({ type: CLEAR_AUTH_RESPONSE })
  console.log('data?.email, data?.password', data?.email, data?.password)
  const Password = encryption(data?.password)
  return await axios.post('/auth/login/v1', {
    sLogin: data?.email,
    sPassword: Password
  })
  // .then((response) => {
  //   const userData = response.data && response.data.data
  //   const obj = {}
  //   localStorage.setItem('token', response.data.Authorization)
  //   localStorage.setItem('adminData', JSON.stringify(response.data.data))
  //   userData && userData.iRoleId && userData.iRoleId.aPermissions && userData.iRoleId.aPermissions.map(permission => {
  //     obj[permission.sKey] = permission.eType
  //     return obj
  //   })
  //   localStorage.setItem('adminPermission', JSON.stringify(obj))
  //  response
  //   dispatch({
  //     type: LOGIN,
  //     payload: {
  //       token: response.data.Authorization,
  //       data: response.data.data,
  //       resStatus: true,
  //       resMessage: response.data.message
  //     }
  //   })
  // }).catch((error) => {
  //   return error?.data
  //   // dispatch({
  //   //   type: LOGIN,
  //   //   payload: {
  //   //     resStatus: false,
  //   //     resMessage: error.response ? error.response.data.message : errMsg
  //   //   }
  //   // })
  // })
}

export const logout = (token) => async (dispatch) => {
  await axios.put('/auth/logout/v1', {}, { headers: { Authorization: token } }).then(async (response) => {
    localStorage.removeItem('Token')
    localStorage.removeItem('adminData')
    localStorage.removeItem('adminPermission')
    dispatch({ type: CLEAR_AUTH_PROPS })
    dispatch({
      type: LOGOUT,
      payload: {
        resStatus: true,
        resMessage: response.data.message
      }
    })
  }).catch((error) => {
    dispatch({
      type: LOGOUT,
      payload: {
        resStatus: false,
        resMessage: error.response ? error.response.data.message : errMsg
      }
    })
  })
}

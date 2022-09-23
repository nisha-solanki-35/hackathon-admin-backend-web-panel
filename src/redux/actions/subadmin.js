import { catchForList, catchFunc, encryption, getListData, successFunc } from 'src/helper/helper'
import axios from '../../API/baseURL'
import { CLEAR_SUBADMIN_MESSAGE, CREATE_SUBADMIN, DELETE_SUBADMIN, SUBADMIN_DETAILS, SUBADMIN_LIST, UPDATE_SUBADMIN } from '../constants'
const errMsg = 'Server is unavailable'

export const getSubadminList = (advertisementListArgs) => async (dispatch) => {
  const { start, limit, sort, order, search, promoType, dateFrom, dateTo, token } = advertisementListArgs
  await axios.get(`/subadmin/list/v1?start=${start}&limit=${limit}&sort=${sort}&order=${order}&search=${search}&eType=${promoType}&datefrom=${dateFrom}&dateto=${dateTo}`, { headers: { Authorization: token } }).then((response) => {
    dispatch(getListData(SUBADMIN_LIST, response))
  }).catch((error) => {
    dispatch(catchForList(SUBADMIN_LIST, error))
  })
}

export const getSubadminDetails = (Id, token) => async (dispatch) => {
  await axios.get(`/sub-admin/${Id}/v1`, { headers: { Authorization: token } }).then((response) => {
    dispatch({
      type: SUBADMIN_DETAILS,
      payload: {
        data: response.data.data,
        resStatus: true
      }
    })
  }).catch(() => {
    dispatch({
      type: SUBADMIN_DETAILS,
      payload: {
        data: [],
        resStatus: false
      }
    })
  })
}

export const addSubadmin = (addSubAdminData) => async (dispatch) => {
  dispatch({ type: CLEAR_SUBADMIN_MESSAGE })
  const { fullname, username, email, MobNum, password, aRole, subAdminStatus, token } = addSubAdminData
  const encryptPassword = encryption(password)
  await axios.post('/auth/sub-admin/v1', {
    sName: fullname,
    sUsername: username,
    sEmail: email,
    sMobNum: MobNum,
    sPassword: encryptPassword,
    aRole,
    eStatus: subAdminStatus
  }, { headers: { Authorization: token } }).then((response) => {
    dispatch({
      type: CREATE_SUBADMIN,
      payload: {
        resStatus: true,
        resMessage: response.data.message
      }
    })
  }).catch((error) => {
    dispatch({
      type: CREATE_SUBADMIN,
      payload: {
        data: {},
        resStatus: false,
        resMessage: error.response ? error.response.data.message : errMsg
      }
    })
  })
}

export const updateSubadmin = (updateSubAdminData) => async (dispatch) => {
  const { fullname, username, email, password, MobNum, aRole, subAdminStatus, ID, token } = updateSubAdminData
  dispatch({ type: CLEAR_SUBADMIN_MESSAGE })
  const encryptPassword = encryption(password)
  await axios.put(`/sub-admin/${ID}/v1`, {
    sName: fullname,
    sUsername: username,
    sEmail: email,
    sMobNum: MobNum,
    aRole,
    eStatus: subAdminStatus,
    sPassword: password ? encryptPassword : ''
  }, { headers: { Authorization: token } }).then((response) => {
    dispatch({
      type: UPDATE_SUBADMIN,
      payload: {
        resStatus: true,
        resMessage: response.data.message
      }
    })
  }).catch((error) => {
    dispatch({
      type: UPDATE_SUBADMIN,
      payload: {
        data: {},
        resStatus: false,
        resMessage: error.response ? error.response.data.message : errMsg
      }
    })
  })
}

export const deleteSubadmin = (Id, token) => async (dispatch) => {
  dispatch({ type: CLEAR_SUBADMIN_MESSAGE })
  await axios.delete(`/subadmin/${Id}/v1`, { headers: { Authorization: token } }).then((response) => {
    dispatch(successFunc(DELETE_SUBADMIN, response))
  }).catch((error) => {
    dispatch(catchFunc(DELETE_SUBADMIN, error))
  })
}

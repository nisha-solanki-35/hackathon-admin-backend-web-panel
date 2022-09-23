import { catchForList, catchFunc, encryption, getListData, successFunc } from 'src/helper/helper'
import axios from '../../API/baseURL'
import { CLEAR_VENDOR_MESSAGE, CREATE_VENDOR, DELETE_VENDOR, UPDATE_VENDOR, VENDOR_LIST } from '../constants'

export const getSubadminList = (advertisementListArgs) => async (dispatch) => {
  const { start, limit, sort, order, search, promoType, dateFrom, dateTo, token } = advertisementListArgs
  await axios.get(`/vendor/list/v1?start=${start}&limit=${limit}&sort=${sort}&order=${order}&search=${search}&eType=${promoType}&datefrom=${dateFrom}&dateto=${dateTo}`, { headers: { Authorization: token } }).then((response) => {
    dispatch(getListData(VENDOR_LIST, response))
  }).catch((error) => {
    dispatch(catchForList(VENDOR_LIST, error))
  })
}

export const getSubadminDetails = (Id, token) => async (dispatch) => {
  await axios.get(`/vendor/${Id}/v1`, { headers: { Authorization: token } }).then((response) => {
    dispatch({
      type: VENDOR_LIST,
      payload: {
        data: response.data.data,
        resStatus: true
      }
    })
  }).catch(() => {
    dispatch({
      type: VENDOR_LIST,
      payload: {
        data: [],
        resStatus: false
      }
    })
  })
}

export const addSubadmin = (addSubAdminData) => async (dispatch) => {
  dispatch({ type: CLEAR_VENDOR_MESSAGE })
  const { fullname, username, email, MobNum, password, aRole, subAdminStatus, token } = addSubAdminData
  await axios.post('/vendor/v1', {
    sName: fullname,
    sUsername: username,
    sEmail: email,
    sMobNum: MobNum,
    sPassword: password,
    aRole,
    eStatus: subAdminStatus
  }, { headers: { Authorization: token } }).then((response) => {
    dispatch(catchFunc(CREATE_VENDOR, response))
    dispatch(successFunc(CREATE_VENDOR, response))
  }).catch((error) => {
    dispatch(catchFunc(CREATE_VENDOR, error))
  })
}

export const updateSubadmin = (updateSubAdminData) => async (dispatch) => {
  const { fullname, username, email, password, MobNum, aRole, subAdminStatus, ID, token } = updateSubAdminData
  dispatch({ type: CLEAR_VENDOR_MESSAGE })
  const encryptPassword = encryption(password)
  await axios.put(`/vendor/${ID}/v1`, {
    sName: fullname,
    sUsername: username,
    sEmail: email,
    sMobNum: MobNum,
    aRole,
    eStatus: subAdminStatus,
    sPassword: password ? encryptPassword : ''
  }, { headers: { Authorization: token } }).then((response) => {
    dispatch(catchFunc(UPDATE_VENDOR, response))
  }).catch((error) => {
    dispatch(catchFunc(UPDATE_VENDOR, error))
  })
}

export const deleteSubadmin = (Id, token) => async (dispatch) => {
  dispatch({ type: CLEAR_VENDOR_MESSAGE })
  await axios.delete(`/vendor/${Id}/v1`, { headers: { Authorization: token } }).then((response) => {
    dispatch(successFunc(DELETE_VENDOR, response))
  }).catch((error) => {
    dispatch(catchFunc(DELETE_VENDOR, error))
  })
}

import { catchForList, catchFunc, getListData, successFunc } from 'src/helper/helper'
import axios from '../../API/baseURL'
import { CLEAR_SCREEN_MESSAGE, CREATE_SCREEN, DELETE_SCREEN, SCREEN_DETAILS, SCREEN_LIST, UPDATE_SCREEN } from '../constants'

export const getScreenList = (advertisementListArgs) => async (dispatch) => {
  const { start, limit, sort, order, search, promoType, dateFrom, dateTo, token } = advertisementListArgs
  await axios.get(`/promocode/list/v1?start=${start}&limit=${limit}&sort=${sort}&order=${order}&search=${search}&eType=${promoType}&datefrom=${dateFrom}&dateto=${dateTo}`, { headers: { Authorization: token } }).then((response) => {
    dispatch(getListData(SCREEN_LIST, response))
  }).catch((error) => {
    dispatch(catchForList(SCREEN_LIST, error))
  })
}

export const getScreenDetails = (Id, token) => async (dispatch) => {
  await axios.get(`/screen/${Id}/v1`, { headers: { Authorization: token } }).then((response) => {
    dispatch({
      type: SCREEN_DETAILS,
      payload: {
        data: response.data.data,
        resStatus: true
      }
    })
  }).catch(() => {
    dispatch({
      type: SCREEN_DETAILS,
      payload: {
        data: [],
        resStatus: false
      }
    })
  })
}

export const addScreen = (advertisementData) => async (dispatch) => {
  const { Title, Details, Description, Active, offerImage, token } = advertisementData
  dispatch({ type: CLEAR_SCREEN_MESSAGE })
  try {
    if (offerImage) {
      const response = await axios.post('/screen/pre-signed-url/v1', { sFileName: offerImage.file.name, sContentType: offerImage.file.type }, { headers: { Authorization: token } })
      const url = response.data.data.sUrl
      const sImage = response.data.data.sPath
      await axios.put(url, offerImage.file, { headers: { 'Content-Type': offerImage.file.type } })
      await axios.post('/screen/add/v1', {
        sTitle: Title, sDetail: Details, sDescription: Description, eStatus: Active, sImage
      }, { headers: { Authorization: token } }).then((response1) => {
        dispatch(successFunc(CREATE_SCREEN, response1))
      })
    } else {
      await axios.post('/screen/add/v1', {
        sTitle: Title, sDetail: Details, sDescription: Description, eStatus: Active, sImage: ''
      }, { headers: { Authorization: token } }).then((response2) => {
        dispatch(successFunc(CREATE_SCREEN, response2))
      })
    }
  } catch (error) {
    dispatch(catchFunc(CREATE_SCREEN, error))
  }
}

export const updateScreen = (updateOfferData, offerId, token) => async (dispatch) => {
  const { Title, Details, Description, Active, offerImage } = updateOfferData
  dispatch({ type: CLEAR_SCREEN_MESSAGE })
  try {
    if (offerImage && offerImage.file) {
      const response = await axios.post('/screen/pre-signed-url/v1', { sFileName: offerImage.file.name, sContentType: offerImage.file.type }, { headers: { Authorization: token } })
      const url = response.data.data.sUrl
      const sImage = response.data.data.sPath
      await axios.put(url, offerImage.file, { headers: { 'Content-Type': offerImage.file.type } })
      await axios.put(`/screen/${offerId}/v1`, {
        sTitle: Title, sDetail: Details, sDescription: Description, eStatus: Active, sImage
      }, { headers: { Authorization: token } }).then((response2) => {
        dispatch(successFunc(UPDATE_SCREEN, response2))
      })
    } else {
      await axios.put(`/screen/${offerId}/v1`, {
        sTitle: Title, sDetail: Details, sDescription: Description, eStatus: Active, sImage: offerImage
      }, { headers: { Authorization: token } }).then((response) => {
        dispatch(successFunc(UPDATE_SCREEN, response))
      })
    }
  } catch (error) {
    dispatch(catchFunc(UPDATE_SCREEN, error))
  }
}

export const deleteScreen = (Id, token) => async (dispatch) => {
  dispatch({ type: CLEAR_SCREEN_MESSAGE })
  await axios.delete(`/screen/${Id}/v1`, { headers: { Authorization: token } }).then((response) => {
    dispatch(successFunc(DELETE_SCREEN, response))
  }).catch((error) => {
    dispatch(catchFunc(DELETE_SCREEN, error))
  })
}

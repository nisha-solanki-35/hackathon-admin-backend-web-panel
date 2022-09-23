import { catchForList, catchFunc, getListData, successFunc } from 'src/helper/helper'
import axios from '../../API/baseURL'
import { ADVERTISEMENT_DETAILS, ADVERTISEMENT_LIST, CLEAR_ADVERTISEMENT_MESSAGE, CREATE_ADVERTISEMENT, DELETE_ADVERTISEMENT, UPDATE_ADVERTISEMENT } from '../constants'

export const getAdvertisementList = (advertisementListArgs) => async (dispatch) => {
  const { start, limit, sort, order, search, promoType, dateFrom, dateTo, token } = advertisementListArgs
  await axios.get(`/promocode/list/v1?start=${start}&limit=${limit}&sort=${sort}&order=${order}&search=${search}&eType=${promoType}&datefrom=${dateFrom}&dateto=${dateTo}`, { headers: { Authorization: token } }).then((response) => {
    dispatch(getListData(ADVERTISEMENT_LIST, response))
  }).catch((error) => {
    dispatch(catchForList(ADVERTISEMENT_LIST, error))
  })
}

export const getAdvertisementDetails = (Id, token) => async (dispatch) => {
  await axios.get(`/advertisement/${Id}/v1`, { headers: { Authorization: token } }).then((response) => {
    dispatch({
      type: ADVERTISEMENT_DETAILS,
      payload: {
        data: response.data.data,
        resStatus: true
      }
    })
  }).catch(() => {
    dispatch({
      type: ADVERTISEMENT_DETAILS,
      payload: {
        data: [],
        resStatus: false
      }
    })
  })
}

export const addAdvertisement = (advertisementData) => async (dispatch) => {
  const { Title, Details, Description, Active, offerImage, token } = advertisementData
  dispatch({ type: CLEAR_ADVERTISEMENT_MESSAGE })
  try {
    if (offerImage) {
      const response = await axios.post('/advertisement/pre-signed-url/v1', { sFileName: offerImage.file.name, sContentType: offerImage.file.type }, { headers: { Authorization: token } })
      const url = response.data.data.sUrl
      const sImage = response.data.data.sPath
      await axios.put(url, offerImage.file, { headers: { 'Content-Type': offerImage.file.type } })
      await axios.post('/advertisement/add/v1', {
        sTitle: Title, sDetail: Details, sDescription: Description, eStatus: Active, sImage
      }, { headers: { Authorization: token } }).then((response1) => {
        dispatch(successFunc(CREATE_ADVERTISEMENT, response1))
      })
    } else {
      await axios.post('/advertisement/add/v1', {
        sTitle: Title, sDetail: Details, sDescription: Description, eStatus: Active, sImage: ''
      }, { headers: { Authorization: token } }).then((response2) => {
        dispatch(successFunc(CREATE_ADVERTISEMENT, response2))
      })
    }
  } catch (error) {
    dispatch(catchFunc(CREATE_ADVERTISEMENT, error))
  }
}

export const updateAdvertisement = (updateOfferData, offerId, token) => async (dispatch) => {
  const { Title, Details, Description, Active, offerImage } = updateOfferData
  dispatch({ type: CLEAR_ADVERTISEMENT_MESSAGE })
  try {
    if (offerImage && offerImage.file) {
      const response = await axios.post('/advertisement/pre-signed-url/v1', { sFileName: offerImage.file.name, sContentType: offerImage.file.type }, { headers: { Authorization: token } })
      const url = response.data.data.sUrl
      const sImage = response.data.data.sPath
      await axios.put(url, offerImage.file, { headers: { 'Content-Type': offerImage.file.type } })
      await axios.put(`/advertisement/${offerId}/v1`, {
        sTitle: Title, sDetail: Details, sDescription: Description, eStatus: Active, sImage
      }, { headers: { Authorization: token } }).then((response2) => {
        dispatch(successFunc(UPDATE_ADVERTISEMENT, response2))
      })
    } else {
      await axios.put(`/advertisement/${offerId}/v1`, {
        sTitle: Title, sDetail: Details, sDescription: Description, eStatus: Active, sImage: offerImage
      }, { headers: { Authorization: token } }).then((response) => {
        dispatch(successFunc(UPDATE_ADVERTISEMENT, response))
      })
    }
  } catch (error) {
    dispatch(catchFunc(UPDATE_ADVERTISEMENT, error))
  }
}

export const deleteAdvertisement = (Id, token) => async (dispatch) => {
  dispatch({ type: CLEAR_ADVERTISEMENT_MESSAGE })
  await axios.delete(`/advertisement/${Id}/v1`, { headers: { Authorization: token } }).then((response) => {
    dispatch(successFunc(DELETE_ADVERTISEMENT, response))
  }).catch((error) => {
    dispatch(catchFunc(DELETE_ADVERTISEMENT, error))
  })
}

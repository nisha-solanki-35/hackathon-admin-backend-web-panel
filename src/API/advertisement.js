import axios from './baseURL'

export const getAdvertisementList = async (listData) => {
  return await (await axios.get(`/advertise/v1?start=${listData?.start}&limit=${listData?.limit}&search=${listData?.search}`, { headers: { Authorization: listData?.token } }))?.data?.data
}

export const getAdvertisementDetails = async (advertisementId, token) => {
  return await axios.get(`/advertise/${advertisementId}/v1`, { headers: { Authorization: token } })
}

export const createAdvertisement = async (createAdvertiseData) => {
  const { advertiseData, token } = createAdvertiseData
  return await axios.post('/advertise/v1', { sEmail: advertiseData.sEmail, sMobileNo: advertiseData.sMobileNo, sName: advertiseData.sName, sPassword: advertiseData.sPassword }, { headers: { Authorization: token } })
}

export const updateAdvertisement = async (updateAdvertiseDetails) => {
  const { advertiseData, advertisementId, token } = updateAdvertiseDetails
  return await axios.put(`/advertise/${advertisementId}/v1`, { sEmail: advertiseData.sEmail, sMobileNo: advertiseData.sMobileNo, eStatus: advertiseData.eStatus, sName: advertiseData.sName }, { headers: { Authorization: token } })
}

export const deleteAdvertisement = async ({ advertisementId, token }) => {
  return await axios.delete(`/advertise/${advertisementId}/v1`, { headers: { Authorization: token } })
}

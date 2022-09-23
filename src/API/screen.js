import axios from './baseURL'

export const getScreenList = async (listData) => {
  return await (await axios.get(`/screen/v1?start=${listData?.start}&limit=${listData?.limit}&search=${listData?.search}`, { headers: { Authorization: listData?.token } }))?.data?.data
}

export const getScreenDetails = async (screenId, token) => {
  return await axios.get(`/screen/${screenId}/v1`, { headers: { Authorization: token } })
}

export const createScreen = async (createScreenData) => {
  const { screenData, token } = createScreenData
  return await axios.post('/screen/v1', { sEmail: screenData.sEmail, sMobileNo: screenData.sMobileNo, sName: screenData.sName, sPassword: screenData.sPassword }, { headers: { Authorization: token } })
}

export const updateScreen = async (updateScreenDetails) => {
  const { screenData, screenId, token } = updateScreenDetails
  return await axios.put(`/screen/${screenId}/v1`, { sEmail: screenData.sEmail, sMobileNo: screenData.sMobileNo, eStatus: screenData.eStatus, sName: screenData.sName }, { headers: { Authorization: token } })
}

export const deleteScreen = async ({ screenId, token }) => {
  return await axios.delete(`/screen/${screenId}/v1`, { headers: { Authorization: token } })
}

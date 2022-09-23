import axios from './baseURL'

export const getVendorList = async (listData) => {
  return await (await axios.get(`/vendor-profile/v1?start=${listData?.start}&limit=${listData?.limit}&search=${listData?.search}`, { headers: { Authorization: listData?.token } }))?.data?.data
}

export const getVendorDetails = async (vendorId, token) => {
  console.log('vendorId, token', vendorId, token)
  return await axios.get(`/vendor-profile/${vendorId}/v1`, { headers: { Authorization: token } })
}

export const createVendor = async (createVendorData) => {
  const { vendorData, token } = createVendorData
  return await axios.post('/add-vendor-profile/v1', { sEmail: vendorData.sEmail, sMobileNo: vendorData.sMobileNo, sName: vendorData.sName, sPassword: vendorData.sPassword }, { headers: { Authorization: token } })
}

export const updateVendor = async (updateVendorDetails) => {
  const { vendorData, vendorId, token } = updateVendorDetails
  return await axios.put(`/vendor-profile/${vendorId}/v1`, { sEmail: vendorData.sEmail, sMobileNo: vendorData.sMobileNo, eStatus: vendorData.eStatus, sName: vendorData.sName }, { headers: { Authorization: token } })
}

export const deleteVendor = async ({ vendorId, token }) => {
  return await axios.delete(`/vendor-profile/${vendorId}/v1`, { headers: { Authorization: token } })
}

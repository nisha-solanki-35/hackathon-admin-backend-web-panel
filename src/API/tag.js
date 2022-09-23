import axios from './baseURL'

export const getTagList = async (listData) => {
  return await (await axios.get(`/tags/v1?start=${listData?.start}&limit=${listData?.limit}&search=${listData?.search}`, { headers: { Authorization: listData?.token } }))?.data?.data
}

export const getTagDetails = async (tagId, token) => {
  return await axios.get(`/tag/${tagId}/v1`, { headers: { Authorization: token } })
}

export const createTag = async (createTagData) => {
  const { tagData, token } = createTagData
  return await axios.post('/tag/v1', { sEmail: tagData.sEmail, sMobileNo: tagData.sMobileNo, sName: tagData.sName, sPassword: tagData.sPassword }, { headers: { Authorization: token } })
}

export const updateTag = async (updateTagDetails) => {
  const { tagData, tagId, token } = updateTagDetails
  return await axios.put(`/tag/${tagId}/v1`, { sEmail: tagData.sEmail, sMobileNo: tagData.sMobileNo, eStatus: tagData.eStatus, sName: tagData.sName }, { headers: { Authorization: token } })
}

export const deleteTag = async ({ tagId, token }) => {
  return await axios.delete(`/tag/${tagId}/v1`, { headers: { Authorization: token } })
}

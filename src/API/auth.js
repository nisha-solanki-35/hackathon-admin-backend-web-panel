import axios from './baseURL'
import { encryption } from 'src/helper/helper'

export const login = async (data) => {
  const Password = encryption(data?.password)
  return await axios.post('/auth/login/v1', { sLogin: data?.email, sPassword: Password })
}

export const logout = async (token) => {
  return await axios.put('/auth/logout/v1', {}, { headers: { Authorization: token } })
}

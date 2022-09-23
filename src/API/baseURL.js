import axios from 'axios'
// import { CLEAR_ERROR_MSG, ERROR_MSG } from '../redux/constants'
import { unAuthorized } from '../helper/helper'
// import { store } from './Store'

const instance = axios.create({
  baseURL: 'https://bitends.herokuapp.com/api/admin/'
})

instance.interceptors.response.use(response => response, (error) => {
  if ((error.response && error.response.status === 401) && (error?.response?.data?.message === 'Authentication failed. Please login again!')) {
    unAuthorized()
  } else if (error.response && error.response.status === 401) {
    // store.dispatch({ type: CLEAR_ERROR_MSG })
    // store.dispatch({
    //   type: ERROR_MSG,
    //   payload: {
    //     error: error?.response?.data?.message
    //   }
    // })
  }
  return Promise.reject(error)
})

export default instance

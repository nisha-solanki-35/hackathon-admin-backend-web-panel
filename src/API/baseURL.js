import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://bitends.herokuapp.com/api/admin/'
})

export default instance

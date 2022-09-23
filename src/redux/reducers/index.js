import { combineReducers } from 'redux'
import advertisement from './advertisement'
import auth from './auth'
import screen from './screen'
import subadmin from './subadmin'
import vendor from './vendor'

export default combineReducers({
  advertisement,
  auth,
  screen,
  subadmin,
  vendor
})

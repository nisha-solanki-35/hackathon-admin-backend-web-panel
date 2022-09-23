import { Crypt } from 'hybrid-crypto-js'
import { useNavigate } from 'react-router-dom'

const publicKey = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDUH3YJ9lSOPsof/8qyHKPG1kuA
QXNLEWE4bd+VLBgbEitOwm9+TLpzcnzweaiVfr9NIoaEydxP4ZlJF/h/7fhOuazS
QRld429/k+ZzyfmpDkGIPbgKOndPdy0AuWZoiEMXKQvSbtmbCN0isWlquW1vU7Fn
SJi4Dm1LbgpnL6FLgwIDAQAB
-----END PUBLIC KEY-----`

export function unAuthorized () {
  const navigate = useNavigate()
  localStorage.removeItem('token')
  navigate('/login', { replace: true })
}

export function encryption (sPassword) {
  const crypt = new Crypt()
  const encrypted = crypt.encrypt(publicKey, sPassword)
  return encrypted.toString()
}

export function getListData (type, response) {
  return {
    type,
    payload: {
      data: response.data.data ? response.data.data : [],
      resStatus: true
    }
  }
}

export function catchForList (type, error) {
  return {
    type,
    payload: {
      data: [],
      resStatus: false
    }
  }
}

export function successFunc (type, response) {
  return {
    type,
    payload: {
      resMessage: response.data.message,
      resStatus: true,
      type
    }
  }
}

export function catchFunc (type, error) {
  return {
    type,
    payload: {
      resMessage: error.response ? error.response.data.message || error.response.data.errors[0].msg + ' of ' + error.response.data.errors[0].param : 'Server is unavailable.',
      resStatus: false,
      type
    }
  }
}

// reducer
export function commonReducer (state, action) {
  return {
    ...state,
    resStatus: action.payload.resStatus,
    resMessage: action.payload.resMessage,
    type: action.payload.type
  }
}

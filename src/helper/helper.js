import { TOKEN_LOGIN } from 'src/redux/constants'
import { store } from '../redux/Store'
import { Crypt } from 'hybrid-crypto-js'

const publicKey = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDUH3YJ9lSOPsof/8qyHKPG1kuA
QXNLEWE4bd+VLBgbEitOwm9+TLpzcnzweaiVfr9NIoaEydxP4ZlJF/h/7fhOuazS
QRld429/k+ZzyfmpDkGIPbgKOndPdy0AuWZoiEMXKQvSbtmbCN0isWlquW1vU7Fn
SJi4Dm1LbgpnL6FLgwIDAQAB
-----END PUBLIC KEY-----`

export function unAuthorized () {
  localStorage.removeItem('Token')
  store.dispatch({
    type: TOKEN_LOGIN,
    payload: {
      token: null
    }
  })
  history.push('/login')
}

export function encryption (sPassword) {
  const crypt = new Crypt()
  const encrypted = crypt.encrypt(publicKey, sPassword)
  return encrypted.toString()
}

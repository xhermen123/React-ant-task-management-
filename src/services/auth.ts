import { post, get } from './base';
import jwtDecode from 'jwt-decode'
import { apiUrl } from '../config'
import { UserResponse } from './user';

export interface AuthenticateResponse {
  data: {
    token: string
  }
}

export default {
  authenticate(email: string, password: string): Promise<AuthenticateResponse> {
    const payload = {
      email: email.toLowerCase(),
      password
    }
    return post(`${apiUrl()}/authenticate`, payload);
  },
  authenticateProvider(provider: string, providerId: string): Promise<AuthenticateResponse> {
    const payload = {
      provider: provider,
      providerId,
      type: 'provider'
    }
    return post(`${apiUrl()}/authenticate`, payload);
  },
  isAuthenticated(): boolean {
    const userId = localStorage.getItem('userId')
    if (!userId || userId === '') {
      return false
    }

    const token = localStorage.getItem('token')
    if (!token || token === '') return false

    const decoded: any = jwtDecode(token)
    if (decoded.exp < Math.floor(Date.now() / 1000)) return false

    return true
  },
  isAdmin(): boolean {
    const token = localStorage.getItem('token')
    if (!token || token === '') return false

    const decoded: any = jwtDecode(token)

    return decoded.isAdmin;
  },
  me() {
    return get(`${apiUrl()}/me`);
  },
  forgotPassword(email: string): Promise<any> {
    return post(`${apiUrl()}/forgot-password`, { email })
  },
  resetPassword(password: string, hash: string): Promise<UserResponse> {
    return post(`${apiUrl()}/reset-password`, {
      password,
      hash
    })
  }
}
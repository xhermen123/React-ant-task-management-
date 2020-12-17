import { UserModel } from './../models/user';
import { post, get, put, del } from './base';
import { apiUrl } from '../config'

export interface StoreUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  birthday?: string;
  phoneNumber?: string;
  providerId?: string;
  provider?: string;
  password?: string;
  type?: string;
  avatarUrl?: string;
}

export interface UpdateUserRequest {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  avatarUrl: string;
  viewVenueName: boolean;
}

export interface UpdatePasswordRequest {
  userId: string;
  oldPassword: string;
  newPassword: string;
}

export interface UserResponse {
  data: UserModel
}

export default {
  get(id: string): Promise<UserResponse> {
    return get(`${apiUrl()}/users/${id}`);
  },

  store(req: StoreUserRequest): Promise<UserResponse> {
    req.email = req.email.toLowerCase();
    req.phoneNumber = req.phoneNumber ? req.phoneNumber.replace(/\D/g, '') : ''
    req.avatarUrl = req.avatarUrl ? req.avatarUrl : `https://ui-avatars.com/api/?name=${req.firstName}`
    return post(`${apiUrl()}/users`, req);
  },

  updatePassword(req: UpdatePasswordRequest): Promise<UserResponse> {
    return post(`${apiUrl()}/users/${req.userId}/update-password`, req)
  },

  update(req: UpdateUserRequest): Promise<UserResponse> {
    req.email = req.email.toLowerCase();
    req.phoneNumber = req.phoneNumber ? req.phoneNumber.replace(/\D/g, '') : ''
    return put(`${apiUrl()}/users/${req.id}`, req);
  },
  list(): Promise<any> {
    return get(`${apiUrl()}/users`)
  },
  activate(hash: string): Promise<UserResponse> {
    return post(`${apiUrl()}/activate-account/${hash}`, null)
  },
  del(id: string): Promise<any> {
      return del(`${apiUrl()}/users/${id}`)
  }
}
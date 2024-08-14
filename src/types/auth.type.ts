import { SuccessResponse } from './untils.type'
import { User } from './user.type'

export type AuthResponse = SuccessResponse<{
  access_token: string
  refresh_token: string
  user:User
}>
export type RefreshTokenReponse = SuccessResponse<{ access_token: string }>

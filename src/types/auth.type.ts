import { SuccessResponse } from './untils.type'

export type AuthResponse = SuccessResponse<{
  access_token: string
  refresh_token: string
  expire_access_token: number
  expire_refresh_token: number
  expires: string
}>
export type RefreshTokenReponse = SuccessResponse<{ access_token: string }>

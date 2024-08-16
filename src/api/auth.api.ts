import { AuthResponse } from '@/types/auth.type'
import { SuccessResponse } from '@/types/untils.type'
import http from '@/utils/http'

export const URL_LOGIN = '/login'
export const URL_REGISTER = '/register'
export const URL_LOGOUT = '/logout'

const authAPI = {
  loginAccount(body: { email: string; password: string }) {
    return http.post<AuthResponse>(`${'/auth'}${URL_LOGIN}`, body)
  },
  registerAccout(body: { email: string; password: string }) {
    return http.post<SuccessResponse<{}>>(`${'/auth'}${URL_REGISTER}`, body)
  }
}
export default authAPI

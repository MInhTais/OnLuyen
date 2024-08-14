import { AuthResponse } from "@/types/auth.type"
import http from "@/utils/http"

export const URL_LOGIN = '/login'
export const URL_REGISTER = '/register'
export const URL_LOGOUT = '/logout'
export const URL_REFRESHTOKEN = 'refresh-access-token'

const authAPI = {
  loginAccount(body: { email: string; password: string }) {
    return http.post<AuthResponse>(`${'/auth'}${URL_LOGIN}`, body)
  }
}
export default authAPI
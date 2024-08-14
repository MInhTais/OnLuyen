import { URL_LOGIN, URL_REGISTER } from "@/api/auth.api"
import { AuthResponse } from "@/types/auth.type"
import axios, { AxiosError, AxiosInstance } from "axios"
import { clearAccessTokenToLocalStorage, getAccessTokenFromLocalStorage, getRefreshTokenFromLocalStorage, saveAccessTokenToLocalStorage, saveRefreshTokenToLocalStorage, saveUserToLocalStorage } from "./auth"

class Http {
  instance: AxiosInstance
  private accessToken: string
  private refreshToken: string
  // private refreshTokenRequest: Promise<string> | null
  constructor() {
    this.accessToken = getAccessTokenFromLocalStorage()
    this.refreshToken = getRefreshTokenFromLocalStorage()
    // this.refreshTokenRequest = null
    this.instance = axios.create({
      baseURL: 'http://localhost:8080/',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.authorization = this.accessToken
          return config
        }
        return config
      },
      (err) => {
        return Promise.reject(err)
      }
    )
    this.instance.interceptors.response.use(
      (response) => {

        const { url } = response.config
        console.log(response)
        if (url === '/auth/login' || url === '/auth/register') {
          const data = response.data as AuthResponse
          console.log(data.data)
          this.accessToken = data.data.access_token
          this.refreshToken = data.data.refresh_token
          saveUserToLocalStorage(data.data.user)
          saveAccessTokenToLocalStorage(this.accessToken)
          saveRefreshTokenToLocalStorage(this.refreshToken)
        } else if (url === '/logout') {
          this.accessToken = ''
          this.refreshToken = ''
          clearAccessTokenToLocalStorage()
        }
        return response
      },
      (error: AxiosError) => {
        console.log(error)
      //   if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
      //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
      //     // const data: any | undefined = error.response?.data
      //     // const message = data?.message || error.message
      //     // toast.error(message)
      //     if (isAxiosUnauthorizedError<ErrorResponse<{ name: string; mesage: string }>>(error)) {
      //       if (error.response) {
      //         console.log('err')
      //         const config = error.response?.config || {}
      //         const { url }: any = config
      //         console.log(error.response.data.data?.name)
      //         if (isAxiosExpiredTokenError(error) && url !== URL_REFRESHTOKEN) {
      //           console.log(isAxiosExpiredTokenError(error))
      //           console.log(url !== URL_REFRESHTOKEN)
      //           this.refreshTokenRequest = this.refreshTokenRequest
      //             ? this.refreshTokenRequest
      //             : this.handleRefreshToken().finally(() => {
      //                 setTimeout(() => {
      //                   this.refreshTokenRequest = null
      //                 }, 10000)
      //               })
      //           return this.refreshTokenRequest.then((accessToken) => {
      //             return this.instance({ ...config, headers: { ...config.headers, authorization: accessToken } })
      //           })
      //         }
      //         clearAccessTokenToLocalStorage()
      //         this.accessToken = ''
      //         this.refreshToken = ''
      //         toast.error(error.response?.data.data?.mesage || error.response?.data.message)
      //       }
      //     }
      //   }
        return Promise.reject(error)
      }
    )
  }
//   private handleRefreshToken() {
//     return this.instance
//       .post<RefreshTokenReponse>(URL_REFRESHTOKEN, {
//         refresh_token: this.refreshToken
//       })
//       .then((res) => {
//         const { access_token } = res.data.data
//         saveAccessTokenToLocalStorage(access_token)
//         this.accessToken = access_token
//         return access_token
//       })
//       .catch((error) => {
//         console.log(error)
//         this.accessToken = ''
//         this.refreshToken = ''
//         throw error
//       })
//   }
 }
const http = new Http().instance
export default http

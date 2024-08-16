import axios, { AxiosError, AxiosInstance } from 'axios'

class Http {
  instance: AxiosInstance
  constructor() {
    this.instance = axios.create({
      baseURL: 'http://localhost:3500/api/cities',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
    this.instance.interceptors.request.use(
      (config) => {
        return config
      },
      (err) => {
        return Promise.reject(err)
      }
    )
    this.instance.interceptors.response.use(
      (response) => {
        return response
      },
      (error: AxiosError) => {
        console.log(error)
        return Promise.reject(error)
      }
    )
  }
}
const goshipHttp = new Http().instance
export default goshipHttp

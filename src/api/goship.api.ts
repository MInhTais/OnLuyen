import { City, Districts, RateRequest, RateResponse, Wards } from '@/types/goship.type'
import { GoshipSuccessResponse } from '@/types/untils.type'
import goshipHttp from '@/utils/goship.http'

const URL = '/'

const goshipAPI = {
  getCity() {
    return goshipHttp.get<GoshipSuccessResponse<City[]>>(URL)
  },
  getDistricts(code: string) {
    return goshipHttp.get<GoshipSuccessResponse<Districts[]>>(`/${code}/districts`)
  },
  getWardsByDistrict(code: string) {
    return goshipHttp.get<GoshipSuccessResponse<Wards[]>>(`/${code}/wards`)
  },
  getRates(body: RateRequest) {
    return goshipHttp.post<GoshipSuccessResponse<RateResponse[]>>(`/rates`, body)
  }
}
export default goshipAPI

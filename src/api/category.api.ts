import { CategoryLevel1 } from '@/types/product.type'
import { SuccessResponse } from '@/types/untils.type'
import http from '@/utils/http'

const URL = 'categories'

const categoryAPI = {
  getCategories() {
    return http.get<SuccessResponse<CategoryLevel1[]>>(URL)
  }
}
export default categoryAPI

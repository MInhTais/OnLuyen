import { CategoryLevel1, CategoryLevel2 } from '@/types/product.type'
import { SuccessResponse } from '@/types/untils.type'
import http from '@/utils/http'

const URL = 'categories'

const categoryAPI = {
  getCategories() {
    return http.get<SuccessResponse<CategoryLevel1[]>>(URL)
  },
  getCategoriesById({categoryId}:{categoryId:number}) {
    return http.get<SuccessResponse<CategoryLevel2>>(`${URL}/${categoryId}`)
  },
  getCategoriesV1ById({categoryV1Id}:{categoryV1Id:number}) {
    console.log(categoryV1Id)
    return http.get<SuccessResponse<CategoryLevel1>>(`${URL}/v1/${categoryV1Id}`)
  }
}
export default categoryAPI

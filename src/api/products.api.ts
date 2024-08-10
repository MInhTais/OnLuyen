import { Products } from '@/types/product.type'
import { SuccessResponse } from '@/types/untils.type'
import http from '@/utils/http'

const URL = 'products'

const productsAPI = {
  getProductsDiscout() {
    return http.get<SuccessResponse<Products[]>>(`${URL}/products-dis`)
  },
  getProductMeatCategory(){
    return http.get<SuccessResponse<Products[]>>(`${URL}/products-meat`)
  },
  getProductVesCategory(){
    return http.get<SuccessResponse<Products[]>>(`${URL}/products-ves`)
  },
  getProductOilsCategory(){
    return http.get<SuccessResponse<Products[]>>(`${URL}/products-oil`)
  },
  searchProduct(params:string){
    return http.get<SuccessResponse<Products[]>>(`${URL}/${'search'}/${params}`)
  },
  getProductDetail(id: string) {
    return http.get<SuccessResponse<Products>>(`${URL}/${id}`)
  },
  getCategorieById(categoriesId:number){
    return http.get<SuccessResponse<Products[]>>(`${URL}/categories/${categoriesId}`)
  }
}
export default productsAPI

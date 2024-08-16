import { Order, OrderItem } from '@/types/order.type'
import { SuccessResponse } from '@/types/untils.type'
import http from '@/utils/http'

const URL = '/orders'

const orderAPI = {
  createOrder(body: {
    shippingAddress: string
    totalAmout: number
    authorId: string
    beforeDiscount: number
    shipPrice: number
    discount: number
  }) {
    return http.post<SuccessResponse<Order>>(`${URL}/createOrder`, body)
  },
  createOrderDetail(body: OrderItem[]) {
    return http.post<SuccessResponse<Order>>(`${URL}/createOrderDetail`, body)
  }
}

export default orderAPI

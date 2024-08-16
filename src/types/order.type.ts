export interface Order {
  id: number
  createAt: string
  status: string
  shippingAddress: string
  totalAmout: number
  discount: number
  beforeDiscount: number
  shipPrice: number
  authorId: string
}

export interface OrderRequest {
  shippingAddress: string
  totalAmout: number
  authorId: string
  beforeDiscount: number
  shipPrice: number
  discount: number
}

export interface OrderItem {
  quantity: number
  unitPrice: number
  name: string
  priceBeforeDiscount: number
  total: number
  productId: string
  orderId: number
}

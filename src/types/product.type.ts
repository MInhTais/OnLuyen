export interface CategoryLevel2 {
  id: number
  categorieName2: string
  categoriesLevel1Id: number
  image: string
  categoriesLevel2_products: Products[]
}

export interface CategoryLevel1 {
  id: number
  categorieName: string
  categoriesLevel2: CategoryLevel2[]
}

export interface Products {
  id: string
  name: string
  image: string
  description: string
  price: number
  dis_price: number
  categoriesLevel2Id: number
}

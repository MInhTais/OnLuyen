import { RateResponse } from '@/types/goship.type'
import { Products } from '@/types/product.type'
import { User } from '@/types/user.type'
import { getAccessTokenFromLocalStorage, getAddressFromLocalStorage, getProfileFromLocalStorage } from '@/utils/auth'
import { createContext, ReactNode, useState, useContext } from 'react'

export interface ProductWithQuantity extends Products {
  quantity: number
}

export interface Address {
  name: string
  phone: string
  city: string
  district: string
  ward: string
  address: string
  default?: boolean | undefined
}

interface AppContextInterface {
  products: ProductWithQuantity[]
  selectedProducts: ProductWithQuantity[]
  addProduct: (product: Products, quantity?: number) => void
  removeProduct: (productId: string, removeCompletely: boolean) => void
  setSelectedProducts: React.Dispatch<React.SetStateAction<ProductWithQuantity[]>>
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  profile: User | null
  setProfile: React.Dispatch<React.SetStateAction<User | null>>
  totalAmount: number
  subTotal: number
  totalDiscount: number
  updateTotals: (subTotal: number, totalDiscount: number, totalAmount: number) => void
  address: Address[]
  setAddressProvide: (newAddress: Address) => void
  getDefaultAddress: () => Address | undefined
  rate: RateResponse | null
  setRate: React.Dispatch<React.SetStateAction<RateResponse | null>>
  purchaseProducts: () => void
}

const initialContext: AppContextInterface = {
  products: [],
  addProduct: () => {},
  removeProduct: () => {},
  isAuthenticated: Boolean(getAccessTokenFromLocalStorage()),
  setIsAuthenticated: () => null,
  profile: getProfileFromLocalStorage(),
  setProfile: () => null,
  totalAmount: 0,
  subTotal: 0,
  totalDiscount: 0,
  updateTotals: () => {},
  selectedProducts: [],
  setSelectedProducts: () => {},
  address: getAddressFromLocalStorage(),
  setAddressProvide: () => {},
  getDefaultAddress: () => undefined,
  rate: null,
  setRate: () => {},
  purchaseProducts: () => {}
}

const MyContext = createContext<AppContextInterface | undefined>(initialContext)

const MyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<ProductWithQuantity[]>(() => {
    const storedProducts = localStorage.getItem('selectedProducts')
    return storedProducts ? JSON.parse(storedProducts) : []
  })

  const [profile, setProfile] = useState<User | null>(initialContext.profile)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialContext.isAuthenticated)
  const [totalAmount, setTotalAmount] = useState<number>(initialContext.totalAmount)
  const [subTotal, setSubTotal] = useState<number>(initialContext.subTotal)
  const [totalDiscount, setTotalDiscount] = useState<number>(initialContext.totalDiscount)
  const [selectedProducts, setSelectedProducts] = useState<ProductWithQuantity[]>([])
  const [address, setAddress] = useState<Address[]>(initialContext.address)
  const [rate, setRate] = useState<RateResponse | null>(initialContext.rate)

  const updateTotals = (subTotal: number, totalDiscount: number, totalAmount: number) => {
    setSubTotal(subTotal)
    setTotalDiscount(totalDiscount)
    setTotalAmount(totalAmount)
  }

  const addProduct = (product: Products, quantity: number = 1) => {
    setProducts((prevProducts) => {
      const productIndex = prevProducts.findIndex((p) => p.id === product.id)
      let updatedProducts
      if (productIndex !== -1) {
        updatedProducts = [...prevProducts]
        updatedProducts[productIndex].quantity += quantity
      } else {
        updatedProducts = [...prevProducts, { ...product, quantity }]
      }

      localStorage.setItem('selectedProducts', JSON.stringify(updatedProducts))
      return updatedProducts
    })
  }

  const removeProduct = (productId: string, removeCompletely: boolean = false) => {
    setProducts((prevProducts) => {
      let updatedProducts
      if (removeCompletely) {
        updatedProducts = prevProducts.filter((product) => product.id !== productId)
      } else {
        updatedProducts = prevProducts.map((product) =>
          product.id === productId && product.quantity > 1 ? { ...product, quantity: product.quantity - 1 } : product
        )
      }

      localStorage.setItem('selectedProducts', JSON.stringify(updatedProducts))
      return updatedProducts
    })
  }
  const setAddressProvide = (newAddress: Address) => {
    setAddress((prevAddresses) => {
      let updatedAddresses = [...prevAddresses]

      if (newAddress.default) {
        updatedAddresses = updatedAddresses.map((address) => ({
          ...address,
          default: false
        }))
      }

      updatedAddresses.push(newAddress)

      localStorage.setItem('address', JSON.stringify(updatedAddresses))

      return updatedAddresses
    })
  }

  const getDefaultAddress = (): Address | undefined => {
    return address.find((addr) => addr.default === true)
  }

  const purchaseProducts = () => {
    setProducts((prevProducts) => {
      const selectedProductIds = selectedProducts.map((product) => product.id)

      const updatedProducts = prevProducts.filter((product) => !selectedProductIds.includes(product.id))

      localStorage.setItem('selectedProducts', JSON.stringify(updatedProducts))

      return updatedProducts
    })
  }

  return (
    <MyContext.Provider
      value={{
        products,
        addProduct,
        removeProduct,
        isAuthenticated,
        setIsAuthenticated,
        profile,
        setProfile,
        totalAmount,
        subTotal,
        totalDiscount,
        updateTotals,
        selectedProducts,
        setSelectedProducts,
        address,
        setAddressProvide,
        getDefaultAddress,
        rate,
        setRate,
        purchaseProducts
      }}
    >
      {children}
    </MyContext.Provider>
  )
}

const useProductContext = () => {
  const context = useContext(MyContext)
  if (context === undefined) {
    throw new Error('useProductContext must be used within a ProductProvider')
  }
  return context
}

export { MyProvider, useProductContext }

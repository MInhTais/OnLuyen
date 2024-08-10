import { Products } from '@/types/product.type'
import { createContext, ReactNode, useState, useContext, useEffect } from 'react'

interface ProductWithQuantity extends Products {
  quantity: number
}

interface ProductContextType {
  products: ProductWithQuantity[]
  addProduct: (product: Products) => void
  removeProduct: (productId: string) => void
}

const MyContext = createContext<ProductContextType | undefined>(undefined)

const MyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<ProductWithQuantity[]>(() => {
    const storedProducts = localStorage.getItem('selectedProducts')
    return storedProducts ? JSON.parse(storedProducts) : []
  })

  useEffect(() => {
    localStorage.setItem('selectedProducts', JSON.stringify(products))
  }, [products])

  const addProduct = (product: Products) => {
    setProducts((prevProducts) => {
      const productIndex = prevProducts.findIndex((p) => p.id === product.id)
      if (productIndex !== -1) {
        const updatedProducts = [...prevProducts]
        updatedProducts[productIndex].quantity += 1
        return updatedProducts
      } else {
        return [...prevProducts, { ...product, quantity: 1 }]
      }
    })
  }

  const removeProduct = (productId: string) => {
    setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId))
  }

  return <MyContext.Provider value={{ products, addProduct, removeProduct }}>{children}</MyContext.Provider>
}

const useProductContext = () => {
  const context = useContext(MyContext)
  if (context === undefined) {
    throw new Error('useProductContext must be used within a ProductProvider')
  }
  return context
}

export { MyProvider, useProductContext }

import { useProductContext } from '@/context/MyProvider'
import { Products } from '@/types/product.type'
import { formatCurrency, generateNameId } from '@/utils/utils'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Cart() {
  const {
    products: productsContext,
    addProduct,
    removeProduct,
    updateTotals,
    setSelectedProducts,
    selectedProducts: selectedProductsContext
  } = useProductContext()

  const [selectedProductIds, setSelectedProductIds] = useState<string[]>(
    selectedProductsContext.map((product) => product.id)
  )

  const selectedProducts = useMemo(() => {
    return productsContext.filter((product) => selectedProductIds.includes(product.id))
  }, [productsContext, selectedProductIds])

  const updateCartTotals = useCallback(() => {
    const subTotal = selectedProducts.reduce((total, product) => total + product.price * product.quantity, 0)

    const totalDiscount = selectedProducts.reduce((total, product) => {
      const discount = product.dis_price > 0 ? product.price - product.dis_price : 0
      return total + discount * product.quantity
    }, 0)

    const totalAmount = subTotal - totalDiscount

    updateTotals(subTotal, totalDiscount, totalAmount)
  }, [selectedProducts, updateTotals])

  useEffect(() => {
    updateCartTotals()
    setSelectedProducts(selectedProducts)
  }, [selectedProducts, updateCartTotals, setSelectedProducts])

  const handleIncreaseQuantity = (product: Products) => {
    addProduct(product, 1)
  }

  const handleDecreaseQuantity = (productId: string, quantity: number) => {
    if (quantity > 1) {
      removeProduct(productId, false)
    }
  }

  const handleRemoveProduct = (productId: string) => {
    removeProduct(productId, true)
  }

  const handleProductCheckboxChange = (productId: string) => {
    setSelectedProductIds((prevSelectedIds) =>
      prevSelectedIds.includes(productId)
        ? prevSelectedIds.filter((id) => id !== productId)
        : [...prevSelectedIds, productId]
    )
  }

  const handleSelectAllChange = () => {
    if (selectedProductIds.length === productsContext.length) {
      setSelectedProductIds([])
    } else {
      setSelectedProductIds(productsContext.map((product) => product.id))
    }
  }

  const isAllSelected = selectedProductIds.length === productsContext.length

  return (
    <div>
      {productsContext.length > 0 ? (
        <div>
          <div className='overflow-auto'>
            <div className='min-w-[1000px]'>
              <div className='grid grid-cols-12 rounded-sm bg-white px-9 py-5 text-sm capitalize text-gray-500 shadow'>
                <div className='col-span-6'>
                  <div className='flex items-center'>
                    <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                      <input
                        type='checkbox'
                        className='h-5 w-5 accent-orange'
                        checked={isAllSelected}
                        onChange={handleSelectAllChange}
                      />
                    </div>
                    <div className='flex-grow capitalize text-black'>Sản phẩm</div>
                  </div>
                </div>
                <div className='col-span-6'>
                  <div className='grid grid-cols-5 text-center'>
                    <div className='col-span-2'>Đơn giá</div>
                    <div className='col-span-1'>Số lượng</div>
                    <div className='col-span-1'>Số tiền</div>
                    <div className='col-span-1'>Thao tác</div>
                  </div>
                </div>
              </div>
              <div className='my-3 rounded-sm bg-white p-5 text-sm shadow'>
                {productsContext.map((product) => (
                  <div
                    key={product.id}
                    className='mb-5 grid grid-cols-12 items-center rounded-sm border border-gray-200 px-4 py-5 text-center text-gray-500 first:mt-0'
                  >
                    <div className='col-span-6'>
                      <div className='flex'>
                        <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                          <input
                            type='checkbox'
                            className='h-5 w-5 accent-orange'
                            checked={selectedProductIds.includes(product.id)}
                            onChange={() => handleProductCheckboxChange(product.id)}
                          />
                        </div>
                        <div className='flex flex-grow'>
                          <div className='flex'>
                            <Link
                              to={`${
                                '/' +
                                generateNameId({
                                  name: product.name,
                                  id: product.id
                                })
                              }`}
                              className='h-20 w-20 flex-shrink-0'
                            >
                              <img src={product.image} />
                            </Link>
                            <div className='flex-grow px-2 pb-2 pt-1'>
                              <Link
                                to={`${
                                  '/' +
                                  generateNameId({
                                    name: product.name,
                                    id: product.id
                                  })
                                }`}
                                className='line-clamp-2 text-left'
                              >
                                {product.name}
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='col-span-2'>
                      <div className='flex items-center justify-center'>
                        {product.dis_price === 0 ? (
                          ''
                        ) : (
                          <span className='text-gray-300 line-through'>₫{formatCurrency(product.price)}</span>
                        )}
                        {product.dis_price === 0 ? (
                          <div className='ml-3 text-green-700'>₫{formatCurrency(product.price)}</div>
                        ) : (
                          <div className='ml-3 text-green-700'>₫{formatCurrency(product.dis_price)}</div>
                        )}
                      </div>
                    </div>
                    <div className='col-span-2'>
                      <div className='flex items-center justify-center'>
                        <div className='flex items-center'>
                          <button
                            onClick={() => handleDecreaseQuantity(product.id, product.quantity)}
                            disabled={product.quantity === 1}
                            className={`flex h-8 w-8 items-center justify-center rounded-l-sm border border-gray-300 text-gray-600 ${
                              product.quantity === 1 ? 'cursor-not-allowed opacity-50' : ''
                            }`}
                          >
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 24 24'
                              strokeWidth={1.5}
                              stroke='currentColor'
                              className='h-4 w-4'
                            >
                              <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 12h-15' />
                            </svg>
                          </button>
                          <input
                            className='h-8 w-14 border-t border-b border-gray-300 p-1 text-center outline-none'
                            value={product.quantity}
                            readOnly
                          />
                          <button
                            onClick={() => handleIncreaseQuantity(product)}
                            className='flex h-8 w-8 items-center justify-center rounded-r-sm border border-gray-300 text-gray-600'
                          >
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 24 24'
                              strokeWidth={1.5}
                              stroke='currentColor'
                              className='h-4 w-4'
                            >
                              <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className='col-span-1'>
                      {product.dis_price === 0 ? (
                        <span className='text-green-700'>{formatCurrency(product.price * product.quantity)}</span>
                      ) : (
                        <span className='text-green-700'>{formatCurrency(product.dis_price * product.quantity)}</span>
                      )}
                    </div>
                    <div className='col-span-1'>
                      <button
                        onClick={() => handleRemoveProduct(product.id)}
                        className='bg-none text-black transition-colors hover:text-orange'
                      >
                        <img
                          className='h-4 w-4'
                          src={'https://frontend.tikicdn.com/_desktop-next/static/img/icons/trash.svg'}
                        />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='max-w-7xl mx-auto px-4'>
          <div className='flex flex-col items-center justify-center rounded-sm bg-white px-9 py-5 text-sm capitalize text-gray-500 shadow'>
            <img
              className='h-24 w-24'
              src='https://shopee-clone-ts.vercel.app/assets/no-product.b0846037.png'
              alt='anh'
            />
            <div className='mt-5 font-bold text-gray-400'>Giỏ hàng của bạn còn trống</div>
            <div className='mt-5'>
              <Link to={'/'} className='rounded-sm bg-green-500 hover:bg-green-600 px-4 py-2 text-white'>
                Mua Ngay
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

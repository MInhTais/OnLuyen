import { useProductContext } from '@/context/MyProvider'
import { Products } from '@/types/product.type'
import { formatCurrency, generateNameId } from '@/utils/utils'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

export default function Cart() {
  const { products: productsContext, addProduct, removeProduct } = useProductContext()
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([])
  console.log(selectedProductIds)

  const handleIncreaseQuantity = (product: Products) => {
    addProduct(product)
  }

  const handleDecreaseQuantity = (productId: string) => {
    removeProduct(productId)
  }

  const handleRemoveProduct = (productId: string) => {
    removeProduct(productId)
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

  const totalAmount = productsContext
    .filter((product) => selectedProductIds.includes(product.id))
    .reduce((total, product) => total + product.price * product.quantity, 0)

  return (
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
                    <span className='text-gray-300 line-through'>₫{formatCurrency(product.dis_price)}</span>
                    <div className='ml-3 '>₫{formatCurrency(product.price)}</div>
                  </div>
                </div>
                <div className='col-span-2'>
                  <div className='flex items-center justify-center'>
                    <div className='flex items-center'>
                      <button
                        onClick={() => handleDecreaseQuantity(product.id)}
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
                  <span>{formatCurrency(product.price * product.quantity)}</span>
                </div>
                <div className='col-span-1'>
                  <button
                    onClick={() => handleRemoveProduct(product.id)}
                    className='bg-none text-black transition-colors hover:text-orange'
                  >
                    Xóa
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='sticky bottom-0 z-10 mt-10 flex flex-col rounded-sm border border-gray-100 bg-white p-5 shadow sm:flex-row sm:items-center sm:justify-between'>
        <div className='flex items-center'>
          <div className='flex flex-shrink-0 items-center justify-center pr-3'>
            <input
              type='checkbox'
              className='h-5 w-5 accent-orange'
              checked={isAllSelected}
              onChange={handleSelectAllChange}
            />
          </div>
          <button className='mx-3 border-none bg-none' onClick={handleSelectAllChange}>
            Chọn tất cả ({productsContext.length})
          </button>
        </div>
        <div className='mt-5 flex flex-col sm:mt-0 sm:flex-row sm:items-center'>
          <div>
            <div className='flex items-center sm:justify-end'>
              <div>Tổng thanh toán ({selectedProductIds.length} sản phẩm):</div>
              <div className='ml-2 text-2xl text-orange'>₫{formatCurrency(totalAmount)}</div>
            </div>
          </div>
          <button
            disabled={selectedProductIds.length === 0 ? true : false}
            className={classNames(
              'mt-5 flex h-10 w-52 items-center justify-center  text-sm uppercase text-white  sm:ml-4 sm:mt-0',
              {
                'bg-red-500 hover:bg-red-600': selectedProductIds.length > 0,
                'cursor-not-allowed bg-gray-500': selectedProductIds.length === 0
              }
            )}
            onClick={() => alert('Mua hàng thành công')}
          >
            Mua hàng
          </button>
        </div>
      </div>
    </div>
  )
}

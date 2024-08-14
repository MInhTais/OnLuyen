import React from 'react'
import Header from '../../components/Header/Header'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { formatCurrency } from '@/utils/utils'
import classNames from 'classnames'
import { useProductContext } from '@/context/MyProvider'
import { toast } from 'sonner'

const CartLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    totalAmount,
    subTotal,
    totalDiscount,
    selectedProducts,
    getDefaultAddress,
    rate,
    address,
    setRate,
    purchaseProducts
  } = useProductContext()
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const onBuyProducts = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (selectedProducts.length > 0 && rate) {
      console.log(selectedProducts)
      toast.success('Mua thành công')
      purchaseProducts()
      setRate(null)
      navigate('/')
    }
    event.preventDefault()
  }
  const defaultAddress = getDefaultAddress()

  const handleClickToCheckout = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (totalAmount === 0) {
      event.preventDefault()
    }
    if (address.length === 0 || !defaultAddress?.default) {
      toast.warning('Hãy thêm địa chỉ giao hàng')
    }
  }
  console.log(rate)
  return (
    <div className='min-h-screen bg-gray-100'>
      <Header />
      <div className={'lg:px-[3%] my-5'}>
        <main className='flex-grow p-2'>
          <div className='grid grid-cols-12 gap-3'>
            <div
              className={classNames('', {
                'col-span-9': pathname !== '/shipping',
                'col-span-12': pathname === '/shipping'
              })}
            >
              {children}
            </div>
            <div
              className={classNames('', {
                'col-span-3': pathname !== '/shipping',
                hidden: pathname === '/shipping'
              })}
            >
              <div className='rounded-sm bg-white px-5 py-5 text-sm capitalize text-gray-600 shadow flex flex-col'>
                <div className='flex justify-between items-center'>
                  <h3>Giao đến</h3>
                  <Link to={'/shipping'} className='text-blue-500 hover:text-blue-600'>
                    Thay đổi
                  </Link>
                </div>
                {defaultAddress ? (
                  <div className='mt-5'>
                    <div className='flex gap-1'>
                      <div>{defaultAddress.name}</div>,<div>{defaultAddress.phone}</div>
                    </div>
                    <p>Địa chỉ: {defaultAddress.address}</p>
                  </div>
                ) : (
                  <Link to={'/shipping'} className='flex justify-start items-center gap-4 pt-5 cursor-pointer'>
                    <div className='h-9 w-9 rounded-lg border-dashed border border-1 border-blue-600 flex justify-center items-center'>
                      <Plus className='text-gray-600' />
                    </div>
                    <div>Thêm địa chỉ mới</div>
                  </Link>
                )}
              </div>
              <div className='mt-5 rounded-sm leading-9 bg-white px-5 py-5 text-sm capitalize text-gray-600 shadow flex flex-col'>
                <div className='flex justify-between items-center'>
                  <h3>Tạm tính</h3>
                  <span>₫{formatCurrency(subTotal)}</span>
                </div>
                <div className='flex justify-between items-center'>
                  <h3>Giảm giá từ Deal</h3>
                  <span>-₫{formatCurrency(totalDiscount)}</span>
                </div>
                {rate ? (
                  <div>
                    <div className='flex justify-between items-center'>
                      <h3>Phí vận chuyển</h3>
                      <span>₫{formatCurrency(rate?.total_amount || 0)}</span>
                    </div>
                    <div className='flex justify-between items-center'>
                      <h3>Nhà vận chuyển</h3>
                      <span>{rate?.carrier_name || ''}</span>
                    </div>
                    <div className='flex justify-between items-center'>
                      <h3>Thời gian dự kiến </h3>
                      <span>{rate.expected || ''}</span>
                    </div>
                    <div className='flex justify-between items-center'>
                      <h3>Loại dịch vụ </h3>
                      <span>{rate.service || ''}</span>
                    </div>
                  </div>
                ) : (
                  ''
                )}

                <div className='h-[1px] bg-gray-400 w-full'></div>
                {rate ? (
                  <div className='flex justify-between items-center py-5'>
                    <h3>Tổng tiền</h3>
                    <span className='text-green-600 text-xl font-medium'>
                      ₫{formatCurrency(totalAmount + rate.total_amount)}
                    </span>{' '}
                  </div>
                ) : (
                  <div className='flex justify-between items-center py-5'>
                    <h3>Tạm tính</h3>
                    <span className='text-green-600 text-xl font-medium'>₫{formatCurrency(totalAmount)}</span>{' '}
                  </div>
                )}

                {pathname === '/cart' ? (
                  <Link
                    to={'/checkout'}
                    className={classNames(
                      'flex h-10 w-6/7 items-center justify-center text-sm uppercase text-white sm:ml-4 sm:mt-0',
                      {
                        'bg-red-500 hover:bg-red-600 cursor-pointer': totalAmount > 0,
                        'cursor-not-allowed bg-gray-500': totalAmount === 0 || !defaultAddress?.default
                      }
                    )}
                    onClick={handleClickToCheckout}
                  >
                    {totalAmount === 0 ? 'Hãy chọn sản phẩm' : 'Tiếp tục'}
                  </Link>
                ) : (
                  <button
                    disabled={totalAmount === 0}
                    className={classNames(
                      'flex h-10 w-6/7 items-center justify-center text-sm uppercase text-white sm:ml-4 sm:mt-0',
                      {
                        'bg-red-500 hover:bg-red-600': totalAmount > 0 && rate,
                        'cursor-not-allowed bg-gray-500': totalAmount === 0 || rate === null
                      }
                    )}
                    onClick={(e) => onBuyProducts(e)}
                  >
                    {pathname === '/cart' ? 'Tiếp tục' : 'Mua hàng'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default CartLayout

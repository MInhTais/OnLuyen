import goshipAPI from '@/api/goship.api'
import { useProductContext } from '@/context/MyProvider'
import { RateRequest, RateResponse } from '@/types/goship.type'
import { formatCurrency } from '@/utils/utils'
import { useMutation } from '@tanstack/react-query'
import classNames from 'classnames'
import { useEffect, useState } from 'react'

export default function Checkout() {
  const { selectedProducts, getDefaultAddress, setRate, rate: rateContext } = useProductContext()
  const [rates, setRates] = useState<RateResponse[]>([])
  const defaultAddress = getDefaultAddress()
  const q: RateRequest = {
    shipment: {
      address_from: {
        city: '100000',
        district: '100900'
      },
      address_to: {
        city: defaultAddress?.city as string,
        district: defaultAddress?.district as string
      },
      parcel: {
        cod: '500000',
        weight: '220',
        width: '10',
        height: '15',
        length: '15'
      }
    }
  }

  const rateMutation = useMutation({
    mutationFn: (body: RateRequest) => goshipAPI.getRates(body)
  })

  useEffect(() => {
    rateMutation.mutateAsync(q, {
      onSuccess: (data) => {
        console.log(data.data.data)
        setRates(data.data.data)
      },
      onError: (error) => {
        console.log(error)
      }
    })
  }, [])

  const getRate = (rate: RateResponse) => {
    setRate(rate)
  }
  return (
    <div>
      <div className='flex flex-wrap justify-center gap-8 py-5'>
        {rates.map((rate) => (
          <div
            key={rate.id}
            onClick={() => getRate(rate)}
            className={classNames('flex flex-col items-center cursor-pointer bg-slate-200 rounded-lg p-3', {
              'border border-1 border-blue-500': rateContext?.id === rate.id,
              '': rateContext?.id === null
            })}
          >
            <img src={rate.carrier_logo} alt='Image 1 description' className='w-32 h-32 object-cover' />
            <p className='mt-2 text-center text-lg font-semibold'>{rate.carrier_name}</p>
          </div>
        ))}
      </div>
      <div className='grid grid-cols-12 py-5 rounded-sm bg-white px-9 text-sm capitalize text-gray-500 shadow'>
        <div className='col-span-6'>
          <div className='flex items-center'>
            <div className='flex-grow capitalize text-black'>Sản phẩm</div>
          </div>
        </div>
        <div className='col-span-6'>
          <div className='grid grid-cols-5 text-center'>
            <div className='col-span-2'>Đơn giá</div>
            <div className='col-span-1'>Số lượng</div>
            <div className='col-span-1'>Số tiền</div>
          </div>
        </div>
      </div>
      {selectedProducts.map((product) => (
        <div
          key={product.id}
          className='my-5 grid grid-cols-12 items-center rounded-sm border border-gray-200 px-4 py-5 text-center text-gray-500 first:mt-0'
        >
          <div className='col-span-6'>
            <div className='flex'>
              <div className='flex flex-grow'>
                <div className='flex'>
                  <img className='h-20 w-20 flex-shrink-0' src={product.image} />
                  <div className='flex-grow px-2 pb-2 pt-1'>
                    <div className='line-clamp-2 text-left'>{product.name}</div>
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
                <span> {product.quantity}</span>
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
        </div>
      ))}
    </div>
  )
}

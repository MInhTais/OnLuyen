import productsAPI from '@/api/products.api'
import InputControler from '@/components/InputController'
import { Button } from '@/components/ui/button'
import { formatCurrency, getIdFromNameId } from '@/utils/utils'
import { useQuery } from '@tanstack/react-query'
import { ShoppingCart } from 'lucide-react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import DOMPurify from 'dompurify'
import Temp from '../ProductList/components/Temp'
import { useProductContext } from '@/context/MyProvider'
import { toast } from '@/components/ui/use-toast'
import { Products } from '@/types/product.type'

export default function ProductDetail() {
  const { addProduct } = useProductContext()
  const { nameId } = useParams()
  const id = getIdFromNameId(nameId as string)
  const { data: productDetail } = useQuery({
    queryKey: ['productDetail', id],
    queryFn: () => {
      return productsAPI.getProductDetail(String(id))
    }
  })

  const product = productDetail?.data.data

  const { data: categoriesData, isSuccess } = useQuery({
    queryKey: ['categories', id],
    queryFn: () => {
      return productsAPI.getCategorieById(Number(product?.categoriesLevel2Id))
    },
    enabled: !!product
  })
  const [buyCount, setBuyCount] = useState(1)

  const handleBuyCount = (value: number) => {
    setBuyCount(value)
  }

  function addToCart(product: Products): void {
    addProduct(product, buyCount)
    toast({
      description: 'Thêm sản phẩm thành công'
    })
  }
  const categories = categoriesData?.data.data

  return (
    <div>
      {' '}
      <div className='bg-gray-200 py-6'>
        <div className='container'>
          <div className='bg-white p-4 shadow'>
            <div className='grid grid-cols-12 gap-2 lg:gap-9'>
              <div className='col-span-12 md:col-span-5'>
                <div className='relative w-full cursor-zoom-in overflow-hidden pt-[100%] shadow'>
                  <img
                    className='pointer-events-none absolute left-0 top-0 h-full w-full bg-white object-cover'
                    src={product?.image}
                  />
                </div>
              </div>
              <div className='col-span-12 md:col-span-7'>
                <h1 className='text-lg font-medium uppercase sm:text-xl' aria-hidden>
                  {product?.name}
                </h1>
                <div className='mt-8 flex items-center'>
                  <span className='mr-1 border-b border-b-orange text-orange'>{/* {product?.rating} */}</span>
                </div>
                <div className='mt-8  flex flex-col items-center bg-gray-50 px-5 py-4 md:flex-row'>
                  <div className='text-gray-500 line-through'>₫{formatCurrency(Number(product?.dis_price))}</div>
                  <div className='ml-3 text-3xl font-medium text-orange'>₫{formatCurrency(Number(product?.price))}</div>
                  <div className='ml-4 rounded-sm bg-orange px-1 py-[2px] text-xs font-semibold uppercase text-white'>
                    Giảm 20%
                  </div>
                </div>
                <div className='mt-8 flex  flex-col items-center md:flex-row'>
                  <div className=' flex items-center py-2'>
                    <InputControler
                      onDecrease={handleBuyCount}
                      onIncrease={handleBuyCount}
                      onType={handleBuyCount}
                      value={buyCount}
                    />
                  </div>

                  <div className='ml-6 text-sm text-gray-500'>Sản phẩm có sẵn: 20</div>
                </div>
                <div className='mt-8 flex items-center'>
                  <Button
                    className='text-white flex h-12 items-center justify-center rounded-sm border border-orange bg-green-400 hover:bg-green-500 p-4 text-sm capitalize text-orange'
                    onClick={() => addToCart(product as Products)}
                  >
                    <ShoppingCart className='mr-2 h-4 w-4' />
                    thêm vào giỏ hàng
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {product?.description ? (
          <div className='mt-8'>
            <div className='container'>
              <div className='bg-white p-4 shadow-sm'>
                <div className='rounded bg-gray-50 p-4 text-lg capitalize text-slate-700'>Mô tả sản phẩm</div>
                <div className='mx-4 mb-4 mt-12 text-sm leading-loose'>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(product?.description as string)
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
        <div className='mt-8'>
          <div className='container'>
            <Temp
              more={false}
              headerColor='text-[#006133]'
              mainColor='bg-white'
              header='Có thể bạn cũng thích'
              products={categories || []}
            />{' '}
          </div>
        </div>
      </div>
    </div>
  )
}

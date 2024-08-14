import categoryAPI from '@/api/category.api'
import ProductItem from '@/components/ProductItem'
import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import classNames from 'classnames'

export default function Categories() {
  const { categoryId } = useParams<{ categoryId: string }>()

  const { data: categoriesData } = useQuery({
    queryKey: ['categories', categoryId],
    queryFn: () => {
      return categoryAPI.getCategoriesById({ categoryId: Number(categoryId) })
    }
  })
  const { data: categoriesV1Data } = useQuery({
    queryKey: ['categoriesV1', categoriesData?.data.data.categoriesLevel1Id],
    queryFn: () => {
      return categoryAPI.getCategoriesV1ById({ categoryV1Id: Number(categoriesData?.data.data.categoriesLevel1Id) })
    },
    enabled: !!categoriesData
  })

  console.log(categoriesV1Data)

  return (
    <div className='flex flex-col gap-4 pt-5'>
      <div className='flex border-[2px] border-white rounded-md bg-white w-full p-2'>
        <Link to={'/'}>
          <ChevronLeft className='h-6 w-6' />
        </Link>
        <div className='text-black text-base mx-5'>{categoriesV1Data?.data.data?.categorieName}</div>
      </div>
      <div className='flex border-[2px] border-white rounded-md bg-white w-full p-2 gap-10'>
        {categoriesV1Data?.data.data?.categoriesLevel2.map((ce) => (
          <Link
            key={ce.id}
            to={`/categories/${ce.id}`}
            className={classNames('flex flex-col items-center justify-start p-2 rounded-lg ', {
              'border border-green-500 bg-[#f2fff3]': ce.id === Number(categoryId),
              'bg-white': ce.id !== 1
            })}
          >
            <div className='relative inline-block rounded-6px w-[57px] h-[57px]'>
              <img alt='Trái cây' className='opacity-100 w-full h-auto' src={ce.image} />
            </div>
            <div className='mb-[8px] mt-[2px] flex size-full h-[30px] w-[90%] items-center justify-center text-center text-11 leading-[15px] lg:h-[32px] lg:text-14 lg:leading-4 font-bold text-[#007e42] lg:font-normal'>
              <div className='line-clamp-2'>{ce.categorieName2}</div>
            </div>
          </Link>
        ))}
      </div>
      {categoriesData?.data.data.categoriesLevel2_products.length === 0 ? (
        <>
          <span className='text-black'>Không có sản phẩm cho loại đó</span>
        </>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4'>
          {categoriesData?.data.data.categoriesLevel2_products?.map((product) => (
            <ProductItem product={product} key={product.id} />
          ))}
        </div>
      )}
    </div>
  )
}

import React, { useEffect, useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
import { Products } from '@/types/product.type'
import { formatCurrency, generateNameId } from '@/utils/utils'
import { useProductContext } from '@/context/MyProvider'
import { toast } from 'sonner'

interface ProductListProps {
  classNameHeader?: string
  morePromotions: boolean
  products: Products[]
  header: string
}

const ProductCarousel: React.FC<ProductListProps> = ({ header, morePromotions, classNameHeader, products }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const { addProduct } = useProductContext()

  function addToCart(product: Products): void {
    addProduct(product)
    toast.success('Thêm sản phẩm thành công')
  }

  useEffect(() => {
    const updateItemsPerPage = () => {
      const width = window.innerWidth
      if (width < 640) {
        setItemsPerPage(2)
      } else if (width < 800) {
        setItemsPerPage(3)
      } else if (width < 1200) {
        setItemsPerPage(4)
      } else {
        setItemsPerPage(5)
      }
    }

    // Initial check
    updateItemsPerPage()

    // Update on window resize
    window.addEventListener('resize', updateItemsPerPage)
    return () => window.removeEventListener('resize', updateItemsPerPage)
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.ceil(products.length / itemsPerPage))
  }

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + Math.ceil(products.length / itemsPerPage)) % Math.ceil(products.length / itemsPerPage)
    )
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const displayedProducts = products.slice(currentIndex * itemsPerPage, currentIndex * itemsPerPage + itemsPerPage)

  return (
    <div className={'relative mt-[14px] rounded-md px-4px bg-[#EFFFF2]'}>
      <div className={classNameHeader ? classNameHeader : 'flex items-center justify-between pb-[6px] pt-[10px]'}>
        <div className='pl-[4px] text-[20px] font-bold uppercase text-[#006133]'>{header}</div>
        {morePromotions ? (
          <Link
            to={'/khuyen-mai'}
            className='inline-flex items-center pr-6px text-12 text-[#0095FF] after:ml-2px after:mt-0 after:size-[8px] after:rotate-[-135deg] after:border-b-2px after:border-l-2px after:border-[#0095FF]'
          >
            Xem thêm khuyến mãi
          </Link>
        ) : (
          ''
        )}
      </div>
      <div className='flex items-center'>
        <div className='w-full max-w-5xl mx-auto py-8'>
          <div className='relative'>
            <div className='flex items-center justify-between'>
              <button onClick={prevSlide} className='p-2 bg-gray-300 rounded-full'>
                <FaChevronLeft />
              </button>
              <div className='flex space-x-4'>
                {displayedProducts.map((product) => (
                  <div
                    key={product.id}
                    className={`w-1/${itemsPerPage} flex flex-col border-[3px] border-[#8eca51] rounded-md`}
                  >
                    <Link to={`${'/'}${generateNameId({ name: product.name, id: product.id })}`} key={product.id}>
                      <div className='h-5/7'>
                        <img src={product.image} alt={product.name} className='w-[162px] h-[162px] object-cover' />
                        <h3 className='text-sm px-2 h-20'>{product.name}</h3>
                      </div>
                    </Link>
                    <div className='flex justify-start px-2 py-2 h-auto items-center gap-3 bg-gradient-to-b from-green-600 to-green-500'>
                      <div>
                        <div className='text-yellow-400 font-medium flex items-center gap-1'>
                          {formatCurrency(product.dis_price)}
                          <span className='text-xs'>₫</span>
                        </div>
                        <div className='text-white text-xs line-through flex items-center gap-1'>
                          {formatCurrency(product.price)}
                          <span className='text-xs'>₫</span>
                        </div>
                      </div>
                      <Button
                        className='mt-auto flex h-[28px] w-full items-center justify-center rounded-[6px] bg-[#D8ECD4] text-13 font-bold uppercase text-[#007E42] hover:bg-[#e4f5e7] lg:h-[36px] lg:text-16 py-[8px]'
                        onClick={() => addToCart(product)}
                      >
                        Mua
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={nextSlide} className='p-2 bg-gray-300 rounded-full'>
                <FaChevronRight />
              </button>
            </div>
            <div className='flex justify-center space-x-2 mt-4'>
              {[...Array(Math.ceil(products.length / itemsPerPage))].map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full ${currentIndex === index ? 'bg-green-500' : 'bg-gray-300'}`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCarousel

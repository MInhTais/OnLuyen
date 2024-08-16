import productsAPI from '@/api/products.api'
import { useProductContext } from '@/context/MyProvider'
import { generateNameId } from '@/utils/utils'
import { useQuery } from '@tanstack/react-query'
import { SearchIcon, ShoppingCartIcon } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Header: React.FC = () => {
  const { products: productsContext, isAuthenticated, profile } = useProductContext()
  const [showProducts, setShowProducts] = useState(false)
  const [searchValue, setInputValue] = useState('')

  const handleFocus = () => {
    setShowProducts(true)
  }

  const handleBlur = () => {
    setTimeout(() => {
      setShowProducts(false)
    }, 200)
  }

  const handleMouseDown = () => {
    setShowProducts(true)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const { data: searchData } = useQuery({
    queryKey: ['products-search', searchValue],
    queryFn: () => {
      return productsAPI.searchProduct(searchValue)
    },
    enabled: searchValue.trim() !== ''
  })

  return (
    <header className='bg-green-600 text-white p-4'>
      <div className='pl-[10%] pr-[5%] grid grid-cols-6 items-center gap-4'>
        <div className='items-center space-x-4 hidden lg:flex'>
          <button className='text-xl'>
            <i className='fas fa-bars'></i>
          </button>
          <Link to={'/'} className='text-2xl font-bold'>
            Bách hóa
          </Link>
        </div>
        <div className='relative col-span-3 lg:col-span-3'>
          <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
            <SearchIcon className='h-5 w-5 text-gray-500' />
          </div>
          <input
            type='text'
            placeholder='Giao nhanh trong 2h'
            className='w-full text-black p-2 pl-10 rounded-md focus:ring focus:ring-green-300'
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={(e) => handleInputChange(e)}
          />
          {showProducts && (
            <div
              className='absolute z-10 bg-white text-black w-full mt-1 max-h-60 overflow-y-auto rounded-md shadow-lg'
              onMouseDown={handleMouseDown}
            >
              <ul>
                {searchData?.data.data.map((product, index) => (
                  <li key={index} className='p-2 hover:bg-gray-200 cursor-pointer'>
                    <Link
                      to={`${'/'}${generateNameId({ name: product.name, id: product.id })}`}
                      className='grid grid-cols-12'
                    >
                      <div className='col-span-1'>
                        <img src={product.image} className='h-9 w-9' />
                      </div>
                      <div className='col-span-11'>{product.name}</div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className='flex items-center space-x-8 justify-end col-span-2'>
          <Link to={'/cart'} className='text-xl relative'>
            <ShoppingCartIcon className='h-6 w-6' />
            <span className='absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1'>
              {productsContext.length}
            </span>
          </Link>
          {isAuthenticated ? (
            <div className='flex cursor-pointer items-center justify-end px-3 py-1 relative'>
              <img
                className='h-6 w-6 rounded-full object-cover'
                src={
                  profile?.avatar
                    ? profile.avatar
                    : 'https://api-ecom.duthanhduoc.com/images/79e001c4-ed1b-4dc9-bd2d-9047d75e69de.png'
                }
                alt='avatar'
              />
              <span className='mx-3'>Xin chào: {profile?.name}</span>
            </div>
          ) : (
            // <Popover
            //   placement='bottom-end'
            //   renderProps={
            //     <div className='border-gay-200 relative max-w-[300px] rounded-sm border bg-white shadow-md md:max-w-[400px]'>
            //       <div className='flex h-[300px] w-[300px] justify-start p-2'>
            //         <Link to={''} className='w-full h-10 bg-gray-200 rounded-lg hover:bg-gray-300 p-2'>
            //           Quản trị
            //         </Link>
            //       </div>
            //     </div>
            //   }
            // >
            //   <div className='flex cursor-pointer items-center justify-end px-3 py-1 relative'>
            //     <img
            //       className='h-6 w-6 rounded-full object-cover'
            //       src={
            //         profile?.avatar
            //           ? profile.avatar
            //           : 'https://api-ecom.duthanhduoc.com/images/79e001c4-ed1b-4dc9-bd2d-9047d75e69de.png'
            //       }
            //       alt='avatar'
            //     />
            //     <span className='mx-3'>Xin chào: {profile?.name}</span>
            //   </div>
            // </Popover>
            <div className='flex gap-4'>
              <Link to='/login' className='text-sm underline'>
                Đăng nhập
              </Link>
              <Link to='/register' className='text-sm underline'>
                Đăng ký
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header

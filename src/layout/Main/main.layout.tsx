import React from 'react'
import Header from '../../components/Header/Header'
import ProductCategories from '@/pages/ProductList/components/ProductCategories'
import { useLocation } from 'react-router-dom'
import classNames from 'classnames'

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { pathname } = useLocation()

  return (
    <div className='min-h-screen bg-gray-100'>
      <Header />
      <div
        className={classNames('flex px-0', {
          'lg:px-[10%]': pathname !== '/cart',
          'lg:px-[3%]': pathname === '/cart'
        })}
      >
        {!/^\/categories\/\d+/.test(pathname) && pathname !== '/login' && pathname !== '/register' ? (
          <div className='hidden lg:block w-1/4'>
            <ProductCategories />
          </div>
        ) : null}
        <main className='flex-grow p-2'>{children}</main>
      </div>
    </div>
  )
}

export default MainLayout

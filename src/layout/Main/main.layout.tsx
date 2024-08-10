// src/components/MainLayout.tsx
import React from 'react'
import Header from '../../components/Header/Header'
import ProductCategories from '@/pages/ProductList/components/ProductCategories'
import { useLocation } from 'react-router-dom'

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation()
  const { pathname } = location
  return (
    <div className='min-h-screen bg-gray-100'>
      <Header />
      <div className='flex px-0 lg:px-[10%]'>
        {pathname === '/cart' ? (
          ''
        ) : (
          <div className='hidden lg:block w-1/4'>
            <ProductCategories />
          </div>
        )}
        <main className='flex-grow p-2'>{children}</main>
      </div>
    </div>
  )
}

export default MainLayout

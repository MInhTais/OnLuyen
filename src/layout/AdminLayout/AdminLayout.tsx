import SidebarCustom from '@/components/Admin'
import Header from '@/components/Header/Header'
import React from 'react'
import { Outlet } from 'react-router-dom'

interface AdminLayoutProps {
  children?: React.ReactNode
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className='min-h-screen bg-gray-100'>
      <Header />
      <div className='flex px-0'>
        <SidebarCustom />
        <main className='flex-grow p-2'>{children}</main>
      </div>
    </div>
  )
}

export default AdminLayout

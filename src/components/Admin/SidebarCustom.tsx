import { Sidebar } from 'flowbite-react'
import { HiShoppingBag } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { LayoutDashboard, StretchHorizontal, ChartBarStacked, ChartColumnStacked } from 'lucide-react'

export function SidebarCustom() {
  return (
    <Sidebar aria-label='Sidebar with multi-level dropdown example'>
      <Sidebar.Items>
        <Sidebar.ItemGroup className='px-5'>
          <div className='flex items-center gap-4 p-2'>
            <LayoutDashboard />
            <Link to='/admin/dashboard'>Dashboard</Link>
          </div>
          <Sidebar.Collapse icon={HiShoppingBag} label='Quản lí sản phẩm'>
            <div className='flex items-center gap-4 p-2'>
              <StretchHorizontal />
              <Link to='/admin/products'>Sản phẩm</Link>
            </div>
            <div className='flex items-center gap-4 p-2'>
              <ChartBarStacked />
              <Link to='/admin/dashboard'>Loại 1</Link>
            </div>
            <div className='flex items-center gap-4 p-2'>
              <ChartColumnStacked />
              <Link to='/admin/dashboard'>Loại 2</Link>
            </div>{' '}
          </Sidebar.Collapse>
          {/* <Sidebar.Collapse icon={HiUser} label='Người dùng'>
            <div className='flex items-center gap-4 p-2'>
              <LayoutDashboard />
              <Link to='/admin/dashboard'>Người dùng</Link>
            </div>
            <div className='flex items-center gap-4 p-2'>
              <LayoutDashboard />
              <Link to='/admin/dashboard'>Loại 1</Link>
            </div>
            <div className='flex items-center gap-4 p-2'>
              <LayoutDashboard />
              <Link to='/admin/dashboard'>Loại 2</Link>
            </div>{' '}
          </Sidebar.Collapse> */}
          <div className='flex items-center gap-4 p-2'>
            <LayoutDashboard />
            <Link to='/logout'>Đăng xuất</Link>
          </div>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}

import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar: React.FC = () => {
  return (
    <aside className='hidden md:flex md:w-64 h-screen bg-gray-800 text-white'>
      <nav className='p-4'>
        {/* Add your sidebar content here */}
        <Link to='#' className='block p-2'>
          Link 1
        </Link>
        <Link to='#' className='block p-2'>
          Link 2
        </Link>
      </nav>
    </aside>
  )
}

export default Sidebar

import React from 'react'

const Loading: React.FC = () => {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50 pointer-events-none'>
      <div className='animate-spin inline-block w-12 h-12 border-4 border-white border-t-transparent rounded-full'></div>
    </div>
  )
}

export default Loading

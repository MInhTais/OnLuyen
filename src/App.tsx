// src/App.tsx
import React from 'react'
import useRouteElement from './useRouteElement'
import { Toaster } from './components/ui/toaster'

const App: React.FC = () => {
  const routeElement = useRouteElement()
  return (
    <>
      <Toaster />
      {routeElement}
    </>
  )
}

export default App

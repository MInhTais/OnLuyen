import React, { useEffect, useState } from 'react'
import useRouteElement from './useRouteElement'
import { Toaster } from './components/ui/sonner'
import { useLocation, useNavigate } from 'react-router-dom'
import Loading from './components/Loading'

const App: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const routeElement = useRouteElement()

  useEffect(() => {
    const handleNavigation = () => {
      setLoading(true)
      const timer = setTimeout(() => {
        setLoading(false)
      }, 1000)

      return () => clearTimeout(timer)
    }

    handleNavigation()
  }, [location.pathname])
  return (
    <>
      <Toaster position='top-right' />
      {loading && <Loading />}
      <div className={loading ? 'pointer-events-none' : ''}>{routeElement}</div>
    </>
  )
}

export default App

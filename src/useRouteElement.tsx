import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import MainLayout from './layout/Main'
import ProductList from './pages/ProductList'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import LoginPage from './pages/Login'
import { useProductContext } from './context/MyProvider'
import CartLayout from './layout/Cart'
import Checkout from './pages/Checkout'
import Shipping from './pages/Shipping'
import Categories from './pages/Categories/Categories'

function ProtectedRoute() {
  const { isAuthenticated } = useProductContext()
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}

function RejectedRoute() {
  const { isAuthenticated } = useProductContext()
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}

function ProtectedCheckoutRoute() {
  const { isAuthenticated, selectedProducts, address, getDefaultAddress } = useProductContext()
  const defaultAddress = getDefaultAddress()

  if (!isAuthenticated) {
    return <Navigate to='/login' />
  }

  if (selectedProducts.length === 0) {
    return <Navigate to='/cart' />
  }

  if (address.length === 0 || !defaultAddress?.default) {
    return <Navigate to='/shipping' />
  }
  return <Outlet />
}

export default function useRouteElement() {
  const routeElements = useRoutes([
    {
      path: '/',
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      )
    },
    {
      path: '/:nameId',
      element: (
        <MainLayout>
          <ProductDetail />
        </MainLayout>
      )
    },
    {
      path: '/categories/:categoryId',
      element: (
        <MainLayout>
          <Categories />
        </MainLayout>
      )
    },
    {
      path: '/cart',
      element: (
        <CartLayout>
          <Cart />
        </CartLayout>
      )
    },
    {
      path: '/shipping',
      element: (
        <CartLayout>
          <Shipping />
        </CartLayout>
      )
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: '/login',
          element: (
            <MainLayout>
              <LoginPage />
            </MainLayout>
          )
        },
        {
          path: '/register',
          element: (
            <MainLayout>
              <LoginPage />
            </MainLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <ProtectedCheckoutRoute />,
      children: [
        {
          path: '/checkout',
          element: (
            <CartLayout>
              <Checkout />
            </CartLayout>
          )
        }
      ]
    },
    {
      path: '/about',
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      )
    }
  ])

  return routeElements
}
